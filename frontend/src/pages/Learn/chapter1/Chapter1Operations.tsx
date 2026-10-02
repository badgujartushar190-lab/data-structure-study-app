import React from 'react';
import { Cpu, Clock } from 'lucide-react';
import { TopicData } from './chapter1Data';

interface Props {
  topic: TopicData;
}

export const Chapter1Operations: React.FC<Props> = ({ topic }) => {
  // If Topic 4 (Operations on Data Structures)
  if (topic.operations && topic.operations.length > 0) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-slate-100 text-base">
              The 6 Core Operations on Data Structures (Course Syllabus)
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
            6 Official Operations
          </span>
        </div>

        <div className="space-y-6">
          {topic.operations.map((op, idx) => (
            <div
              key={op.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-all"
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
                    <strong className="text-slate-400 block font-mono text-xs uppercase mb-1">Mechanics & Explanation:</strong>
                    <p className="text-slate-300 leading-relaxed">{op.explanation}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                    <span className="text-emerald-400 font-bold block text-[11px]">Array Concrete Example:</span>
                    <p className="text-slate-300">{op.arrayExample}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
                    <span className="text-blue-400 font-bold block text-[11px]">Real-World Scenario:</span>
                    <p className="text-slate-300">{op.realWorldExample}</p>
                  </div>
                </div>
              </div>

              {/* Code snippet & Assumptions */}
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

  // Fallback for Topics 1, 2, 3: Operations relevant to their domain
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h2 className="font-bold text-slate-100 text-base">
            {topic.id === 'top-101' && 'Operational Manipulation on Fundamental Terminology Entities'}
            {topic.id === 'top-102' && 'Operations on Primitive Types vs Non-Primitive Structures'}
            {topic.id === 'top-103' && 'Traversal & Mutation Mechanics: Linear vs Non-Linear Structures'}
          </h2>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
          Core Operations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topic.id === 'top-101' && (
          <>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-cyan-400 block font-mono">1. Record Member Access (.) and (-&gt;)</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Direct access to fields within a record using the member operator <code className="text-cyan-300">student.id</code> or pointer dereference <code className="text-cyan-300">ptr-&gt;id</code>.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(1) Constant</strong> via fixed struct byte offset.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-emerald-400 block font-mono">2. File Serialization & Deserialization</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Writing in-memory records into persistent secondary storage (e.g., via <code className="text-emerald-300">fwrite(&rec, sizeof(Record), 1, fp)</code>) and reading them back (<code className="text-emerald-300">fread</code>).
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(n) Linear</strong> in bytes written to disk.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-blue-400 block font-mono">3. Pointer Address Dereferencing (*)</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Accessing or mutating the value stored at an address stored inside a pointer variable <code className="text-blue-300">*ptr = 50</code>.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(1) Constant</strong> single memory fetch instruction.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-purple-400 block font-mono">4. Key-based Record Retrieval</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Searching a collection of records to locate the record matching a primary key (e.g., student_id = 102).
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Time Complexity: <strong>O(n)</strong> unsorted / <strong>O(log n)</strong> binary search.
              </div>
            </div>
          </>
        )}

        {topic.id === 'top-102' && (
          <>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-cyan-400 block font-mono">1. Primitive Operations (CPU Registers)</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Primitive types (int, float, char, boolean, pointer) support atomic CPU instructions: arithmetic (<code className="text-cyan-300">+ - * /</code>), logical (<code className="text-cyan-300">&amp;&amp; || !</code>), bitwise (<code className="text-cyan-300">&amp; | ^ ~</code>), and address referencing.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Execution: Single-clock cycle CPU instructions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-blue-400 block font-mono">2. Non-Primitive Composite Operations</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Non-primitive structures require dynamic allocation (<code className="text-blue-300">malloc/free</code>), relational pointer linking, sequential or multi-way traversal, element resizing, and boundary checking.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Execution: Multi-step algorithms bounded by input size N.
              </div>
            </div>
          </>
        )}

        {topic.id === 'top-103' && (
          <>
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-cyan-400 block font-mono">1. Linear Traversal Mechanics</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                A single unidirectional iteration (<code className="text-cyan-300">for loop</code> or pointer advancing <code className="text-cyan-300">curr = curr-&gt;next</code>) visits all N elements in a deterministic single pass.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Complexity: <strong>O(n) Linear Time</strong>.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-sm font-bold text-purple-400 block font-mono">2. Non-Linear Traversal Mechanics</span>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Requires non-linear traversal strategies: Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root), or Breadth-First / Depth-First Graph Search (BFS / DFS).
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-400">
                Complexity: <strong>O(n)</strong> for trees, <strong>O(V + E)</strong> for graphs.
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
