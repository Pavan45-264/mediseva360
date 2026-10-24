import React, { useState } from 'react';
import JanasevaNavbar from './components/JanasevaNavbar';
import JanasevaHero from './components/JanasevaHero';
import GovtJobsHub from './components/GovtJobsHub';
import InteractiveSchemeCards from './components/InteractiveSchemeCards';
import ScholarshipsHub from './components/ScholarshipsHub';
import FarmerLoansHub from './components/FarmerLoansHub';
import SchemeDetailModal from './components/SchemeDetailModal';
import EligibilityModal from './components/EligibilityModal';
import JanasevaFooter from './components/JanasevaFooter';

export default function App() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState(null);
  const [activeEligibleScheme, setActiveEligibleScheme] = useState(null);

  const handleOpenSchemeDetail = (scheme) => {
    setSelectedSchemeDetail(scheme);
  };

  const handleOpenGeneralEligibility = () => {
    setActiveEligibleScheme(null);
    setIsEligibilityOpen(true);
  };

  const handleApplyFromDetail = (scheme) => {
    setActiveEligibleScheme(scheme);
    setIsEligibilityOpen(true);
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. Streaming Grade Navbar */}
      <JanasevaNavbar
        onOpenEligibility={handleOpenGeneralEligibility}
        onSelectCategory={(cat) => {
          if (cat === 'Jobs') handleScrollToSection('govt-jobs-hub');
          else if (cat === 'Scholarships') handleScrollToSection('scholarships-hub');
          else if (cat === 'Agriculture') handleScrollToSection('farmer-hub');
          else handleScrollToSection('schemes-catalogue');
        }}
      />

      {/* 2. Main Content Stream */}
      <main className="flex-1">
        {/* Full-Width 8K Cinematic Parallax Hero with Real-Time 3D Rotating Cursor Engine */}
        <JanasevaHero
          onOpenEligibility={handleOpenGeneralEligibility}
          onExploreSchemes={() => handleScrollToSection('schemes-catalogue')}
        />

        {/* 🌟 Central & State Govt Job Vacancies Hub with Multi-Faceted Filters */}
        <GovtJobsHub />

        {/* Central & State Government Scheme Directory with Jewel-Toned 3D Tilt */}
        <InteractiveSchemeCards
          onSelectScheme={handleOpenSchemeDetail}
        />

        {/* Dedicated Student Scholarships & Higher Education Hub */}
        <ScholarshipsHub
          onSelectScheme={handleOpenSchemeDetail}
        />

        {/* Farmer Welfare Hub, KCC Calculator & Live MSP Ticker */}
        <FarmerLoansHub
          onOpenEligibility={handleOpenGeneralEligibility}
        />
      </main>

      {/* 3. Official Helpline & Portal Footer */}
      <JanasevaFooter />

      {/* 4. Scheme Detail Modal (Full Official Criteria, Documents, Portal Links) */}
      <SchemeDetailModal
        scheme={selectedSchemeDetail}
        onClose={() => setSelectedSchemeDetail(null)}
        onApply={handleApplyFromDetail}
      />

      {/* 5. AI Eligibility Evaluation Modal */}
      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        selectedScheme={activeEligibleScheme}
      />
    </div>
  );
}
