import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';

/**
 * MentorCard Component
 * Displays mentor info with custom styles and hover glows.
 */
export default function MentorCard({ mentor, onSelect }) {
  const isHitesh = mentor.id === 'hitesh';

  return (
    <div
      onClick={() => !mentor.isComingSoon && onSelect(mentor)}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 p-6 flex flex-col justify-between h-72 ${
        mentor.isComingSoon
          ? 'border-slate-900 bg-slate-950/20 opacity-60 cursor-not-allowed select-none'
          : isHitesh
          ? 'border-slate-800 bg-slate-900/20 hover:border-orange-500/50 hover:bg-slate-900/60 cursor-pointer shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1'
          : 'border-slate-800 bg-slate-900/20 hover:border-blue-500/50 hover:bg-slate-900/60 cursor-pointer shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1'
      }`}
    >
      {/* Accent blur glow on hover */}
      {!mentor.isComingSoon && (
        <div
          className={`absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none ${
            isHitesh ? 'bg-orange-500' : 'bg-blue-500'
          }`}
        />
      )}

      <div>
        {/* Card Header (Avatar + Metadata) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center font-display font-bold text-base border select-none ${
                mentor.isComingSoon
                  ? 'bg-slate-800 border-slate-700 text-slate-500'
                  : isHitesh
                  ? 'bg-linear-to-tr from-orange-600 to-amber-500 border-orange-400 text-white shadow-md'
                  : 'bg-linear-to-tr from-blue-600 to-cyan-500 border-blue-400 text-white shadow-md'
              }`}
            >
              {mentor.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-base text-slate-100 group-hover:text-white transition-colors">
                {mentor.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">{mentor.role}</p>
            </div>
          </div>

          {mentor.isComingSoon && (
            <span className="flex items-center gap-1 rounded-full bg-slate-950 border border-slate-800 px-2.5 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              <Lock className="h-3 w-3 text-slate-500" /> Soon
            </span>
          )}
        </div>

        {/* Mentor Description */}
        <p className="text-sm text-slate-350 leading-relaxed font-sans mt-2">
          {mentor.description}
        </p>
      </div>

      {/* Footer / CTA Link */}
      <div className="mt-4 pt-4 border-t border-slate-900/60 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
          {mentor.isComingSoon ? 'Coming Soon' : 'Start Mentorship'}
        </span>
        
        {!mentor.isComingSoon && (
          <div
            className={`rounded-full p-2 transition-all duration-300 group-hover:translate-x-1 border ${
              isHitesh
                ? 'bg-orange-500/10 border-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white'
            }`}
          >
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </div>

    </div>
  );
}
