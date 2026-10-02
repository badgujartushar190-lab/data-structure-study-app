import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Eye,
  ArrowUp
} from 'lucide-react';
import { TopicData } from './chapter3Data';

interface Props {
  topic: TopicData;
}

export const Chapter3Visualizer: React.FC<Props> = ({ topic }) => {
  // Common visualizer speed controls
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000); // ms per step
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ==========================================
  // TOPIC 1: LINEAR SEARCH STATE
  // ==========================================
  const initialLinearArray = [10, 25, 7, 42, 18];
  const [linearTarget, setLinearTarget] = useState<number>(42);
  const [linearIndex, setLinearIndex] = useState<number>(-1);
  const [linearFound, setLinearFound] = useState<boolean | null>(null);
  const [linearStepDesc, setLinearStepDesc] = useState<string>(
    'Linear Search ready. Click Step Next or Play to begin sequential inspection.'
  );

  const resetLinear = () => {
    setIsPlaying(false);
    setLinearIndex(-1);
    setLinearFound(null);
    setLinearStepDesc('Reset. Ready to scan for target ' + linearTarget + '.');
  };

  const stepLinearForward = () => {
    if (linearFound !== null) return;
    const nextIdx = linearIndex + 1;
    if (nextIdx >= initialLinearArray.length) {
      setLinearIndex(initialLinearArray.length);
      setLinearFound(false);
      setLinearStepDesc(`End of array reached. Target ${linearTarget} was NOT found.`);
      setIsPlaying(false);
      return;
    }
    setLinearIndex(nextIdx);
    const val = initialLinearArray[nextIdx];
    if (val === linearTarget) {
      setLinearFound(true);
      setLinearStepDesc(`MATCH FOUND! arr[${nextIdx}] = ${val} matches target ${linearTarget}.`);
      setIsPlaying(false);
    } else {
      setLinearStepDesc(`arr[${nextIdx}] = ${val}. ${val} != ${linearTarget}. Moving to next index.`);
    }
  };

  const stepLinearBackward = () => {
    if (linearIndex <= 0) {
      resetLinear();
      return;
    }
    const prevIdx = linearIndex - 1;
    setLinearIndex(prevIdx);
    setLinearFound(null);
    setLinearStepDesc(`Stepped back to index [${prevIdx}]. Value is ${initialLinearArray[prevIdx]}.`);
  };

  // ==========================================
  // TOPIC 2: BINARY SEARCH STATE
  // ==========================================
  const initialBinaryArray = [10, 20, 30, 40, 50, 60, 70];
  const [binaryTarget, setBinaryTarget] = useState<number>(50);
  const [binLow, setBinLow] = useState<number>(0);
  const [binHigh, setBinHigh] = useState<number>(initialBinaryArray.length - 1);
  const [binMid, setBinMid] = useState<number | null>(null);
  const [binFound, setBinFound] = useState<boolean | null>(null);
  const [binStepDesc, setBinStepDesc] = useState<string>(
    'Binary Search ready. Initial search interval [0..6]. Target: ' + binaryTarget
  );

  const resetBinary = () => {
    setIsPlaying(false);
    setBinLow(0);
    setBinHigh(initialBinaryArray.length - 1);
    setBinMid(null);
    setBinFound(null);
    setBinStepDesc('Reset. Search interval restored to [0..' + (initialBinaryArray.length - 1) + '].');
  };

  const stepBinaryForward = () => {
    if (binFound !== null) return;
    if (binLow > binHigh) {
      setBinFound(false);
      setBinStepDesc(`Interval collapsed (low > high). Target ${binaryTarget} is absent.`);
      setIsPlaying(false);
      return;
    }

    if (binMid === null || binMid < binLow || binMid > binHigh) {
      // Calculate new mid
      const mid = binLow + Math.floor((binHigh - binLow) / 2);
      setBinMid(mid);
      const val = initialBinaryArray[mid];
      if (val === binaryTarget) {
        setBinFound(true);
        setBinStepDesc(`SUCCESS! Midpoint arr[${mid}] = ${val} matches target ${binaryTarget}.`);
        setIsPlaying(false);
      } else if (val < binaryTarget) {
        setBinStepDesc(`Midpoint arr[${mid}] = ${val} < ${binaryTarget}. Target is in right half.`);
      } else {
        setBinStepDesc(`Midpoint arr[${mid}] = ${val} > ${binaryTarget}. Target is in left half.`);
      }
    } else {
      // Advance low or high based on previous comparison
      const val = initialBinaryArray[binMid];
      if (val < binaryTarget) {
        const nextLow = binMid + 1;
        setBinLow(nextLow);
        setBinMid(null);
        if (nextLow > binHigh) {
          setBinFound(false);
          setBinStepDesc(`low (${nextLow}) > high (${binHigh}). Target not found.`);
          setIsPlaying(false);
        } else {
          setBinStepDesc(`Narrowed range: Discarded left half. New search window [${nextLow}..${binHigh}].`);
        }
      } else {
        const nextHigh = binMid - 1;
        setBinHigh(nextHigh);
        setBinMid(null);
        if (binLow > nextHigh) {
          setBinFound(false);
          setBinStepDesc(`low (${binLow}) > high (${nextHigh}). Target not found.`);
          setIsPlaying(false);
        } else {
          setBinStepDesc(`Narrowed range: Discarded right half. New search window [${binLow}..${nextHigh}].`);
        }
      }
    }
  };

  // ==========================================
  // TOPIC 3: BUBBLE SORT STATE
  // ==========================================
  const [bubbleArr, setBubbleArr] = useState<number[]>([10, 25, 7, 42, 18]);
  const [bubbleI, setBubbleI] = useState<number>(0);
  const [bubbleJ, setBubbleJ] = useState<number>(0);
  const [bubbleSwapped, setBubbleSwapped] = useState<boolean>(false);
  const [bubbleIsComplete, setBubbleIsComplete] = useState<boolean>(false);
  const [bubbleStepDesc, setBubbleStepDesc] = useState<string>(
    'Bubble Sort initialized. Pass 1 begins by comparing adjacent pairs from index 0.'
  );

  const resetBubble = () => {
    setIsPlaying(false);
    setBubbleArr([10, 25, 7, 42, 18]);
    setBubbleI(0);
    setBubbleJ(0);
    setBubbleSwapped(false);
    setBubbleIsComplete(false);
    setBubbleStepDesc('Bubble Sort reset to initial unsorted array.');
  };

  const stepBubbleForward = () => {
    if (bubbleIsComplete) return;
    const n = bubbleArr.length;
    const curArr = [...bubbleArr];

    // Check if swap needed for current pair (j, j+1)
    if (curArr[bubbleJ] > curArr[bubbleJ + 1]) {
      const temp = curArr[bubbleJ];
      curArr[bubbleJ] = curArr[bubbleJ + 1];
      curArr[bubbleJ + 1] = temp;
      setBubbleArr(curArr);
      setBubbleSwapped(true);
      setBubbleStepDesc(`SWAP: arr[${bubbleJ}] (${temp}) > arr[${bubbleJ + 1}] (${curArr[bubbleJ]}). Exchanged elements.`);
      return;
    }

    // Advance j
    const nextJ = bubbleJ + 1;
    if (nextJ < n - 1 - bubbleI) {
      setBubbleJ(nextJ);
      setBubbleStepDesc(`Comparing adjacent pair arr[${nextJ}] (${curArr[nextJ]}) and arr[${nextJ + 1}] (${curArr[nextJ + 1]}).`);
    } else {
      // End of pass i
      const nextI = bubbleI + 1;
      if (!bubbleSwapped || nextI >= n - 1) {
        setBubbleIsComplete(true);
        setIsPlaying(false);
        setBubbleStepDesc('Bubble Sort complete! Zero inversions remaining.');
      } else {
        setBubbleI(nextI);
        setBubbleJ(0);
        setBubbleSwapped(false);
        setBubbleStepDesc(`Pass ${bubbleI + 1} finished. Starting Pass ${nextI + 1}.`);
      }
    }
  };

  // ==========================================
  // TOPIC 4: INSERTION SORT STATE
  // ==========================================
  const [insArr, setInsArr] = useState<number[]>([10, 25, 7, 42, 18]);
  const [insI, setInsI] = useState<number>(1);
  const [insKey, setInsKey] = useState<number | null>(null);
  const [insJ, setInsJ] = useState<number>(0);
  const [insIsComplete, setInsIsComplete] = useState<boolean>(false);
  const [insStepDesc, setInsStepDesc] = useState<string>(
    'Insertion Sort ready. Index [0] (value 10) is trivially considered sorted.'
  );

  const resetInsertion = () => {
    setIsPlaying(false);
    setInsArr([10, 25, 7, 42, 18]);
    setInsI(1);
    setInsKey(null);
    setInsJ(0);
    setInsIsComplete(false);
    setInsStepDesc('Insertion Sort reset.');
  };

  const stepInsertionForward = () => {
    if (insIsComplete) return;
    const n = insArr.length;
    const curArr = [...insArr];

    if (insKey === null) {
      // Pick key
      const key = curArr[insI];
      setInsKey(key);
      setInsJ(insI - 1);
      setInsStepDesc(`Extracted Key = ${key} at index [${insI}]. Comparing backwards with sorted prefix.`);
      return;
    }

    // Key is active: check shifting
    if (insJ >= 0 && curArr[insJ] > insKey) {
      curArr[insJ + 1] = curArr[insJ];
      setInsArr(curArr);
      setInsStepDesc(`Shift: arr[${insJ}] (${curArr[insJ]}) > key (${insKey}). Shifted rightward to index [${insJ + 1}].`);
      setInsJ(insJ - 1);
    } else {
      // Place key at insJ + 1
      curArr[insJ + 1] = insKey;
      setInsArr(curArr);
      setInsStepDesc(`Inserted Key ${insKey} into correct slot [${insJ + 1}].`);
      const nextI = insI + 1;
      setInsKey(null);
      if (nextI >= n) {
        setInsIsComplete(true);
        setIsPlaying(false);
        setInsStepDesc('Insertion Sort Complete! Array fully sorted.');
      } else {
        setInsI(nextI);
      }
    }
  };

  // ==========================================
  // TOPIC 5: SELECTION SORT STATE
  // ==========================================
  const [selArr, setSelArr] = useState<number[]>([25, 10, 7, 42, 18]);
  const [selI, setSelI] = useState<number>(0);
  const [selJ, setSelJ] = useState<number>(1);
  const [selMinIdx, setSelMinIdx] = useState<number>(0);
  const [selIsComplete, setSelIsComplete] = useState<boolean>(false);
  const [selStepDesc, setSelStepDesc] = useState<string>(
    'Selection Sort ready. Pass 1 begins scanning for global minimum to place at index [0].'
  );

  const resetSelection = () => {
    setIsPlaying(false);
    setSelArr([25, 10, 7, 42, 18]);
    setSelI(0);
    setSelJ(1);
    setSelMinIdx(0);
    setSelIsComplete(false);
    setSelStepDesc('Selection Sort reset.');
  };

  const stepSelectionForward = () => {
    if (selIsComplete) return;
    const n = selArr.length;
    const curArr = [...selArr];

    if (selJ < n) {
      // Check if current j is smaller than min_idx
      if (curArr[selJ] < curArr[selMinIdx]) {
        setSelMinIdx(selJ);
        setSelStepDesc(`New Minimum found! arr[${selJ}] = ${curArr[selJ]} < arr[${selMinIdx}] (${curArr[selMinIdx]}).`);
      } else {
        setSelStepDesc(`arr[${selJ}] (${curArr[selJ]}) >= current minimum (${curArr[selMinIdx]}). Keeping min_idx = ${selMinIdx}.`);
      }
      setSelJ(selJ + 1);
    } else {
      // End of pass: perform at most 1 swap
      if (selMinIdx !== selI) {
        const temp = curArr[selI];
        curArr[selI] = curArr[selMinIdx];
        curArr[selMinIdx] = temp;
        setSelArr(curArr);
        setSelStepDesc(`Pass ${selI + 1} Swap: Placed minimum ${curArr[selI]} at index [${selI}]. Total write: 1 swap.`);
      } else {
        setSelStepDesc(`Element at index [${selI}] is already the minimum. Zero swaps executed.`);
      }

      const nextI = selI + 1;
      if (nextI >= n - 1) {
        setSelIsComplete(true);
        setIsPlaying(false);
        setSelStepDesc('Selection Sort Complete! Entire array is sorted with minimal memory writes.');
      } else {
        setSelI(nextI);
        setSelJ(nextI + 1);
        setSelMinIdx(nextI);
      }
    }
  };

  // ==========================================
  // TOPIC 6: RADIX SORT STATE
  // ==========================================
  const radixInitialData = [170, 45, 75, 90, 802, 24, 2, 66];
  const [radixPass, setRadixPass] = useState<number>(1); // 1 = 1s, 2 = 10s, 3 = 100s
  const [radixArray, setRadixArray] = useState<number[]>([...radixInitialData]);
  const [radixStepDesc, setRadixStepDesc] = useState<string>(
    'LSD Radix Sort ready. Pass 1 will sort by the Units (1s) place digit.'
  );

  const resetRadix = () => {
    setIsPlaying(false);
    setRadixPass(1);
    setRadixArray([...radixInitialData]);
    setRadixStepDesc('Radix Sort reset to initial 8-element multi-digit dataset.');
  };

  const getRadixDigit = (num: number, pass: number): number => {
    const exp = pass === 1 ? 1 : pass === 2 ? 10 : 100;
    return Math.floor(num / exp) % 10;
  };

  const runRadixPass = (passNum: number) => {
    const exp = passNum === 1 ? 1 : passNum === 2 ? 10 : 100;
    const arr = [...radixArray];
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }

    setRadixArray(output);
    const nextPass = passNum + 1;
    setRadixPass(nextPass);
    if (nextPass > 3) {
      setRadixStepDesc('Radix Sort Complete! Array fully sorted across Units, Tens, and Hundreds places.');
      setIsPlaying(false);
    } else {
      setRadixStepDesc(`Pass ${passNum} finished. Next: Pass ${nextPass} (${nextPass === 2 ? 'Tens' : 'Hundreds'} place).`);
    }
  };

  // Dispatch forward step based on active topic
  const stepForward = () => {
    if (topic.id === 'top-301') stepLinearForward();
    else if (topic.id === 'top-302') stepBinaryForward();
    else if (topic.id === 'top-303') stepBubbleForward();
    else if (topic.id === 'top-304') stepInsertionForward();
    else if (topic.id === 'top-305') stepSelectionForward();
    else if (topic.id === 'top-306') {
      if (radixPass <= 3) runRadixPass(radixPass);
    }
  };

  const resetAll = () => {
    if (topic.id === 'top-301') resetLinear();
    else if (topic.id === 'top-302') resetBinary();
    else if (topic.id === 'top-303') resetBubble();
    else if (topic.id === 'top-304') resetInsertion();
    else if (topic.id === 'top-305') resetSelection();
    else if (topic.id === 'top-306') resetRadix();
  };

  // Play/Pause Interval Engine
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        stepForward();
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [
    isPlaying,
    speed,
    topic.id,
    linearIndex,
    linearFound,
    binLow,
    binHigh,
    binMid,
    binFound,
    bubbleArr,
    bubbleI,
    bubbleJ,
    bubbleSwapped,
    bubbleIsComplete,
    insArr,
    insI,
    insKey,
    insJ,
    insIsComplete,
    selArr,
    selI,
    selJ,
    selMinIdx,
    selIsComplete,
    radixPass
  ]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Visualizer Control Console Header */}
      <div className="p-4 md:p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-white text-base md:text-lg">
              {topic.title} Interactive Visualizer
            </h2>
            <p className="text-xs text-slate-400">
              Deterministic frame-by-frame algorithm execution and state inspector
            </p>
          </div>
        </div>

        {/* Playback Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:opacity-90 shadow-cyan-glow'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
          </button>

          <button
            onClick={stepForward}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            title="Advance 1 Step"
          >
            <SkipForward className="w-3.5 h-3.5 text-cyan-400" />
            <span>Step Next</span>
          </button>

          {topic.id === 'top-301' && (
            <button
              onClick={stepLinearBackward}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              title="Step Backward"
            >
              <SkipBack className="w-3.5 h-3.5 text-slate-400" />
              <span>Step Prev</span>
            </button>
          )}

          <button
            onClick={resetAll}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-slate-500 text-[10px]">Speed:</span>
            {[
              { label: '0.5x', ms: 1600 },
              { label: '1x', ms: 900 },
              { label: '2x', ms: 450 }
            ].map((spd) => (
              <button
                key={spd.label}
                onClick={() => setSpeed(spd.ms)}
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  speed === spd.ms
                    ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Algorithm Animation Canvas */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden min-h-[360px] flex flex-col justify-between">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* 1. LINEAR SEARCH VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-301' && (
          <div className="space-y-8 my-auto">
            {/* Search Target Header Input */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Search Target Key:</span>
                <div className="flex items-center gap-1.5">
                  {[42, 25, 99].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setLinearTarget(val);
                        resetLinear();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        linearTarget === val
                          ? 'bg-cyan-500 text-slate-950 shadow-cyan-glow'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {val} {val === 99 ? '(Absent)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-xs font-mono text-cyan-400">
                Comparisons Made: <span className="font-bold text-white">{Math.max(0, linearIndex + 1)}</span>
              </div>
            </div>

            {/* Array Elements Grid */}
            <div className="flex justify-center items-center gap-3 md:gap-5 overflow-x-auto p-4">
              {initialLinearArray.map((val, idx) => {
                const isCurrent = linearIndex === idx;
                const isFound = linearFound === true && linearIndex === idx;
                const isPast = linearIndex > idx && !isFound;

                return (
                  <div key={idx} className="flex flex-col items-center relative">
                    {/* Index Label */}
                    <span className="text-[11px] font-mono text-slate-500 mb-1.5">[{idx}]</span>

                    {/* Array Cell */}
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.12 : 1,
                        y: isCurrent ? -8 : 0
                      }}
                      className={`w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center font-mono font-extrabold text-lg md:text-xl border-2 transition-all shadow-xl ${
                        isFound
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-emerald-glow'
                          : isCurrent
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-amber-glow animate-pulse'
                          : isPast
                          ? 'bg-slate-950 text-slate-500 border-slate-800'
                          : 'bg-slate-900 text-white border-slate-700'
                      }`}
                    >
                      {val}
                    </motion.div>

                    {/* Pointer Indicator Arrow */}
                    <div className="h-10 flex flex-col items-center justify-start mt-2">
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center"
                        >
                          <ArrowUp className="w-4 h-4 text-cyan-400 animate-bounce" />
                          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                            Pointer i
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. BINARY SEARCH VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-302' && (
          <div className="space-y-8 my-auto">
            {/* Target & Pointer Legend */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Search Target:</span>
                <div className="flex items-center gap-1.5">
                  {[50, 20, 65].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setBinaryTarget(val);
                        resetBinary();
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        binaryTarget === val
                          ? 'bg-cyan-500 text-slate-950 shadow-cyan-glow'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {val} {val === 65 ? '(Absent)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pointer Badges */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> Low = {binLow}
                </span>
                <span className="flex items-center gap-1 text-purple-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" /> Mid = {binMid !== null ? binMid : '—'}
                </span>
                <span className="flex items-center gap-1 text-blue-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block" /> High = {binHigh}
                </span>
              </div>
            </div>

            {/* Array Elements with Range Dimming */}
            <div className="flex justify-center items-center gap-2 md:gap-4 overflow-x-auto p-4">
              {initialBinaryArray.map((val, idx) => {
                const inRange = idx >= binLow && idx <= binHigh;
                const isMid = binMid === idx;
                const isLow = binLow === idx;
                const isHigh = binHigh === idx;
                const isFound = binFound === true && isMid;

                return (
                  <div key={idx} className="flex flex-col items-center relative">
                    {/* Index */}
                    <span className="text-[11px] font-mono text-slate-500 mb-1">[{idx}]</span>

                    {/* Array Cell */}
                    <motion.div
                      animate={{
                        scale: isMid ? 1.15 : inRange ? 1.02 : 0.95,
                        opacity: inRange ? 1 : 0.3
                      }}
                      className={`w-13 h-13 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-mono font-extrabold text-base md:text-lg border-2 transition-all shadow-xl ${
                        isFound
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-emerald-glow'
                          : isMid
                          ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-purple-glow'
                          : inRange
                          ? 'bg-slate-900 text-white border-slate-700'
                          : 'bg-slate-950 text-slate-600 border-slate-900'
                      }`}
                    >
                      {val}
                    </motion.div>

                    {/* Low, Mid, High Tags Below */}
                    <div className="h-12 flex flex-col items-center justify-start mt-2 gap-0.5 text-[10px] font-mono font-bold">
                      {isMid && (
                        <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40">
                          MID
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        {isLow && (
                          <span className="px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                            L
                          </span>
                        )}
                        {isHigh && (
                          <span className="px-1 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">
                            H
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. BUBBLE SORT VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-303' && (
          <div className="space-y-8 my-auto">
            {/* Pass & Swapped Info Header */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold uppercase">Pass {bubbleI + 1} of 4</span>
                <span className="text-slate-400">Comparing index [{bubbleJ}] & [{bubbleJ + 1}]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Swapped in this Pass:</span>
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    bubbleSwapped
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {bubbleSwapped ? 'TRUE' : 'FALSE'}
                </span>
              </div>
            </div>

            {/* Bubble Sort Array Elements */}
            <div className="flex justify-center items-center gap-3 md:gap-5 overflow-x-auto p-4">
              {bubbleArr.map((val, idx) => {
                const isComparing = !bubbleIsComplete && (idx === bubbleJ || idx === bubbleJ + 1);
                const isLocked = idx >= bubbleArr.length - bubbleI || bubbleIsComplete;

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[11px] font-mono text-slate-500 mb-1">[{idx}]</span>

                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className={`w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center font-mono font-extrabold text-lg md:text-xl border-2 transition-all shadow-xl ${
                        isLocked
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-emerald-glow'
                          : isComparing
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-amber-glow scale-105'
                          : 'bg-slate-900 text-white border-slate-700'
                      }`}
                    >
                      {val}
                    </motion.div>

                    {/* Status Badge */}
                    <div className="h-6 mt-2 text-[10px] font-mono">
                      {isLocked ? (
                        <span className="text-emerald-400 font-bold">Sorted</span>
                      ) : isComparing ? (
                        <span className="text-amber-400 font-bold">Compare</span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. INSERTION SORT VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-304' && (
          <div className="space-y-6 my-auto">
            {/* Header Status */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">Sorted Partition Size: {insI}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400">Current Key:</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                  {insKey !== null ? insKey : 'Extracting...'}
                </span>
              </div>
            </div>

            {/* Array Elements with Partition Divider */}
            <div className="flex justify-center items-center gap-2 md:gap-4 overflow-x-auto p-4">
              {insArr.map((val, idx) => {
                const isSortedPrefix = idx < insI;
                const isKeySlot = idx === insI;
                const isComparingJ = insKey !== null && idx === insJ;

                return (
                  <React.Fragment key={idx}>
                    {/* Visual Partition Line */}
                    {idx === insI && (
                      <div className="h-20 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full mx-1 opacity-70" title="Sorted vs Unsorted Boundary" />
                    )}

                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-mono text-slate-500 mb-1">[{idx}]</span>

                      <motion.div
                        layout
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-mono font-extrabold text-base md:text-lg border-2 transition-all shadow-xl ${
                          insIsComplete
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                            : isComparingJ
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-amber-glow'
                            : isKeySlot && insKey !== null
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 animate-pulse'
                            : isSortedPrefix
                            ? 'bg-slate-900 text-slate-200 border-cyan-500/40'
                            : 'bg-slate-950 text-slate-500 border-slate-800'
                        }`}
                      >
                        {val}
                      </motion.div>

                      {/* Tag */}
                      <span className="text-[9px] font-mono mt-1 text-slate-400">
                        {isSortedPrefix ? 'Sorted' : 'Unsorted'}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 5. SELECTION SORT VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-305' && (
          <div className="space-y-6 my-auto">
            {/* Header Pass & Min Status */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold uppercase">Pass {selI + 1} of 4</span>
                <span className="text-slate-400">Target Slot: [{selI}]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Current Minimum:</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  arr[{selMinIdx}] = {selArr[selMinIdx]}
                </span>
              </div>
            </div>

            {/* Selection Sort Array */}
            <div className="flex justify-center items-center gap-3 md:gap-5 overflow-x-auto p-4">
              {selArr.map((val, idx) => {
                const isSortedSlot = idx < selI || selIsComplete;
                const isTargetSlot = idx === selI && !selIsComplete;
                const isMin = idx === selMinIdx && !selIsComplete;
                const isScanning = idx === selJ - 1 && !selIsComplete;

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[11px] font-mono text-slate-500 mb-1">[{idx}]</span>

                    <motion.div
                      layout
                      className={`w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center font-mono font-extrabold text-lg md:text-xl border-2 transition-all shadow-xl ${
                        isSortedSlot
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                          : isMin
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-amber-glow scale-105'
                          : isTargetSlot
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                          : isScanning
                          ? 'bg-slate-800 text-white border-slate-600'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      {val}
                    </motion.div>

                    {/* Tag Below */}
                    <div className="h-6 mt-2 text-[10px] font-mono">
                      {isSortedSlot ? (
                        <span className="text-emerald-400">Locked</span>
                      ) : isMin ? (
                        <span className="text-amber-400 font-bold">Min</span>
                      ) : isTargetSlot ? (
                        <span className="text-cyan-400">Slot i</span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 6. RADIX SORT VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-306' && (
          <div className="space-y-6 my-auto">
            {/* Digit Pass Selector Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Active Digit Pass:</span>
                {[
                  { pass: 1, label: 'Pass 1: Ones (1s)' },
                  { pass: 2, label: 'Pass 2: Tens (10s)' },
                  { pass: 3, label: 'Pass 3: Hundreds (100s)' }
                ].map((item) => (
                  <button
                    key={item.pass}
                    onClick={() => {
                      resetRadix();
                      if (item.pass > 1) runRadixPass(1);
                      if (item.pass > 2) runRadixPass(2);
                    }}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      radixPass === item.pass
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-digit numbers with active digit highlighted */}
            <div className="flex justify-center items-center gap-2 md:gap-3 overflow-x-auto p-4 flex-wrap">
              {radixArray.map((val, idx) => {
                const activeDigit = getRadixDigit(val, Math.min(3, radixPass));
                const formatted = String(val).padStart(3, '0');

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-500 mb-1">[{idx}]</span>
                    <div className="px-3.5 py-3 rounded-2xl bg-slate-900 border border-slate-700 flex items-center font-mono font-bold text-sm md:text-base text-white shadow-lg">
                      {/* Hundreds digit */}
                      <span className={radixPass === 3 ? 'text-cyan-400 font-extrabold scale-110 underline' : 'text-slate-400'}>
                        {formatted[0]}
                      </span>
                      {/* Tens digit */}
                      <span className={radixPass === 2 ? 'text-cyan-400 font-extrabold scale-110 underline' : 'text-slate-400'}>
                        {formatted[1]}
                      </span>
                      {/* Ones digit */}
                      <span className={radixPass === 1 ? 'text-cyan-400 font-extrabold scale-110 underline' : 'text-slate-400'}>
                        {formatted[2]}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 mt-1">
                      Key: {activeDigit}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 10 Digit Buckets Preview (0-9) */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Stable Digit Buckets [0..9]:
              </span>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 text-center font-mono text-xs">
                {Array.from({ length: 10 }, (_, bIdx) => {
                  const itemsInBucket = radixArray.filter(
                    (val) => getRadixDigit(val, Math.min(3, radixPass)) === bIdx
                  );
                  return (
                    <div key={bIdx} className="p-2 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-cyan-400 font-bold block text-[10px]">Bucket {bIdx}</span>
                      <div className="text-[11px] text-slate-300 min-h-[1.5rem]">
                        {itemsInBucket.length > 0 ? itemsInBucket.join(', ') : '—'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Telemetry State Status Bar */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">
              {topic.id === 'top-301'
                ? linearStepDesc
                : topic.id === 'top-302'
                ? binStepDesc
                : topic.id === 'top-303'
                ? bubbleStepDesc
                : topic.id === 'top-304'
                ? insStepDesc
                : topic.id === 'top-305'
                ? selStepDesc
                : radixStepDesc}
            </span>
          </div>

          <span className="text-slate-500 text-[11px]">
            {topic.category} Visual Engine • Hardware Mode
          </span>
        </div>
      </div>
    </div>
  );
};
