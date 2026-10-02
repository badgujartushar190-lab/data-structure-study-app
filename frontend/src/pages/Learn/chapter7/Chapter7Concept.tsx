import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  GitBranch,
  Network
} from 'lucide-react';
import { TopicData } from './chapter7Data';

interface Props {
  topic: TopicData;
}

export const Chapter7Concept: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Chapter 07: Trees & Traversal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Module 7
            </span>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Non-Linear Structures
            </span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-white">{topic.title}</h1>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-4xl">
          {topic.overview}
        </p>

        {/* Structural Invariant Callout */}
        {topic.id === 'top-701' && (
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>TREE TOPOLOGY INVARIANT:</strong> A tree with N nodes possesses exactly (N - 1) directed edges. Root has in-degree 0; every other node has in-degree 1.
            </span>
          </div>
        )}

        {topic.id === 'top-702' && (
          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>BST ORDERING INVARIANT:</strong> For every node X: all keys in Left_Subtree(X) &lt; Key(X) &lt; all keys in Right_Subtree(X). Sorted input degrades search to O(n) without self-balancing!
            </span>
          </div>
        )}

        {topic.id === 'top-703' && (
          <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200 text-xs font-mono flex items-center gap-2.5 mt-2">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>TRAVERSAL INVARIANT:</strong> All standard tree traversals visit all N nodes in O(n) time. Preorder/Inorder/Postorder employ LIFO stack depth O(h); Level-Order employs FIFO queue width O(w).
            </span>
          </div>
        )}
      </div>

      {/* Concept Sections Accordion/Cards */}
      <div className="space-y-6">
        {topic.conceptSections.map((sec, idx) => (
          <div
            key={`sec-${idx}`}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg hover:border-slate-700/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm">
                0{idx + 1}
              </div>
              <h2 className="text-lg font-bold text-slate-100">{sec.title}</h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{sec.description}</p>

            {/* Bullet Points */}
            <div className="space-y-2.5 pt-1">
              {sec.points.map((pt, pIdx) => (
                <div key={`pt-${pIdx}`} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Optional ASCII Diagram */}
            {sec.asciiDiagram && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-cyan-300/90 whitespace-pre overflow-x-auto leading-tight">
                {sec.asciiDiagram}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Architectural Summary Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100 text-base">Key Architectural Principles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
              <Network className="w-4 h-4" />
              <span>Hierarchical Representation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike linear arrays, trees capture natural nested groupings (parent-child dependencies, file directories, HTML markup, and routing graphs).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <GitBranch className="w-4 h-4" />
              <span>Logarithmic Search Bound</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When balanced, a binary search tree prunes half the remaining keys at each level comparison, achieving O(log n) average search, insert, and delete.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
              <BookOpen className="w-4 h-4" />
              <span>Recursive Structural Subtree</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every node is the root of its own subtree. All tree algorithms naturally express themselves as clean, self-similar recursive functions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
