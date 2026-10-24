import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import { DOCTORS_DATA } from '../data/doctorsData';
import { translations } from '../data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme: Light default! (Dark mode is only an optional toggle)
  const [theme, setTheme] = useState(() => localStorage.getItem('mq_theme') || 'light');
  
  useEffect(() => {
    localStorage.setItem('mq_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Language: 'en' | 'te' | 'hi'
  const [language, setLanguage] = useState(() => localStorage.getItem('mq_lang') || 'en');
  useEffect(() => {
    localStorage.setItem('mq_lang', language);
  }, [language]);

  const t = useCallback((key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  }, [language]);

  // App Mode: 'patient' or 'staff'
  const [portalMode, setPortalMode] = useState('patient');

  // Navigation Tabs
  const [patientTab, setPatientTab] = useState('explore');
  const [staffTab, setStaffTab] = useState('home');

  // Desktop viewport preview toggle ('mobile' | 'desktop-wide')
  const [desktopViewMode, setDesktopViewMode] = useState('mobile');

  // User Profile
  const [user, setUser] = useState({
    name: "Pavan Kumar",
    phone: "+91 98765 43210",
    email: "pavan.kumar@gmail.com",
    abhaId: "91-4820-1928-4410",
    abhaAddress: "pavan91@abdm",
    walletBalance: 1450.00,
    familyMembers: [
      { id: "fam-1", name: "Pavan Kumar", relation: "Self", age: 34, gender: "Male", abhaLinked: true },
      { id: "fam-2", name: "Sunitha K.", relation: "Spouse", age: 32, gender: "Female", abhaLinked: true },
      { id: "fam-3", name: "Aarav K.", relation: "Son", age: 6, gender: "Male", abhaLinked: false },
      { id: "fam-4", name: "Venkat Ramaiah", relation: "Father", age: 68, gender: "Male", abhaLinked: true },
    ]
  });

  // Saved Hospitals (Watchlist)
  const [savedHospitals, setSavedHospitals] = useState(() => {
    const saved = localStorage.getItem('mq_saved_hospitals');
    return saved ? JSON.parse(saved) : ['hosp-1', 'hosp-3'];
  });

  const toggleSaveHospital = (hospitalId) => {
    setSavedHospitals(prev => {
      const updated = prev.includes(hospitalId)
        ? prev.filter(id => id !== hospitalId)
        : [...prev, hospitalId];
      localStorage.setItem('mq_saved_hospitals', JSON.stringify(updated));
      return updated;
    });
  };

  // Active Live Token (Positions equivalent)
  const [activeToken, setActiveToken] = useState({
    id: "tok-24",
    tokenNumber: "A-24",
    hospitalId: "hosp-1",
    hospitalName: "Apollo Hospitals Jubilee Hills",
    department: "Cardiology OPD",
    doctorName: "Dr. R. Sharma",
    patientName: "Pavan Kumar",
    patientAge: 34,
    patientGender: "Male",
    currentServingToken: "A-19",
    tokensAhead: 5,
    estimatedWaitMins: 15,
    status: "Waiting",
    triageLevel: "Moderate",
    date: "Today, 11 Oct",
    slotTime: "11:30 AM",
    roomNo: "Room 204 (OPD Block B)",
    bookingType: "Online",
    amount: 450,
    paymentStatus: "Paid",
    paymentMethod: "UPI (Google Pay)",
    qrCodeData: "MEDIQ-APOLLO-CARD-A24-PAVAN",
    createdAt: "10:15 AM"
  });

  // Appointments List (Orders / Holdings equivalent)
  const [appointments, setAppointments] = useState([
    {
      id: "app-101",
      tokenId: "tok-24",
      tokenNumber: "A-24",
      hospitalId: "hosp-1",
      hospitalName: "Apollo Hospitals Jubilee Hills",
      department: "Cardiology OPD",
      doctorName: "Dr. R. Sharma",
      date: "Today, 11 Oct",
      timeSlot: "11:30 AM",
      status: "Active Today",
      fee: 450,
      patientName: "Pavan Kumar",
      category: "today"
    },
    {
      id: "app-102",
      tokenId: "tok-58",
      tokenNumber: "P-16",
      hospitalId: "hosp-3",
      hospitalName: "Manipal Hospital Old Airport Rd",
      department: "Pediatrics",
      doctorName: "Dr. Sudhir Pai",
      date: "16 Oct 2026",
      timeSlot: "10:30 AM",
      status: "Upcoming",
      fee: 500,
      patientName: "Aarav K. (Son)",
      category: "upcoming"
    },
    {
      id: "app-103",
      tokenId: "tok-12",
      tokenNumber: "G-18",
      hospitalId: "hosp-1",
      hospitalName: "Apollo Hospitals Jubilee Hills",
      department: "General Medicine",
      doctorName: "Dr. Anita Rao",
      date: "24 Sep 2026",
      timeSlot: "02:00 PM",
      status: "Completed",
      fee: 350,
      patientName: "Pavan Kumar",
      category: "history"
    },
    {
      id: "app-104",
      tokenId: "tok-09",
      tokenNumber: "M-41",
      hospitalId: "hosp-2",
      hospitalName: "AIIMS New Delhi",
      department: "General OPD",
      doctorName: "Dr. Priya Verma",
      date: "12 Aug 2026",
      timeSlot: "09:30 AM",
      status: "Completed",
      fee: 50,
      patientName: "Venkat Ramaiah (Father)",
      category: "history"
    },
    {
      id: "app-105",
      tokenId: "tok-03",
      tokenNumber: "Y-05",
      hospitalId: "hosp-12",
      hospitalName: "Yashoda Hospitals Somajiguda",
      department: "Comprehensive Cancer OPD",
      doctorName: "Dr. P. N. Rao",
      date: "15 Jun 2026",
      timeSlot: "04:30 PM",
      status: "Cancelled",
      fee: 450,
      patientName: "Pavan Kumar",
      category: "cancelled"
    }
  ]);

  // Wallet Transactions History
  const [walletTransactions, setWalletTransactions] = useState([
    { id: "tx-1", type: "Debit", title: "Apollo Cardiology Token A-24", amount: 450, date: "Today 10:15 AM", status: "Successful", refId: "UPI/391029410" },
    { id: "tx-2", type: "Credit", title: "Added money via UPI", amount: 1000, date: "Yesterday 08:30 PM", status: "Successful", refId: "UPI/382910481" },
    { id: "tx-3", type: "Refund", title: "Refund for Cancelled Token Y-05", amount: 450, date: "15 Jun 2026", status: "Refunded to Bank", refId: "REF/910283401" }
  ]);

  // Staff Live Queue State (Dr. Sharma / Apollo Jubilee Hills OPD)
  const [staffQueue, setStaffQueue] = useState([
    {
      id: "q-19",
      tokenNumber: "A-19",
      patientName: "Rajesh Varma",
      patientAge: 58,
      patientGender: "Male",
      phone: "+91 94401 12345",
      triageLevel: "High",
      bookingType: "Online",
      status: "In Consultation",
      checkInTime: "10:05 AM",
      symptoms: "Mild chest discomfort, hypertension",
      fee: 450,
      paymentStatus: "Paid (UPI)",
      doctor: "Dr. R. Sharma",
      department: "Cardiology OPD"
    },
    {
      id: "q-20",
      tokenNumber: "A-20",
      patientName: "Priya Menon",
      patientAge: 29,
      patientGender: "Female",
      phone: "+91 98840 98765",
      triageLevel: "Moderate",
      bookingType: "Online",
      status: "Waiting",
      checkInTime: "10:12 AM",
      symptoms: "Palpitations during exercise",
      fee: 450,
      paymentStatus: "Paid (UPI)",
      doctor: "Dr. R. Sharma",
      department: "Cardiology OPD"
    },
    {
      id: "q-21",
      tokenNumber: "A-21",
      patientName: "K. Ramesh Babu",
      patientAge: 62,
      patientGender: "Male",
      phone: "+91 98490 55678",
      triageLevel: "Emergency",
      bookingType: "Walk-in",
      status: "Waiting",
      checkInTime: "10:15 AM",
      symptoms: "Acute chest pain radiating to left arm",
      fee: 450,
      paymentStatus: "Paid (Cash)",
      doctor: "Dr. R. Sharma",
      department: "Cardiology OPD"
    },
    {
      id: "q-22",
      tokenNumber: "A-22",
      patientName: "Sneha Deshmukh",
      patientAge: 34,
      patientGender: "Female",
      phone: "+91 91234 56789",
      triageLevel: "Low",
      bookingType: "Online",
      status: "Waiting",
      checkInTime: "10:20 AM",
      symptoms: "Post-angioplasty 6-month checkup",
      fee: 450,
      paymentStatus: "Paid (Card)",
      doctor: "Dr. R. Sharma",
      department: "Cardiology OPD"
    },
    {
      id: "q-23",
      tokenNumber: "A-23",
      patientName: "Suresh Balaji",
      patientAge: 46,
      patientGender: "Male",
      phone: "+91 93910 11223",
      triageLevel: "Moderate",
      bookingType: "Walk-in",
      status: "Waiting",
      checkInTime: "10:25 AM",
      symptoms: "High blood pressure prescription refill",
      fee: 450,
      paymentStatus: "Paid (Cash)",
      doctor: "Dr. R. Sharma",
      department: "Cardiology OPD"
    },
    {
      id: "q-24",
      tokenNumber: "A-24",
      patientName: "Pavan Kumar",
      patientAge: 34,
      patientGender: "Male",
      phone: "+91 98765 43210",
      triageLevel: "Moderate",
      bookingType: "Online",
      status: "Waiting",
      checkInTime: "10:15 AM",
      symptoms: "Lipid profile follow-up & routine ECG review",
      fee: 450,
      paymentStatus: "Paid (Google Pay)",
      doctor: "Dr. R. Sharma",
      department: "Cardiology OPD"
    },
    {
      id: "q-25",
      tokenNumber: "A-25",
      patientName: "Harish Chandra",
      patientAge: 51,
      patientGender: "Male",
      phone: "+91 97000 88990",
      triageLevel: "Unclassified",
      bookingType: "Walk-in",
      status: "Waiting",
      checkInTime: "10:32 AM",
      symptoms: "General cardiology consultation",
      fee: 450,
      paymentStatus: "Paid (UPI)",
      doctor: "Dr. R. Sharma",
      department: "Cardiology OPD"
    }
  ]);

  // Hospital Collection Stats (Groww Balance style)
  const [staffStats, setStaffStats] = useState({
    todayCollection: 48650,
    collectionDelta: 6200,
    percentDelta: 14.6,
    upiAmount: 32400,
    cashAmount: 11250,
    cardAmount: 5000,
    totalTokensToday: 142,
    waitingCount: 6,
    inConsultationCount: 1,
    completedCount: 133,
    emergencyCount: 2,
    cancelledCount: 2
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Queue Update: 5 Patients Ahead",
      message: "Dr. Sharma is now examining token A-19. Your token A-24 is estimated at 11:30 AM.",
      time: "5 mins ago",
      read: false,
      type: "token"
    },
    {
      id: "notif-2",
      title: "Booking Confirmed #A-24",
      message: "Payment of ₹450 successful. Digital OPD pass generated.",
      time: "1 hour ago",
      read: true,
      type: "payment"
    },
    {
      id: "notif-3",
      title: "ABDM Health Facility Alert",
      message: "AIIMS New Delhi enabled Ayushman Bharat Digital queue integration.",
      time: "1 day ago",
      read: true,
      type: "system"
    }
  ]);

  // Audio Chime simulation for queue updates
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // AudioContext not allowed without user interaction
    }
  };

  // Live Token Progression Simulator (For examiners to see live queue movement!)
  const simulateQueueAdvancement = () => {
    playChime();
    
    // Advance staff queue
    setStaffQueue(prev => {
      const inConsultationIndex = prev.findIndex(item => item.status === "In Consultation");
      const nextWaitingIndex = prev.findIndex(item => item.status === "Waiting");

      let updated = [...prev];
      if (inConsultationIndex !== -1) {
        updated[inConsultationIndex] = { ...updated[inConsultationIndex], status: "Completed" };
      }
      if (nextWaitingIndex !== -1) {
        updated[nextWaitingIndex] = { ...updated[nextWaitingIndex], status: "In Consultation" };
        
        // Also update user's live token state
        const newlyServing = updated[nextWaitingIndex];
        const numAhead = Math.max(0, 24 - parseInt(newlyServing.tokenNumber.replace(/\D/g, '')));
        
        setActiveToken(tok => {
          if (!tok) return null;
          const isNowUser = newlyServing.tokenNumber === tok.tokenNumber;
          return {
            ...tok,
            currentServingToken: newlyServing.tokenNumber,
            tokensAhead: numAhead,
            estimatedWaitMins: Math.max(0, numAhead * 3),
            status: isNowUser ? "Now Calling You!" : "Waiting"
          };
        });

        // Add toast notification
        setNotifications(n => [
          {
            id: `notif-${Date.now()}`,
            title: newlyServing.tokenNumber === "A-24" ? "🔔 It's Your Turn! Token A-24" : `Token ${newlyServing.tokenNumber} Called`,
            message: newlyServing.tokenNumber === "A-24" ? "Please proceed immediately to Room 204." : `Now serving ${newlyServing.tokenNumber} in Cardiology OPD.`,
            time: "Just now",
            read: false,
            type: "token"
          },
          ...n
        ]);
      }
      return updated;
    });

    // Update staff collection & counters
    setStaffStats(prev => ({
      ...prev,
      waitingCount: Math.max(0, prev.waitingCount - 1),
      completedCount: prev.completedCount + 1
    }));
  };

  // Staff Call Next Patient
  const staffCallNext = () => {
    simulateQueueAdvancement();
  };

  // Register Walk-In Patient
  const registerWalkIn = ({ patientName, patientAge, patientGender, triageLevel, department, fee, paymentMethod }) => {
    playChime();
    const tokenNum = `A-${staffQueue.length + 20}`;
    const newPatient = {
      id: `q-${Date.now()}`,
      tokenNumber: tokenNum,
      patientName: patientName || "Walk-in Patient",
      patientAge: Number(patientAge) || 40,
      patientGender: patientGender || "Male",
      phone: "+91 90000 00000",
      triageLevel: triageLevel || "Moderate",
      bookingType: "Walk-in",
      status: "Waiting",
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      symptoms: "Walk-in reception registration",
      fee: Number(fee) || 450,
      paymentStatus: `Paid (${paymentMethod || 'Cash'})`,
      doctor: "Dr. R. Sharma",
      department: department || "Cardiology OPD"
    };

    setStaffQueue(prev => [...prev, newPatient]);
    setStaffStats(prev => {
      const addFee = Number(fee) || 450;
      return {
        ...prev,
        todayCollection: prev.todayCollection + addFee,
        totalTokensToday: prev.totalTokensToday + 1,
        waitingCount: prev.waitingCount + 1,
        cashAmount: paymentMethod === 'Cash' ? prev.cashAmount + addFee : prev.cashAmount,
        upiAmount: paymentMethod === 'UPI' ? prev.upiAmount + addFee : prev.upiAmount,
      };
    });

    return newPatient;
  };

  // Patient Booking Flow Execution
  const completeBooking = ({ hospital, doctor, department, date, slotTime, patientName, triageLevel, amount, paymentMethod }) => {
    playChime();
    const newTokenNumber = `B-${Math.floor(10 + Math.random() * 89)}`;
    const newTok = {
      id: `tok-${Date.now()}`,
      tokenNumber: newTokenNumber,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      department: department || "General OPD",
      doctorName: doctor?.name || "Dr. On Duty",
      patientName: patientName || user.name,
      patientAge: 34,
      patientGender: "Male",
      currentServingToken: `B-${Math.max(1, parseInt(newTokenNumber.replace(/\D/g, '')) - 4)}`,
      tokensAhead: 4,
      estimatedWaitMins: 12,
      status: "Waiting",
      triageLevel: triageLevel || "Moderate",
      date: date || "Today",
      slotTime: slotTime || "12:00 PM",
      roomNo: "Consultation Suite 102",
      bookingType: "Online",
      amount: amount || hospital.consultationFee,
      paymentStatus: "Paid",
      paymentMethod: paymentMethod || "UPI",
      qrCodeData: `MEDIQ-${hospital.id}-${newTokenNumber}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setActiveToken(newTok);

    const newApp = {
      id: `app-${Date.now()}`,
      tokenId: newTok.id,
      tokenNumber: newTok.tokenNumber,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      department: newTok.department,
      doctorName: newTok.doctorName,
      date: newTok.date,
      timeSlot: newTok.slotTime,
      status: "Active Today",
      fee: newTok.amount,
      patientName: newTok.patientName,
      category: "today"
    };

    setAppointments(prev => [newApp, ...prev]);

    // Record wallet transaction
    setWalletTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        type: "Debit",
        title: `${hospital.name} OPD Token ${newTokenNumber}`,
        amount: newTok.amount,
        date: "Just now",
        status: "Successful",
        refId: `UPI/${Math.floor(100000000 + Math.random() * 900000000)}`
      },
      ...prev
    ]);

    // Notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `Token ${newTokenNumber} Confirmed`,
        message: `Your booking at ${hospital.name} with ${newTok.doctorName} is confirmed.`,
        time: "Just now",
        read: false,
        type: "booking"
      },
      ...prev
    ]);

    return newTok;
  };

  // Add Money to Wallet
  const addMoney = (amount) => {
    playChime();
    setUser(u => ({ ...u, walletBalance: u.walletBalance + Number(amount) }));
    setWalletTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        type: "Credit",
        title: "Added money via UPI",
        amount: Number(amount),
        date: "Just now",
        status: "Successful",
        refId: `UPI/${Math.floor(100000000 + Math.random() * 900000000)}`
      },
      ...prev
    ]);
  };

  // Refund to Bank
  const refundToBank = (amount) => {
    playChime();
    const refAmt = Math.min(user.walletBalance, Number(amount));
    setUser(u => ({ ...u, walletBalance: u.walletBalance - refAmt }));
    setWalletTransactions(prev => [
      {
        id: `tx-${Date.now()}`,
        type: "Refund",
        title: "Refund to Bank Account (HDFC **4921)",
        amount: refAmt,
        date: "Just now",
        status: "Transferred to Bank",
        refId: `REF/${Math.floor(100000000 + Math.random() * 900000000)}`
      },
      ...prev
    ]);
  };

  // Cancel Appointment
  const cancelAppointment = (appointmentId) => {
    setAppointments(prev => prev.map(app => {
      if (app.id === appointmentId) {
        return { ...app, status: "Cancelled", category: "cancelled" };
      }
      return app;
    }));
    // If it's the active token, clear or reset
    if (activeToken && appointments.find(a => a.id === appointmentId)?.tokenNumber === activeToken.tokenNumber) {
      setActiveToken(null);
    }
  };

  // Modals state
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isHospitalDetailOpen, setIsHospitalDetailOpen] = useState(false);
  const [bookingModalState, setBookingModalState] = useState({
    isOpen: false,
    hospital: null,
    doctor: null
  });
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isRefundOpen, setIsRefundOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  const openHospitalDetail = (hospital) => {
    setSelectedHospital(hospital);
    setIsHospitalDetailOpen(true);
  };

  const closeHospitalDetail = () => {
    setIsHospitalDetailOpen(false);
  };

  const openBookingModal = (hospital, doctor = null) => {
    setBookingModalState({
      isOpen: true,
      hospital: hospital || HOSPITALS_DATA[0],
      doctor: doctor || null
    });
  };

  const closeBookingModal = () => {
    setBookingModalState({ isOpen: false, hospital: null, doctor: null });
  };

  // Authentication & Role Management
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState('patient'); // 'patient' | 'receptionist' | 'doctor'
  const [selectedStaffHospital, setSelectedStaffHospital] = useState('hosp-1');

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginAsPatient = (phone = "+91 98765 43210") => {
    setCurrentUserRole('patient');
    setPortalMode('patient');
    setUser(prev => ({ ...prev, phone }));
    setIsAuthModalOpen(false);
  };

  const loginAsStaff = ({ hospitalId = "hosp-1", role = "receptionist", staffName = "Staff Receptionist" }) => {
    setCurrentUserRole(role);
    setPortalMode('staff');
    setSelectedStaffHospital(hospitalId);
    setIsAuthModalOpen(false);
  };

  // Publish & Open on Mobile Modal
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const openPublishModal = () => setIsPublishModalOpen(true);
  const closePublishModal = () => setIsPublishModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        portalMode,
        setPortalMode,
        patientTab,
        setPatientTab,
        staffTab,
        setStaffTab,
        desktopViewMode,
        setDesktopViewMode,
        user,
        setUser,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        currentUserRole,
        loginAsPatient,
        loginAsStaff,
        selectedStaffHospital,
        savedHospitals,
        toggleSaveHospital,
        activeToken,
        setActiveToken,
        appointments,
        staffQueue,
        staffStats,
        notifications,
        walletTransactions,
        simulateQueueAdvancement,
        staffCallNext,
        registerWalkIn,
        completeBooking,
        addMoney,
        refundToBank,
        cancelAppointment,
        selectedHospital,
        isHospitalDetailOpen,
        openHospitalDetail,
        closeHospitalDetail,
        bookingModalState,
        openBookingModal,
        closeBookingModal,
        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isAddMoneyOpen,
        setIsAddMoneyOpen,
        isRefundOpen,
        setIsRefundOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isWalkInModalOpen,
        setIsWalkInModalOpen,
        isPublishModalOpen,
        setIsPublishModalOpen,
        openPublishModal,
        closePublishModal,
        playChime
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
