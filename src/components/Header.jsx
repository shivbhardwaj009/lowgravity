import React, { useState, useEffect } from 'react';
import {
  Flame,
  LayoutDashboard,
  Database,
  Sliders,
  ShieldAlert,
  Grid,
  Bot,
  Radio,
  Clock,
  Menu,
  X
} from 'lucide-react';

export default function Header({ activeTab, onSelectTab }) {
  const [missionTime, setMissionTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setMissionTime(now.toUTCString().slice(17, 25) + " UTC");
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'experiments', label: 'Experiments', icon: Database },
    { id: 'firetwin', label: 'Fire Twin', icon: Flame, highlight: true },
    { id: 'passport', label: 'Habitat Risk Passport', icon: ShieldAlert },
    { id: 'gaps', label: 'Knowledge Gaps', icon: Grid },
    { id: 'analyst', label: 'Ask the Analyst', icon: Bot }
  ];

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b16]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="tracking-widest uppercase font-bold">TELEMETRY LINK: ACTIVE</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline">ISS CIR / SOFIE ARCHIVE SYNC</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-300">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>{missionTime}</span>
            </span>
            <span className="hidden md:inline text-orange-400 font-bold bg-orange-950/40 px-2 py-0.5 rounded border border-orange-500/30">
              EXPEDITION 71
            </span>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="flex items-center justify-between py-3.5">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabClick('overview')}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-cyan-400 p-[1.5px] shadow-lg shadow-orange-500/20">
              <div className="w-full h-full bg-[#070b16] rounded-[10px] flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg md:text-xl font-display font-extrabold tracking-tight text-white flex items-center space-x-2">
                  <span>FIRE TWIN</span>
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-bold hidden sm:inline">
                  v2.4 TELEMETRY
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 tracking-wide line-clamp-1">
                Microgravity Fire Safety Intelligence • NASA Flight Data Synthesis
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition flex items-center space-x-2 relative ${
                    isActive
                      ? tab.highlight
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold shadow-lg shadow-orange-500/25'
                        : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-md shadow-cyan-500/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? (tab.highlight ? 'text-slate-950' : 'text-cyan-400') : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.highlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white transition border border-slate-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800 space-y-1.5 animate-fadeIn">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-mono transition flex items-center space-x-2.5 ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-300 hover:bg-slate-800/70'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
