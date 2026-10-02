import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Code2, HelpCircle, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import axios from 'axios';

interface Chapter {
  id: string;
  order: number;
  title: string;
  description: string;
}

export const Home: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    axios.get('/api/chapters')
      .then((res) => {
        if (res.data.success) {
          setChapters(res.data.data);
        }
      })
      .catch(() => {
        // Fallback static list if API disconnected
        setChapters([
          { id: 'chap-1', order: 1, title: 'Introduction to DSA', description: 'Basic terminology, classification (primitive & non-primitive, linear & non-linear), and core operations.' },
          { id: 'chap-2', order: 2, title: 'Array Data Structure', description: 'Array representation (1D & 2D), ADT specification, C99 programming, sparse matrices, and row/column-major order.' },
          { id: 'chap-3', order: 3, title: 'Search & Sort', description: 'Linear search, binary search, bubble sort, insertion sort, selection sort, and radix sort.' },
          { id: 'chap-4', order: 4, title: '4. Stack & Queue', description: 'Stack LIFO principle, Expression processing, recursion call stacks, and Queue FIFO with circular buffers.' },
          { id: 'chap-5', order: 5, title: '5. Linked Lists', description: 'Dynamic memory allocation (malloc, calloc, realloc, free), Singly/Doubly/Circular linked lists, and systems applications.' },
          { id: 'chap-6', order: 6, title: '6. Linked Stack, Queue & Applications', description: 'Linked Stack (LIFO), Linked Queue (FIFO), and practical applications (polynomials, sparse graphs, hash chaining).' },
          { id: 'chap-7', order: 7, title: '7. Trees & Traversal', description: 'Tree fundamentals, Binary Search Trees (BST), and DFS/BFS traversals (preorder, inorder, postorder, level-order).' },
          { id: 'chap-8', order: 8, title: '8. Hashing & Tables', description: 'Direct hashing, collision resolution (chaining & linear probing), load factors, and dynamic rehashing.' },
        ]);
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative p-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous DSA Architect Platform</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Forge Your Mastery in <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Data Structures & Algorithms</span>
          </h1>

          <p className="text-slate-400 text-lg">
            Interactive visualizer labs, real-time code execution environment, guided step-by-step topic breakdown, and comprehensive technical assessment engines.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/learn/chap-1/top-101"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-slate-950 shadow-cyan-glow hover:opacity-90 transition-opacity"
            >
              <span>Start Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/visual-lab"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 font-semibold text-slate-200 transition-colors"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Launch Visual Lab</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/visual-lab" className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:shadow-cyan-glow transition-all">
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Interactive Visual Lab</h3>
          <p className="text-sm text-slate-400">Visualize pointers, tree traversals, arrays, and graph algorithms in real-time frame by frame.</p>
        </Link>

        <Link to="/playground" className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:shadow-blue-glow transition-all">
          <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Coding Playground</h3>
          <p className="text-sm text-slate-400">Write, test, and analyze complexity of JavaScript/TypeScript solutions with live execution feedback.</p>
        </Link>

        <Link to="/quiz" className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-2">Quiz & Assessment</h3>
          <p className="text-sm text-slate-400">Test your DSA concept mastery with conceptual multiple-choice and algorithmic code challenges.</p>
        </Link>
      </div>

      {/* Chapters Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-100">Core DSA Modules</h2>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            {chapters.length} Chapters Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((chap) => (
            <motion.div
              key={chap.id}
              whileHover={{ y: -4 }}
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    CH-0{chap.order}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                </div>
                <h3 className="font-bold text-slate-200 text-base mb-2">{chap.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{chap.description}</p>
              </div>

              <Link
                to={
                  chap.id === 'chap-1'
                    ? '/learn/chap-1/top-101'
                    : chap.id === 'chap-2' || chap.id === '2'
                    ? '/learn/chap-2/top-201'
                    : chap.id === 'chap-3' || chap.id === '3'
                    ? '/learn/chap-3/top-301'
                    : chap.id === 'chap-4' || chap.id === '4'
                    ? '/learn/chap-4/top-401'
                    : chap.id === 'chap-5' || chap.id === '5'
                    ? '/learn/chap-5/top-501'
                    : chap.id === 'chap-6' || chap.id === '6'
                    ? '/learn/chap-6/top-601'
                    : chap.id === 'chap-7' || chap.id === '7'
                    ? '/learn/chap-7/top-701'
                    : chap.id === 'chap-8' || chap.id === '8'
                    ? '/learn/chap-8/top-801'
                    : `/learn/${chap.id}/default`
                }
                className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>Explore Topics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
