export const HAZARD_TYPES = {
  FLOOD: {
    id: 'flood',
    name: 'Flood',
    icon: '🌊',
    color: 'blue-500',
    severityLevels: ['low', 'moderate', 'high', 'critical']
  },
  LANDSLIDE: {
    id: 'landslide',
    name: 'Landslide',
    icon: '⛰️',
    color: 'orange-700',
    severityLevels: ['low', 'moderate', 'high', 'critical']
  },
  CYCLONE: {
    id: 'cyclone',
    name: 'Cyclone',
    icon: '🌀',
    color: 'teal-500',
    severityLevels: ['depression', 'cyclonic_storm', 'severe_cyclonic_storm', 'very_severe_cyclonic_storm', 'extremely_severe_cyclonic_storm', 'super_cyclonic_storm']
  },
  EARTHQUAKE: {
    id: 'earthquake',
    name: 'Earthquake',
    icon: '💥',
    color: 'red-600',
    severityLevels: ['minor', 'light', 'moderate', 'strong', 'major', 'great']
  },
  TSUNAMI: {
    id: 'tsunami',
    name: 'Tsunami',
    icon: '🌊',
    color: 'indigo-500',
    severityLevels: ['watch', 'warning', 'emergency']
  },
  DROUGHT: {
    id: 'drought',
    name: 'Drought',
    icon: '☀️',
    color: 'yellow-500',
    severityLevels: ['abnormally_dry', 'moderate', 'severe', 'extreme', 'exceptional']
  }
};

export const INDIAN_STATES_POPULATION = {
  'Uttar Pradesh': 235687000,
  'Maharashtra': 126385000,
  'Bihar': 127219000,
  'West Bengal': 99084000,
  'Madhya Pradesh': 86579000,
  'Tamil Nadu': 76860000,
  'Rajasthan': 81025000,
  'Karnataka': 67692000,
  'Gujarat': 71507000,
  'Andhra Pradesh': 53156000,
  'Odisha': 46356000,
  'Telangana': 38090000,
  'Kerala': 35776000,
  'Jharkhand': 39466000,
  'Assam': 35713000,
  'Punjab': 30730000,
  'Chhattisgarh': 30180000,
  'Haryana': 30209000,
  'Uttarakhand': 11637000,
  'Himachal Pradesh': 7451000,
  'Tripura': 4147000,
  'Meghalaya': 3343000,
  'Manipur': 3223000,
  'Nagaland': 2233000,
  'Goa': 1575000,
  'Arunachal Pradesh': 1562000,
  'Mizoram': 1238000,
  'Sikkim': 689000,
};

