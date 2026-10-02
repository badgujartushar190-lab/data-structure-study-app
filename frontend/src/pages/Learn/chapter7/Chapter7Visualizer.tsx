import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Plus,
  Trash2,
  Search,
  Play,
  Pause,
  Layers,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { TopicData } from './chapter7Data';

interface Props {
  topic: TopicData;
}

interface TreeNode {
  id: number;
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
}

export const Chapter7Visualizer: React.FC<Props> = ({ topic }) => {
  const isBST = topic.id === 'top-702';
  const isTraversals = topic.id === 'top-703';

  // ==========================================
  // TOPIC 1: GENERAL / COMPLETE TREE STATE
  // ==========================================
  const [completeNodes, setCompleteNodes] = useState<number[]>([10, 20, 30, 40, 50, 60]);
  const [inputVal, setInputVal] = useState<number>(70);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(null);
  const [highlightMode, setHighlightMode] = useState<'all' | 'leaves' | 'internal' | 'root'>('all');

  // ==========================================
  // TOPIC 2: BST STATE & CONTROLS
  // ==========================================
  const [bstRoot, setBstRoot] = useState<TreeNode | null>(null);
  const [bstInput, setBstInput] = useState<number>(65);
  const [bstSearchTarget, setBstSearchTarget] = useState<number>(60);
  const [bstDeleteVal, setBstDeleteVal] = useState<number>(50);
  const [highlightedPath, setHighlightedPath] = useState<number[]>([]);
  const [searchStatus, setSearchStatus] = useState<string>('');
  const [successorSwap, setSuccessorSwap] = useState<{ original: number; successor: number } | null>(null);

  // Initialize standard BST
  useEffect(() => {
    let root: TreeNode | null = null;
    const initialKeys = [50, 30, 70, 20, 40, 60, 80];
    const insertNode = (node: TreeNode | null, val: number): TreeNode => {
      if (!node) return { id: Date.now() + Math.random(), val, left: null, right: null };
      if (val < node.val) node.left = insertNode(node.left, val);
      else if (val > node.val) node.right = insertNode(node.right, val);
      return node;
    };
    for (const k of initialKeys) {
      root = insertNode(root, k);
    }
    setBstRoot(root);
  }, []);

  // BST Insert
  const handleBstInsert = () => {
    if (!bstInput) return;
    const path: number[] = [];
    const insertRec = (node: TreeNode | null, val: number): TreeNode => {
      if (!node) {
        path.push(val);
        return { id: Date.now() + Math.random(), val, left: null, right: null };
      }
      path.push(node.val);
      if (val < node.val) node.left = insertRec(node.left, val);
      else if (val > node.val) node.right = insertRec(node.right, val);
      return node;
    };
    const cloned = bstRoot ? JSON.parse(JSON.stringify(bstRoot)) : null;
    const newRoot = insertRec(cloned, bstInput);
    setBstRoot(newRoot);
    setHighlightedPath(path);
    setSearchStatus(`Inserted ${bstInput} as leaf node.`);
    setInputVal((prev) => prev + 5);
  };

  // BST Search
  const handleBstSearch = () => {
    const path: number[] = [];
    let curr = bstRoot;
    let found = false;
    while (curr) {
      path.push(curr.val);
      if (curr.val === bstSearchTarget) {
        found = true;
        break;
      }
      if (bstSearchTarget < curr.val) curr = curr.left;
      else curr = curr.right;
    }
    setHighlightedPath(path);
    setSearchStatus(
      found
        ? `Found key ${bstSearchTarget} along search path [${path.join(' -> ')}]`
        : `Key ${bstSearchTarget} NOT found after examining path [${path.join(' -> ')}]`
    );
  };

  // BST Delete
  const handleBstDelete = () => {
    const findMin = (node: TreeNode): TreeNode => {
      let curr = node;
      while (curr.left) curr = curr.left;
      return curr;
    };

    const deleteRec = (node: TreeNode | null, val: number): TreeNode | null => {
      if (!node) return null;
      if (val < node.val) {
        node.left = deleteRec(node.left, val);
      } else if (val > node.val) {
        node.right = deleteRec(node.right, val);
      } else {
        // Node found
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        // Two children
        const succ = findMin(node.right);
        setSuccessorSwap({ original: node.val, successor: succ.val });
        node.val = succ.val;
        node.right = deleteRec(node.right, succ.val);
      }
      return node;
    };

    const cloned = bstRoot ? JSON.parse(JSON.stringify(bstRoot)) : null;
    const newRoot = deleteRec(cloned, bstDeleteVal);
    setBstRoot(newRoot);
    setHighlightedPath([]);
    setSearchStatus(`Deleted key ${bstDeleteVal} from BST.`);
    setTimeout(() => setSuccessorSwap(null), 3000);
  };

  // ==========================================
  // TOPIC 3: TRAVERSALS STATE
  // ==========================================
  const [traversalType, setTraversalType] = useState<'preorder' | 'inorder' | 'postorder' | 'levelorder'>('inorder');
  const [activeTraversalIndex, setActiveTraversalIndex] = useState<number>(-1);
  const [isPlayingTraversal, setIsPlayingTraversal] = useState<boolean>(false);

  const traversalSequences: Record<string, number[]> = {
    preorder: [10, 20, 40, 50, 30, 60],
    inorder: [40, 20, 50, 10, 30, 60],
    postorder: [40, 50, 20, 60, 30, 10],
    levelorder: [10, 20, 30, 40, 50, 60]
  };

  const currentSequence = traversalSequences[traversalType] || [];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingTraversal) {
      timer = setInterval(() => {
        setActiveTraversalIndex((prev) => {
          if (prev + 1 >= currentSequence.length) {
            setIsPlayingTraversal(false);
            return prev;
          }
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(timer);
  }, [isPlayingTraversal, currentSequence.length]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
      {/* Visualizer Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
              {isBST ? 'BST Binary Search Engine' : isTraversals ? 'Multi-Mode Traversal Simulator' : 'Hierarchical Tree Lab'}
            </span>
            <span className="text-xs text-slate-400 font-mono">Interactive Tree Canvas</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100 mt-1">
            {isBST
              ? 'Binary Search Tree Dynamic Playground'
              : isTraversals
              ? 'Recursive DFS & Queue-Based BFS Traversals'
              : 'Binary Tree Topology & Metric Inspector'}
          </h2>
        </div>

        {/* Global Reset */}
        <button
          onClick={() => {
            setCompleteNodes([10, 20, 30, 40, 50, 60]);
            setSelectedNodeIndex(null);
            setHighlightedPath([]);
            setSearchStatus('');
            setActiveTraversalIndex(-1);
            setIsPlayingTraversal(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Reset Tree</span>
        </button>
      </div>

      {/* TOPIC 1: TREE FUNDAMENTALS CANVAS */}
      {!isBST && !isTraversals && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(Number(e.target.value))}
                className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                placeholder="Val"
              />
              <button
                onClick={() => {
                  if (completeNodes.length < 15) {
                    setCompleteNodes([...completeNodes, inputVal]);
                    setInputVal(inputVal + 10);
                  }
                }}
                disabled={completeNodes.length >= 15}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-lg transition-colors disabled:opacity-40"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Node</span>
              </button>
            </div>

            {/* Highlighting Toggles */}
            <div className="md:col-span-3 flex flex-wrap items-center gap-2 justify-end">
              <span className="text-xs text-slate-400 font-mono">Highlight Filter:</span>
              {(['all', 'root', 'leaves', 'internal'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setHighlightMode(mode)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    highlightMode === mode
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Tree Graph Render */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-6 relative min-h-[360px] flex flex-col items-center justify-center overflow-x-auto">
            {/* SVG Edges Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {completeNodes.map((_, i) => {
                if (i === 0) return null;
                const parentIdx = Math.floor((i - 1) / 2);
                // Level calculations
                const getCoords = (idx: number) => {
                  const level = Math.floor(Math.log2(idx + 1));
                  const posInLevel = idx - (Math.pow(2, level) - 1);
                  const totalInLevel = Math.pow(2, level);
                  const x = ((posInLevel + 0.5) / totalInLevel) * 100;
                  const y = 50 + level * 75;
                  return { x: `${x}%`, y };
                };
                const p = getCoords(parentIdx);
                const c = getCoords(i);
                return (
                  <line
                    key={`edge-${i}`}
                    x1={p.x}
                    y1={p.y}
                    x2={c.x}
                    y2={c.y}
                    stroke="#334155"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                );
              })}
            </svg>

            {/* Tree Nodes by Level */}
            <div className="w-full flex flex-col items-center gap-12 z-10 py-4">
              {[0, 1, 2, 3].map((lvl) => {
                const startIdx = Math.pow(2, lvl) - 1;
                const endIdx = Math.min(Math.pow(2, lvl + 1) - 1, completeNodes.length);
                const lvlNodes = completeNodes.slice(startIdx, endIdx);
                if (lvlNodes.length === 0) return null;

                return (
                  <div key={`lvl-${lvl}`} className="flex items-center justify-around w-full max-w-3xl">
                    <span className="text-[10px] font-mono text-slate-500 absolute left-4">
                      Level {lvl + 1} (Depth {lvl})
                    </span>
                    {lvlNodes.map((val, relIdx) => {
                      const absoluteIdx = startIdx + relIdx;
                      const isLeaf = 2 * absoluteIdx + 1 >= completeNodes.length;
                      const isRoot = absoluteIdx === 0;
                      const isInternal = !isLeaf && !isRoot;

                      let isMatch = true;
                      if (highlightMode === 'root') isMatch = isRoot;
                      if (highlightMode === 'leaves') isMatch = isLeaf;
                      if (highlightMode === 'internal') isMatch = isInternal;

                      const isSelected = selectedNodeIndex === absoluteIdx;

                      return (
                        <motion.button
                          key={`node-${absoluteIdx}`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedNodeIndex(absoluteIdx)}
                          className={`w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center font-mono font-bold text-sm shadow-lg transition-all ${
                            isSelected
                              ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/30'
                              : isMatch
                              ? isRoot
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                                : isLeaf
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60'
                                : 'bg-blue-500/20 text-blue-300 border-blue-500/60'
                              : 'bg-slate-900/50 text-slate-600 border-slate-800 opacity-40'
                          }`}
                        >
                          <span>{val}</span>
                          <span className="text-[9px] opacity-70 -mt-1">[{absoluteIdx}]</span>
                        </motion.button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Node Inspector Details Card */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 grid grid-cols-2 md:grid-cols-6 gap-3 text-xs font-mono">
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block">Total Nodes (V):</span>
              <span className="text-cyan-400 font-bold text-base">{completeNodes.length}</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block">Total Edges (E = V-1):</span>
              <span className="text-emerald-400 font-bold text-base">{Math.max(0, completeNodes.length - 1)}</span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
              <span className="text-slate-500 block">Tree Height (Levels):</span>
              <span className="text-purple-400 font-bold text-base">
                {Math.floor(Math.log2(completeNodes.length)) + 1}
              </span>
            </div>
            <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 md:col-span-3">
              <span className="text-slate-500 block">Selected Node Metadata:</span>
              {selectedNodeIndex !== null ? (
                <span className="text-amber-300">
                  Val: {completeNodes[selectedNodeIndex]} | Left Child: [
                  {2 * selectedNodeIndex + 1 < completeNodes.length
                    ? completeNodes[2 * selectedNodeIndex + 1]
                    : 'NULL'}
                  ] | Right Child: [
                  {2 * selectedNodeIndex + 2 < completeNodes.length
                    ? completeNodes[2 * selectedNodeIndex + 2]
                    : 'NULL'}
                  ] | Parent: [
                  {selectedNodeIndex > 0
                    ? completeNodes[Math.floor((selectedNodeIndex - 1) / 2)]
                    : 'ROOT (None)'}
                  ]
                </span>
              ) : (
                <span className="text-slate-600 italic">Click on any node above to inspect pointer relationships</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 2: BST VISUALIZER CANVAS */}
      {isBST && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            {/* Insert Control */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={bstInput}
                onChange={(e) => setBstInput(Number(e.target.value))}
                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-cyan-300 font-mono"
              />
              <button
                onClick={handleBstInsert}
                className="flex items-center gap-1 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg shadow-cyan-glow transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Insert</span>
              </button>
            </div>

            {/* Search Control */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={bstSearchTarget}
                onChange={(e) => setBstSearchTarget(Number(e.target.value))}
                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-amber-300 font-mono"
              />
              <button
                onClick={handleBstSearch}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-lg transition-colors"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>

            {/* Delete Control */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={bstDeleteVal}
                onChange={(e) => setBstDeleteVal(Number(e.target.value))}
                className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-sm text-rose-300 font-mono"
              />
              <button
                onClick={handleBstDelete}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Search/Operation Status Banner */}
          {searchStatus && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center gap-2 text-xs font-mono text-cyan-300"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{searchStatus}</span>
            </motion.div>
          )}

          {/* Successor Swap Banner */}
          {successorSwap && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl flex items-center gap-2 text-xs font-mono text-purple-300"
            >
              <Layers className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                Case 3 Deletion: Node {successorSwap.original} replaced by its Inorder Successor {successorSwap.successor} (minimum in right subtree).
              </span>
            </motion.div>
          )}

          {/* BST Diagram Visualization */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-6 min-h-[340px] flex flex-col items-center justify-center">
            {/* Visual rendering of BST tree */}
            <div className="w-full max-w-xl flex flex-col items-center gap-10">
              {/* Level 0 Root */}
              {bstRoot && (
                <motion.div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-lg ${
                    highlightedPath.includes(bstRoot.val)
                      ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40'
                      : 'bg-slate-900 border-cyan-500/60 text-cyan-300'
                  }`}
                >
                  {bstRoot.val}
                </motion.div>
              )}

              {/* Level 1 Subtrees */}
              <div className="flex justify-around w-full">
                {bstRoot?.left && (
                  <motion.div
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-md ${
                      highlightedPath.includes(bstRoot.left.val)
                        ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40'
                        : 'bg-slate-900 border-blue-500/60 text-blue-300'
                    }`}
                  >
                    {bstRoot.left.val}
                  </motion.div>
                )}
                {bstRoot?.right && (
                  <motion.div
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-md ${
                      highlightedPath.includes(bstRoot.right.val)
                        ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40'
                        : 'bg-slate-900 border-purple-500/60 text-purple-300'
                    }`}
                  >
                    {bstRoot.right.val}
                  </motion.div>
                )}
              </div>

              {/* Level 2 Subtrees */}
              <div className="flex justify-between w-full px-6">
                {[bstRoot?.left?.left, bstRoot?.left?.right, bstRoot?.right?.left, bstRoot?.right?.right].map(
                  (child, idx) =>
                    child ? (
                      <motion.div
                        key={`child-leaf-${idx}`}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs shadow-md ${
                          highlightedPath.includes(child.val)
                            ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40'
                            : 'bg-slate-900 border-emerald-500/60 text-emerald-300'
                        }`}
                      >
                        {child.val}
                      </motion.div>
                    ) : (
                      <div key={`empty-${idx}`} className="w-10 h-10 border border-dashed border-slate-800 rounded-full flex items-center justify-center text-[10px] text-slate-700 font-mono">
                        Ø
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOPIC 3: TREE TRAVERSALS SIMULATOR CANVAS */}
      {isTraversals && (
        <div className="space-y-6">
          {/* Mode Selector & Player Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-mono mr-2">Traversal Strategy:</span>
              {[
                { id: 'preorder', label: 'Preorder (Root-L-R)' },
                { id: 'inorder', label: 'Inorder (L-Root-R)' },
                { id: 'postorder', label: 'Postorder (L-R-Root)' },
                { id: 'levelorder', label: 'Level-Order (BFS Queue)' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setTraversalType(m.id as any);
                    setActiveTraversalIndex(-1);
                    setIsPlayingTraversal(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    traversalType === m.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-cyan-glow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Play/Pause & Step */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingTraversal(!isPlayingTraversal)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  isPlayingTraversal
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                {isPlayingTraversal ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingTraversal ? 'Pause' : 'Auto Play'}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTraversalIndex((prev) => Math.min(prev + 1, currentSequence.length - 1));
                }}
                disabled={activeTraversalIndex >= currentSequence.length - 1}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg disabled:opacity-40"
              >
                Step +1
              </button>
            </div>
          </div>

          {/* Traversal Execution Graph */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-6 min-h-[300px] flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex flex-col items-center gap-8">
              {/* Root [10] */}
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
                  currentSequence[activeTraversalIndex] === 10
                    ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40 scale-110'
                    : 'bg-slate-900 border-cyan-500/60 text-cyan-300'
                }`}
              >
                10
              </div>

              {/* Children [20, 30] */}
              <div className="flex justify-around w-full">
                {[20, 30].map((val) => (
                  <div
                    key={`t-${val}`}
                    className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm transition-all ${
                      currentSequence[activeTraversalIndex] === val
                        ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40 scale-110'
                        : 'bg-slate-900 border-blue-500/60 text-blue-300'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>

              {/* Leaves [40, 50, 60] */}
              <div className="flex justify-around w-full">
                {[40, 50, 60].map((val) => (
                  <div
                    key={`t-${val}`}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs transition-all ${
                      currentSequence[activeTraversalIndex] === val
                        ? 'bg-cyan-500 text-slate-950 border-white ring-4 ring-cyan-500/40 scale-110'
                        : 'bg-slate-900 border-purple-500/60 text-purple-300'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Output Sequence Buffer */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Generated Output Buffer:</span>
              <span className="text-cyan-400 font-bold">
                {activeTraversalIndex >= 0 ? `${activeTraversalIndex + 1} / ${currentSequence.length} nodes visited` : 'Ready to Traverse'}
              </span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-sm overflow-x-auto min-h-[48px]">
              <AnimatePresence>
                {currentSequence.slice(0, activeTraversalIndex + 1).map((val, idx) => (
                  <motion.span
                    key={`out-${val}-${idx}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-2.5 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold rounded"
                  >
                    {val}
                  </motion.span>
                ))}
              </AnimatePresence>
              {activeTraversalIndex < 0 && (
                <span className="text-slate-600 italic text-xs">Click \'Step +1\' or \'Auto Play\' to start traversal</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Traversal Summary Card */}
      <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-slate-300">
          <p className="font-semibold text-slate-200">Engineering Rule of Thumb</p>
          <p className="text-slate-400">
            For Binary Search Trees, <span className="text-cyan-300 font-bold">Inorder Traversal</span> strictly yields keys in sorted ascending order.
            For general tree destruction, <span className="text-purple-300 font-bold">Postorder Traversal</span> guarantees that child pointers remain valid until children are freed, preventing use-after-free corruption.
          </p>
        </div>
      </div>
    </div>
  );
};
