import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  FileCode,
  ShieldCheck,
  Layers,
  Sparkles,
  ArrowRight,
  ListOrdered
} from 'lucide-react';
import { TopicData } from './chapter4Data';

interface Props {
  topic: TopicData;
}

export const Chapter4Concept: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Primary Course Source & Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Academic Source: {topic.courseCode} — {topic.unitCode}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {topic.category}
            </span>
            <span
              className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                topic.complexity === 'Easy'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {topic.complexity}
            </span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white">{topic.title}</h1>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-4xl">
          {topic.description}
        </p>

        {/* Structural Invariant Callout */}
        {topic.id === 'top-401' && (
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>LIFO PRINCIPLE:</strong> All push, pop, and peek operations are strictly restricted to the TOP element. Zero random indexing into the body of the stack is allowed.
            </span>
          </div>
        )}

        {topic.id === 'top-402' && (
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>PARSER INVARIANT:</strong> Postfix expressions are evaluated in a single linear pass with an operand stack, eliminating parentheses and operator precedence ambiguities.
            </span>
          </div>
        )}

        {topic.id === 'top-403' && (
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>FIFO PRINCIPLE & RING BUFFER:</strong> Elements enter at REAR and leave at FRONT. Modulo arithmetic (rear + 1) % MAX completely eliminates the linear queue false-overflow flaw.
            </span>
          </div>
        )}
      </div>

      {/* Core Idea Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
          <Lightbulb className="w-5 h-5 text-cyan-400" />
          <h2>The Fundamental Concept</h2>
        </div>
        <p className="text-slate-200 text-sm md:text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {topic.coreIdea}
        </p>
      </div>

      {/* Algorithmic Working Principle */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
          <ListOrdered className="w-5 h-5 text-cyan-400" />
          <h2>Working Principle & Structural Invariants</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.howItWorks.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3 text-xs md:text-sm text-slate-300"
            >
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Realistic Trace Example */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2>Realistic Trace & State Machine</h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
            {topic.stepByStepExample.title}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
          Initial State: <span className="text-cyan-300 font-bold">{topic.stepByStepExample.initialState}</span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3">
            {topic.stepByStepExample.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 text-xs md:text-sm hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono font-bold text-xs border border-cyan-500/30">
                      Step {st.stepNumber}
                    </span>
                    <strong className="text-slate-100 font-semibold">{st.action}</strong>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    State: {st.stateDisplay}
                  </span>
                </div>

                <p className="text-slate-300 text-xs font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                  {st.statusText}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pseudocode & ADT Specification Box */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">Formal ADT & Algorithmic Specification</span>
          </div>
          <span className="text-[10px] text-slate-500 uppercase tracking-wider">Formal Spec</span>
        </div>
        <pre className="p-6 text-cyan-300 leading-relaxed overflow-x-auto selection:bg-cyan-500 selection:text-slate-950">
          <code>{topic.pseudocode}</code>
        </pre>
      </div>

      {/* Core Definitions Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2>Deep Theoretical Concepts & Academic Invariants</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topic.concepts.map((concept, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{concept.name}</span>
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {concept.source}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {concept.definition}
                </p>

                {concept.example && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
                    <span className="text-cyan-400 font-bold block text-[11px]">Formula / Code Fragment:</span>
                    <pre className="text-slate-300 whitespace-pre-wrap font-mono">{concept.example}</pre>
                  </div>
                )}
              </div>

              {concept.usage && (
                <div className="pt-2.5 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Application:</strong> {concept.usage}</span>
                </div>
              )}

              {concept.asciiDiagram && (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] font-mono text-cyan-300">
                  <pre className="whitespace-pre">{concept.asciiDiagram}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table if present */}
      {topic.comparisonTable && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <Layers className="w-5 h-5 text-blue-400" />
            <h2>Architectural Comparison Matrix</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4 w-1/4">Evaluation Metric</th>
                  <th className="p-4 w-3/8 text-cyan-400 font-bold">{topic.comparisonTable.header1}</th>
                  <th className="p-4 w-3/8 text-blue-400 font-bold">{topic.comparisonTable.header2}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {topic.comparisonTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 font-bold text-slate-200 bg-slate-950/40">{row.aspect}</td>
                    <td className="p-4 text-slate-300 leading-relaxed">{row.col1}</td>
                    <td className="p-4 text-slate-300 leading-relaxed">{row.col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Advantages & Disadvantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            <h2>Core Strengths & Advantages</h2>
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-300">
            {topic.advantages.map((adv, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{adv}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <XCircle className="w-5 h-5" />
            <h2>Inherent Limitations & Architectural Trade-offs</h2>
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-300">
            {topic.disadvantages.map((dis, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{dis}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* When to Use vs When NOT to Use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
            Optimal Use Cases:
          </span>
          <ul className="space-y-2 text-xs text-slate-300">
            {topic.whenToUse.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
            When NOT to Use (Alternative Structures):
          </span>
          <ul className="space-y-2 text-xs text-slate-300">
            {topic.whenNotToUse.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Common Pitfalls & Interview Traps */}
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Common Student & Implementation Gotchas</span>
        </div>
        <ul className="space-y-1.5 list-disc list-inside text-amber-200/90 leading-relaxed">
          {topic.commonMistakes.map((mistake, idx) => (
            <li key={idx}>{mistake}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
