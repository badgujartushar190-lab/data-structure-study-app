import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ArrowLeft } from 'lucide-react';
import { useProgressStore } from '../../../store/progressStore';

export const VisualizationSection: React.FC = () => {
  const { visualizerState } = useProgressStore();
  const { stack, capacity, topIndex, message, messageType } = visualizerState;

  // Build 8 memory slots (0 to 7) from bottom to top
  const maxSlots = Array.from({ length: capacity }, (_, i) => capacity - 1 - i);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Visual Header & Status Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-slate-100 text-sm md:text-base">Real-Time Stack Frame Visualizer</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-400">Capacity: <strong className="text-slate-200">{stack.length} / {capacity}</strong></span>
          <span className="text-slate-400">TOP Index: <strong className="text-cyan-400">{topIndex}</strong></span>
        </div>
      </div>

      {/* Live System Feedback Banner */}
      <div className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
        messageType === 'error' ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' :
        messageType === 'success' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' :
        'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
      }`}>
        <span>{message}</span>
        <span className="uppercase text-[10px] px-2 py-0.5 rounded font-bold border border-current">
          {messageType}
        </span>
      </div>

      {/* Visual Tower Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl items-end">
        {/* Left Info Panel */}
        <div className="space-y-4 text-xs text-slate-400 font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-200 font-bold block text-sm">Stack Diagram Rules</span>
            <p>• Items enter and exit exclusively from the top slot.</p>
            <p>• Memory slots [0..7] allocated contiguously.</p>
            <p>• Pointer <span className="text-cyan-400 font-bold">TOP</span> tracks index of current peak.</p>
          </div>
        </div>

        {/* Center Animated Stack Column */}
        <div className="flex flex-col items-center justify-center gap-1.5 w-full max-w-[280px] mx-auto">
          {maxSlots.map((slotIdx) => {
            const hasValue = slotIdx < stack.length;
            const val = hasValue ? stack[slotIdx] : null;
            const isTop = slotIdx === topIndex && hasValue;

            return (
              <div key={slotIdx} className="w-full flex items-center gap-3">
                {/* Pointer indicator */}
                <div className="w-16 flex items-center justify-end font-mono text-[10px]">
                  {isTop ? (
                    <motion.div
                      layoutId="topPointer"
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow"
                    >
                      <span>TOP</span>
                      <ArrowLeft className="w-3 h-3" />
                    </motion.div>
                  ) : (
                    <span className="text-slate-600">[{slotIdx}]</span>
                  )}
                </div>

                {/* Stack Cell Box */}
                <AnimatePresence mode="popLayout">
                  {hasValue ? (
                    <motion.div
                      key={`slot-${slotIdx}-${val}`}
                      initial={{ scale: 0.8, y: -20, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ scale: 0.8, y: -20, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={`flex-1 h-12 rounded-xl flex items-center justify-between px-4 font-mono font-bold text-sm border shadow-lg ${
                        isTop
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-400 text-cyan-300 shadow-cyan-glow'
                          : 'bg-slate-900 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="text-xs text-slate-500">val:</span>
                      <span className="text-base text-white">{val}</span>
                    </motion.div>
                  ) : (
                    <div className="flex-1 h-12 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 flex items-center justify-center text-[10px] font-mono text-slate-700">
                      EMPTY SLOT [{slotIdx}]
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="w-full text-center text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800 mt-2">
            STACK BASE (INDEX 0)
          </div>
        </div>

        {/* Right Pointer Monitor */}
        <div className="space-y-3 font-mono text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold block">Live Pointer Diagnostics</span>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>stack_top_index:</span>
              <span className="text-cyan-400 font-bold">{topIndex}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1">
              <span>stack_size:</span>
              <span className="text-emerald-400 font-bold">{stack.length}</span>
            </div>
            <div className="flex justify-between">
              <span>is_full:</span>
              <span className={stack.length === capacity ? 'text-rose-400 font-bold' : 'text-slate-500'}>
                {stack.length === capacity ? 'TRUE' : 'FALSE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
