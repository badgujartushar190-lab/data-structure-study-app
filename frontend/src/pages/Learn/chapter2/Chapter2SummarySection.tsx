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
  BookOpen,
  Table
} from 'lucide-react';

export const Chapter2SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: Why is an array classified as an Abstract Data Type (ADT)?',
      a: 'As an ADT, an array represents a finite ordered list of homogeneous elements with defined operations (get, set, insert, delete, search) and mathematical invariants (O(1) random access), independent of physical implementation in hardware or programming languages.'
    },
    {
      q: 'Q2: Why does arr[2] retrieve the 3rd element in constant O(1) time?',
      a: 'C arrays reside in contiguous memory. The CPU directly computes Address = Base + (2 * sizeof(int)). It immediately accesses that memory offset in a single memory fetch without traversing prior elements.'
    },
    {
      q: 'Q3: When should a Sparse Matrix triplet representation be chosen over a standard 2D array?',
      a: 'When the matrix is mostly zero (>70% sparsity). Triplet representation (row, col, value) stores only non-zero entries, drastically reducing memory from O(M * N) to O(K) and skipping redundant zero computations.'
    },
    {
      q: 'Q4: What is the fundamental difference between Row-Major and Column-Major order?',
      a: 'Row-Major (C, C++, Python) stores elements row by row sequentially in physical RAM. Column-Major (Fortran, MATLAB, R) stores elements column by column. Row-wise traversal in C achieves high L1/L2 CPU cache hit rates (Spatial Locality), while column-wise traversal incurs frequent cache misses.'
    },
    {
      q: 'Q5: What is the time complexity of inserting an element into an array?',
      a: 'It depends on position: inserting at the end with spare capacity takes O(1) time. Inserting at index 0 or an arbitrary middle index requires shifting existing elements rightward to create space, resulting in O(N) worst-case time.'
    },
    {
      q: 'Q6: What happens when an array is passed to a C function?',
      a: 'The array decays into a pointer to its first element (&arr[0]). The function receives only an 8-byte pointer without automatic array size information, which is why array length must always be passed as a separate argument in C.'
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
                Chapter 2 Quick Reference
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                SECE2221 / SECE2291 Unit 2
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-white">
              Array Quick Reference, Comparison Tables & Official Sources
            </h2>
          </div>
        </div>

        <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-8 animate-fadeIn">
          {/* Table 1: 1D vs 2D Array */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Table className="w-4 h-4 text-cyan-400" />
              <span>1. 1D Array vs 2D Array Comparison</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Comparison Parameter</th>
                    <th className="p-3 text-cyan-400 font-bold">1D Array (Vector)</th>
                    <th className="p-3 text-blue-400 font-bold">2D Array (Matrix)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-white">Organization</td>
                    <td className="p-3 font-sans">Single linear row of elements</td>
                    <td className="p-3 font-sans">Grid of rows and columns (array of 1D arrays)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Indexing Notation</td>
                    <td className="p-3 text-cyan-300 font-bold">arr[i]</td>
                    <td className="p-3 text-blue-300 font-bold">matrix[row][col]</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Address Resolution</td>
                    <td className="p-3">Base + (i * S)</td>
                    <td className="p-3">Base + (row * Total_Cols + col) * S (Row-Major)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Typical Application</td>
                    <td className="p-3 font-sans">Linear buffers, lists, counters</td>
                    <td className="p-3 font-sans">Tables, image pixels, game boards, graphs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Dense vs Sparse Matrix */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>2. Dense Matrix vs Sparse Matrix Comparison</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Comparison Parameter</th>
                    <th className="p-3 text-cyan-400 font-bold">Dense Matrix (Standard 2D)</th>
                    <th className="p-3 text-emerald-400 font-bold">Sparse Matrix (Triplet Form)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-white">Zero Ratio</td>
                    <td className="p-3 font-sans">Majority of entries are non-zero</td>
                    <td className="p-3 font-sans">Majority of entries are zero (&gt;70%)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Storage Requirements</td>
                    <td className="p-3 text-rose-400 font-bold">M * N * sizeof(datatype)</td>
                    <td className="p-3 text-emerald-400 font-bold">3 * K * sizeof(int) (where K = non-zeros)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Access Complexity</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1) Instant random access</td>
                    <td className="p-3 text-amber-400 font-bold">O(K) linear search / O(log K) binary</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Ideal Domain</td>
                    <td className="p-3 font-sans">Dense pixel data, full transforms</td>
                    <td className="p-3 font-sans">Social networks, web graphs, FEA simulations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 3: Row-Major vs Column-Major Order */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>3. Row-Major Order vs Column-Major Order Comparison</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Comparison Parameter</th>
                    <th className="p-3 text-cyan-400 font-bold">Row-Major Order</th>
                    <th className="p-3 text-blue-400 font-bold">Column-Major Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-white">Physical Storage Sequence</td>
                    <td className="p-3 font-sans">Row by row: Row 0, then Row 1, Row 2...</td>
                    <td className="p-3 font-sans">Column by column: Col 0, then Col 1, Col 2...</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Primary Programming Languages</td>
                    <td className="p-3 font-sans text-cyan-300">C, C++, Python (NumPy), Java, C#</td>
                    <td className="p-3 font-sans text-blue-300">Fortran, MATLAB, R, Julia</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">2x2 Matrix Example: [[1,2],[3,4]]</td>
                    <td className="p-3 text-white font-bold">1, 2, 3, 4</td>
                    <td className="p-3 text-white font-bold">1, 3, 2, 4</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">0-Indexed Address Formula</td>
                    <td className="p-3">Base + (i * Total_Cols + j) * S</td>
                    <td className="p-3">Base + (j * Total_Rows + i) * S</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">CPU Hardware Cache Line Impact</td>
                    <td className="p-3 font-sans text-emerald-400">High Spatial Locality when looping row-wise in C</td>
                    <td className="p-3 font-sans text-amber-400">High Spatial Locality when looping col-wise in Fortran</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 4: Array Operations and Typical Complexity */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>4. Array Operations & Typical Complexity Reference</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Operation</th>
                    <th className="p-3">Best Case</th>
                    <th className="p-3">Average Case</th>
                    <th className="p-3">Worst Case</th>
                    <th className="p-3">Primary Assumption / Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Access by Index (get)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 font-sans text-slate-400">Constant-time address arithmetic</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Update by Index (set)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 font-sans text-slate-400">Direct memory overwrite</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Traversal (Full Scan)</td>
                    <td className="p-3 text-amber-400 font-bold">O(n)</td>
                    <td className="p-3 text-amber-400 font-bold">O(n)</td>
                    <td className="p-3 text-amber-400 font-bold">O(n)</td>
                    <td className="p-3 font-sans text-slate-400">Must visit all n elements</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Insertion (at position)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-amber-400 font-bold">O(n)</td>
                    <td className="p-3 text-rose-400 font-bold">O(n)</td>
                    <td className="p-3 font-sans text-slate-400">O(1) at end; O(n) at index 0 (shifts all n items)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Deletion (from position)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-amber-400 font-bold">O(n)</td>
                    <td className="p-3 text-rose-400 font-bold">O(n)</td>
                    <td className="p-3 font-sans text-slate-400">O(1) at end; O(n) at index 0 (shifts following items)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Linear Search (unsorted)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-amber-400 font-bold">O(n)</td>
                    <td className="p-3 text-rose-400 font-bold">O(n)</td>
                    <td className="p-3 font-sans text-slate-400">O(1) if first element; O(n) if at end/not found</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Binary Search (sorted)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(log n)</td>
                    <td className="p-3 text-emerald-400 font-bold">O(log n)</td>
                    <td className="p-3 font-sans text-slate-400">Requires pre-sorted contiguous array</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Viva Voce & Technical Interview Questions */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>5. Important Viva Voce & Technical Interview Questions</span>
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

          {/* 6. Sources & References Section */}
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
                Course Syllabus SECE2221 / SECE2291: Data Structures — Unit 2: Array
              </h4>
              <p className="text-xs text-slate-300 font-sans">
                P P Savani University (PPSU), School of Engineering. Effective Academic Year 2025-26. Prescribed topics: Array Representation, Array as an Abstract Data Type, Programming Array in C, Sparse Matrices, Sparse Representations, and its Advantages, Row-measure Order and Column-measure Order representation.
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
                    <span className="block text-[11px] text-slate-400 mt-0.5 font-sans">Definitive reference for array physical representation, pointer equivalence, and sparse matrix triplet representation.</span>
                  </div>
                </li>
                <li className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <div>
                    <strong className="text-white font-sans">An Introduction to Data Structures with Applications</strong> — Jean-Paul Tremblay, Paul G. Sorenson (Tata McGraw Hill).
                    <span className="block text-[11px] text-slate-400 mt-0.5 font-sans">Reference for Array ADT axioms, row-major and column-major memory mapping formulas, and sparse algorithms.</span>
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
                    <span className="text-[11px] text-slate-400 font-sans">Array Sequence Interfaces & Memory Models</span>
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
                    <span className="text-[11px] text-slate-400 font-sans">C Arrays, Memory Layout, and Pointer Decay</span>
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
                    <span className="text-cyan-400 font-bold block group-hover:underline">NIST DADS: Dictionary of Algorithms</span>
                    <span className="text-[11px] text-slate-400 font-sans">Sparse Matrix & 1D/2D Array Data Structures</span>
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
                    <span className="text-[11px] text-slate-400 font-sans">Clause 6.2.5 Types & Clause 6.5.2.1 Array Subscripting</span>
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
