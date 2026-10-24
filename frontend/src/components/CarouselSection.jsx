import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import DisasterCard from './DisasterCard';

export default function CarouselSection({
  title,
  subtitle,
  icon: Icon,
  badge,
  hazards,
  onSelectHazard,
  onOpenMap,
  onViewAll
}) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!hazards || hazards.length === 0) return null;

  return (
    <section className="mb-10 relative">
      
      {/* Row Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {title}
              </h2>
              {badge && (
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Scroll Controls & View All */}
        <div className="flex items-center gap-1.5">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 mr-2 hover:underline"
            >
              See All <ArrowRight className="w-3 h-3" />
            </button>
          )}

          <button
            onClick={() => scroll('left')}
            className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Row */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
      >
        {hazards.map((hazard) => (
          <DisasterCard
            key={hazard.id}
            hazard={hazard}
            onSelect={onSelectHazard}
            onOpenMap={onOpenMap}
          />
        ))}
      </div>

    </section>
  );
}
