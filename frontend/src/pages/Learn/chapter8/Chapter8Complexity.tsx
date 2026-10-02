import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { TopicData } from './chapter8Data';

interface Props {
  topic: TopicData;
}

export const Chapter8Complexity: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="font-bold text-slate-100 text-base">
            Asymptotic Time & Space Complexity Analysis ({topic.title})
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          Rigorous Big-O Bounds
        </span>
      </div>

      {/* Critical Methodological Alert */}
      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono flex items-start gap-3 shadow-lg">
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-cyan-100 uppercase tracking-wider text-[11px]">
            Statistical Nature: Expected O(1) vs Pathological O(n)
          </strong>
          <p className="text-cyan-200/90 leading-relaxed font-sans">
            Hash tables run in O(1) expected time under the Simple Uniform Hashing Assumption (SUHA). However, if an adversary crafts keys that all hash into the same slot (HashDoS attack), worst-case performance degrades to O(n) linear search. Production runtimes mitigate this with randomized hash seeds and hybrid tree structures.
          </p>
        </div>
      </div>

      {/* Complexity Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
        <table className="w-full text-left text-xs md:text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
            <tr>
              <th className="p-4">Operation</th>
              <th className="p-4 text-emerald-400 font-bold">Best Case</th>
              <th className="p-4 text-cyan-400 font-bold">Average Case</th>
              <th className="p-4 text-rose-400 font-bold">Worst Case</th>
              <th className="p-4 text-purple-400 font-bold">Aux Space</th>
              <th className="p-4">Algorithmic Rationale & Edge Conditions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {topic.complexityTable.map((row, idx) => (
              <tr key={`comp-${idx}`} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-slate-100 font-mono text-xs">{row.operation}</td>
                <td className="p-4 font-mono font-bold text-emerald-300 text-xs">{row.best}</td>
                <td className="p-4 font-mono font-bold text-cyan-300 text-xs">{row.average}</td>
                <td className="p-4 font-mono font-bold text-rose-300 text-xs">{row.worst}</td>
                <td className="p-4 font-mono font-bold text-purple-300 text-xs">{row.space}</td>
                <td className="p-4 text-slate-400 text-xs leading-relaxed">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
