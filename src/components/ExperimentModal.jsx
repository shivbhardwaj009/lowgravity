import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  User,
  Cpu,
  GraduationCap,
  Gauge,
  Wind,
  Flame,
  Clock,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Award
} from 'lucide-react';

export default function ExperimentModal({ experiment, onClose }) {
  const [explanationMode, setExplanationMode] = useState('astronaut'); // astronaut | engineer | student

  if (!experiment) return null;

  const getConfidenceBadgeColor = (score) => {
    if (score >= 90) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
    if (score >= 75) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0a1124] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden hud-card flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0d1630]">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-400">
              {experiment.id}
            </span>
            <span className={`px-2.5 py-1 rounded border font-mono text-xs font-bold ${getConfidenceBadgeColor(experiment.confidenceScore)}`}>
              Confidence {experiment.confidenceScore}/100
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-xl font-display font-bold text-slate-100">
              {experiment.name}
            </h3>
            <p className="text-xs font-mono text-cyan-400 mt-1 flex items-center space-x-2">
              <span>{experiment.source}</span>
              <span>•</span>
              <span>Year {experiment.year}</span>
            </p>
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            <div className="bg-[#070d1c] border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Gravity</div>
              <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">{experiment.gravity}</div>
            </div>
            <div className="bg-[#070d1c] border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Material</div>
              <div className="text-xs font-mono font-bold text-slate-200 mt-1 truncate" title={experiment.material}>
                {experiment.material}
              </div>
            </div>
            <div className="bg-[#070d1c] border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Oxygen</div>
              <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">{experiment.oxygen}%</div>
            </div>
            <div className="bg-[#070d1c] border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Pressure</div>
              <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">{experiment.pressure} kPa</div>
            </div>
            <div className="bg-[#070d1c] border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Airflow</div>
              <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">{experiment.airflow} cm/s</div>
            </div>
            <div className="bg-[#070d1c] border border-slate-800 rounded-xl p-2.5 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Spread Rate</div>
              <div className="text-sm font-mono font-bold text-orange-400 mt-0.5">
                {experiment.flameSpreadRate} <span className="text-[9px]">mm/s</span>
              </div>
            </div>
          </div>

          {/* Multi-Perspective Interpretation Engine */}
          <div className="bg-[#091226] border border-cyan-500/20 rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                  AI Multi-Audience Interpreter
                </span>
              </div>

              {/* 3-Way Perspective Toggle */}
              <div className="flex items-center bg-[#070d1a] p-1 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setExplanationMode('astronaut')}
                  className={`px-2.5 py-1 rounded-md transition flex items-center space-x-1.5 ${
                    explanationMode === 'astronaut'
                      ? 'bg-orange-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Astronaut</span>
                </button>
                <button
                  onClick={() => setExplanationMode('engineer')}
                  className={`px-2.5 py-1 rounded-md transition flex items-center space-x-1.5 ${
                    explanationMode === 'engineer'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Engineer</span>
                </button>
                <button
                  onClick={() => setExplanationMode('student')}
                  className={`px-2.5 py-1 rounded-md transition flex items-center space-x-1.5 ${
                    explanationMode === 'student'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student</span>
                </button>
              </div>
            </div>

            {/* Explanation Content Box */}
            <div className="p-3.5 bg-[#060a16] rounded-lg border border-slate-800/80 text-sm leading-relaxed text-slate-200 font-sans">
              {explanationMode === 'astronaut' && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 block font-bold">
                    [OPERATIONAL FLIGHT CREW BRIEF]
                  </span>
                  <p>{experiment.summaries.astronaut}</p>
                </div>
              )}
              {explanationMode === 'engineer' && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block font-bold">
                    [COMBUSTION KINETICS & PECLET ANALYSIS]
                  </span>
                  <p className="font-mono text-xs text-slate-300">{experiment.summaries.engineer}</p>
                </div>
              )}
              {explanationMode === 'student' && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                    [INTUITIVE SCIENCE BREAKDOWN]
                  </span>
                  <p>{experiment.summaries.student}</p>
                </div>
              )}
            </div>
          </div>

          {/* Key Findings Bullet Points */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Key Empirical Findings</span>
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {experiment.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs font-mono text-slate-300 bg-[#070d1c] p-2 rounded-lg border border-slate-800/60">
                  <span className="text-cyan-400 font-bold">0{idx + 1}.</span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence Score Breakdown */}
          <div className="bg-[#080e1e] border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>CONFIDENCE SCORE BREAKDOWN ({experiment.confidenceScore}/100)</span>
              </span>
              <span className="text-slate-400 text-[11px]">NASA Flight Verification Metric</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="bg-[#050914] p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Repeatability</span>
                <span className="text-cyan-300 font-medium">{experiment.confidenceBreakdown.repeatability}</span>
              </div>
              <div className="bg-[#050914] p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Environment Fidelity</span>
                <span className="text-cyan-300 font-medium">{experiment.confidenceBreakdown.microgravityType}</span>
              </div>
              <div className="bg-[#050914] p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block">Sample Scale</span>
                <span className="text-cyan-300 font-medium">{experiment.confidenceBreakdown.sampleSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#080d1a] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
