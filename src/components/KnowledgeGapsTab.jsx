import React, { useState, useMemo } from 'react';
import {
  Grid,
  AlertOctagon,
  Sparkles,
  GitCompare,
  HelpCircle,
  TrendingUp,
  ArrowRight,
  Flame,
  FileQuestion,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { EXPERIMENTS } from '../data/experiments';

export default function KnowledgeGapsTab({ onSelectExperiment }) {
  const [selectedMaterial, setSelectedMaterial] = useState('All');

  // Heatmap definitions
  const gravityLevels = [
    { label: "0g (ISS)", value: "0g" },
    { label: "0.16g (Moon)", value: "0.16g" },
    { label: "0.38g (Mars)", value: "0.38g" },
    { label: "1.0g (Earth)", value: "1g" }
  ];

  const oxygenBins = [
    { label: "Sub-ambient (<21%)", id: "<21", min: 0, max: 20.9 },
    { label: "Standard (21-25%)", id: "21-25", min: 21.0, max: 25.0 },
    { label: "Enriched (26-30%)", id: "26-30", min: 25.1, max: 30.0 },
    { label: "High EVA (>30%)", id: ">30", min: 30.1, max: 100.0 }
  ];

  // Compute cell counts and matching experiments
  const heatmapData = useMemo(() => {
    const matrix = {};

    gravityLevels.forEach(g => {
      matrix[g.value] = {};
      oxygenBins.forEach(o => {
        const matching = EXPERIMENTS.filter(exp => {
          if (selectedMaterial !== 'All' && exp.material !== selectedMaterial) return false;
          if (exp.gravity !== g.value) return false;
          return exp.oxygen >= o.min && exp.oxygen <= o.max;
        });
        matrix[g.value][o.id] = {
          count: matching.length,
          experiments: matching
        };
      });
    });

    return matrix;
  }, [selectedMaterial]);

  // Contradictions dataset
  const CONTRADICTIONS = [
    {
      id: "CONTRA-01",
      title: "PMMA Low-Speed Extinction vs Drop Tower Persistence",
      exp1Id: "EXP-SAF-002",
      exp1Name: "Saffire-II PMMA Extinction at 5 cm/s (0g)",
      exp1Result: "Extinguished in 135s (Flame collapsed in CO₂ shroud)",
      exp2Id: "EXP-MOON-007",
      exp2Name: "Drop Tower PMMA Slab Run (0.16g)",
      exp2Result: "Sustained burn (1.45 mm/s spread, no quenching)",
      conflictSummary: "PMMA extinguished in 0g at 5 cm/s, yet maintained active spread under partial gravity.",
      reasonCategory: "Weak Buoyant Flow Acceleration",
      detailedExplanation: "At 0g, soot and combustion products form a stagnated boundary layer that chokes the reaction zone. In 0.16g Lunar gravity, a gentle buoyant convective plume (~8 cm/s) continuously ventilates the reaction zone without aerodynamic blow-off shearing."
    },
    {
      id: "CONTRA-02",
      title: "Cotton Flame Spread: Large Duct (Saffire) vs ISS Glovebox (BASS)",
      exp1Id: "EXP-SAF-001",
      exp1Name: "Saffire-I Large Cotton Panel (0g)",
      exp1Result: "Spread Rate: 2.14 mm/s (Rapid concurrent spread)",
      exp2Id: "EXP-BASS-017",
      exp2Name: "BASS-I Cellulose Paper Quench (0g)",
      exp2Result: "Spread Rate: 0.18 mm/s (Early extinction at 3.5 cm/s)",
      conflictSummary: "Same material category (cellulosic textile) yielded a 12x disparity in flame front velocity under microgravity.",
      reasonCategory: "Duct Aerodynamics & Sample Scale",
      detailedExplanation: "Saffire utilized a large 0.4m x 1.0m panel inside a 20 cm/s wind tunnel duct. The large flame created thermal radiation feedback from the Cygnus duct walls. In contrast, BASS used small 10cm strips in an open glovebox where radiative losses to the surrounding cool walls were unconfined."
    },
    {
      id: "CONTRA-03",
      title: "Nomex Flammability Inversion: Standard Air vs Airlock Atmosphere",
      exp1Id: "EXP-BASS-004",
      exp1Name: "BASS-II Nomex Fabric 0g Test",
      exp1Result: "100% Self-Extinguishing (Burned 18s, 0.0 mm/s spread)",
      exp2Id: "EXP-MARS-026",
      exp2Name: "Mars Habitat Nomex Conduit in 32% O₂",
      exp2Result: "Sustained burn at 1.15 mm/s (Char breached)",
      conflictSummary: "Certified fireproof Nomex passed all NASA flight suit tests, but burned vigorously in simulated Mars airlock air.",
      reasonCategory: "Oxygen Enrichment & Kinetic Threshold",
      detailedExplanation: "Nomex has an inherent Limiting Oxygen Index (LOI) of 28.5%. In nominal 21% O2, the protective aramid char isolates the polymer backbone. Once oxygen exceeds 30% in exploration airlocks, the chemical reaction enthalpy breaks through the char barrier, causing catastrophic fire propagation."
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
            <Grid className="w-5 h-5 text-cyan-400" />
            <span>Empirical Knowledge Gaps & Contradiction Matrix</span>
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Mapping flight experiment coverage across gravity and oxygen regimes to prioritize future Artemis & Mars missions
          </p>
        </div>

        {/* Material Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-slate-400">Filter Matrix:</span>
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="bg-[#070d1c] border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            <option value="All">All Materials Combined</option>
            <option value="Cotton fabric">Cotton fabric</option>
            <option value="PMMA">PMMA</option>
            <option value="Wire insulation">Wire insulation</option>
            <option value="Foam">Foam</option>
            <option value="Paper">Paper</option>
            <option value="Nomex">Nomex</option>
          </select>
        </div>
      </div>

      {/* Heatmap & Next Experiment Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap Grid (8 cols) */}
        <div className="lg:col-span-8 bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-xs md:text-sm font-mono font-bold text-slate-100 uppercase tracking-wider">
                Gravity vs Oxygen Experiment Density Map
              </h4>
              <p className="text-[11px] font-mono text-slate-400">
                Number of NASA flight runs per operational cell • Empty cells indicate untested flight domains
              </p>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500/80"></span>
                <span>Rich (3+)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-cyan-600/80"></span>
                <span>Moderate (1-2)</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded bg-amber-950 border border-amber-500/60"></span>
                <span>Untested (0)</span>
              </span>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left text-[11px] font-mono text-slate-400 uppercase">
                    Gravity Regime
                  </th>
                  {oxygenBins.map((bin) => (
                    <th key={bin.id} className="p-2 text-xs font-mono text-cyan-300">
                      {bin.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {gravityLevels.map((g) => (
                  <tr key={g.value}>
                    <td className="p-3 text-left text-xs font-mono font-bold text-slate-200 bg-[#070d18] rounded-l-lg border-y border-slate-800">
                      {g.label}
                    </td>
                    {oxygenBins.map((bin) => {
                      const cell = heatmapData[g.value][bin.id];
                      const isUntested = cell.count === 0;

                      return (
                        <td key={bin.id} className="p-2">
                          <div
                            className={`p-3.5 rounded-xl border transition flex flex-col items-center justify-center min-h-[72px] ${
                              isUntested
                                ? 'bg-amber-950/20 border-amber-500/40 text-amber-400'
                                : cell.count >= 3
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                                : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                            }`}
                          >
                            {isUntested ? (
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-500/30">
                                  UNTESTED
                                </span>
                                <span className="text-[9px] font-mono text-amber-400/80 block">
                                  0 data points
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-0.5">
                                <span className="text-lg font-mono font-bold">
                                  {cell.count}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400 block">
                                  {cell.count === 1 ? 'Flight Test' : 'Flight Tests'}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-2 pt-2 border-t border-slate-800">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Highest concentration of test data exists for 0g at 21% O₂ (ISS CIR/Saffire). Martian (0.38g) and Lunar (0.16g) enriched O₂ domains remain dangerously sparse.
            </span>
          </div>
        </div>

        {/* Best Next Experiment Card (4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0f1d3d] to-[#091124] border border-cyan-500/40 rounded-2xl p-5 hud-card flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                High-Priority Mission Proposal
              </h4>
            </div>

            <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3 text-xs font-mono space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">
                RECOMMENDED BEST NEXT EXPERIMENT:
              </span>
              <div className="text-sm font-bold text-slate-100">
                Wire Insulation in Partial Gravity (0.38g Mars) at 28%–32% O₂
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 leading-relaxed">
              <p>
                <strong>Scientific Imperative:</strong> Partial Martian gravity creates a resonant buoyant chimney effect. Weak natural draft supplies fresh oxidizer to wire harnesses without blowing out the flame.
              </p>
              <p>
                <strong>The Risk:</strong> Current NASA STD-6001 certification uses 1g vertical burns, which fail to capture low-buoyancy thermal insulation retention. Overheated power conduits in a Mars habitat could sustain undetected fires behind panels.
              </p>
            </div>

            <div className="bg-[#070d1a] border border-slate-800 rounded-xl p-3 text-[11px] font-mono space-y-1 text-slate-400">
              <div><strong>Suggested Platform:</strong> ISS SoFIE Centrifuge Insert or Blue Origin New Shepard Partial-G Arc</div>
              <div><strong>Target Uncertainty Reduction:</strong> ±42% → ±12%</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>Payload Priority: <strong>ALPHA-1</strong></span>
              <span className="flex items-center space-x-1">
                <span>NASA GRC Alignment</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contradictions & Anomalies Panel */}
      <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <GitCompare className="w-5 h-5 text-orange-400" />
            <h4 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider">
              Empirical Contradictions & Flight Anomalies
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            3 documented combustion paradoxes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONTRADICTIONS.map((c) => (
            <div
              key={c.id}
              className="bg-[#070d1c] border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-slate-700 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 font-bold">{c.id}</span>
                  <span className="text-orange-400 bg-orange-950/40 px-1.5 py-0.5 rounded border border-orange-500/30">
                    {c.reasonCategory}
                  </span>
                </div>

                <h5 className="text-xs font-mono font-bold text-slate-100 leading-snug">
                  {c.title}
                </h5>

                <div className="space-y-1.5 pt-1 text-[11px] font-mono">
                  <div className="bg-[#050914] p-2 rounded border border-slate-800/80">
                    <span className="text-[10px] text-cyan-400 block font-bold">FLIGHT RUN A:</span>
                    <span className="text-slate-300">{c.exp1Name}</span>
                    <div className="text-emerald-400 text-[10px] mt-0.5">{c.exp1Result}</div>
                  </div>

                  <div className="bg-[#050914] p-2 rounded border border-slate-800/80">
                    <span className="text-[10px] text-orange-400 block font-bold">FLIGHT RUN B:</span>
                    <span className="text-slate-300">{c.exp2Name}</span>
                    <div className="text-red-400 text-[10px] mt-0.5">{c.exp2Result}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                  {c.detailedExplanation}
                </p>
              </div>

              <div className="text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/60">
                Key Driver: {c.reasonCategory}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
