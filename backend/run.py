"""
Convenience entry point to launch CYBERSTORM FastAPI server.
Binds to 0.0.0.0 so it is accessible from localhost as well as other devices on Wi-Fi/LAN.
Usage: python run.py
"""
import sys
import uvicorn

if __name__ == "__main__":
    print("=" * 65)
    print("[CYBERSTORM] AI/ML Tropical Cyclone Dual Prediction System")
    print("[SERVER] Starting FastAPI Server on http://0.0.0.0:8000")
    print("[NETWORK] Accessible via Local: http://localhost:8000")
    print("[NETWORK] Accessible via Wi-Fi/LAN: http://10.88.47.112:8000")
    print("[DOCS] Interactive API Docs (Swagger): http://localhost:8000/docs")
    print("=" * 65)
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
