import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { TopicData } from './chapter2Data';

interface Props {
  topic: TopicData;
}

export const Chapter2Complexity: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="font-bold text-slate-100 text-base">{topic.complexityMatrix.title}</h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          Asymptotic Analysis
        </span>
      </div>

      {/* Methodological Alert */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-mono flex items-start gap-3 shadow-lg">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-amber-100 uppercase tracking-wider text-[11px]">
            Academic Principle: Context-Dependent Array Complexity
          </strong>
          <p className="text-amber-200/90 leading-relaxed">
            {topic.complexityMatrix.summary}
          </p>
        </div>
      </div>

      {/* Complexity Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
        <table className="w-full text-left text-xs md:text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
            <tr>
              <th className="p-4">Operation / Scenario</th>
              <th className="p-4 text-cyan-400 font-bold">Time Complexity</th>
              <th className="p-4 text-blue-400 font-bold">Space Complexity</th>
              <th className="p-4">Conditions & Assumptions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {topic.complexityMatrix.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                <td className="p-4 font-bold text-slate-100 font-mono text-xs">{row.operation}</td>
                <td className="p-4 font-mono font-bold text-cyan-300 text-xs">{row.timeComplexity}</td>
                <td className="p-4 font-mono font-bold text-blue-300 text-xs">{row.spaceComplexity}</td>
                <td className="p-4 text-slate-400 text-xs leading-relaxed">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Factors Influencing Complexity Callout */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
        <span className="text-cyan-400 font-bold block uppercase tracking-wider text-[11px]">
          Key Performance Factors for Arrays:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-200 font-bold block mb-1">1. Element Position</span>
            <span className="text-slate-400 text-[11px]">Index 0 requires shifting all n items; appending takes O(1).</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-200 font-bold block mb-1">2. Contiguity Guarantee</span>
            <span className="text-slate-400 text-[11px]">Zero gaps allowed; deletion/insertion must shift memory.</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-200 font-bold block mb-1">3. CPU Cache Lines</span>
            <span className="text-slate-400 text-[11px]">Row-major sequential traversal hits L1/L2 caches (stride-1).</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-slate-200 font-bold block mb-1">4. Matrix Sparsity</span>
            <span className="text-slate-400 text-[11px]">When zero ratio &gt; 70%, Triplet format saves massive RAM.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
