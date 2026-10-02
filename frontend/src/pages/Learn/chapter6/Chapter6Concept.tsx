import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
  Cpu
} from 'lucide-react';
import { TopicData } from './chapter6Data';

interface Props {
  topic: TopicData;
}

export const Chapter6Concept: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Primary Course Source & Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Chapter 06: Linked Stack, Queue & Applications</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Module 6
            </span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Core DSA
            </span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white">{topic.title}</h1>
        <p className="text-cyan-400 font-medium text-xs md:text-sm">
          {topic.subtitle}
        </p>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-4xl">
          {topic.overview}
        </p>

        {/* Structural Invariant Callout */}
        {topic.id === 'top-601' && (
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>LIFO ACCESS INVARIANT:</strong> All Push, Pop, and Peek operations occur strictly at the TOP node (HEAD) in O(1) time. Overflow only happens if physical RAM is exhausted.
            </span>
          </div>
        )}

        {topic.id === 'top-602' && (
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>FIFO DUAL-POINTER INVARIANT:</strong> Elements enter at REAR and exit at FRONT in strictly O(1) time. When dequeuing the last remaining element, REAR must also be reset to NULL!
            </span>
          </div>
        )}

        {topic.id === 'top-603' && (
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>APPLICATION INVARIANT:</strong> Adjacency lists reduce sparse graph storage from O(V^2) to O(V + E); Polynomial addition executes in O(m + n) single-pass merge time.
            </span>
          </div>
        )}
      </div>

      {/* Formal Definition Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2>Formal Technical Definition</h2>
        </div>
        <p className="text-slate-200 text-sm md:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {topic.definition}
        </p>
      </div>

      {/* Core Technical Concept Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h2>Core Concept & Engineering Rationale</h2>
        </div>
        <div className="text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-sans">
          {topic.coreConcept}
        </div>
      </div>

      {/* Operational Working Principle */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2>How It Works: Algorithmic Mechanics</h2>
        </div>
        <div className="text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-line bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-sans">
          {topic.workingPrinciple}
        </div>
      </div>

      {/* Memory Architecture & Pointer Diagram */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Memory Layout & Pointer Link Architecture</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
            Heap & Stack Frame Trace
          </span>
        </div>
        <div className="p-5 overflow-x-auto text-cyan-300/90 leading-relaxed font-mono">
          <pre>{topic.memoryRepresentation}</pre>
        </div>
      </div>

      {/* Structural Invariants List */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2>Data Structure Invariants & Guarantees</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.invariants.map((inv, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3 text-xs md:text-sm text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{inv}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Pitfalls & Mistakes */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h2>Common Mistakes & Edge Case Hazards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.commonMistakes.map((mistake, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 flex items-start gap-3 text-xs md:text-sm text-rose-200/90"
            >
              <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{mistake}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Advantages vs Limitations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm md:text-base">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3>Key Advantages & Strengths</h3>
          </div>
          <ul className="space-y-2.5">
            {topic.advantages.map((adv, idx) => (
              <li
                key={idx}
                className="text-xs md:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60"
              >
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm md:text-base">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3>Limitations & Trade-offs</h3>
          </div>
          <ul className="space-y-2.5">
            {topic.limitations.map((lim, idx) => (
              <li
                key={idx}
                className="text-xs md:text-sm text-slate-300 flex items-start gap-2 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/60"
              >
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
