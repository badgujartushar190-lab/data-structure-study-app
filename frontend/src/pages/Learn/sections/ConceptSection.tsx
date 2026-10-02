import React from 'react';
import { BookOpen, Layers, CheckCircle, AlertCircle } from 'lucide-react';

export const ConceptSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Core Data Structure Definition</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Stack Abstract Data Type (ADT)</h2>
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          A <strong className="text-blue-700 font-semibold">Stack</strong> is a linear data structure that follows the strict <strong className="text-blue-700 font-semibold">LIFO (Last-In, First-Out)</strong> principle.
          In a stack, all insertions and deletions take place exclusively at one designated end called the <span className="font-semibold text-slate-900 underline decoration-blue-500 underline-offset-4">TOP</span>.
        </p>
      </div>

      {/* Key Invariants & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Structural Invariants</span>
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>TOP Pointer:</strong> Tracks the index of the most recently added item. Initialized to -1 when stack is empty.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Single Access Point:</strong> Elements below TOP cannot be accessed directly without popping items above.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Boundary Conditions</span>
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm text-slate-700">
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
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>Fundamental Stack Operations</span>
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs md:text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="p-3.5">Operation</th>
                <th className="p-3.5">Signature</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-blue-700">push(item)</td>
                <td className="p-3.5 font-mono text-xs text-slate-600">void push(int x)</td>
                <td className="p-3.5">Inserts element x onto top of stack and increments TOP.</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">O(1)</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-blue-700">pop()</td>
                <td className="p-3.5 font-mono text-xs text-slate-600">int pop()</td>
                <td className="p-3.5">Removes top element, decrements TOP, and returns removed value.</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">O(1)</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-blue-700">peek() / top()</td>
                <td className="p-3.5 font-mono text-xs text-slate-600">int peek()</td>
                <td className="p-3.5">Inspects value at TOP without mutating or removing it.</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">O(1)</td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3.5 font-bold text-blue-700">isEmpty()</td>
                <td className="p-3.5 font-mono text-xs text-slate-600">bool isEmpty()</td>
                <td className="p-3.5">Returns true if TOP equals -1, else false.</td>
                <td className="p-3.5 font-mono text-emerald-700 font-bold">O(1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