export const activeDisasters = [
  {
    id: 'd1',
    type: 'FLOOD',
    name: 'Kerala Monsoon Floods 2026',
    severity: 'critical',
    lat: 9.9312,
    lng: 76.2673, // Kochi
    radius: 120, // km
    affectedPopulation: 250000,
    affectedDistricts: ['Ernakulam', 'Idukki', 'Kottayam', 'Alappuzha'],
    state: 'Kerala',
    startDate: '2026-09-25T00:00:00Z',
    status: 'active',
    description: 'Relentless monsoon rains have caused rivers to overflow in central and southern Kerala. Major dams have been opened, leading to extensive downstream flooding.',
    rainfall: 350, // mm
    cascadingRisks: ['LANDSLIDE'],
    cascadingRiskScore: 85,
    ndmaZone: 'Zone III',
    responseTeams: 15
  },
  {
    id: 'd2',
    type: 'CYCLONE',
    name: 'Severe Cyclonic Storm Tej',
    severity: 'high',
    lat: 19.8134,
    lng: 85.8315, // Near Puri, Bay of Bengal
    radius: 250,
    affectedPopulation: 1200000,
    affectedDistricts: ['Puri', 'Ganjam', 'Jagatsinghpur', 'Kendrapara'],
    state: 'Odisha',
    startDate: '2026-10-07T12:00:00Z',
    status: 'warning',
    description: 'A severe cyclonic storm has formed over the Bay of Bengal and is expected to make landfall near Puri in the next 48 hours with wind speeds exceeding 140 km/h.',
    windSpeed: 145, // km/h
    cascadingRisks: ['FLOOD'],
    cascadingRiskScore: 92,
    ndmaZone: 'Zone V',
    responseTeams: 25
  },
  {
    id: 'd3',
    type: 'LANDSLIDE',
    name: 'Joshimath Subsidence and Landslides',
    severity: 'critical',
    lat: 30.5505,
    lng: 79.5658,
    radius: 15,
    affectedPopulation: 15000,
    affectedDistricts: ['Chamoli'],
    state: 'Uttarakhand',
    startDate: '2026-10-01T00:00:00Z',
    status: 'active',
    description: 'Continuous heavy rainfall has exacerbated the ongoing land subsidence in Joshimath, triggering multiple severe landslides blocking the Badrinath National Highway.',
    rainfall: 120,
    cascadingRisks: [],
    cascadingRiskScore: 40,
    ndmaZone: 'Zone V',
    responseTeams: 8
  },
  {
    id: 'd4',
    type: 'FLOOD',
    name: 'Brahmaputra River Overflow',
    severity: 'high',
    lat: 26.1445,
    lng: 91.7362, // Guwahati
    radius: 180,
    affectedPopulation: 850000,
    affectedDistricts: ['Kamrup', 'Morigaon', 'Nagaon', 'Dhubri'],
    state: 'Assam',
    startDate: '2026-09-20T00:00:00Z',
    status: 'active',
    description: 'The Brahmaputra river is flowing above the danger mark at several locations. Hundreds of villages are inundated, displacing thousands of families.',
    rainfall: 280,
    cascadingRisks: ['LANDSLIDE'],
    cascadingRiskScore: 65,
    ndmaZone: 'Zone V',
    responseTeams: 20
  },
  {
    id: 'd5',
    type: 'EARTHQUAKE',
    name: 'Bhuj Seismic Activity Swarm',
    severity: 'moderate',
    lat: 23.2420,
    lng: 69.6669,
    radius: 100,
    affectedPopulation: 45000,
    affectedDistricts: ['Kutch'],
    state: 'Gujarat',
    startDate: '2026-10-08T05:30:00Z',
    status: 'watch',
    description: 'A series of moderate earthquakes (magnitude 4.5 to 5.2) have been recorded in the Kutch region over the past 24 hours. Structural damage is minor so far, but panic is widespread.',
    magnitude: 5.2,
    cascadingRisks: [],
    cascadingRiskScore: 30,
    ndmaZone: 'Zone V',
    responseTeams: 5
  },
  {
    id: 'd6',
    type: 'DROUGHT',
    name: 'Marathwada Agricultural Drought',
    severity: 'high',
    lat: 19.8762,
    lng: 75.3433, // Aurangabad
    radius: 300,
    affectedPopulation: 3500000,
    affectedDistricts: ['Aurangabad', 'Jalna', 'Beed', 'Latur', 'Osmanabad'],
    state: 'Maharashtra',
    startDate: '2026-06-01T00:00:00Z',
    status: 'active',
    description: 'Severe deficit in monsoon rainfall has led to acute water scarcity and widespread crop failure across the Marathwada region. Drinking water is being supplied via tankers in many villages.',
    cascadingRisks: [],
    cascadingRiskScore: 10,
    ndmaZone: 'Zone III',
    responseTeams: 0
  },
  {
    id: 'd7',
    type: 'LANDSLIDE',
    name: 'Munnar Highway Blockade',
    severity: 'moderate',
    lat: 10.0889,
    lng: 77.0595,
    radius: 5,
    affectedPopulation: 5000,
    affectedDistricts: ['Idukki'],
    state: 'Kerala',
    startDate: '2026-10-05T00:00:00Z',
    status: 'active',
    description: 'A major landslide triggered by heavy rains has blocked the Kochi-Munnar national highway, isolating several tourist resorts and tea estates.',
    rainfall: 150,
    cascadingRisks: [],
    cascadingRiskScore: 20,
    ndmaZone: 'Zone III',
    responseTeams: 2
  },
  {
    id: 'd8',
    type: 'FLOOD',
    name: 'Chennai Urban Flooding',
    severity: 'moderate',
    lat: 13.0827,
    lng: 80.2707,
    radius: 40,
    affectedPopulation: 1500000,
    affectedDistricts: ['Chennai', 'Chengalpattu', 'Kanchipuram'],
    state: 'Tamil Nadu',
    startDate: '2026-10-08T00:00:00Z',
    status: 'warning',
    description: 'Intense short-duration rainfall has overwhelmed the city\'s drainage infrastructure, causing severe waterlogging in major IT corridors and residential areas.',
    rainfall: 180,
    cascadingRisks: [],
    cascadingRiskScore: 15,
    ndmaZone: 'Zone III',
    responseTeams: 10
  },
  {
    id: 'd9',
    type: 'CYCLONE',
    name: 'Cyclone Alert - West Bengal Coast',
    severity: 'low',
    lat: 21.6266,
    lng: 87.5095, // Digha
    radius: 200,
    affectedPopulation: 0,
    affectedDistricts: ['Purba Medinipur', 'South 24 Parganas'],
    state: 'West Bengal',
    startDate: '2026-10-09T00:00:00Z',
    status: 'watch',
    description: 'A deep depression over the North Bay of Bengal is being closely monitored. It may intensify into a cyclonic storm and move towards the West Bengal-Bangladesh coast.',
    windSpeed: 65,
    cascadingRisks: ['FLOOD'],
    cascadingRiskScore: 50,
    ndmaZone: 'Zone IV',
    responseTeams: 4
  },
  {
    id: 'd10',
    type: 'EARTHQUAKE',
    name: 'Sikkim-Nepal Border Tremor',
    severity: 'low',
    lat: 27.3389,
    lng: 88.6065,
    radius: 50,
    affectedPopulation: 10000,
    affectedDistricts: ['North Sikkim', 'West Sikkim'],
    state: 'Sikkim',
    startDate: '2026-10-06T14:20:00Z',
    status: 'active',
    description: 'A 4.8 magnitude earthquake struck near the Sikkim-Nepal border. Minor cracks reported in older buildings, but no significant damage or casualties.',
    magnitude: 4.8,
    cascadingRisks: ['LANDSLIDE'],
    cascadingRiskScore: 70,
    ndmaZone: 'Zone IV',
    responseTeams: 2
  },
  {
    id: 'd11',
    type: 'LANDSLIDE',
    name: 'Kullu Valley Cloudburst',
    severity: 'high',
    lat: 31.9579,
    lng: 77.1095,
    radius: 25,
    affectedPopulation: 25000,
    affectedDistricts: ['Kullu', 'Mandi'],
    state: 'Himachal Pradesh',
    startDate: '2026-09-28T00:00:00Z',
    status: 'active',
    description: 'A sudden cloudburst triggered massive flash floods and landslides in the Parvati valley. Several bridges have been washed away.',
    rainfall: 220,
    cascadingRisks: ['FLOOD'],
    cascadingRiskScore: 80,
    ndmaZone: 'Zone IV',
    responseTeams: 12
  },
  {
    id: 'd12',
    type: 'FLOOD',
    name: 'Kosi River Embankment Breach',
    severity: 'high',
    lat: 25.8797,
    lng: 86.6021, // Saharsa area
    radius: 90,
    affectedPopulation: 450000,
    affectedDistricts: ['Saharsa', 'Supaul', 'Madhepura'],
    state: 'Bihar',
    startDate: '2026-09-22T00:00:00Z',
    status: 'active',
    description: 'Increased discharge from the Kosi barrage in Nepal has led to a breach in a secondary embankment, flooding several low-lying villages.',
    rainfall: 150,
    cascadingRisks: [],
    cascadingRiskScore: 25,
    ndmaZone: 'Zone IV',
    responseTeams: 18
  },
  {
    id: 'd13',
    type: 'DROUGHT',
    name: 'Rayalaseema Dry Spell',
    severity: 'moderate',
    lat: 14.4673,
    lng: 78.8242, // Kadapa
    radius: 150,
    affectedPopulation: 800000,
    affectedDistricts: ['YSR Kadapa', 'Anantapur', 'Kurnool'],
    state: 'Andhra Pradesh',
    startDate: '2026-07-15T00:00:00Z',
    status: 'active',
    description: 'Prolonged dry spell and depleting groundwater levels have severely impacted Kharif crop sowing in the Rayalaseema region.',
    cascadingRisks: [],
    cascadingRiskScore: 5,
    ndmaZone: 'Zone II',
    responseTeams: 0
  }
];

