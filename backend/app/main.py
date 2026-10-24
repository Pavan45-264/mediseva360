"""
CYBERSTORM - Tropical Cyclone AI Prediction & Monitoring System
FastAPI Backend Application Entry Point
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from app.schemas import (
    DualPredictionOutput, CycloneSummary, TrackPoint, 
    RiskZone, Alert, SatelliteFrameData, CustomLocationInput
)
from app.ml.inference import CycloneInferenceService
from app.mock_data import ACTIVE_CYCLONES, get_all_cyclone_summaries, step_cyclone_simulation

app = FastAPI(
    title="CYBERSTORM Cyclone AI Prediction Engine API",
    description="Smart India Hackathon: AI/ML-based Identification, Classification, and Prediction of Tropical Cyclones using Multi-Source Satellite Data",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite default port 5173, CRA 3000, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI ML Inference Service
inference_service = CycloneInferenceService()

@app.get("/")
def root():
    return {
        "project": "CYBERSTORM",
        "tagline": "AI/ML Multi-Source Satellite Tropical Cyclone Dual Predictor",
        "docs_url": "/docs",
        "health_check": "/api/health",
        "version": "1.0.0"
    }

@app.get("/api/health")
def health_check():
    from app.ml.model import TORCH_AVAILABLE
    from app.ml.pipeline import CV2_AVAILABLE, XARRAY_AVAILABLE
    return {
        "status": "HEALTHY",
        "ai_engine": "PyTorch Dual-Head CNN" if TORCH_AVAILABLE else "Analytical Physics BAM Engine (NumPy Fallback)",
        "torch_accelerated": TORCH_AVAILABLE,
        "opencv_vision_active": CV2_AVAILABLE,
        "xarray_geogrids_active": XARRAY_AVAILABLE,
        "active_monitored_cyclones": len(ACTIVE_CYCLONES)
    }

@app.get("/api/cyclones", response_model=List[CycloneSummary])
def list_cyclones():
    """Returns summaries of all currently active cyclones in Indian Ocean basins"""
    return get_all_cyclone_summaries()

@app.post("/api/cyclones/custom-location", response_model=DualPredictionOutput)
def analyze_custom_location(req: CustomLocationInput):
    """
    Manual location selection: takes user-defined latitude, longitude, and wind speed,
    determines basin, runs dual-head prediction, and returns full track forecast & risk assessment.
    """
    lat = round(float(req.latitude), 3)
    lon = round(float(req.longitude), 3)
    wind = float(req.wind_speed_knots or 70.0)
    
    basin = "Bay of Bengal (North Indian Ocean)" if lon >= 77.0 else "Arabian Sea (North Indian Ocean)"
    pres = round(1010.0 - (wind ** 1.15) * 0.45, 1)
    
    meta = {
        "id": "CUSTOM-01",
        "name": req.name or "MANUAL TARGET",
        "basin": basin,
        "current_lat": lat,
        "current_lon": lon,
        "wind_speed_knots": wind,
        "central_pressure_hpa": pres,
        "translation_speed_kmph": 16.0,
        "heading_degrees": 335.0 if "Bengal" in basin else 320.0,
        "sst_celsius": 30.1,
        "urgency_level": "WARNING" if wind < 64 else "CRITICAL",
        "status": "MANUAL SELECTION - ACTIVE"
    }
    
    ACTIVE_CYCLONES["CUSTOM-01"] = meta
    return inference_service.run_full_prediction(meta)

@app.get("/api/cyclones/custom-location", response_model=DualPredictionOutput)
def analyze_custom_location_get(lat: float, lon: float, wind: float = 70.0, name: str = "MANUAL TARGET"):
    """GET alternative for manual location selection"""
    req = CustomLocationInput(latitude=lat, longitude=lon, wind_speed_knots=wind, name=name)
    return analyze_custom_location(req)

@app.get("/api/cyclones/{cyclone_id}", response_model=DualPredictionOutput)
def get_cyclone_full_prediction(cyclone_id: str):
    """
    Primary endpoint serving comprehensive telemetry, dual-head AI prediction
    (spatio-temporal forecast track & IMD intensity classification), risk zones, and alerts.
    """
    cid = cyclone_id.upper()
    if cid not in ACTIVE_CYCLONES:
        raise HTTPException(status_code=404, detail=f"Cyclone {cyclone_id} not found in tracking registry")
    
    meta = ACTIVE_CYCLONES[cid]
    return inference_service.run_full_prediction(meta)


@app.get("/api/cyclones/{cyclone_id}/track")
def get_cyclone_track(cyclone_id: str):
    """Returns historical and AI-forecast track with uncertainty cone radii"""
    full = get_cyclone_full_prediction(cyclone_id)
    return {
        "cyclone_id": full.cyclone_id,
        "cyclone_name": full.cyclone_name,
        "historical_track": full.historical_track,
        "forecast_track": full.forecast_track
    }

@app.get("/api/cyclones/{cyclone_id}/risk-zones", response_model=List[RiskZone])
def get_cyclone_risk_zones(cyclone_id: str):
    """Returns affected coastal risk sectors, population at risk, and port warnings"""
    full = get_cyclone_full_prediction(cyclone_id)
    return full.risk_zones

@app.get("/api/cyclones/{cyclone_id}/alerts", response_model=List[Alert])
def get_cyclone_alerts(cyclone_id: str):
    """Returns active bulletin warnings and emergency maritime advisories"""
    full = get_cyclone_full_prediction(cyclone_id)
    return full.active_alerts

@app.get("/api/cyclones/{cyclone_id}/satellite")
def get_cyclone_satellite_view(cyclone_id: str):
    """Returns OpenCV processed EIR false-color satellite frame and eye contour analysis"""
    cid = cyclone_id.upper()
    if cid not in ACTIVE_CYCLONES:
        raise HTTPException(status_code=404, detail=f"Cyclone {cyclone_id} not found")
    meta = ACTIVE_CYCLONES[cid]
    cube = inference_service.pipeline.generate_synthetic_cyclone_cube(
        meta["current_lat"], meta["current_lon"], meta["wind_speed_knots"]
    )
    _, telemetry, b64_frame = inference_service.pipeline.extract_features_and_render(cube)
    return {
        "cyclone_id": cid,
        "satellite": "INSAT-3DR Imager",
        "channels": ["TIR-1 (10.8um)", "TIR-2 (12.0um)", "WV (6.7um)", "VIS (0.65um)"],
        "telemetry": telemetry,
        "image_base64": b64_frame
    }

@app.post("/api/cyclones/{cyclone_id}/step-simulation")
def step_simulation(cyclone_id: str):
    """
    Hackathon interactive demo trigger: steps cyclone position and intensity forward,
    re-running the AI model to show real-time track updates!
    """
    cid = cyclone_id.upper()
    if cid not in ACTIVE_CYCLONES:
        raise HTTPException(status_code=404, detail=f"Cyclone {cyclone_id} not found")
    updated = step_cyclone_simulation(cid)
    return {
        "message": f"Stepped simulation for {cid} successfully",
        "new_telemetry": updated
    }

