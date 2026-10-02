import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Eye,
  Plus,
  Trash2,
  ArrowRight,
  ArrowDown,
  Layers,
  CheckCircle2,
  Network
} from 'lucide-react';
import { TopicData } from './chapter6Data';

interface Props {
  topic: TopicData;
}

interface StackNode {
  id: number;
  val: number;
  addr: string;
}

interface QueueNode {
  id: number;
  val: number;
  addr: string;
}

export const Chapter6Visualizer: React.FC<Props> = ({ topic }) => {
  // -------------------------------------------------------------
  // TOPIC 601: LINKED STACK STATE
  // -------------------------------------------------------------
  const [stackNodes, setStackNodes] = useState<StackNode[]>([
    { id: 1, val: 30, addr: '0x3090' },
    { id: 2, val: 20, addr: '0x2050' },
    { id: 3, val: 10, addr: '0x10A0' }
  ]);
  const [stackInput, setStackInput] = useState<number>(40);
  const [peekedStack, setPeekedStack] = useState<boolean>(false);
  const [stackLog, setStackLog] = useState<string>(
    'Linked Stack initialized. TOP references node [30] at address 0x3090.'
  );

  const handleStackPush = () => {
    const newAddr = '0x' + (Math.floor(Math.random() * 0x8fff) + 0x1000).toString(16).toUpperCase();
    const newNode: StackNode = { id: Date.now(), val: stackInput, addr: newAddr };
    setStackNodes([newNode, ...stackNodes]);
    setPeekedStack(false);
    setStackLog(
      `push(&top, ${stackInput}): Node allocated at ${newAddr}. newNode->next = TOP; TOP = ${newAddr}. [O(1) Time]`
    );
    setStackInput(Math.floor(Math.random() * 80) + 10);
  };

  const handleStackPop = () => {
    if (stackNodes.length === 0) {
      setStackLog('Stack Underflow! Attempted to pop from empty stack (TOP == NULL).');
      return;
    }
    const removed = stackNodes[0];
    setStackNodes(stackNodes.slice(1));
    setPeekedStack(false);
    setStackLog(
      `pop(&top): Popped value ${removed.val} from ${removed.addr}. TOP = TOP->next; free(${removed.addr}). [O(1) Time]`
    );
  };

  const handleStackPeek = () => {
    if (stackNodes.length === 0) {
      setStackLog('Cannot peek: Stack is empty (TOP == NULL).');
      return;
    }
    setPeekedStack(true);
    setStackLog(`peek(top): Top node is [${stackNodes[0].val}] at ${stackNodes[0].addr}. No removal performed.`);
  };

  const handleResetStack = () => {
    setStackNodes([
      { id: 1, val: 30, addr: '0x3090' },
      { id: 2, val: 20, addr: '0x2050' },
      { id: 3, val: 10, addr: '0x10A0' }
    ]);
    setPeekedStack(false);
    setStackLog('Linked Stack reset to initial 3-element state.');
  };

  // -------------------------------------------------------------
  // TOPIC 602: LINKED QUEUE STATE
  // -------------------------------------------------------------
  const [queueNodes, setQueueNodes] = useState<QueueNode[]>([
    { id: 1, val: 10, addr: '0x10A0' },
    { id: 2, val: 20, addr: '0x2050' },
    { id: 3, val: 30, addr: '0x3090' }
  ]);
  const [queueInput, setQueueInput] = useState<number>(40);
  const [peekedQueue, setPeekedQueue] = useState<boolean>(false);
  const [queueLog, setQueueLog] = useState<string>(
    'Linked Queue initialized. FRONT -> [10] at 0x10A0; REAR -> [30] at 0x3090.'
  );

  const handleQueueEnqueue = () => {
    const newAddr = '0x' + (Math.floor(Math.random() * 0x8fff) + 0x1000).toString(16).toUpperCase();
    const newNode: QueueNode = { id: Date.now(), val: queueInput, addr: newAddr };
    if (queueNodes.length === 0) {
      setQueueNodes([newNode]);
      setQueueLog(
        `enqueue(q, ${queueInput}): Queue was empty! front = rear = ${newAddr}; newNode->next = NULL. [O(1) Time]`
      );
    } else {
      setQueueNodes([...queueNodes, newNode]);
      setQueueLog(
        `enqueue(q, ${queueInput}): Appended at REAR. rear->next = ${newAddr}; rear = ${newAddr}. [O(1) Time]`
      );
    }
    setPeekedQueue(false);
    setQueueInput(Math.floor(Math.random() * 80) + 10);
  };

  const handleQueueDequeue = () => {
    if (queueNodes.length === 0) {
      setQueueLog('Queue Underflow! Attempted to dequeue from empty queue (FRONT == NULL).');
      return;
    }
    const removed = queueNodes[0];
    const remaining = queueNodes.slice(1);
    setQueueNodes(remaining);
    setPeekedQueue(false);

    if (remaining.length === 0) {
      setQueueLog(
        `dequeue(q): Dequeued ${removed.val}. SINGLE-NODE EDGE CASE TRIGGERED: front became NULL, so rear was also set to NULL to prevent dangling pointers! [O(1) Time]`
      );
    } else {
      setQueueLog(
        `dequeue(q): Dequeued ${removed.val} from FRONT (${removed.addr}). FRONT = FRONT->next; free(${removed.addr}). [O(1) Time]`
      );
    }
  };

  const handleQueuePeek = () => {
    if (queueNodes.length === 0) {
      setQueueLog('Cannot peek: Queue is empty (FRONT == NULL).');
      return;
    }
    setPeekedQueue(true);
    setQueueLog(`peek(q): Front node is [${queueNodes[0].val}] at ${queueNodes[0].addr}.`);
  };

  const handleResetQueue = () => {
    setQueueNodes([
      { id: 1, val: 10, addr: '0x10A0' },
      { id: 2, val: 20, addr: '0x2050' },
      { id: 3, val: 30, addr: '0x3090' }
    ]);
    setPeekedQueue(false);
    setQueueLog('Linked Queue reset to initial 3-element state.');
  };

  // -------------------------------------------------------------
  // TOPIC 603: APPLICATIONS STATE
  // -------------------------------------------------------------
  const [appMode, setAppMode] = useState<'poly' | 'graph' | 'hash'>('poly');
  const [polySumCalculated, setPolySumCalculated] = useState<boolean>(false);
  const [selectedVertex, setSelectedVertex] = useState<number>(0);
  const [hashTable, setHashTable] = useState<string[][]>([
    ['"Alice":92', '"Dan":85'],
    [],
    ['"Bob":78'],
    ['"Carol":99', '"Eve":61']
  ]);
  const [appLog, setAppLog] = useState<string>(
    'Polynomial Representation active: Nodes encode [coefficient | exponent | next].'
  );

  const graphEdges: Record<number, number[]> = {
    0: [1, 2],
    1: [0, 3],
    2: [0],
    3: [1]
  };

  const handleAddHashKey = () => {
    const names = ['Grace', 'Heidi', 'Ivan', 'Judy', 'Mallory', 'Frank'];
    const name = names[Math.floor(Math.random() * names.length)];
    const score = Math.floor(Math.random() * 40) + 60;
    let sum = 0;
    for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    const bucket = sum % 4;

    const newT = [...hashTable];
    newT[bucket] = [`"${name}":${score}`, ...newT[bucket]];
    setHashTable(newT);
    setAppLog(
      `Separate Chaining: hash("${name}") % 4 = Bucket ${bucket}. Prepend new node in O(1) time to bucket ${bucket} singly linked chain.`
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Visualizer Header */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Interactive Algorithmic Simulation</span>
          </div>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Real-Time Pointer Machine
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">
          {topic.id === 'top-601' && 'Linked Stack (LIFO): Dynamic TOP Pointer & Push/Pop Simulator'}
          {topic.id === 'top-602' && 'Linked Queue (FIFO): FRONT & REAR Pointer State Machine'}
          {topic.id === 'top-603' && 'Linked List Applications Laboratory: Polynomials, Graphs & Hash Chaining'}
        </h2>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          Manipulate pointers in real time, observe dynamic heap node allocation, and inspect edge cases such as empty queue pointer neutralization and collision chaining.
        </p>
      </div>

      {/* ============================================================== */}
      {/* TOPIC 1 VISUALIZER: LINKED STACK (LIFO)                        */}
      {/* ============================================================== */}
      {topic.id === 'top-601' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-xs font-mono text-slate-400">Value:</span>
                <input
                  type="number"
                  value={stackInput}
                  onChange={(e) => setStackInput(parseInt(e.target.value) || 0)}
                  className="w-14 bg-transparent text-xs font-mono text-cyan-400 font-bold outline-none"
                />
              </div>

              <button
                onClick={handleStackPush}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>push(&top, val) [O(1)]</span>
              </button>

              <button
                onClick={handleStackPop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>pop(&top) [O(1)]</span>
              </button>

              <button
                onClick={handleStackPeek}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>peek(top) [O(1)]</span>
              </button>
            </div>

            <button
              onClick={handleResetStack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Stack</span>
            </button>
          </div>

          {/* Graphical Vertical Stack Display */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl min-h-[320px] flex flex-col items-center justify-center">
            {/* TOP Pointer Indicator */}
            <div className="flex flex-col items-center gap-1 mb-2">
              <div className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs shadow-cyan-glow flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>TOP {stackNodes.length > 0 ? `(${stackNodes[0].addr})` : '(NULL)'}</span>
              </div>
              <ArrowDown className="w-5 h-5 text-cyan-400 animate-bounce" />
            </div>

            {/* Stack Node Chain */}
            <div className="flex flex-col items-center gap-2">
              <AnimatePresence>
                {stackNodes.map((n, idx) => {
                  const isTop = idx === 0;
                  const isPeeked = isTop && peekedStack;

                  return (
                    <React.Fragment key={n.id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, x: 50 }}
                        transition={{ duration: 0.25 }}
                        className={`w-64 flex rounded-xl overflow-hidden border shadow-lg transition-all ${
                          isPeeked
                            ? 'border-amber-400 ring-2 ring-amber-500/40 bg-amber-500/10'
                            : isTop
                            ? 'border-cyan-500/50 bg-slate-900'
                            : 'border-slate-800 bg-slate-900/70'
                        }`}
                      >
                        <div className="px-4 py-3 bg-slate-900 flex flex-col items-center justify-center border-r border-slate-800 min-w-[80px]">
                          <span className="text-[10px] font-mono text-slate-500">data</span>
                          <span className="text-xl font-bold text-white font-mono">{n.val}</span>
                          <span className="text-[9px] font-mono text-cyan-400">{n.addr}</span>
                        </div>
                        <div className="px-3 py-3 bg-slate-950 flex-1 flex flex-col items-center justify-center">
                          <span className="text-[10px] font-mono text-slate-500">next</span>
                          <span className="text-xs font-mono text-slate-300">
                            {idx < stackNodes.length - 1 ? stackNodes[idx + 1].addr : 'NULL'}
                          </span>
                          <span className="text-[9px] text-slate-500">
                            {idx < stackNodes.length - 1 ? '↓' : 'Bottom of Stack'}
                          </span>
                        </div>
                      </motion.div>
                    </React.Fragment>
                  );
                })}
              </AnimatePresence>

              {stackNodes.length === 0 && (
                <div className="p-6 rounded-xl border border-dashed border-slate-800 text-slate-500 font-mono text-xs text-center space-y-1">
                  <div>Stack is EMPTY (TOP == NULL)</div>
                  <div className="text-[10px] text-slate-600">Zero heap nodes allocated</div>
                </div>
              )}
            </div>
          </div>

          {/* Console / Status Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
            <span className="text-slate-500 uppercase mr-2">[STACK LOG]:</span>
            <span>{stackLog}</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOPIC 2 VISUALIZER: LINKED QUEUE (FIFO)                        */}
      {/* ============================================================== */}
      {topic.id === 'top-602' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-xs font-mono text-slate-400">Value:</span>
                <input
                  type="number"
                  value={queueInput}
                  onChange={(e) => setQueueInput(parseInt(e.target.value) || 0)}
                  className="w-14 bg-transparent text-xs font-mono text-cyan-400 font-bold outline-none"
                />
              </div>

              <button
                onClick={handleQueueEnqueue}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>enqueue(q, val) [O(1)]</span>
              </button>

              <button
                onClick={handleQueueDequeue}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>dequeue(q) [O(1)]</span>
              </button>

              <button
                onClick={handleQueuePeek}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>peek(q) [O(1)]</span>
              </button>
            </div>

            <button
              onClick={handleResetQueue}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Queue</span>
            </button>
          </div>

          {/* Graphical Horizontal Queue Display */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-x-auto min-h-[220px] flex items-center">
            <div className="flex items-center gap-4 mx-auto py-4">
              {/* FRONT Pointer Badge */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs border shadow-lg ${
                    peekedQueue
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 ring-2 ring-amber-500/40'
                      : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  FRONT {queueNodes.length > 0 ? `(${queueNodes[0].addr})` : '(NULL)'}
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 rotate-90 md:rotate-0" />
              </div>

              {/* Chained Nodes */}
              <AnimatePresence>
                {queueNodes.map((n, idx) => (
                  <React.Fragment key={n.id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25 }}
                      className={`flex rounded-xl overflow-hidden border shadow-lg transition-all ${
                        idx === 0 && peekedQueue
                          ? 'border-amber-400 ring-2 ring-amber-500/40'
                          : 'border-slate-700 bg-slate-900/90'
                      }`}
                    >
                      <div className="px-4 py-3 bg-slate-900 flex flex-col items-center border-r border-slate-800 min-w-[70px]">
                        <span className="text-[10px] font-mono text-slate-500">data</span>
                        <span className="text-lg font-bold text-slate-100 font-mono">{n.val}</span>
                        <span className="text-[9px] font-mono text-cyan-400/80">{n.addr}</span>
                      </div>
                      <div className="px-3 py-3 bg-slate-950 flex flex-col items-center justify-center min-w-[50px]">
                        <span className="text-[10px] font-mono text-slate-500">next</span>
                        <span className="text-xs font-bold text-cyan-400 font-mono">•</span>
                        <span className="text-[9px] font-mono text-slate-500">
                          {idx < queueNodes.length - 1 ? queueNodes[idx + 1].addr : 'NULL'}
                        </span>
                      </div>
                    </motion.div>

                    <div className="flex items-center text-cyan-400">
                      <ArrowRight className="w-5 h-5 shrink-0" />
                    </div>
                  </React.Fragment>
                ))}
              </AnimatePresence>

              {/* REAR Pointer Badge */}
              <div className="flex flex-col items-center gap-1">
                <div className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono font-bold text-xs shadow-lg">
                  REAR {queueNodes.length > 0 ? `(${queueNodes[queueNodes.length - 1].addr})` : '(NULL)'}
                </div>
              </div>
            </div>
          </div>

          {/* Console / Status Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
            <span className="text-slate-500 uppercase mr-2">[QUEUE LOG]:</span>
            <span>{queueLog}</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOPIC 3 VISUALIZER: APPLICATIONS (POLYNOMIAL, GRAPH, HASH)     */}
      {/* ============================================================== */}
      {topic.id === 'top-603' && (
        <div className="space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 w-fit">
            <button
              onClick={() => {
                setAppMode('poly');
                setAppLog('Polynomial Representation: Nodes store [coefficient | exponent | next].');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'poly' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Polynomial Addition
            </button>
            <button
              onClick={() => {
                setAppMode('graph');
                setAppLog('Graph Adjacency List: Each vertex holds a Singly Linked List of incident neighbor edges.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'graph' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Graph Adjacency Lists
            </button>
            <button
              onClick={() => {
                setAppMode('hash');
                setAppLog('Hash Table Separate Chaining: Array buckets maintain linked collision lists.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'hash' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hash Separate Chaining
            </button>
          </div>

          {/* Interactive Showcase Box */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl min-h-[260px] flex items-center justify-center">
            {/* POLYNOMIAL ADDITION MODE */}
            {appMode === 'poly' && (
              <div className="w-full max-w-3xl space-y-4">
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-slate-400 font-bold">P1:</span>
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        [5 | 3] (5x³)
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        [4 | 2] (4x²)
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        [2 | 1] (2x¹)
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        [7 | 0] (7)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-12 text-slate-400 font-bold">P2:</span>
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                        [3 | 3] (3x³)
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                        [2 | 2] (2x²)
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300">
                        [1 | 0] (1)
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setPolySumCalculated(true);
                        setAppLog(
                          'addPolynomials(P1, P2): Executed linear O(m + n) merge pass. Sum = 8x³ + 6x² + 2x + 8.'
                        );
                      }}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-cyan-glow"
                    >
                      Merge & Add Polynomials [O(m + n)]
                    </button>
                    {polySumCalculated && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Sum Generated
                      </span>
                    )}
                  </div>

                  {polySumCalculated && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center gap-3 overflow-x-auto"
                    >
                      <span className="w-12 text-emerald-400 font-bold">SUM:</span>
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
                          [8 | 3] (8x³)
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
                          [6 | 2] (6x²)
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
                          [2 | 1] (2x¹)
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                        <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-200">
                          [8 | 0] (8)
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* GRAPH ADJACENCY LIST MODE */}
            {appMode === 'graph' && (
              <div className="w-full max-w-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono text-slate-400">Click a vertex to inspect its neighbor chain:</span>
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3].map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          setSelectedVertex(v);
                          setAppLog(
                            `Vertex ${v}: Adjacency list stores edges to [${graphEdges[v].join(
                              ', '
                            )}]. Degree: ${graphEdges[v].length}.`
                          );
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                          selectedVertex === v
                            ? 'bg-cyan-500 text-slate-950 scale-105'
                            : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {[0, 1, 2, 3].map((v) => (
                    <div
                      key={v}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                        selectedVertex === v ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-slate-900/60 border-slate-800'
                      }`}
                    >
                      <div className="w-20 font-bold text-white flex items-center gap-1.5">
                        <Network className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Adj[{v}]</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <div className="flex items-center gap-2 overflow-x-auto">
                        {graphEdges[v].map((dest, dIdx) => (
                          <React.Fragment key={dIdx}>
                            <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-cyan-300 font-bold">
                              Node {dest}
                            </div>
                            <ArrowRight className="w-3 h-3 text-cyan-400" />
                          </React.Fragment>
                        ))}
                        <span className="text-[10px] text-slate-500">NULL</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HASH SEPARATE CHAINING MODE */}
            {appMode === 'hash' && (
              <div className="w-full max-w-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">4-Bucket Array with Collision Chains</span>
                  <button
                    onClick={handleAddHashKey}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert Key into Chain</span>
                  </button>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {hashTable.map((bucket, bIdx) => (
                    <div key={bIdx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                      <div className="w-24 text-cyan-400 font-bold text-center bg-slate-950 py-1 rounded border border-slate-800">
                        Bucket {bIdx}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                      <div className="flex items-center gap-2 overflow-x-auto">
                        {bucket.map((entry, eIdx) => (
                          <React.Fragment key={eIdx}>
                            <div className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300">
                              {entry}
                            </div>
                            <ArrowRight className="w-3 h-3 text-amber-400" />
                          </React.Fragment>
                        ))}
                        <span className="text-[10px] text-slate-500">NULL</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Console / Status Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
            <span className="text-slate-500 uppercase mr-2">[APPLICATION LOG]:</span>
            <span>{appLog}</span>
          </div>
        </div>
      )}
    </div>
  );
};