export const NDRF_PROTOCOLS = {
  FLOOD: {
    evacuationSteps: [
      'Issue early warnings via SMS, Radio, and public address systems in low-lying areas.',
      'Deploy inflatable boats and life jackets to pre-identified vulnerable zones.',
      'Establish safe evacuation routes away from river banks and storm drains.',
      'Set up relief camps with adequate clean water and sanitation facilities.',
      'Coordinate with dam authorities for controlled water release.'
    ],
    emergencyContacts: [
      { name: 'NDRF Helpline', number: '9711077372' },
      { name: 'National Emergency', number: '112' },
      { name: 'State Control Room', number: '1070' }
    ],
    shelterLocations: [
      'District Collectorate Buildings',
      'Designated Govt School Buildings (First floor and above)',
      'Community Halls on elevated ground',
      'Cyclone Shelters (Multipurpose)'
    ],
    doAndDonts: {
      do: [
        'Move to higher ground immediately when a warning is issued.',
        'Keep a disaster survival kit ready with essentials and documents in waterproof bags.',
        'Drink boiled or purified water to prevent waterborne diseases.',
        'Turn off main power and gas switches before evacuating.'
      ],
      dont: [
        'Do not walk or drive through flowing floodwaters.',
        'Avoid touching electrical equipment if you are wet or standing in water.',
        'Do not eat food that has come into contact with floodwater.',
        'Ignore rumors; listen to official instructions only.'
      ]
    }
  },
  CYCLONE: {
    evacuationSteps: [
      'Track cyclone path using IMD satellites and issue color-coded alerts.',
      'Order mandatory evacuation of coastal villages within 5-10km of the predicted landfall.',
      'Secure loose objects, hoardings, and temporary structures in cities.',
      'Halt fishing operations; recall all vessels to the harbor.',
      'Pre-position tree-cutting equipment and power restoration teams.'
    ],
    emergencyContacts: [
      { name: 'Cyclone Warning Centre', number: '1800-180-1444' },
      { name: 'Coast Guard Search & Rescue', number: '1554' },
      { name: 'NDRF Control Room', number: '011-24363260' }
    ],
    shelterLocations: [
      'Multipurpose Cyclone Shelters',
      'Pucca (Concrete) buildings away from the coast',
      'Inland Government Colleges/Universities'
    ],
    doAndDonts: {
      do: [
        'Board up glass windows or tape them to prevent shattering.',
        'Stay indoors during the storm; the calm eye of the cyclone is deceptive.',
        'Keep flashlights and battery-operated radios handy.',
        'Anchor removable objects outside safely.'
      ],
      dont: [
        'Do not go outside until officially advised that the cyclone has passed.',
        'Avoid seeking shelter under trees or near old buildings.',
        'Do not drive during the storm.',
        'Fishermen should not venture into the sea.'
      ]
    }
  },
  EARTHQUAKE: {
    evacuationSteps: [
      'Activate immediate post-quake damage assessment teams.',
      'Deploy canine search units and acoustic sensors for collapsed structures.',
      'Establish triage centers near major hospitals for treating trauma victims.',
      'Inspect critical infrastructure (bridges, dams) before allowing traffic.',
      'Provide temporary tent shelters in open areas away from tall buildings.'
    ],
    emergencyContacts: [
      { name: 'Earthquake Relief Helpline', number: '1092' },
      { name: 'Fire Service / Rescue', number: '101' },
      { name: 'Ambulance', number: '108' }
    ],
    shelterLocations: [
      'Large open public parks and maidans',
      'Stadiums and sports grounds',
      'Specially erected tent cities'
    ],
    doAndDonts: {
      do: [
        'Drop, Cover, and Hold on during the shaking.',
        'If indoors, stay there until the shaking stops, then evacuate carefully.',
        'If outdoors, move away from buildings, streetlights, and utility wires.',
        'Use stairs, not elevators, during an evacuation.'
      ],
      dont: [
        'Do not light matches or turn on light switches (gas leaks are common).',
        'Do not re-enter damaged buildings.',
        'Do not use telephones unless it is a severe emergency (to keep lines open).',
        'Avoid standing near windows or heavy furniture.'
      ]
    }
  },
  LANDSLIDE: {
    evacuationSteps: [
      'Monitor steep slopes using early warning sensors and visual patrols during heavy rain.',
      'Evacuate settlements situated directly below or on vulnerable slopes.',
      'Clear blocked roads systematically starting from main arteries using heavy earthmovers.',
      'Establish rope bridges if road connectivity is completely destroyed.',
      'Relocate affected populations to stable ground.'
    ],
    emergencyContacts: [
      { name: 'National Emergency', number: '112' },
      { name: 'State Highway Patrol', number: '1073' },
      { name: 'NDRF Base', number: '1070' }
    ],
    shelterLocations: [
      'Community halls in safe zones on flat terrain',
      'Government guest houses',
      'School buildings in non-hilly areas'
    ],
    doAndDonts: {
      do: [
        'Stay alert and awake during severe storms in hilly areas.',
        'Listen for unusual sounds like trees cracking or boulders knocking.',
        'Move away from the path of a landslide or mudflow as quickly as possible.',
        'Curl into a tight ball and protect your head if escape is impossible.'
      ],
      dont: [
        'Do not build structures on steep slopes or near drainage ways.',
        'Do not ignore cracks appearing on walls or bulging retaining walls.',
        'Do not cross roads where water/mud is actively flowing.',
        'Do not return to evacuated areas until authorities give the all-clear.'
      ]
    }
  },
  DROUGHT: {
    evacuationSteps: [
      'Conduct rapid assessments of crop damage and water reservoir levels.',
      'Deploy water trains and fleets of tankers to severely affected villages.',
      'Initiate cash-for-work programs (e.g., MGNREGA) to prevent distress migration.',
      'Set up cattle camps to provide fodder and water for livestock.',
      'Distribute drought-resistant seeds and promote efficient micro-irrigation.'
    ],
    emergencyContacts: [
      { name: 'Kisan Call Centre', number: '1800-180-1551' },
      { name: 'District Agriculture Office', number: '1070' },
      { name: 'Rural Water Supply Helpline', number: '1916' }
    ],
    shelterLocations: [
      'Relocation is generally economic/migration-based rather than acute evacuation shelters.',
      'Cattle camps are established on village outskirts.'
    ],
    doAndDonts: {
      do: [
        'Practice rainwater harvesting and construct check dams.',
        'Adopt water-efficient farming techniques like drip irrigation.',
        'Ration drinking water and fix leaks immediately.',
        'Insure crops against weather anomalies.'
      ],
      dont: [
        'Do not waste water on non-essential activities like washing cars with hoses.',
        'Do not sow water-intensive crops in drought-prone areas.',
        'Do not over-extract groundwater from borewells.',
        'Do not ignore government advisories on water usage limits.'
      ]
    }
  },
  TSUNAMI: {
    evacuationSteps: [
      'Trigger coastal sirens immediately upon receiving INCOIS alerts.',
      'Direct populations to move inland or to higher ground (at least 30m above sea level).',
      'Evacuate beaches and coastal roads immediately.',
      'Move ships out to deep sea where waves are barely noticeable.',
      'Prepare inland hospitals for a mass influx of trauma and drowning victims.'
    ],
    emergencyContacts: [
      { name: 'INCOIS Tsunami Warning', number: '040-23895011' },
      { name: 'Coast Guard', number: '1554' },
      { name: 'State Emergency Operation Centre', number: '1070' }
    ],
    shelterLocations: [
      'Designated high-ground zones (hills, elevated inland plateaus)',
      'Upper floors of sturdy, reinforced concrete high-rises (vertical evacuation)',
      'Inland community centers'
    ],
    doAndDonts: {
      do: [
        'Move to higher ground immediately if you feel a strong earthquake near the coast.',
        'Heed official evacuation orders without delay.',
        'Wait for the official "all clear" before returning; tsunamis are a series of waves.',
        'Help neighbors who may require special assistance.'
      ],
      dont: [
        'Do not stay on the beach to watch the tsunami.',
        'Do not assume the danger is over after the first wave.',
        'Do not wait for an official warning if you see the ocean receding unusually far.',
        'Do not attempt to surf tsunami waves.'
      ]
    }
  }
};

