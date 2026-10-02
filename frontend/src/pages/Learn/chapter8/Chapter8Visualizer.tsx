import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  Plus,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { TopicData } from './chapter8Data';

interface Props {
  topic: TopicData;
}

interface ChainNode {
  key: number;
  val: number;
}

interface ProbeSlot {
  key: number | null;
  val: number | null;
  state: 'EMPTY' | 'OCCUPIED' | 'DELETED';
}

export const Chapter8Visualizer: React.FC<Props> = ({ topic }) => {
  const isCollisions = topic.id === 'top-802';
  const isPerformance = topic.id === 'top-803';

  // ==========================================
  // TOPIC 1: FUNDAMENTAL HASH TABLE CANVAS
  // ==========================================
  const [tableSize] = useState<number>(10);
  const [fundKey, setFundKey] = useState<number>(25);
  const [fundTable, setFundTable] = useState<(number | null)[]>([
    null, null, 12, null, 34, 25, null, null, null, 89
  ]);
  const [lastHashedIdx, setLastHashedIdx] = useState<number | null>(5);
  const [calculationLog, setCalculationLog] = useState<string>('h(25) = 25 % 10 = 5 -> Placed in Slot [5]');

  const handleFundInsert = () => {
    if (fundKey === null || isNaN(fundKey)) return;
    const idx = ((fundKey % tableSize) + tableSize) % tableSize;
    const updated = [...fundTable];
    updated[idx] = fundKey;
    setFundTable(updated);
    setLastHashedIdx(idx);
    setCalculationLog(`h(${fundKey}) = ${fundKey} % ${tableSize} = ${idx} -> Assigned to Table Slot [${idx}]`);
    setFundKey(fundKey + 11);
  };

  // ==========================================
  // TOPIC 2: COLLISION RESOLUTION CANVAS
  // ==========================================
  const [collisionMethod, setCollisionMethod] = useState<'chaining' | 'probing'>('chaining');
  const [collisionKey, setCollisionKey] = useState<number>(28);
  const [chainBuckets, setChainBuckets] = useState<ChainNode[][]>([
    [{ key: 14, val: 140 }, { key: 21, val: 210 }],
    [{ key: 15, val: 150 }],
    [],
    [{ key: 31, val: 310 }],
    [],
    [],
    []
  ]);
  const [probeSlots, setProbeSlots] = useState<ProbeSlot[]>([
    { key: 14, val: 140, state: 'OCCUPIED' },
    { key: 21, val: 210, state: 'OCCUPIED' },
    { key: 28, val: 280, state: 'OCCUPIED' },
    { key: 15, val: 150, state: 'OCCUPIED' },
    { key: null, val: null, state: 'EMPTY' },
    { key: null, val: null, state: 'EMPTY' },
    { key: null, val: null, state: 'EMPTY' }
  ]);
  const [collisionLog, setCollisionLog] = useState<string>('');

  const handleCollisionInsert = () => {
    const m = 7;
    const h = ((collisionKey % m) + m) % m;

    if (collisionMethod === 'chaining') {
      const updated = chainBuckets.map((b) => [...b]);
      updated[h].unshift({ key: collisionKey, val: collisionKey * 10 });
      setChainBuckets(updated);
      setCollisionLog(
        `Separate Chaining: Key ${collisionKey} hashed to Slot [${h}]. Prepend node to head of Bucket [${h}] chain.`
      );
    } else {
      // Linear Probing
      const updated = [...probeSlots];
      let placed = false;
      const probeSeq: number[] = [];

      for (let i = 0; i < m; i++) {
        const idx = (h + i) % m;
        probeSeq.push(idx);
        if (updated[idx].state !== 'OCCUPIED') {
          updated[idx] = { key: collisionKey, val: collisionKey * 10, state: 'OCCUPIED' };
          placed = true;
          setCollisionLog(
            `Linear Probing: Key ${collisionKey} initially hashed to [${h}]. Probed sequence [${probeSeq.join(' -> ')}] -> Placed in available slot [${idx}].`
          );
          break;
        }
      }
      if (placed) {
        setProbeSlots(updated);
      } else {
        setCollisionLog(`Table Full! All ${m} slots occupied under linear probing.`);
      }
    }
    setCollisionKey(collisionKey + 7); // Generates repeated collisions on mod 7
  };

  // ==========================================
  // TOPIC 3: DYNAMIC RESIZING / REHASHING CANVAS
  // ==========================================
  const [dynCap, setDynCap] = useState<number>(4);
  const [dynItems, setDynItems] = useState<{ key: number; val: number }[]>([
    { key: 10, val: 100 },
    { key: 20, val: 200 },
    { key: 30, val: 300 }
  ]);
  const [dynKeyInput, setDynKeyInput] = useState<number>(40);
  const [rehashMessage, setRehashMessage] = useState<string>('');

  const dynLoadFactor = dynItems.length / dynCap;

  const handleDynInsert = () => {
    let currentCap = dynCap;
    let message = '';
    const newCount = dynItems.length + 1;

    if (newCount / currentCap >= 0.75) {
      currentCap = currentCap * 2;
      setDynCap(currentCap);
      message = `Load Factor reached ${(newCount / (currentCap / 2)).toFixed(2)} >= 0.75! Rehash triggered: Capacity doubled to ${currentCap} slots.`;
    } else {
      message = `Inserted Key ${dynKeyInput}. Load factor now ${(newCount / currentCap).toFixed(2)}.`;
    }

    setDynItems([...dynItems, { key: dynKeyInput, val: dynKeyInput * 10 }]);
    setRehashMessage(message);
    setDynKeyInput(dynKeyInput + 10);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Visualizer Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
              {isPerformance ? 'Dynamic Rehashing Simulator' : isCollisions ? 'Collision Resolution Lab' : 'Direct Hash Architecture'}
            </span>
            <span className="text-xs text-slate-400 font-mono">Interactive Memory Grid</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            {isPerformance
              ? 'Load Factor Scaling & Dynamic Table Rehashing'
              : isCollisions
              ? 'Separate Chaining vs Open Addressing Probing'
              : 'Direct Modulo Mapping & Slot Occupancy'}
          </h2>
        </div>

        {/* Global Reset */}
        <button
          onClick={() => {
            setFundTable([null, null, 12, null, 34, 25, null, null, null, 89]);
            setFundKey(25);
            setLastHashedIdx(5);
            setCalculationLog('Reset to default initial state.');
            setChainBuckets([[{ key: 14, val: 140 }, { key: 21, val: 210 }], [{ key: 15, val: 150 }], [], [{ key: 31, val: 310 }], [], [], []]);
            setProbeSlots([
              { key: 14, val: 140, state: 'OCCUPIED' },
              { key: 21, val: 210, state: 'OCCUPIED' },
              { key: 28, val: 280, state: 'OCCUPIED' },
              { key: 15, val: 150, state: 'OCCUPIED' },
              { key: null, val: null, state: 'EMPTY' },
              { key: null, val: null, state: 'EMPTY' },
              { key: null, val: null, state: 'EMPTY' }
            ]);
            setCollisionLog('');
            setDynCap(4);
            setDynItems([{ key: 10, val: 100 }, { key: 20, val: 200 }, { key: 30, val: 300 }]);
            setDynKeyInput(40);
            setRehashMessage('');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Lab</span>
        </button>
      </div>

      {/* TOPIC 1: FUNDAMENTAL HASH TABLE CANVAS */}
      {!isCollisions && !isPerformance && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">Insert Key:</span>
              <input
                type="number"
                value={fundKey}
                onChange={(e) => setFundKey(Number(e.target.value))}
                className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-cyan-300 font-mono"
              />
              <button
                onClick={handleFundInsert}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg shadow-cyan-glow transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Compute & Insert</span>
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Table Size m = <span className="text-cyan-300 font-bold">10</span> | Formula: <span className="text-amber-300">h(k) = k % 10</span>
            </div>
          </div>

          {/* Real-time Math Pipeline Output */}
          <div className="p-3.5 bg-cyan-950/30 border border-cyan-500/30 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-300">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{calculationLog}</span>
          </div>

          {/* Table Slots Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
            {fundTable.map((val, idx) => {
              const isTarget = lastHashedIdx === idx;
              const isOccupied = val !== null;

              return (
                <motion.div
                  key={`slot-${idx}`}
                  animate={isTarget ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-between gap-2 min-h-[90px] font-mono text-xs shadow-md transition-colors ${
                    isTarget
                      ? 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-500/30 text-white'
                      : isOccupied
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-600'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 font-bold">Slot [{idx}]</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isOccupied
                        ? isTarget
                          ? 'bg-cyan-500 text-slate-950 shadow-cyan-glow'
                          : 'bg-slate-800 text-cyan-300 border border-slate-700'
                        : 'border border-dashed border-slate-800 text-slate-700 text-[10px]'
                    }`}
                  >
                    {isOccupied ? val : 'Ø'}
                  </div>
                  <span
                    className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                      isOccupied ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-600'
                    }`}
                  >
                    {isOccupied ? 'Occupied' : 'Empty'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TOPIC 2: COLLISION RESOLUTION CANVAS */}
      {isCollisions && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono mr-2">Strategy:</span>
              <button
                onClick={() => setCollisionMethod('chaining')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  collisionMethod === 'chaining'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Separate Chaining
              </button>
              <button
                onClick={() => setCollisionMethod('probing')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  collisionMethod === 'probing'
                    ? 'bg-blue-600 text-white font-bold shadow-blue-glow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Linear Probing
              </button>
            </div>

            {/* Insert Trigger */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Key:</span>
              <input
                type="number"
                value={collisionKey}
                onChange={(e) => setCollisionKey(Number(e.target.value))}
                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-sm text-cyan-300 font-mono"
              />
              <button
                onClick={handleCollisionInsert}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold rounded-lg shadow-cyan-glow transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simulate Insert</span>
              </button>
            </div>
          </div>

          {/* Operation Trace Log */}
          {collisionLog && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-300"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{collisionLog}</span>
            </motion.div>
          )}

          {/* Separate Chaining Visualizer */}
          {collisionMethod === 'chaining' && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-xs font-mono text-slate-400 block mb-2">
                Table Array (m = 7) with Attached Singly Linked Lists:
              </span>
              <div className="space-y-2.5">
                {chainBuckets.map((bucket, bIdx) => (
                  <div key={`bucket-${bIdx}`} className="flex items-center gap-2 font-mono text-xs overflow-x-auto py-1">
                    <div className="w-20 px-2 py-1.5 bg-slate-900 border border-slate-700 text-cyan-400 font-bold rounded text-center shrink-0">
                      Slot [{bIdx}]
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

                    {bucket.length === 0 ? (
                      <span className="text-slate-600 italic text-[11px]">NULL (Empty Bucket)</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        {bucket.map((node, nIdx) => (
                          <React.Fragment key={`node-${bIdx}-${nIdx}`}>
                            <div className="px-3 py-1.5 bg-slate-900 border border-cyan-500/40 text-slate-200 rounded-lg shadow-sm flex items-center gap-1.5 shrink-0">
                              <span className="text-cyan-300 font-bold">{node.key}</span>
                              <span className="text-slate-500 text-[10px]">| next</span>
                            </div>
                            <ArrowRight className="w-3 h-3 text-cyan-500 shrink-0" />
                          </React.Fragment>
                        ))}
                        <span className="text-slate-500 font-bold text-[11px]">NULL</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Linear Probing Visualizer */}
          {collisionMethod === 'probing' && (
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <span className="text-xs font-mono text-slate-400 block mb-2">
                Open Addressing Array Slots (m = 7):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
                {probeSlots.map((slot, sIdx) => (
                  <div
                    key={`slot-prob-${sIdx}`}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-between gap-1.5 min-h-[90px] font-mono text-xs ${
                      slot.state === 'OCCUPIED'
                        ? 'bg-slate-900 border-blue-500/40 text-slate-200 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-600'
                    }`}
                  >
                    <span className="text-[10px] text-slate-500 font-bold">Slot [{sIdx}]</span>
                    <span
                      className={`text-base font-bold ${
                        slot.state === 'OCCUPIED' ? 'text-blue-300' : 'text-slate-700'
                      }`}
                    >
                      {slot.state === 'OCCUPIED' ? slot.key : '—'}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${
                        slot.state === 'OCCUPIED'
                          ? 'bg-blue-500/10 text-blue-400'
                          : 'bg-slate-900 text-slate-600'
                      }`}
                    >
                      {slot.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOPIC 3: DYNAMIC REHASHING CANVAS */}
      {isPerformance && (
        <div className="space-y-6">
          {/* Controls Bar & Load Factor Indicator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={dynKeyInput}
                onChange={(e) => setDynKeyInput(Number(e.target.value))}
                className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-cyan-300 font-mono"
              />
              <button
                onClick={handleDynInsert}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold rounded-lg shadow-cyan-glow transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Insert & Watch Load</span>
              </button>
            </div>

            {/* Load Factor Gauge */}
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Load Factor (alpha = n / m):</span>
                <span
                  className={`font-bold ${
                    dynLoadFactor >= 0.75 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {dynLoadFactor.toFixed(2)} ({dynItems.length} / {dynCap} slots)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    dynLoadFactor >= 0.75
                      ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                  }`}
                  animate={{ width: `${Math.min(100, dynLoadFactor * 100)}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>

          {/* Rehash Event Notification */}
          {rehashMessage && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl flex items-center gap-2 text-xs font-mono text-purple-300"
            >
              <Maximize2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>{rehashMessage}</span>
            </motion.div>
          )}

          {/* Rehashed Slots Rendering */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Current Hash Table Grid (Capacity: {dynCap} slots):</span>
              <span className="text-cyan-400 font-bold">h(k) = k % {dynCap}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
              {Array.from({ length: dynCap }).map((_, slotIdx) => {
                const matchedItem = dynItems.find(
                  (item) => ((item.key % dynCap) + dynCap) % dynCap === slotIdx
                );

                return (
                  <div
                    key={`dyn-slot-${slotIdx}`}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-between min-h-[75px] font-mono text-xs ${
                      matchedItem
                        ? 'bg-slate-900 border-cyan-500/40 text-cyan-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-700'
                    }`}
                  >
                    <span className="text-[10px] text-slate-500 font-bold">[{slotIdx}]</span>
                    <span className="text-sm font-bold">
                      {matchedItem ? matchedItem.key : '—'}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {matchedItem ? `Val: ${matchedItem.val}` : 'EMPTY'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Engineering Rule of Thumb */}
      <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-300">
          <p className="font-semibold text-slate-200">Engineering Rule of Thumb</p>
          <p className="text-slate-400">
            For open addressing, the table must be dynamically doubled before the load factor exceeds{' '}
            <span className="text-amber-300 font-bold">0.75</span>. Beyond this threshold, average probe lengths skyrocket exponentially, eroding O(1) efficiency into linear scans.
          </p>
        </div>
      </div>
    </div>
  );
};
