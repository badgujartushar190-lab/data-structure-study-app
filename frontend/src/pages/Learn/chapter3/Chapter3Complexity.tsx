import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';
import { TopicData } from './chapter3Data';

interface Props {
  topic: TopicData;
}

export const Chapter3Complexity: React.FC<Props> = ({ topic }) => {
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

      {/* Mathematical Proof & Explanatory Cards */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
        <span className="text-cyan-400 font-bold block uppercase tracking-wider text-[11px]">
          Why This Complexity Occurs:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {topic.id === 'top-301' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Sequential Visits</span>
                <span className="text-slate-400 text-[11px]">Each candidate is inspected at most once in linear stride.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Average Case Math</span>
                <span className="text-slate-400 text-[11px]">(1 + 2 + ... + n)/n = (n + 1)/2 comparisons = Θ(n).</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. O(1) Space</span>
                <span className="text-slate-400 text-[11px]">Only one integer index variable i is allocated on stack.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Cache Lines</span>
                <span className="text-slate-400 text-[11px]">Contiguous array memory layout enables high CPU L1 hit rates.</span>
              </div>
            </>
          ) : topic.id === 'top-302' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Recurrence Relation</span>
                <span className="text-slate-400 text-[11px]">T(n) = T(n/2) + O(1). Solves to Θ(log2 n) by Master Theorem.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Halving Equation</span>
                <span className="text-slate-400 text-[11px]">n / 2^k = 1 ⟹ 2^k = n ⟹ k = log2(n) max iterations.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. Best Case Ω(1)</span>
                <span className="text-slate-400 text-[11px]">Target equals initial midpoint arr[mid] on pass 1.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Iterative vs Stack</span>
                <span className="text-slate-400 text-[11px]">Iterative is O(1) space; recursive takes O(log n) stack frames.</span>
              </div>
            </>
          ) : topic.id === 'top-303' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Sum of Comparisons</span>
                <span className="text-slate-400 text-[11px]">(n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n^2).</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Swapped Flag</span>
                <span className="text-slate-400 text-[11px]">0 swaps in pass 1 triggers early break, achieving Ω(n) best case.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. Inversions</span>
                <span className="text-slate-400 text-[11px]">Each adjacent swap eliminates exactly one permutation inversion.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Stability Guaranteed</span>
                <span className="text-slate-400 text-[11px]">Equal keys (arr[j] == arr[j+1]) never swap, preserving order.</span>
              </div>
            </>
          ) : topic.id === 'top-304' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Inversion Bound</span>
                <span className="text-slate-400 text-[11px]">Runtime is O(n + I) where I is the number of inversions.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Best Case Ω(n)</span>
                <span className="text-slate-400 text-[11px]">When sorted, I = 0, running in n - 1 comparisons.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. Write Efficiency</span>
                <span className="text-slate-400 text-[11px]">Performs 1 shift write per element rather than 3 writes per swap.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Online Processing</span>
                <span className="text-slate-400 text-[11px]">Takes O(n) to place an incoming element into sorted prefix.</span>
              </div>
            </>
          ) : topic.id === 'top-305' ? (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Exact Comparisons</span>
                <span className="text-slate-400 text-[11px]">Always n(n-1)/2 comparisons across best, average, and worst cases.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Bounded Swaps</span>
                <span className="text-slate-400 text-[11px]">Guarantees at most n - 1 swaps total (O(n) memory writes).</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. Unstable Swaps</span>
                <span className="text-slate-400 text-[11px]">Long-range jumps can leap over duplicate keys, altering order.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. Flash Memory</span>
                <span className="text-slate-400 text-[11px]">Ideal for write-wear-sensitive devices (EEPROM / Flash).</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">1. Non-Comparative</span>
                <span className="text-slate-400 text-[11px]">Bypasses Ω(n log n) comparison barrier using digit indexing.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">2. Parameter d and b</span>
                <span className="text-slate-400 text-[11px]">Complexity is Θ(d * (n + b)). d = digit count, b = radix base.</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">3. When it is NOT O(n)</span>
                <span className="text-slate-400 text-[11px]">If keys have d ≈ log(n) digits, runtime is O(n log n).</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-200 font-bold block">4. O(n + b) Space</span>
                <span className="text-slate-400 text-[11px]">Requires output buffer of size n and bucket array of size b.</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
