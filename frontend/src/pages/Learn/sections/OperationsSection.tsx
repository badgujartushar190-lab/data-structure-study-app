import React, { useState } from 'react';
import { Cpu, Plus, Minus, Eye, RotateCcw, AlertTriangle } from 'lucide-react';
import { useProgressStore } from '../../../store/progressStore';

export const OperationsSection: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { visualizerState, pushStack, popStack, peekStack, resetStack } = useProgressStore();
  const { stack, capacity, message } = visualizerState;

  const handlePush = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(inputValue, 10);
    if (!isNaN(val)) {
      pushStack(val);
      setInputValue('');
    }
  };

  const isFull = stack.length >= capacity;
  const isEmpty = stack.length === 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 text-base">Stack Control Console & Boundary Simulator</h2>
        </div>
        <button
          onClick={resetStack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Stack</span>
        </button>
      </div>

      {/* Overflow / Underflow Warning Cards */}
      {isFull && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 flex items-center gap-3 text-rose-300 text-xs font-mono shadow-lg">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div>
            <strong className="block text-rose-200">BOUNDARY STATE: Stack Overflow</strong>
            <span>Maximum memory capacity of {capacity} items has been reached. Additional push operations will fail.</span>
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center gap-3 text-amber-300 text-xs font-mono shadow-lg">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong className="block text-amber-200">BOUNDARY STATE: Stack Underflow</strong>
            <span>Stack is completely empty (TOP = -1). Pop and Peek operations will fail.</span>
          </div>
        </div>
      )}

      {/* Interactive Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
        {/* Push Form */}
        <form onSubmit={handlePush} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <label className="text-xs font-bold text-slate-200 block">1. Push Operation</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter integer..."
              className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={isFull || !inputValue.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>PUSH</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">Appends value to index [{stack.length}] and increments TOP pointer.</p>
        </form>

        {/* Pop & Peek Actions */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-200 block">2. Pop & Peek Operations</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={popStack}
              disabled={isEmpty}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs hover:bg-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
              <span>POP</span>
            </button>

            <button
              onClick={peekStack}
              disabled={isEmpty}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 font-bold text-xs hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>PEEK</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">POP removes top element; PEEK inspects without mutating stack.</p>
        </div>
      </div>

      {/* Operation Log */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
        <span className="text-slate-400 text-[10px] uppercase tracking-wider block">Execution Log</span>
        <div className="p-3 rounded bg-slate-900 border border-slate-800 text-cyan-400">
          {message}
        </div>
      </div>
    </div>
  );
};
