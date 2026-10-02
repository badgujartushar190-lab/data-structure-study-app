import React from 'react';
import { Cpu, Clock, Terminal } from 'lucide-react';
import { TopicData } from './chapter7Data';

interface Props {
  topic: TopicData;
}

export const Chapter7Operations: React.FC<Props> = ({ topic }) => {
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
          {topic.operations.length} Algorithmic Routines
        </span>
      </div>

      {/* Operations List */}
      <div className="space-y-6">
        {topic.operations.map((op, idx) => (
          <div
            key={`op-${idx}`}
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
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-400">Time:</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold border border-cyan-500/30">
                    {op.timeComplexity}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Space:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/30">
                    {op.spaceComplexity}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & C Signature */}
            <div className="space-y-3">
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                {op.description}
              </p>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-xs text-cyan-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-slate-400">C Call Signature:</span>
                <span className="text-white font-bold">{op.cSignature}</span>
              </div>
            </div>

            {/* Step-by-Step Execution Sequence */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Execution Steps:
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {op.steps.map((st, sIdx) => (
                  <div
                    key={`step-${sIdx}`}
                    className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/50 flex items-start gap-3 text-xs text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* C Implementation Snippet */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                ISO C Implementation Snippet:
              </h4>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
                {op.codeSnippet}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
