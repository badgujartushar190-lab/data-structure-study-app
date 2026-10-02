import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, RotateCcw, Shuffle, BarChart2 } from 'lucide-react';
import { generateBubbleSortSteps, generateInsertionSortSteps, SortStep } from '../../algorithms/sorting';

export const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([45, 12, 89, 34, 67, 23, 90, 15, 78, 56]);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'insertion'>('bubble');
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(300); // ms per step

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate steps whenever array or algorithm changes
  useEffect(() => {
    const generated =
      algorithm === 'bubble'
        ? generateBubbleSortSteps(array)
        : generateInsertionSortSteps(array);
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [array, algorithm]);

  // Handle Playback interval
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const handleGenerateNewArray = () => {
    setIsPlaying(false);
    const newArr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 15);
    setArray(newArr);
  };

  const handleStepNext = () => {
    setIsPlaying(false);
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const currentStep: SortStep = steps[currentStepIdx] || {
    array,
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    description: 'Initializing visualizer...'
  };

  const maxVal = Math.max(...currentStep.array, 100);

  return (
    <div className="space-y-6">
      {/* Visualizer Header & Controls Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">Array Sorting Visualizer</h2>
            <p className="text-xs text-slate-500">Step-by-step algorithm animation with speed control</p>
          </div>
        </div>

        {/* Algorithm Selection Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setAlgorithm('bubble')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              algorithm === 'bubble'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => setAlgorithm('insertion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              algorithm === 'insertion'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Insertion Sort
          </button>
        </div>
      </div>

      {/* Playback Control Panel */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <button
              onClick={() => setIsPlaying(false)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={() => setIsPlaying(true)}
              disabled={currentStepIdx >= steps.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm disabled:opacity-50 transition-colors"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Play</span>
            </button>
          )}

          <button
            onClick={handleStepNext}
            disabled={currentStepIdx >= steps.length - 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-50 transition-colors shadow-sm"
          >
            <SkipForward className="w-4 h-4" />
            <span>Step</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleGenerateNewArray}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
          >
            <Shuffle className="w-4 h-4" />
            <span>New Array</span>
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-600">
          <span className="font-sans font-medium text-slate-500">Speed:</span>
          <input
            type="range"
            min="50"
            max="800"
            step="50"
            value={850 - speed}
            onChange={(e) => setSpeed(850 - parseInt(e.target.value, 10))}
            className="w-32 accent-blue-600 cursor-pointer"
          />
          <span className="text-blue-700 font-bold w-12 text-right">{speed}ms</span>
        </div>
      </div>

      {/* Main Bar Chart Canvas */}
      <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-end min-h-[320px] shadow-sm space-y-6">
        <div className="flex items-end justify-center gap-3 h-52">
          {currentStep.array.map((val, idx) => {
            const heightPercent = Math.max((val / maxVal) * 100, 15);
            const isComparing = currentStep.comparingIndices.includes(idx);
            const isSwapping = currentStep.swappingIndices.includes(idx);
            const isSorted = currentStep.sortedIndices.includes(idx);

            let barColor = 'bg-white border-2 border-blue-200 text-slate-700';
            if (isSwapping) barColor = 'bg-rose-500 border-2 border-rose-600 text-white font-extrabold shadow-sm';
            else if (isComparing) barColor = 'bg-amber-400 border-2 border-amber-500 text-amber-950 font-extrabold shadow-sm';
            else if (isSorted) barColor = 'bg-emerald-500 border-2 border-emerald-600 text-white font-bold shadow-sm';

            return (
              <div key={idx} className="flex-1 max-w-[48px] flex flex-col items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-700">{val}</span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-md transition-all duration-200 flex items-center justify-center ${barColor}`}
                />
                <span className="text-[10px] font-mono text-slate-400">[{idx}]</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-400" />
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-500" />
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span>Sorted</span>
          </div>
        </div>
      </div>

      {/* Step Description Card */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-900 font-medium">
        <span className="font-bold text-blue-700 mr-2">Step {currentStepIdx + 1}/{steps.length}:</span>
        {currentStep.description}
      </div>
    </div>
  );
};
