import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Download,
  AlertTriangle,
  Wind,
  Droplets,
  Gauge,
  Flame,
  ChevronRight,
  Info,
  CheckCircle2,
  FileText,
  FileCheck,
  Layers
} from 'lucide-react';
import { HABITAT_PRESETS, MATERIAL_SPECS, SUPPRESSION_STRATEGIES } from '../data/habitats';
import { jsPDF } from 'jspdf';

export default function HabitatRiskTab() {
  const [selectedHabitatId, setSelectedHabitatId] = useState('lunar_base');
  const [customO2, setCustomO2] = useState(26.5);
  const [customPressure, setCustomPressure] = useState(70.3);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Active habitat preset
  const activeHabitat = useMemo(() => {
    return HABITAT_PRESETS.find(h => h.id === selectedHabitatId) || HABITAT_PRESETS[1];
  }, [selectedHabitatId]);

  // When switching habitat, initialize custom sliders to preset defaults
  const handleSelectHabitat = (id) => {
    setSelectedHabitatId(id);
    const hab = HABITAT_PRESETS.find(h => h.id === id);
    if (hab) {
      setCustomO2(hab.oxygen);
      setCustomPressure(hab.pressure);
    }
  };

  // Calculate dynamic overall risk level and score (0 to 100)
  const riskAnalysis = useMemo(() => {
    const o2 = customO2;
    const p = customPressure;
    const g = activeHabitat.gravity;

    // Baseline gravity hazard:
    // Partial gravity (0.16g Moon, 0.38g Mars) has buoyant feed without blowoff!
    let gFactor = 1.0;
    if (g > 0.1 && g < 0.5) gFactor = 1.25; // partial gravity penalty
    else if (g === 0) gFactor = 0.95; // 0g has quiescent self-extinction potential
    else gFactor = 1.1; // 1g

    // Oxygen hazard: steep increase above 21%
    const o2Hazard = Math.pow(Math.max(1.0, o2 / 21.0), 2.2);

    // Pressure factor: low pressure slightly reduces flame temperature, but high O2% usually offsets it
    const pHazard = Math.pow(p / 101.3, 0.4);

    let rawScore = Math.round(45 * o2Hazard * pHazard * gFactor);
    rawScore = Math.max(10, Math.min(99, rawScore));

    let level = "Medium";
    let color = "text-amber-400";
    let bgBadge = "bg-amber-950/40 border-amber-500/50 text-amber-400";
    let summary = "Moderate flammability risk. Standard automated suppression protocols sufficient.";

    if (rawScore < 40) {
      level = "Low";
      color = "text-emerald-400";
      bgBadge = "bg-emerald-950/40 border-emerald-500/50 text-emerald-400";
      summary = "Sub-critical atmospheric flammability. Most polymers exhibit elevated LOI thresholds.";
    } else if (rawScore >= 75 && rawScore < 88) {
      level = "High";
      color = "text-orange-400";
      bgBadge = "bg-orange-950/40 border-orange-500/50 text-orange-400";
      summary = "Elevated flammability danger. Cotton and acrylic burn rapidly; Nomex char protection is stressed.";
    } else if (rawScore >= 88) {
      level = "Critical";
      color = "text-red-400";
      bgBadge = "bg-red-950/40 border-red-500/50 text-red-400";
      summary = "CRITICAL HAZARD: Atmospheric oxygen concentration overrides standard materials fire blocking. Flashover potential.";
    }

    // Rank materials according to this atmosphere
    const rankedMaterials = Object.keys(MATERIAL_SPECS).map(key => {
      const spec = MATERIAL_SPECS[key];
      // Flammability adjusted by oxygen
      const effectiveRisk = Math.min(100, Math.round(spec.baseFlammability * (o2 / 21.0) * (p / 101.3) * (g > 0 ? 1.1 : 0.95)));
      return {
        key,
        name: spec.name,
        category: spec.category,
        riskScore: effectiveRisk,
        loi: spec.loiStandard,
        hazardNote: spec.hazardNote,
        toxicProducts: spec.toxicProducts,
        status: o2 > spec.loiStandard ? "FLAMMABLE" : "MARGINAL"
      };
    }).sort((a, b) => b.riskScore - a.riskScore);

    return {
      score: rawScore,
      level,
      color,
      bgBadge,
      summary,
      rankedMaterials
    };
  }, [activeHabitat, customO2, customPressure]);

  // Generate and Download PDF Passport
  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Background Navy Header
      doc.setFillColor(10, 17, 34);
      doc.rect(0, 0, 210, 42, 'F');

      // Title & NASA Banner
      doc.setTextColor(6, 182, 212);
      doc.setFont('courier', 'bold');
      doc.setFontSize(16);
      doc.text("NASA FIRE TWIN :: HABITAT RISK PASSPORT", 14, 16);

      doc.setTextColor(241, 245, 249);
      doc.setFontSize(10);
      doc.setFont('courier', 'normal');
      doc.text("Spacecraft & Habitat Combustion Safety Assessment Protocol", 14, 23);
      doc.text(`Document Ref: NASA-FTP-2026-${activeHabitat.id.toUpperCase()}`, 14, 29);
      doc.text(`Generated: ${new Date().toUTCString()}`, 14, 35);

      // Passport Meta Block
      doc.setFillColor(245, 247, 250);
      doc.rect(14, 48, 182, 38, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.rect(14, 48, 182, 38, 'S');

      doc.setTextColor(15, 23, 42);
      doc.setFont('courier', 'bold');
      doc.setFontSize(12);
      doc.text(`HABITAT: ${activeHabitat.name.toUpperCase()}`, 18, 56);

      doc.setFontSize(9);
      doc.setFont('courier', 'normal');
      doc.text(`Location: ${activeHabitat.location}`, 18, 62);
      doc.text(`Gravity Regime: ${activeHabitat.gravityLabel}`, 18, 68);
      doc.text(`Cabin Oxygen: ${customO2}%   |   Cabin Pressure: ${customPressure} kPa`, 18, 74);
      doc.text(`Standard Airflow: ${activeHabitat.airflow} cm/s   |   Crew Capacity: ${activeHabitat.crewCapacity}`, 18, 80);

      // Overall Risk Rating
      doc.setFillColor(riskAnalysis.level === 'Critical' ? 254 : riskAnalysis.level === 'High' ? 255 : 240, 242, 242);
      doc.rect(14, 90, 182, 24, 'F');
      doc.setDrawColor(180, 180, 180);
      doc.rect(14, 90, 182, 24, 'S');

      doc.setTextColor(riskAnalysis.level === 'Critical' ? 185 : riskAnalysis.level === 'High' ? 194 : 16, 28, 36);
      doc.setFont('courier', 'bold');
      doc.setFontSize(14);
      doc.text(`OVERALL FIRE RISK: ${riskAnalysis.level.toUpperCase()} (Index: ${riskAnalysis.score}/100)`, 18, 98);

      doc.setFontSize(8.5);
      doc.setFont('courier', 'normal');
      doc.text(riskAnalysis.summary, 18, 106, { maxWidth: 174 });

      // Ranked Hazards Table
      doc.setTextColor(10, 17, 34);
      doc.setFont('courier', 'bold');
      doc.setFontSize(11);
      doc.text("RANKED MATERIAL FIRE HAZARDS:", 14, 122);

      let startY = 128;
      riskAnalysis.rankedMaterials.forEach((mat, idx) => {
        doc.setFillColor(idx % 2 === 0 ? 250 : 242, 250, 252);
        doc.rect(14, startY - 4, 182, 10, 'F');

        doc.setFont('courier', 'bold');
        doc.setFontSize(8.5);
        doc.text(`${idx + 1}. ${mat.name}`, 18, startY + 2);

        doc.setFont('courier', 'normal');
        doc.text(`Risk: ${mat.riskScore}/100`, 95, startY + 2);
        doc.text(`Status: ${mat.status}`, 130, startY + 2);
        doc.text(`LOI: ${mat.loi}%`, 165, startY + 2);

        startY += 10.5;
      });

      // Suppression Protocols
      startY += 4;
      doc.setFont('courier', 'bold');
      doc.setFontSize(11);
      doc.text("RECOMMENDED MULTI-TIER SUPPRESSION STRATEGY:", 14, startY);

      startY += 6;
      SUPPRESSION_STRATEGIES.forEach((strat) => {
        doc.setFont('courier', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(14, 116, 144);
        doc.text(`[${strat.tier}] ${strat.title}`, 18, startY);

        startY += 4.5;
        doc.setFont('courier', 'normal');
        doc.setTextColor(51, 65, 85);
        doc.setFontSize(7.5);
        doc.text(`Action: ${strat.operationalGuideline}`, 18, startY, { maxWidth: 174 });

        startY += 8;
      });

      // Footer
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("NASA Space Apps Challenge • Microgravity Fire Safety Intelligence • Non-certified demonstration", 14, 287);

      // Save PDF
      doc.save(`FireTwin_Passport_${activeHabitat.id}_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Habitat Selector Tabs */}
      <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <span>Habitat Fire Risk Passport Generator</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Mission-specific fire safety evaluation, flammability boundaries, and emergency extinguishing doctrine
            </p>
          </div>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition flex items-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'Compiling PDF...' : 'Download Passport as PDF'}</span>
          </button>
        </div>

        {/* Habitat Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HABITAT_PRESETS.map((hab) => {
            const isSelected = hab.id === selectedHabitatId;
            return (
              <button
                key={hab.id}
                onClick={() => handleSelectHabitat(hab.id)}
                className={`p-3.5 rounded-xl text-left border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-400/80 shadow-md shadow-cyan-500/20'
                    : 'bg-[#070d1c] border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {hab.location.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {hab.gravityLabel.split(' ')[0]}
                    </span>
                  </div>
                  <div className={`text-xs font-mono font-bold mt-1 ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                    {hab.name}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {hab.description}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>O₂: {hab.oxygen}%</span>
                  <span>{hab.pressure} kPa</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Atmosphere Overrides */}
        <div className="bg-[#070d1a] border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <span className="text-slate-300 flex items-center space-x-1.5 font-bold">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>CUSTOM CABIN OVERRIDES:</span>
          </span>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-3">
              <span className="text-slate-400">Oxygen:</span>
              <input
                type="range"
                min="16"
                max="36"
                step="0.5"
                value={customO2}
                onChange={(e) => setCustomO2(parseFloat(e.target.value))}
                className="w-28 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold w-12">{customO2.toFixed(1)}%</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-slate-400">Pressure:</span>
              <input
                type="range"
                min="45"
                max="101.3"
                step="1"
                value={customPressure}
                onChange={(e) => setCustomPressure(parseFloat(e.target.value))}
                className="w-28 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold w-16">{customPressure.toFixed(1)} kPa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Passport Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Overall Risk Gauge & Habitat Specs */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Risk Rating Banner Card */}
          <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Habitat Safety Passport Status
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${riskAnalysis.bgBadge}`}>
                {riskAnalysis.level} Risk
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 rounded-2xl bg-[#070d1c] border border-slate-800 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Index</span>
                <span className={`text-2xl font-mono font-extrabold ${riskAnalysis.color}`}>
                  {riskAnalysis.score}
                </span>
                <span className="text-[9px] font-mono text-slate-400">/ 100</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-mono font-bold text-slate-100">
                  {activeHabitat.name}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {riskAnalysis.summary}
                </p>
              </div>
            </div>

            {/* Microgravity Physics Risk Note */}
            <div className="bg-[#070d18] border border-slate-800/80 rounded-xl p-3 text-xs font-mono space-y-1">
              <span className="text-[10px] text-cyan-400 uppercase tracking-wider block font-bold">
                [FLIGHT COMBUSTION TELEMETRY NOTE]
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {activeHabitat.primaryRisks}
              </p>
            </div>
          </div>

          {/* Recommended Extinguishment Strategies */}
          <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card space-y-3.5">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Recommended Suppression Protocols
              </h4>
            </div>

            <div className="space-y-2.5">
              {SUPPRESSION_STRATEGIES.map((strat) => (
                <div
                  key={strat.id}
                  className="bg-[#070d1c] border border-slate-800/80 rounded-xl p-3 space-y-1 text-xs font-mono"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-400 font-bold text-xs">{strat.title}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                      {strat.tier.split(':')[0]}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{strat.description}</p>
                  <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 flex justify-between">
                    <span>Efficacy: {activeHabitat.gravity === 0 ? strat.effectiveness0g : strat.effectivenessPartialG}</span>
                    <span className="text-amber-400/90">{strat.mechanism.slice(0, 35)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Ranked Material Fire Hazards */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-xs md:text-sm font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>Ranked Fire Hazards by Material</span>
                </h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  Ordered by dynamic flammability under {customO2}% O₂ at {customPressure} kPa
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/30">
                {activeHabitat.gravityLabel}
              </span>
            </div>

            <div className="space-y-3">
              {riskAnalysis.rankedMaterials.map((mat, idx) => (
                <div
                  key={mat.key}
                  className="bg-[#070d1c] border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-100">
                          {mat.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {mat.category}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-right">
                      <div>
                        <div className="text-xs font-mono font-bold text-orange-400">
                          Risk Index: {mat.riskScore}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          LOI: {mat.loi}% O₂
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        mat.status === 'FLAMMABLE'
                          ? 'bg-red-950/40 border-red-500/40 text-red-400'
                          : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                      }`}>
                        {mat.status}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar of Flammability */}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        mat.riskScore > 75 ? 'bg-red-500' : mat.riskScore > 50 ? 'bg-orange-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, mat.riskScore)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    {mat.hazardNote}
                  </p>

                  <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1.5 pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Toxic Effluents:</span>
                    <span className="text-slate-300">{mat.toxicProducts}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
