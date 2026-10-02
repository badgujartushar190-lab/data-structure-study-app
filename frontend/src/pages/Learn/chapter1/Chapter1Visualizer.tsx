import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Database,
  Layers,
  ArrowRight,
  Play,
  RotateCcw,
  Plus,
  Minus,
  Search,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { TopicData } from './chapter1Data';

interface Props {
  topic: TopicData;
}

export const Chapter1Visualizer: React.FC<Props> = ({ topic }) => {
  // Topic 1 State: Drilldown Hierarchy
  const [selectedHierarchyLevel, setSelectedHierarchyLevel] = useState<'file' | 'record' | 'field' | 'data'>('record');
  const [selectedRecordIndex, setSelectedRecordIndex] = useState<number>(0);

  // Topic 2 State: Classification Explorer
  const [selectedClassNode, setSelectedClassNode] = useState<string>('int');

  // Topic 3 State: Linear vs Non-Linear Switcher
  const [linearMode, setLinearMode] = useState<'linear-array' | 'linear-list' | 'tree' | 'graph'>('linear-array');

  // Topic 4 State: 6 Operations Simulator
  const [opMode, setOpMode] = useState<'traversal' | 'insertion' | 'deletion' | 'searching' | 'sorting' | 'updation'>('traversal');
  const [arrayElements, setArrayElements] = useState<number[]>([10, 20, 30, 40]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [simMessage, setSimMessage] = useState<string>('Select an operation to observe its mechanical step-by-step behavior.');
  const [targetSearchVal, setTargetSearchVal] = useState<number>(30);
  const [newInsertVal, setNewInsertVal] = useState<number>(99);
  const [insertPos, setInsertPos] = useState<number>(2);
  const [deletePos, setDeletePos] = useState<number>(1);
  const [updateVal, setUpdateVal] = useState<number>(77);
  const [updatePos, setUpdatePos] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Reset array on mode change
  const resetArray = () => {
    setArrayElements([10, 20, 30, 40]);
    setActiveStepIndex(-1);
    setSimMessage('Array reset to initial state: [10, 20, 30, 40]');
    setIsAnimating(false);
  };

  // Traversal animation
  const runTraversal = () => {
    setIsAnimating(true);
    setActiveStepIndex(0);
    setSimMessage(`[Traversal Step 0]: Visiting element arr[0] = ${arrayElements[0]}`);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < arrayElements.length) {
        setActiveStepIndex(idx);
        setSimMessage(`[Traversal Step ${idx}]: Visiting element arr[${idx}] = ${arrayElements[idx]}`);
      } else {
        clearInterval(interval);
        setIsAnimating(false);
        setActiveStepIndex(-1);
        setSimMessage(`[Traversal Complete]: Visited all ${arrayElements.length} elements sequentially.`);
      }
    }, 900);
  };

  // Insertion animation
  const runInsertion = () => {
    if (arrayElements.length >= 7) {
      setSimMessage('Cannot insert: demo array limit reached.');
      return;
    }
    setIsAnimating(true);
    setSimMessage(`[Insertion Step 1]: Preparing insertion of ${newInsertVal} at index [${insertPos}]. Existing items shift right.`);

    setTimeout(() => {
      const nextArr = [...arrayElements];
      nextArr.splice(insertPos, 0, newInsertVal);
      setArrayElements(nextArr);
      setActiveStepIndex(insertPos);
      setSimMessage(`[Insertion Complete]: Successfully inserted ${newInsertVal} at index [${insertPos}]. Array size now ${nextArr.length}.`);
      setIsAnimating(false);
    }, 1000);
  };

  // Deletion animation
  const runDeletion = () => {
    if (arrayElements.length <= 1) {
      setSimMessage('Cannot delete: array must have at least one element.');
      return;
    }
    setIsAnimating(true);
    setActiveStepIndex(deletePos);
    setSimMessage(`[Deletion Step 1]: Marking element arr[${deletePos}] = ${arrayElements[deletePos]} for deletion.`);

    setTimeout(() => {
      const nextArr = [...arrayElements];
      const removed = nextArr.splice(deletePos, 1);
      setArrayElements(nextArr);
      setActiveStepIndex(-1);
      setSimMessage(`[Deletion Complete]: Removed ${removed[0]} from index [${deletePos}]. Subsequent elements shifted left.`);
      setIsAnimating(false);
    }, 1100);
  };

  // Searching animation
  const runSearching = () => {
    setIsAnimating(true);
    let idx = 0;
    setActiveStepIndex(0);
    setSimMessage(`[Linear Search]: Comparing arr[0] (${arrayElements[0]}) with target ${targetSearchVal}...`);

    const interval = setInterval(() => {
      if (arrayElements[idx] === targetSearchVal) {
        clearInterval(interval);
        setActiveStepIndex(idx);
        setSimMessage(`[Search Match Found!]: Target ${targetSearchVal} found at index [${idx}]. Search terminated.`);
        setIsAnimating(false);
        return;
      }

      idx++;
      if (idx < arrayElements.length) {
        setActiveStepIndex(idx);
        setSimMessage(`[Linear Search]: Comparing arr[${idx}] (${arrayElements[idx]}) with target ${targetSearchVal}...`);
      } else {
        clearInterval(interval);
        setActiveStepIndex(-1);
        setSimMessage(`[Search Not Found]: Target ${targetSearchVal} does not exist in array.`);
        setIsAnimating(false);
      }
    }, 900);
  };

  // Sorting animation
  const runSorting = () => {
    setIsAnimating(true);
    setArrayElements([40, 10, 30, 20]);
    setSimMessage('[Sorting Initiated]: Reset to unsorted state [40, 10, 30, 20]. Commencing Bubble Sort comparisons...');

    setTimeout(() => {
      setArrayElements([10, 40, 30, 20]);
      setSimMessage('[Pass 1]: Swapped 40 & 10 -> [10, 40, 30, 20]');
    }, 800);

    setTimeout(() => {
      setArrayElements([10, 30, 40, 20]);
      setSimMessage('[Pass 2]: Swapped 40 & 30 -> [10, 30, 40, 20]');
    }, 1600);

    setTimeout(() => {
      setArrayElements([10, 30, 20, 40]);
      setSimMessage('[Pass 3]: Swapped 40 & 20 -> Largest element 40 placed at end.');
    }, 2400);

    setTimeout(() => {
      setArrayElements([10, 20, 30, 40]);
      setSimMessage('[Sorting Complete]: Array fully sorted in ascending order -> [10, 20, 30, 40].');
      setIsAnimating(false);
    }, 3200);
  };

  // Updation animation
  const runUpdation = () => {
    setIsAnimating(true);
    setActiveStepIndex(updatePos);
    setSimMessage(`[Updation]: Direct memory write to arr[${updatePos}]. Changing ${arrayElements[updatePos]} to ${updateVal}.`);

    setTimeout(() => {
      const nextArr = [...arrayElements];
      nextArr[updatePos] = updateVal;
      setArrayElements(nextArr);
      setSimMessage(`[Updation Complete]: Element at index [${updatePos}] successfully mutated to ${updateVal}. Size remains unchanged.`);
      setIsAnimating(false);
    }, 900);
  };

  // Sample records for Topic 1
  const studentFileRecords = [
    { id: 101, name: 'Aarav Sharma', branch: 'CSE', gpa: 8.9 },
    { id: 102, name: 'Prakhar Muraliya', branch: 'AI&ML', gpa: 9.4 },
    { id: 103, name: 'Tushar Badgujar', branch: 'CSE', gpa: 9.1 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Visual Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 text-sm md:text-base">
            Interactive Architecture & Mental Model Visualizer
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          {topic.id === 'top-101' && 'Data Hierarchy: File → Record → Field → Data'}
          {topic.id === 'top-102' && 'Taxonomy: Primitive vs Non-Primitive'}
          {topic.id === 'top-103' && 'Topology: Linear vs Non-Linear'}
          {topic.id === 'top-104' && '6 Core Operations Simulator'}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* TOPIC 1 VISUALIZER: Data Hierarchy Drill-Down */}
      {/* ========================================================================= */}
      {topic.id === 'top-101' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          {/* Level Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Select Hierarchy Tier:</span>
            {[
              { id: 'file', label: '1. File (Collection of Records)', icon: FileSpreadsheet },
              { id: 'record', label: '2. Record (Entity Unit)', icon: Database },
              { id: 'field', label: '3. Field (Attribute Part)', icon: Layers },
              { id: 'data', label: '4. Data / Element (Atomic)', icon: CheckCircle }
            ].map((tier) => {
              const Icon = tier.icon;
              const isSelected = selectedHierarchyLevel === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedHierarchyLevel(tier.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tier.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Tier Graphic */}
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            {/* Visual breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
              <span className={selectedHierarchyLevel === 'file' ? 'text-cyan-400 font-bold' : ''}>File: students.dat</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className={selectedHierarchyLevel === 'record' ? 'text-cyan-400 font-bold' : ''}>Record [{selectedRecordIndex}]</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className={selectedHierarchyLevel === 'field' ? 'text-cyan-400 font-bold' : ''}>Fields (id, name, branch, gpa)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
              <span className={selectedHierarchyLevel === 'data' ? 'text-cyan-400 font-bold' : ''}>Data Element</span>
            </div>

            {/* Simulated File Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">Physical Storage Representation: File "students.dat"</span>
                <span className="text-slate-500">Total Records: 3</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Record Offset</th>
                      <th className={`p-3 ${selectedHierarchyLevel === 'field' ? 'text-cyan-400 font-bold bg-cyan-500/10' : ''}`}>Field 1: id (Key)</th>
                      <th className={`p-3 ${selectedHierarchyLevel === 'field' ? 'text-cyan-400 font-bold bg-cyan-500/10' : ''}`}>Field 2: name</th>
                      <th className={`p-3 ${selectedHierarchyLevel === 'field' ? 'text-cyan-400 font-bold bg-cyan-500/10' : ''}`}>Field 3: branch</th>
                      <th className={`p-3 ${selectedHierarchyLevel === 'field' ? 'text-cyan-400 font-bold bg-cyan-500/10' : ''}`}>Field 4: gpa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {studentFileRecords.map((rec, rIdx) => {
                      const isRecSelected = selectedRecordIndex === rIdx;
                      return (
                        <tr
                          key={rec.id}
                          onClick={() => setSelectedRecordIndex(rIdx)}
                          className={`cursor-pointer transition-colors ${
                            isRecSelected && (selectedHierarchyLevel === 'record' || selectedHierarchyLevel === 'field' || selectedHierarchyLevel === 'data')
                              ? 'bg-cyan-500/15 border-l-4 border-cyan-400'
                              : 'hover:bg-slate-900/50'
                          }`}
                        >
                          <td className="p-3 text-slate-400 font-bold">Record [{rIdx}]</td>
                          <td className={`p-3 ${selectedHierarchyLevel === 'data' ? 'text-emerald-400 font-bold' : 'text-slate-200'}`}>
                            {rec.id}
                          </td>
                          <td className={`p-3 ${selectedHierarchyLevel === 'data' ? 'text-emerald-400 font-bold' : 'text-slate-200'}`}>
                            "{rec.name}"
                          </td>
                          <td className={`p-3 ${selectedHierarchyLevel === 'data' ? 'text-emerald-400 font-bold' : 'text-slate-200'}`}>
                            "{rec.branch}"
                          </td>
                          <td className={`p-3 ${selectedHierarchyLevel === 'data' ? 'text-emerald-400 font-bold' : 'text-slate-200'}`}>
                            {rec.gpa.toFixed(1)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dynamic Educational Diagnosis Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
              <span className="text-cyan-400 font-bold block uppercase tracking-wider text-[11px]">
                Active Tier Inspection: {selectedHierarchyLevel.toUpperCase()}
              </span>
              {selectedHierarchyLevel === 'file' && (
                <p className="text-slate-300">
                  <strong>File:</strong> Represents the entire collection of related records persisted together. Here, "students.dat" holds records for the whole classroom.
                </p>
              )}
              {selectedHierarchyLevel === 'record' && (
                <p className="text-slate-300">
                  <strong>Record [{selectedRecordIndex}]:</strong> Collects related fields for a single entity (Student: {studentFileRecords[selectedRecordIndex].name}). In C, represented via <code className="text-cyan-300">struct StudentRecord</code>.
                </p>
              )}
              {selectedHierarchyLevel === 'field' && (
                <p className="text-slate-300">
                  <strong>Fields:</strong> The individual constituent attributes of the record: <code className="text-cyan-300">id</code>, <code className="text-cyan-300">name</code>, <code className="text-cyan-300">branch</code>, and <code className="text-cyan-300">gpa</code>.
                </p>
              )}
              {selectedHierarchyLevel === 'data' && (
                <p className="text-slate-300">
                  <strong>Data / Element:</strong> The raw values themselves (e.g., <code className="text-emerald-300">{studentFileRecords[selectedRecordIndex].gpa}</code> or <code className="text-emerald-300">"{studentFileRecords[selectedRecordIndex].name}"</code>) residing in individual fields.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC 2 VISUALIZER: Classification Taxonomy Explorer */}
      {/* ========================================================================= */}
      {topic.id === 'top-102' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          <div className="text-xs font-mono text-slate-400">
            Click on any classification node below to inspect its memory footprint, C99 declaration, and category properties:
          </div>

          {/* Visual Interactive Hierarchy Tree */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            {/* Root: Data Structures */}
            <div className="flex justify-center">
              <div className="px-5 py-2.5 rounded-xl bg-slate-900 border-2 border-cyan-500 font-bold text-sm text-cyan-300 shadow-cyan-glow">
                DATA STRUCTURES (Classification)
              </div>
            </div>

            {/* Branch Level 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800 relative">
              {/* Left Branch: Primitive */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">1. Primitive Data Structures</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">Language Built-in</span>
                </div>
                <p className="text-xs text-slate-400">Basic types directly manipulated by CPU machine instructions.</p>

                {/* Primitive leaves */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'int', label: 'int', size: '4 Bytes', desc: 'Signed whole numbers (-2^31 to 2^31-1)' },
                    { id: 'float', label: 'float', size: '4 Bytes', desc: 'Single-precision IEEE-754 decimals' },
                    { id: 'char', label: 'char', size: '1 Byte', desc: 'ASCII / UTF-8 character encoding' },
                    { id: 'boolean', label: 'boolean', size: '1 Byte', desc: 'Logic values: true (1) / false (0)' },
                    { id: 'pointer', label: 'pointer', size: '4/8 Bytes', desc: 'Direct RAM address reference' }
                  ].map((node) => {
                    const isSel = selectedClassNode === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedClassNode(node.id)}
                        className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-all ${
                          isSel
                            ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-cyan-glow'
                            : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border-slate-800'
                        }`}
                      >
                        <span className="block font-bold">{node.label}</span>
                        <span className={`text-[10px] ${isSel ? 'text-slate-900' : 'text-slate-500'}`}>{node.size}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Branch: Non-Primitive */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">2. Non-Primitive Data Structures</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">Composite</span>
                </div>
                <p className="text-xs text-slate-400">Sophisticated organizations built by combining primitive units.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Linear Subcategory */}
                  <div
                    onClick={() => setSelectedClassNode('linear')}
                    className={`p-3 rounded-lg border cursor-pointer font-mono text-xs transition-all ${
                      selectedClassNode === 'linear'
                        ? 'bg-blue-600/30 border-blue-400 text-blue-200'
                        : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="block font-bold text-cyan-400 mb-1">Linear</span>
                    <ul className="text-[11px] text-slate-400 space-y-0.5">
                      <li>• Array</li>
                      <li>• Linked List</li>
                      <li>• Stack & Queue</li>
                      <li>• Deque & String</li>
                    </ul>
                  </div>

                  {/* Non-Linear Subcategory */}
                  <div
                    onClick={() => setSelectedClassNode('non-linear')}
                    className={`p-3 rounded-lg border cursor-pointer font-mono text-xs transition-all ${
                      selectedClassNode === 'non-linear'
                        ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                        : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="block font-bold text-purple-400 mb-1">Non-Linear</span>
                    <ul className="text-[11px] text-slate-400 space-y-0.5">
                      <li>• Tree (BST, AVL, B-Tree)</li>
                      <li>• Graph (Directed/Undirected)</li>
                      <li>• Heap</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Inspector Panel for Selected Node */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <span className="text-cyan-400 font-bold block text-[11px] uppercase tracking-wider">
                Type Inspector: {selectedClassNode.toUpperCase()}
              </span>
              {selectedClassNode === 'int' && (
                <p className="text-slate-300">
                  <strong>Primitive Type (int):</strong> 4 bytes (32-bit two's complement integer). Stored directly on the execution call stack with single-cycle arithmetic operations (ADD, SUB, IMUL).
                </p>
              )}
              {selectedClassNode === 'float' && (
                <p className="text-slate-300">
                  <strong>Primitive Type (float):</strong> 4 bytes conforming to IEEE-754 standard (1 sign bit, 8 exponent bits, 23 mantissa bits). Evaluated via dedicated FPU hardware registers.
                </p>
              )}
              {selectedClassNode === 'char' && (
                <p className="text-slate-300">
                  <strong>Primitive Type (char):</strong> 1 byte (8 bits) storing an ASCII/UTF-8 character code point (e.g., 'A' = 65).
                </p>
              )}
              {selectedClassNode === 'boolean' && (
                <p className="text-slate-300">
                  <strong>Primitive Type (boolean):</strong> 1 byte storing truth value (0 = false, 1 = true). Standardized in C99 via &lt;stdbool.h&gt;.
                </p>
              )}
              {selectedClassNode === 'pointer' && (
                <p className="text-slate-300">
                  <strong>Primitive Type (pointer):</strong> 8 bytes on 64-bit systems (4 bytes on 32-bit). Stores a raw virtual memory address. In C/C++, it is a primitive type that permits pointer arithmetic; high-level languages like Java abstract this away as managed references.
                </p>
              )}
              {selectedClassNode === 'linear' && (
                <p className="text-slate-300">
                  <strong>Non-Primitive Linear:</strong> Arranges elements in strict sequential order. Includes Array (fixed, contiguous), Linked List (pointer-linked nodes), Stack (LIFO), Queue (FIFO), Deque (double-ended), and String (character array).
                </p>
              )}
              {selectedClassNode === 'non-linear' && (
                <p className="text-slate-300">
                  <strong>Non-Primitive Non-Linear:</strong> Elements are arranged hierarchically (Trees) or in interconnected networks (Graphs). Supports multi-level branching and non-sequential relationships.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC 3 VISUALIZER: Linear vs Non-Linear Topology */}
      {/* ========================================================================= */}
      {topic.id === 'top-103' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          {/* Topology Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Select Architecture:</span>
            {[
              { id: 'linear-array', label: '1. Linear: Contiguous Array' },
              { id: 'linear-list', label: '2. Linear: Pointer Linked List' },
              { id: 'tree', label: '3. Non-Linear: Hierarchical Tree' },
              { id: 'graph', label: '4. Non-Linear: Network Graph' }
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setLinearMode(mode.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  linearMode === mode.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-cyan-glow'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* Interactive Topology Canvas */}
          <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
            {/* 1. Linear Array */}
            {linearMode === 'linear-array' && (
              <div className="space-y-4 w-full text-center">
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Linear & Contiguous Array Layout in Physical RAM:
                </span>
                <div className="flex justify-center items-center gap-2 overflow-x-auto p-4">
                  {[10, 20, 30, 40].map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-[10px] font-mono text-slate-500 mb-1">Index [{idx}]</span>
                      <div className="w-16 h-16 rounded-xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center font-mono font-bold text-lg text-white shadow-lg">
                        {val}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 mt-1">
                        0x{1000 + idx * 4}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono text-slate-400 max-w-xl mx-auto">
                  Notice that memory addresses increment contiguously by exactly 4 bytes (sizeof int). Every element has one unique predecessor and one successor.
                </p>
              </div>
            )}

            {/* 2. Linear Linked List */}
            {linearMode === 'linear-list' && (
              <div className="space-y-4 w-full text-center">
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Linear but Non-Contiguous Linked List in Heap RAM:
                </span>
                <div className="flex justify-center items-center gap-3 overflow-x-auto p-4 flex-wrap">
                  {[
                    { val: 10, addr: '0x1040', next: '0x9800' },
                    { val: 20, addr: '0x9800', next: '0x2100' },
                    { val: 30, addr: '0x2100', next: '0x4400' },
                    { val: 40, addr: '0x4400', next: 'NULL' }
                  ].map((node, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-700 flex flex-col font-mono text-xs shadow-lg">
                        <span className="text-[9px] text-slate-500">Node @ {node.addr}</span>
                        <div className="flex border border-slate-700 rounded mt-1 overflow-hidden">
                          <div className="px-3 py-2 bg-slate-950 text-white font-bold">{node.val}</div>
                          <div className="px-2 py-2 bg-cyan-500/20 text-cyan-300 text-[10px]">{node.next}</div>
                        </div>
                      </div>
                      {idx < 3 && <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </div>
                  ))}
                </div>
                <p className="text-xs font-mono text-slate-400 max-w-xl mx-auto">
                  <strong className="text-cyan-300">Technical Key Point:</strong> Linked List is logically linear (sequential link order), but physically non-contiguous in memory. Nodes reside at arbitrary heap addresses!
                </p>
              </div>
            )}

            {/* 3. Non-Linear Tree */}
            {linearMode === 'tree' && (
              <div className="space-y-4 w-full text-center">
                <span className="text-xs font-mono text-purple-400 font-bold">
                  Non-Linear Hierarchical Binary Tree (Multiple Child Branches):
                </span>
                <div className="flex flex-col items-center space-y-3 font-mono text-xs">
                  {/* Root Level */}
                  <div className="w-12 h-12 rounded-full bg-purple-600/30 border-2 border-purple-400 flex items-center justify-center font-bold text-white shadow-purple-glow">
                    A (Root)
                  </div>
                  <div className="w-32 border-t-2 border-slate-700 relative">
                    <div className="absolute -top-1.5 left-0 w-3 h-3 border-l-2 border-t-2 border-slate-700" />
                    <div className="absolute -top-1.5 right-0 w-3 h-3 border-r-2 border-t-2 border-slate-700" />
                  </div>
                  {/* Level 1 Children */}
                  <div className="flex gap-16">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-300">
                        B
                      </div>
                      <div className="w-16 border-t-2 border-slate-700" />
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-[10px] text-slate-300">
                          D
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-600 flex items-center justify-center text-[10px] text-slate-300">
                          E
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-300">
                        C
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs font-mono text-slate-400 max-w-xl mx-auto">
                  Hierarchical organization: Node A has multiple descendants (B and C). Cannot be completely visited in a single unidirectional line without branching strategies (DFS/BFS).
                </p>
              </div>
            )}

            {/* 4. Non-Linear Graph */}
            {linearMode === 'graph' && (
              <div className="space-y-4 w-full text-center">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  Non-Linear Network Graph (Arbitrary Vertices & Edges):
                </span>
                <div className="flex justify-center items-center gap-6 p-4 font-mono text-xs flex-wrap">
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-left space-y-2 shadow-lg">
                    <span className="text-emerald-400 font-bold block">Graph Adjacency Matrix</span>
                    <pre className="text-[11px] text-slate-300">
                      {'     V1  V2  V3  V4\n' +
                       'V1 [  0   1   1   0  ]\n' +
                       'V2 [  1   0   1   1  ]\n' +
                       'V3 [  1   1   0   1  ]\n' +
                       'V4 [  0   1   1   0  ]'}
                    </pre>
                  </div>
                  <div className="max-w-xs text-left text-xs font-mono text-slate-300 space-y-2">
                    <p>• Nodes (Vertices) connect to arbitrary other nodes.</p>
                    <p>• May contain cycles, directed edges, or weighted roads.</p>
                    <p>• Used in Google Maps GPS pathfinding, Facebook friend networks, and internet packet routing.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOPIC 4 VISUALIZER: 6 Operations Interactive Simulator */}
      {/* ========================================================================= */}
      {topic.id === 'top-104' && (
        <div className="space-y-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          {/* Operation Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Select Operation:</span>
            {[
              { id: 'traversal', label: '1. Traversal' },
              { id: 'insertion', label: '2. Insertion' },
              { id: 'deletion', label: '3. Deletion' },
              { id: 'searching', label: '4. Searching' },
              { id: 'sorting', label: '5. Sorting' },
              { id: 'updation', label: '6. Updation' }
            ].map((op) => (
              <button
                key={op.id}
                onClick={() => {
                  setOpMode(op.id as any);
                  setActiveStepIndex(-1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  opMode === op.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-cyan-glow'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>

          {/* Interactive Controller & Action Trigger */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
            {/* Custom Input controls depending on operation */}
            <div className="flex items-center gap-3 text-xs font-mono flex-wrap">
              {opMode === 'traversal' && (
                <button
                  onClick={runTraversal}
                  disabled={isAnimating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-50 transition-colors shadow-cyan-glow"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Start Array Traversal</span>
                </button>
              )}

              {opMode === 'insertion' && (
                <div className="flex items-center gap-2">
                  <span>Value:</span>
                  <input
                    type="number"
                    value={newInsertVal}
                    onChange={(e) => setNewInsertVal(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-center text-white"
                  />
                  <span>Pos:</span>
                  <input
                    type="number"
                    min={0}
                    max={arrayElements.length}
                    value={insertPos}
                    onChange={(e) => setInsertPos(Math.min(arrayElements.length, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-center text-white"
                  />
                  <button
                    onClick={runInsertion}
                    disabled={isAnimating}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-50 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Insert & Shift</span>
                  </button>
                </div>
              )}

              {opMode === 'deletion' && (
                <div className="flex items-center gap-2">
                  <span>Delete Index:</span>
                  <input
                    type="number"
                    min={0}
                    max={arrayElements.length - 1}
                    value={deletePos}
                    onChange={(e) => setDeletePos(Math.min(arrayElements.length - 1, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-center text-white"
                  />
                  <button
                    onClick={runDeletion}
                    disabled={isAnimating}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500 text-slate-950 font-bold hover:bg-rose-400 disabled:opacity-50 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                    <span>Delete & Shift</span>
                  </button>
                </div>
              )}

              {opMode === 'searching' && (
                <div className="flex items-center gap-2">
                  <span>Target Value:</span>
                  <input
                    type="number"
                    value={targetSearchVal}
                    onChange={(e) => setTargetSearchVal(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-center text-white"
                  />
                  <button
                    onClick={runSearching}
                    disabled={isAnimating}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-50 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Linear Search</span>
                  </button>
                </div>
              )}

              {opMode === 'sorting' && (
                <button
                  onClick={runSorting}
                  disabled={isAnimating}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 disabled:opacity-50 transition-colors shadow-cyan-glow"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Execute Bubble Sort Demo</span>
                </button>
              )}

              {opMode === 'updation' && (
                <div className="flex items-center gap-2">
                  <span>Index:</span>
                  <input
                    type="number"
                    min={0}
                    max={arrayElements.length - 1}
                    value={updatePos}
                    onChange={(e) => setUpdatePos(Math.min(arrayElements.length - 1, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-14 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-center text-white"
                  />
                  <span>New Val:</span>
                  <input
                    type="number"
                    value={updateVal}
                    onChange={(e) => setUpdateVal(parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-center text-white"
                  />
                  <button
                    onClick={runUpdation}
                    disabled={isAnimating}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 disabled:opacity-50 transition-colors"
                  >
                    <span>Update arr[pos]</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={resetArray}
              disabled={isAnimating}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-mono text-slate-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset Array</span>
            </button>
          </div>

          {/* Animated Array Cell Grid */}
          <div className="p-8 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center gap-3 overflow-x-auto p-4 max-w-full">
              <AnimatePresence mode="popLayout">
                {arrayElements.map((val, idx) => {
                  const isCurrent = activeStepIndex === idx;
                  return (
                    <motion.div
                      key={`cell-${idx}-${val}`}
                      layout
                      initial={{ scale: 0.8, opacity: 0, y: -15 }}
                      animate={{
                        scale: isCurrent ? 1.12 : 1,
                        opacity: 1,
                        y: 0
                      }}
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
                      <span className="text-[9px] font-mono text-slate-600 mt-1">
                        +{(idx * 4)}B
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Diagnostic Message Console */}
            <div className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs flex items-center justify-between">
              <span className="text-cyan-300">{simMessage}</span>
              <span className="text-[10px] text-slate-500 uppercase">Array Size: {arrayElements.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
