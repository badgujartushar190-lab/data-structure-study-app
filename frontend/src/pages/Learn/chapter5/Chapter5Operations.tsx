import React from 'react';
import { Cpu, Clock, Terminal, CheckCircle2 } from 'lucide-react';
import { TopicData } from './chapter5Data';

interface Props {
  topic: TopicData;
}

export const Chapter5Operations: React.FC<Props> = ({ topic }) => {
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
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">C Call Signature:</span>
                <span className="text-cyan-300 font-bold">{op.syntax}</span>
              </div>
            </div>

            {/* Step-by-Step State Transition Grid */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Execution Step-by-Step Breakdown:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {op.steps.map((st) => (
                  <div
                    key={st.step}
                    className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono font-bold text-[10px] border border-cyan-500/20">
                        Step {st.step}: {st.description}
                      </span>
                    </div>
                    <div className="bg-slate-900 p-2 rounded font-mono text-[11px] text-cyan-200 border border-slate-800">
                      <code>{st.codeSnippet}</code>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {st.stateExplanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Full C Code Routine Snippet */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
              <div className="px-4 py-2 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">C99 Routine Implementation</span>
                <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> Compilable ISO C99
                </span>
              </div>
              <div className="p-4 overflow-x-auto text-slate-300">
                <pre>{op.cCodeSnippet}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
