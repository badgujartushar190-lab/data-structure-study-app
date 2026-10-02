import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Layers,
  HelpCircle,
  ShieldCheck,
  Table
} from 'lucide-react';

export const Chapter6SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: Why must the REAR pointer be set to NULL when dequeuing the last remaining node in a Linked Queue?',
      a: 'When a queue contains exactly 1 element, FRONT and REAR point to the identical node. Dequeuing advances FRONT = FRONT->next (which becomes NULL) and calls free(temp). If REAR is not explicitly set to NULL, it remains holding the deallocated memory address of temp, becoming a dangerous dangling pointer. Subsequent enqueue operations would attempt to dereference "rear->next", corrupting the heap or crashing with a segmentation fault.'
    },
    {
      q: 'Q2: How do you implement a FIFO Queue using two LIFO Stacks, and what is the amortized complexity?',
      a: 'Maintain two stacks: in_stack and out_stack. For enqueue(x), push x to in_stack in O(1) time. For dequeue(), if out_stack is empty, transfer all elements by popping from in_stack and pushing to out_stack (reversing LIFO order into FIFO order), then pop from out_stack. While an individual transfer pass takes O(n), each element is pushed twice and popped twice across its lifecycle, yielding amortized O(1) constant time per operation.'
    },
    {
      q: 'Q3: Under what practical production conditions is an Array-based Stack preferred over a Linked Stack?',
      a: 'Array stacks are preferred when: (1) Maximum capacity is known in advance or can be bounded; (2) Cache performance and throughput are critical (contiguous array buffers load into CPU L1/L2 cache lines with hardware prefetching); (3) Memory footprint is constrained (array stacks have zero pointer overhead, saving 8 bytes per integer element on 64-bit systems).'
    },
    {
      q: 'Q4: Why does an Adjacency List achieve O(V + E) space complexity compared to O(V^2) for an Adjacency Matrix?',
      a: 'An Adjacency Matrix allocates a full V x V matrix regardless of edge count. For a sparse graph (e.g. 100,000 vertices and 200,000 edges), >99.9% of the matrix entries would be zeroes, wasting gigabytes of RAM. An Adjacency List allocates exactly V head pointers and 2*E edge nodes, storing only actual connections and saving orders of magnitude of memory.'
    },
    {
      q: 'Q5: How does Separate Chaining resolve hash table collisions, and what is its average-case search complexity?',
      a: 'In separate chaining, each hash bucket stores the HEAD pointer of a Singly Linked List. When multiple keys hash to the same bucket, the new key-value pair is prepended to that bucket list in O(1) time. Under a uniform hashing distribution, the average chain length is the load factor alpha = N / M. Average search time is O(1 + alpha), degrading to O(N) only in the pathological worst case where all keys collide into a single bucket.'
    },
    {
      q: 'Q6: What is the time complexity to add two polynomials represented as linked lists, and why is sorting by exponents required?',
      a: 'Polynomial addition takes O(m + n) time, where m and n are the number of terms. Sorting by descending exponents is required so that both lists can be merged in a single linear pass (identical to the merge step of Mergesort). When exponents match, coefficients are summed; otherwise, the term with the higher exponent is appended first.'
    }
  ];

  return (
    <div className="mt-12 pt-8 border-t border-slate-800 space-y-6">
      {/* Accordion Toggle Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex items-center justify-between cursor-pointer hover:border-cyan-500/40 transition-all shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BookmarkCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Chapter 6 Master Reference
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Revision & Viva Guide
              </span>
            </div>
            <h2 className="text-base font-extrabold text-white mt-0.5">
              Comprehensive Reference: Linked Stack vs Queue, Applications & Viva Questions
            </h2>
          </div>
        </div>

        <button className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-slate-200">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Collapsible Content Body */}
      {isOpen && (
        <div className="space-y-8 animate-fadeIn">
          {/* Comparative Matrix: Linked Stack vs Linked Queue */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Table className="w-4 h-4" />
              <h3>Architectural Contrast: Linked Stack vs Linked Queue</h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">Architectural Dimension</th>
                    <th className="p-3 text-cyan-400 font-bold">Linked Stack</th>
                    <th className="p-3 text-emerald-400 font-bold">Linked Queue</th>
                    <th className="p-3">Core Engineering Implication</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Access Discipline</td>
                    <td className="p-3 text-cyan-300">LIFO (Last-In, First-Out)</td>
                    <td className="p-3 text-emerald-300">FIFO (First-In, First-Out)</td>
                    <td className="p-3 text-slate-400 font-sans">Stack reverses order; Queue preserves arrival order</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Boundary Pointers</td>
                    <td className="p-3 text-slate-300">1 Pointer: TOP (at HEAD)</td>
                    <td className="p-3 text-emerald-300">2 Pointers: FRONT (HEAD) & REAR (TAIL)</td>
                    <td className="p-3 text-slate-400 font-sans">Queue requires dual pointers for O(1) two-ended access</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Insertion Site</td>
                    <td className="p-3 text-cyan-300">At TOP (HEAD) [O(1)]</td>
                    <td className="p-3 text-emerald-300">At REAR (TAIL) [O(1)]</td>
                    <td className="p-3 text-slate-400 font-sans">Stack pushes at head; Queue appends at tail</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Deletion Site</td>
                    <td className="p-3 text-cyan-300">From TOP (HEAD) [O(1)]</td>
                    <td className="p-3 text-emerald-300">From FRONT (HEAD) [O(1)]</td>
                    <td className="p-3 text-slate-400 font-sans">Both remove from list head in constant time</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Critical Edge Case</td>
                    <td className="p-3 text-slate-300">Underflow when TOP == NULL</td>
                    <td className="p-3 text-amber-300">Single-node dequeue: must reset REAR = NULL</td>
                    <td className="p-3 text-slate-400 font-sans">Prevents REAR from becoming a dangling pointer</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Overflow Condition</td>
                    <td className="p-3 text-emerald-300">Heap exhaustion only (malloc == NULL)</td>
                    <td className="p-3 text-emerald-300">Heap exhaustion only (malloc == NULL)</td>
                    <td className="p-3 text-slate-400 font-sans">Both eliminate arbitrary fixed buffer size limits</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparative Matrix: Array vs Linked Implementations */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <h3>Implementation Comparison: Array-Based vs Linked Data Structures</h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">Characteristic</th>
                    <th className="p-3 text-cyan-400 font-bold">Array Implementation</th>
                    <th className="p-3 text-purple-400 font-bold">Linked Implementation</th>
                    <th className="p-3">Production Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Capacity Bounds</td>
                    <td className="p-3 text-amber-300">Fixed MAX or geometric doubling resize</td>
                    <td className="p-3 text-emerald-300">Completely dynamic (1 node per item)</td>
                    <td className="p-3 text-slate-400 font-sans">Use linked when maximum load cannot be predicted</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Memory Overhead</td>
                    <td className="p-3 text-emerald-300 font-bold">0 bytes per element</td>
                    <td className="p-3 text-rose-300 font-bold">8 bytes pointer metadata per node</td>
                    <td className="p-3 text-slate-400 font-sans">Use array for billions of small numeric types</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Cache Performance</td>
                    <td className="p-3 text-emerald-300 font-bold">High (spatial hardware prefetching)</td>
                    <td className="p-3 text-rose-300 font-bold">Low (heap pointer chasing cache misses)</td>
                    <td className="p-3 text-slate-400 font-sans">Array offers higher sequential traversal throughput</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">False Overflow Risk</td>
                    <td className="p-3 text-rose-300 font-bold">Present in linear array queues</td>
                    <td className="p-3 text-emerald-300 font-bold">Zero risk (never wastes vacant slots)</td>
                    <td className="p-3 text-slate-400 font-sans">Linked queues eliminate modulo circular math complexity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Technical Interview / Viva Q&A */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <h3>Technical Interview & Viva Examination Essentials</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interviewQuestions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs"
                >
                  <strong className="text-cyan-300 font-semibold block text-xs">
                    {item.q}
                  </strong>
                  <p className="text-slate-300 leading-relaxed font-sans text-xs">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Citations & Official References */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2 text-slate-200 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Curriculum References & Computer Science Literature:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
              <li>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein (CLRS) — <em>Introduction to Algorithms (4th Edition)</em>, MIT Press (Stacks and Queues, Section 10.1; Representing Rooted Trees and Graphs, Section 10.4).</li>
              <li>Robert Sedgewick — <em>Algorithms in C, Parts 1-4: Fundamentals, Data Structures, Sorting, Searching</em>, Addison-Wesley (Elementary Abstract Data Types: Stacks & Queues, Ch. 4).</li>
              <li>Brian W. Kernighan & Dennis M. Ritchie — <em>The C Programming Language (2nd Edition)</em>, Prentice Hall (Pointers and Structures, Ch. 5-6).</li>
              <li>Andrew S. Tanenbaum & Herbert Bos — <em>Modern Operating Systems (4th Edition)</em>, Pearson (Processes and Threads: Scheduling Runqueues, Ch. 2).</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
