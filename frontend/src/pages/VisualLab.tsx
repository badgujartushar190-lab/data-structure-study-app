import React, { useState } from 'react';
import { Cpu, BarChart2, Layers } from 'lucide-react';
import { SortingVisualizer } from '../visualizers/Array/SortingVisualizer';
import { StackVisualizer } from '../visualizers/Stack/StackVisualizer';

export const VisualLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sorting' | 'stack'>('sorting');

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* Visual Lab Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Visual Lab</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Algorithm & Data Structure Visualizer</h1>
          <p className="text-sm text-slate-600 mt-1">Real-time step-by-step state animations with adjustable speed control</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('sorting')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'sorting'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Array Sorting</span>
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'stack'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
