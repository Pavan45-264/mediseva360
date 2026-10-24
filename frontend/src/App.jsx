import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import DesktopFrame from './components/DesktopFrame';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import PatientExploreView from './components/PatientExploreView';
import HospitalsView from './components/HospitalsView';
import DoctorsView from './components/DoctorsView';
import AppointmentsView from './components/AppointmentsView';
import ProfileView from './components/ProfileView';
import StaffPortalView from './components/StaffPortalView';
import AdminAnalyticsView from './components/AdminAnalyticsView';
import HospitalDetailModal from './components/HospitalDetailModal';
import BookingStepperModal from './components/BookingStepperModal';
import EmergencyModal from './components/EmergencyModal';
import AddMoneyModal from './components/AddMoneyModal';
import RefundModal from './components/RefundModal';
import WalkInModal from './components/WalkInModal';
import NotificationsDrawer from './components/NotificationsDrawer';
import AuthModal from './components/AuthModal';
import PublishModal from './components/PublishModal';
import AiVideoPitchModal from './components/AiVideoPitchModal';
import ToastContainer from './components/ToastContainer';
import ReportWrongDataModal from './components/ReportWrongDataModal';
import LocationPermissionModal from './components/LocationPermissionModal';
import { WifiOff } from 'lucide-react';

import ErrorBoundary from './components/ErrorBoundary';

function MainAppContent() {
  const {
    portalMode,
    patientTab,
    setPatientTab,
    isAiVideoModalOpen,
    closeAiVideoModal,
    isOffline,
    t
  } = useApp();

  return (
    <DesktopFrame>
      <div className="min-h-full flex flex-col bg-white dark:bg-[#121212] transition-colors duration-200">
        {/* Offline Banner (Requirement 8) */}
        {isOffline && (
          <div className="bg-amber-500 text-amber-950 px-4 py-2 text-xs font-bold flex items-center justify-between sticky top-0 z-50 shadow-md">
            <div className="flex items-center space-x-2">
              <WifiOff className="w-4 h-4 flex-shrink-0 animate-pulse" />
              <span>{t('offlineBanner')} (Cached ABDM Registry)</span>
            </div>
            <span className="text-[10px] bg-amber-600/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
              Offline
            </span>
          </div>
        )}

        {/* Top Header */}
        <Header onOpenSearch={() => setPatientTab('hospitals')} />

        {/* Dynamic View Content with Error Boundary */}
        <main className="flex-1">
          <ErrorBoundary onReset={() => setPatientTab('explore')}>
            {portalMode === 'patient' ? (
              <>
                {patientTab === 'explore' && <PatientExploreView />}
                {patientTab === 'hospitals' && <HospitalsView />}
                {patientTab === 'doctors' && <DoctorsView />}
                {patientTab === 'appointments' && <AppointmentsView />}
                {patientTab === 'analytics' && <AdminAnalyticsView />}
                {patientTab === 'profile' && <ProfileView />}
              </>
            ) : (
              <StaffPortalView />
            )}
          </ErrorBoundary>
        </main>

        {/* Pinned Bottom Navigation */}
        <BottomNav />

        {/* Global Modals & Notifications */}
        <HospitalDetailModal />
        <BookingStepperModal />
        <EmergencyModal />
        <AddMoneyModal />
        <RefundModal />
        <WalkInModal />
        <NotificationsDrawer />
        <AuthModal />
        <PublishModal />
        <AiVideoPitchModal isOpen={isAiVideoModalOpen} onClose={closeAiVideoModal} />
        <ReportWrongDataModal />
        <LocationPermissionModal />
        <ToastContainer />
      </div>
    </DesktopFrame>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
