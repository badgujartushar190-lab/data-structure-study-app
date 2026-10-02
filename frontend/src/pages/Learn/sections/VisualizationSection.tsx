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
    <div className="space-y-6">
      {/* Visual Header & Status Banner */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-slate-900 text-sm md:text-base">Real-Time Stack Frame Visualizer</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-500">Capacity: <strong className="text-slate-800">{stack.length} / {capacity}</strong></span>
          <span className="text-slate-500">TOP Index: <strong className="text-blue-700 font-bold">{topIndex}</strong></span>
        </div>
      </div>

      {/* Live System Feedback Banner */}
      <div className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
        messageType === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' :
        messageType === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
        'bg-blue-50 border-blue-200 text-blue-900'
      }`}>
        <span>{message}</span>
        <span className="uppercase text-[10px] px-2 py-0.5 rounded font-bold border border-current">
          {messageType}
        </span>
      </div>

      {/* Visual Tower Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-xl bg-slate-50 border border-slate-200 shadow-sm items-end">
        {/* Left Info Panel */}
        <div className="space-y-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-slate-900 font-bold block text-sm">Stack Diagram Rules</span>
            <p>• Items enter and exit exclusively from the top slot.</p>
            <p>• Memory slots [0..7] allocated contiguously.</p>
            <p>• Pointer <span className="text-blue-700 font-bold">TOP</span> tracks index of current peak.</p>
          </div>
        </div>

        {/* Center Animated Stack Column */}
        <div className="flex flex-col items-center justify-center gap-2 w-full max-w-[280px] mx-auto">
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
                      className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600 text-white font-bold shadow-sm"
                    >
                      <span>TOP</span>
                      <ArrowLeft className="w-3 h-3" />
                    </motion.div>
                  ) : (
                    <span className="text-slate-400">[{slotIdx}]</span>
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
                      className={`flex-1 h-12 rounded-xl flex items-center justify-between px-4 font-mono font-bold text-sm border shadow-sm ${
                        isTop
                          ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="text-xs text-slate-400 font-normal">val:</span>
                      <span className="text-base text-slate-900">{val}</span>
                    </motion.div>
                  ) : (
                    <div className="flex-1 h-12 rounded-xl border border-dashed border-slate-300 bg-white/60 flex items-center justify-center text-[10px] font-mono text-slate-400">
                      EMPTY SLOT [{slotIdx}]
                    </div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          <div className="w-full text-center text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-200 mt-2 font-medium">
            STACK BASE (INDEX 0)
          </div>
        </div>

        {/* Right Pointer Monitor */}
        <div className="space-y-3 font-mono text-xs text-slate-700">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-blue-700 font-bold block">Live Pointer Diagnostics</span>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span>stack_top_index:</span>
              <span className="text-blue-700 font-bold">{topIndex}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1">
              <span>stack_size:</span>
              <span className="text-emerald-700 font-bold">{stack.length}</span>
            </div>
            <div className="flex justify-between">
              <span>is_full:</span>
              <span className={stack.length === capacity ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                {stack.length === capacity ? 'TRUE' : 'FALSE'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
