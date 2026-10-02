import React from 'react';
import { Zap, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';
import { TopicData } from './chapter5Data';

interface Props {
  topic: TopicData;
}

export const Chapter5Complexity: React.FC<Props> = ({ topic }) => {
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

      {/* Methodological Alert */}
      <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono flex items-start gap-3 shadow-lg">
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="block text-cyan-100 uppercase tracking-wider text-[11px]">
            Theoretical Rationale: Array vs Linked List Trade-off
          </strong>
          <p className="text-cyan-200/90 leading-relaxed font-sans">
            In contiguous arrays, memory indexing is instantaneous (O(1)) via address arithmetic, but insertions and deletions require shifting O(n) elements. In linked lists, pointer updates enable true O(1) insertion/deletion at known nodes, but finding elements requires sequential O(n) pointer chasing across the heap.
          </p>
        </div>
      </div>

      {/* Complexity Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl">
        <table className="w-full text-left text-xs md:text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
            <tr>
              <th className="p-4">Operation</th>
              <th className="p-4 text-cyan-400 font-bold">Singly List</th>
              <th className="p-4 text-emerald-400 font-bold">Doubly List</th>
              <th className="p-4 text-purple-400 font-bold">Circular List</th>
              <th className="p-4 text-amber-400 font-bold">Array Equivalent</th>
              <th className="p-4">Algorithmic Rationale</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {topic.complexity.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-slate-100 font-mono text-xs">{row.operation}</td>
                <td className="p-4 font-mono font-bold text-cyan-300 text-xs">{row.singlyList}</td>
                <td className="p-4 font-mono font-bold text-emerald-300 text-xs">{row.doublyList}</td>
                <td className="p-4 font-mono font-bold text-purple-300 text-xs">{row.circularList}</td>
                <td className="p-4 font-mono font-bold text-amber-300 text-xs">{row.arrayComparison}</td>
                <td className="p-4 text-slate-400 text-xs leading-relaxed">{row.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Core Architectural Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3>Cache Locality & Memory Bounding</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Arrays benefit from continuous spatial locality, allowing CPU hardware prefetchers to load entire 64-byte cache lines. Linked lists allocate nodes discontinuously across heap pages, triggering frequent L1/L2/L3 cache misses. For small data payloads (e.g. 4-byte integers), pointer metadata can introduce up to 400% memory overhead.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <h3>Heap Allocator Amortization</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            While malloc() and free() are modeled as O(1) amortized, they execute hundreds of CPU instructions searching segregated free-lists and coalescing memory chunks. Array growth via geometric doubling (factor 1.5x or 2.0x) ensures O(1) amortized push operations with zero per-node heap allocator overhead.
          </p>
        </div>
      </div>
    </div>
  );
};
