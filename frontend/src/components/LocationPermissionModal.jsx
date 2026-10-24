import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, Compass, X, Search, Building2, CheckCircle2 } from 'lucide-react';

// Popular Indian City Coordinates for instant manual selection
const TOP_INDIAN_CITIES = [
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, address: "Hyderabad, Telangana" },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, address: "Bengaluru, Karnataka" },
  { name: "Delhi NCR", state: "Delhi", lat: 28.6139, lng: 77.2090, address: "New Delhi, Delhi NCR" },
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, address: "Mumbai, Maharashtra" },
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, address: "Vijayawada, Andhra Pradesh" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, address: "Visakhapatnam, Andhra Pradesh" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, address: "Chennai, Tamil Nadu" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, address: "Kolkata, West Bengal" },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, address: "Pune, Maharashtra" },
  { name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365, address: "Guntur, Andhra Pradesh" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, address: "Ahmedabad, Gujarat" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, address: "Jaipur, Rajasthan" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, address: "Lucknow, Uttar Pradesh" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, address: "Kochi, Kerala" },
  { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, address: "Patna, Bihar" },
  { name: "Chandigarh", state: "Punjab", lat: 30.7333, lng: 76.7794, address: "Chandigarh" }
];

export default function LocationPermissionModal() {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    userLocation,
    setUserLocation,
    requestDeviceLocation,
    showToast
  } = useApp();

  const [showManualPicker, setShowManualPicker] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  if (!isLocationModalOpen) return null;

  const handleAllowGps = () => {
    requestDeviceLocation(false);
  };

  const handleSelectCity = (cityObj) => {
    const updated = {
      lat: cityObj.lat,
      lng: cityObj.lng,
      address: cityObj.address,
      city: cityObj.name,
      state: cityObj.state,
      isAccurate: true,
      isLiveGPS: false,
      accuracyMeters: 500,
      loading: false,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setUserLocation(updated);
    try {
      localStorage.setItem('mq_device_location', JSON.stringify(updated));
    } catch {}
    setIsLocationModalOpen(false);
    showToast(`📍 Location set to ${cityObj.name}! Showing nearest hospitals.`, 'success', 'Location Set');
  };

  const handleDismiss = () => {
    setIsLocationModalOpen(false);
  };

  const filteredCities = TOP_INDIAN_CITIES.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.state.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-[#151515] rounded-3xl p-6 border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-2xl space-y-4 animate-scaleUp relative overflow-hidden">
        
        {/* Decorative Top Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00D09C] via-[#5367FF] to-[#00D09C]" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#7C7E8C] hover:bg-[#F5F6F8] dark:hover:bg-[#222222] transition-colors"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>

        {!showManualPicker ? (
          <>
            {/* Radar / GPS Visual */}
            <div className="flex flex-col items-center text-center pt-2">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E6F9F4] to-[#EEF0FF] dark:from-emerald-950/60 dark:to-indigo-950/60 border border-[#00D09C]/40 flex items-center justify-center text-[#00B386] shadow-sm mb-3">
                <Navigation className="w-8 h-8 text-[#00D09C] animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D09C] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00D09C]" />
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-[#44475B] dark:text-white">
                Find Hospitals Near You
              </h3>
              <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A] mt-1 max-w-xs leading-relaxed">
                Allow device location access so MediQueue can display <strong>nearby hospitals with exact travel distance</strong> and <strong>live OPD wait times</strong> wherever you are in India.
              </p>
            </div>

            {/* Current Region Pill */}
            <div className="p-3 rounded-2xl bg-[#F5F6F8] dark:bg-[#1E1E1E] border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 min-w-0">
                <MapPin className="w-4 h-4 text-[#5367FF] flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-[#7C7E8C] block uppercase font-bold tracking-wider">
                    Current Region
                  </span>
                  <span className="font-semibold text-[#44475B] dark:text-white truncate block">
                    {userLocation?.address || "Hyderabad, Telangana"}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                userLocation?.isLiveGPS
                  ? 'bg-[#E6F9F4] text-[#00B386]'
                  : 'bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF]'
              }`}>
                {userLocation?.isLiveGPS ? '● Live GPS' : 'Auto-Detected'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAllowGps}
                disabled={userLocation?.loading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#00D09C] to-[#00B386] hover:opacity-95 text-white font-extrabold text-sm shadow-md shadow-emerald-500/20 active:scale-98 transition-all flex items-center justify-center space-x-2"
              >
                <Navigation className={`w-4 h-4 ${userLocation?.loading ? 'animate-spin' : ''}`} />
                <span>{userLocation?.loading ? "Requesting Browser GPS..." : "📍 Allow Live GPS Access"}</span>
              </button>

              {/* Quick Indian City Chips for 1-click selection */}
              <div>
                <p className="text-[11px] font-semibold text-[#7C7E8C] dark:text-[#9A9A9A] mb-1.5 text-center">
                  Or select your city in India:
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center max-h-24 overflow-y-auto no-scrollbar py-1">
                  {TOP_INDIAN_CITIES.slice(0, 8).map(city => (
                    <button
                      key={city.name}
                      onClick={() => handleSelectCity(city)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-[#E8E8EC] hover:bg-[#00D09C] hover:text-white border border-[#E8E8EC] dark:border-[#2C2C2C] transition-all"
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowManualPicker(true)}
                className="w-full py-2 px-4 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] bg-white dark:bg-[#1A1A1A] hover:bg-[#F5F6F8] dark:hover:bg-[#222222] text-[#44475B] dark:text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-[#5367FF]" />
                <span>Search All 28 States & Cities</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-[#7C7E8C] pt-1">
              🔒 Location is used solely to calculate hospital distances and is never stored on servers.
            </p>
          </>
        ) : (
          /* Manual City Selector View */
          <div className="space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-[#00D09C]" />
                <h3 className="font-bold text-sm text-[#44475B] dark:text-white">Select Your City in India</h3>
              </div>
              <button
                onClick={() => setShowManualPicker(false)}
                className="text-xs text-[#5367FF] font-semibold hover:underline"
              >
                ← Back
              </button>
            </div>

            {/* City Search Bar */}
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-[#7C7E8C] absolute left-3" />
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Search city, district, or state..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-[#F5F6F8] dark:bg-[#222222] text-[#44475B] dark:text-white rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] focus:outline-none focus:border-[#00D09C]"
                autoFocus
              />
            </div>

            {/* Cities Grid List */}
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto no-scrollbar pt-1">
              {filteredCities.map(c => (
                <button
                  key={c.name}
                  onClick={() => handleSelectCity(c)}
                  className="p-2.5 rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1E1E1E] hover:border-[#00D09C] hover:bg-[#E6F9F4] dark:hover:bg-emerald-950/40 text-left transition-all group"
                >
                  <span className="font-bold text-xs text-[#44475B] dark:text-white group-hover:text-[#00B386] block truncate">
                    {c.name}
                  </span>
                  <span className="text-[10px] text-[#7C7E8C] block truncate">
                    {c.state}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={handleAllowGps}
              className="w-full py-2.5 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center justify-center space-x-1 transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Or Use Device GPS Coordinates</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
