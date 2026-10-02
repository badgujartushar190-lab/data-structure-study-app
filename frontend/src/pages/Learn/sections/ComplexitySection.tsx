import React from 'react';
import { Clock, HardDrive, Zap } from 'lucide-react';

export const ComplexitySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-500" />
        <h2 className="font-bold text-slate-900 text-base">Asymptotic Complexity Matrix</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Complexity Card */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-base">Time Complexity</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono font-bold text-xs">
              O(1) Constant Operations
            </span>
          </div>

          <div className="space-y-2 text-xs md:text-sm text-slate-700">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-800">push(x)</span>
              <span className="font-mono text-emerald-700 font-bold">O(1)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-800">pop()</span>
              <span className="font-mono text-emerald-700 font-bold">O(1)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-800">peek()</span>
              <span className="font-mono text-emerald-700 font-bold">O(1)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-medium text-slate-800">search(x)</span>
              <span className="font-mono text-amber-700 font-bold">O(n)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Push, Pop, and Peek operate directly on the TOP index reference without requiring array traversals.
          </p>
        </div>

        {/* Space Complexity Card */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 text-base">Space Complexity</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold text-xs">
              O(n) Linear Storage
            </span>
          </div>

          <div className="space-y-3 text-xs md:text-sm text-slate-700">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-600 font-medium">Auxiliary Memory:</span>
                <span className="text-blue-700 font-bold">O(n)</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Directly proportional to the maximum number of elements (N) stored in the array buffer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
