import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Eye,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
import { TopicData } from './chapter4Data';

interface Props {
  topic: TopicData;
}

export const Chapter4Visualizer: React.FC<Props> = ({ topic }) => {
  // Speed controller
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ==========================================
  // TOPIC 1: STACK ADT STATE
  // ==========================================
  const STACK_MAX = 5;
  const [stackItems, setStackItems] = useState<number[]>([10, 20]);
  const [stackPushVal, setStackPushVal] = useState<number>(30);
  const [stackAlert, setStackAlert] = useState<string | null>(null);
  const [peekActive, setPeekActive] = useState<boolean>(false);
  const [stackStepDesc, setStackStepDesc] = useState<string>(
    'Stack initialized with 2 elements. TOP points to index [1].'
  );

  const handleStackPush = () => {
    setPeekActive(false);
    if (stackItems.length >= STACK_MAX) {
      setStackAlert('STACK OVERFLOW: Maximum capacity of 5 elements reached!');
      setStackStepDesc('Error: Stack Overflow! Cannot push into a full stack.');
      return;
    }
    setStackAlert(null);
    const newItems = [...stackItems, stackPushVal];
    setStackItems(newItems);
    setStackStepDesc(`Pushed ${stackPushVal} onto TOP (index [${newItems.length - 1}]).`);
    setStackPushVal((prev) => prev + 10);
  };

  const handleStackPop = () => {
    setPeekActive(false);
    if (stackItems.length === 0) {
      setStackAlert('STACK UNDERFLOW: Cannot pop from an empty stack!');
      setStackStepDesc('Error: Stack Underflow! Attempted to pop when TOP = -1.');
      return;
    }
    setStackAlert(null);
    const popped = stackItems[stackItems.length - 1];
    const newItems = stackItems.slice(0, -1);
    setStackItems(newItems);
    setStackStepDesc(
      `Popped ${popped} from TOP. New TOP is index [${newItems.length - 1}].`
    );
  };

  const handleStackPeek = () => {
    if (stackItems.length === 0) {
      setStackAlert('STACK UNDERFLOW: Cannot peek an empty stack!');
      return;
    }
    setStackAlert(null);
    setPeekActive(true);
    setStackStepDesc(
      `Peek inspection: Topmost element is ${stackItems[stackItems.length - 1]} at index [${stackItems.length - 1}].`
    );
    setTimeout(() => setPeekActive(false), 1500);
  };

  const resetStack = () => {
    setIsPlaying(false);
    setStackItems([10, 20]);
    setStackPushVal(30);
    setStackAlert(null);
    setPeekActive(false);
    setStackStepDesc('Stack reset to initial state with 2 elements.');
  };

  // ==========================================
  // TOPIC 2: EXPRESSION & RECURSION STATE
  // ==========================================
  const [exprMode, setExprMode] = useState<'shunting-yard' | 'recursion-callstack'>('shunting-yard');

  // Mode A: Shunting-Yard Infix to Postfix
  // Expression: A + B * C
  const shuntingSteps = [
    { token: 'Start', stack: [], output: '', desc: 'Shunting-Yard scanner initialized. Expression: A + B * C' },
    { token: 'A', stack: [], output: 'A', desc: 'Scanned operand "A". Appended directly to output.' },
    { token: '+', stack: ['+'], output: 'A', desc: 'Scanned operator "+". Operator stack is empty -> pushed "+".' },
    { token: 'B', stack: ['+'], output: 'A B', desc: 'Scanned operand "B". Appended directly to output.' },
    { token: '*', stack: ['+', '*'], output: 'A B', desc: 'Scanned "*". Precedence(*) > Precedence(+) -> pushed "*" above "+".' },
    { token: 'C', stack: ['+', '*'], output: 'A B C', desc: 'Scanned operand "C". Appended directly to output.' },
    { token: 'Flush 1', stack: ['+'], output: 'A B C *', desc: 'End of expression. Popped operator "*" to output.' },
    { token: 'Flush 2', stack: [], output: 'A B C * +', desc: 'Popped remaining operator "+" to output. Conversion Complete!' }
  ];
  const [shuntingIdx, setShuntingIdx] = useState<number>(0);

  // Mode B: Recursion Call Stack (Factorial 3)
  const recursionSteps = [
    { frame: 'Initial', stack: [], desc: 'Call factorial(3) from main().' },
    { frame: 'fact(3)', stack: ['fact(3): n=3 (waiting for fact(2))'], desc: 'Pushed frame fact(3) onto Call Stack. Calls fact(2).' },
    { frame: 'fact(2)', stack: ['fact(3): n=3 (waiting for fact(2))', 'fact(2): n=2 (waiting for fact(1))'], desc: 'Pushed frame fact(2) onto Call Stack. Calls fact(1).' },
    { frame: 'fact(1)', stack: ['fact(3): n=3 (waiting for fact(2))', 'fact(2): n=2 (waiting for fact(1))', 'fact(1): n=1 (BASE CASE reached: returns 1)'], desc: 'BASE CASE HIT (n <= 1). fact(1) returns 1. Call stack unwinds.' },
    { frame: 'Unwind 1', stack: ['fact(3): n=3 (waiting for fact(2))', 'fact(2) returned: 2 * 1 = 2'], desc: 'fact(1) popped. fact(2) computes 2 * 1 = 2 and returns 2.' },
    { frame: 'Unwind 2', stack: ['fact(3) returned: 3 * 2 = 6'], desc: 'fact(2) popped. fact(3) computes 3 * 2 = 6 and returns 6.' },
    { frame: 'Complete', stack: [], desc: 'All frames popped. Final result = 6 returned to main().' }
  ];
  const [recursionIdx, setRecursionIdx] = useState<number>(0);

  // ==========================================
  // TOPIC 3: QUEUE ADT STATE (Linear vs Circular)
  // ==========================================
  const QUEUE_MAX = 5;
  const [queueMode, setQueueMode] = useState<'circular' | 'linear'>('circular');
  const [queueData, setQueueData] = useState<(number | null)[]>([10, 20, null, null, null]);
  const [qFront, setQFront] = useState<number>(0);
  const [qRear, setQRear] = useState<number>(1);
  const [qEnqueueVal, setQEnqueueVal] = useState<number>(30);
  const [qAlert, setQAlert] = useState<string | null>(null);
  const [qStepDesc, setQStepDesc] = useState<string>(
    'Circular Queue ready. FRONT at index [0], REAR at index [1].'
  );

  const handleQueueEnqueue = () => {
    setQAlert(null);
    if (queueMode === 'circular') {
      const nextRear = (qRear + 1) % QUEUE_MAX;
      if (qFront !== -1 && nextRear === qFront) {
        setQAlert('CIRCULAR QUEUE OVERFLOW: (rear + 1) % MAX == front. Queue is full!');
        setQStepDesc('Queue Overflow: Cannot enqueue into full circular ring buffer.');
        return;
      }
      const newArr = [...queueData];
      let newFront = qFront;
      if (newFront === -1) newFront = 0;
      newArr[nextRear] = qEnqueueVal;
      setQueueData(newArr);
      setQFront(newFront);
      setQRear(nextRear);
      setQStepDesc(`[Enqueue]: Inserted ${qEnqueueVal} at index [${nextRear}] (rear wrapped/advanced).`);
      setQEnqueueVal((prev) => prev + 10);
    } else {
      // Linear Queue
      if (qRear >= QUEUE_MAX - 1) {
        setQAlert(
          'LINEAR QUEUE FALSE-OVERFLOW: rear == MAX - 1! Even if front > 0, linear array cannot accept items.'
        );
        setQStepDesc('Linear Queue False Overflow! Slots before FRONT are wasted.');
        return;
      }
      const nextRear = qRear + 1;
      const newArr = [...queueData];
      let newFront = qFront;
      if (newFront === -1) newFront = 0;
      newArr[nextRear] = qEnqueueVal;
      setQueueData(newArr);
      setQFront(newFront);
      setQRear(nextRear);
      setQStepDesc(`[Linear Enqueue]: Inserted ${qEnqueueVal} at index [${nextRear}].`);
      setQEnqueueVal((prev) => prev + 10);
    }
  };

  const handleQueueDequeue = () => {
    setQAlert(null);
    if (qFront === -1) {
      setQAlert('QUEUE UNDERFLOW: Cannot dequeue from an empty queue!');
      setQStepDesc('Queue Underflow: Queue is empty (FRONT = -1).');
      return;
    }

    const val = queueData[qFront];
    const newArr = [...queueData];
    newArr[qFront] = null; // Blank out slot visually
    setQueueData(newArr);

    if (qFront === qRear) {
      // Last item removed
      setQFront(-1);
      setQRear(-1);
      setQStepDesc(`[Dequeue]: Removed ${val}. Queue has become completely empty (reset to -1).`);
    } else {
      const nextFront = queueMode === 'circular' ? (qFront + 1) % QUEUE_MAX : qFront + 1;
      setQFront(nextFront);
      setQStepDesc(`[Dequeue]: Removed ${val}. FRONT advanced to index [${nextFront}].`);
    }
  };

  const resetQueue = () => {
    setIsPlaying(false);
    setQueueData([10, 20, null, null, null]);
    setQFront(0);
    setQRear(1);
    setQEnqueueVal(30);
    setQAlert(null);
    setQStepDesc('Queue reset to initial state with 2 elements.');
  };

  // Step Forward dispatcher
  const stepForward = () => {
    if (topic.id === 'top-401') {
      handleStackPush();
    } else if (topic.id === 'top-402') {
      if (exprMode === 'shunting-yard') {
        if (shuntingIdx < shuntingSteps.length - 1) {
          setShuntingIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      } else {
        if (recursionIdx < recursionSteps.length - 1) {
          setRecursionIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }
    } else if (topic.id === 'top-403') {
      handleQueueEnqueue();
    }
  };

  const resetAll = () => {
    if (topic.id === 'top-401') resetStack();
    else if (topic.id === 'top-402') {
      setShuntingIdx(0);
      setRecursionIdx(0);
      setIsPlaying(false);
    } else if (topic.id === 'top-403') resetQueue();
  };

  // Auto-play interval effect
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
  }, [isPlaying, speed, topic.id, exprMode, shuntingIdx, recursionIdx, stackItems, qFront, qRear]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Control Console Header */}
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
              Real-time state transitions, pointer tracking, and memory boundary simulator
            </p>
          </div>
        </div>

        {/* Action Controls */}
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

      {/* Main Visualizer Container */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* 1. STACK VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-401' && (
          <div className="space-y-6 my-auto">
            {/* Stack Action Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">Push Value:</span>
                <input
                  type="number"
                  value={stackPushVal}
                  onChange={(e) => setStackPushVal(parseInt(e.target.value) || 0)}
                  className="w-20 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleStackPush}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-cyan-glow transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Push</span>
                </button>
                <button
                  onClick={handleStackPop}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-xs hover:bg-rose-500/30 transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>Pop</span>
                </button>
                <button
                  onClick={handleStackPeek}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs hover:bg-slate-750 transition-all"
                >
                  Peek TOP
                </button>
              </div>

              <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
                <span>
                  TOP Index: <strong className="text-cyan-400">{stackItems.length - 1}</strong>
                </span>
                <span>
                  Occupancy: <strong className="text-white">{stackItems.length} / {STACK_MAX}</strong>
                </span>
              </div>
            </div>

            {/* Alert banner if overflow or underflow */}
            {stackAlert && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{stackAlert}</span>
              </div>
            )}

            {/* Vertical Stack Presentation */}
            <div className="flex justify-center items-center py-4">
              <div className="w-72 border-b-4 border-l-4 border-r-4 border-slate-700 rounded-b-2xl p-3 flex flex-col-reverse gap-2 bg-slate-950/60 shadow-2xl relative min-h-[260px] justify-start">
                {Array.from({ length: STACK_MAX }, (_, idx) => {
                  const item = stackItems[idx];
                  const isTop = idx === stackItems.length - 1 && item !== undefined;
                  const isPeeked = isTop && peekActive;

                  return (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`h-12 rounded-xl flex items-center justify-between px-4 font-mono font-bold text-sm border-2 transition-all ${
                        isPeeked
                          ? 'bg-amber-500/30 text-amber-300 border-amber-400 shadow-amber-glow animate-pulse'
                          : isTop
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-cyan-glow'
                          : item !== undefined
                          ? 'bg-slate-900 text-slate-200 border-slate-700'
                          : 'border-dashed border-slate-800 text-slate-600 bg-slate-950/30'
                      }`}
                    >
                      <span className="text-[10px] text-slate-500">[{idx}]</span>
                      <span className="text-base">{item !== undefined ? item : '—'}</span>
                      <span className="text-[10px] font-mono">
                        {isTop ? (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-extrabold uppercase">
                            TOP
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. EXPRESSION PROCESSING & RECURSION VISUALIZATION */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-402' && (
          <div className="space-y-6 my-auto">
            {/* Mode Selector */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Simulation Mode:</span>
                <button
                  onClick={() => {
                    setExprMode('shunting-yard');
                    setShuntingIdx(0);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    exprMode === 'shunting-yard'
                      ? 'bg-cyan-500 text-slate-950 shadow-cyan-glow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Infix → Postfix (Shunting-Yard)
                </button>
                <button
                  onClick={() => {
                    setExprMode('recursion-callstack');
                    setRecursionIdx(0);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    exprMode === 'recursion-callstack'
                      ? 'bg-purple-500 text-white shadow-purple-glow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Call Stack Recursion: fact(3)
                </button>
              </div>

              <div className="text-cyan-400 font-bold">
                Step {exprMode === 'shunting-yard' ? shuntingIdx + 1 : recursionIdx + 1} of{' '}
                {exprMode === 'shunting-yard' ? shuntingSteps.length : recursionSteps.length}
              </div>
            </div>

            {/* Mode A: Shunting-Yard Conversion */}
            {exprMode === 'shunting-yard' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Infix Expression Tokens */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-slate-400 block uppercase">
                    Infix Expression Tokens:
                  </span>
                  <div className="flex items-center gap-2 text-sm font-mono font-bold">
                    {['A', '+', 'B', '*', 'C'].map((tok, idx) => {
                      const isCurrent =
                        (tok === 'A' && shuntingIdx === 1) ||
                        (tok === '+' && shuntingIdx === 2) ||
                        (tok === 'B' && shuntingIdx === 3) ||
                        (tok === '*' && shuntingIdx === 4) ||
                        (tok === 'C' && shuntingIdx === 5);

                      return (
                        <div
                          key={idx}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                            isCurrent
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-glow scale-110'
                              : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {tok}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Operator Stack */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 block uppercase font-bold">
                    Operator Stack (LIFO):
                  </span>
                  <div className="border-b-2 border-l-2 border-r-2 border-slate-700 rounded-b-xl p-2 flex flex-col-reverse gap-1.5 min-h-[90px] justify-start bg-slate-900/60">
                    {shuntingSteps[shuntingIdx].stack.length > 0 ? (
                      shuntingSteps[shuntingIdx].stack.map((op, idx) => (
                        <div
                          key={idx}
                          className="h-8 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400 flex items-center justify-center font-mono font-bold text-xs"
                        >
                          {op} {idx === shuntingSteps[shuntingIdx].stack.length - 1 ? '(TOP)' : ''}
                        </div>
                      ))
                    ) : (
                      <span className="text-center text-slate-600 text-[11px] font-mono my-auto">
                        [ Stack Empty ]
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Output Postfix Stream */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-emerald-400 block uppercase font-bold">
                    Generated Postfix Output:
                  </span>
                  <div className="h-[90px] rounded-xl bg-slate-900/90 border border-slate-800 p-3 font-mono font-bold text-base text-emerald-300 flex items-center justify-center shadow-inner tracking-widest">
                    {shuntingSteps[shuntingIdx].output || '<empty>'}
                  </div>
                </div>
              </div>
            )}

            {/* Mode B: Recursion Call Stack */}
            {exprMode === 'recursion-callstack' && (
              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-400 font-bold uppercase">
                    Operating System Thread Call Stack (Activation Records):
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Depth: {recursionSteps[recursionIdx].stack.length} frames
                  </span>
                </div>

                <div className="border-b-4 border-l-4 border-r-4 border-slate-700 rounded-b-2xl p-4 flex flex-col-reverse gap-2 min-h-[160px] justify-start bg-slate-900/40">
                  {recursionSteps[recursionIdx].stack.length > 0 ? (
                    recursionSteps[recursionIdx].stack.map((frame, idx) => (
                      <motion.div
                        key={idx}
                        layout
                        className="p-3 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-400 font-mono text-xs flex items-center justify-between shadow-lg"
                      >
                        <span>{frame}</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500 text-slate-950">
                          Frame #{idx + 1}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <span className="text-center text-slate-600 font-mono text-xs my-auto">
                      [ Call Stack Idle — No Active Frames ]
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. QUEUE VISUALIZATION (Linear & Circular) */}
        {/* ------------------------------------------------------------- */}
        {topic.id === 'top-403' && (
          <div className="space-y-6 my-auto">
            {/* Queue Mode & Action Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                {/* Circular vs Linear Switcher */}
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => {
                      setQueueMode('circular');
                      resetQueue();
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      queueMode === 'circular'
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Circular Ring Buffer
                  </button>
                  <button
                    onClick={() => {
                      setQueueMode('linear');
                      resetQueue();
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      queueMode === 'linear'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Linear Queue
                  </button>
                </div>

                <input
                  type="number"
                  value={qEnqueueVal}
                  onChange={(e) => setQEnqueueVal(parseInt(e.target.value) || 0)}
                  className="w-20 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleQueueEnqueue}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-cyan-glow transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enqueue</span>
                </button>
                <button
                  onClick={handleQueueDequeue}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold text-xs hover:bg-rose-500/30 transition-all"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>Dequeue</span>
                </button>
              </div>

              {/* Pointer Badges */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" /> FRONT = {qFront}
                </span>
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> REAR = {qRear}
                </span>
              </div>
            </div>

            {/* Alert banner */}
            {qAlert && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{qAlert}</span>
              </div>
            )}

            {/* Queue Elements Array Grid */}
            <div className="flex justify-center items-center gap-3 md:gap-5 overflow-x-auto p-4">
              {queueData.map((val, idx) => {
                const isFront = qFront === idx;
                const isRear = qRear === idx;
                const hasValue = val !== null;

                return (
                  <div key={idx} className="flex flex-col items-center relative">
                    <span className="text-[11px] font-mono text-slate-500 mb-1">[{idx}]</span>

                    <motion.div
                      layout
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-mono font-extrabold text-base md:text-lg border-2 transition-all shadow-xl ${
                        hasValue
                          ? 'bg-slate-900 text-white border-slate-700'
                          : 'border-dashed border-slate-800 text-slate-600 bg-slate-950/40'
                      }`}
                    >
                      {hasValue ? val : '—'}
                    </motion.div>

                    {/* FRONT & REAR Indicators */}
                    <div className="h-10 mt-2 flex flex-col items-center justify-start gap-0.5 text-[10px] font-mono font-bold">
                      {isFront && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          FRONT
                        </span>
                      )}
                      {isRear && (
                        <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                          REAR
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Telemetry Status Bar */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300">
              {topic.id === 'top-401'
                ? stackStepDesc
                : topic.id === 'top-402'
                ? exprMode === 'shunting-yard'
                  ? shuntingSteps[shuntingIdx].desc
                  : recursionSteps[recursionIdx].desc
                : qStepDesc}
            </span>
          </div>

          <span className="text-slate-500 text-[11px]">
            Chapter 4 Visual Engine • Hardware Mode
          </span>
        </div>
      </div>
    </div>
  );
};
