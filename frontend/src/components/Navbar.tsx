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
    { label: '8 Chapters', icon: Layers, value: '8/8 Active', color: 'text-cyan-400' },
    { label: 'Visualizations', icon: Eye, value: '14 Animated', color: 'text-blue-400' },
    { label: 'C Playground', icon: Code2, value: 'C99 Native', color: 'text-emerald-400' },
    { label: 'Real World', icon: Globe, value: '24 Cases', color: 'text-amber-400' },
    { label: 'Quiz Engine', icon: HelpCircle, value: 'Live Scoring', color: 'text-purple-400' },
    { label: 'Progress', icon: BarChart2, value: `${completedTopicIds.length}/16 Completed`, color: 'text-rose-400' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Navbar Header */}
      <div className="h-16 px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-glow group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-slate-950 font-black" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-cyan-200 to-blue-500 bg-clip-text text-transparent">
              DSAForge
            </span>
            <span className="block text-[9px] font-mono text-cyan-500 tracking-wider uppercase">
              Autonomous Engineer v2.0
            </span>
          </div>
        </Link>

        {/* Progression Step Pills */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 px-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Workflow:
          </span>
          {progressionSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/60 text-slate-200 border border-slate-700/50 hover:border-cyan-500/40 hover:text-cyan-400 transition-all cursor-pointer">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{step.label}</span>
                </div>
                {idx < progressionSteps.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Global Navigation Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/visual-lab"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/visual-lab'
                ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Visual Lab</span>
          </Link>
          <Link
            to="/playground"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/playground'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/40 shadow-blue-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Playground</span>
          </Link>
          <Link
            to="/quiz"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              location.pathname === '/quiz'
                ? 'bg-purple-500/15 text-purple-400 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Quiz</span>
          </Link>
        </div>
      </div>

      {/* Metric Highlight Bar (6 Highlight Cards) */}
      <div className="bg-slate-900/40 border-t border-slate-800/60 px-6 py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-max gap-4">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="flex items-center gap-2.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="p-1 rounded bg-slate-800">
                  <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">{m.label}</span>
                  <span className="text-xs font-bold text-slate-200">{m.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};
