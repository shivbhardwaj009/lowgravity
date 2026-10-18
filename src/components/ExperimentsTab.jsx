import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  ExternalLink,
  CheckCircle,
  XCircle,
  Eye,
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { EXPERIMENTS } from '../data/experiments';

export default function ExperimentsTab({ onSelectExperiment }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [materialFilter, setMaterialFilter] = useState('All');
  const [gravityFilter, setGravityFilter] = useState('All');
  const [oxygenFilter, setOxygenFilter] = useState('All');
  const [outcomeFilter, setOutcomeFilter] = useState('All');

  // Sorting state
  const [sortField, setSortField] = useState('confidenceScore');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' | 'desc'

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredExperiments = useMemo(() => {
    return EXPERIMENTS.filter((exp) => {
      // Search
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        exp.name.toLowerCase().includes(searchLower) ||
        exp.id.toLowerCase().includes(searchLower) ||
        exp.material.toLowerCase().includes(searchLower) ||
        exp.source.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      // Material
      if (materialFilter !== 'All' && exp.material !== materialFilter) return false;

      // Gravity
      if (gravityFilter !== 'All' && exp.gravity !== gravityFilter) return false;

      // Oxygen
      if (oxygenFilter === '<21' && exp.oxygen >= 21.0) return false;
      if (oxygenFilter === '21-25' && (exp.oxygen < 21.0 || exp.oxygen > 25.0)) return false;
      if (oxygenFilter === '>25' && exp.oxygen <= 25.0) return false;

      // Outcome
      if (outcomeFilter === 'Extinguished' && exp.extinguished !== 'Yes') return false;
      if (outcomeFilter === 'Sustained' && exp.extinguished !== 'No') return false;

      return true;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [searchTerm, materialFilter, gravityFilter, oxygenFilter, outcomeFilter, sortField, sortDirection]);

  const getConfidenceBadgeColor = (score) => {
    if (score >= 90) return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
    if (score >= 75) return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
  };

  const exportCSV = () => {
    const headers = ["ID", "Name", "Material", "Gravity", "Oxygen%", "Pressure(kPa)", "Airflow(cm/s)", "FlameSpreadRate(mm/s)", "Extinguished", "Year", "Confidence", "Source"];
    const rows = filteredExperiments.map(e => [
      e.id,
      `"${e.name}"`,
      e.material,
      e.gravity,
      e.oxygen,
      e.pressure,
      e.airflow,
      e.flameSpreadRate,
      e.extinguished,
      e.year,
      e.confidenceScore,
      `"${e.source}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NASA_Microgravity_Combustion_Experiments_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Controls Bar */}
      <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-4 md:p-5 hud-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search experiments by name, material, program, or payload..."
              className="w-full bg-[#070d1c] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition flex items-center space-x-1.5 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 border-t border-slate-800/80">
          {/* Material */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Material
            </label>
            <select
              value={materialFilter}
              onChange={(e) => setMaterialFilter(e.target.value)}
              className="w-full bg-[#070d1c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Materials ({EXPERIMENTS.length})</option>
              <option value="Cotton fabric">Cotton fabric</option>
              <option value="PMMA">PMMA</option>
              <option value="Wire insulation">Wire insulation</option>
              <option value="Foam">Foam</option>
              <option value="Paper">Paper</option>
              <option value="Nomex">Nomex</option>
            </select>
          </div>

          {/* Gravity */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Gravity Regime
            </label>
            <select
              value={gravityFilter}
              onChange={(e) => setGravityFilter(e.target.value)}
              className="w-full bg-[#070d1c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Regimes</option>
              <option value="0g">0g (ISS / Saffire)</option>
              <option value="0.16g">0.16g (Lunar Sim)</option>
              <option value="0.38g">0.38g (Mars Sim)</option>
              <option value="1g">1g (Earth Baseline)</option>
            </select>
          </div>

          {/* Oxygen Range */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Oxygen Level
            </label>
            <select
              value={oxygenFilter}
              onChange={(e) => setOxygenFilter(e.target.value)}
              className="w-full bg-[#070d1c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Oxygen %</option>
              <option value="<21">Sub-ambient (&lt; 21%)</option>
              <option value="21-25">Standard (21% - 25%)</option>
              <option value=">25">Enriched / EVA (&gt; 25%)</option>
            </select>
          </div>

          {/* Outcome */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 uppercase block mb-1">
              Burn Outcome
            </label>
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="w-full bg-[#070d1c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Outcomes</option>
              <option value="Extinguished">Extinguished (Self-Quenched)</option>
              <option value="Sustained">Sustained Burn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
        <span>
          Showing <span className="text-cyan-400 font-bold">{filteredExperiments.length}</span> of {EXPERIMENTS.length} flight experiments
        </span>
        <span className="text-[11px] text-slate-400">
          Click any row to open AI Multi-Perspective Analysis Drawer
        </span>
      </div>

      {/* Experiments Table */}
      <div className="bg-[#0a1122] border border-cyan-500/20 rounded-2xl overflow-hidden hud-card shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-[#060a16] border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-cyan-400 transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>Experiment / Flight Run</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('material')}
                  className="py-3 px-3 cursor-pointer hover:text-cyan-400 transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>Material</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('gravityVal')}
                  className="py-3 px-3 cursor-pointer hover:text-cyan-400 transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>Gravity</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('oxygen')}
                  className="py-3 px-3 cursor-pointer hover:text-cyan-400 transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>O₂ %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('pressure')}
                  className="py-3 px-3 cursor-pointer hover:text-cyan-400 transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>kPa</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('airflow')}
                  className="py-3 px-3 cursor-pointer hover:text-cyan-400 transition"
                >
                  <div className="flex items-center space-x-1">
                    <span>Airflow</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('flameSpreadRate')}
                  className="py-3 px-3 cursor-pointer hover:text-cyan-400 transition text-right"
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Spread Rate</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('extinguished')}
                  className="py-3 px-3 cursor-pointer hover:text-cyan-400 transition text-center"
                >
                  <span>Outcome</span>
                </th>
                <th
                  onClick={() => handleSort('confidenceScore')}
                  className="py-3 px-4 cursor-pointer hover:text-cyan-400 transition text-center"
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>Confidence</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredExperiments.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    No experiments match the selected criteria. Try resetting filters.
                  </td>
                </tr>
              ) : (
                filteredExperiments.map((exp) => (
                  <tr
                    key={exp.id}
                    onClick={() => onSelectExperiment(exp)}
                    className="hover:bg-cyan-950/20 cursor-pointer transition group"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-100 group-hover:text-cyan-300 transition">
                        {exp.name}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
                        <span className="text-cyan-400/80">{exp.id}</span>
                        <span>•</span>
                        <span>{exp.source}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <span className="bg-slate-800/90 px-2 py-0.5 rounded text-[11px] border border-slate-700">
                        {exp.material}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-cyan-300">
                      {exp.gravity}
                    </td>
                    <td className="py-3 px-3 text-slate-200">
                      {exp.oxygen}%
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {exp.pressure}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {exp.airflow} cm/s
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-orange-400">
                      {exp.flameSpreadRate.toFixed(2)} mm/s
                    </td>
                    <td className="py-3 px-3 text-center">
                      {exp.extinguished === 'Yes' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/40 text-[10px]">
                          <span>Extinguished</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/40 text-[10px]">
                          <span>Sustained</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded border text-[11px] font-bold ${getConfidenceBadgeColor(exp.confidenceScore)}`}>
                        {exp.confidenceScore}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectExperiment(exp);
                        }}
                        className="p-1 rounded text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition"
                        title="View Full Telemetry & Summaries"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
