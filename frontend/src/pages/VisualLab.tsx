import React, { useState } from 'react';
import { Cpu, BarChart2, Layers } from 'lucide-react';
import { SortingVisualizer } from '../visualizers/Array/SortingVisualizer';
import { StackVisualizer } from '../visualizers/Stack/StackVisualizer';

export const VisualLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sorting' | 'stack'>('sorting');

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Visual Lab Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Visual Lab</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Algorithm & Data Structure Visualizer</h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('sorting')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'sorting'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Array Sorting</span>
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'stack'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Stack Frame</span>
          </button>
        </div>
      </div>

      {/* Visualizer Canvas Container */}
      <div className="pt-2">
        {activeTab === 'sorting' && <SortingVisualizer />}
        {activeTab === 'stack' && <StackVisualizer />}
      </div>
    </div>
  );
};
