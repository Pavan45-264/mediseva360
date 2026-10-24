"""
Mock Cyclone Telemetry & Scenarios for CYBERSTORM Hackathon Prototype.
Includes Bay of Bengal and Arabian Sea realistic meteorological parameters.
"""

from typing import Dict, Any, List

ACTIVE_CYCLONES: Dict[str, Dict[str, Any]] = {
    "CYBER-01B": {
        "id": "CYBER-01B",
        "name": "ARAV",
        "basin": "Bay of Bengal (North Indian Ocean)",
        "formation_date": "2026-09-23",
        "status": "ACTIVE - INTENSIFYING",
        "current_lat": 17.85,
        "current_lon": 87.42,
        "wind_speed_knots": 85.0,
        "central_pressure_hpa": 968.0,
        "translation_speed_kmph": 16.5,
        "heading_degrees": 335.0,
        "sst_celsius": 30.4,
        "urgency_level": "CRITICAL"
    },
    "CYBER-02A": {
        "id": "CYBER-02A",
        "name": "TEJ-II",
        "basin": "Arabian Sea (North Indian Ocean)",
        "formation_date": "2026-09-24",
        "status": "ACTIVE - FORMATIVE STAGE",
        "current_lat": 18.20,
        "current_lon": 67.50,
        "wind_speed_knots": 52.0,
        "central_pressure_hpa": 990.0,
        "translation_speed_kmph": 14.0,
        "heading_degrees": 320.0,
        "sst_celsius": 29.8,
        "urgency_level": "WARNING"
    }
}

def get_all_cyclone_summaries() -> List[Dict[str, Any]]:
    summaries = []
    for c in ACTIVE_CYCLONES.values():
        summaries.append({
            "id": c["id"],
            "name": c["name"],
            "basin": c["basin"],
            "category": "Very Severe Cyclonic Storm (VSCS)" if c["wind_speed_knots"] >= 64 else "Cyclonic Storm (CS)",
            "wind_speed_knots": c["wind_speed_knots"],
            "central_pressure_hpa": c["central_pressure_hpa"],
            "current_lat": c["current_lat"],
            "current_lon": c["current_lon"],
            "status": c["status"],
            "urgency_level": c["urgency_level"]
        })
    return summaries

def step_cyclone_simulation(cyclone_id: str) -> Dict[str, Any]:
    """Steps the cyclone forward by 3 hours along its trajectory"""
    if cyclone_id not in ACTIVE_CYCLONES:
        raise KeyError(f"Cyclone {cyclone_id} not found")
    
    c = ACTIVE_CYCLONES[cyclone_id]
    # Move coordinates slightly north-west
    c["current_lat"] = round(c["current_lat"] + 0.35, 3)
    c["current_lon"] = round(c["current_lon"] - 0.15, 3)
    # Intensify slightly
    if c["wind_speed_knots"] < 110:
        c["wind_speed_knots"] = round(c["wind_speed_knots"] + 3.0, 1)
        c["central_pressure_hpa"] = round(c["central_pressure_hpa"] - 2.5, 1)
    return c
