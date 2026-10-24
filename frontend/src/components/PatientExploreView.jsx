import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { HOSPITALS_DATA, generateABDMFacilityForQuery } from '../data/hospitalsData';
import { searchHospitalsInIndiaMaps, fetchNearbyHospitalsByCoords } from '../services/indiaMapsService';
import { DOCTORS_DATA } from '../data/doctorsData';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  PhoneCall,
  FileText,
  CreditCard,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Star,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function PatientExploreView() {
  const {
    t,
    userLocation,
    requestDeviceLocation,
    setIsLocationModalOpen,
    calculateDistanceKm,
    activeToken,
    openHospitalDetail,
    openBookingModal,
    setPatientTab,
    setIsEmergencyModalOpen,
    setIsAddMoneyOpen,
    openAiVideoModal,
    appointments
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');
  const [gpsHospitals, setGpsHospitals] = useState([]);

  // Fetch real-time hospitals from India Maps OpenStreetMap around user's exact coordinates
  useEffect(() => {
    if (!userLocation.lat || !userLocation.lng) return;
    let isMounted = true;
    fetchNearbyHospitalsByCoords(userLocation.lat, userLocation.lng).then(osmList => {
      if (isMounted && Array.isArray(osmList) && osmList.length > 0) {
        setGpsHospitals(osmList);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, [userLocation.lat, userLocation.lng]);

  const specialities = [
    'All',
    'Ophthalmologist',
    'Cardiologist',
    'Neurologist',
    'Orthopedic',
    'Pediatrician',
    'General Physician'
  ];

  // Process all hospitals with live device distance (merging local registry with live GPS OSM facilities)
  const hospitalsWithDistance = useMemo(() => {
    const combined = [...HOSPITALS_DATA];
    const existingNames = new Set(combined.map(h => h.name.toLowerCase()));
    gpsHospitals.forEach(g => {
      if (!existingNames.has(g.name.toLowerCase())) {
        combined.push(g);
      }
    });

    return combined.map(h => {
      const dist = calculateDistanceKm(userLocation.lat, userLocation.lng, h.lat, h.lng);
      return {
        ...h,
        distanceKm: dist
      };
    });
  }, [userLocation.lat, userLocation.lng, calculateDistanceKm, gpsHospitals]);

  // Filter nearby onboarded hospitals sorted by real proximity anywhere in India
  const nearbyHospitals = useMemo(() => {
    let sorted = [...hospitalsWithDistance]
      .filter(h => h.distanceKm !== null)
      .sort((a, b) => a.distanceKm - b.distanceKm);

    // If the closest hospital is > 15km away and we haven't received OSM GPS facilities yet,
    // dynamically synthesize realistic local ABDM district facilities right in their city / area
    if (userLocation.lat && userLocation.lng && (!sorted.length || sorted[0].distanceKm > 15)) {
      const cityName = userLocation.city || "Local";
      const stateName = userLocation.state || "India";
      const uLat = userLocation.lat;
      const uLng = userLocation.lng;

      const dynamicLocalFacilities = [
        {
          id: `local-dh-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
          name: `Government General Hospital, ${cityName}`,
          type: "State Govt Apex Teaching Hospital",
          address: `MG Road, Civil Lines, ${cityName}`,
          city: cityName,
          state: stateName,
          pin: "500001",
          lat: uLat + 0.009,
          lng: uLng + 0.007,
          distanceKm: calculateDistanceKm(uLat, uLng, uLat + 0.009, uLng + 0.007),
          phone: "+91 1800 11 4477",
          emergencyPhone: "+91 108",
          rating: 4.4,
          reviewCount: 2340,
          waitTimeMins: 25,
          waitTrend: "down",
          deltaMins: 6,
          emergency24x7: true,
          isGovt: true,
          onboarded: true,
          abdmId: `IN-ABDM-${cityName.toUpperCase()}-01`,
          abhaCompliant: true,
          consultationFee: 0,
          specialities: ["General Medicine", "Emergency Care", "Cardiology", "Orthopedics", "Pediatrics"],
          departments: [
            { id: "dept-loc-1", name: "Govt General Medicine OPD", code: "GEN", servingToken: "G-14", waitingCount: 12, avgWait: 25, doctor: "Dr. Medical Officer" },
            { id: "dept-loc-2", name: "Emergency Casualty 24x7", code: "EMER", servingToken: "EC-04", waitingCount: 2, avgWait: 5, doctor: "Casualty Officer" }
          ]
        },
        {
          id: `local-chc-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
          name: `${cityName} Community Health Centre (CHC)`,
          type: "Govt Community Health Centre (ABDM Fast-Track)",
          address: `Hospital Road, ${cityName}`,
          city: cityName,
          state: stateName,
          pin: "500001",
          lat: uLat - 0.015,
          lng: uLng + 0.012,
          distanceKm: calculateDistanceKm(uLat, uLng, uLat - 0.015, uLng + 0.012),
          phone: "+91 1800 11 4477",
          emergencyPhone: "+91 108",
          rating: 4.5,
          reviewCount: 1420,
          waitTimeMins: 15,
          waitTrend: "down",
          deltaMins: 4,
          emergency24x7: true,
          isGovt: true,
          onboarded: true,
          abdmId: `IN-ABDM-${cityName.toUpperCase()}-02`,
          abhaCompliant: true,
          consultationFee: 0,
          specialities: ["General Medicine", "Pediatrics", "Ophthalmology", "ENT"],
          departments: [
            { id: "dept-chc-1", name: "General OPD & Triage", code: "GEN", servingToken: "C-08", waitingCount: 5, avgWait: 15, doctor: "Dr. Health Officer" }
          ]
        },
        {
          id: `local-apex-${cityName.toLowerCase().replace(/\s+/g, '-')}`,
          name: `Apex Multi-Speciality Hospital, ${cityName}`,
          type: "NABH Multi-Speciality Hospital",
          address: `Bypass Junction, ${cityName}`,
          city: cityName,
          state: stateName,
          pin: "500001",
          lat: uLat + 0.022,
          lng: uLng - 0.018,
          distanceKm: calculateDistanceKm(uLat, uLng, uLat + 0.022, uLng - 0.018),
          phone: "+91 40 4345 6789",
          emergencyPhone: "+91 108",
          rating: 4.6,
          reviewCount: 3120,
          waitTimeMins: 12,
          waitTrend: "up",
          deltaMins: 5,
          emergency24x7: true,
          isGovt: false,
          onboarded: true,
          abdmId: `IN-ABDM-${cityName.toUpperCase()}-03`,
          abhaCompliant: true,
          consultationFee: 350,
          specialities: ["Cardiology", "Orthopedics", "General Medicine", "Emergency Care"],
          departments: [
            { id: "dept-apx-1", name: "Executive OPD & Cardiology", code: "CARD", servingToken: "AX-22", waitingCount: 6, avgWait: 12, doctor: "Senior Consultant" }
          ]
        }
      ];

      sorted = [...dynamicLocalFacilities, ...sorted].sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return sorted.slice(0, 10);
  }, [hospitalsWithDistance, userLocation.lat, userLocation.lng, userLocation.city, userLocation.state, calculateDistanceKm]);

  // Filter top doctors based on chip
  const filteredDoctors = DOCTORS_DATA.filter(doc => {
    if (selectedSpeciality === 'All') return true;
    return doc.speciality.toLowerCase().includes(selectedSpeciality.toLowerCase()) ||
           doc.doctorType?.toLowerCase().includes(selectedSpeciality.toLowerCase());
  });

  const [mapResults, setMapResults] = useState([]);
  const [isSearchingMaps, setIsSearchingMaps] = useState(false);

  // Debounced live India Maps query
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 3) {
      setMapResults([]);
      setIsSearchingMaps(false);
      return;
    }

    let isMounted = true;
    setIsSearchingMaps(true);

    const timer = setTimeout(async () => {
      try {
        const results = await searchHospitalsInIndiaMaps(searchQuery);
        if (isMounted) {
          setMapResults(results);
          setIsSearchingMaps(false);
        }
      } catch (err) {
        if (isMounted) setIsSearchingMaps(false);
      }
    }, 450);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // Filter search results across all hospitals in India (Local + Live India Maps) with proximity distances
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const local = hospitalsWithDistance.filter(h =>
      h.name.toLowerCase().includes(query) ||
      h.city.toLowerCase().includes(query) ||
      h.state?.toLowerCase().includes(query) ||
      h.pin.includes(query) ||
      h.type.toLowerCase().includes(query) ||
      h.specialities.some(s => s.toLowerCase().includes(query))
    );

    const existingNames = new Set(local.map(h => h.name.toLowerCase()));
    const additionalMaps = mapResults.filter(m => !existingNames.has(m.name.toLowerCase())).map(m => ({
      ...m,
      distanceKm: calculateDistanceKm(userLocation.lat, userLocation.lng, m.lat, m.lng)
    }));
    return [...local, ...additionalMaps].sort((a, b) => {
      if (a.distanceKm != null && b.distanceKm != null) return a.distanceKm - b.distanceKm;
      return 0;
    });
  }, [searchQuery, mapResults, hospitalsWithDistance, userLocation.lat, userLocation.lng, calculateDistanceKm]);

  const upcomingApp = appointments.find(a => a.category === 'upcoming' || a.category === 'today');

  return (
    <div className="pb-24 pt-2 px-4 space-y-5 animate-fadeIn">
      {/* Top ABDM Simulation Grid / Demo Notice */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-gradient-to-r from-[#E6F9F4] to-[#F5F6F8] dark:from-emerald-950/40 dark:to-[#1B1B1B] rounded-xl border border-[#00D09C]/30 text-[11px] text-[#44475B] dark:text-[#E8E8EC]">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D09C] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D09C]"></span>
          </span>
          <span className="font-bold text-[#00B386]">ABDM Fast-Track Grid</span>
          <span className="text-[10px] text-[#7C7E8C] hidden sm:inline">• Live OPD Queue Telemetry (Demo & Synthetic Data)</span>
        </div>
        <span className="font-mono text-[10px] bg-white dark:bg-[#232323] px-2 py-0.5 rounded-full border border-[#00D09C]/30 text-[#00B386] font-semibold">
          Synced: Live (15 Oct 2026)
        </span>
      </div>

      {/* Live Location Access Banner (when not yet locked to live GPS) */}
      {!userLocation?.isLiveGPS && (
        <div className="p-3.5 bg-gradient-to-r from-[#EEF0FF] via-white to-[#E6F9F4] dark:from-indigo-950/60 dark:via-[#1B1B1B] dark:to-emerald-950/40 rounded-2xl border border-[#5367FF]/30 flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#5367FF] text-white flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
              <Navigation className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <h4 className="text-xs font-bold text-[#44475B] dark:text-white leading-tight">
                  Allow Live Location Access
                </h4>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#5367FF] text-white">
                  GPS
                </span>
              </div>
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] truncate mt-0.5">
                Automatically detect nearby hospitals, live OPD queues & travel distance
              </p>
            </div>
          </div>
          <button
            onClick={() => requestDeviceLocation(false)}
            disabled={userLocation?.loading}
            className="ml-2 px-3.5 py-2 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-bold text-xs flex items-center space-x-1 shadow-md active:scale-95 transition-all flex-shrink-0"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{userLocation?.loading ? "Detecting..." : "Enable GPS"}</span>
          </button>
        </div>
      )}

      {/* 1. NEARBY HOSPITALS - Front and Center at the Very Start of Home Screen */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-[17px] font-extrabold text-[#44475B] dark:text-white flex items-center">
                <MapPin className="w-4 h-4 text-[#00D09C] mr-1.5" />
                {t('nearbyHospitalsTitle')}
              </h3>
              {userLocation?.isLiveGPS ? (
                <span className="px-2 py-0.5 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/70 text-[#00B386] font-extrabold text-[10px] uppercase tracking-wider flex items-center shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] mr-1 animate-pulse" />
                  Live GPS
                </span>
              ) : (
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="px-2 py-0.5 rounded-full bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] font-bold text-[10px] hover:underline flex items-center"
                >
                  📍 Change City / GPS
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] mt-0.5">
              Showing hospitals closest to <strong className="text-[#44475B] dark:text-[#E8E8EC]">{userLocation?.address || userLocation?.city || "your location"}</strong>
            </p>
          </div>
          <button
            onClick={() => setPatientTab('hospitals')}
            className="text-xs font-bold text-[#00B386] dark:text-[#00D09C] flex items-center hover:underline bg-[#E6F9F4] dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg flex-shrink-0"
          >
            {t('viewAll')} <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Horizontal Scrolling Row of Closest Hospitals */}
        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 snap-x">
          {nearbyHospitals.map(hosp => (
            <div
              key={hosp.id}
              onClick={() => openHospitalDetail(hosp)}
              className="min-w-[240px] max-w-[250px] flex-shrink-0 snap-start bg-white dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] p-3.5 hover:border-[#00D09C] transition-all cursor-pointer shadow-groww-card flex flex-col justify-between"
            >
              <div>
                {/* Card Top: Initials Badge, Distance Pill, Rating */}
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F6F8] dark:bg-[#232323] border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-center font-bold text-xs text-[#44475B] dark:text-white">
                    {hosp.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {hosp.distanceKm != null && (
                      <span className="text-[10px] font-extrabold text-[#5367FF] bg-[#EEF0FF] dark:bg-indigo-950/70 px-2 py-0.5 rounded-md flex items-center shadow-xs">
                        <MapPin className="w-2.5 h-2.5 mr-0.5 text-[#5367FF]" />
                        {hosp.distanceKm} km away
                      </span>
                    )}
                    <div className="flex items-center space-x-0.5 text-[11px] font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{hosp.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Hospital Name & Subtitle */}
                <h4 className="font-bold text-xs text-[#44475B] dark:text-white mt-2.5 line-clamp-1 leading-snug">
                  {hosp.name}
                </h4>
                <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] line-clamp-1 mt-0.5">
                  {hosp.city} • {hosp.type}
                </p>

                {/* Wait Time & Trend */}
                <div className="mt-2.5 pt-2 border-t border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7C7E8C] dark:text-[#9A9A9A]">Avg OPD Wait</span>
                    <p className="text-sm font-bold text-[#44475B] dark:text-white">
                      ~{hosp.waitTimeMins} mins
                    </p>
                  </div>

                  <div className={`flex items-center text-xs font-semibold ${
                    hosp.waitTrend === 'down' ? 'text-[#00B386]' : 'text-[#EB5B3C]'
                  }`}>
                    {hosp.waitTrend === 'down' ? (
                      <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                    )}
                    <span>{hosp.waitTrend === 'down' ? '▼' : '▲'} {hosp.deltaMins}m</span>
                  </div>
                </div>

                {/* Fee Status & Verified Tag */}
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="text-[#00B386] font-medium bg-[#E6F9F4] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    ● ABDM Verified
                  </span>
                  <span className="font-semibold text-[#44475B] dark:text-slate-300">
                    {hosp.isGovt ? "Free OPD" : `₹${hosp.consultationFee}`}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Book Token & Directions */}
              <div className="mt-3 pt-2 border-t border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center space-x-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openBookingModal(hosp);
                  }}
                  className="flex-1 py-1.5 px-2 bg-[#00D09C] hover:bg-[#00B386] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1 active:scale-95"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Book Token</span>
                </button>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hosp.lat},${hosp.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="py-1.5 px-2.5 bg-[#F5F6F8] dark:bg-[#232323] hover:bg-[#E8E8EC] text-[#44475B] dark:text-white rounded-xl text-xs font-semibold flex items-center justify-center border border-[#E8E8EC] dark:border-[#2C2C2C] transition-all"
                  title="Open Google Maps Directions"
                >
                  <Navigation className="w-3 h-3 text-[#5367FF]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Search Bar - Groww exact placeholder style */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#7C7E8C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-full border border-transparent focus:border-[#00D09C] focus:bg-white dark:focus:bg-[#121212] focus:outline-none transition-all placeholder:text-[#7C7E8C]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-xs text-[#7C7E8C] hover:text-[#44475B] p-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* Autocomplete Search Dropdown */}
        {searchQuery.trim() && (
          <div className="absolute top-12 left-0 right-0 z-40 bg-white dark:bg-[#1B1B1B] rounded-xl border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-lg max-h-72 overflow-y-auto divide-y divide-[#E8E8EC] dark:divide-[#2C2C2C]">
            {isSearchingMaps && (
              <div className="p-2.5 bg-[#EEF0FF] dark:bg-indigo-950/40 text-[11px] text-[#5367FF] font-medium flex items-center space-x-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#5367FF] animate-ping" />
                <span>Searching live India Maps across all states...</span>
              </div>
            )}
            {searchResults.length > 0 ? (
              searchResults.map(hosp => (
                <div
                  key={hosp.id}
                  onClick={() => {
                    openHospitalDetail(hosp);
                    setSearchQuery('');
                  }}
                  className="p-3 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="text-xs font-semibold text-[#44475B] dark:text-white line-clamp-1">{hosp.name}</h4>
                      {hosp.isLiveMapResult && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#EEF0FF] dark:bg-indigo-950/60 text-[#5367FF] rounded flex-shrink-0">
                          Maps
                        </span>
                      )}
                      {hosp.isGovt && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#E0F2F1] dark:bg-teal-950/60 text-[#00897B] rounded flex-shrink-0">
                          Govt
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#7C7E8C]">{hosp.type} • {hosp.city}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-semibold text-[#00B386]">~{hosp.waitTimeMins}m wait</span>
                    <div className="flex items-center justify-end space-x-1 text-[10px] text-[#7C7E8C]">
                      {hosp.distanceKm != null && (
                        <span className="font-bold text-[#5367FF]">{hosp.distanceKm} km •</span>
                      )}
                      <span>{hosp.rating} ★</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                onClick={() => {
                  const dynamicHosp = generateABDMFacilityForQuery(searchQuery);
                  openHospitalDetail(dynamicHosp);
                  setSearchQuery('');
                }}
                className="p-3.5 hover:bg-[#F5F6F8] dark:hover:bg-[#222222] cursor-pointer flex items-center justify-between bg-[#E6F9F4]/50 dark:bg-emerald-950/20 transition-colors"
              >
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-[#00D09C] text-white">
                      ABDM Facility
                    </span>
                    <span className="text-xs font-semibold text-[#44475B] dark:text-white line-clamp-1">
                      {searchQuery}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#7C7E8C] dark:text-[#9A9A9A] mt-0.5">
                    National Health Facility Registry (HFR) — Click to view OPD queue & book token
                  </p>
                </div>
                <span className="text-xs font-bold text-[#00D09C] ml-2 flex-shrink-0">
                  Open & Book →
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Round-icon Shortcuts (Groww "Services & Tools") - Placed prominently at top */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[15px] font-semibold text-[#44475B] dark:text-white">
            {t('servicesTools')}
          </h3>
          <span onClick={() => setPatientTab('hospitals')} className="text-[11px] font-medium text-[#5367FF] cursor-pointer hover:underline">
            All tools
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2 text-center">
          {/* Shortcut 1: Book Appointment - Context-aware matching active hospital */}
          <button
            onClick={() => {
              const targetHosp = (activeToken && HOSPITALS_DATA.find(h => h.id === activeToken.hospitalId)) || HOSPITALS_DATA.find(h => h.id === 'hosp-1') || HOSPITALS_DATA[0];
              openBookingModal(targetHosp);
            }}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 border border-[#00D09C]/20 flex items-center justify-center text-[#00B386] group-hover:scale-105 transition-transform shadow-sm">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-[#44475B] dark:text-[#E8E8EC] mt-1.5 line-clamp-1">
              Book
            </span>
          </button>

          {/* Shortcut 2: Live Token */}
          <button
            onClick={() => setPatientTab('appointments')}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#EEF0FF] dark:bg-indigo-950/60 border border-[#5367FF]/20 flex items-center justify-center text-[#5367FF] group-hover:scale-105 transition-transform shadow-sm">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-[#44475B] dark:text-[#E8E8EC] mt-1.5 line-clamp-1">
              Live Token
            </span>
          </button>

          {/* Shortcut 3: Nearby Hospitals */}
          <button
            onClick={() => setPatientTab('hospitals')}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#F5F6F8] dark:bg-[#222222] border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-center text-[#44475B] dark:text-white group-hover:scale-105 transition-transform shadow-sm">
              <MapPin className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-[10px] font-medium text-[#44475B] dark:text-[#E8E8EC] mt-1.5 line-clamp-1">
              Nearby
            </span>
          </button>

          {/* Shortcut 4: Emergency (108) */}
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#FDEEEA] dark:bg-rose-950/60 border border-[#EB5B3C]/30 flex items-center justify-center text-[#EB5B3C] group-hover:scale-105 transition-transform shadow-sm">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold text-[#EB5B3C] mt-1.5 line-clamp-1">
              Call 108
            </span>
          </button>

          {/* Shortcut 5: Reports */}
          <button
            onClick={() => setPatientTab('profile')}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#F5F6F8] dark:bg-[#222222] border border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-center text-[#7C7E8C] dark:text-[#9A9A9A] group-hover:scale-105 transition-transform shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-[#44475B] dark:text-[#E8E8EC] mt-1.5 line-clamp-1">
              Reports
            </span>
          </button>

          {/* Shortcut 6: Pay Bills / Wallet */}
          <button
            onClick={() => setIsAddMoneyOpen(true)}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 border border-[#00D09C]/20 flex items-center justify-center text-[#00B386] group-hover:scale-105 transition-transform shadow-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-medium text-[#44475B] dark:text-[#E8E8EC] mt-1.5 line-clamp-1">
              Wallet
            </span>
          </button>
        </div>
      </div>

      {/* 3. YOUR LIVE TOKEN CARD (Positions equivalent) */}
      {activeToken && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-[#F5F6F8] dark:from-[#1B1B1B] dark:to-[#171717] border border-[#00D09C]/40 p-4 shadow-groww-card transition-all">
          {/* Top badge and Live Pulse */}
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D09C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00D09C]"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#00B386] dark:text-[#00D09C]">
                {t('yourLiveToken')} • {activeToken.department}
              </span>
            </div>

            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-[#EEF0FF] dark:bg-indigo-950/80 text-[#5367FF]">
              {activeToken.date}
            </span>
          </div>

          {/* Token Numbers & Status */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">Your Token Number</p>
              <h2 className="text-3xl font-bold tracking-tight text-[#44475B] dark:text-white mt-0.5">
                {activeToken.tokenNumber}
              </h2>
              <p className="text-xs font-medium text-[#44475B] dark:text-slate-300 mt-1 line-clamp-1">
                {activeToken.hospitalName}
              </p>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">{t('nowServing')}</p>
              <div className="text-2xl font-bold text-[#00B386] dark:text-[#00D09C]">
                {activeToken.currentServingToken}
              </div>
              <div className="flex items-center justify-end space-x-1 mt-0.5 text-[11px] font-semibold text-[#FFA24C]">
                <Clock className="w-3 h-3" />
                <span>~{Math.max(3, activeToken.estimatedWaitMins - 3)}-{activeToken.estimatedWaitMins + 4}m wait</span>
              </div>
            </div>
          </div>

          {/* Queue Progress Bar */}
          <div className="mt-1 space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
              <span>Queue progress ({activeToken.tokensAhead} ahead of you)</span>
              <span className="font-medium text-[#00B386]">
                {activeToken.status}
              </span>
            </div>
            <div className="w-full bg-[#E8E8EC] dark:bg-[#2C2C2C] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#00D09C] h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.min(100, Math.max(15, 100 - activeToken.tokensAhead * 15))}%`
                }}
              />
            </div>
          </div>

          {/* Card Action footer (No simulation button in patient view!) */}
          <div className="mt-3.5 pt-2.5 border-t border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between">
            <button
              onClick={() => setPatientTab('appointments')}
              className="text-xs font-semibold text-[#5367FF] hover:underline flex items-center"
            >
              View OPD QR Ticket <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>

            <div className="flex items-center space-x-1.5 text-[11px] font-medium text-[#00B386] bg-[#E6F9F4] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] animate-pulse" />
              <span>{activeToken.roomNo}</span>
            </div>
          </div>
        </div>
      )}




      {/* 5. TOP RATED DOCTORS / MOST BOOKED (Groww Mutual Funds / Top Gainers) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[17px] font-semibold text-[#44475B] dark:text-white">
            {t('topRatedDoctors')}
          </h3>
          <button
            onClick={() => setPatientTab('doctors')}
            className="text-xs font-semibold text-[#00B386] dark:text-[#00D09C] flex items-center hover:underline"
          >
            {t('viewAll')} <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        {/* Filter Chips Row */}
        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
          {specialities.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpeciality(spec)}
              className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0 transition-all ${
                selectedSpeciality === spec
                  ? 'bg-[#EEF0FF] dark:bg-indigo-950/80 text-[#5367FF] border border-[#5367FF]/30 font-semibold'
                  : 'bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C] dark:text-[#9A9A9A] border border-transparent hover:border-[#E8E8EC]'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctor Cards List */}
        <div className="space-y-2.5 mt-2">
          {filteredDoctors.slice(0, 3).map(doc => (
            <div
              key={doc.id}
              className="bg-white dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] p-3.5 flex items-center justify-between hover:border-[#00D09C] transition-all shadow-groww-card"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-11 h-11 rounded-full ${doc.avatarColor} flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0`}>
                  {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-[#44475B] dark:text-white line-clamp-1">
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] line-clamp-1">
                    {doc.speciality} • {doc.hospitalName.split(' ')[0]}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[10px] font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-1 py-0.2 rounded">
                      ★ {doc.rating}
                    </span>
                    <span className="text-[10px] text-[#7C7E8C]">{doc.experienceYears}y exp</span>
                    <span className="text-[10px] font-semibold text-[#00B386]">₹{doc.fee}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openBookingModal(HOSPITALS_DATA.find(h => h.id === doc.hospitalId) || HOSPITALS_DATA[0], doc)}
                className="px-3 py-1.5 rounded-lg bg-[#E6F9F4] dark:bg-emerald-950/70 hover:bg-[#00D09C] text-[#00B386] hover:text-white text-xs font-semibold transition-all flex-shrink-0 shadow-sm"
              >
                {t('bookNow')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 6. UPCOMING APPOINTMENT SUMMARY (Orders equivalent) */}
      {upcomingApp && (
        <div className="bg-[#F5F6F8] dark:bg-[#1B1B1B] rounded-2xl border border-[#E8E8EC] dark:border-[#2C2C2C] p-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8E8EC] dark:border-[#2C2C2C]">
            <span className="text-xs font-semibold text-[#44475B] dark:text-white flex items-center">
              <Calendar className="w-3.5 h-3.5 text-[#5367FF] mr-1.5" />
              {t('upcomingAppointment')}
            </span>
            <span className="text-[11px] font-semibold text-[#00B386] bg-[#E6F9F4] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              {upcomingApp.status}
            </span>
          </div>

          <div className="mt-3 flex items-start justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#44475B] dark:text-white">
                {upcomingApp.doctorName}
              </h4>
              <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
                {upcomingApp.department} • {upcomingApp.hospitalName}
              </p>
              <p className="text-xs font-semibold text-[#5367FF] mt-1">
                {upcomingApp.date} at {upcomingApp.timeSlot}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold px-2 py-1 bg-white dark:bg-[#121212] rounded-lg border border-[#E8E8EC] dark:border-[#2C2C2C] text-[#44475B] dark:text-white">
                #{upcomingApp.tokenNumber}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 7. HEALTH NEWS / HOSPITAL UPDATES (Groww "Stocks in news") */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-[17px] font-semibold text-[#44475B] dark:text-white">
            {t('healthNews')}
          </h3>
          <span className="text-xs font-medium text-[#7C7E8C]">National ABDM Feed</span>
        </div>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card">
            <div className="flex items-center justify-between text-[11px] text-[#7C7E8C] mb-1">
              <span className="font-semibold text-[#5367FF]">AIIMS New Delhi</span>
              <span className="text-[10px]">Source: MoHFW Health Grid • 2h ago</span>
            </div>
            <h4 className="text-xs font-semibold text-[#44475B] dark:text-white">
              AIIMS integrates 100% digital OPD tokens with Ayushman Bharat (ABHA)
            </h4>
            <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] mt-1 line-clamp-2">
              Patients can now link ABHA health ID, cut waiting counter lines from 90 mins to under 15 mins with MediQueue real-time notifications.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card">
            <div className="flex items-center justify-between text-[11px] text-[#7C7E8C] mb-1">
              <span className="font-semibold text-[#00B386]">Hyderabad Health Mission</span>
              <span className="text-[10px]">Source: Telangana Health Grid • 6h ago</span>
            </div>
            <h4 className="text-xs font-semibold text-[#44475B] dark:text-white">
              Apollo & NIMS expand 24x7 acute cardiac trauma express lanes
            </h4>
            <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] mt-1 line-clamp-2">
              Dedicated rapid response ambulances synchronized with 108 emergency dispatch for zero wait door-to-balloon time.
            </p>
          </div>
        </div>
      </div>

      {/* 8. EMERGENCY CALL 108 ONE-TAP STRIP */}
      <div
        onClick={() => setIsEmergencyModalOpen(true)}
        className="rounded-2xl bg-gradient-to-r from-[#FDEEEA] to-[#FFF5F2] dark:from-rose-950/50 dark:to-stone-900 border border-[#EB5B3C]/30 p-4 cursor-pointer hover:shadow-md transition-all flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#EB5B3C] text-white flex items-center justify-center font-bold shadow-sm">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#EB5B3C]">
              {t('emergencyBanner')}
            </h4>
            <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
              {t('emergencyDesc')}
            </p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#EB5B3C] text-white text-xs font-bold shadow-sm">
          {t('call108')}
        </span>
      </div>

      {/* 9. EVALUATOR & JUDGE PRESENTATION SUITE (Dedicated presentation section) */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white p-4.5 border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Evaluator & Judge Presentation Suite
            </span>
          </div>
          <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
            MRK SEVA 360
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          National Health Grid Hackathon Solution: Demonstrating end-to-end ABDM Fast-Track OPD triage, live queue telemetry, facility-scoped reception terminal, and digital QR passes.
        </p>

        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={openAiVideoModal}
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00D09C] to-[#00B386] hover:from-[#00B386] hover:to-[#009E77] text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Solution Video Pitch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
