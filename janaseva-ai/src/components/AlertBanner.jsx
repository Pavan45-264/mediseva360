import React, { useState, useEffect, useCallback } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Download, 
  ShieldAlert, 
  BellRing,
  MapPin,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const DEFAULT_NDRF_PROTOCOLS = {
  FLOOD: {
    evacuationSteps: [
      'Move to higher ground immediately.',
      'Turn off utilities at main switches or valves if instructed.',
      'Disconnect electrical appliances. Do not touch electrical equipment if you are wet or standing in water.',
      'Do not walk through moving water. Six inches of moving water can make you fall.',
      'Do not drive into flooded areas. If floodwaters rise around your car, abandon the car and move to higher ground.'
    ],
    emergencyContacts: [
      { name: 'NDRF Helpline', number: '9711077372' },
      { name: 'State Emergency', number: '1070' },
      { name: 'Ambulance', number: '108' }
    ],
    shelterLocations: [
      'Govt. Higher Secondary School',
      'Community Hall Center',
      'Local Panchayat Bhavan'
    ],
    doAndDonts: {
      dos: [
        'Keep a First Aid Kit ready.',
        'Drink boiled or chlorinated water.',
        'Keep your mobile phones charged.',
        'Listen to battery operated radio for updates.'
      ],
      donts: [
        'Do not eat food that has been in contact with flood water.',
        'Do not venture into flood waters.',
        'Do not use electrical appliances.'
      ]
    }
  },
  CYCLONE: {
    evacuationSteps: [
      'Move to cyclone shelters or structurally safe buildings.',
      'Board up glass windows or put storm shutters in place.',
      'Provide strong support for outside doors.',
      'If you have to evacuate, do it before your escape route is cut off.',
      'Keep a hurricane lantern filled with kerosene, battery operated torches and enough dry cells.'
    ],
    emergencyContacts: [
      { name: 'NDRF Helpline', number: '9711077372' },
      { name: 'Disaster Management', number: '1078' },
      { name: 'Police', number: '100' }
    ],
    shelterLocations: [
      'Designated Multipurpose Cyclone Shelter',
      'Concrete Government Buildings'
    ],
    doAndDonts: {
      dos: [
        'Check houses, secure loose tiles.',
        'Demolish condemned buildings.',
        'Keep extra food, which can be eaten without cooking.',
        'Keep emergency medicines.'
      ],
      donts: [
        'Do not go out until officially advised it is safe.',
        'Do not leave shelters until informed by rescue personnel.',
        'Avoid loose wiring and fallen power lines.'
      ]
    }
  },
  LANDSLIDE: {
    evacuationSteps: [
      'Evacuate immediately from hillside areas.',
      'If you remain or are caught in a sudden landslide, move to a second story if possible.',
      'Stay out of the path of a landslide or debris flow.',
      'Listen for any unusual sounds that might indicate moving debris, such as trees cracking or boulders knocking together.',
      'If escape is not possible, curl into a tight ball and protect your head.'
    ],
    emergencyContacts: [
      { name: 'NDRF Helpline', number: '9711077372' },
      { name: 'Local Administration', number: '1070' }
    ],
    shelterLocations: [
      'Valley base community centers (safe distance)',
      'Relief Camps established by Govt.'
    ],
    doAndDonts: {
      dos: [
        'Move away from landslide path or downstream valleys quickly.',
        'Keep clear of embankments along streams, rivers.',
        'Grow more trees that can hold the soil through roots.'
      ],
      donts: [
        'Do not build houses near steep slopes, close to mountain edges.',
        'Do not drink contaminated water.',
        'Do not touch or walk over loose material and electrical wires or pole.'
      ]
    }
  },
  EARTHQUAKE: {
    evacuationSteps: [
      'Drop, Cover, and Hold On.',
      'If inside, stay inside until shaking stops. Move away from windows.',
      'If outside, stay outside. Move away from buildings, streetlights, and utility wires.',
      'If in a vehicle, stop as quickly as safety permits and stay in the vehicle.',
      'Once shaking stops, evacuate the building using stairs, not elevators.'
    ],
    emergencyContacts: [
      { name: 'NDRF Helpline', number: '9711077372' },
      { name: 'Emergency Services', number: '112' }
    ],
    shelterLocations: [
      'Open grounds/parks',
      'Designated earthquake-resistant community centers'
    ],
    doAndDonts: {
      dos: [
        'Keep calm and reassure others.',
        'Keep your disaster kit ready.',
        'Check for structural damage before re-entering buildings.'
      ],
      donts: [
        'Do not use elevators.',
        'Do not light a match or use open flames.',
        'Do not spread rumors.'
      ]
    }
  }
};

