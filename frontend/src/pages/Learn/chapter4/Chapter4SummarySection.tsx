import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Layers,
  HelpCircle,
  ShieldCheck,
  Table,
  ArrowUpDown,
  Repeat
} from 'lucide-react';

export const Chapter4SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: How do you implement a FIFO Queue using two LIFO Stacks, and what is the amortized complexity?',
      a: 'Use two stacks: in_stack and out_stack. For enqueue(x), push x to in_stack (O(1)). For dequeue(), if out_stack is empty, transfer all elements by popping from in_stack and pushing to out_stack (which reverses LIFO order into FIFO order), then pop from out_stack. While an individual transfer pass takes O(n), each element is pushed twice and popped twice across its lifecycle, yielding amortized O(1) constant time per operation.'
    },
    {
      q: 'Q2: How do you design a Stack that supports Push, Pop, Top, and retrieving the Minimum element in O(1) time?',
      a: 'Maintain an auxiliary min_stack alongside the main stack. On push(x), push x to main_stack, and push min(x, min_stack.top()) to min_stack. On pop(), pop from both stacks. getMin() simply peeks at min_stack.top() in O(1) time with O(n) extra space. Alternatively, store encoded values (2*x - min) to achieve O(1) time with O(1) auxiliary space.'
    },
    {
      q: 'Q3: Why does a Linear Queue experience "False Overflow" and how does a Circular Queue solve it?',
      a: 'In a Linear Queue, as elements are dequeued, FRONT advances to the right. When REAR reaches MAX - 1, the queue cannot accept new items even if slots before FRONT are vacant ("False Overflow"). Shifting elements left would cost O(n) per dequeue. The Circular Queue wraps REAR and FRONT back to index 0 using modulo arithmetic: rear = (rear + 1) % MAX, achieving 100% memory utilization in strictly O(1) time.'
    },
    {
      q: 'Q4: Why does Dijkstra\'s Shunting-Yard algorithm use a Stack for operators rather than operands?',
      a: 'Infix notation allows higher precedence operators (*, /) to appear after lower precedence operators (+, -), or inside parentheses. The operator stack temporarily holds deferred operators until their right-hand operand expressions are completely parsed. Operands pass straight to the output, ensuring postfix order reflects true computation sequence.'
    },
    {
      q: 'Q5: What is Tail Call Optimization (TCO) and how does it prevent Call Stack overflow?',
      a: 'Tail recursion occurs when the recursive call is the final instruction executed in the function with no pending operations. An optimizing compiler reuses the current stack frame rather than allocating a new activation record, transforming recursion into an iterative jump with O(1) stack memory, completely preventing stack exhaustion.'
    },
    {
      q: 'Q6: What is a Double-Ended Queue (Deque) and in what systems is it indispensable?',
      a: 'A Deque allows O(1) insertions and removals at both ends (front and rear). It can operate as both a Stack and a Queue. Key applications include: (1) Sliding Window Maximum problem in O(n) time; (2) Browser history with bounded forward/back pruning; (3) Work-stealing thread schedulers in concurrent runtimes (Go scheduler, Java ForkJoinPool).'
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
                Chapter 4 Master Reference
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Stack & Queue Systems
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-white">
              Stack vs Queue Architecture, Expression Parsing & Academic Standards
            </h2>
          </div>
        </div>

        <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-8 animate-fadeIn">
          {/* Section 1: Stack vs Queue Conceptual Architecture */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white text-lg">Stack (LIFO) vs Queue (FIFO): Core Architectural Contrast</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Stacks and Queues are the dual pillars of restricted linear data structures. Stacks enforce reversal
              semantics (LIFO) through a single entry point, while Queues enforce fairness semantics (FIFO) through
              dual separated entry and exit terminals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Stack Column */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Stack Architecture (LIFO)</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <span>Access Terminals:</span>
                    <strong className="text-cyan-300">Single End (TOP)</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <span>Insertion / Deletion:</span>
                    <strong className="text-white">Push / Pop at TOP</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <span>Primary Paradigm:</span>
                    <strong className="text-amber-400">Reversal & Backtracking</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Exemplars: Function call stack, Undo buffers, Syntax bracket matching, Depth First Search.
                </p>
              </div>

              {/* Queue Column */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Repeat className="w-4 h-4" />
                  <span>Queue Architecture (FIFO)</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 font-mono">
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <span>Access Terminals:</span>
                    <strong className="text-emerald-300">Dual Ends (FRONT & REAR)</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <span>Insertion / Deletion:</span>
                    <strong className="text-white">Enqueue (REAR) / Dequeue (FRONT)</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <span>Primary Paradigm:</span>
                    <strong className="text-blue-400">Fairness & Asynchronous Buffering</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Exemplars: CPU Round Robin scheduling, Printer queues, Network packet buffers, BFS.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Master Comparison Matrix Table */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                <Table className="w-5 h-5 text-cyan-400" />
                <span>Linear Data Structure Master Comparison Matrix</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                Verified CLRS Specifications
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-white font-bold">Data Structure</th>
                    <th className="p-3 text-cyan-400 font-bold">Access Rule</th>
                    <th className="p-3 text-emerald-400 font-bold">Insertion</th>
                    <th className="p-3 text-amber-400 font-bold">Deletion</th>
                    <th className="p-3 text-blue-400 font-bold">Peek</th>
                    <th className="p-3 text-purple-400 font-bold">Space</th>
                    <th className="p-3 text-slate-300 font-bold">Critical Boundary Traps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Stack (Array)</td>
                    <td className="p-3 text-cyan-300">LIFO</td>
                    <td className="p-3 text-emerald-300">O(1) Push</td>
                    <td className="p-3 text-amber-300">O(1) Pop</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-purple-300">O(n) bounded</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Stack Overflow (top == MAX-1), Underflow (top == -1)</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Stack (Linked List)</td>
                    <td className="p-3 text-cyan-300">LIFO</td>
                    <td className="p-3 text-emerald-300">O(1) Push</td>
                    <td className="p-3 text-amber-300">O(1) Pop</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-purple-300">O(n) dynamic</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Underflow on empty; 8-byte pointer overhead per node</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Linear Queue</td>
                    <td className="p-3 text-emerald-300">FIFO</td>
                    <td className="p-3 text-emerald-300">O(1) Enqueue</td>
                    <td className="p-3 text-amber-300">O(1) Dequeue</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-purple-300">O(n) bounded</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Severe False-Overflow (rear == MAX-1 wastes prior slots)</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Circular Queue</td>
                    <td className="p-3 text-emerald-300">FIFO (Ring)</td>
                    <td className="p-3 text-emerald-300">O(1) Enqueue</td>
                    <td className="p-3 text-amber-300">O(1) Dequeue</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-purple-300">O(n) bounded</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Full when (rear + 1) % MAX == front; zero false overflow</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Deque (Double-Ended)</td>
                    <td className="p-3 text-purple-300">LIFO & FIFO</td>
                    <td className="p-3 text-emerald-300">O(1) Both Ends</td>
                    <td className="p-3 text-amber-300">O(1) Both Ends</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-purple-300">O(n)</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Requires circular wraparound at both front and rear</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Priority Queue</td>
                    <td className="p-3 text-amber-300">Priority Order</td>
                    <td className="p-3 text-emerald-300">O(log n) Heap</td>
                    <td className="p-3 text-amber-300">O(log n) Extract</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-purple-300">O(n)</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Items not FIFO; requires complete binary heap maintenance</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Technical Viva & Interview Preparation */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <span>Chapter 4 Technical Interview & Viva Voce Master Questions</span>
            </h3>

            <div className="space-y-3">
              {interviewQuestions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2 text-xs md:text-sm"
                >
                  <strong className="text-cyan-300 font-semibold block">{item.q}</strong>
                  <p className="text-slate-300 leading-relaxed font-sans">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Verified Curriculum Citations */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Official Academic & Textbook Citations</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-400 font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">1. CLRS Introduction to Algorithms</span>
                <span className="text-[11px] text-slate-400">Cormen, Leiserson, Rivest, Stein (MIT Press)</span>
                <p className="text-[10px] text-cyan-300">Chapter 10.1: Stacks, Queues, and Circular Buffers</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">2. Data Structures Using C</span>
                <span className="text-[11px] text-slate-400">Aaron M. Tanenbaum (PHI Learning)</span>
                <p className="text-[10px] text-cyan-300">Chapter 2: The Stack & Chapter 4: Queues and Recursion</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">3. Dijkstra's Shunting-Yard Algorithm</span>
                <span className="text-[11px] text-slate-400">Edsger W. Dijkstra (Mathematisch Centrum, Amsterdam)</span>
                <p className="text-[10px] text-cyan-300">Report MR 34/61: Translating Infix to Reverse Polish Notation</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">4. Algorithms (4th Edition)</span>
                <span className="text-[11px] text-slate-400">Robert Sedgewick & Kevin Wayne (Princeton University / Pearson)</span>
                <p className="text-[10px] text-cyan-300">Section 1.3: Bags, Queues, and Stacks</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
