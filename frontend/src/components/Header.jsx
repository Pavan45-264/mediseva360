import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Search, Moon, Sun, Globe, Building2, User, MapPin, Navigation } from 'lucide-react';

export default function Header({ onOpenSearch }) {
  const {
    user,
    userLocation,
    requestDeviceLocation,
    setIsLocationModalOpen,
    theme,
    toggleTheme,
    language,
    setLanguage,
    portalMode,
    setPortalMode,
    notifications,
    setIsNotificationsOpen,
    openAuthModal,
    openPublishModal,
    openAiVideoModal,
    currentUserRole,
    staffAuth,
    t
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#121212] border-b border-[#E8E8EC] dark:border-[#2C2C2C] px-4 py-2.5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        {/* Left: User Avatar & Brand / Portal switch */}
        <div className="flex items-center space-x-2.5">
          <div
            onClick={openAuthModal}
            className="relative cursor-pointer hover:scale-105 transition-transform"
            title="Click to sign in or switch between Patient and Receptionist"
          >
            <div className="w-9 h-9 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/60 border border-[#00D09C]/40 flex items-center justify-center font-semibold text-[#00B386] text-sm shadow-sm">
              {portalMode === 'patient' ? (
                <span>{user.name.split(' ').map(n => n[0]).join('')}</span>
              ) : (
                <Building2 className="w-5 h-5 text-[#00D09C]" />
              )}
            </div>
            {/* Online Live Status Indicator */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00D09C] border-2 border-white dark:border-[#121212] rounded-full"></span>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-[14px] tracking-tight text-[#44475B] dark:text-white">
                MRK <span className="text-[#00D09C]">SEVA 360</span>
              </span>
              <span className="text-[10px] text-[#7C7E8C] dark:text-[#9A9A9A] font-semibold hidden sm:inline">
                • MediQueue
              </span>
              <button
                onClick={openAuthModal}
                className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-[#EEF0FF] dark:bg-indigo-950/70 text-[#5367FF] hover:underline"
                title="Click to sign in as Patient or Receptionist"
              >
                {portalMode === 'patient' ? 'Patient' : 'Receptionist'} ▾
              </button>
            </div>
            <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A] line-clamp-1">
              {portalMode === 'patient'
                ? user.name
                : staffAuth?.isAuthenticated
                ? `${staffAuth.staffUser.name} (${staffAuth.staffUser.hospitalName.split(' ')[0]})`
                : 'Staff Terminal (Not Signed In)'}
            </p>
          </div>
        </div>

        {/* Right Action Icons: AI Video Pitch, Publish, Sign In, Mode Toggle, Language, Theme, Search, Notifications */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* AI Video Pitch Button for Hackathon */}
          <button
            onClick={openAiVideoModal}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-extrabold rounded-full bg-gradient-to-r from-[#00D09C] to-[#5367FF] text-white hover:opacity-90 transition-all shadow-sm active:scale-95 animate-pulse"
            title="Watch AI Video Pitch & Demo for Hackathon Judges"
          >
            <span>🎥 AI Video</span>
          </button>

          {/* Publish & Open on Mobile Pill */}
          <button
            onClick={openPublishModal}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-bold rounded-full border border-[#5367FF]/30 bg-[#EEF0FF] dark:bg-indigo-950/60 text-[#5367FF] hover:bg-[#5367FF] hover:text-white transition-all shadow-xs"
            title="Publish & Open on Mobile Phone"
          >
            <span>📱 Publish</span>
          </button>

          {/* Sign In / Switch Role Pill */}
          <button
            onClick={openAuthModal}
            className="flex items-center space-x-1 px-2 py-1 text-xs font-bold rounded-full border border-[#00D09C]/40 bg-[#E6F9F4] dark:bg-emerald-950/50 text-[#00B386] hover:bg-[#00D09C] hover:text-white transition-all shadow-xs"
            title="Sign In / Switch Role"
          >
            <span>Sign In</span>
          </button>

          {/* Quick Switch Portal Button */}
          <button
            onClick={() => setPortalMode(prev => prev === 'patient' ? 'staff' : 'patient')}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-full border border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white hover:border-[#00D09C] transition-all"
            title="Switch between Patient and Staff Portal"
          >
            {portalMode === 'patient' ? (
              <>
                <Building2 className="w-3.5 h-3.5 text-[#00B386]" />
                <span className="hidden sm:inline">Staff</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-[#5367FF]" />
                <span className="hidden sm:inline">Patient</span>
              </>
            )}
          </button>

          {/* Language Selector Dropdown (Requirement 5: EN, HI, TE, KN, TA) */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-8 pl-2 pr-6 text-xs font-bold rounded-lg border border-[#E8E8EC] dark:border-[#2C2C2C] bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white cursor-pointer focus:outline-none focus:border-[#00D09C] appearance-none"
              title="Change Language"
            >
              <option value="en">🇬🇧 English</option>
              <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
              <option value="te">🇮🇳 తెలుగు (Telugu)</option>
              <option value="kn">🇮🇳 ಕನ್ನಡ (Kannada)</option>
              <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
            </select>
            <Globe className="w-3.5 h-3.5 text-[#7C7E8C] absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Admin Analytics Quick Link */}
          <button
            onClick={() => setPatientTab('analytics')}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-bold rounded-full border border-teal-500/30 bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 hover:bg-teal-600 hover:text-white transition-all shadow-xs"
            title="Open Admin Analytics Dashboard"
          >
            <span>📊 Analytics</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[#7C7E8C] dark:text-[#9A9A9A] hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B] transition-colors"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Quick Search */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-[#7C7E8C] dark:text-[#9A9A9A] hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Notification Bell with Badge */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 rounded-full text-[#7C7E8C] dark:text-[#9A9A9A] hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B] transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EB5B3C] ring-2 ring-white dark:ring-[#121212]" />
            )}
          </button>
        </div>
      </div>

      {/* Device Current Location & GPS Status Sub-Bar */}
      <div className="flex items-center justify-between pt-1.5 pb-0.5 border-t border-[#E8E8EC]/60 dark:border-[#2C2C2C]/60 text-[11px] mt-1.5">
        <div
          onClick={() => setIsLocationModalOpen && setIsLocationModalOpen(true)}
          className="flex items-center space-x-1.5 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
          title="Click to change location or select city"
        >
          <MapPin className="w-3.5 h-3.5 text-[#00B386] flex-shrink-0" />
          <span className="font-semibold text-[#44475B] dark:text-slate-300 truncate">
            {userLocation?.address || "Jubilee Hills, Hyderabad"}
          </span>
          {userLocation?.isLiveGPS ? (
            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-[#E6F9F4] dark:bg-emerald-950/70 text-[#00B386] text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D09C] mr-1 animate-pulse"></span>
              Live GPS
            </span>
          ) : (
            <span className="text-[10px] text-[#7C7E8C]">
              (Approx) ▾
            </span>
          )}
        </div>

        <button
          onClick={() => {
            if (userLocation?.isLiveGPS) {
              setIsLocationModalOpen(true);
            } else {
              requestDeviceLocation(false);
            }
          }}
          disabled={userLocation?.loading}
          className="text-[11px] font-bold text-[#5367FF] hover:underline flex items-center space-x-0.5 flex-shrink-0 ml-2"
          title="Detect Current Device Location"
        >
          <Navigation className={`w-3 h-3 ${userLocation?.loading ? 'animate-spin' : ''}`} />
          <span>{userLocation?.loading ? 'Locating...' : userLocation?.isLiveGPS ? 'Change' : 'Use Device GPS'}</span>
        </button>
      </div>
    </header>
  );
}
