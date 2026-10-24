// ============================================================================
// PRALAYA AI — SIMPLE & ACCESSIBLE DISASTER INTELLIGENCE FOR EVERY CITIZEN
// Clear language, emergency hospitals, police stations, and safe shelters
// ============================================================================

export const SEVERITY_LEVELS = {
  CRITICAL: {
    label: "EXTREME DANGER",
    color: "#ff1744",
    bgClass: "bg-red-500/20 text-red-400 border-red-500/50",
    glowClass: "glow-crimson",
    badge: "🔴 EXTREME DANGER",
    simpleAdvice: "Leave this area immediately. Go to the nearest safe shelter.",
    priority: 1
  },
  HIGH: {
    label: "HIGH DANGER",
    color: "#ff6d00",
    bgClass: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    glowClass: "glow-amber",
    badge: "🟠 HIGH DANGER",
    simpleAdvice: "Be ready to leave. Pack your emergency bag and documents.",
    priority: 2
  },
  ELEVATED: {
    label: "MEDIUM DANGER",
    color: "#ffd600",
    bgClass: "bg-yellow-500/20 text-yellow-300 border-yellow-500/50",
    glowClass: "shadow-[0_0_15px_rgba(255,214,0,0.3)]",
    badge: "🟡 MEDIUM DANGER",
    simpleAdvice: "Stay alert. Watch the weather and keep mobile phone charged.",
    priority: 3
  },
  GUARDED: {
    label: "WATCH & BE READY",
    color: "#00e5ff",
    bgClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/50",
    glowClass: "glow-cyan",
    badge: "🔵 WATCH & BE READY",
    simpleAdvice: "Normal caution needed. Do not go near rivers or deep sea.",
    priority: 4
  },
  LOW: {
    label: "SAFE / LOW RISK",
    color: "#00e676",
    bgClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/50",
    glowClass: "shadow-[0_0_15px_rgba(0,230,118,0.3)]",
    badge: "🟢 SAFE / LOW RISK",
    simpleAdvice: "No immediate danger. Situation is under control.",
    priority: 5
  }
};

export const HAZARD_CATEGORIES = {
  FLOOD: {
    id: "FLOOD",
    name: "Heavy Floods & Overflowing Rivers",
    simpleName: "Floods (Rising Water)",
    icon: "🌊",
    themeColor: "#0284c7",
    colorHex: "#38bdf8",
    bannerImg: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80"
  },
  CYCLONE: {
    id: "CYCLONE",
    name: "Severe Cyclone & Giant Sea Waves",
    simpleName: "Cyclone (Big Storm & Sea Waves)",
    icon: "🌀",
    themeColor: "#06b6d4",
    colorHex: "#00e5ff",
    bannerImg: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?auto=format&fit=crop&w=1200&q=80"
  },
  LANDSLIDE: {
    id: "LANDSLIDE",
    name: "Landslide (Mud & Rocks Falling Down Hills)",
    simpleName: "Landslides (Falling Rocks & Mud)",
    icon: "⛰️",
    themeColor: "#ea580c",
    colorHex: "#ff6d00",
    bannerImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
  },
  EARTHQUAKE: {
    id: "EARTHQUAKE",
    name: "Earthquake (Ground Shaking)",
    simpleName: "Earthquake (Ground Shaking)",
    icon: "💥",
    themeColor: "#dc2626",
    colorHex: "#ff1744",
    bannerImg: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?auto=format&fit=crop&w=1200&q=80"
  },
  HEATWAVE: {
    id: "HEATWAVE",
    name: "Extreme Heatwave (Dangerously Hot Sun)",
    simpleName: "Severe Heatwave (Dangerous Heat)",
    icon: "☀️",
    themeColor: "#d97706",
    colorHex: "#ffd600",
    bannerImg: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
  },
  DROUGHT: {
    id: "DROUGHT",
    name: "Drought (No Water for Crops & Drinking)",
    simpleName: "Drought (Severe Water Shortage)",
    icon: "🌾",
    themeColor: "#854d0e",
    colorHex: "#eab308",
    bannerImg: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
  },
  WILDFIRE: {
    id: "WILDFIRE",
    name: "Forest Fire (Wildfire)",
    simpleName: "Forest Fire",
    icon: "🔥",
    themeColor: "#c2410c",
    colorHex: "#f97316",
    bannerImg: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80"
  },
  COASTAL_SURGE: {
    id: "COASTAL_SURGE",
    name: "Sea Water Flooding Coastal Areas",
    simpleName: "High Sea Waves & Coastal Flooding",
    icon: "🌊",
    themeColor: "#2563eb",
    colorHex: "#60a5fa",
    bannerImg: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80"
  }
};

