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
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-white text-base">Stack Visualizer (LIFO)</h2>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Stack</span>
        </button>
      </div>

      {/* Error Banners */}
      {errorState === 'overflow' && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/40 flex items-center gap-3 text-rose-300 text-xs font-mono">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span><strong>Stack Overflow:</strong> Maximum capacity ({capacity} items) reached!</span>
        </div>
      )}

      {errorState === 'underflow' && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center gap-3 text-amber-300 text-xs font-mono">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          <span><strong>Stack Underflow:</strong> Stack is empty (TOP = -1)!</span>
        </div>
      )}

      {/* Main Canvas & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="space-y-4">
          <form onSubmit={handlePush} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-200 block">Push Element</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="submit"
                disabled={stack.length >= capacity || !inputValue.trim()}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 disabled:opacity-50 transition-colors flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>PUSH</span>
              </button>
            </div>
          </form>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-200 block">Pop Element</label>
            <button
              onClick={handlePop}
              disabled={stack.length === 0}
              className="w-full py-2.5 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold text-xs hover:bg-rose-500/30 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Minus className="w-4 h-4" />
              <span>POP FROM TOP</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1">
            <span className="text-slate-500 block text-[10px] uppercase">Diagnostics</span>
            <div className="text-cyan-400 font-bold">TOP Index: {topIndex}</div>
            <div className="text-slate-300">Stack Size: {stack.length} / {capacity}</div>
          </div>
        </div>

        {/* Visual Stack Tower */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center gap-1.5 shadow-2xl min-h-[380px]">
          {maxSlots.map((slotIdx) => {
            const hasValue = slotIdx < stack.length;
            const val = hasValue ? stack[slotIdx] : null;
            const isTop = slotIdx === topIndex && hasValue;

            return (
              <div key={slotIdx} className="w-full max-w-sm flex items-center gap-3">
                <div className="w-16 text-right font-mono text-[10px]">
                  {isTop ? (
                    <span className="px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow flex items-center justify-end gap-1">
                      TOP <ArrowLeft className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-slate-600">[{slotIdx}]</span>
                  )}
                </div>

                <AnimatePresence mode="popLayout">
                  {hasValue ? (
                    <motion.div
                      key={`slot-${slotIdx}-${val}`}
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      className={`flex-1 h-11 rounded-xl flex items-center justify-between px-4 font-mono font-bold text-sm border shadow-lg ${
                        isTop
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-cyan-glow'
                          : 'bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="text-xs text-slate-500">val:</span>
                      <span className="text-white">{val}</span>
                    </motion.div>
                  ) : (
                    <div className="flex-1 h-11 rounded-xl border border-dashed border-slate-800/80 bg-slate-950/40 flex items-center justify-center text-[10px] font-mono text-slate-700">
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
      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
        {message}
      </div>
    </div>
  );
};
