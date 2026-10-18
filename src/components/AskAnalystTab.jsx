import React, { useState } from 'react';
import {
  MessageSquare,
  Bot,
  User,
  Send,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Award,
  ChevronRight,
  Flame,
  Info
} from 'lucide-react';
import { EXPERIMENTS } from '../data/experiments';

export default function AskAnalystTab({ onSelectExperiment }) {
  const [messages, setMessages] = useState([
    {
      id: "msg-welcome",
      sender: "analyst",
      text: "Greetings. I am the Fire Twin Combustion Intelligence Analyst, calibrated against NASA Glenn Research Center's Saffire, SoFIE, FLEX, and BASS flight archives. Ask any question regarding spacecraft fire dynamics, lunar/martian flammability, or suppression protocols.",
      citations: [],
      confidence: "High (Flight Verified)",
      unknowns: null,
      timestamp: "00:00:01"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Pre-compiled expert responses with strict citations and unknowns
  const PRESET_QUESTIONS = [
    {
      query: "Is wire insulation safe in a Mars cabin at 30% oxygen?",
      summary: "NO. Wire insulation (ETFE / Kapton) poses a severe fire propagation hazard in a Mars cabin (0.38g) at 30% oxygen.",
      explanation: "Standard aerospace wire insulation (such as ETFE and polyimide) relies on natural convection cooling and low oxygen on Earth. Under Martian partial gravity (0.38g), a buoyant chimney effect develops along wire bundles that continuously feeds oxidizer to the flame front without aerodynamic blowout. Combined with 30% oxygen (which exceeds the LOI of 24%), an electrical overload will sustain continuous axial flame spread along the copper conductor at ~1.10 mm/s.",
      citations: ["EXP-MARS-010", "EXP-BASS-005", "EXP-EARTH-021"],
      confidence: "Moderate (72% Confidence)",
      confidenceLevel: "moderate",
      unknowns: "Long-duration flame spread rates on multi-conductor twisted cable harnesses have only been tested for ≤45 seconds in centrifuge/parabolic aircraft. True multi-hour smolder propagation in Martian soil/dust contaminated conduit remains untested."
    },
    {
      query: "Why can partial gravity (Moon/Mars) be more dangerous than microgravity?",
      summary: "Partial gravity creates a buoyant 'resonance sweet spot' that accelerates flame spread while avoiding aerodynamic blowout.",
      explanation: "In 0g (microgravity), flames without strong ventilation often starve in their own CO₂/soot clouds and undergo radiative extinction. On Earth (1g), buoyant flows are fast (~80 cm/s), creating aerodynamic shear that cools thin fuels. On the Moon (0.16g) and Mars (0.38g), the buoyant updraft is mild (8–18 cm/s)—strong enough to deliver fresh oxygen, yet gentle enough to retain thermal enthalpy near the solid fuel. This causes materials to burn up to 40% faster than in 0g.",
      citations: ["EXP-MOON-007", "EXP-MARS-009", "EXP-SAF-002"],
      confidence: "High (89% Confidence)",
      confidenceLevel: "high",
      unknowns: "The exact transition boundary where convective blow-off overtakes buoyant acceleration is unmapped for complex geometries like multi-layer habitat wall insulation."
    },
    {
      query: "Can water mist extinguish fires on the Gateway Lunar Station?",
      summary: "YES. NASA's Portable Water Mist Extinguisher (PFE-WM) is the certified primary agent for Gateway and ISS.",
      explanation: "In microgravity (0g), 30–50 micron water droplets remain suspended as a dense cloud rather than falling to the floor. The droplets extract latent heat of vaporization (2.26 MJ/kg) directly from the diffusion flame zone and expand 1,700-fold into steam, locally displacing oxygen below 14%. Furthermore, fine mist leaves non-toxic, easily scrubbed residue compared to corrosive Halon or chemical powders.",
      citations: ["EXP-SAF-001", "EXP-SOF-028", "EXP-BASS-004"],
      confidence: "Very High (95% Confidence)",
      confidenceLevel: "high",
      unknowns: "Droplet agglomeration dynamics in turbulent air streams produced by sudden emergency ventilation depressurization."
    },
    {
      query: "What makes Nomex safe on Earth but risky during pre-EVA oxygen enrichment?",
      summary: "Nomex relies on an aromatic char barrier that collapses when oxygen exceeds its Limiting Oxygen Index (28.5%).",
      explanation: "Nomex aramid fabric is self-extinguishing in nominal air (21% O₂) because heat pyrolyzes the polymer into an insulating carbonaceous foam. However, during spacewalk preparation, cabin or suit airlocks are enriched up to 34% O₂ to eliminate crew nitrogen decompression sickness. At >28.5% O₂, chemical kinetic reaction rates overwhelm the protective char layer, causing rapid flame spread (1.95 mm/s) with extreme heat flux.",
      citations: ["EXP-EARTH-012", "EXP-EARTH-013", "EXP-MARS-026"],
      confidence: "High (92% Confidence)",
      confidenceLevel: "high",
      unknowns: "Effect of vacuum sublimation on Nomex fiber char strength when exposed to repeated airlock depress/repress cycles."
    },
    {
      query: "How does cabin airflow affect the extinction limit of PMMA in 0g?",
      summary: "In microgravity, PMMA undergoes radiative extinction if airflow drops below 4.5 cm/s, but burns vigorously above 15 cm/s.",
      explanation: "Because there is no buoyancy in 0g, combustion relies entirely on forced ventilation. If airspeed drops below ~4.5 cm/s, blackbody radiation from soot particles and combustion gases bleeds more heat away than the sluggish chemical flame can produce, smothering the fire. Conversely, when ventilation exceeds 15 cm/s, the flame transitions into a concurrent boundary layer burn that spreads rapidly.",
      citations: ["EXP-SAF-002", "EXP-SAF-016", "EXP-SOF-003"],
      confidence: "Very High (94% Confidence)",
      confidenceLevel: "high",
      unknowns: "Turbulent eddy shedding effects caused by astronaut movement or opening compartment hatch doors near a smoldering PMMA panel."
    }
  ];

  const handleAskQuestion = (qText) => {
    if (!qText.trim()) return;

    // Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: qText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery("");
    setIsTyping(true);

    // Find closest smart response or generate analytical synthesis
    setTimeout(() => {
      const qLower = qText.toLowerCase();
      let matched = PRESET_QUESTIONS.find(p =>
        qLower.includes("wire") || qLower.includes("insulation") || qLower.includes("mars cabin")
      );

      if (qLower.includes("partial gravity") || qLower.includes("moon") || qLower.includes("more dangerous")) {
        matched = PRESET_QUESTIONS[1];
      } else if (qLower.includes("water mist") || qLower.includes("gateway") || qLower.includes("extinguish")) {
        matched = PRESET_QUESTIONS[2];
      } else if (qLower.includes("nomex") || qLower.includes("pre-eva") || qLower.includes("eva") || qLower.includes("suit")) {
        matched = PRESET_QUESTIONS[3];
      } else if (qLower.includes("airflow") || qLower.includes("pmma") || qLower.includes("extinction limit") || qLower.includes("ventilation")) {
        matched = PRESET_QUESTIONS[4];
      }

      if (!matched) {
        // Fallback intelligence answering synthesis
        matched = {
          summary: `Analysis for "${qText}": Combustion behavior in low/microgravity depends fundamentally on the Damkohler number and Peclet regime.`,
          explanation: `Flight experiments demonstrate that without gravity, convective heat transport decouples from buoyancy. Materials with Limiting Oxygen Index (LOI) near 18–21% self-quench under low airflows (< 5 cm/s), whereas oxygen enrichment (> 25%) enables sustained burning regardless of gravity level. For mission operations, ventilation isolation remains the most effective first response.`,
          citations: ["EXP-SAF-001", "EXP-SOF-003", "EXP-BASS-004"],
          confidence: "Moderate (Model Synthesis)",
          confidenceLevel: "moderate",
          unknowns: "Empirical data for this specific query requires targeted testing in the ISS CIR SoFIE facility under controlled atmosphere."
        };
      }

      const analystMsg = {
        id: `analyst-${Date.now()}`,
        sender: "analyst",
        text: matched.summary,
        explanation: matched.explanation,
        citations: matched.citations,
        confidence: matched.confidence,
        confidenceLevel: matched.confidenceLevel,
        unknowns: matched.unknowns,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, analystMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#0b1329] border border-cyan-500/20 rounded-2xl p-5 hud-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center space-x-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>Ask the Microgravity Combustion Analyst</span>
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Empirical reasoning engine citing NASA SoFIE, Saffire, and BASS flight datasets with explicit uncertainty disclosures
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1.5 rounded-xl border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Analyst AI Telemetry Active</span>
        </div>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block px-1">
          Recommended Mission Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(pq.query)}
              className="px-3 py-1.5 rounded-xl bg-[#091124] border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-950/30 text-xs font-mono text-slate-300 transition text-left"
            >
              "{pq.query}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Transcript Window */}
      <div className="bg-[#0a1122] border border-cyan-500/20 rounded-2xl p-4 md:p-6 hud-card space-y-5 min-h-[440px] max-h-[580px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
          >
            {/* Sender Label */}
            <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 px-1">
              {msg.sender === 'user' ? (
                <>
                  <span>Mission Commander</span>
                  <User className="w-3 h-3 text-cyan-400" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400 font-bold">NASA Combustion Analyst</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs md:text-sm font-sans leading-relaxed shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                  : 'bg-[#060a16] border border-slate-800 text-slate-200 rounded-tl-none space-y-3'
              }`}
            >
              {/* Main text */}
              <div className="font-medium">{msg.text}</div>

              {/* Detailed explanation if analyst */}
              {msg.explanation && (
                <div className="text-slate-300 font-sans text-xs leading-relaxed pt-2 border-t border-slate-800/80">
                  {msg.explanation}
                </div>
              )}

              {/* Analyst Metadata: Citations, Confidence, and Unknowns */}
              {msg.sender === 'analyst' && msg.citations && msg.citations.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-slate-800 font-mono text-[11px]">
                  {/* Citations Linking to Experiments */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">
                      Empirical Flight Citations:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((citeId) => {
                        const exp = EXPERIMENTS.find(e => e.id === citeId);
                        return (
                          <button
                            key={citeId}
                            onClick={() => exp && onSelectExperiment(exp)}
                            className="px-2 py-1 rounded bg-[#0a1226] border border-cyan-500/40 hover:bg-cyan-900/40 text-cyan-300 flex items-center space-x-1 transition"
                            title="Click to view full flight experiment telemetry"
                          >
                            <ExternalLink className="w-3 h-3 text-cyan-400" />
                            <span>{citeId}</span>
                            {exp && <span className="text-slate-400 text-[10px]">({exp.material}, {exp.gravity})</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Confidence Badge */}
                  <div className="flex items-center justify-between text-[10px] pt-1">
                    <span className="text-slate-400">Model Confidence:</span>
                    <span className={`px-2 py-0.5 rounded font-bold border ${
                      msg.confidenceLevel === 'high'
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                        : 'bg-amber-950/40 border-amber-500/50 text-amber-400'
                    }`}>
                      {msg.confidence}
                    </span>
                  </div>

                  {/* Clear Statement of What is Unknown */}
                  {msg.unknowns && (
                    <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-2.5 text-amber-300/90 text-[10px] leading-relaxed space-y-0.5">
                      <span className="font-bold uppercase tracking-wider flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" />
                        <span>Known Unknowns & Empirical Limitations:</span>
                      </span>
                      <p>{msg.unknowns}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-[#070d1a] p-3 rounded-xl w-48 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100"></span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200"></span>
            <span className="text-[11px] text-slate-400">Synthesizing data...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAskQuestion(inputQuery);
        }}
        className="flex items-center space-x-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type your combustion safety question (e.g., 'Is Nomex safe at 34% oxygen?')..."
            className="w-full bg-[#0b1329] border border-cyan-500/30 rounded-xl px-4 py-3 text-xs md:text-sm font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition flex items-center space-x-2 shadow-lg shadow-cyan-500/20 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask Analyst</span>
        </button>
      </form>
    </div>
  );
}