// ============================================================================
// SIMULATION SCENARIOS (SIMPLE TITLES & SUMMARIES)
// ============================================================================
export const DEMO_SCENARIOS = {
  SCENARIO_A: {
    id: "SCENARIO_A",
    title: "Scenario 1: Heavy Rains, Floods & Landslides (Kerala & Assam)",
    codeName: "SCENARIO 1: FLOOD & RAIN ALERT",
    subtitle: "Heavy monsoon rain has caused major river flooding and landslide risks in hill areas",
    heroDescription: "Over 350 mm of rain fell in 24 hours. River waters are above the danger mark and dam gates are opened. People living near river banks and hill slopes must move to safe shelters right away.",
    primaryRegion: "Kerala & Assam River Basins",
    activeCount: 6,
    criticalCount: 2,
    populationExposed: 3240000,
    cascadingRiskLevel: "VERY HIGH DANGER (88%)",
    activeHazardIds: ["h1", "h2", "h4", "h5", "h8", "h11"]
  },
  SCENARIO_B: {
    id: "SCENARIO_B",
    title: "Scenario 2: Strong Cyclone 'Tej' Heading to Odisha & Bengal Coast",
    codeName: "SCENARIO 2: BIG CYCLONE ALERT",
    subtitle: "Very strong winds (165 km/h) and 4-meter giant sea waves approaching the coastline",
    heroDescription: "A massive cyclone storm in the Bay of Bengal will hit the coast near Puri within hours. Sea water is entering villages. All fishermen have returned to shore and coastal families are moving to cyclone shelters.",
    primaryRegion: "Odisha Coastal Belt & Bay of Bengal",
    activeCount: 5,
    criticalCount: 3,
    populationExposed: 4180000,
    cascadingRiskLevel: "EXTREME DANGER (94%)",
    activeHazardIds: ["h3", "h7", "h1", "h9", "h14"]
  },
  SCENARIO_C: {
    id: "SCENARIO_C",
    title: "Scenario 3: Severe Heatwave (Delhi, Rajasthan & Northern Plains)",
    codeName: "SCENARIO 3: SEVERE HEAT ALERT",
    subtitle: "Temperatures cross 48°C. Severe health risk from burning sun and heat exhaustion",
    heroDescription: "Extreme summer heatwave with hot desert winds blowing across North India. Avoid going outside in direct sun between 11 AM and 4 PM. Drink plenty of water and ORS solution.",
    primaryRegion: "Delhi NCR, Rajasthan & Haryana",
    activeCount: 4,
    criticalCount: 1,
    populationExposed: 6850000,
    cascadingRiskLevel: "MEDIUM DANGER (62%)",
    activeHazardIds: ["h6", "h10", "h13", "h12"]
  },
  SCENARIO_D: {
    id: "SCENARIO_D",
    title: "Scenario 4: Himalayan Mountain Earthquake (Magnitude 6.8)",
    codeName: "SCENARIO 4: EARTHQUAKE ALERT",
    subtitle: "Ground shaking in Uttarakhand hills causing falling rocks on roads",
    heroDescription: "A simulated strong earthquake occurred in the hills of Uttarakhand. Roads to Badrinath and Kedarnath have rockslides. Emergency search teams and ambulances are on site.",
    primaryRegion: "Uttarakhand & Himachal Hills",
    activeCount: 5,
    criticalCount: 2,
    populationExposed: 820000,
    cascadingRiskLevel: "EXTREME DANGER (89%)",
    activeHazardIds: ["h4", "h5", "h15", "h11", "h12"]
  }
};