/**
 * Computes the cascading risk of secondary disasters based on a primary disaster event.
 * @param {Object} disaster - The active disaster object.
 * @returns {Object} Cascading risk assessment.
 */
export function computeCascadingRisk(disaster) {
  let riskScore = disaster.cascadingRiskScore || 0;
  let cascadingHazards = [];
  let recommendation = 'Monitor situation normally.';

  if (disaster.type === 'CYCLONE') {
    cascadingHazards.push({ type: 'FLOOD', probability: 0.85, estimatedImpact: 'high' });
    if (disaster.windSpeed && disaster.windSpeed > 100) {
      riskScore = Math.max(riskScore, 80);
      recommendation = 'High risk of inland flooding and storm surges. Pre-deploy flood rescue teams and boats. Secure power infrastructure to prevent electrocution risks.';
    }
  } else if (disaster.type === 'FLOOD') {
    cascadingHazards.push({ type: 'WATERBORNE_DISEASE', probability: 0.9, estimatedImpact: 'medium' });
    if (['Uttarakhand', 'Himachal Pradesh', 'Kerala', 'Assam', 'Sikkim'].includes(disaster.state)) {
      cascadingHazards.push({ type: 'LANDSLIDE', probability: 0.75, estimatedImpact: 'high' });
      riskScore = Math.max(riskScore, 70);
      recommendation = 'Monitor slopes in hilly regions for landslide triggers. Ensure medical camps are stocked with cholera/typhoid medicines.';
    } else {
      recommendation = 'Focus on sanitation and clean drinking water provision to prevent epidemic outbreaks.';
    }
  } else if (disaster.type === 'EARTHQUAKE') {
    if (disaster.magnitude >= 6.0) {
      cascadingHazards.push({ type: 'LANDSLIDE', probability: 0.6, estimatedImpact: 'high' });
      cascadingHazards.push({ type: 'FIRE', probability: 0.4, estimatedImpact: 'medium' });
      riskScore = Math.max(riskScore, 75);
      recommendation = 'Check for gas leaks and structural integrity of dams/bridges. Be prepared for aftershocks triggering landslides in hilly terrain.';
    }
  } else if (disaster.type === 'LANDSLIDE') {
     cascadingHazards.push({ type: 'ROAD_BLOCKADE', probability: 0.95, estimatedImpact: 'high' });
     if(disaster.rainfall && disaster.rainfall > 100) {
        cascadingHazards.push({ type: 'FLASH_FLOOD', probability: 0.6, estimatedImpact: 'high' });
        recommendation = 'Clear arterial roads rapidly to allow rescue movement. Monitor nearby rivers/streams for blockage and subsequent flash flooding.';
     }
  }

  let overallImpact = 'low';
  if (riskScore > 75) overallImpact = 'high';
  else if (riskScore > 40) overallImpact = 'medium';

  return {
    primaryRisk: HAZARD_TYPES[disaster.type]?.name || disaster.type,
    cascadingHazards,
    overallRiskScore: riskScore,
    overallImpact,
    recommendation
  };
}

