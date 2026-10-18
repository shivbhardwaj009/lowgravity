
import React from 'react';
import {
  Flame,
  ShieldAlert,
  Orbit,
  Database,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  FileCheck2,
  Cpu,
  Sparkles,
  BookOpen,
  Activity,
  Award
} from 'lucide-react';
import { EXPERIMENTS } from '../data/experiments';

export default function OverviewTab({ onNavigateTab }) {
  // Stat calculations
  const totalExperiments = EXPERIMENTS.length;
  const gravityLevelsCount = 4; // 0g, 0.16g, 0.38g, 1g
  const biggestDataGap = "Mars 0.38g & Moon 0.16g at >26% O₂";
  const highestRiskMaterial = "Polyurethane Foam & PMMA";

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Mission Control Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1633] via-[#0b1226] to-[#070b16] border border-cyan-500/30 p-6 md:p-8 hud-card">
        {/* Radar background grid accents */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-grid-pattern pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>NASA Microgravity Combustion Research Synthesis</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
            Microgravity Fire Safety Intelligence
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">
            Welcome to <strong>Fire Twin</strong>, an interactive flight telemetry intelligence system that interprets 28 peer-reviewed NASA combustion experiments and predicts solid-fuel flame behavior across Lunar (0.16g), Martian (0.38g), and orbital microgravity (0g) environments.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('firetwin')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-mono font-bold text-xs transition flex items-center space-x-2 shadow-lg shadow-orange-500/20"
            >
              <Flame className="w-4 h-4" />
              <span>Launch Fire Twin Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('experiments')}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-mono text-xs transition flex items-center space-x-2 border border-slate-700"
            >
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Explore 28 Flight Experiments</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-4 md:p-5 hud-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>TOTAL FLIGHT EXPERIMENTS</span>
            <Database className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-mono font-bold text-cyan-300">
              {totalExperiments}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              SoFIE, Saffire, FLEX & BASS
            </div>
          </div>
          <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% Peer-Reviewed NASA Flight Records</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-4 md:p-5 hud-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>TESTED GRAVITY REGIMES</span>
            <Orbit className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-mono font-bold text-white">
              {gravityLevelsCount}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              0g, 0.16g, 0.38g & 1.0g
            </div>
          </div>
          <div className="text-[10px] font-mono text-cyan-400">
            Microgravity, Lunar, Mars & Earth baselines
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-[#0b1329] border border-amber-500/30 rounded-2xl p-4 md:p-5 hud-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>BIGGEST DATA GAP</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <div className="text-sm font-mono font-bold text-amber-300 leading-snug">
              {biggestDataGap}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              Wire harnesses in partial-g
            </div>
          </div>
          <div className="text-[10px] font-mono text-amber-400">
            Target for upcoming Artemis payloads
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-[#0b1329] border border-red-500/30 rounded-2xl p-4 md:p-5 hud-card flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>HIGHEST-RISK MATERIAL</span>
            <Flame className="w-4 h-4 text-red-400" />
          </div>
          <div className="my-2">
            <div className="text-sm font-mono font-bold text-red-300 leading-snug">
              {highestRiskMaterial}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              Flashover & toxic drip hazards
            </div>
          </div>
          <div className="text-[10px] font-mono text-red-400">
            Rapid liquid melting in partial-g
          </div>
        </div>
      </div>

      {/* Two Column Layout: How to Read & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: How to read this dashboard */}
        <div className="lg:col-span-7 bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 md:p-6 hud-card space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-100">
              How to Read this Dashboard
            </h3>
          </div>

          <div className="space-y-3.5 text-xs font-mono text-slate-300 leading-relaxed">
            <div className="flex items-start space-x-3 bg-[#070d1a] p-3 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold flex-shrink-0">
                1
              </span>
              <div>
                <strong className="text-cyan-300">Buoyancy Decoupling in Microgravity:</strong>
                <p className="text-slate-400 mt-0.5 font-sans">
                  On Earth (1g), hot air naturally rises at 70–80 cm/s, pulling cold oxygen in from below. In microgravity (0g), this buoyant pump is absent. Flames become spherical, cool, and slow, relying entirely on forced spacecraft ventilation fans.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-[#070d1a] p-3 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-orange-950 text-orange-400 flex items-center justify-center font-bold flex-shrink-0">
                2
              </span>
              <div>
                <strong className="text-orange-300">The Partial-Gravity Paradox:</strong>
                <p className="text-slate-400 mt-0.5 font-sans">
                  In Lunar (0.16g) and Martian (0.38g) gravity, fires can burn <em>faster</em> than on the ISS or Earth. Weak buoyancy creates a gentle natural draft that supplies fresh oxygen without blowing the flame out.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-[#070d1a] p-3 rounded-xl border border-slate-800/80">
              <span className="w-6 h-6 rounded-full bg-amber-950 text-amber-400 flex items-center justify-center font-bold flex-shrink-0">
                3
              </span>
              <div>
                <strong className="text-amber-300">Uncertainty Widening & Flight Data Gaps:</strong>
                <p className="text-slate-400 mt-0.5 font-sans">
                  In the Fire Twin chart, the shaded cyan band widens around 0.1g to 0.45g. This represents empirical uncertainty because partial gravity can only be tested for 5 seconds in drop towers or 20 seconds on parabolic aircraft, whereas 0g was tested for hours on the ISS and Cygnus.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Audit Trail & Data Integrity */}
        <div className="lg:col-span-5 bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 md:p-6 hud-card space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-100">
                Audit Trail & Verification Standard
              </h3>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Every insight, flame calculation, and risk score in Fire Twin links back to certified flight archives from NASA Glenn Research Center and White Sands Test Facility:
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#070d1a] border border-slate-800">
                <div className="text-cyan-300 font-bold">NASA Saffire (I – VI)</div>
                <div className="text-[11px] text-slate-400">Large-scale real spacecraft fire tests inside uncrewed Cygnus cargo vehicles after ISS departure.</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#070d1a] border border-slate-800">
                <div className="text-cyan-300 font-bold">NASA SoFIE (Solid Fuel Ignition & Extinction)</div>
                <div className="text-[11px] text-slate-400">Microgravity boundary layer measurements inside the ISS Combustion Integrated Rack (CIR).</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#070d1a] border border-slate-800">
                <div className="text-cyan-300 font-bold">NASA BASS (Burning & Suppression of Solids)</div>
                <div className="text-[11px] text-slate-400">Astronaut-tended flammability glovebox tests determining low-speed extinction limits.</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>NASA STD-6001 Test 1 Compliance Reference</span>
            <span className="text-emerald-400">VERIFIED ARCHIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