// ============================================================================
// ALL DISASTER EVENTS WITH NEARBY EMERGENCY HOSPITALS & POLICE STATIONS
// ============================================================================
export const ALL_HAZARDS = [
  {
    id: "h1",
    scenarioIds: ["SCENARIO_A", "SCENARIO_B"],
    category: "FLOOD",
    title: "Heavy Floods & Dam Water Release (Central Kerala)",
    location: "Kochi, Alappuzha & Idukki Low Areas",
    state: "Kerala",
    districts: ["Ernakulam", "Idukki", "Kottayam", "Alappuzha"],
    lat: 9.9816,
    lng: 76.2999,
    radiusKm: 75,
    severity: "CRITICAL",
    riskScore: 92,
    confidence: "96% Verified by Ground Sensors",
    dataSource: "ISRO Satellite Maps & Central Water Commission",
    status: "RED ALERT: EVACUATE NOW",
    timestamp: "2026-10-09T08:30:00+05:30",
    metrics: {
      rainfall: "348 mm heavy rain in 1 day",
      waterLevel: "River water is 3.2 meters above safe limit",
      damStatus: "Dam spillway gates are open"
    },
    exposure: {
      population: 1450000,
      vulnerableElderly: 195000,
      hospitals: 42,
      schools: 118,
      bridgesAtRisk: 14,
      evacuationSheltersActive: 68
    },
    // Emergency Services Near this Location (Hospitals, Police, Fire, Relief Camps)
    emergencyServices: {
      hospitals: [
        {
          name: "Government General Hospital, Ernakulam",
          type: "Govt Hospital (24x7 ICU & Trauma)",
          phone: "0484-2361251",
          distance: "2.5 km away",
          bedsAvailable: "65 Emergency Beds Open",
          address: "Hospital Road, Ernakulam"
        },
        {
          name: "Kochi Medical College Hospital",
          type: "Super Specialty & Trauma Center",
          phone: "0484-2754000",
          distance: "5.1 km away",
          bedsAvailable: "120 Beds Ready",
          address: "HMT Colony, Kalamassery"
        }
      ],
      policeStations: [
        {
          name: "Central Police Station, Ernakulam",
          phone: "0484-2353550",
          mobile: "9497980420",
          distance: "1.8 km away",
          address: "Shanmugham Road, Marine Drive"
        },
        {
          name: "Kochi City Police Control Room",
          phone: "112 / 0484-2394200",
          mobile: "112",
          distance: "2.1 km away",
          address: "Revenue Tower, Park Avenue"
        }
      ],
      fireStations: [
        {
          name: "Ernakulam Fire & Rescue Station (Boat Squad)",
          phone: "101 / 0484-2360044",
          distance: "2.0 km away",
          boatsReady: "8 Inflatable Rescue Boats"
        }
      ],
      safeShelters: [
        {
          name: "Govt Model Higher Secondary School Relief Camp",
          phone: "1077 (District Helpline)",
          distance: "1.2 km away (On High Ground)",
          capacity: "500 People (Clean Water & Food Available)"
        },
        {
          name: "St. Albert's College Community Hall Camp",
          phone: "0484-2394200",
          distance: "2.4 km away",
          capacity: "650 People"
        }
      ]
    },
    cascadingRisks: [
      {
        targetHazard: "LANDSLIDE",
        targetTitle: "Landslide Risk on Nearby Hill Slopes",
        probability: 0.88,
        delayHours: 6,
        impact: "Hill roads (NH-85) may get blocked by falling mud and rocks"
      }
    ],
    ndrfResponse: {
      teamsDeployed: 18,
      battalion: "04 NDRF Rescue Battalion (Arakkonam)",
      rescueBoats: 44,
      emergencyHotline: "112 / 1070",
      immediateAction: "Move immediately to higher floors or the nearest relief school camp. Do not walk or drive through flowing water. Turn off your home's main electricity switch."
    },
    overviewText: "Very heavy rains have caused the Periyar river to overflow. Water is rapidly entering streets and ground-floor houses in low-lying areas. Rescue boats are helping people move to safety."
  },
  {
    id: "h2",
    scenarioIds: ["SCENARIO_A"],
    category: "FLOOD",
    title: "Brahmaputra River Flooding (Assam Valley)",
    location: "Guwahati, Morigaon & Kaziranga Basin",
    state: "Assam",
    districts: ["Kamrup Metro", "Morigaon", "Nagaon", "Dhubri"],
    lat: 26.1445,
    lng: 91.7362,
    radiusKm: 120,
    severity: "HIGH",
    riskScore: 84,
    confidence: "92% Verified by Ground Sensors",
    dataSource: "Central Water Commission & Assam Disaster Authority",
    status: "ORANGE ALERT: PREPARE TO EVACUATE",
    timestamp: "2026-10-09T07:15:00+05:30",
    metrics: {
      rainfall: "215 mm rain",
      waterLevel: "River water 1.9 meters above danger mark",
      damStatus: "Riverbanks damaged in 4 spots"
    },
    exposure: {
      population: 1790000,
      vulnerableElderly: 210000,
      hospitals: 28,
      schools: 92,
      bridgesAtRisk: 9,
      evacuationSheltersActive: 54
    },
    emergencyServices: {
      hospitals: [
        {
          name: "Gauhati Medical College & Hospital (GMCH)",
          type: "Government Super Specialty Hospital",
          phone: "0361-2529457",
          distance: "4.2 km away",
          bedsAvailable: "90 Emergency Beds Open",
          address: "Narakasur Hilltop, Bhangagarh, Guwahati"
        }
      ],
      policeStations: [
        {
          name: "Paltan Bazar Police Station",
          phone: "0361-2540126",
          mobile: "112",
          distance: "1.5 km away",
          address: "Paltan Bazar, Guwahati"
        }
      ],
      fireStations: [
        {
          name: "Guwahati Fire Brigade HQ",
          phone: "101 / 0361-2540222",
          distance: "2.1 km away",
          boatsReady: "12 Flood Boats Ready"
        }
      ],
      safeShelters: [
        {
          name: "Guwahati Elevated Community Center Shelter",
          phone: "1077",
          distance: "1.1 km away",
          capacity: "800 People"
        }
      ]
    },
    cascadingRisks: [
      {
        targetHazard: "LANDSLIDE",
        targetTitle: "Hill Soil Slipping near Roads",
        probability: 0.65,
        delayHours: 18,
        impact: "Railway line and highway near Guwahati may be delayed"
      }
    ],
    ndrfResponse: {
      teamsDeployed: 14,
      battalion: "01 NDRF (Guwahati)",
      rescueBoats: 32,
      emergencyHotline: "112 / 1070",
      immediateAction: "Move livestock and family to high raised ground. Drink only boiled or clean bottled water to prevent sickness."
    },
    overviewText: "The big Brahmaputra river has overflowed its banks into hundreds of villages. Floods are deep in low farming areas and rescue teams are providing food and drinking water."
  },
  {
    id: "h3",
    scenarioIds: ["SCENARIO_B"],
    category: "CYCLONE",
    title: "Super Cyclone 'Tej' Approaching Odisha Coast",
    location: "Puri, Paradip & Ganjam Coastal Line",
    state: "Odisha",
    districts: ["Puri", "Jagatsinghpur", "Kendrapara", "Ganjam"],
    lat: 19.8135,
    lng: 85.8312,
    radiusKm: 180,
    severity: "CRITICAL",
    riskScore: 97,
    confidence: "98% Radar & Satellite Tracking",
    dataSource: "India Meteorological Department (IMD) Radar",
    status: "RED ALERT: LANDFALL WARNING",
    timestamp: "2026-10-09T09:00:00+05:30",
    metrics: {
      windSpeed: "165 km/h strong winds",
      seaWaves: "Giant 4-meter sea waves coming ashore",
      rainfall: "250 mm torrential rain forecast"
    },
    exposure: {
      population: 2650000,
      vulnerableElderly: 340000,
      hospitals: 56,
      schools: 240,
      bridgesAtRisk: 22,
      evacuationSheltersActive: 142
    },
    emergencyServices: {
      hospitals: [
        {
          name: "District Headquarter Hospital (DHH) Puri",
          type: "Govt Trauma & Emergency Hospital",
          phone: "06752-222046",
          distance: "1.9 km away",
          bedsAvailable: "75 Beds Ready with Generator Power",
          address: "Grand Road, Puri"
        },
        {
          name: "AIIMS Bhubaneswar (State Emergency Hub)",
          type: "National Super Specialty Hospital",
          phone: "0674-2476789",
          distance: "55 km away (Inland Safe)",
          bedsAvailable: "200 ICU Beds Ready",
          address: "Sijua, Patrapada, Bhubaneswar"
        }
      ],
      policeStations: [
        {
          name: "Sea Beach Police Station Puri",
          phone: "06752-222074",
          mobile: "112",
          distance: "0.8 km away",
          address: "VIP Road, Sea Beach, Puri"
        },
        {
          name: "Puri Town Police Station",
          phone: "06752-222025",
          mobile: "112",
          distance: "2.3 km away",
          address: "Badadanda, Puri"
        }
      ],
      fireStations: [
        {
          name: "Puri Fire Station & Tree Cutting Squad",
          phone: "101 / 06752-222099",
          distance: "1.5 km away",
          boatsReady: "Power Saws & 10 Heavy Rescue Boats"
        }
      ],
      safeShelters: [
        {
          name: "Puri Multipurpose Cyclone Shelter #04",
          phone: "1077 / 06752-223230",
          distance: "1.1 km away (Concrete Sturdy Building)",
          capacity: "1,200 People (Food, Water & Doctors on site)"
        },
        {
          name: "Balukhand Coastal Relief Shelter",
          phone: "1070",
          distance: "3.2 km away",
          capacity: "900 People"
        }
      ]
    },
    cascadingRisks: [
      {
        targetHazard: "COASTAL_SURGE",
        targetTitle: "Huge Sea Waves Flooding Coastal Villages",
        probability: 0.95,
        delayHours: 3,
        impact: "Sea water flooding farmland up to 8 km from the beach"
      }
    ],
    ndrfResponse: {
      teamsDeployed: 26,
      battalion: "03 NDRF Battalion (Mundali) & Coast Guard",
      rescueBoats: 60,
      emergencyHotline: "112 / 1070 / 0674-2534177",
      immediateAction: "Move immediately to concrete Cyclone Shelters. Stay far away from the beach. Store drinking water and keep battery torches handy."
    },
    overviewText: "A very powerful cyclone storm is hitting near Puri beach. Extremely high winds can blow away tin roofs and break trees and electric poles. Sea water is entering beach roads."
  },
  {
    id: "h4",
    scenarioIds: ["SCENARIO_A", "SCENARIO_D"],
    category: "LANDSLIDE",
    title: "Landslides & Sinking Ground (Joshimath, Uttarakhand)",
    location: "Joshimath Hills & Badrinath Road",
    state: "Uttarakhand",
    districts: ["Chamoli", "Rudraprayag"],
    lat: 30.5505,
    lng: 79.5658,
    radiusKm: 30,
    severity: "CRITICAL",
    riskScore: 89,
    confidence: "94% Verified by Geological Survey",
    dataSource: "Geological Survey of India & ISRO Satellite",
    status: "RED ALERT: HILL SLIDES",
    timestamp: "2026-10-09T06:45:00+05:30",
    metrics: {
      soilMovement: "Ground shifting down rapidly",
      rainfall: "142 mm rain on steep hills",
      roadStatus: "Badrinath National Highway blocked by rocks"
    },
    exposure: {
      population: 62000,
      vulnerableElderly: 9200,
      hospitals: 4,
      schools: 16,
      bridgesAtRisk: 6,
      evacuationSheltersActive: 12
    },
    emergencyServices: {
      hospitals: [
        {
          name: "Community Health Centre (CHC) Joshimath",
          type: "Government Emergency Hill Clinic",
          phone: "01389-222120",
          distance: "1.1 km away",
          bedsAvailable: "22 Emergency Beds Open",
          address: "Upper Bazaar, Joshimath"
        }
      ],
      policeStations: [
        {
          name: "Joshimath Police Station",
          phone: "01389-222104",
          mobile: "112",
          distance: "0.8 km away",
          address: "Main Market, Joshimath"
        }
      ],
      fireStations: [
        {
          name: "Chamoli District Fire & Disaster Unit",
          phone: "101 / 01389-222101",
          distance: "1.4 km away",
          boatsReady: "Heavy Earthmovers & Ropes"
        }
      ],
      safeShelters: [
        {
          name: "Joshimath Government Safe Transit Camp",
          phone: "1077",
          distance: "0.9 km away (Stable Rocky Base)",
          capacity: "350 People"
        }
      ]
    },
    cascadingRisks: [
      {
        targetHazard: "FLASH_FLOOD",
        targetTitle: "River Blocked by Fallen Rocks",
        probability: 0.72,
        delayHours: 8,
        impact: "River water could suddenly burst through rocks downstream"
      }
    ],
    ndrfResponse: {
      teamsDeployed: 8,
      battalion: "08 NDRF Battalion & State Disaster Force",
      rescueBoats: 0,
      emergencyHotline: "112 / 1070",
      immediateAction: "Evacuate houses showing cracks immediately. Do not stay on steep hill edges during rain. Listen to mountain police updates."
    },
    overviewText: "Rain has made the soil weak on steep mountain slopes. Cracks have appeared in houses and rocks are tumbling onto the highway. Families are moving to safe temporary hotels."
  },
  {
    id: "h5",
    scenarioIds: ["SCENARIO_A", "SCENARIO_D"],
    category: "LANDSLIDE",
    title: "Mudslide & Fallen Rocks (Wayanad Hills, Kerala)",
    location: "Meppadi, Chooralmala & Hills",
    state: "Kerala",
    districts: ["Wayanad", "Kozhikode"],
    lat: 11.5388,
    lng: 76.1283,
    radiusKm: 25,
    severity: "HIGH",
    riskScore: 86,
    confidence: "91% Verified by Forest Department",
    dataSource: "Geological Survey & Kerala Disaster Control",
    status: "ORANGE ALERT: DANGER ON HILLS",
    timestamp: "2026-10-09T05:30:00+05:30",
    metrics: {
      rainfall: "410 mm rain in 2 days",
      soilCondition: "Soil is heavy and soaking wet",
      riverMud: "Rivers turning muddy brown with rocks"
    },
    exposure: {
      population: 48000,
      vulnerableElderly: 6800,
      hospitals: 3,
      schools: 12,
      bridgesAtRisk: 4,
      evacuationSheltersActive: 19
    },
    emergencyServices: {
      hospitals: [
        {
          name: "Wayanad District Hospital, Mananthavady",
          type: "Government Hospital with Emergency Ward",
          phone: "04935-240223",
          distance: "18 km away",
          bedsAvailable: "45 Beds Open",
          address: "Mananthavady, Wayanad"
        }
      ],
      policeStations: [
        {
          name: "Meppadi Police Station",
          phone: "04936-282240",
          mobile: "112",
          distance: "2.4 km away",
          address: "Meppadi Town, Wayanad"
        }
      ],
      fireStations: [
        {
          name: "Kalpetta Fire & Rescue Station",
          phone: "101 / 04936-202201",
          distance: "11 km away",
          boatsReady: "Search Canines & Earthmovers"
        }
      ],
      safeShelters: [
        {
          name: "Meppadi Govt Higher Secondary School Relief Camp",
          phone: "1077",
          distance: "2.0 km away",
          capacity: "400 People"
        }
      ]
    },
    cascadingRisks: [
      {
        targetHazard: "FLOOD",
        targetTitle: "Muddy Flash Flood in Downstream Rivers",
        probability: 0.82,
        delayHours: 4,
        impact: "Muddy waters entering tea plantation houses"
      }
    ],
    ndrfResponse: {
      teamsDeployed: 6,
      battalion: "04 NDRF & Indian Army Squads",
      rescueBoats: 4,
      emergencyHotline: "112 / 1077",
      immediateAction: "Families living in tea estate labor quarters under steep hills must shift to community hall shelters immediately."
    },
    overviewText: "Non-stop heavy rain on the tea garden hills has caused mud and trees to slide down the slopes. Army and NDRF teams are helping families move to community school shelters."
  },
  {
    id: "h6",
    scenarioIds: ["SCENARIO_C"],
    category: "HEATWAVE",
    title: "Severe Heatwave & Burning Sun (Delhi NCR)",
    location: "Delhi, Gurugram, Noida & Faridabad",
    state: "Delhi NCR",
    districts: ["New Delhi", "Gurugram", "Noida", "Faridabad"],
    lat: 28.6139,
    lng: 77.2090,
    radiusKm: 85,
    severity: "CRITICAL",
    riskScore: 88,
    confidence: "97% Weather Stations Across City",
    dataSource: "India Meteorological Department (IMD)",
    status: "RED ALERT: DANGEROUS HEAT",
    timestamp: "2026-10-09T11:00:00+05:30",
    metrics: {
      temperature: "47.8 °C (Feels like 52°C in sun)",
      uvSunIndex: "Extreme Danger (Level 11+)",
      electricityLoad: "Record electricity use for coolers"
    },
    exposure: {
      population: 4850000,
      vulnerableElderly: 720000,
      hospitals: 84,
      schools: 310,
      bridgesAtRisk: 0,
      evacuationSheltersActive: 45
    },
    emergencyServices: {
      hospitals: [
        {
          name: "AIIMS New Delhi (Heatstroke Emergency Unit)",
          type: "National Apex Hospital",
          phone: "011-26588500 / 011-26593201",
          distance: "3.5 km away",
          bedsAvailable: "Cold Water Cooling Beds Ready",
          address: "Ansari Nagar, New Delhi"
        },
        {
          name: "Safdarjung Hospital Emergency",
          phone: "011-26165060",
          type: "24x7 Emergency Trauma",
          distance: "3.8 km away",
          bedsAvailable: "40 Cold-Immersion Beds Open",
          address: "Ring Road, Opp AIIMS, New Delhi"
        }
      ],
      policeStations: [
        {
          name: "Delhi Police Control Room",
          phone: "112 / 100",
          mobile: "112",
          distance: "Nearby across city",
          address: "Police HQ, Jai Singh Road"
        }
      ],
      fireStations: [
        {
          name: "Delhi Fire Service HQ",
          phone: "101 / 011-23414000",
          distance: "2.8 km away",
          boatsReady: "Water Sprinklers Active"
        }
      ],
      safeShelters: [
        {
          name: "Govt Air-Cooled Relief Center & ORS Kiosk",
          phone: "1077",
          distance: "0.8 km away",
          capacity: "Free Cold Drinking Water & Electrolyte Packets"
        }
      ]
    },
    cascadingRisks: [
      {
        targetHazard: "DROUGHT",
        targetTitle: "Drinking Water Pipeline Pressure Drop",
        probability: 0.78,
        delayHours: 48,
        impact: "Water tankers dispatched to colonies with low water"
      }
    ],
    ndrfResponse: {
      teamsDeployed: 4,
      battalion: "Civil Defence & Red Cross First Aid Teams",
      rescueBoats: 0,
      emergencyHotline: "112 / 102 (Ambulance)",
      immediateAction: "Do not do hard physical work outdoors between 11 AM and 4 PM. Drink 1 glass of water every 30 minutes. Wear light cotton clothes and carry an umbrella."
    },
    overviewText: "Extreme hot desert winds have made the city dangerously hot. Doctors warn that direct sun can cause sudden dizziness and heat stroke, especially for older people and children."
  }
];

