import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Plus, Minus, RotateCcw, ArrowLeft, AlertTriangle } from 'lucide-react';

export const StackVisualizer: React.FC = () => {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState<string>('');
  const [message, setMessage] = useState<string>('Stack initialized with 3 elements.');
  const [errorState, setErrorState] = useState<'overflow' | 'underflow' | null>(null);

  const capacity = 8;
  const topIndex = stack.length - 1;

  const handlePush = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(inputValue, 10);
    if (isNaN(val)) return;

    if (stack.length >= capacity) {
      setErrorState('overflow');
      setMessage('CRITICAL ERROR: Stack Overflow! Max capacity (8 items) reached.');
      return;
    }

    setStack((prev) => [...prev, val]);
    setInputValue('');
    setErrorState(null);
    setMessage(`PUSH Successful: Value ${val} pushed to TOP index [${stack.length}].`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setErrorState('underflow');
      setMessage('CRITICAL ERROR: Stack Underflow! Cannot pop from an empty stack.');
      return;
    }

    const popped = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setErrorState(null);
    setMessage(`POP Successful: Removed top item ${popped}.`);
  };

  const handleReset = () => {
    setStack([10, 20, 30]);
    setErrorState(null);
    setMessage('Stack reset to initial state.');
  };

  const maxSlots = Array.from({ length: capacity }, (_, i) => capacity - 1 - i);

  return (
    <div className="space-y-6">
      {/* Title & Control Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="font-bold text-slate-900 text-base">Stack Visualizer (LIFO)</h2>
            <p className="text-xs text-slate-500">Last-In, First-Out Push/Pop Operations</p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
          <span>Reset Stack</span>
        </button>
      </div>

      {/* Error Banners */}
      {errorState === 'overflow' && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs font-mono">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <span><strong>Stack Overflow:</strong> Maximum capacity ({capacity} items) reached!</span>
        </div>
      )}

      {errorState === 'underflow' && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-amber-800 text-xs font-mono">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <span><strong>Stack Underflow:</strong> Stack is empty (TOP = -1)!</span>
        </div>
      )}

      {/* Main Canvas & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="space-y-4">
          <form onSubmit={handlePush} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <label className="text-xs font-bold text-slate-800 block">Push Element</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                className="flex-1 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white font-mono transition-colors"
              />
              <button
                type="submit"
                disabled={stack.length >= capacity || !inputValue.trim()}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>PUSH</span>
              </button>
            </div>
          </form>

          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
            <label className="text-xs font-bold text-slate-800 block">Pop Element</label>
            <button
              onClick={handlePop}
              disabled={stack.length === 0}
              className="w-full py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold text-xs disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Minus className="w-4 h-4" />
              <span>POP FROM TOP</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1.5">
            <span className="text-slate-500 block text-[10px] uppercase font-bold tracking-wider">Diagnostics</span>
            <div className="text-blue-700 font-semibold">TOP Index: {topIndex}</div>
            <div className="text-slate-700">Stack Size: {stack.length} / {capacity}</div>
          </div>
        </div>

        {/* Visual Stack Tower */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center gap-2 shadow-sm min-h-[380px]">
          {maxSlots.map((slotIdx) => {
            const hasValue = slotIdx < stack.length;
            const val = hasValue ? stack[slotIdx] : null;
            const isTop = slotIdx === topIndex && hasValue;

            return (
              <div key={slotIdx} className="w-full max-w-sm flex items-center gap-3">
                <div className="w-16 text-right font-mono text-[11px]">
                  {isTop ? (
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold shadow-sm flex items-center justify-end gap-1 text-[10px]">
                      TOP <ArrowLeft className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-slate-400">[{slotIdx}]</span>
                  )}
                </div>

                <AnimatePresence mode="popLayout">
                  {hasValue ? (
                    <motion.div
                      key={`slot-${slotIdx}-${val}`}
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className={`flex-1 h-11 rounded-lg flex items-center justify-between px-4 font-mono font-bold text-sm border shadow-sm transition-all ${
                        isTop
                          ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-xs text-slate-400 font-normal">val:</span>
                      <span className="text-slate-900">{val}</span>
                    </motion.div>
                  ) : (
                    <div className="flex-1 h-11 rounded-lg border border-dashed border-slate-300 bg-white/60 flex items-center justify-center text-[10px] font-mono text-slate-400">
                      EMPTY SLOT [{slotIdx}]
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Log Footer */}
      <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs font-mono text-blue-900 font-medium">
        {message}
      </div>
    </div>
  );
};
