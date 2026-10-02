import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Code2, HelpCircle, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative p-8 md:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
      >
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Data Structures & Algorithms Curriculum</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Master Data Structures & Algorithms with <span className="text-blue-600">Deep Visual Understanding</span>
          </h1>

          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Step-by-step interactive animations, frame-by-frame visualizers, native C code implementation, real-world case studies, and structured technical assessments.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/learn/chap-1/top-101"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white shadow-sm hover:shadow transition-all"
            >
              <span>Start Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/visual-lab"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-700 transition-colors"
            >
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Launch Visual Lab</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/visual-lab" className="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">Interactive Visual Lab</h3>
          <p className="text-sm text-slate-600 leading-relaxed">Visualize pointer movements, stack frames, sorting passes, and tree traversals frame by frame.</p>
        </Link>

        <Link to="/playground" className="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-105 transition-transform">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors">Coding Playground</h3>
          <p className="text-sm text-slate-600 leading-relaxed">Write, execute, and analyze C99 algorithmic solutions with real-time output feedback.</p>
        </Link>

        <Link to="/quiz" className="group p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1.5 group-hover:text-purple-600 transition-colors">Quiz & Assessment</h3>
          <p className="text-sm text-slate-600 leading-relaxed">Test your concept mastery with conceptual multiple-choice and algorithmic complexity evaluations.</p>
        </Link>
      </div>

      {/* Chapters Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Curriculum Modules</h2>
            <p className="text-sm text-slate-500 mt-0.5">Comprehensive 8-chapter syllabus covering linear and non-linear data structures</p>
          </div>
          <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {chapters.length} Modules Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {chapters.map((chap) => (
            <motion.div
              key={chap.id}
              whileHover={{ y: -3 }}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                    Module 0{chap.order}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">{chap.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{chap.description}</p>
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
                className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors"
              >
                <span>Study Module</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
