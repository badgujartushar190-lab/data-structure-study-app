import React from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { TopicData } from './chapter6Data';

interface Props {
  topic: TopicData;
}

export const Chapter6RealWorld: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 text-base">
            Verified Production Case Studies & Systems ({topic.title})
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          Genuine Systems Architecture
        </span>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topic.realWorldUses.map((study, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                  {study.domain}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">Case #{idx + 1}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-100 text-base">{study.title}</h3>
                <span className="text-xs font-mono text-emerald-400 block mt-1">
                  Complexity: {study.complexity}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-rose-400 font-mono uppercase text-[10px] block mb-0.5">
                    The Engineering Challenge:
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{study.problem}</p>
                </div>

                <div>
                  <strong className="text-cyan-400 font-mono uppercase text-[10px] block mb-0.5">
                    Linked Structure Solution:
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{study.solution}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                <span className="text-cyan-400 font-bold block mb-1">Topology Deployed:</span>
                <span>{study.typeUsed}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{study.realWorldContext}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
