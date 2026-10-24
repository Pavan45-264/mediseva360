import React, { useEffect } from 'react';
import { MapContainer, TileLayer, WMSTileLayer, Circle, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const severityColors = {
  critical: '#dc2626',
  high: '#ea580c',
  moderate: '#ca8a04',
  low: '#16a34a'
};

const MapController = ({ selectedDisaster }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedDisaster && selectedDisaster.lat && selectedDisaster.lng) {
      map.flyTo([selectedDisaster.lat, selectedDisaster.lng], 8, {
        duration: 1.5
      });
    }
  }, [selectedDisaster, map]);

  return null;
};

const DisasterMap = ({
  disasters = [],
  selectedDisaster = null,
  onSelectDisaster = () => {},
  showCascading = false
}) => {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[22.5, 82.0]}
        zoom={5}
        className="h-full w-full"
        zoomControl={false}
      >
        <MapController selectedDisaster={selectedDisaster} />
        
        {/* OpenStreetMap Fallback */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          zIndex={1}
        />
        
        {/* ISRO Bhuvan WMS Base Map */}
        <WMSTileLayer
          url="https://bhuvan-vec1.nrsc.gov.in/bhuvan/wms"
          layers="india3"
          format="image/png"
          transparent={true}
          zIndex={2}
          attribution="ISRO Bhuvan"
        />

        {disasters.map((disaster) => {
          const color = severityColors[disaster.severity?.toLowerCase()] || severityColors.low;
          const radiusMeters = (disaster.radius || 10) * 1000;

          return (
            <React.Fragment key={disaster.id}>
              {/* Main Affected Area */}
              <Circle
                center={[disaster.lat, disaster.lng]}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.2, weight: 2 }}
                radius={radiusMeters}
                eventHandlers={{
                  click: () => onSelectDisaster(disaster)
                }}
              />

              {/* Center Marker */}
              <CircleMarker
                center={[disaster.lat, disaster.lng]}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.8, weight: 2 }}
                radius={6}
                eventHandlers={{
                  click: () => onSelectDisaster(disaster)
                }}
              >
                <Popup>
                  <div className="p-1 min-w-[200px]">
                    <h3 className="text-lg font-bold mb-1">{disaster.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs text-white uppercase`} style={{ backgroundColor: color }}>
                        {disaster.severity}
                      </span>
                      <span className="text-sm font-medium text-gray-600">{disaster.type}</span>
                    </div>
                    
                    <div className="space-y-1 text-sm mb-2">
                      <p><strong>Status:</strong> {disaster.status}</p>
                      <p><strong>Affected Pop:</strong> {disaster.affectedPopulation?.toLocaleString()}</p>
                      <p><strong>Districts:</strong> {disaster.affectedDistricts?.join(', ')}</p>
                      <p><strong>State:</strong> {disaster.state}</p>
                      {disaster.cascadingRiskScore && (
                        <p><strong>Cascading Risk Score:</strong> {disaster.cascadingRiskScore}/10</p>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-700 border-t pt-2 mt-2">
                      {disaster.description}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>

              {/* Cascading Risk Zone */}
              {showCascading && (
                <Circle
                  center={[disaster.lat, disaster.lng]}
                  pathOptions={{
                    color: '#6366f1', // Indigo for cascading
                    fillColor: 'transparent',
                    weight: 2,
                    dashArray: '5, 10'
                  }}
                  radius={radiusMeters * 1.5}
                />
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 bg-slate-900/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-700 z-[400]">
        <h4 className="text-sm font-semibold mb-2 text-slate-200">Severity Level</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#dc2626]"></div>
            <span className="text-sm text-slate-300">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#ea580c]"></div>
            <span className="text-sm text-slate-300">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#ca8a04]"></div>
            <span className="text-sm text-slate-300">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#16a34a]"></div>
            <span className="text-sm text-slate-300">Low</span>
          </div>
          {showCascading && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700">
              <div className="w-4 h-0 border-t-2 border-dashed border-indigo-500"></div>
              <span className="text-sm text-purple-300">Cascading Zone</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisasterMap;
