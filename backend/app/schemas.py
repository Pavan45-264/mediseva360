from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class TrackPoint(BaseModel):
    timestamp: str = Field(..., description="ISO timestamp of waypoint")
    lead_time_hours: int = Field(..., description="Hours from current analysis time (e.g. 0, 6, 12, 24, 48)")
    latitude: float = Field(..., description="Geographic latitude in degrees North")
    longitude: float = Field(..., description="Geographic longitude in degrees East")
    cone_radius_km: float = Field(..., description="Forecast uncertainty cone radius in km")
    wind_speed_knots: float = Field(..., description="Estimated/predicted max sustained wind speed in knots")
    central_pressure_hpa: float = Field(..., description="Estimated/predicted central pressure in hPa")
    category: str = Field(..., description="Cyclone intensity classification (e.g., CS, SCS, VSCS)")

class RiskZone(BaseModel):
    id: str
    region_name: str
    state: str
    severity: str = Field(..., description="CRITICAL, HIGH, MODERATE, LOW")
    color: str = Field(..., description="Hex color code for map display")
    storm_surge_meters: float
    population_affected_approx: int
    key_ports_at_risk: List[str]
    evacuation_status: str
    expected_impact_window: str

class Alert(BaseModel):
    id: str
    headline: str
    urgency: str = Field(..., description="CRITICAL, WARNING, ADVISORY, WATCH")
    source: str = Field(default="CYBERSTORM AI / IMD Protocol")
    timestamp: str
    bulletin_number: int
    marine_warning: str
    wind_hazard: str
    action_advised: str

class SatelliteFrameData(BaseModel):
    timestamp: str
    channel: str = Field(..., description="TIR (Thermal Infrared), WV (Water Vapor), VIS (Visible)")
    satellite_source: str = Field(default="INSAT-3DR Multi-Spectral Imager")
    center_lat: float
    center_lon: float
    cdo_cloud_top_temp_celsius: float
    eye_detected: bool
    eye_diameter_km: Optional[float] = None
    image_base64: str = Field(..., description="Base64 encoded PNG/JPEG visualization frame")

class IntensityMetrics(BaseModel):
    category_code: str
    category_full_name: str
    current_wind_speed_knots: float
    current_wind_speed_kmph: float
    central_pressure_hpa: float
    pressure_deficit_hpa: float
    dvorak_t_number: float
    category_probabilities: Dict[str, float]
    predicted_landfall_wind_knots: float
    estimated_time_to_landfall_hours: float

class DualPredictionOutput(BaseModel):
    cyclone_id: str
    cyclone_name: str
    basin: str
    formation_date: str
    status: str
    last_updated: str
    current_location: Dict[str, float]
    translation_speed_kmph: float
    heading_degrees: float
    intensity: IntensityMetrics
    historical_track: List[TrackPoint]
    forecast_track: List[TrackPoint]
    risk_zones: List[RiskZone]
    active_alerts: List[Alert]
    ai_confidence_metrics: Dict[str, Any]

class CycloneSummary(BaseModel):
    id: str
    name: str
    basin: str
    category: str
    wind_speed_knots: float
    central_pressure_hpa: float
    current_lat: float
    current_lon: float
    status: str
    urgency_level: str

class CustomLocationInput(BaseModel):
    latitude: float = Field(..., description="Latitude in degrees North (e.g. 5.0 to 25.0)")
    longitude: float = Field(..., description="Longitude in degrees East (e.g. 60.0 to 98.0)")
    wind_speed_knots: Optional[float] = Field(default=75.0, description="Estimated current wind speed in knots")
    name: Optional[str] = Field(default="MANUAL TARGET", description="Custom cyclone or disturbance name")