// Simple, explainable danger score calculation
export function calculateSimpleRisk(hazard) {
  const intensityMap = { CRITICAL: 95, HIGH: 80, ELEVATED: 60, GUARDED: 40, LOW: 25 };
  const intensityScore = intensityMap[hazard.severity] || 50;
  const pop = hazard.exposure?.population || 100000;
  const exposureScore = Math.min(100, Math.max(20, Math.log10(pop) * 16));

  const compositeScore = Math.round(0.40 * intensityScore + 0.35 * exposureScore + 0.25 * 80);

  return {
    score: Math.min(100, Math.max(10, compositeScore)),
    ratingText:
      compositeScore >= 80 ? "EXTREMELY DANGEROUS: Evacuate immediately" :
      compositeScore >= 60 ? "HIGH DANGER: Be prepared to move" :
      compositeScore >= 40 ? "MEDIUM DANGER: Stay alert at home" : "LOW RISK: Safe",
    simpleExplanation: [
      `1. How bad the disaster is: ${intensityScore}/100`,
      `2. How many people live in this area: ${(pop / 100000).toFixed(1)} Lakh people`,
      `3. Emergency help speed: NDRF rescue teams are nearby`
    ]
  };
}

export const DATA_SOURCES_DIRECTORY = [
  {
    id: "ISRO_BHUVAN",
    name: "ISRO Bhuvan Satellite Maps & Open WMS",
    agency: "National Remote Sensing Centre (ISRO)",
    category: "Satellite & GIS Maps",
    primaryEndpoint: "https://bhuvan-vec1.nrsc.gov.in/bhuvan/gwc/service/wms",
    fallbackEndpoint: "https://bhuvan.nrsc.gov.in/bhuvan/wms",
    status: "OPERATIONAL",
    pingMs: 142,
    layers: ["india3", "bhuvan_imagery"],
    description: "Official satellite imagery and flood mapping service from the Indian Space Research Organisation (ISRO)."
  },
  {
    id: "IMD_WEATHER",
    name: "India Meteorological Department (IMD) Weather Radar",
    agency: "Ministry of Earth Sciences",
    category: "Rainfall & Cyclone Radar",
    primaryEndpoint: "https://mausam.imd.gov.in/api/radar",
    fallbackEndpoint: "https://internal.imd.gov.in/telemetry",
    status: "OPERATIONAL",
    pingMs: 98,
    layers: ["doppler_radar", "cyclone_track"],
    description: "Weather radar tracking clouds, heavy rainfall, and storm wind speed across Indian cities."
  },
  {
    id: "CWC_FLOOD",
    name: "Central Water Commission (CWC) River Flood Telemetry",
    agency: "Ministry of Jal Shakti",
    category: "River Water Levels & Dams",
    primaryEndpoint: "https://ffs.india-water.gov.in/api/v1/realtime",
    fallbackEndpoint: "https://cwc.gov.in/river-forecasts",
    status: "OPERATIONAL",
    pingMs: 120,
    layers: ["river_danger_levels", "dam_gates_open"],
    description: "Tracks river water levels in real-time across 338 river stations to warn when water crosses danger marks."
  },
  {
    id: "NDMA_PORTAL",
    name: "National Disaster Management Authority (NDMA)",
    agency: "NDMA India",
    category: "Safety Guidelines & NDRF",
    primaryEndpoint: "https://ndma.gov.in/preparedness/guidelines",
    fallbackEndpoint: "https://ndrf.gov.in",
    status: "OPERATIONAL",
    pingMs: 64,
    layers: ["ndrf_battalions", "toll_free_helplines"],
    description: "Official disaster safety instructions, evacuation plans, and national relief contacts."
  }
];

