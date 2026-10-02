import React from 'react';
import { BookOpen, Layers, CheckCircle, AlertCircle } from 'lucide-react';

export const ConceptSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Core Data Structure Definition</span>
        </div>
        <h2 className="text-2xl font-bold text-white">Stack Abstract Data Type (ADT)</h2>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          A <strong className="text-cyan-400 font-semibold">Stack</strong> is a linear data structure that follows the strict <strong className="text-cyan-400 font-semibold">LIFO (Last-In, First-Out)</strong> principle.
          In a stack, all insertions and deletions take place exclusively at one designated end called the <span className="underline decoration-cyan-500 underline-offset-4">TOP</span>.
        </p>
      </div>

      {/* Key Invariants & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>Structural Invariants</span>
          </div>
          <ul className="space-y-2 text-xs md:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>TOP Pointer:</strong> Tracks the index of the most recently added item. Initialized to -1 when stack is empty.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Single Access Point:</strong> Elements below TOP cannot be accessed directly without popping items above.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Boundary Conditions</span>
          </div>
          <ul className="space-y-2 text-xs md:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />
              <span><strong>Stack Overflow:</strong> Attempting to push an element when TOP equals MAX_SIZE - 1.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />
              <span><strong>Stack Underflow:</strong> Attempting to pop or peek an element when TOP equals -1 (stack empty).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Fundamental Operations Table */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span>Fundamental Stack Operations</span>
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
          <table className="w-full text-left text-xs md:text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Operation</th>
                <th className="p-3.5">Signature</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="p-3.5 font-bold text-cyan-400">push(item)</td>
                <td className="p-3.5 font-mono text-xs text-slate-400">void push(int x)</td>
                <td className="p-3.5">Inserts element x onto top of stack and increments TOP.</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">O(1)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-cyan-400">pop()</td>
                <td className="p-3.5 font-mono text-xs text-slate-400">int pop()</td>
                <td className="p-3.5">Removes top element, decrements TOP, and returns removed value.</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">O(1)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-cyan-400">peek() / top()</td>
                <td className="p-3.5 font-mono text-xs text-slate-400">int peek()</td>
                <td className="p-3.5">Inspects value at TOP without mutating or removing it.</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">O(1)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-cyan-400">isEmpty()</td>
                <td className="p-3.5 font-mono text-xs text-slate-400">bool isEmpty()</td>
                <td className="p-3.5">Returns true if TOP equals -1, else false.</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
