import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Search, Moon, Sun, Globe, Building2, User } from 'lucide-react';

export default function Header({ onOpenSearch }) {
  const {
    user,
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
    currentUserRole,
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
              <span className="font-bold text-[15px] tracking-tight text-[#44475B] dark:text-white">
                Med<span className="text-[#00D09C]">Seva</span>
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
              {portalMode === 'patient' ? user.name : 'Apollo Jubilee Hills OPD'}
            </p>
          </div>
        </div>

        {/* Right Action Icons: Publish, Sign In, Mode Toggle, Language, Theme, Search, Notifications */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
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

          {/* Language Selector */}
          <div className="relative group">
            <button
              onClick={() => {
                const nextLang = language === 'en' ? 'te' : language === 'te' ? 'hi' : 'en';
                setLanguage(nextLang);
              }}
              className="p-2 rounded-full text-[#7C7E8C] dark:text-[#9A9A9A] hover:bg-[#F5F6F8] dark:hover:bg-[#1B1B1B] transition-colors flex items-center"
              title="Change Language (English / తెలుగు / हिन्दी)"
            >
              <Globe className="w-4 h-4" />
              <span className="text-[10px] font-bold ml-1 uppercase text-[#44475B] dark:text-white">
                {language}
              </span>
            </button>
          </div>

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
    </header>
  );
}
