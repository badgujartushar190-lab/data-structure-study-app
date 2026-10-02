import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Layers,
  Circle,
  ChevronRight,
  ChevronDown,
  Cpu,
  Code2,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2
} from 'lucide-react';
import { useProgressStore } from '../store/progressStore';

export const Sidebar: React.FC = () => {
  const { chapterId } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [openChapter, setOpenChapter] = useState<string>(chapterId || 'chap-1');
  const { completedTopicIds } = useProgressStore();

  useEffect(() => {
    if (chapterId) {
      setOpenChapter(chapterId);
    }
  }, [chapterId]);

  const blueprintChapters = [
    {
      id: 'chap-1',
      order: 1,
      title: '1. Introduction to DSA',
      topics: [
        { id: 'top-101', title: 'Basic Terminology', complexity: 'Easy' },
        { id: 'top-102', title: 'Classification of Data Structures: Primitive and Non-Primitive', complexity: 'Easy' },
        { id: 'top-103', title: 'Linear and Non-linear', complexity: 'Easy' },
        { id: 'top-104', title: 'Operations on Data Structures', complexity: 'Easy' },
      ]
    },
    {
      id: 'chap-2',
      order: 2,
      title: '2. Array Data Structure',
      topics: [
        { id: 'top-201', title: 'Array Representation', complexity: 'Easy' },
        { id: 'top-202', title: 'Array as an Abstract Data Type', complexity: 'Easy' },
        { id: 'top-203', title: 'Programming Array in C', complexity: 'Easy' },
        { id: 'top-204', title: 'Sparse Matrices, Sparse Representations, and its Advantages', complexity: 'Medium' },
        { id: 'top-205', title: 'Row-major Order and Column-major Order Representation', complexity: 'Medium' },
      ]
    },
    {
      id: 'chap-3',
      order: 3,
      title: '3. Search & Sort',
      topics: [
        { id: 'top-301', title: 'Linear Search', complexity: 'Easy' },
        { id: 'top-302', title: 'Binary Search', complexity: 'Easy' },
        { id: 'top-303', title: 'Bubble Sort', complexity: 'Easy' },
        { id: 'top-304', title: 'Insertion Sort', complexity: 'Easy' },
        { id: 'top-305', title: 'Selection Sort', complexity: 'Easy' },
        { id: 'top-306', title: 'Radix Sort', complexity: 'Medium' },
      ]
    },
    {
      id: 'chap-4',
      order: 4,
      title: '4. Stack & Queue',
      topics: [
        { id: 'top-401', title: 'Stack & Its Applications', complexity: 'Easy' },
        { id: 'top-402', title: 'Expression Processing & Recursion', complexity: 'Medium' },
        { id: 'top-403', title: 'Queue & Its Applications', complexity: 'Easy' },
      ]
    },
    {
      id: 'chap-5',
      order: 5,
      title: '5. Linked Lists',
      topics: [
        { id: 'top-501', title: 'Dynamic Memory & Structures', complexity: 'Easy' },
        { id: 'top-502', title: 'Linked List Fundamentals', complexity: 'Easy' },
        { id: 'top-503', title: 'Types of Linked Lists', complexity: 'Medium' },
        { id: 'top-504', title: 'Linked List Applications', complexity: 'Medium' },
      ]
    },
    {
      id: 'chap-6',
      order: 6,
      title: '6. Linked Stack, Queue & Applications',
      topics: [
        { id: 'top-601', title: 'Linked Stack Implementation', complexity: 'Easy' },
        { id: 'top-602', title: 'Linked Queue Implementation', complexity: 'Easy' },
        { id: 'top-603', title: 'Linked List Applications', complexity: 'Medium' },
      ]
    },
    {
      id: 'chap-7',
      order: 7,
      title: '7. Trees & Traversal',
      topics: [
        { id: 'top-701', title: 'Tree Fundamentals & Binary Trees', complexity: 'Easy' },
        { id: 'top-702', title: 'Binary Search Trees (BST)', complexity: 'Medium' },
        { id: 'top-703', title: 'Tree Traversals & Applications', complexity: 'Medium' },
      ]
    },
    {
      id: 'chap-8',
      order: 8,
      title: '8. Hashing & Tables',
      topics: [
        { id: 'top-801', title: 'Hashing Fundamentals & Hash Tables', complexity: 'Easy' },
        { id: 'top-802', title: 'Hash Functions & Collision Resolution', complexity: 'Medium' },
        { id: 'top-803', title: 'Hashing Applications & Performance', complexity: 'Medium' },
      ]
    }
  ];

  const toggleChapter = (id: string) => {
    setOpenChapter((prev) => (prev === id ? '' : id));
  };

  if (collapsed) {
    return (
      <aside className="w-16 bg-white border-r border-slate-200 h-[calc(100vh-6.5rem)] fixed top-[6.5rem] left-0 z-40 flex flex-col items-center py-4 gap-6 transition-all shadow-sm">
        <button
          onClick={() => setCollapsed(false)}
          className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
          title="Expand Syllabus Navigator"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-3 text-slate-500">
          <NavLink to="/visual-lab" className="p-2.5 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors" title="Visual Lab">
            <Cpu className="w-5 h-5" />
          </NavLink>
          <NavLink to="/playground" className="p-2.5 rounded-lg hover:bg-slate-50 hover:text-blue-600 transition-colors" title="Playground">
            <Code2 className="w-5 h-5" />
          </NavLink>
          <NavLink to="/quiz" className="p-2.5 rounded-lg hover:bg-slate-50 hover:text-purple-600 transition-colors" title="Quiz">
            <HelpCircle className="w-5 h-5" />
          </NavLink>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[260px] bg-white border-r border-slate-200 h-[calc(100vh-6.5rem)] fixed top-[6.5rem] left-0 z-40 flex flex-col justify-between p-3 overflow-y-auto transition-all shadow-sm">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Syllabus (8 Chapters)</span>
          </div>
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Collapse Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Chapters Accordion List */}
        <div className="space-y-1.5">
          {blueprintChapters.map((chap) => {
            const isOpen = openChapter === chap.id;
            return (
              <div key={chap.id} className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <button
                  onClick={() => toggleChapter(chap.id)}
                  className={`w-full px-3 py-2.5 flex items-center justify-between text-left transition-colors ${
                    isOpen ? 'bg-slate-50/80 font-bold text-slate-900' : 'bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="text-xs font-semibold truncate pr-2">{chap.title}</span>
                  {isOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-1.5 space-y-1 bg-slate-50/50 border-t border-slate-100">
                    {chap.topics.map((topic) => {
                      const isCompleted = completedTopicIds.includes(topic.id);
                      return (
                        <NavLink
                          key={topic.id}
                          to={`/learn/${chap.id}/${topic.id}`}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] transition-all ${
                              isActive
                                ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/90 shadow-sm'
                                : 'text-slate-600 hover:bg-white hover:text-slate-900'
                            }`
                          }
                        >
                          <div className="flex items-center gap-2 truncate pr-1">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <Circle className="w-3 h-3 text-slate-300 shrink-0" />
                            )}
                            <span className="truncate">{topic.title}</span>
                          </div>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-mono shrink-0 font-medium ${
                              topic.complexity === 'Easy'
                                ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60'
                                : topic.complexity === 'Medium'
                                ? 'text-amber-700 bg-amber-50 border border-amber-200/60'
                                : 'text-rose-700 bg-rose-50 border border-rose-200/60'
                            }`}
                          >
                            {topic.complexity}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Auxiliary Tools Footer Links */}
      <div className="pt-3 border-t border-slate-200 space-y-1 mt-4">
        <span className="px-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
          Auxiliary Tools
        </span>
        <NavLink
          to="/visual-lab"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
        >
          <Cpu className="w-4 h-4 text-blue-600" />
          <span>Interactive Visual Lab</span>
        </NavLink>
        <NavLink
          to="/playground"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
        >
          <Code2 className="w-4 h-4 text-blue-600" />
          <span>C/JS Playground</span>
        </NavLink>
        <NavLink
          to="/quiz"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-purple-600 hover:bg-slate-50 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-purple-600" />
          <span>Assessment Engine</span>
        </NavLink>
      </div>
    </aside>
  );
};
