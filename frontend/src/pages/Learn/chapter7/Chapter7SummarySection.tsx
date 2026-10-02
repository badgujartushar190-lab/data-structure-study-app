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

export const Chapter7SummarySection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const interviewQuestions = [
    {
      q: 'Q1: Why does Inorder Traversal of a Binary Search Tree (BST) produce strictly sorted keys?',
      a: 'The BST invariant guarantees that for every node X: all keys in Left_Subtree(X) < Key(X) < all keys in Right_Subtree(X). Inorder traversal recursively visits: (1) Entire Left Subtree, (2) Current Node, (3) Entire Right Subtree. Since every node in the left subtree is visited before the root, and the root is visited before any larger right-subtree node, the output order is mathematically guaranteed to be strictly ascending.'
    },
    {
      q: 'Q2: When deleting a node with two children in a BST, why is the Inorder Successor guaranteed to have at most ONE child?',
      a: 'The Inorder Successor is defined as the minimum key in the deleted node\'s right subtree, found by traversing left pointers from the right child until reaching a node with left == NULL. If the successor node had a left child, that left child would contain an even smaller key, which contradicts the definition that the successor is the minimum. Therefore, the successor can only have a right child or no children, reducing its deletion to Case 1 (leaf) or Case 2 (single child).'
    },
    {
      q: 'Q3: Under what condition does an ordinary BST degrade to O(n) time complexity for search, insertion, and deletion?',
      a: 'An ordinary BST provides no self-balancing mechanisms. If keys are inserted in strictly sorted (or reverse-sorted) order (e.g. 10, 20, 30, 40, 50), each new node becomes the right (or left) child of the preceding node. The tree degenerates into a linear singly linked list with height h = n - 1. Because search operations traverse the height of the tree, time complexity degrades from O(log n) to O(n).'
    },
    {
      q: 'Q4: Why is Postorder Traversal strictly required when deallocating or freeing memory of a dynamically allocated tree?',
      a: 'Postorder traversal follows Left -> Right -> Root. When freeing memory in C, if a parent node were freed first (as in Preorder), the pointers to its left and right children (node->left, node->right) would be deallocated and inaccessible. Attempting to traverse or free children afterward causes undefined behavior (use-after-free corruption). Postorder guarantees children are safely deallocated before their parent pointer is freed.'
    },
    {
      q: 'Q5: In an array representation of a complete binary tree with 0-based indexing, what are the index formulas for children and parent?',
      a: 'For a node stored at index i: Left Child is at index 2*i + 1; Right Child is at index 2*i + 2; Parent is at index floor((i - 1) / 2). This arithmetic eliminates the need to store 8-byte child pointers per node, optimizing cache locality and memory density in binary heaps and complete trees.'
    },
    {
      q: 'Q6: What is the formal relationship between the number of leaf nodes and nodes with degree 2 in any non-empty binary tree?',
      a: 'In any non-empty binary tree, the number of leaf nodes n0 is related to the number of degree-2 nodes n2 by the formula: n0 = n2 + 1. Proof: Total edges E = N - 1. In terms of node degrees: E = 1*n1 + 2*n2. Since total nodes N = n0 + n1 + n2, substituting yields: (n0 + n1 + n2) - 1 = n1 + 2*n2 => n0 - 1 = n2 => n0 = n2 + 1.'
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
                Chapter 7 Master Reference
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Trees & Traversals Revision Guide
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 mt-0.5">
              Comparative Tree Taxonomy, Traversal Matrices & Viva Examination Bank
            </h3>
          </div>
        </div>

        <button className="p-2 text-slate-400 hover:text-white transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-8 animate-fadeIn">
          {/* Table 1: Traversal Comparative Matrix */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Table className="w-4 h-4 text-cyan-400" />
              <h4>Fundamental Traversal Comparison Matrix</h4>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Traversal</th>
                    <th className="p-3.5 text-cyan-400">Visit Order</th>
                    <th className="p-3.5 text-amber-400">Auxiliary Structure</th>
                    <th className="p-3.5 text-emerald-400">BST Property</th>
                    <th className="p-3.5">Primary System Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Preorder</td>
                    <td className="p-3.5 text-cyan-300">Root -&gt; Left -&gt; Right</td>
                    <td className="p-3.5">Call Stack / LIFO Stack</td>
                    <td className="p-3.5 text-slate-400">Root processed first</td>
                    <td className="p-3.5">Tree cloning, serialization, Polish prefix notation</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Inorder</td>
                    <td className="p-3.5 text-cyan-300">Left -&gt; Root -&gt; Right</td>
                    <td className="p-3.5">Call Stack / LIFO Stack</td>
                    <td className="p-3.5 text-emerald-300 font-bold">Strictly Ascending Sorted Order</td>
                    <td className="p-3.5">Sorted key retrieval, infix arithmetic reconstruction</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Postorder</td>
                    <td className="p-3.5 text-cyan-300">Left -&gt; Right -&gt; Root</td>
                    <td className="p-3.5">Call Stack / LIFO Stack</td>
                    <td className="p-3.5 text-slate-400">Root processed last</td>
                    <td className="p-3.5">Safe tree deallocation (free), du disk usage, RPN evaluation</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Level-Order</td>
                    <td className="p-3.5 text-cyan-300">Top-to-Bottom, Left-to-Right</td>
                    <td className="p-3.5 text-purple-300 font-bold">FIFO Queue</td>
                    <td className="p-3.5 text-slate-400">Visited by tree depth</td>
                    <td className="p-3.5">Shortest path BFS, serialization, visual canvas layout</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Binary Tree Taxonomy */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <Layers className="w-4 h-4 text-emerald-400" />
              <h4>Binary Tree Taxonomy & Balancing Invariants</h4>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Tree Variety</th>
                    <th className="p-3.5 text-cyan-400">Degree Constraint</th>
                    <th className="p-3.5 text-emerald-400">Height Bound</th>
                    <th className="p-3.5">Distinctive Structural Property</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Full Binary Tree</td>
                    <td className="p-3.5">Degree is 0 or 2 for all nodes</td>
                    <td className="p-3.5 text-slate-400">O(n) worst case</td>
                    <td className="p-3.5">No node ever has exactly 1 child</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Complete Binary Tree</td>
                    <td className="p-3.5">At most 2 children</td>
                    <td className="p-3.5 text-emerald-300 font-bold">floor(log2 n)</td>
                    <td className="p-3.5">All levels full except last, packed left; maps to arrays</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Perfect Binary Tree</td>
                    <td className="p-3.5">Internal nodes degree 2, leaves degree 0</td>
                    <td className="p-3.5 text-emerald-300 font-bold">log2(n + 1) - 1</td>
                    <td className="p-3.5">All leaves at exact same level; N = 2^(h+1) - 1</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">Unbalanced BST</td>
                    <td className="p-3.5">Left &lt; Node &lt; Right</td>
                    <td className="p-3.5 text-rose-400 font-bold">O(n) worst case</td>
                    <td className="p-3.5">Degenerates into linked list on sorted input</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-3.5 font-bold text-white">AVL / Red-Black Tree</td>
                    <td className="p-3.5">BST with rotation invariants</td>
                    <td className="p-3.5 text-emerald-300 font-bold">Strictly O(log n)</td>
                    <td className="p-3.5">Guarantees O(log n) worst-case search, insert, and delete</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Technical Viva Interview Questions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <h4>Academic Viva & Technical Interview Questions</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interviewQuestions.map((item, idx) => (
                <div
                  key={`viva-${idx}`}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2"
                >
                  <span className="font-mono font-bold text-cyan-300 text-xs block leading-snug">
                    {item.q}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Authoritative Citations Footer */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Curriculum aligned with: Cormen, Leiserson, Rivest, Stein (CLRS Ch 10 & 12); Sedgewick (Algorithms in C); Knuth (TAOCP Vol 1).</span>
            </div>
            <span>ISO C99 Standards</span>
          </div>
        </div>
      )}
    </div>
  );
};
