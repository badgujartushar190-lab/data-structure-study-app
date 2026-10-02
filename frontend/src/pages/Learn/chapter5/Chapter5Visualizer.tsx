import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Eye,
  AlertCircle,
  Plus,
  Trash2,
  Search,
  ArrowRight,
  ArrowLeft,
  Layers,
  Database,
  RefreshCw
} from 'lucide-react';
import { TopicData } from './chapter5Data';

interface Props {
  topic: TopicData;
}

interface SllNode {
  id: number;
  val: number;
  addr: string;
}

interface DllNode {
  id: number;
  val: number;
  addr: string;
}

export const Chapter5Visualizer: React.FC<Props> = ({ topic }) => {
  // -------------------------------------------------------------
  // TOPIC 501: DYNAMIC MEMORY (STACK VS HEAP) STATE
  // -------------------------------------------------------------
  const [heapBlocks, setHeapBlocks] = useState<
    { id: string; type: string; size: number; addr: string; isFreed: boolean; leak: boolean; data: string }[]
  >([
    { id: 'b1', type: 'struct Node', size: 16, addr: '0x20A0', isFreed: false, leak: false, data: '{ data: 42, next: NULL }' },
    { id: 'b2', type: 'int[4] (calloc)', size: 16, addr: '0x20C0', isFreed: false, leak: false, data: '[0, 0, 0, 0]' }
  ]);
  const [stackPointers, setStackPointers] = useState<{ name: string; pointsTo: string | null }[]>([
    { name: 'Node *p1', pointsTo: '0x20A0' },
    { name: 'int *arr', pointsTo: '0x20C0' }
  ]);
  const [memLog, setMemLog] = useState<string>('System initialized. Stack frames mapped; heap dynamic arena ready.');

  const handleMalloc = () => {
    const nextAddr = '0x' + (0x20C0 + heapBlocks.length * 0x20).toString(16).toUpperCase();
    const newId = 'b' + (heapBlocks.length + 1);
    const newBlock = {
      id: newId,
      type: 'struct Node',
      size: 16,
      addr: nextAddr,
      isFreed: false,
      leak: false,
      data: '{ data: ' + (Math.floor(Math.random() * 90) + 10) + ', next: NULL }'
    };
    setHeapBlocks([...heapBlocks, newBlock]);
    setStackPointers([...stackPointers, { name: 'Node *p' + (stackPointers.length + 1), pointsTo: nextAddr }]);
    setMemLog(`malloc(sizeof(struct Node)) executed. 16 bytes allocated at ${nextAddr}. Pointer registered on stack.`);
  };

  const handleFree = (id: string) => {
    setHeapBlocks(
      heapBlocks.map((b) => {
        if (b.id === id) {
          return { ...b, isFreed: true, data: '[FREED MEMORY - RETURNED TO ARENA]' };
        }
        return b;
      })
    );
    const target = heapBlocks.find((b) => b.id === id);
    if (target) {
      setMemLog(`free(${target.addr}) invoked. Memory released. Notice: Stack pointer must be set to NULL to prevent dangling pointer!`);
    }
  };

  const handleNullifyPointer = (addr: string) => {
    setStackPointers(
      stackPointers.map((sp) => {
        if (sp.pointsTo === addr) {
          return { ...sp, pointsTo: null };
        }
        return sp;
      })
    );
    setMemLog(`Pointer to ${addr} set to NULL. Dangling pointer neutralized!`);
  };

  const handleSimulateLeak = () => {
    if (heapBlocks.length === 0) return;
    const active = heapBlocks.find((b) => !b.isFreed && !b.leak);
    if (!active) {
      setMemLog('No active un-freed heap blocks available to leak.');
      return;
    }
    // Remove stack reference without freeing
    setStackPointers(stackPointers.filter((sp) => sp.pointsTo !== active.addr));
    setHeapBlocks(heapBlocks.map((b) => (b.id === active.id ? { ...b, leak: true } : b)));
    setMemLog(`MEMORY LEAK CREATED! Stack reference to ${active.addr} was lost without calling free(). Heap block is orphaned and unrecoverable.`);
  };

  const handleResetMem = () => {
    setHeapBlocks([
      { id: 'b1', type: 'struct Node', size: 16, addr: '0x20A0', isFreed: false, leak: false, data: '{ data: 42, next: NULL }' },
      { id: 'b2', type: 'int[4] (calloc)', size: 16, addr: '0x20C0', isFreed: false, leak: false, data: '[0, 0, 0, 0]' }
    ]);
    setStackPointers([
      { name: 'Node *p1', pointsTo: '0x20A0' },
      { name: 'int *arr', pointsTo: '0x20C0' }
    ]);
    setMemLog('Heap arena reset to initial state.');
  };

  // -------------------------------------------------------------
  // TOPIC 502: SINGLY LINKED LIST FUNDAMENTALS STATE
  // -------------------------------------------------------------
  const [sllNodes, setSllNodes] = useState<SllNode[]>([
    { id: 1, val: 10, addr: '0x10A0' },
    { id: 2, val: 20, addr: '0x2050' },
    { id: 3, val: 30, addr: '0x3090' },
    { id: 4, val: 40, addr: '0x40E0' }
  ]);
  const [inputVal, setInputVal] = useState<number>(50);
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);
  const [sllLog, setSllLog] = useState<string>('Singly Linked List active. HEAD points to Node at 0x10A0.');
  const [searchFound, setSearchFound] = useState<boolean | null>(null);

  const handleInsertHead = () => {
    const newAddr = '0x' + (Math.floor(Math.random() * 0x8fff) + 0x1000).toString(16).toUpperCase();
    const newNode: SllNode = { id: Date.now(), val: inputVal, addr: newAddr };
    setSllNodes([newNode, ...sllNodes]);
    setSllLog(`insertAtBeginning(&head, ${inputVal}): Node allocated at ${newAddr}. newNode->next = HEAD; HEAD = newNode. [O(1) Time]`);
    setInputVal(Math.floor(Math.random() * 80) + 10);
  };

  const handleInsertEnd = () => {
    const newAddr = '0x' + (Math.floor(Math.random() * 0x8fff) + 0x1000).toString(16).toUpperCase();
    const newNode: SllNode = { id: Date.now(), val: inputVal, addr: newAddr };
    setSllNodes([...sllNodes, newNode]);
    setSllLog(`insertAtEnd(&head, ${inputVal}): Traversed to tail. Linked tail->next = ${newAddr}; newNode->next = NULL. [O(n) Time]`);
    setInputVal(Math.floor(Math.random() * 80) + 10);
  };

  const handleDeleteHead = () => {
    if (sllNodes.length === 0) {
      setSllLog('Cannot delete from empty list. Underflow!');
      return;
    }
    const removed = sllNodes[0];
    setSllNodes(sllNodes.slice(1));
    setSllLog(`deleteBeginning(&head): Saved temp = ${removed.addr}; HEAD = HEAD->next; free(temp). Removed value ${removed.val}. [O(1) Time]`);
  };

  const handleSearch = () => {
    if (sllNodes.length === 0) {
      setSllLog('List is empty; search aborted.');
      return;
    }
    let idx = 0;
    setHighlightIdx(0);
    setSearchFound(null);
    setSllLog(`Starting search for key ${inputVal} at HEAD...`);

    const interval = setInterval(() => {
      if (idx < sllNodes.length) {
        setHighlightIdx(idx);
        if (sllNodes[idx].val === inputVal) {
          clearInterval(interval);
          setSearchFound(true);
          setSllLog(`FOUND! Key ${inputVal} located at index ${idx} (Address ${sllNodes[idx].addr}).`);
        } else {
          idx++;
          if (idx >= sllNodes.length) {
            clearInterval(interval);
            setHighlightIdx(null);
            setSearchFound(false);
            setSllLog(`NOT FOUND: Reached terminal NULL pointer without finding ${inputVal}. [O(n) Traversal complete]`);
          } else {
            setSllLog(`Examining node at index ${idx} (Value: ${sllNodes[idx].val}). Moving curr = curr->next...`);
          }
        }
      }
    }, 600);
  };

  const handleResetSll = () => {
    setSllNodes([
      { id: 1, val: 10, addr: '0x10A0' },
      { id: 2, val: 20, addr: '0x2050' },
      { id: 3, val: 30, addr: '0x3090' },
      { id: 4, val: 40, addr: '0x40E0' }
    ]);
    setHighlightIdx(null);
    setSearchFound(null);
    setSllLog('Singly linked list reset to initial 4-node chain.');
  };

  // -------------------------------------------------------------
  // TOPIC 503: TYPES OF LINKED LISTS STATE
  // -------------------------------------------------------------
  const [listTypeMode, setListTypeMode] = useState<'sll' | 'dll' | 'cll'>('dll');
  const [dllNodes, setDllNodes] = useState<DllNode[]>([
    { id: 1, val: 100, addr: '0x7A10' },
    { id: 2, val: 200, addr: '0x7A30' },
    { id: 3, val: 300, addr: '0x7A50' }
  ]);
  const [activeCursor, setActiveCursor] = useState<number>(0);
  const [typeLog, setTypeLog] = useState<string>(
    'Doubly Linked List mode: Each node stores prev and next pointers. Bidirectional traversal ready.'
  );

  const handleMoveForward = () => {
    if (activeCursor < dllNodes.length - 1) {
      setActiveCursor(activeCursor + 1);
      setTypeLog(`Traversed Forward: curr = curr->next. Now at node [${dllNodes[activeCursor + 1].val}].`);
    } else {
      setTypeLog('Reached end of list. curr->next == NULL.');
    }
  };

  const handleMoveBackward = () => {
    if (activeCursor > 0) {
      setActiveCursor(activeCursor - 1);
      setTypeLog(`Traversed Backward: curr = curr->prev. Now at node [${dllNodes[activeCursor - 1].val}].`);
    } else {
      setTypeLog('Reached head of list. curr->prev == NULL.');
    }
  };

  const handleDeleteCurrentDllNode = () => {
    if (dllNodes.length <= 1) {
      setTypeLog('Cannot delete only remaining node in this demo.');
      return;
    }
    const target = dllNodes[activeCursor];
    const newNodes = dllNodes.filter((_, i) => i !== activeCursor);
    setDllNodes(newNodes);
    setActiveCursor(Math.max(0, activeCursor - 1));
    setTypeLog(
      `O(1) Deletion of node [${target.val}]: target->prev->next = target->next; target->next->prev = target->prev; free(target). Predecessor search was unnecessary!`
    );
  };

  // -------------------------------------------------------------
  // TOPIC 504: APPLICATIONS STATE
  // -------------------------------------------------------------
  const [appMode, setAppMode] = useState<'stack' | 'queue' | 'hash'>('stack');
  const [linkedStack, setLinkedStack] = useState<number[]>([30, 20, 10]);
  const [linkedQueue, setLinkedQueue] = useState<number[]>([10, 20, 30, 40]);
  const [hashBuckets, setHashBuckets] = useState<string[][]>([
    ['"Alice":92', '"Dan":85'],
    [],
    ['"Bob":78'],
    ['"Carol":99', '"Eve":61']
  ]);
  const [appLog, setAppLog] = useState<string>('Dynamic Stack ADT ready. TOP is maintained at list HEAD.');

  const handleStackPush = () => {
    const val = Math.floor(Math.random() * 80) + 10;
    setLinkedStack([val, ...linkedStack]);
    setAppLog(`push(&top, ${val}): Node allocated on heap; newNode->next = TOP; TOP = newNode. [O(1) Time]`);
  };

  const handleStackPop = () => {
    if (linkedStack.length === 0) {
      setAppLog('Stack Underflow! Cannot pop from empty stack.');
      return;
    }
    const popped = linkedStack[0];
    setLinkedStack(linkedStack.slice(1));
    setAppLog(`pop(&top): Popped value ${popped} from HEAD in O(1). Node memory released back to heap.`);
  };

  const handleQueueEnqueue = () => {
    const val = Math.floor(Math.random() * 80) + 10;
    setLinkedQueue([...linkedQueue, val]);
    setAppLog(`enqueue(q, ${val}): Node appended at REAR (tail->next = newNode; REAR = newNode). [O(1) Time]`);
  };

  const handleQueueDequeue = () => {
    if (linkedQueue.length === 0) {
      setAppLog('Queue Underflow! Cannot dequeue from empty queue.');
      return;
    }
    const dequeued = linkedQueue[0];
    setLinkedQueue(linkedQueue.slice(1));
    setAppLog(`dequeue(q): Dequeued value ${dequeued} from FRONT (head). FRONT advanced in O(1) time.`);
  };

  const handleHashInsert = () => {
    const names = ['Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Mallory'];
    const name = names[Math.floor(Math.random() * names.length)];
    const score = Math.floor(Math.random() * 50) + 50;
    // Hash function: simple string sum mod 4
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    const bucket = hash % 4;

    const newBuckets = [...hashBuckets];
    newBuckets[bucket] = [`"${name}":${score}`, ...newBuckets[bucket]];
    setHashBuckets(newBuckets);
    setAppLog(`Hash Table Chaining: hash("${name}") % 4 = Bucket ${bucket}. Prepend node to bucket ${bucket} singly linked chain in O(1).`);
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
            Real-Time State Machine
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">
          {topic.id === 'top-501' && 'Virtual Memory: Stack vs Heap Arena Visualizer'}
          {topic.id === 'top-502' && 'Singly Linked List: Dynamic Pointer Chain Visualizer'}
          {topic.id === 'top-503' && 'Topology Laboratory: Singly, Doubly, & Circular Ring Lists'}
          {topic.id === 'top-504' && 'Linked Structure Applications: Stacks, Queues, & Hash Chaining'}
        </h2>
        <p className="text-slate-300 text-xs md:text-sm max-w-3xl leading-relaxed">
          Manipulate pointers, allocate heap chunks, inspect structural invariants, and observe how node links are established and freed at runtime.
        </p>
      </div>

      {/* ============================================================== */}
      {/* TOPIC 1 VISUALIZER: DYNAMIC MEMORY (STACK VS HEAP)             */}
      {/* ============================================================== */}
      {topic.id === 'top-501' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleMalloc}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>malloc(sizeof(Node))</span>
              </button>
              <button
                onClick={handleSimulateLeak}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Simulate Memory Leak</span>
              </button>
            </div>
            <button
              onClick={handleResetMem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Arena</span>
            </button>
          </div>

          {/* Interactive Memory Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CALL STACK COLUMN */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm font-mono">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Call Stack (Local Frame Pointers)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                  Automatic Lifetime
                </span>
              </div>
              <div className="space-y-2.5">
                {stackPointers.map((sp, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <span className="text-cyan-400 font-bold">{sp.name}</span>
                      <div className="text-[11px] text-slate-400">
                        Points to: <span className={sp.pointsTo ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{sp.pointsTo || 'NULL'}</span>
                      </div>
                    </div>
                    {sp.pointsTo && (
                      <button
                        onClick={() => handleNullifyPointer(sp.pointsTo!)}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700"
                      >
                        Set to NULL
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SYSTEM HEAP COLUMN */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm font-mono">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>System Heap Arena (Dynamic Blocks)</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                  Manual free() Required
                </span>
              </div>
              <div className="space-y-3">
                <AnimatePresence>
                  {heapBlocks.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`p-3.5 rounded-xl border text-xs font-mono transition-all ${
                        b.leak
                          ? 'bg-rose-500/10 border-rose-500/40 text-rose-300'
                          : b.isFreed
                          ? 'bg-slate-900/40 border-slate-800/80 text-slate-500'
                          : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-slate-200">
                          Address: <span className="text-cyan-300">{b.addr}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {b.size} Bytes ({b.type})
                          </span>
                          {!b.isFreed && !b.leak && (
                            <button
                              onClick={() => handleFree(b.id)}
                              className="px-2 py-0.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[10px] font-bold border border-rose-500/40"
                            >
                              free()
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Content: <span className="text-slate-200">{b.data}</span>
                      </div>
                      {b.leak && (
                        <div className="mt-1 text-[10px] text-rose-400 font-bold flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>MEMORY LEAK: Stack pointer lost! This memory cannot be reached or freed.</span>
                        </div>
                      )}
                      {b.isFreed && (
                        <div className="mt-1 text-[10px] text-slate-500 italic">
                          Chunk freed and returned to OS allocator free list.
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Console / Status Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
            <span className="text-slate-500 uppercase mr-2">[MEMORY LOG]:</span>
            <span>{memLog}</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOPIC 2 VISUALIZER: SINGLY LINKED LIST FUNDAMENTALS            */}
      {/* ============================================================== */}
      {topic.id === 'top-502' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-xs font-mono text-slate-400">Value:</span>
                <input
                  type="number"
                  value={inputVal}
                  onChange={(e) => setInputVal(parseInt(e.target.value) || 0)}
                  className="w-14 bg-transparent text-xs font-mono text-cyan-400 font-bold outline-none"
                />
              </div>

              <button
                onClick={handleInsertHead}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Insert at Head [O(1)]</span>
              </button>

              <button
                onClick={handleInsertEnd}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Insert at End [O(n)]</span>
              </button>

              <button
                onClick={handleDeleteHead}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Head [O(1)]</span>
              </button>

              <button
                onClick={handleSearch}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Key</span>
              </button>
            </div>

            <button
              onClick={handleResetSll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset List</span>
            </button>
          </div>

          {/* Graphical Chain Visualization */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-x-auto min-h-[220px] flex items-center">
            <div className="flex items-center gap-4 mx-auto py-4">
              {/* HEAD Pointer Badge */}
              <div className="flex flex-col items-center gap-1">
                <div className="px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs shadow-cyan-glow">
                  HEAD
                </div>
                <ArrowRight className="w-5 h-5 text-cyan-400 rotate-90 md:rotate-0" />
              </div>

              {/* Node Chain */}
              <AnimatePresence>
                {sllNodes.map((n, idx) => {
                  const isHighlighted = highlightIdx === idx;
                  const isMatched = isHighlighted && searchFound === true;

                  return (
                    <React.Fragment key={n.id}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className={`flex rounded-xl overflow-hidden border shadow-lg transition-all ${
                          isMatched
                            ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105'
                            : isHighlighted
                            ? 'border-amber-400 ring-2 ring-amber-500/40 scale-105'
                            : 'border-slate-700 bg-slate-900/90'
                        }`}
                      >
                        {/* Data Field */}
                        <div className="px-4 py-3 bg-slate-900 flex flex-col items-center border-r border-slate-800 min-w-[70px]">
                          <span className="text-[10px] font-mono text-slate-500">data</span>
                          <span className="text-lg font-bold text-slate-100 font-mono">{n.val}</span>
                          <span className="text-[9px] font-mono text-cyan-400/80">{n.addr}</span>
                        </div>

                        {/* Next Pointer Field */}
                        <div className="px-3 py-3 bg-slate-950 flex flex-col items-center justify-center min-w-[50px]">
                          <span className="text-[10px] font-mono text-slate-500">next</span>
                          <span className="text-xs font-bold text-cyan-400 font-mono">•</span>
                          <span className="text-[9px] font-mono text-slate-500">
                            {idx < sllNodes.length - 1 ? sllNodes[idx + 1].addr : 'NULL'}
                          </span>
                        </div>
                      </motion.div>

                      {/* Arrow Link */}
                      <div className="flex items-center text-cyan-400">
                        <ArrowRight className="w-5 h-5 shrink-0" />
                      </div>
                    </React.Fragment>
                  );
                })}
              </AnimatePresence>

              {/* Terminal NULL Badge */}
              <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono font-bold text-xs">
                NULL
              </div>
            </div>
          </div>

          {/* Console / Status Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
            <span className="text-slate-500 uppercase mr-2">[LINKED LIST LOG]:</span>
            <span>{sllLog}</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOPIC 3 VISUALIZER: TYPES OF LINKED LISTS (SLL, DLL, CLL)       */}
      {/* ============================================================== */}
      {topic.id === 'top-503' && (
        <div className="space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 w-fit">
            <button
              onClick={() => {
                setListTypeMode('sll');
                setTypeLog('Singly Linked List: Forward next pointers only. Minimal 1-pointer overhead.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                listTypeMode === 'sll' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Singly (SLL)
            </button>
            <button
              onClick={() => {
                setListTypeMode('dll');
                setTypeLog('Doubly Linked List: Bidirectional prev and next pointers. O(1) deletion enabled.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                listTypeMode === 'dll' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Doubly (DLL)
            </button>
            <button
              onClick={() => {
                setListTypeMode('cll');
                setTypeLog('Circular Linked List: Ring buffer topology. Last node links back to HEAD; zero NULLs.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                listTypeMode === 'cll' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Circular (CLL)
            </button>
          </div>

          {/* Interactive Traversal & Deletion Controls */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleMoveBackward}
                disabled={listTypeMode === 'sll'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  listTypeMode === 'sll'
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 border-slate-700 text-slate-500'
                    : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/40 text-cyan-300'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Move Backward [curr-&gt;prev]</span>
              </button>

              <button
                onClick={handleMoveForward}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all"
              >
                <span>Move Forward [curr-&gt;next]</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {listTypeMode === 'dll' && (
                <button
                  onClick={handleDeleteCurrentDllNode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Active Node [O(1)]</span>
                </button>
              )}
            </div>

            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
              Active Node: [{dllNodes[activeCursor]?.val || 'None'}]
            </span>
          </div>

          {/* Interactive Topology Display */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl overflow-x-auto min-h-[220px] flex items-center justify-center">
            {listTypeMode === 'sll' && (
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                  HEAD
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
                {dllNodes.map((n, i) => (
                  <React.Fragment key={n.id}>
                    <div
                      className={`flex rounded-xl overflow-hidden border ${
                        activeCursor === i ? 'border-cyan-400 ring-2 ring-cyan-500/40 scale-105' : 'border-slate-700'
                      }`}
                    >
                      <div className="px-4 py-3 bg-slate-900 flex flex-col items-center">
                        <span className="text-[10px] text-slate-500">data</span>
                        <span className="text-base font-bold text-white">{n.val}</span>
                      </div>
                      <div className="px-3 py-3 bg-slate-950 flex flex-col items-center border-l border-slate-800">
                        <span className="text-[10px] text-slate-500">next</span>
                        <span className="text-xs text-cyan-400">•</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400" />
                  </React.Fragment>
                ))}
                <div className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
                  NULL
                </div>
              </div>
            )}

            {listTypeMode === 'dll' && (
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
                  NULL
                </div>
                <div className="flex items-center text-cyan-400">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <ArrowRight className="w-3.5 h-3.5 -ml-1" />
                </div>
                {dllNodes.map((n, i) => (
                  <React.Fragment key={n.id}>
                    <div
                      className={`flex rounded-xl overflow-hidden border ${
                        activeCursor === i ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105' : 'border-slate-700'
                      }`}
                    >
                      <div className="px-2.5 py-3 bg-slate-950 flex flex-col items-center border-r border-slate-800">
                        <span className="text-[9px] text-slate-500">prev</span>
                        <span className="text-xs text-cyan-400">•</span>
                      </div>
                      <div className="px-4 py-3 bg-slate-900 flex flex-col items-center">
                        <span className="text-[10px] text-slate-500">data</span>
                        <span className="text-base font-bold text-white">{n.val}</span>
                      </div>
                      <div className="px-2.5 py-3 bg-slate-950 flex flex-col items-center border-l border-slate-800">
                        <span className="text-[9px] text-slate-500">next</span>
                        <span className="text-xs text-cyan-400">•</span>
                      </div>
                    </div>
                    <div className="flex items-center text-cyan-400">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <ArrowRight className="w-3.5 h-3.5 -ml-1" />
                    </div>
                  </React.Fragment>
                ))}
                <div className="px-2.5 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
                  NULL
                </div>
              </div>
            )}

            {listTypeMode === 'cll' && (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                    HEAD (First)
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                  {dllNodes.map((n, i) => (
                    <React.Fragment key={n.id}>
                      <div
                        className={`flex rounded-xl overflow-hidden border ${
                          activeCursor === i ? 'border-purple-400 ring-2 ring-purple-500/40 scale-105' : 'border-slate-700'
                        }`}
                      >
                        <div className="px-4 py-3 bg-slate-900 flex flex-col items-center">
                          <span className="text-[10px] text-slate-500">data</span>
                          <span className="text-base font-bold text-white">{n.val}</span>
                        </div>
                        <div className="px-3 py-3 bg-slate-950 flex flex-col items-center border-l border-slate-800">
                          <span className="text-[10px] text-slate-500">next</span>
                          <span className="text-xs text-cyan-400">•</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-cyan-400" />
                    </React.Fragment>
                  ))}
                  <div className="px-2.5 py-1 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                    TAIL (Last)
                  </div>
                </div>

                {/* Looping Arc Return */}
                <div className="w-full max-w-lg p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                  <span>Ring Buffer Invariant: TAIL-&gt;next loops back directly into HEAD! Zero NULL pointers.</span>
                </div>
              </div>
            )}
          </div>

          {/* Console / Status Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
            <span className="text-slate-500 uppercase mr-2">[TOPOLOGY LOG]:</span>
            <span>{typeLog}</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TOPIC 4 VISUALIZER: APPLICATIONS (STACK, QUEUE, HASH CHAIN)    */}
      {/* ============================================================== */}
      {topic.id === 'top-504' && (
        <div className="space-y-6">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 w-fit">
            <button
              onClick={() => {
                setAppMode('stack');
                setAppLog('Dynamic Stack ADT: Push and Pop at list HEAD in O(1) time.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'stack' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Linked Stack (LIFO)
            </button>
            <button
              onClick={() => {
                setAppMode('queue');
                setAppLog('Dynamic Queue ADT: Enqueue at REAR, Dequeue from FRONT in O(1) time.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'queue' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Linked Queue (FIFO)
            </button>
            <button
              onClick={() => {
                setAppMode('hash');
                setAppLog('Hash Table Separate Chaining: Each bucket maintains a Singly Linked List of colliding keys.');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                appMode === 'hash' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hash Chaining
            </button>
          </div>

          {/* Controls Bar */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            {appMode === 'stack' && (
              <div className="flex items-center gap-2">
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
              </div>
            )}

            {appMode === 'queue' && (
              <div className="flex items-center gap-2">
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
              </div>
            )}

            {appMode === 'hash' && (
              <button
                onClick={handleHashInsert}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Insert Random Key into Hash Chain</span>
              </button>
            )}
          </div>

          {/* Graphical Display */}
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl min-h-[220px] flex items-center justify-center">
            {appMode === 'stack' && (
              <div className="flex flex-col items-center gap-3">
                <div className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30">
                  TOP (HEAD Pointer)
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AnimatePresence>
                    {linkedStack.map((val, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-48 py-2.5 px-4 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-between text-xs font-mono font-bold text-white shadow-md">
                          <span>Node [{val}]</span>
                          <span className="text-[10px] text-cyan-400 font-normal">
                            {i < linkedStack.length - 1 ? 'next: •' : 'next: NULL'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {linkedStack.length === 0 && (
                    <div className="text-xs font-mono text-slate-500 italic">Stack is Empty (TOP == NULL)</div>
                  )}
                </div>
              </div>
            )}

            {appMode === 'queue' && (
              <div className="flex items-center gap-3 overflow-x-auto">
                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                  FRONT
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                {linkedQueue.map((val, i) => (
                  <React.Fragment key={i}>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs text-white flex flex-col items-center min-w-[70px]">
                      <span className="text-[9px] text-slate-400">Node</span>
                      <span className="font-bold text-base">{val}</span>
                    </div>
                    {i < linkedQueue.length - 1 && <ArrowRight className="w-4 h-4 text-cyan-400" />}
                  </React.Fragment>
                ))}
                <ArrowRight className="w-4 h-4 text-purple-400" />
                <div className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                  REAR
                </div>
              </div>
            )}

            {appMode === 'hash' && (
              <div className="w-full max-w-2xl space-y-3 font-mono text-xs">
                {hashBuckets.map((bucket, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-3">
                    <div className="w-24 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-center">
                      Bucket {bIdx}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {bucket.map((entry, eIdx) => (
                        <React.Fragment key={eIdx}>
                          <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                            {entry}
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                        </React.Fragment>
                      ))}
                      <div className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-500 text-[10px]">
                        NULL
                      </div>
                    </div>
                  </div>
                ))}
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