/**
 * Estimates the affected population using a rough heuristic based on area and state population density.
 * @param {Object} disaster - The active disaster object.
 * @param {Object} statesPopulation - The INDIAN_STATES_POPULATION object.
 * @returns {number} Estimated affected population.
 */
export function estimateAffectedPopulation(disaster, statesPopulation) {
  if (disaster.affectedPopulation > 0) return disaster.affectedPopulation; // Return if already set manually

  const statePop = statesPopulation[disaster.state] || 10000000; // default 10M
  // Very rough heuristic:
  // Assume state area roughly correlates to a square of size ~ 300x300km to 500x500km.
  // Average density = statePop / StateArea
  // Affected Area = Pi * r^2
  
  // Approximate areas in sq km for density calc
  const stateAreas = {
    'Uttar Pradesh': 240928, 'Maharashtra': 307713, 'Bihar': 94163, 'West Bengal': 88752,
    'Madhya Pradesh': 308252, 'Tamil Nadu': 130060, 'Rajasthan': 342239, 'Karnataka': 191791,
    'Gujarat': 196024, 'Andhra Pradesh': 162970, 'Odisha': 155707, 'Telangana': 112077,
    'Kerala': 38863, 'Jharkhand': 79716, 'Assam': 78438, 'Punjab': 50362, 'Uttarakhand': 53483,
    'Himachal Pradesh': 55673
  };
  
  const area = stateAreas[disaster.state] || 100000; 
  const density = statePop / area;
  
  const affectedArea = Math.PI * Math.pow(disaster.radius, 2);
  let estimatedPop = Math.floor(affectedArea * density);
  
  // Apply a severity multiplier
  const severityMultipliers = { 'critical': 1.0, 'high': 0.8, 'moderate': 0.5, 'low': 0.2 };
  const mult = severityMultipliers[disaster.severity] || 0.5;
  
  estimatedPop = Math.floor(estimatedPop * mult);
  
  // Cap at some reasonable number so it doesn't exceed state pop
  return Math.min(estimatedPop, Math.floor(statePop * 0.25));
}
