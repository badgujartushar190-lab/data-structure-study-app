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

export const Chapter5SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: How do you detect a cycle in a linked list, and prove that Floyd\'s Tortoise and Hare algorithm runs in O(n) time and O(1) space?',
      a: 'Initialize two pointers: "slow" moving 1 node per step, and "fast" moving 2 nodes per step from HEAD. If the list is acyclic, fast reaches NULL in O(n) time. If a cycle of length C exists, once slow enters the cycle, the relative distance between them decreases by 1 on every step. Hence, fast is guaranteed to catch slow within at most C steps. Total time is O(n), and space is strictly O(1) since only two pointer references are used.'
    },
    {
      q: 'Q2: How do you reverse a Singly Linked List in-place in O(n) time with O(1) auxiliary space?',
      a: 'Maintain three pointers: prev = NULL, curr = head, and next = NULL. In a single loop: while (curr != NULL) { next = curr->next; curr->next = prev; prev = curr; curr = next; }. When the loop finishes, head = prev. Each pointer is visited exactly once, reversing all forward links in O(n) time with zero extra heap allocations.'
    },
    {
      q: 'Q3: How do you find the middle node of a linked list in a single traversal pass?',
      a: 'Use a two-pointer technique: initialize slow = head and fast = head. Advance slow by 1 step (slow = slow->next) and fast by 2 steps (fast = fast->next->next). When fast reaches the end (fast == NULL for even lengths, or fast->next == NULL for odd lengths), slow is precisely at the middle node. This avoids a two-pass approach (counting length then traversing to length/2).'
    },
    {
      q: 'Q4: Why can a node in a Doubly Linked List be deleted in O(1) time without knowing its predecessor, whereas a Singly Linked List requires O(n)?',
      a: 'In a Singly Linked List, unlinking target node T requires updating its predecessor P (P->next = T->next). Because links only point forward, finding P requires traversing from HEAD in O(n) time. In a Doubly Linked List, T directly stores a pointer to P in T->prev. Hence, P->next = T->next and T->next->prev = T->prev can be executed directly in O(1) time without any search.'
    },
    {
      q: 'Q5: What is an "intrusive" linked list (like Linux kernel\'s struct list_head), and why is it preferred in systems programming?',
      a: 'In conventional linked lists, a wrapper node allocates memory on the heap to encapsulate a pointer to data. In an intrusive list (Linux kernel struct list_head), the prev and next pointers are embedded directly inside the user structure itself. Using the container_of() offset macro, the outer struct is resolved in O(1) time. This eliminates all node wrapper heap allocations, maximizes cache locality, and enables a single struct to be part of multiple linked lists simultaneously.'
    },
    {
      q: 'Q6: What causes a memory leak and a dangling pointer in C, and what defensive programming rules eliminate both?',
      a: 'A memory leak occurs when heap memory allocated via malloc() has all references discarded without calling free(). A dangling pointer occurs when free(ptr) is called, but ptr continues to hold the deallocated address; dereferencing it invokes Use-After-Free undefined behavior. Defensive rules: 1) Always check for NULL after malloc(); 2) Pair every malloc() with an explicit free(); 3) Immediately assign ptr = NULL after free(ptr); 4) Use address sanitizers (-fsanitize=address) and Valgrind in test suites.'
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
                Chapter 5 Master Reference
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Revision & Viva Guide
              </span>
            </div>
            <h2 className="text-base font-extrabold text-white mt-0.5">
              Comprehensive Reference: Memory Models, Topologies, & viva Questions
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
          {/* Comparative Matrix: Array vs Linked List */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Table className="w-4 h-4" />
              <h3>Architectural Contrast: Contiguous Array vs Dynamic Linked List</h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">Architectural Dimension</th>
                    <th className="p-3 text-cyan-400 font-bold">Contiguous Array</th>
                    <th className="p-3 text-emerald-400 font-bold">Dynamic Linked List</th>
                    <th className="p-3">Core Engineering Implication</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Memory Allocation</td>
                    <td className="p-3 text-slate-300">Single contiguous block</td>
                    <td className="p-3 text-emerald-300">Non-contiguous heap nodes</td>
                    <td className="p-3 text-slate-400 font-sans">Arrays can fail allocation under fragmented RAM</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Indexing / Access [k]</td>
                    <td className="p-3 text-cyan-400 font-bold">O(1) [base + k * size]</td>
                    <td className="p-3 text-rose-400 font-bold">O(k) [sequential scan]</td>
                    <td className="p-3 text-slate-400 font-sans">Arrays excel at random access and binary search</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Insert/Delete at Front</td>
                    <td className="p-3 text-rose-400 font-bold">O(n) [must shift all]</td>
                    <td className="p-3 text-emerald-400 font-bold">O(1) [rewire HEAD]</td>
                    <td className="p-3 text-slate-400 font-sans">Linked lists excel at frequent prepending</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Memory Overhead</td>
                    <td className="p-3 text-emerald-300 font-bold">0 bytes metadata</td>
                    <td className="p-3 text-amber-300 font-bold">4 or 8 bytes pointer/node</td>
                    <td className="p-3 text-slate-400 font-sans">For small datatypes, pointers exceed payload size</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">CPU Cache Locality</td>
                    <td className="p-3 text-emerald-300 font-bold">High (cache prefetching)</td>
                    <td className="p-3 text-rose-300 font-bold">Low (pointer chasing misses)</td>
                    <td className="p-3 text-slate-400 font-sans">Arrays perform 2x-5x faster in practical iterations</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Resizing Overhead</td>
                    <td className="p-3 text-slate-300">O(n) reallocation copy</td>
                    <td className="p-3 text-emerald-300">O(1) on-demand node allocation</td>
                    <td className="p-3 text-slate-400 font-sans">Linked lists grow smoothly without latency spikes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparative Matrix: SLL vs DLL vs CLL */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <h3>Linked List Topologies: Singly vs Doubly vs Circular</h3>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3">List Topology</th>
                    <th className="p-3 text-cyan-400 font-bold">Pointers / Node</th>
                    <th className="p-3 text-emerald-400 font-bold">Traversal Direction</th>
                    <th className="p-3 text-purple-400 font-bold">Deletion of Node Ptr</th>
                    <th className="p-3">Prime Industrial Applications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Singly Linked (SLL)</td>
                    <td className="p-3 text-cyan-300">1 (next)</td>
                    <td className="p-3 text-slate-300">Forward only</td>
                    <td className="p-3 text-amber-300">O(n) [must find prev]</td>
                    <td className="p-3 text-slate-400 font-sans">Hash table chaining, dynamic stacks, FAT32 cluster chains</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Doubly Linked (DLL)</td>
                    <td className="p-3 text-cyan-300">2 (prev, next)</td>
                    <td className="p-3 text-emerald-300">Bidirectional</td>
                    <td className="p-3 text-emerald-300 font-bold">O(1) [node-&gt;prev known]</td>
                    <td className="p-3 text-slate-400 font-sans">LRU Cache eviction, browser back/forward, text editors</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3 font-bold text-white">Circular Linked (CLL)</td>
                    <td className="p-3 text-cyan-300">1 or 2 (closed ring)</td>
                    <td className="p-3 text-purple-300">Continuous ring loop</td>
                    <td className="p-3 text-slate-300">O(n) SLL / O(1) DLL</td>
                    <td className="p-3 text-slate-400 font-sans">CPU Round-Robin scheduling, ring buffers, audio playlists</td>
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
              <li>Brian W. Kernighan & Dennis M. Ritchie — <em>The C Programming Language (2nd Edition)</em>, Prentice Hall (Dynamic Storage Allocation & Self-referential Structures, Ch. 5-6).</li>
              <li>Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein (CLRS) — <em>Introduction to Algorithms (4th Edition)</em>, MIT Press (Elementary Data Structures: Linked Lists, Ch. 10).</li>
              <li>Andrew S. Tanenbaum & Herbert Bos — <em>Modern Operating Systems (4th Edition)</em>, Pearson (Memory Management: Virtual Memory, Dynamic Storage Allocation, & Free Lists, Ch. 3).</li>
              <li>ISO/IEC 9899:1999 (C99 Specification) — Committee Draft, Standard C Memory Management Functions (&lt;stdlib.h&gt; Section 7.20.3).</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
