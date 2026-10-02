import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Layers,
  HelpCircle,
  ShieldCheck,
  Table,
  Search,
  ArrowUpDown
} from 'lucide-react';

export const Chapter3SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: Why are Searching and Sorting fundamentally different algorithmic problem classes?',
      a: 'Searching is a retrieval query problem that tests membership or returns the location of a target key without permuting elements (read-focused). Sorting is an ordering permutation problem that rearranges the entire collection into monotonic order (write/reorganization-focused). Sorting upfront is an investment that amortizes the cost of future searches (enabling O(log n) Binary Search instead of O(n) Linear Search).'
    },
    {
      q: 'Q2: Under what condition is Radix Sort faster than QuickSort, and why doesn\'t Radix Sort violate the Ω(n log n) sorting lower bound?',
      a: 'Radix Sort runs in O(d * (n + b)) time. When the maximum number of digits d is a small constant and n is very large, Radix Sort runs in linear O(n) time, outperforming QuickSort\'s O(n log n). It does NOT violate the Ω(n log n) lower bound because that theorem applies exclusively to COMPARISON-BASED sorting algorithms (proven via the 2^h >= n! decision tree theorem). Radix Sort is non-comparative; it uses digit values directly as array bucket indices.'
    },
    {
      q: 'Q3: Why is Insertion Sort universally preferred over Bubble Sort for small sub-arrays in production hybrid algorithms like Timsort and Introsort?',
      a: 'Both have O(n^2) worst-case time, but Insertion Sort performs ~1 memory write (shift) per comparison, whereas Bubble Sort performs 3 memory writes per swap (temp = a; a = b; b = temp). Furthermore, Insertion Sort operates cleanly inside a single L1 CPU cache line with negligible loop overhead, making it 2x to 3x faster in real wall-clock benchmarks.'
    },
    {
      q: 'Q4: Why is Selection Sort considered non-adaptive, and what is its primary hardware advantage?',
      a: 'Selection Sort always performs exactly n(n - 1) / 2 comparisons regardless of initial array order because it must scan the entire unsorted suffix to confirm the minimum element. Its primary advantage is WRITE MINIMIZATION: it performs at most n - 1 swaps (O(n) writes total), making it ideal for write-wear-sensitive hardware like EEPROM and NOR Flash memory.'
    },
    {
      q: 'Q5: What is the classic 32-bit integer overflow bug in Binary Search midpoint calculation?',
      a: 'Calculating mid = (low + high) / 2 causes an arithmetic overflow when low + high exceeds 2^31 - 1, producing a negative number in signed two\'s complement arithmetic and crashing with an out-of-bounds index fault. The algebraically equivalent expression mid = low + (high - low) / 2 guarantees that low + (high - low) never exceeds the high bound, completely preventing integer overflow.'
    },
    {
      q: 'Q6: Why must the sub-sorting subroutine used in LSD Radix Sort be strictly STABLE?',
      a: 'LSD Radix Sort processes digits from right to left (1s, then 10s, then 100s). When sorting by the 10s place, two numbers with the same 10s digit (e.g., 42 and 48) must maintain the relative order established in the 1s pass (where 42 preceded 48). If the subroutine is unstable, their relative order is scrambled, corrupting the sort.'
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
                Chapter 3 Master Reference
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Core Search & Sort Curriculum
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-extrabold text-white">
              Algorithm Comparison Matrix, Search vs Sort & Academic Standards
            </h2>
          </div>
        </div>

        <button className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-8 animate-fadeIn">
          {/* Section 1: Search vs Sort Conceptual Distinction */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
              <Layers className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white text-lg">Search vs Sort: Core Conceptual Distinction</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Searching and sorting represent two fundamentally distinct problem spaces in theoretical computer science.
              Searching asks <em className="text-cyan-300 font-medium">"Where does element X reside in this dataset?"</em> whereas
              sorting asks <em className="text-cyan-300 font-medium">"How do we rearrange all n elements into monotonic order?"</em>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Searching Column */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Search className="w-4 h-4" />
                  <span>Searching Algorithms</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <strong className="text-white font-mono">1. Linear Search</strong>
                    <span className="text-slate-400 font-mono text-[11px]">Unsorted • O(n)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                    <strong className="text-white font-mono">2. Binary Search</strong>
                    <span className="text-cyan-400 font-mono text-[11px]">Sorted • O(log n)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Query-oriented operations. Read-only by nature; preserves existing memory arrangements.
                </p>
              </div>

              {/* Sorting Column */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sorting Algorithms</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                    <strong className="text-white font-mono block">3. Bubble Sort</strong>
                    <span className="text-slate-400 font-mono text-[10px]">Stable • O(n²)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                    <strong className="text-white font-mono block">4. Insertion Sort</strong>
                    <span className="text-emerald-400 font-mono text-[10px]">Adaptive • O(n²)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                    <strong className="text-white font-mono block">5. Selection Sort</strong>
                    <span className="text-blue-400 font-mono text-[10px]">O(n) writes • O(n²)</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                    <strong className="text-white font-mono block">6. Radix Sort</strong>
                    <span className="text-purple-400 font-mono text-[10px]">Linear • O(d(n+b))</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  Reorganization operations. Expensive upfront investment that amortizes future binary searches.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Chapter 3 Master Comparison Table */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                <Table className="w-5 h-5 text-cyan-400" />
                <span>Chapter 3 Comprehensive Algorithm Comparison Matrix</span>
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                Verified CLRS Specifications
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3 text-white font-bold">Algorithm</th>
                    <th className="p-3 text-emerald-400 font-bold">Best Case</th>
                    <th className="p-3 text-cyan-400 font-bold">Average Case</th>
                    <th className="p-3 text-amber-400 font-bold">Worst Case</th>
                    <th className="p-3 text-blue-400 font-bold">Space</th>
                    <th className="p-3 text-purple-400 font-bold">Stable</th>
                    <th className="p-3 text-slate-300 font-bold">In-Place</th>
                    <th className="p-3 text-slate-400 font-bold">Key Requirement / Property</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Linear Search</td>
                    <td className="p-3 text-emerald-300">Ω(1)</td>
                    <td className="p-3 text-cyan-300">Θ(n)</td>
                    <td className="p-3 text-amber-300">O(n)</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-slate-500">N/A</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">None; works on unsorted contiguous or linked data</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Binary Search</td>
                    <td className="p-3 text-emerald-300">Ω(1)</td>
                    <td className="p-3 text-cyan-300">Θ(log n)</td>
                    <td className="p-3 text-amber-300">O(log n)</td>
                    <td className="p-3 text-blue-300">O(1)*</td>
                    <td className="p-3 text-slate-500">N/A</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Array MUST be sorted with O(1) random-access</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Bubble Sort</td>
                    <td className="p-3 text-emerald-300">Ω(n)†</td>
                    <td className="p-3 text-cyan-300">Θ(n²)</td>
                    <td className="p-3 text-amber-300">O(n²)</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-emerald-400 font-bold">Yes</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Adjacent comparisons; bubbles max element to end</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Insertion Sort</td>
                    <td className="p-3 text-emerald-300">Ω(n)</td>
                    <td className="p-3 text-cyan-300">Θ(n²)</td>
                    <td className="p-3 text-amber-300">O(n²)</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-emerald-400 font-bold">Yes</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Adaptive O(n + I); fastest for small or nearly sorted</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Selection Sort</td>
                    <td className="p-3 text-rose-300">Ω(n²)</td>
                    <td className="p-3 text-cyan-300">Θ(n²)</td>
                    <td className="p-3 text-amber-300">O(n²)</td>
                    <td className="p-3 text-blue-300">O(1)</td>
                    <td className="p-3 text-rose-400 font-bold">No‡</td>
                    <td className="p-3 text-emerald-400">Yes</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Minimizes memory writes: at most n - 1 swaps total</td>
                  </tr>

                  <tr className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white">Radix Sort (LSD)</td>
                    <td className="p-3 text-emerald-300">Ω(d(n+b))</td>
                    <td className="p-3 text-cyan-300">Θ(d(n+b))</td>
                    <td className="p-3 text-cyan-300">O(d(n+b))§</td>
                    <td className="p-3 text-amber-300">O(n + b)</td>
                    <td className="p-3 text-emerald-400 font-bold">Yes</td>
                    <td className="p-3 text-rose-400">No</td>
                    <td className="p-3 text-slate-300 font-sans text-xs">Non-comparative integer keys; requires stable digit sort</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
              <p>* Iterative binary search is O(1) space; recursive binary search requires O(log n) stack memory.</p>
              <p>† Bubble sort achieves Ω(n) best-case time only when optimized with an early-exit swapped boolean flag.</p>
              <p>‡ Standard Selection Sort using in-place swaps is unstable because long-range swaps can jump equal keys.</p>
              <p>§ For Radix Sort: n = element count, d = maximum digit count (d = ⌊log_b(max)⌋ + 1), b = radix base (10 for decimal, 256 for bytes). If d = O(log n), runtime is O(n log n).</p>
            </div>
          </div>

          {/* Section 3: Technical Viva & Interview Preparation */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              <span>Chapter 3 Technical Interview & Viva Voce Master Questions</span>
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
                <span className="text-[11px] text-slate-400">Cormen, Leiserson, Rivest, Stein (MIT Press, 3rd/4th Ed.)</span>
                <p className="text-[10px] text-cyan-300">Chapters 2, 8 (Non-comparison sorting & lower bounds)</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">2. Algorithms (4th Edition)</span>
                <span className="text-[11px] text-slate-400">Robert Sedgewick & Kevin Wayne (Princeton University / Pearson)</span>
                <p className="text-[10px] text-cyan-300">Section 2.1 (Elementary Sorts) & 5.1 (String / Radix Sorts)</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">3. The Art of Computer Programming, Vol. 3</span>
                <span className="text-[11px] text-slate-400">Donald E. Knuth (Addison-Wesley)</span>
                <p className="text-[10px] text-cyan-300">Sorting and Searching: Mathematical Inversion Theorems</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-white font-bold block">4. Data Structures Using C</span>
                <span className="text-[11px] text-slate-400">Aaron M. Tanenbaum (PHI Learning)</span>
                <p className="text-[10px] text-cyan-300">Unit 3: Searching & Sorting Techniques</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
