import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  Building2,
  Stethoscope,
  CalendarCheck,
  User,
  LayoutDashboard,
  UsersRound,
  FileCheck2
} from 'lucide-react';

export default function BottomNav() {
  const {
    portalMode,
    patientTab,
    setPatientTab,
    staffTab,
    setStaffTab,
    activeToken,
    t
  } = useApp();

  if (portalMode === 'patient') {
    const navItems = [
      { id: 'explore', label: t('explore'), icon: Compass },
      { id: 'hospitals', label: t('hospitals'), icon: Building2 },
      { id: 'doctors', label: t('doctors'), icon: Stethoscope },
      {
        id: 'appointments',
        label: t('appointments'),
        icon: CalendarCheck,
        badge: activeToken ? activeToken.tokenNumber : null
      },
      { id: 'profile', label: t('profile'), icon: User }
    ];

    return (
      <nav aria-label="Patient navigation" className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-[#E8E8EC] dark:border-[#2C2C2C] max-w-md mx-auto transition-colors duration-200 shadow-sm">
        <div className="flex items-center justify-around h-14 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = patientTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPatientTab(item.id)}
                aria-label={item.label}
                className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-150 ${
                  isActive
                    ? 'text-[#00D09C] dark:text-[#00D09C]'
                    : 'text-[#7C7E8C] dark:text-[#9A9A9A] hover:text-[#44475B]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.6]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-3 px-1 py-0.2 text-[9px] font-bold rounded-full bg-[#00D09C] text-white tracking-tighter">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-semibold text-[#00D09C]' : 'font-medium'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-5 h-0.5 bg-[#00D09C] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  // Hospital Staff Portal Navigation
  const staffNavItems = [
    { id: 'home', label: t('home'), icon: LayoutDashboard },
    { id: 'queue', label: t('queue'), icon: UsersRound },
    { id: 'appointments', label: t('appointments'), icon: FileCheck2 },
    { id: 'profile', label: t('profile'), icon: Building2 }
  ];

  return (
    <nav aria-label="Staff navigation" className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-t border-[#E8E8EC] dark:border-[#2C2C2C] max-w-md mx-auto transition-colors duration-200 shadow-sm">
      <div className="flex items-center justify-around h-14 px-2">
        {staffNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = staffTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setStaffTab(item.id)}
              aria-label={item.label}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all duration-150 ${
                isActive
                  ? 'text-[#00D09C] dark:text-[#00D09C]'
                  : 'text-[#7C7E8C] dark:text-[#9A9A9A] hover:text-[#44475B]'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.6]'}`} />
              <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-semibold text-[#00D09C]' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 bg-[#00D09C] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
