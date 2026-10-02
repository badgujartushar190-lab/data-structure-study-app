import React from 'react';
import { Globe, CheckCircle2 } from 'lucide-react';
import { TopicData } from './chapter7Data';

interface Props {
  topic: TopicData;
}

export const Chapter7RealWorld: React.FC<Props> = ({ topic }) => {
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
        {topic.realWorld.map((study, idx) => (
          <div
            key={`rw-${idx}`}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                  {study.system}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">Case #{idx + 1}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-100 text-base">{study.title}</h3>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-rose-400 font-mono uppercase text-[10px] block mb-0.5">
                    Production Role & Description:
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{study.description}</p>
                </div>

                <div>
                  <strong className="text-cyan-400 font-mono uppercase text-[10px] block mb-0.5">
                    Tree Structural Architecture:
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{study.architecture}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800/80 pt-3 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Engineering Advantages:
              </span>
              {study.advantages.map((adv, aIdx) => (
                <div key={`adv-${aIdx}`} className="flex items-start gap-1.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">{adv}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
