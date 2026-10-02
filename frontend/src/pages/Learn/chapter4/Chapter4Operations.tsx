import React from 'react';
import { Cpu, Clock } from 'lucide-react';
import { TopicData } from './chapter4Data';

interface Props {
  topic: TopicData;
}

export const Chapter4Operations: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 text-base">
            {topic.title} Operational Breakdown & Mechanics
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          {topic.operations.length} Fundamental Algorithmic Routines
        </span>
      </div>

      {/* Operations List */}
      <div className="space-y-6">
        {topic.operations.map((op, idx) => (
          <div
            key={op.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl"
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white">{op.name}</h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Worst Case:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                  {op.timeComplexity.worst}
                </span>
              </div>
            </div>

            {/* Explanation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="space-y-3">
                <div>
                  <strong className="text-cyan-400 block font-mono text-xs uppercase mb-1">
                    Formal Definition:
                  </strong>
                  <p className="text-slate-200 leading-relaxed">{op.definition}</p>
                </div>
                <div>
                  <strong className="text-slate-400 block font-mono text-xs uppercase mb-1">
                    Algorithmic Mechanics:
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{op.explanation}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-emerald-400 font-bold block text-[11px]">
                    Concrete Example / Invariant:
                  </span>
                  <p className="text-slate-300">{op.arrayExample}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                  <span className="text-blue-400 font-bold block text-[11px]">
                    Industrial System Use Case:
                  </span>
                  <p className="text-slate-300">{op.realWorldExample}</p>
                </div>
              </div>
            </div>

            {/* Code Snippet & Invariants */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs overflow-x-auto text-slate-300">
                <span className="text-[10px] text-slate-500 uppercase block mb-1">
                  C99 Primitive Operation Routine:
                </span>
                <pre className="text-cyan-300"><code>{op.cSnippet}</code></pre>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span><strong>Asymptotic Constraints & Assumptions:</strong></span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {op.timeComplexity.assumptions}
                </p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-300">
                  <span className="text-emerald-400">Best: {op.timeComplexity.best}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-cyan-400">Avg: {op.timeComplexity.average}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400">Worst: {op.timeComplexity.worst}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
