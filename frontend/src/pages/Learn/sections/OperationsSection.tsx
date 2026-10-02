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
    <div className="space-y-6">
      {/* Title */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="font-bold text-slate-900 text-base">Stack Control Console & Boundary Simulator</h2>
            <p className="text-xs text-slate-500">Simulate runtime mutations and inspect boundary errors</p>
          </div>
        </div>
        <button
          onClick={resetStack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
          <span>Reset Stack</span>
        </button>
      </div>

      {/* Overflow / Underflow Warning Cards */}
      {isFull && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs font-mono shadow-sm">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <strong className="block text-rose-900 font-bold">BOUNDARY STATE: Stack Overflow</strong>
            <span>Maximum memory capacity of {capacity} items has been reached. Additional push operations will fail.</span>
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-amber-800 text-xs font-mono shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong className="block text-amber-900 font-bold">BOUNDARY STATE: Stack Underflow</strong>
            <span>Stack is completely empty (TOP = -1). Pop and Peek operations will fail.</span>
          </div>
        </div>
      )}

      {/* Interactive Controls Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
        {/* Push Form */}
        <form onSubmit={handlePush} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <label className="text-xs font-bold text-slate-800 block">1. Push Operation</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter integer..."
              className="flex-1 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isFull || !inputValue.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>PUSH</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-sans">Appends value to index [{stack.length}] and increments TOP pointer.</p>
        </form>

        {/* Pop & Peek Actions */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
          <label className="text-xs font-bold text-slate-800 block">2. Pop & Peek Operations</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={popStack}
              disabled={isEmpty}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4" />
              <span>POP</span>
            </button>

            <button
              onClick={peekStack}
              disabled={isEmpty}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>PEEK</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 font-sans">POP removes top element; PEEK inspects without mutating stack.</p>
        </div>
      </div>

      {/* Operation Log */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 font-mono text-xs space-y-2 shadow-sm">
        <span className="text-slate-500 text-[10px] font-sans font-semibold uppercase tracking-wider block">Execution Log</span>
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-medium">
          {message}
        </div>
      </div>
    </div>
  );
};