const AlertBanner = ({ disasters = [], selectedDisaster = null, ndrfProtocols = DEFAULT_NDRF_PROTOCOLS, onDismiss }) => {
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [expandedAlertId, setExpandedAlertId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const addAlert = useCallback((disaster) => {
    setActiveAlerts((prev) => {
      // Check if alert already exists
      if (prev.some(a => a.id === disaster.id)) return prev;
      
      const newAlert = { ...disaster, timestamp: Date.now() };
      const updated = [newAlert, ...prev].slice(0, 3); // Max 3 alerts
      return updated;
    });
  }, []);

  useEffect(() => {
    // Auto-trigger for critical disasters
    if (disasters && disasters.length > 0) {
      const criticalDisasters = disasters.filter(d => d.severity?.toLowerCase() === 'critical');
      criticalDisasters.forEach(d => addAlert(d));
    }
  }, [disasters, addAlert]);

  useEffect(() => {
    // Trigger for selected disaster
    if (selectedDisaster) {
      addAlert(selectedDisaster);
    }
  }, [selectedDisaster, addAlert]);

  useEffect(() => {
    // Auto-dismiss alerts after 30 seconds
    const interval = setInterval(() => {
      const now = Date.now();
      setActiveAlerts(prev => prev.filter(alert => now - alert.timestamp < 30000 || alert.id === expandedAlertId));
    }, 1000);
    return () => clearInterval(interval);
  }, [expandedAlertId]);

  const removeAlert = (id) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
    if (expandedAlertId === id) setExpandedAlertId(null);
    if (onDismiss && typeof onDismiss === 'function') {
      onDismiss(id);
    }
  };

  const toggleExpand = (id) => {
    setExpandedAlertId(prev => prev === id ? null : id);
  };

  const openModal = (disaster) => {
    setModalData(disaster);
    setShowModal(true);
  };

  const getSeverityStyles = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return {
          gradient: 'from-red-900 via-red-800 to-red-900',
          border: 'border-red-500',
          text: 'text-red-100',
          icon: <AlertTriangle className="w-6 h-6 text-red-400" />
        };
      case 'high':
        return {
          gradient: 'from-orange-900 via-orange-800 to-orange-900',
          border: 'border-orange-500',
          text: 'text-orange-100',
          icon: <AlertTriangle className="w-6 h-6 text-orange-400" />
        };
      case 'moderate':
        return {
          gradient: 'from-yellow-900 via-yellow-800 to-yellow-900',
          border: 'border-yellow-500',
          text: 'text-yellow-100',
          icon: <AlertCircle className="w-6 h-6 text-yellow-400" />
        };
      case 'low':
      default:
        return {
          gradient: 'from-green-900 via-green-800 to-green-900',
          border: 'border-green-500',
          text: 'text-green-100',
          icon: <Info className="w-6 h-6 text-green-400" />
        };
    }
  };

  const renderProtocolContent = (protocol) => {
    if (!protocol) return <div className="p-4 text-gray-300">No protocol details available.</div>;

    return (
      <div className="mt-4 border-t border-gray-700/50 pt-4 text-sm text-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Evacuation Steps */}
          <div>
            <h4 className="font-semibold text-white mb-2 flex items-center">
              <ShieldAlert className="w-4 h-4 mr-2 text-blue-400" />
              Evacuation Steps
            </h4>
            <ol className="list-decimal pl-5 space-y-1 text-gray-300">
              {protocol.evacuationSteps?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            
            <h4 className="font-semibold text-white mb-2 mt-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-green-400" />
              Shelter Locations
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              {protocol.shelterLocations?.map((loc, idx) => (
                <li key={idx}>{loc}</li>
              ))}
            </ul>
          </div>

          {/* Do's and Dont's & Contacts */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-green-400 mb-2 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Do's
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-gray-300 text-xs">
                  {(protocol.doAndDonts?.dos || protocol.doAndDonts?.do)?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-400 mb-2 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" /> Don'ts
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-gray-300 text-xs">
                  {(protocol.doAndDonts?.donts || protocol.doAndDonts?.dont)?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-white mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-400" />
                Emergency Contacts
              </h4>
              <div className="space-y-1">
                {protocol.emergencyContacts?.map((contact, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{contact.name}</span>
                    <span className="font-mono text-blue-300">{contact.number}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-bold text-sm flex items-center justify-center transition-colors">
                <Phone className="w-4 h-4 mr-2" /> Call NDRF Helpline: 9711077372
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
           <button className="flex items-center text-blue-400 hover:text-blue-300 text-xs font-semibold px-3 py-1 bg-blue-900/30 rounded border border-blue-800 transition-colors">
              <Download className="w-3 h-3 mr-1" />
              Download Evacuation Guide
           </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex flex-col items-center px-4 pt-2 space-y-2 pointer-events-none">
        {activeAlerts.map(alert => {
          const styles = getSeverityStyles(alert.severity);
          const protocol = ndrfProtocols[alert.type?.toUpperCase()] || DEFAULT_NDRF_PROTOCOLS[alert.type?.toUpperCase()];
          const isExpanded = expandedAlertId === alert.id;

          return (
            <div 
              key={alert.id}
              className={`w-full max-w-4xl bg-gradient-to-r ${styles.gradient} border ${styles.border} shadow-lg shadow-black/50 rounded-lg overflow-hidden transition-all duration-300 pointer-events-auto`}
            >
              <div className="flex items-start justify-between p-3 md:p-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 relative">
                    {styles.icon}
                    {alert.severity?.toLowerCase() === 'critical' && (
                       <span className="absolute -top-1 -right-1 flex h-3 w-3">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                       </span>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold text-base md:text-lg flex items-center ${styles.text}`}>
                      {alert.name || `${alert.type} Alert`}
                      <BellRing className={`ml-2 w-4 h-4 ${alert.severity?.toLowerCase() === 'critical' ? 'animate-pulse text-red-400' : 'text-gray-400'}`} />
                    </h3>
                    <p className="text-sm text-gray-200 mt-1">
                      {alert.state} {alert.affectedDistricts ? `- ${alert.affectedDistricts.join(', ')}` : ''}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Affected Population: {alert.affectedPopulation?.toLocaleString() || 'Unknown'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => toggleExpand(alert.id)}
                    className="flex items-center text-sm font-medium bg-black/20 hover:bg-black/40 text-white px-3 py-1.5 rounded transition-colors"
                  >
                    View Protocol
                    {isExpanded ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                  </button>
                  <button onClick={() => openModal(alert)} className="hidden md:flex text-xs text-blue-300 hover:text-blue-100 underline px-2">
                    Full Details
                  </button>
                  <button 
                    onClick={() => removeAlert(alert.id)}
                    className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-300">
                  {renderProtocolContent(protocol)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Evacuation Protocol Modal */}
      {showModal && modalData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className={`p-4 border-b border-gray-800 bg-gradient-to-r ${getSeverityStyles(modalData.severity).gradient} flex justify-between items-center`}>
              <div className="flex items-center space-x-3">
                {getSeverityStyles(modalData.severity).icon}
                <div>
                  <h2 className="text-xl font-bold text-white">{modalData.name || modalData.type} Evacuation Protocol</h2>
                  <p className="text-sm text-gray-200">{modalData.state} - NDRF Official Guidelines</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 bg-black/30 hover:bg-black/50 rounded-full text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-gray-900">
              {renderProtocolContent(ndrfProtocols[modalData.type?.toUpperCase()] || DEFAULT_NDRF_PROTOCOLS[modalData.type?.toUpperCase()])}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-800 bg-gray-950 flex justify-end">
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Close Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertBanner;
