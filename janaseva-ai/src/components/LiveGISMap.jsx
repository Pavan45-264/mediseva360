import React, { useState, useEffect } from 'react';
import {
  MapContainer, TileLayer, WMSTileLayer, Circle, CircleMarker,
  Popup, useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Compass, Eye, ShieldAlert, RotateCcw, MapPin,
  HeartPulse, Shield, Phone, Radio, Info
} from 'lucide-react';
import { SEVERITY_LEVELS, HAZARD_CATEGORIES } from '../data/pralayaData';

function MapController({ targetCenter, targetZoom }) {
  const map = useMap();

  useEffect(() => {
    if (targetCenter && targetCenter[0] && targetCenter[1]) {
      map.flyTo(targetCenter, targetZoom || 7, {
        duration: 1.5
      });
    }
  }, [targetCenter, targetZoom, map]);

  return null;
}

export default function LiveGISMap({
  hazards = [],
  selectedHazard = null,
  onSelectHazard = () => {},
  showCascading = true,
  onInspectHazard = () => {},
  onOpenEmergency = () => {}
}) {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');
  const [activeBasemap, setActiveBasemap] = useState('bhuvan'); // 'bhuvan' or 'carto'
  const [mapCenter, setMapCenter] = useState([22.5, 82.0]);
  const [mapZoom, setMapZoom] = useState(5);

  useEffect(() => {
    if (selectedHazard && selectedHazard.lat && selectedHazard.lng) {
      setMapCenter([selectedHazard.lat, selectedHazard.lng]);
      setMapZoom(8);
    }
  }, [selectedHazard]);

  const filteredHazards = hazards.filter((h) => {
    return activeCategoryFilter === 'ALL' || h.category === activeCategoryFilter;
  });

  const hotspots = [
    { name: 'All India', center: [22.5, 82.0], zoom: 5 },
    { name: 'Kerala Floods', center: [10.2, 76.5], zoom: 8 },
    { name: 'Odisha Cyclone', center: [19.8, 86.0], zoom: 8 },
    { name: 'Assam Floods', center: [26.2, 92.0], zoom: 8 },
    { name: 'Uttarakhand Hills', center: [30.5, 79.5], zoom: 9 },
    { name: 'Delhi Heatwave', center: [28.6, 77.2], zoom: 9 }
  ];

  return (
    <div className="relative w-full h-[78vh] lg:h-[84vh] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 flex flex-col">
      
      {/* Top Map HUD: Category Filters & Basemap Button */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Simple Hazard Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl pointer-events-auto">
          {[
            { id: 'ALL', label: 'All Disasters' },
            { id: 'FLOOD', label: '🌊 Floods' },
            { id: 'CYCLONE', label: '🌀 Cyclones' },
            { id: 'LANDSLIDE', label: '⛰️ Landslides' },
            { id: 'HEATWAVE', label: '☀️ Heatwaves' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeCategoryFilter === cat.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right: Map Type Toggle */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 p-1">
            <button
              onClick={() => setActiveBasemap('bhuvan')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                activeBasemap === 'bhuvan'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🛰️ ISRO BHUVAN MAP
            </button>
            <button
              onClick={() => setActiveBasemap('carto')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                activeBasemap === 'carto'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🗺️ STANDARD MAP
            </button>
          </div>

          <button
            onClick={() => {
              setMapCenter([22.5, 82.0]);
              setMapZoom(5);
            }}
            className="p-2 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-300 hover:text-white shadow-xl"
            title="Reset to All-India View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="w-full h-full relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="w-full h-full"
          zoomControl={false}
          attributionControl={false}
        >
          <MapController targetCenter={mapCenter} targetZoom={mapZoom} />

          {/* Base Layer */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            maxZoom={19}
            subdomains="abcd"
          />

          {/* ISRO Bhuvan Open WMS */}
          {activeBasemap === 'bhuvan' && (
            <WMSTileLayer
              url="https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms"
              layers="india3"
              format="image/png"
              transparent={true}
              version="1.1.1"
              opacity={0.75}
            />
          )}

          {/* Render Hazards with DANGER COLOURS */}
          {filteredHazards.map((hazard) => {
            const severity = SEVERITY_LEVELS[hazard.severity] || SEVERITY_LEVELS.HIGH;
            const radiusMeters = (hazard.radiusKm || 20) * 1000;
            const isSelected = selectedHazard?.id === hazard.id;
            const firstHospital = hazard.emergencyServices?.hospitals?.[0];
            const firstPolice = hazard.emergencyServices?.policeStations?.[0];

            return (
              <React.Fragment key={hazard.id}>
                
                {/* 1. Main Danger Zone (Red/Orange/Yellow circle) */}
                <Circle
                  center={[hazard.lat, hazard.lng]}
                  radius={radiusMeters}
                  pathOptions={{
                    color: severity.color,
                    fillColor: severity.color,
                    fillOpacity: isSelected ? 0.35 : 0.22,
                    weight: isSelected ? 3 : 2
                  }}
                  eventHandlers={{
                    click: () => onSelectHazard(hazard)
                  }}
                />

                {/* 2. Cascading secondary danger buffer (Purple dashed) */}
                {showCascading && hazard.cascadingRisks && hazard.cascadingRisks.length > 0 && (
                  <Circle
                    center={[hazard.lat, hazard.lng]}
                    radius={radiusMeters * 1.5}
                    pathOptions={{
                      color: '#a855f7',
                      fillColor: '#7c3aed',
                      fillOpacity: 0.08,
                      weight: 1.5,
                      dashArray: '6, 12'
                    }}
                  />
                )}

                {/* 3. Center Marker Pin */}
                <CircleMarker
                  center={[hazard.lat, hazard.lng]}
                  radius={isSelected ? 10 : 7}
                  pathOptions={{
                    color: '#ffffff',
                    fillColor: severity.color,
                    fillOpacity: 1,
                    weight: 2
                  }}
                  eventHandlers={{
                    click: () => onSelectHazard(hazard)
                  }}
                >
                  <Popup>
                    <div className="p-3.5 max-w-xs text-slate-100 bg-slate-950 rounded-xl">
                      
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${severity.bgClass}`}>
                          {severity.badge}
                        </span>
                        <span className="text-[10px] text-amber-400 font-bold">
                          Danger: {hazard.riskScore}/100
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-1 leading-snug">
                        {hazard.title}
                      </h4>
                      <p className="text-xs text-slate-400 mb-2.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        {hazard.state} ({hazard.districts?.slice(0, 2).join(', ')})
                      </p>

                      {/* Nearest Emergency Services Box in Map Popup! */}
                      {firstHospital && (
                        <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-xs mb-2 space-y-1">
                          <div className="font-bold text-emerald-400 flex items-center gap-1">
                            <HeartPulse className="w-3.5 h-3.5" /> Nearest Hospital:
                          </div>
                          <div className="text-white text-[11px] truncate">{firstHospital.name}</div>
                          <div className="text-[10px] text-slate-300 font-mono">
                            📍 {firstHospital.distance} · Call: {firstHospital.phone}
                          </div>
                        </div>
                      )}

                      {firstPolice && (
                        <div className="p-2 rounded bg-blue-950/30 border border-blue-800/40 text-xs mb-3 space-y-1">
                          <div className="font-bold text-blue-400 flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5" /> Nearest Police:
                          </div>
                          <div className="text-white text-[11px] truncate">{firstPolice.name}</div>
                          <div className="text-[10px] text-slate-300 font-mono">
                            📍 {firstPolice.distance} · Call: {firstPolice.phone}
                          </div>
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <button
                          onClick={() => onOpenEmergency(hazard)}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                        >
                          <HeartPulse className="w-3.5 h-3.5" />
                          See All Nearby Hospitals & Police
                        </button>

                        <button
                          onClick={() => onInspectHazard(hazard)}
                          className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-all"
                        >
                          Read Full Disaster Details
                        </button>
                      </div>

                    </div>
                  </Popup>
                </CircleMarker>

              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Bottom Map Legend: Plain Easy English */}
      <div className="absolute bottom-3 left-3 right-3 z-[400] flex flex-wrap items-end justify-between gap-2 pointer-events-none">
        
        {/* Hotspot Jump Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar p-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl pointer-events-auto max-w-xl">
          <span className="text-[10px] font-bold uppercase text-slate-500 px-1 font-mono">
            Jump to:
          </span>
          {hotspots.map((hs) => (
            <button
              key={hs.name}
              onClick={() => {
                setMapCenter(hs.center);
                setMapZoom(hs.zoom);
              }}
              className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 whitespace-nowrap transition-colors"
            >
              {hs.name}
            </button>
          ))}
        </div>

        {/* Danger Colour Guide in Simple Words */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl text-[10px] font-bold pointer-events-auto">
          <span className="text-slate-400">DANGER LEVEL:</span>
          <div className="flex items-center gap-1 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Red: Extreme
          </div>
          <div className="flex items-center gap-1 text-orange-400">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Orange: High
          </div>
          <div className="flex items-center gap-1 text-yellow-300">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Yellow: Medium
          </div>
          <div className="flex items-center gap-1 text-purple-300">
            <span className="w-2.5 h-0 border-t border-dashed border-purple-400"></span> Purple: Spreading Next
          </div>
        </div>

      </div>

    </div>
  );
}
