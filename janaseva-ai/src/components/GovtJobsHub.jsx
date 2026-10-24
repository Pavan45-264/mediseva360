import React, { useState } from 'react';
import {
  Briefcase, Search, Filter, Calendar, MapPin, IndianRupee,
  GraduationCap, ExternalLink, CheckCircle2, AlertCircle, Clock,
  ArrowRight, ShieldCheck, Sparkles, Building2, UserCheck, ChevronRight
} from 'lucide-react';
import { GOVT_VACANCIES_DATA } from '../data/vacanciesData';

export default function GovtJobsHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('All');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedJobId, setExpandedJobId] = useState(null);

  const qualificationsList = [
    'All',
    '10th Pass (Matriculation)',
    '12th Pass (Intermediate)',
    'Any Degree / Graduate',
    '10th + ITI / Diploma / B.Tech',
    'B.Sc. (Agriculture) / B.Sc. (Horticulture) / Diploma in Agri',
  ];

  const sectorsList = [
    'All',
    'Railways',
    'Central Govt',
    'Banking',
    'Defense & Police',
    'Agriculture & Rural',
  ];

  const filteredJobs = GOVT_VACANCIES_DATA.filter((job) => {
    const matchesSearch =
      !searchQuery.trim() ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.qualification.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesQual =
      selectedQualification === 'All' ||
      job.qualification.toLowerCase().includes(selectedQualification.toLowerCase().split(' ')[0]);

    const matchesSector =
      selectedSector === 'All' || job.sector === selectedSector;

    const matchesStatus =
      selectedStatus === 'All' || job.status === selectedStatus;

    return matchesSearch && matchesQual && matchesSector && matchesStatus;
  });

  const totalVacanciesCount = GOVT_VACANCIES_DATA.reduce((acc, curr) => {
    const num = parseInt(curr.vacancies.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + num;
  }, 0);

  return (
    <section id="govt-jobs-hub" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              Sarkari Naukri & Public Sector Recruitment Desk
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Government <span className="text-emerald-600">Job Vacancies & Notifications</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Explore <strong>{totalVacanciesCount.toLocaleString('en-IN')}+ active posts</strong> across Indian Railways, Staff Selection Commission (SSC), Banking, State Police, and Agricultural Departments with authentic eligibility and official apply portals.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search post name, railway zone, SSC, degree..."
              className="w-full h-12 pl-10 pr-4 text-xs sm:text-sm bg-white text-slate-900 rounded-xl border border-slate-300 focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          {/* Sector Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Department / Sector:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {sectorsList.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedSector === sec
                      ? 'bg-emerald-600 text-white font-black shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Qualification Filters */}
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Minimum Educational Qualification:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {qualificationsList.map((qual) => (
                <button
                  key={qual}
                  onClick={() => setSelectedQualification(qual)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    selectedQualification === qual
                      ? 'bg-emerald-600 text-white font-black shadow-sm'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {qual}
                </button>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Status:</span>
              {['All', 'Apply Now', 'Upcoming'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    selectedStatus === st
                      ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono text-emerald-700 font-bold">
              Showing {filteredJobs.length} Recruitment Notifications
            </span>
          </div>
        </div>

        {/* Vacancies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => {
            const isExpanded = expandedJobId === job.id;

            return (
              <div
                key={job.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 transition-all shadow-sm hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                      {job.badge}
                    </span>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        job.status === 'Apply Now'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-extrabold'
                          : 'bg-blue-50 border-blue-200 text-blue-700'
                      }`}
                    >
                      ● {job.status}
                    </span>
                  </div>

                  {/* Title & Organization */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {job.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {job.organization}
                  </p>

                  {/* Quick Highlights Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 my-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Vacancies</span>
                      <span className="font-black text-emerald-700 text-sm">{job.vacancies}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Pay Scale</span>
                      <span className="font-black text-slate-800 text-xs sm:text-sm line-clamp-1">{job.salary}</span>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Age Limit</span>
                      <span className="font-bold text-slate-700 text-xs">{job.ageLimit}</span>
                    </div>
                  </div>

                  {/* Qualification & Last Date */}
                  <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span><strong>Eligibility:</strong> {job.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span><strong>Application Deadline:</strong> <span className="text-amber-700 font-bold">{job.lastDate}</span></span>
                    </div>
                  </div>

                  {/* Expandable Details Box */}
                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 mb-4 text-xs text-slate-700 animate-fadeIn">
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Selection Stages:</strong>
                        <p className="text-slate-600 leading-relaxed">{job.selectionProcess}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5">Job Perks & Location:</strong>
                        <p className="text-slate-600 leading-relaxed">{job.highlights} ({job.location})</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Syllabus & Stages'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  <a
                    href={job.officialPortal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm transition-all hover:scale-105"
                  >
                    <span>Apply on {job.portalName}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No recruitment vacancies matched the chosen filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedQualification('All');
                setSelectedSector('All');
                setSelectedStatus('All');
              }}
              className="mt-3 text-xs text-emerald-600 font-bold underline"
            >
              Reset All Job Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
