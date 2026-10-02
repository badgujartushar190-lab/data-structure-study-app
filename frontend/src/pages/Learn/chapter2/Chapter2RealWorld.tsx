import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { TopicData } from './chapter2Data';

interface Props {
  topic: TopicData;
}

export const Chapter2RealWorld: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="font-bold text-slate-100 text-base">
            Industrial Applications & Production Case Studies
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          Real-World Systems
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topic.realWorld.map((study, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between shadow-xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                  {study.category}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">Case #{idx + 1}</span>
              </div>

              <div>
                <h3 className="font-bold text-slate-100 text-base">{study.title}</h3>
                <span className="text-xs font-mono text-cyan-300 block mt-0.5">{study.system}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{study.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              {study.bullets.map((bullet, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