export const HISTORICAL_DISASTERS = [
  {
    id: "hist_1",
    title: "2013 Kedarnath Cloudburst & Flash Floods",
    year: "2013",
    state: "Uttarakhand",
    category: "FLOOD",
    summary: "Heavy rain in the high mountains broke lake boundaries, causing fast mud and water to sweep through temple valleys.",
    lessonsLearned: "Now government weather radars monitor hill clouds continuously to give advance evacuation warnings."
  },
  {
    id: "hist_2",
    title: "2019 Super Cyclone Fani (Odisha Coast)",
    year: "2019",
    state: "Odisha",
    category: "CYCLONE",
    summary: "Very high winds of 215 km/h struck near Puri. Over 12 Lakh people were moved safely into cyclone shelters before the storm hit.",
    lessonsLearned: "Proved that moving families into concrete cyclone shelters saves thousands of lives."
  },
  {
    id: "hist_3",
    title: "2004 Indian Ocean Tsunami",
    year: "2004",
    state: "Tamil Nadu, Andaman Islands",
    category: "COASTAL_SURGE",
    summary: "A huge sea earthquake created giant 10-meter sea waves that flooded beaches across Chennai, Nagapattinam, and islands.",
    lessonsLearned: "India built the National Tsunami Early Warning Center in Hyderabad to detect sea waves immediately."
  },
  {
    id: "hist_4",
    title: "2024 Wayanad Heavy Rains & Landslide",
    year: "2024",
    state: "Kerala",
    category: "LANDSLIDE",
    summary: "Torrential non-stop rain on tea garden hills made the wet soil slide down into village houses.",
    lessonsLearned: "Special soil moisture sensors are now installed on steep hills to warn tea estate workers early."
  }
];

