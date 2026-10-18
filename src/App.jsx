import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import OverviewTab from './components/OverviewTab';
import ExperimentsTab from './components/ExperimentsTab';
import FireTwinTab from './components/FireTwinTab';
import HabitatRiskTab from './components/HabitatRiskTab';
import KnowledgeGapsTab from './components/KnowledgeGapsTab';
import AskAnalystTab from './components/AskAnalystTab';
import ExperimentModal from './components/ExperimentModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Mission Control Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Main Mission Control Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewTab onNavigateTab={setActiveTab} />
        )}

        {activeTab === 'experiments' && (
          <ExperimentsTab onSelectExperiment={setSelectedExperiment} />
        )}

        {activeTab === 'firetwin' && (
          <FireTwinTab onSelectExperiment={setSelectedExperiment} />
        )}

        {activeTab === 'passport' && (
          <HabitatRiskTab />
        )}

        {activeTab === 'gaps' && (
          <KnowledgeGapsTab onSelectExperiment={setSelectedExperiment} />
        )}

        {activeTab === 'analyst' && (
          <AskAnalystTab onSelectExperiment={setSelectedExperiment} />
        )}
      </main>

      {/* Global Experiment Telemetry Modal */}
      {selectedExperiment && (
        <ExperimentModal
          experiment={selectedExperiment}
          onClose={() => setSelectedExperiment(null)}
        />
      )}

      {/* Mission Control Footer */}
      <Footer onNavigateTab={setActiveTab} />
    </div>
  );
}
