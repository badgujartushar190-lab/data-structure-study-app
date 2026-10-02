import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, RotateCcw } from 'lucide-react';
import { TopicData } from './chapter2Data';

interface Props {
  topic: TopicData;
}

export const Chapter2Visualizer: React.FC<Props> = ({ topic }) => {
  // Topic 1 (Array Representation) State:
  const [repDimension, setRepDimension] = useState<'1d' | '2d'>('1d');
  const [selected1DIndex, setSelected1DIndex] = useState<number>(2);
  const [selected2DRow, setSelected2DRow] = useState<number>(1);
  const [selected2DCol, setSelected2DCol] = useState<number>(2);

  // Topic 2 (Array ADT) State:
  const [adtArray, setAdtArray] = useState<number[]>([10, 20, 30, 40]);
  const [adtActiveIndex, setAdtActiveIndex] = useState<number>(-1);
  const [adtInsertVal, setAdtInsertVal] = useState<number>(99);
  const [adtInsertPos, setAdtInsertPos] = useState<number>(2);
  const [adtDeletePos, setAdtDeletePos] = useState<number>(1);
  const [adtSearchVal, setAdtSearchVal] = useState<number>(30);
  const [adtMessage, setAdtMessage] = useState<string>('Select an operation to observe shifting and boundary mechanics.');
  const [isAdtAnimating, setIsAdtAnimating] = useState<boolean>(false);

  // Topic 3 (Programming Array in C) State:
  const [cMemoryMode, setCMemoryMode] = useState<'stack-layout' | 'pointer-decay' | 'arithmetic'>('stack-layout');
  const [cSelectedElement, setCSelectedElement] = useState<number>(2);

  // Topic 4 (Sparse Matrix) State:
  const [sparseMatrix] = useState<number[][]>([
    [0, 0, 0, 5],
    [0, 8, 0, 0],
    [0, 0, 0, 0]
  ]);

  // Topic 5 (Row & Column Major) State:
  const [majorOrder, setMajorOrder] = useState<'row-major' | 'col-major'>('row-major');
  const [calcRow, setCalcRow] = useState<number>(1);
  const [calcCol, setCalcCol] = useState<number>(2);
  const [baseAddr, setBaseAddr] = useState<number>(1000);
  const [elemSize, setElemSize] = useState<number>(4);
  const totalRows = 2;
  const totalCols = 3;

  // 1D Array Sample Data
  const sample1D = [10, 20, 30, 40, 50];
  const sample2D = [
    [1, 2, 3],
    [4, 5, 6]
  ];

  // ADT Operations:
  const handleAdtInsert = () => {
    if (adtArray.length >= 7) {
      setAdtMessage('Cannot insert: maximum demo capacity of 7 elements reached.');
      return;
    }
    setIsAdtAnimating(true);
    setAdtMessage(`[Insert]: Inserting ${adtInsertVal} at index [${adtInsertPos}]. Shifting subsequent elements right...`);

    setTimeout(() => {
      const next = [...adtArray];
      next.splice(adtInsertPos, 0, adtInsertVal);
      setAdtArray(next);
      setAdtActiveIndex(adtInsertPos);
      setAdtMessage(`[Insert Complete]: Inserted ${adtInsertVal} at index [${adtInsertPos}]. Array size is now ${next.length}.`);
      setIsAdtAnimating(false);
    }, 800);
  };

  const handleAdtDelete = () => {
    if (adtArray.length <= 1) {
      setAdtMessage('Cannot delete: array must contain at least one element.');
      return;
    }
    setIsAdtAnimating(true);
    setAdtActiveIndex(adtDeletePos);
    setAdtMessage(`[Delete]: Marking element at index [${adtDeletePos}] for removal...`);

    setTimeout(() => {
      const next = [...adtArray];
      const removed = next.splice(adtDeletePos, 1);
      setAdtArray(next);
      setAdtActiveIndex(-1);
      setAdtMessage(`[Delete Complete]: Removed element ${removed[0]}. Subsequent elements shifted left.`);
      setIsAdtAnimating(false);
    }, 900);
  };

  const handleAdtSearch = () => {
    setIsAdtAnimating(true);
    let idx = 0;
    setAdtActiveIndex(0);
    setAdtMessage(`[Search]: Checking index 0 (val = ${adtArray[0]}) against target ${adtSearchVal}...`);

    const interval = setInterval(() => {
      if (adtArray[idx] === adtSearchVal) {
        clearInterval(interval);
        setAdtActiveIndex(idx);
        setAdtMessage(`[Match Found]: Target ${adtSearchVal} located at index [${idx}].`);
        setIsAdtAnimating(false);
        return;
      }
      idx++;
      if (idx < adtArray.length) {
        setAdtActiveIndex(idx);
        setAdtMessage(`[Search]: Checking index ${idx} (val = ${adtArray[idx]}) against target ${adtSearchVal}...`);
      } else {
        clearInterval(interval);
        setAdtActiveIndex(-1);
        setAdtMessage(`[Search Result]: Target ${adtSearchVal} not found in array.`);
        setIsAdtAnimating(false);
      }
    }, 800);
  };

  const handleAdtReset = () => {
    setAdtArray([10, 20, 30, 40]);
    setAdtActiveIndex(-1);
    setAdtMessage('Array reset to default state: [10, 20, 30, 40]');
  };

  // Sparse Matrix triplets extraction:
  const nonZeroTriplets: { row: number; col: number; val: number }[] = [];
  sparseMatrix.forEach((r, rIdx) => {
    r.forEach((v, cIdx) => {
      if (v !== 0) {
        nonZeroTriplets.push({ row: rIdx, col: cIdx, val: v });
      }
    });
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Visual Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 text-sm md:text-base">
            Interactive Architecture & Memory Layout Visualizer
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          {topic.id === 'top-201' && '1D vs 2D Memory Representation & Offset Calculator'}
          {topic.id === 'top-202' && 'Array ADT Operations & Element Shifting Simulator'}
          {topic.id === 'top-203' && 'C Memory Model, Stack Frames & Pointer Decay'}
          {topic.id === 'top-204' && 'Sparse Matrix vs Triplet Representation Workbench'}
          {topic.id === 'top-205' && 'Row-Major vs Column-Major Memory & Address Engine'}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* TOPIC 1: Array Representation (1D & 2D) */}
      {/* ========================================================================= */}
      {topic.id === 'top-201' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          {/* Dimension Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Dimension:</span>
            <button
              onClick={() => setRepDimension('1d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                repDimension === '1d'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              One-Dimensional (1D) Array
            </button>
            <button
              onClick={() => setRepDimension('2d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                repDimension === '2d'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              Two-Dimensional (2D) Array (Matrix)
            </button>
          </div>

          {/* 1D Array Visualizer */}
          {repDimension === '1d' && (
            <div className="space-y-6 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>int arr[5] = &#123;10, 20, 30, 40, 50&#125;;</span>
                <span className="text-cyan-400">Base Address: 0x1000</span>
              </div>

              {/* Cells */}
              <div className="flex justify-center items-center gap-3 overflow-x-auto p-4">
                {sample1D.map((val, idx) => {
                  const isSelected = selected1DIndex === idx;
                  const addr = 1000 + idx * 4;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelected1DIndex(idx)}
                      className="cursor-pointer flex flex-col items-center group"
                    >
                      <span className={`text-[11px] font-mono mb-1 ${isSelected ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                        Index [{idx}]
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-lg transition-all shadow-lg ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-cyan-glow'
                            : 'bg-slate-950 border-slate-700 text-white group-hover:border-slate-500'
                        }`}
                      >
                        {val}
                      </motion.div>
                      <span className="text-[10px] font-mono text-slate-500 mt-1">
                        0x{addr.toString(16)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Offset Diagnostic Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <span className="text-cyan-400 font-bold block text-[11px] uppercase tracking-wider">
                  Address Derivation for arr[{selected1DIndex}]:
                </span>
                <p className="text-slate-300">
                  Formula: <code className="text-cyan-300">Address = Base + (Index * sizeof(int))</code>
                </p>
                <p className="text-slate-300">
                  Calculation: <code className="text-emerald-400">0x1000 + ({selected1DIndex} * 4) = 0x{(1000 + selected1DIndex * 4).toString(16)}</code>
                </p>
                <p className="text-slate-400">
                  Value at memory address 0x{(1000 + selected1DIndex * 4).toString(16)} is <strong className="text-white">{sample1D[selected1DIndex]}</strong>.
                  {selected1DIndex === 2 && ' (Explains why arr[2] directly retrieves 30 in O(1) time!)'}
                </p>
              </div>
            </div>
          )}

          {/* 2D Array Visualizer */}
          {repDimension === '2d' && (
            <div className="space-y-6 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-mono text-slate-300 flex items-center justify-between">
                <span>int matrix[2][3] = &#123;&#123;1, 2, 3&#125;, &#123;4, 5, 6&#125;&#125;;</span>
                <span className="text-cyan-400">Selected: matrix[{selected2DRow}][{selected2DCol}] = {sample2D[selected2DRow][selected2DCol]}</span>
              </div>

              {/* Matrix Grid */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2 text-xs font-mono text-slate-500 ml-16">
                  <span className="w-16 text-center">Col 0</span>
                  <span className="w-16 text-center">Col 1</span>
                  <span className="w-16 text-center">Col 2</span>
                </div>
                {sample2D.map((rowArr, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-2">
                    <span className="w-14 text-right text-xs font-mono text-slate-500">Row {rIdx}</span>
                    <div className="flex gap-2">
                      {rowArr.map((val, cIdx) => {
                        const isSelected = selected2DRow === rIdx && selected2DCol === cIdx;
                        return (
                          <button
                            key={cIdx}
                            onClick={() => {
                              setSelected2DRow(rIdx);
                              setSelected2DCol(cIdx);
                            }}
                            className={`w-16 h-14 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-base transition-all ${
                              isSelected
                                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-cyan-glow scale-105'
                                : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-600'
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Physical Memory Flattening Strip */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-xs font-mono text-slate-400 block font-bold">
                  Physical RAM Flattening (Row-Major Sequence in C):
                </span>
                <div className="flex gap-1.5 overflow-x-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                  {sample2D.flatMap((row, r) =>
                    row.map((val, c) => {
                      const isSelected = selected2DRow === r && selected2DCol === c;
                      const linearIdx = r * 3 + c;
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`px-3 py-2 rounded-lg font-mono text-xs text-center border ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span className="block text-[9px] text-slate-500">[{r}][{c}] #{linearIdx}</span>
                          <span>{val}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* 2D Diagnostic Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                <span className="text-cyan-400 font-bold block text-[11px] uppercase tracking-wider">
                  2D Offset Calculation for matrix[{selected2DRow}][{selected2DCol}]:
                </span>
                <p className="text-slate-300">
                  Linear Offset: <code className="text-emerald-400">({selected2DRow} * 3) + {selected2DCol} = {selected2DRow * 3 + selected2DCol}</code>
                </p>
                <p className="text-slate-400">
                  Row {selected2DRow} skips {selected2DRow} row of 3 columns, then advances {selected2DCol} columns. Value at coordinate is <strong className="text-white">{sample2D[selected2DRow][selected2DCol]}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC 2: Array as an Abstract Data Type */}
      {/* ========================================================================= */}
      {topic.id === 'top-202' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono text-slate-400">
              Array ADT State: Capacity = 8, Size = {adtArray.length}
            </span>
            <button
              onClick={handleAdtReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset ADT</span>
            </button>
          </div>

          {/* Interactive Action Controls */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            {/* Insert Control */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">1. Insert Operation</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={adtInsertVal}
                  onChange={(e) => setAdtInsertVal(parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                />
                <input
                  type="number"
                  min={0}
                  max={adtArray.length}
                  value={adtInsertPos}
                  onChange={(e) => setAdtInsertPos(Math.min(adtArray.length, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-14 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                />
                <button
                  onClick={handleAdtInsert}
                  disabled={isAdtAnimating}
                  className="flex-1 px-2 py-1 rounded bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-50"
                >
                  Insert
                </button>
              </div>
              <span className="text-[10px] text-slate-500">Shifts elements right from index.</span>
            </div>

            {/* Delete Control */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold block">2. Delete Operation</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  max={adtArray.length - 1}
                  value={adtDeletePos}
                  onChange={(e) => setAdtDeletePos(Math.min(adtArray.length - 1, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="w-16 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                />
                <button
                  onClick={handleAdtDelete}
                  disabled={isAdtAnimating}
                  className="flex-1 px-2 py-1 rounded bg-rose-500 text-slate-950 font-bold hover:bg-rose-400 disabled:opacity-50"
                >
                  Delete & Shift
                </button>
              </div>
              <span className="text-[10px] text-slate-500">Shifts following elements left.</span>
            </div>

            {/* Search Control */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold block">3. Search Operation</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={adtSearchVal}
                  onChange={(e) => setAdtSearchVal(parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                />
                <button
                  onClick={handleAdtSearch}
                  disabled={isAdtAnimating}
                  className="flex-1 px-2 py-1 rounded bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 disabled:opacity-50"
                >
                  Linear Scan
                </button>
              </div>
              <span className="text-[10px] text-slate-500">Scans sequentially in O(n).</span>
            </div>
          </div>

          {/* ADT Array Cells */}
          <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center gap-3 overflow-x-auto p-4 max-w-full">
              <AnimatePresence mode="popLayout">
                {adtArray.map((val, idx) => {
                  const isCurrent = adtActiveIndex === idx;
                  return (
                    <motion.div
                      key={`adt-${idx}-${val}`}
                      layout
                      initial={{ scale: 0.8, opacity: 0, y: -15 }}
                      animate={{ scale: isCurrent ? 1.12 : 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.8, opacity: 0, y: 15 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="flex flex-col items-center"
                    >
                      <span className="text-[10px] font-mono text-slate-500 mb-1">[{idx}]</span>
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-base md:text-lg transition-all shadow-lg ${
                          isCurrent
                            ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-cyan-glow'
                            : 'bg-slate-950 border-slate-700 text-white'
                        }`}
                      >
                        {val}
                      </div>
                      <span className="text-[9px] font-mono text-slate-600 mt-1">Offset +{idx * 4}B</span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* ADT Diagnostic Console */}
            <div className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex items-center justify-between">
              <span className="text-cyan-300">{adtMessage}</span>
              <span className="text-[10px] text-slate-500 uppercase">Array ADT Invariant: Contiguous</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC 3: Programming Array in C */}
      {/* ========================================================================= */}
      {topic.id === 'top-203' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">C Memory Perspective:</span>
            {[
              { id: 'stack-layout', label: '1. Stack Frame Allocation' },
              { id: 'pointer-decay', label: '2. Function Pointer Decay' },
              { id: 'arithmetic', label: '3. Pointer Subscript Equivalence' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setCMemoryMode(m.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  cMemoryMode === m.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            {cMemoryMode === 'stack-layout' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-cyan-400 font-bold block">
                  C Stack Allocation: int numbers[5] = &#123;10, 20, 30, 40, 50&#125;;
                </span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-center gap-3 overflow-x-auto">
                  {[10, 20, 30, 40, 50].map((v, i) => (
                    <div
                      key={i}
                      onClick={() => setCSelectedElement(i)}
                      className={`p-3 rounded-lg border text-center font-mono cursor-pointer transition-all ${
                        cSelectedElement === i
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="block text-[10px] text-slate-500">numbers[{i}]</span>
                      <span className="text-base font-bold text-white">{v}</span>
                      <span className="block text-[9px] text-slate-600 mt-1">4 Bytes</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Total stack footprint: 5 * sizeof(int) = 20 contiguous bytes allocated inside the activation record.
                </p>
              </div>
            )}

            {cMemoryMode === 'pointer-decay' && (
              <div className="space-y-4">
                <span className="text-xs font-mono text-emerald-400 font-bold block">
                  Pointer Decay: void printArray(const int arr[], int n)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-cyan-400 font-bold block">Caller: main()</span>
                    <p className="text-slate-300">int numbers[5]; // Full array of 20 bytes</p>
                    <p className="text-slate-500">sizeof(numbers) == 20 bytes</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-emerald-400 font-bold block">Callee: printArray(int *arr, int n)</span>
                    <p className="text-slate-300">arr decays to &amp;numbers[0] (memory address)</p>
                    <p className="text-slate-500">sizeof(arr) == 8 bytes (pointer size on 64-bit OS)</p>
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  💡 This is why in C, the length <code className="text-cyan-300">int n</code> must always be passed as a separate argument!
                </p>
              </div>
            )}

            {cMemoryMode === 'arithmetic' && (
              <div className="space-y-4 font-mono text-xs">
                <span className="text-xs text-purple-400 font-bold block">
                  Subscript Pointer Equivalence: arr[i] == *(arr + i)
                </span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
                  <p>In C, subscript bracket notation is syntactic sugar for pointer arithmetic:</p>
                  <p className="text-cyan-300 font-bold">arr[i] &lt;===&gt; *(arr + i)</p>
                  <p className="text-slate-400">
                    Because addition is commutative: <code className="text-emerald-300">i[arr] &lt;===&gt; *(i + arr)</code> is also valid in C!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC 4: Sparse Matrices, Sparse Representation & Advantages */}
      {/* ========================================================================= */}
      {topic.id === 'top-204' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Dense Matrix View */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Dense 3x4 Matrix (from Course PDF)
                </span>
                <span className="text-[10px] font-mono text-slate-400">Total Cells: 12</span>
              </div>

              <div className="flex flex-col items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                {sparseMatrix.map((row, r) => (
                  <div key={r} className="flex gap-2">
                    {row.map((val, c) => {
                      const isNonZero = val !== 0;
                      return (
                        <div
                          key={c}
                          className={`w-14 h-12 rounded-lg border flex flex-col items-center justify-center font-mono text-xs transition-all ${
                            isNonZero
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold scale-105 shadow-emerald-glow'
                              : 'bg-slate-900 border-slate-800 text-slate-600'
                          }`}
                        >
                          <span className="text-[8px] text-slate-500">[{r}][{c}]</span>
                          <span>{val}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                Notice: 10 out of 12 cells are useless zeros! In normal storage, this wastes 40 bytes out of 48 bytes.
              </p>
            </div>

            {/* Right: Triplet Representation View */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  Triplet Sparse Representation (row, col, value)
                </span>
                <span className="text-[10px] font-mono text-emerald-300">Non-Zeros: {nonZeroTriplets.length}</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3 text-cyan-400">Row</th>
                      <th className="p-3 text-cyan-400">Column</th>
                      <th className="p-3 text-emerald-400 font-bold">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {/* Header Row (Metadata) */}
                    <tr className="bg-slate-900/40 text-slate-400">
                      <td className="p-3 font-bold">3 (Total Rows)</td>
                      <td className="p-3 font-bold">4 (Total Cols)</td>
                      <td className="p-3 font-bold text-cyan-300">{nonZeroTriplets.length} (Count)</td>
                    </tr>
                    {nonZeroTriplets.map((t, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/70 transition-colors">
                        <td className="p-3 text-white font-bold">{t.row}</td>
                        <td className="p-3 text-white font-bold">{t.col}</td>
                        <td className="p-3 text-emerald-300 font-bold bg-emerald-500/10">{t.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
                <span className="text-cyan-400 font-bold block">Transformation Pipeline:</span>
                <p>Normal Matrix ──&gt; Scan for non-zeros ──&gt; Triplet (row, col, value)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC 5: Row-Major and Column-Major Order */}
      {/* ========================================================================= */}
      {topic.id === 'top-205' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          {/* Order Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Memory Ordering:</span>
            <button
              onClick={() => setMajorOrder('row-major')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                majorOrder === 'row-major'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              Row-Major Order (C / C++ / Python)
            </button>
            <button
              onClick={() => setMajorOrder('col-major')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                majorOrder === 'col-major'
                  ? 'bg-blue-600 text-white font-bold shadow-blue-glow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              Column-Major Order (Fortran / MATLAB)
            </button>
          </div>

          {/* Matrix & Memory Stream Visualizer */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="text-xs font-mono text-slate-300">
              Examining Matrix: <code className="text-cyan-300">[[1, 2], [3, 4]]</code>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* 2x2 Matrix */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center space-y-2">
                <span className="text-xs font-mono text-slate-400">2x2 Matrix</span>
                <div className="grid grid-cols-2 gap-2 font-mono text-sm font-bold">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-300">1</div>
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-300">2</div>
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-300">3</div>
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-300">4</div>
                </div>
              </div>

              {/* Linear RAM Stream */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                <span className="text-slate-400 block">
                  Continuous 1D Memory Stream in RAM:
                </span>
                <div className="flex gap-2">
                  {majorOrder === 'row-major' ? (
                    <>
                      <div className="p-2.5 rounded bg-cyan-500 text-slate-950 font-bold">1</div>
                      <div className="p-2.5 rounded bg-cyan-500 text-slate-950 font-bold">2</div>
                      <div className="p-2.5 rounded bg-blue-600 text-white font-bold">3</div>
                      <div className="p-2.5 rounded bg-blue-600 text-white font-bold">4</div>
                    </>
                  ) : (
                    <>
                      <div className="p-2.5 rounded bg-cyan-500 text-slate-950 font-bold">1</div>
                      <div className="p-2.5 rounded bg-blue-600 text-white font-bold">3</div>
                      <div className="p-2.5 rounded bg-cyan-500 text-slate-950 font-bold">2</div>
                      <div className="p-2.5 rounded bg-blue-600 text-white font-bold">4</div>
                    </>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 block pt-1">
                  {majorOrder === 'row-major'
                    ? 'Row-major sequence: 1 -> 2 -> 3 -> 4 (Row by row)'
                    : 'Column-major sequence: 1 -> 3 -> 2 -> 4 (Column by column)'}
                </span>
              </div>
            </div>

            {/* Interactive Address Calculation Simulator */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs">
              <span className="text-cyan-400 font-bold block text-sm">
                Interactive Address Calculation Calculator (2D Array)
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-500 block mb-1">Base Address:</span>
                  <input
                    type="number"
                    value={baseAddr}
                    onChange={(e) => setBaseAddr(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Target Row (i):</span>
                  <input
                    type="number"
                    min={0}
                    max={totalRows - 1}
                    value={calcRow}
                    onChange={(e) => setCalcRow(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Target Col (j):</span>
                  <input
                    type="number"
                    min={0}
                    max={totalCols - 1}
                    value={calcCol}
                    onChange={(e) => setCalcCol(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Element Size (S):</span>
                  <input
                    type="number"
                    value={elemSize}
                    onChange={(e) => setElemSize(parseInt(e.target.value) || 1)}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              {/* Result Calculation Output */}
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                {majorOrder === 'row-major' ? (
                  <>
                    <p className="text-slate-300 font-bold text-cyan-300">
                      Row-Major Formula: Address(A[i][j]) = Base + (i * Total_Cols + j) * S
                    </p>
                    <p className="text-slate-400">
                      Substitution: {baseAddr} + ({calcRow} * {totalCols} + {calcCol}) * {elemSize}
                    </p>
                    <p className="text-slate-200">
                      = {baseAddr} + ({(calcRow * totalCols) + calcCol}) * {elemSize} = <strong className="text-emerald-400 font-bold text-sm">{baseAddr + ((calcRow * totalCols) + calcCol) * elemSize}</strong>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-slate-300 font-bold text-blue-300">
                      Column-Major Formula: Address(A[i][j]) = Base + (j * Total_Rows + i) * S
                    </p>
                    <p className="text-slate-400">
                      Substitution: {baseAddr} + ({calcCol} * {totalRows} + {calcRow}) * {elemSize}
                    </p>
                    <p className="text-slate-200">
                      = {baseAddr} + ({(calcCol * totalRows) + calcRow}) * {elemSize} = <strong className="text-emerald-400 font-bold text-sm">{baseAddr + ((calcCol * totalRows) + calcRow) * elemSize}</strong>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
