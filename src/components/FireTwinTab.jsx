import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ReferenceDot
} from 'recharts';
import {
  Flame,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  Wind,
  Gauge,
  Activity,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import FlameCanvas from './FlameCanvas';
import { predictCombustionState, generateGravityCurveData } from '../utils/combustionModel';
import { EXPERIMENTS } from '../data/experiments';

export default function FireTwinTab({ onSelectExperiment }) {
  // Simulator state
  const [gravity, setGravity] = useState(0.0);
  const [material, setMaterial] = useState("PMMA");
  const [oxygen, setOxygen] = useState(21.0);
  const [pressure, setPressure] = useState(101.3);
  const [airflow, setAirflow] = useState(10.0);

  // Compute live prediction
  const prediction = useMemo(() => {
    return predictCombustionState({
      gravity,
      material,
      oxygen,
      pressure,
      airflow
    });
  }, [gravity, material, oxygen, pressure, airflow]);

  // Compute curve data for chart
  const curveData = useMemo(() => {
    return generateGravityCurveData(material, oxygen, pressure, airflow);
  }, [material, oxygen, pressure, airflow]);

  // Find relevant experiments matching this material to plot as dots
  const matchingExperiments = useMemo(() => {
    return EXPERIMENTS.filter(exp => exp.material === material);
  }, [material]);

  // Preset handlers
  const applyPreset = (preset) => {
    if (preset === 'iss') {
      setGravity(0.0);
      setOxygen(21.0);
      setPressure(101.3);
      setAirflow(12.0);
    } else if (preset === 'moon') {
      setGravity(0.16);
      setOxygen(26.5);
      setPressure(70.3);
      setAirflow(10.0);
    } else if (preset === 'mars') {
      setGravity(0.38);
      setOxygen(28.0);
      setPressure(56.0);
      setAirflow(10.0);
    } else if (preset === 'earth') {
      setGravity(1.0);
      setOxygen(20.9);
      setPressure(101.3);
      setAirflow(0.0);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Required Safety Disclaimer Banner */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3.5 px-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3 text-amber-300">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 animate-pulse" />
          <span className="text-xs md:text-sm font-mono tracking-wide font-medium">
            ESTIMATES FOR DECISION SUPPORT ONLY, NOT CERTIFIED SAFETY VALUES.
          </span>
        </div>
        <span className="text-[11px] font-mono text-amber-400/80 hidden lg:inline">
          Model: NASA GRC SoFIE/Saffire Empirical Boundary Coupling
        </span>
      </div>

      {/* Preset Quick-Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#091122] p-3 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>MISSION PRESETS:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyPreset('iss')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
              gravity === 0.0 && oxygen === 21.0
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🛰️ ISS Microgravity (0g)</span>
          </button>
          <button
            onClick={() => applyPreset('moon')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
              gravity === 0.16
                ? 'bg-orange-500 text-slate-950 font-bold shadow-md shadow-orange-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🌕 Artemis Moon Base (0.16g)</span>
          </button>
          <button
            onClick={() => applyPreset('mars')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
              gravity === 0.38
                ? 'bg-red-500 text-slate-950 font-bold shadow-md shadow-red-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🔴 Mars Surface Habitat (0.38g)</span>
          </button>
          <button
            onClick={() => applyPreset('earth')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition flex items-center space-x-1.5 ${
              gravity === 1.0
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🌍 Earth Baseline (1.0g)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Controls & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-mono font-bold tracking-wider text-slate-100 uppercase">
                  Environmental Physics Controls
                </h3>
              </div>
              <button
                onClick={() => applyPreset('iss')}
                className="text-slate-400 hover:text-cyan-400 transition"
                title="Reset to default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Gravity Slider with Moon and Mars markers */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 flex items-center space-x-1">
                  <span>GRAVITY VECTOR (g)</span>
                </span>
                <span className="text-cyan-400 font-bold text-sm bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  {gravity.toFixed(2)}g
                  {gravity === 0 && " (Microgravity)"}
                  {gravity === 0.16 && " (Moon)"}
                  {gravity === 0.38 && " (Mars)"}
                  {gravity === 1.0 && " (Earth)"}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.01"
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />

              {/* Markers */}
              <div className="relative pt-1 flex justify-between text-[10px] font-mono text-slate-400">
                <button
                  onClick={() => setGravity(0.0)}
                  className={`hover:text-cyan-400 transition ${gravity === 0.0 ? 'text-cyan-400 font-bold underline' : ''}`}
                >
                  0g (ISS)
                </button>
                <button
                  onClick={() => setGravity(0.16)}
                  className={`hover:text-orange-400 transition ${gravity === 0.16 ? 'text-orange-400 font-bold underline' : ''}`}
                >
                  0.16g (Moon)
                </button>
                <button
                  onClick={() => setGravity(0.38)}
                  className={`hover:text-red-400 transition ${gravity === 0.38 ? 'text-red-400 font-bold underline' : ''}`}
                >
                  0.38g (Mars)
                </button>
                <button
                  onClick={() => setGravity(1.0)}
                  className={`hover:text-emerald-400 transition ${gravity === 1.0 ? 'text-emerald-400 font-bold underline' : ''}`}
                >
                  1.0g (Earth)
                </button>
              </div>
            </div>

            {/* Material Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>COMBUSTION MATERIAL</span>
                <span className="text-[10px] text-slate-400">6 standard fuels</span>
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-[#070d1c] border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Cotton fabric">Cotton fabric (Garments & Bedding)</option>
                <option value="PMMA">PMMA (Cast Acrylic Windows & Panels)</option>
                <option value="Wire insulation">Wire insulation (ETFE / Kapton Avionics)</option>
                <option value="Foam">Foam (Polyurethane Cushioning)</option>
                <option value="Paper">Paper (Checklists & Packaging)</option>
                <option value="Nomex">Nomex (Aramid Protective Flight Suits)</option>
              </select>
            </div>

            {/* Atmosphere Parameters */}
            <div className="grid grid-cols-2 gap-4">
              {/* Oxygen % */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">OXYGEN (O₂)</span>
                  <span className="text-cyan-400 font-bold">{oxygen.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="36"
                  step="0.5"
                  value={oxygen}
                  onChange={(e) => setOxygen(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>16% (Quench)</span>
                  <span>21%</span>
                  <span>34% (EVA)</span>
                </div>
              </div>

              {/* Cabin Pressure */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-300">PRESSURE</span>
                  <span className="text-cyan-400 font-bold">{pressure.toFixed(1)} kPa</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="101.3"
                  step="1"
                  value={pressure}
                  onChange={(e) => setPressure(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>50 (Mars)</span>
                  <span>70.3 (Artemis)</span>
                  <span>101.3 (ISS)</span>
                </div>
              </div>
            </div>

            {/* Airflow / Ventilation */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 flex items-center space-x-1">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>FORCED AIRFLOW (VENTILATION)</span>
                </span>
                <span className="text-cyan-400 font-bold">{airflow.toFixed(1)} cm/s</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={airflow}
                onChange={(e) => setAirflow(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[9px] font-mono text-slate-400">
                <span>0 cm/s (Quiescent)</span>
                <span>10-15 cm/s (Nominal Cabin)</span>
                <span>30 cm/s (Emergency)</span>
              </div>
            </div>
          </div>

          {/* Live Output Metrics Cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* Predicted Spread Rate */}
            <div className="bg-[#0b1329] border border-cyan-500/30 rounded-xl p-3.5 hud-card flex flex-col justify-between">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Flame Spread Rate
              </div>
              <div className="my-1">
                <div className="text-xl md:text-2xl font-mono font-bold text-cyan-300">
                  {prediction.flameSpreadRate.toFixed(2)}
                </div>
                <div className="text-[10px] font-mono text-slate-400">mm / second</div>
              </div>
              <div className="text-[10px] font-mono text-amber-400">
                ±{prediction.uncertaintyMmSec.toFixed(2)} σ
              </div>
            </div>

            {/* Extinguishment Likelihood */}
            <div className={`border rounded-xl p-3.5 hud-card flex flex-col justify-between ${
              prediction.extinguishedLikelihood > 60
                ? 'bg-emerald-950/20 border-emerald-500/40'
                : prediction.extinguishedLikelihood > 20
                ? 'bg-amber-950/20 border-amber-500/40'
                : 'bg-red-950/20 border-red-500/40'
            }`}>
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Quench Likelihood
              </div>
              <div className="my-1">
                <div className={`text-xl md:text-2xl font-mono font-bold ${
                  prediction.extinguishedLikelihood > 60
                    ? 'text-emerald-400'
                    : prediction.extinguishedLikelihood > 20
                    ? 'text-amber-400'
                    : 'text-red-400'
                }`}>
                  {prediction.extinguishedLikelihood}%
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {prediction.extinguishedLikelihood > 75 ? "Self-Quenching" : "Sustained Flame"}
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                {prediction.isExtinguished ? "Extinguished" : "Active Burn"}
              </div>
            </div>

            {/* Flame Size & Morphology */}
            <div className="bg-[#0b1329] border border-orange-500/30 rounded-xl p-3.5 hud-card flex flex-col justify-between">
              <div className="text-[10px] font-mono text-slate-400 uppercase">
                Flame Size Index
              </div>
              <div className="my-1">
                <div className="text-xl md:text-2xl font-mono font-bold text-orange-400">
                  {prediction.flameSizeIndex}
                  <span className="text-xs font-normal text-slate-400"> / 100</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Aspect: {prediction.flameShape.aspectRatio}:1
                </div>
              </div>
              <div className="text-[10px] font-mono text-cyan-400">
                {gravity < 0.05 ? "Spherical 0g" : gravity <= 0.25 ? "Lunar Plume" : "Teardrop Plume"}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Flame Graphic & Spread Rate Curve */}
        <div className="lg:col-span-7 space-y-5">
          {/* Flame Canvas Animation */}
          <FlameCanvas
            gravity={gravity}
            material={material}
            oxygen={oxygen}
            airflow={airflow}
            spreadRate={prediction.flameSpreadRate}
            isExtinguished={prediction.isExtinguished}
          />

          {/* Spread Rate vs Gravity Chart with Uncertainty Band & Real Data Dots */}
          <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-4 md:p-5 hud-card space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div>
                <h4 className="text-xs md:text-sm font-mono font-bold text-slate-100 uppercase tracking-wide flex items-center space-x-2">
                  <span>Flame Spread Rate vs Gravity Curve (0g to 1g)</span>
                </h4>
                <p className="text-[11px] font-mono text-slate-400">
                  Shaded envelope indicates ±1σ prediction uncertainty • Dots represent flight experiments
                </p>
              </div>
              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                  <span className="text-slate-300">Model Prediction</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-3 h-2 bg-cyan-500/20 border border-cyan-500/50 rounded-sm"></span>
                  <span className="text-slate-400">Uncertainty Envelope</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-orange-400 border border-white"></span>
                  <span className="text-slate-300">Actual Flight Runs</span>
                </span>
              </div>
            </div>

            {/* Recharts Curve with Uncertainty Band */}
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={curveData}
                  margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
                >
                  <defs>
                    <linearGradient id="uncertaintyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="gravity"
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(val) => `${val}g`}
                    domain={[0, 1.0]}
                  />
                  <YAxis
                    stroke="#64748b"
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                    unit=" mm/s"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#070d1a] border border-cyan-500/40 p-2.5 rounded-lg text-xs font-mono shadow-xl text-slate-200 space-y-1">
                            <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                              Gravity: {data.gravityLabel}
                            </div>
                            <div>Spread Rate: <span className="text-white font-bold">{data.spreadRate} mm/s</span></div>
                            <div className="text-[11px] text-slate-400">
                              Uncertainty Band: [{data.lowerBand} — {data.upperBand} mm/s]
                            </div>
                            <div className="text-[10px] text-amber-400">
                              {data.gravity > 0.05 && data.gravity < 0.6
                                ? "⚠️ Sparse Flight Data Zone (Wider Uncertainty)"
                                : "✓ Calibrated against ISS / WSTF data"}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  {/* Moon and Mars vertical reference lines */}
                  <ReferenceLine x={0.16} stroke="#f97316" strokeDasharray="3 3" label={{ value: 'Moon', fill: '#f97316', fontSize: 10, position: 'top' }} />
                  <ReferenceLine x={0.38} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Mars', fill: '#ef4444', fontSize: 10, position: 'top' }} />

                  {/* Uncertainty Band (Area between upper and lower) */}
                  <Area
                    type="monotone"
                    dataKey="upperBand"
                    stroke="none"
                    fill="url(#uncertaintyGrad)"
                    name="Uncertainty Range"
                  />
                  
                  {/* Mean Prediction Line */}
                  <Line
                    type="monotone"
                    dataKey="spreadRate"
                    stroke="#06b6d4"
                    strokeWidth={2.5}
                    dot={{ fill: '#06b6d4', r: 3 }}
                    activeDot={{ r: 6, fill: '#38bdf8' }}
                  />

                  {/* Flight experiment markers mapped to matching material */}
                  {matchingExperiments.map((exp) => (
                    <ReferenceDot
                      key={exp.id}
                      x={exp.gravityVal}
                      y={exp.flameSpreadRate}
                      r={5}
                      fill="#f97316"
                      stroke="#ffffff"
                      strokeWidth={1.5}
                      ifOverflow="visible"
                      onClick={() => onSelectExperiment && onSelectExperiment(exp)}
                      className="cursor-pointer hover:scale-125 transition"
                    />
                  ))}
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Note about real experiments */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
              <span className="flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  Showing {matchingExperiments.length} flight experiments for <strong>{material}</strong>. Click any orange dot to inspect test record.
                </span>
              </span>
              <span className="text-cyan-400">
                Peclet Regime: {prediction.regime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
