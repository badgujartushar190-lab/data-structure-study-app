import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { TopicData } from './chapter4Data';

interface Props {
  topic: TopicData;
}

export const Chapter4Complexity: React.FC<Props> = ({ topic }) => {
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
            Academic Principle: Mathematical Complexity Foundation
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
              <th className="p-4">Conditions & Mathematical Rationale</th>
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

      {/* Key Architectural Trade-offs & Explanatory Cards */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
        <span className="text-cyan-400 font-bold block uppercase tracking-wider text-[11px]">
          Why This Complexity Occurs:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {topic.id === 'top-401' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. TOP Invariant</span>
                <span className="text-slate-400 text-[11px]">Zero element shifting. All operations touch only arr[top].</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Constant Time O(1)</span>
                <span className="text-slate-400 text-[11px]">Push, Pop, and Peek perform basic pointer/index increments.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. Array Cache Locality</span>
                <span className="text-slate-400 text-[11px]">Contiguous array memory maximizes CPU L1/L2 cache hit rate.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Linked List Trade-off</span>
                <span className="text-slate-400 text-[11px]">Never overflows, but incurs heap malloc/free latency per node.</span>
              </div>
            </>
          ) : topic.id === 'top-402' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Linear Token Scan</span>
                <span className="text-slate-400 text-[11px]">Each symbol is processed and pushed/popped at most twice = O(n).</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Parenthesis-Free</span>
                <span className="text-slate-400 text-[11px]">Postfix eliminates operator precedence parsing overhead.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. Hanoi 2^n - 1 Recurrence</span>
                <span className="text-slate-400 text-[11px]">T(n) = 2T(n-1) + 1. Solves to exactly 2^n - 1 moves by induction.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Call Stack Depth</span>
                <span className="text-slate-400 text-[11px]">Recursion tree height n determines maximum stack frame memory.</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Two Dedicated Ends</span>
                <span className="text-slate-400 text-[11px]">FRONT and REAR pointers enable O(1) enqueue and dequeue.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Modulo Arithmetic</span>
                <span className="text-slate-400 text-[11px]">(rear + 1) % MAX wraps in constant time, recycling vacant memory.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. Zero False Overflow</span>
                <span className="text-slate-400 text-[11px]">Circular queues achieve 100% memory utilization in bounded RAM.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Decoupled Buffer</span>
                <span className="text-slate-400 text-[11px]">Buffers asynchronous rates between producers and consumers.</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
