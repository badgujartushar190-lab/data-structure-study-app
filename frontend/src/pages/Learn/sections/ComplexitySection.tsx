import React from 'react';
import { Clock, HardDrive, Zap } from 'lucide-react';

export const ComplexitySection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-400" />
        <h2 className="font-bold text-slate-100 text-base">Asymptotic Complexity Matrix</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time Complexity Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-slate-100 text-base">Time Complexity</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs">
              O(1) Constant Operations
            </span>
          </div>

          <div className="space-y-3 text-xs md:text-sm text-slate-300">
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span>push(x)</span>
              <span className="font-mono text-emerald-400 font-bold">O(1)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span>pop()</span>
              <span className="font-mono text-emerald-400 font-bold">O(1)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span>peek()</span>
              <span className="font-mono text-emerald-400 font-bold">O(1)</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span>search(x)</span>
              <span className="font-mono text-amber-400 font-bold">O(n)</span>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Push, Pop, and Peek operate directly on the TOP index reference without requiring array traversals.
          </p>
        </div>

        {/* Space Complexity Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-slate-100 text-base">Space Complexity</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-mono font-bold text-xs">
              O(n) Linear Storage
            </span>
          </div>

          <div className="space-y-3 text-xs md:text-sm text-slate-300">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">Auxiliary Memory:</span>
                <span className="text-blue-400 font-bold">O(n)</span>
              </div>
              <p className="text-xs text-slate-400">
                Directly proportional to the maximum number of elements (N) stored in the array buffer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
