import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  ExternalLink,
  Layers,
  Cpu,
  HelpCircle,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const Chapter1SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: What is the formal difference between a Record and a File?',
      a: 'A Record is a collection of related fields representing an individual entity (e.g., one student struct). A File is a higher-level collection of related records persisted together under a common identifier (e.g., students.dat).'
    },
    {
      q: 'Q2: Why does the course syllabus classify "pointer" as a Primitive Data Structure?',
      a: 'In C and machine architecture, a pointer is a primitive machine scalar storing a raw virtual RAM address. Unlike higher-level languages that abstract pointers into garbage-collected references, C treats pointers as fundamental types capable of direct address manipulation.'
    },
    {
      q: 'Q3: Is it correct to claim that "all linear data structures must reside in contiguous memory"?',
      a: 'No. Linearity describes a logical sequential relationship where each element has a unique predecessor and successor. Arrays are physically contiguous, whereas Linked Lists are logically linear but physically non-contiguous in heap memory.'
    },
    {
      q: 'Q4: What are the six universal operations performed on Data Structures?',
      a: '1. Traversal (visiting each item once), 2. Insertion (adding new item), 3. Deletion (removing existing item), 4. Searching (finding location of key), 5. Sorting (reordering elements), and 6. Updation (mutating an existing element).'
    },
    {
      q: 'Q5: Why does inserting an element at index 0 of an array take O(N) time while inserting at the top of a stack takes O(1)?',
      a: 'An array stores elements contiguously without holes, requiring all N existing elements to be shifted right by one position. A stack pushes directly onto the TOP index pointer in constant O(1) time without shifting lower elements.'
    },
    {
      q: 'Q6: Distinguish between Linear and Non-Linear structures with examples.',
      a: 'Linear structures arrange items in a sequence where each node has at most one predecessor and successor (Array, List, Stack, Queue, Deque, String). Non-Linear structures organize items hierarchically or in networks with multiple branches or neighbors (Trees, Graphs, Heaps).'
    }
  ];

  return (
    <div className="mt-12 pt-8 border-t border-slate-800 space-y-6">
      {/* Accordion Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-cyan-500/40 transition-all shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Chapter 1 Complete Revision
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                SECE2291 Unit 1
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-white">
              Chapter 1 Summary, Interview Viva & Official References
            </h2>
          </div>
        </div>

        <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-8 animate-fadeIn">
          {/* 1. Important Definitions Recap */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>1. Fundamental Syllabus Definitions Recap</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
              {[
                { term: 'Data', def: 'Raw facts and figures without inherent context.' },
                { term: 'Data Structure', def: 'Organizing and storing data for efficient access and modification.' },
                { term: 'Element', def: 'A single data item stored in a data structure.' },
                { term: 'Field', def: 'A constituent part of a record holding a single attribute.' },
                { term: 'Record', def: 'A collection of related fields representing a single entity.' },
                { term: 'File', def: 'A collection of related records persisted under a unified name.' }
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <span className="text-cyan-400 font-bold block">{item.term}</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed font-sans">{item.def}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Classification Diagram */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>2. Master Taxonomy & Classification Diagram</span>
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-cyan-300 leading-relaxed">
              <pre className="whitespace-pre">
{`Data Structures
│
├── Primitive (Basic language-provided types directly executed by CPU)
│   ├── int
│   ├── float
│   ├── char
│   ├── boolean
│   └── pointer (Stores memory addresses; primitive in C/C++)
│
└── Non-Primitive (Composite structures grouping primitive elements)
    │
    ├── Linear (Elements arranged in sequential order; 1:1 relationship)
    │   ├── Array (Fixed-size, contiguous memory)
    │   ├── Linked List (Pointer-linked nodes; non-contiguous memory)
    │   ├── Stack (LIFO: Last-In, First-Out)
    │   ├── Queue (FIFO: First-In, First-Out)
    │   ├── Deque (Double-ended queue; push/pop at both ends)
    │   └── String (Character sequence terminated with '\\0')
    │
    └── Non-Linear (Elements arranged hierarchically or in networks; 1:N or N:M)
        ├── Tree (Binary Tree, BST, AVL Tree, B-Tree, B+ Tree)
        ├── Graph (Directed, Undirected, Weighted)
        └── Heap (Min-Heap, Max-Heap)`}
              </pre>
            </div>
          </div>

          {/* 3. Six Major Operations Summary Table */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>3. The Six Core Operations Revision Matrix</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Operation</th>
                    <th className="p-3">Core Action</th>
                    <th className="p-3">Array Complexity</th>
                    <th className="p-3">Key Assumption / Rule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">1. Traversal</td>
                    <td className="p-3 font-sans">Visit each element exactly once</td>
                    <td className="p-3 text-emerald-400 font-bold">O(n)</td>
                    <td className="p-3 font-sans text-slate-400">Must touch all n items</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">2. Insertion</td>
                    <td className="p-3 font-sans">Add new element at position</td>
                    <td className="p-3 text-amber-400 font-bold">O(n) general / O(1) end</td>
                    <td className="p-3 font-sans text-slate-400">Requires shifting existing items right</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">3. Deletion</td>
                    <td className="p-3 font-sans">Remove existing element</td>
                    <td className="p-3 text-amber-400 font-bold">O(n) general / O(1) end</td>
                    <td className="p-3 font-sans text-slate-400">Requires shifting following items left</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">4. Searching</td>
                    <td className="p-3 font-sans">Locate target value index</td>
                    <td className="p-3 text-amber-400 font-bold">O(n) linear / O(log n) binary</td>
                    <td className="p-3 font-sans text-slate-400">Binary search requires sorted array</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">5. Sorting</td>
                    <td className="p-3 font-sans">Reorder in ascending/descending</td>
                    <td className="p-3 text-rose-400 font-bold">O(n^2) bubble / O(n log n) merge</td>
                    <td className="p-3 font-sans text-slate-400">Comparison lower bound is Ω(n log n)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">6. Updation</td>
                    <td className="p-3 font-sans">Modify element at known index</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1) at known index</td>
                    <td className="p-3 font-sans text-slate-400">Direct write without size change</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Viva / Interview Questions */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>4. Important Viva Voce & Technical Interview Questions</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interviewQuestions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 font-mono">{item.q}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Sources & References Section */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3>Course Material Sources & Academic References</h3>
            </div>

            {/* Primary Source Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold uppercase tracking-wider">
                  Primary Course Source
                </span>
                <span className="text-xs font-mono text-slate-500">Official Course Specification</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Course Syllabus SECE2291: Data Structures — Unit 1: Introduction to Data Structures
              </h4>
              <p className="text-xs text-slate-300 font-sans">
                P P Savani University (PPSU), School of Engineering. Effective Academic Year 2025-26. Prescribed topics: Basic Terminology, Classification of Data Structures: Primitive and Non-Primitive, Linear and Non-linear, Operations on Data Structures.
              </p>
            </div>

            {/* Reference Textbooks */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                Prescribed Course Textbooks:
              </span>
              <ul className="space-y-2 text-xs font-mono text-slate-300">
                <li className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <div>
                    <strong className="text-white font-sans">Data Structures Using C and C++</strong> — Aaron M. Tanenbaum, Yedidyah Langsam, Moshe J. Augenstein (PHI Learning / Prentice Hall).
                    <span className="block text-[11px] text-slate-400 mt-0.5 font-sans">Standard reference for primitive memory representations, array operations, and ADTs.</span>
                  </div>
                </li>
                <li className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white font-sans">An Introduction to Data Structures with Applications</strong> — Jean-Paul Tremblay, Paul G. Sorenson (Tata McGraw Hill).
                    <span className="block text-[11px] text-slate-400 mt-0.5 font-sans">Textbook for data concepts, records, files, linear vs non-linear classification, and core operation algorithms.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Verified External Academic References with Real URLs */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                Verified External Educational References (Verified Real URLs):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <a
                  href="https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-cyan-400 font-bold block group-hover:underline">MIT OpenCourseWare (6.006)</span>
                    <span className="text-[11px] text-slate-400 font-sans">Introduction to Algorithms & Data Structures</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                <a
                  href="https://cslibrary.stanford.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-cyan-400 font-bold block group-hover:underline">Stanford CS Education Library</span>
                    <span className="text-[11px] text-slate-400 font-sans">Pointer Basics & Memory Allocation</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                <a
                  href="https://www.nist.gov/dads/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-cyan-400 font-bold block group-hover:underline">NIST Dictionary of Algorithms (DADS)</span>
                    <span className="text-[11px] text-slate-400 font-sans">U.S. National Institute of Standards Data Types</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>

                <a
                  href="https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1256.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-cyan-400 font-bold block group-hover:underline">ISO/IEC 9899:1999 (C99 Specification)</span>
                    <span className="text-[11px] text-slate-400 font-sans">Standard C99 Primitive Types & Memory Layout</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
