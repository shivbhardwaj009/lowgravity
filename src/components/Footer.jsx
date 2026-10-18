import React from 'react';
import { Flame, Shield, ExternalLink, Activity } from 'lucide-react';

export default function Footer({ onNavigateTab }) {
  return (
    <footer className="mt-16 bg-[#04070f] border-t border-slate-800/80 text-xs font-mono text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Branding */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-8 h-8 rounded-lg bg-[#0a1122] border border-cyan-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-200 font-bold">
              Fire Twin: Microgravity Fire Safety Intelligence
            </div>
            {/* Required NASA text */}
            <div className="text-[11px] text-cyan-400/90 mt-0.5">
              Built for NASA Space Apps Challenge. Data is illustrative and based on published NASA microgravity combustion research.
            </div>
          </div>
        </div>

        {/* Center / Right Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <button
            onClick={() => onNavigateTab('overview')}
            className="hover:text-cyan-400 transition"
          >
            Overview
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigateTab('experiments')}
            className="hover:text-cyan-400 transition"
          >
            Experiments
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigateTab('firetwin')}
            className="hover:text-cyan-400 transition text-orange-400 font-bold"
          >
            Fire Twin Simulator
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigateTab('passport')}
            className="hover:text-cyan-400 transition"
          >
            Risk Passport
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigateTab('gaps')}
            className="hover:text-cyan-400 transition"
          >
            Knowledge Gaps
          </button>
          <span>•</span>
          <button
            onClick={() => onNavigateTab('analyst')}
            className="hover:text-cyan-400 transition"
          >
            Ask the Analyst
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500">
        <div>
          Reference standards: NASA-STD-6001B • ISS CIR Combustion Integrated Rack • Saffire-I through VI
        </div>
        <div className="flex items-center space-x-2 text-cyan-400/70">
          <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Local Execution • Zero External Backend Required</span>
        </div>
      </div>
    </footer>
  );
}
