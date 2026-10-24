import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DOCTORS_DATA } from '../data/doctorsData';
import { HOSPITALS_DATA } from '../data/hospitalsData';
import {
  Search,
  Star,
  Clock,
  Building,
  CheckCircle,
  Filter,
  ArrowUpDown
} from 'lucide-react';

export default function DoctorsView() {
  const { t, openBookingModal } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All');
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'fee' | 'exp'

  const specialities = [
    'All',
    'Ophthalmologist',
    'Cardiologist',
    'Neurologist',
    'Orthopedic',
    'Pediatrician',
    'General Physician',
    'Oncologist'
  ];

  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter(doc => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = doc.name.toLowerCase().includes(q);
        const matchSpec = doc.speciality.toLowerCase().includes(q);
        const matchHosp = doc.hospitalName.toLowerCase().includes(q);
        if (!matchName && !matchSpec && !matchHosp) return false;
      }

      if (selectedSpeciality !== 'All' && doc.speciality !== selectedSpeciality) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fee') return a.fee - b.fee;
      if (sortBy === 'exp') return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [searchQuery, selectedSpeciality, sortBy]);

  return (
    <div className="pb-24 pt-2 px-4 space-y-4 animate-fadeIn">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-[#44475B] dark:text-white">
          {t('doctors')}
        </h2>
        <p className="text-[11px] text-[#7C7E8C] dark:text-[#9A9A9A]">
          Verified clinicians with real-time OPD slot availability
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#7C7E8C]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by doctor name, speciality or hospital..."
          className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#44475B] dark:text-white rounded-full border border-transparent focus:border-[#00D09C] focus:bg-white dark:focus:bg-[#121212] focus:outline-none transition-all placeholder:text-[#7C7E8C]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-3 text-xs text-[#7C7E8C] hover:text-[#44475B]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Speciality Filter Chips */}
      <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
        {specialities.map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpeciality(spec)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full flex-shrink-0 transition-all ${
              selectedSpeciality === spec
                ? 'bg-[#EEF0FF] dark:bg-indigo-950/80 text-[#5367FF] border border-[#5367FF]/30 font-semibold'
                : 'bg-[#F5F6F8] dark:bg-[#1B1B1B] text-[#7C7E8C] dark:text-[#9A9A9A] border border-transparent hover:border-[#E8E8EC]'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Sort options bar */}
      <div className="flex items-center justify-between text-xs text-[#7C7E8C]">
        <span>Showing {filteredDoctors.length} doctors</span>
        <div className="flex items-center space-x-1.5">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-semibold text-[#44475B] dark:text-white focus:outline-none"
          >
            <option value="rating">Top Rated</option>
            <option value="fee">Lowest Fee</option>
            <option value="exp">Most Experienced</option>
          </select>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="space-y-3">
        {filteredDoctors.map(doc => {
          const hosp = HOSPITALS_DATA.find(h => h.id === doc.hospitalId) || HOSPITALS_DATA[0];

          return (
            <div
              key={doc.id}
              className="p-4 rounded-2xl bg-white dark:bg-[#1B1B1B] border border-[#E8E8EC] dark:border-[#2C2C2C] shadow-groww-card hover:border-[#00D09C] transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 rounded-2xl ${doc.avatarColor} flex items-center justify-center font-bold text-base shadow-sm flex-shrink-0 mt-0.5`}>
                    {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#44475B] dark:text-white">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A]">
                      {doc.title}
                    </p>
                    <p className="text-[11px] text-[#5367FF] font-medium mt-0.5">
                      {doc.hospitalName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{doc.rating}</span>
                </div>
              </div>

              <p className="text-xs text-[#7C7E8C] dark:text-[#9A9A9A] line-clamp-2">
                {doc.about}
              </p>

              {/* Bottom stats and Book button */}
              <div className="pt-2.5 border-t border-[#E8E8EC] dark:border-[#2C2C2C] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#7C7E8C]">Consultation Fee</span>
                  <div className="text-sm font-bold text-[#44475B] dark:text-white">
                    {doc.fee === 0 ? '₹0 (Free Govt OPD)' : `₹${doc.fee}`}
                  </div>
                  <span className="text-[10px] font-medium text-[#00B386]">
                    Next Slot: {doc.nextSlot}
                  </span>
                </div>

                <button
                  onClick={() => openBookingModal(hosp, doc)}
                  className="px-4 py-2 rounded-xl bg-[#00D09C] hover:bg-[#00B386] text-white font-semibold text-xs transition-all shadow-sm active:scale-95"
                >
                  {t('bookNow')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
