import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Terminal,
  BookOpen,
  Eye,
  Code2,
  Cpu,
  HelpCircle,
  BarChart2,
  ChevronRight,
  Layers,
  Sparkles,
  Globe
} from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { completedTopicIds } = useProgressStore();

  const progressionSteps = [
    { label: 'Learn', icon: BookOpen, tab: 'concept' },
    { label: 'Visualize', icon: Eye, tab: 'visualization' },
    { label: 'Code', icon: Code2, tab: 'c-code' },
    { label: 'Simulate', icon: Cpu, tab: 'operations' },
    { label: 'Practice', icon: HelpCircle, tab: 'practice' },
  ];

  const metrics = [
    { label: '8 Chapters', icon: Layers, value: '8/8 Active', iconBg: 'bg-blue-50 text-blue-600' },
    { label: 'Visualizations', icon: Eye, value: '14 Animated', iconBg: 'bg-indigo-50 text-indigo-600' },
    { label: 'C Playground', icon: Code2, value: 'C99 Native', iconBg: 'bg-emerald-50 text-emerald-600' },
    { label: 'Real World', icon: Globe, value: '24 Cases', iconBg: 'bg-amber-50 text-amber-600' },
    { label: 'Quiz Engine', icon: HelpCircle, value: 'Live Scoring', iconBg: 'bg-purple-50 text-purple-600' },
    { label: 'Progress', icon: BarChart2, value: `${completedTopicIds.length}/16 Completed`, iconBg: 'bg-rose-50 text-rose-600' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Navbar Header */}
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm group-hover:bg-blue-700 transition-colors">
            <Terminal className="w-5 h-5 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                DSA<span className="text-blue-600">Forge</span>
              </span>
            </div>
            <span className="block text-[10px] font-medium text-slate-500 tracking-wide uppercase">
              Interactive DSA Learning
            </span>
          </div>
        </Link>

        {/* Progression Step Pills */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-50 px-2 py-1.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Learning Workflow:
          </span>
          {progressionSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-white transition-all cursor-pointer">
                  <Icon className="w-3.5 h-3.5 text-blue-600" />
                  <span>{step.label}</span>
                </div>
                {idx < progressionSteps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Global Navigation Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/visual-lab"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              location.pathname === '/visual-lab'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Visual Lab</span>
          </Link>
          <Link
            to="/playground"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              location.pathname === '/playground'
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Playground</span>
          </Link>
          <Link
            to="/quiz"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              location.pathname === '/quiz'
                ? 'bg-purple-50 text-purple-700 border border-purple-200 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>Quiz</span>
          </Link>
        </div>
      </div>

      {/* Metric Highlight Bar (6 Highlight Cards) */}
      <div className="bg-slate-50/80 border-t border-slate-200/80 px-6 py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-max gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-colors"
              >
                <div className={`p-1 rounded-md ${m.iconBg}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{m.label}</span>
                  <span className="text-xs font-bold text-slate-800">{m.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};
