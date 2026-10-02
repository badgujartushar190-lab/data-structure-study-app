import React from 'react';
import { Cpu, Clock } from 'lucide-react';
import { TopicData } from './chapter2Data';

interface Props {
  topic: TopicData;
}

export const Chapter2Operations: React.FC<Props> = ({ topic }) => {
  // If Topic has dedicated operations (e.g., Topic 2 Array ADT)
  if (topic.operations && topic.operations.length > 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-base">
              Array ADT Core Operations & Structural Invariants
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
            {topic.operations.length} Fundamental Operations
          </span>
        </div>

        <div className="space-y-6">
          {topic.operations.map((op, idx) => (
            <div
              key={op.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-white">{op.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Worst Case:</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30">
                    {op.timeComplexity.worst}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="space-y-3">
                  <div>
                    <strong className="text-cyan-400 block font-mono text-xs uppercase mb-1">Definition:</strong>
                    <p className="text-slate-200 leading-relaxed">{op.definition}</p>
                  </div>
                  <div>
                    <strong className="text-slate-400 block font-mono text-xs uppercase mb-1">Algorithmic Mechanics:</strong>
                    <p className="text-slate-300 leading-relaxed">{op.explanation}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                    <span className="text-emerald-400 font-bold block text-[11px]">Concrete Example:</span>
                    <p className="text-slate-300">{op.arrayExample}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                    <span className="text-blue-400 font-bold block text-[11px]">Industrial Application:</span>
                    <p className="text-slate-300">{op.realWorldExample}</p>
                  </div>
                </div>
              </div>

              {/* Code Snippet & Assumptions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80">
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 font-mono text-xs overflow-x-auto text-slate-300">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">C99 Routine Logic:</span>
                  <pre className="text-cyan-300"><code>{op.cSnippet}</code></pre>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span><strong>Complexity Assumptions:</strong></span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {op.timeComplexity.assumptions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for Topics 1, 3, 4, 5
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 text-base">
            {topic.id === 'top-201' && 'Array Representation Operational Mechanics'}
            {topic.id === 'top-203' && 'C Array Memory Manipulation Routines'}
            {topic.id === 'top-204' && 'Sparse Matrix Conversion & Operational Algorithms'}
            {topic.id === 'top-205' && 'Address Computation Engine & Cache Traversals'}
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          Core Operations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topic.id === 'top-201' && (
          <>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-cyan-400 block font-mono">1. 1D Index Offset Resolution</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Hardware memory controller performs instant address translation: <code className="text-cyan-300">Address = Base + (i * S)</code> in a single CPU cycle.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(1) Constant</strong>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-emerald-400 block font-mono">2. 2D Matrix Row Flattening</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Linearizing matrix coordinates (r, c) into 1D RAM space: <code className="text-emerald-300">Offset = (r * Cols) + c</code>.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(1) Constant</strong>.
              </div>
            </div>
          </>
        )}

        {topic.id === 'top-203' && (
          <>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-cyan-400 block font-mono">1. C Array Linear Search</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Sequential loop compares <code className="text-cyan-300">arr[i] == target</code> from index 0 to n-1. Returns index on match or -1 on exhaustion.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(n) Linear</strong>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-blue-400 block font-mono">2. C Array Shifting (Insertion/Deletion)</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Requires copying elements rightward (insertion) or leftward (deletion) to maintain contiguous memory without gaps.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(n) Worst/Average</strong>.
              </div>
            </div>
          </>
        )}

        {topic.id === 'top-204' && (
          <>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-cyan-400 block font-mono">1. Matrix-to-Triplet Conversion</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Traverses dense matrix row-by-row; whenever <code className="text-cyan-300">matrix[r][c] != 0</code>, extracts and appends (row, col, value) into the triplet array.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(M * N)</strong>. Space Complexity: <strong>O(K)</strong>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-emerald-400 block font-mono">2. Sparse Matrix Transposition</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Swaps row and column values of each triplet and re-sorts by new row indices using simple transpose O(Cols * K) or Fast Transpose O(Cols + K).
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(Cols + K)</strong>.
              </div>
            </div>
          </>
        )}

        {topic.id === 'top-205' && (
          <>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-cyan-400 block font-mono">1. Row-Major Address Resolution</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Computes: <code className="text-cyan-300">Base + (i * N + j) * S</code>. Requires knowledge of total column count N to skip full rows.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(1) Constant</strong>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-blue-400 block font-mono">2. Column-Major Address Resolution</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Computes: <code className="text-blue-300">Base + (j * M + i) * S</code>. Requires knowledge of total row count M to skip full columns.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(1) Constant</strong>.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
