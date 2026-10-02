import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { useProgressStore } from '../../store/progressStore';
import {
  BookOpen,
  Eye,
  Cpu,
  Code2,
  Globe,
  Zap,
  HelpCircle,
  CheckCircle2,
  ArrowLeft,
  Share2
} from 'lucide-react';

import { ConceptSection } from './sections/ConceptSection';
import { VisualizationSection } from './sections/VisualizationSection';
import { OperationsSection } from './sections/OperationsSection';
import { CCodeSection } from './sections/CCodeSection';
import { RealWorldSection } from './sections/RealWorldSection';
import { ComplexitySection } from './sections/ComplexitySection';
import { PracticeSection } from './sections/PracticeSection';

// Chapter 1 Dedicated Content Architecture (SECE2291 Syllabus)
import { chapter1Topics } from './chapter1/chapter1Data';
import { Chapter1Concept } from './chapter1/Chapter1Concept';
import { Chapter1Visualizer } from './chapter1/Chapter1Visualizer';
import { Chapter1Operations } from './chapter1/Chapter1Operations';
import { Chapter1Code } from './chapter1/Chapter1Code';
import { Chapter1RealWorld } from './chapter1/Chapter1RealWorld';
import { Chapter1Complexity } from './chapter1/Chapter1Complexity';
import { Chapter1Practice } from './chapter1/Chapter1Practice';
import { Chapter1SummarySection } from './chapter1/Chapter1SummarySection';

// Chapter 2 Dedicated Content Architecture (SECE2221 / SECE2291 Syllabus)
import { chapter2Topics } from './chapter2/chapter2Data';
import { Chapter2Concept } from './chapter2/Chapter2Concept';
import { Chapter2Visualizer } from './chapter2/Chapter2Visualizer';
import { Chapter2Operations } from './chapter2/Chapter2Operations';
import { Chapter2Code } from './chapter2/Chapter2Code';
import { Chapter2RealWorld } from './chapter2/Chapter2RealWorld';
import { Chapter2Complexity } from './chapter2/Chapter2Complexity';
import { Chapter2Practice } from './chapter2/Chapter2Practice';
import { Chapter2SummarySection } from './chapter2/Chapter2SummarySection';

// Chapter 3 Dedicated Content Architecture (Search & Sort)
import { chapter3Topics } from './chapter3/chapter3Data';
import { Chapter3Concept } from './chapter3/Chapter3Concept';
import { Chapter3Visualizer } from './chapter3/Chapter3Visualizer';
import { Chapter3Operations } from './chapter3/Chapter3Operations';
import { Chapter3Code } from './chapter3/Chapter3Code';
import { Chapter3RealWorld } from './chapter3/Chapter3RealWorld';
import { Chapter3Complexity } from './chapter3/Chapter3Complexity';
import { Chapter3Practice } from './chapter3/Chapter3Practice';
import { Chapter3SummarySection } from './chapter3/Chapter3SummarySection';

// Chapter 4 Dedicated Content Architecture (Stack & Queue)
import { chapter4Topics } from './chapter4/chapter4Data';
import { Chapter4Concept } from './chapter4/Chapter4Concept';
import { Chapter4Visualizer } from './chapter4/Chapter4Visualizer';
import { Chapter4Operations } from './chapter4/Chapter4Operations';
import { Chapter4Code } from './chapter4/Chapter4Code';
import { Chapter4RealWorld } from './chapter4/Chapter4RealWorld';
import { Chapter4Complexity } from './chapter4/Chapter4Complexity';
import { Chapter4Practice } from './chapter4/Chapter4Practice';
import { Chapter4SummarySection } from './chapter4/Chapter4SummarySection';

// Chapter 5 Dedicated Content Architecture (Linked Lists)
import { chapter5Topics } from './chapter5/chapter5Data';
import { Chapter5Concept } from './chapter5/Chapter5Concept';
import { Chapter5Visualizer } from './chapter5/Chapter5Visualizer';
import { Chapter5Operations } from './chapter5/Chapter5Operations';
import { Chapter5Code } from './chapter5/Chapter5Code';
import { Chapter5RealWorld } from './chapter5/Chapter5RealWorld';
import { Chapter5Complexity } from './chapter5/Chapter5Complexity';
import { Chapter5Practice } from './chapter5/Chapter5Practice';
import { Chapter5SummarySection } from './chapter5/Chapter5SummarySection';

// Chapter 6 Dedicated Content Architecture (Linked Stack, Queue & Applications)
import { chapter6Topics } from './chapter6/chapter6Data';
import { Chapter6Concept } from './chapter6/Chapter6Concept';
import { Chapter6Visualizer } from './chapter6/Chapter6Visualizer';
import { Chapter6Operations } from './chapter6/Chapter6Operations';
import { Chapter6Code } from './chapter6/Chapter6Code';
import { Chapter6RealWorld } from './chapter6/Chapter6RealWorld';
import { Chapter6Complexity } from './chapter6/Chapter6Complexity';
import { Chapter6Practice } from './chapter6/Chapter6Practice';
import { Chapter6SummarySection } from './chapter6/Chapter6SummarySection';

// Chapter 7 Dedicated Content Architecture (Trees & Traversal)
import { chapter7Topics } from './chapter7/chapter7Data';
import { Chapter7Concept } from './chapter7/Chapter7Concept';
import { Chapter7Visualizer } from './chapter7/Chapter7Visualizer';
import { Chapter7Operations } from './chapter7/Chapter7Operations';
import { Chapter7Code } from './chapter7/Chapter7Code';
import { Chapter7RealWorld } from './chapter7/Chapter7RealWorld';
import { Chapter7Complexity } from './chapter7/Chapter7Complexity';
import { Chapter7Practice } from './chapter7/Chapter7Practice';
import { Chapter7SummarySection } from './chapter7/Chapter7SummarySection';

// Chapter 8 Dedicated Content Architecture (Hashing & Tables)
import { chapter8Topics } from './chapter8/chapter8Data';
import { Chapter8Concept } from './chapter8/Chapter8Concept';
import { Chapter8Visualizer } from './chapter8/Chapter8Visualizer';
import { Chapter8Operations } from './chapter8/Chapter8Operations';
import { Chapter8Code } from './chapter8/Chapter8Code';
import { Chapter8RealWorld } from './chapter8/Chapter8RealWorld';
import { Chapter8Complexity } from './chapter8/Chapter8Complexity';
import { Chapter8Practice } from './chapter8/Chapter8Practice';
import { Chapter8SummarySection } from './chapter8/Chapter8SummarySection';

export const TopicPage: React.FC = () => {
  const { chapterId, topicId } = useParams();
  const { activeTab, setActiveTab, completedTopicIds, markTopicCompleted } = useProgressStore();
  const [copiedLink, setCopiedLink] = useState(false);

  const sections = [
    { id: 'concept', label: '1. Concept', icon: BookOpen },
    { id: 'visualization', label: '2. Visualize', icon: Eye },
    { id: 'operations', label: '3. Operations', icon: Cpu },
    { id: 'c-code', label: '4. C Code', icon: Code2 },
    { id: 'real-world', label: '5. Real World', icon: Globe },
    { id: 'complexity', label: '6. Complexity', icon: Zap },
    { id: 'practice', label: '7. Practice', icon: HelpCircle },
  ];

  // Detect if current route belongs to Chapter 1, 2, 3, 4, 5, 6, 7, or 8
  const isChapter1 =
    chapterId === 'chap-1' ||
    chapterId === '1' ||
    (topicId && topicId.startsWith('top-10'));

  const isChapter2 =
    chapterId === 'chap-2' ||
    chapterId === '2' ||
    (topicId && topicId.startsWith('top-20'));

  const isChapter3 =
    chapterId === 'chap-3' ||
    chapterId === '3' ||
    (topicId && topicId.startsWith('top-30'));

  const isChapter4 =
    chapterId === 'chap-4' ||
    chapterId === '4' ||
    (topicId && (topicId.startsWith('top-40') || topicId === 'top-stack' || topicId === 'top-queue' || topicId === 'top-mono'));

  const isChapter5 =
    chapterId === 'chap-5' ||
    chapterId === '5' ||
    (topicId && topicId.startsWith('top-50'));

  const isChapter6 =
    chapterId === 'chap-6' ||
    chapterId === '6' ||
    (topicId && topicId.startsWith('top-60'));

  const isChapter7 =
    chapterId === 'chap-7' ||
    chapterId === '7' ||
    (topicId && topicId.startsWith('top-70'));

  const isChapter8 =
    chapterId === 'chap-8' ||
    chapterId === '8' ||
    (topicId && topicId.startsWith('top-80'));

  // Resolve currentTopicId handling legacy IDs gracefully
  let resolvedTopicId = topicId;
  if (topicId === 'top-stack') resolvedTopicId = 'top-401';
  else if (topicId === 'top-queue') resolvedTopicId = 'top-403';
  else if (topicId === 'top-mono') resolvedTopicId = 'top-401';

  const currentTopicId =
    resolvedTopicId && resolvedTopicId !== 'default'
      ? resolvedTopicId
      : isChapter1
      ? 'top-101'
      : isChapter2
      ? 'top-201'
      : isChapter3
      ? 'top-301'
      : isChapter4
      ? 'top-401'
      : isChapter5
      ? 'top-501'
      : isChapter6
      ? 'top-601'
      : isChapter7
      ? 'top-701'
      : isChapter8
      ? 'top-801'
      : 'top-stack';

  const isCompleted = completedTopicIds.includes(currentTopicId);
  const c1Topic = isChapter1 ? chapter1Topics[currentTopicId] || chapter1Topics['top-101'] : null;
  const c2Topic = isChapter2 ? chapter2Topics[currentTopicId] || chapter2Topics['top-201'] : null;
  const c3Topic = isChapter3 ? chapter3Topics[currentTopicId] || chapter3Topics['top-301'] : null;
  const c4Topic = isChapter4 ? chapter4Topics[currentTopicId] || chapter4Topics['top-401'] : null;
  const c5Topic = isChapter5 ? chapter5Topics[currentTopicId] || chapter5Topics['top-501'] : null;
  const c6Topic = isChapter6 ? chapter6Topics[currentTopicId] || chapter6Topics['top-601'] : null;
  const c7Topic = isChapter7 ? chapter7Topics[currentTopicId] || chapter7Topics['top-701'] : null;
  const c8Topic = isChapter8 ? chapter8Topics[currentTopicId] || chapter8Topics['top-801'] : null;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-6.5rem)] bg-[#F8FAFC] text-slate-900 font-sans">
      <Sidebar />

      <main className="ml-[260px] flex-1 p-6 md:p-8 max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-medium">Chapter {isChapter1 ? '1' : isChapter2 ? '2' : isChapter3 ? '3' : isChapter4 ? '4' : isChapter5 ? '5' : isChapter6 ? '6' : isChapter7 ? '7' : isChapter8 ? '8' : chapterId || '1'}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-md">
              {c1Topic ? c1Topic.title : c2Topic ? c2Topic.title : c3Topic ? c3Topic.title : c4Topic ? c4Topic.title : c5Topic ? c5Topic.title : c6Topic ? c6Topic.title : c7Topic ? c7Topic.title : c8Topic ? c8Topic.title : currentTopicId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Topic'}</span>
            </button>

            <button
              onClick={() => markTopicCompleted(currentTopicId)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                isCompleted
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-700'
                  : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>
          </div>
        </div>

        {/* Master 7-Segmented Tab Bar */}
        <div className="bg-white border border-slate-200 p-1.5 rounded-xl flex items-center gap-1.5 overflow-x-auto scrollbar-none shadow-sm">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveTab(sec.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Segmented Section Content Container */}
        <div className="pt-2">
          {isChapter1 && c1Topic ? (
            <>
              {activeTab === 'concept' && <Chapter1Concept topic={c1Topic} />}
              {activeTab === 'visualization' && <Chapter1Visualizer topic={c1Topic} />}
              {activeTab === 'operations' && <Chapter1Operations topic={c1Topic} />}
              {activeTab === 'c-code' && <Chapter1Code topic={c1Topic} />}
              {activeTab === 'real-world' && <Chapter1RealWorld topic={c1Topic} />}
              {activeTab === 'complexity' && <Chapter1Complexity topic={c1Topic} />}
              {activeTab === 'practice' && <Chapter1Practice topic={c1Topic} />}

              {/* Chapter 1 Summary, Revision Table, Viva & Official Citations */}
              <Chapter1SummarySection />
            </>
          ) : isChapter2 && c2Topic ? (
            <>
              {activeTab === 'concept' && <Chapter2Concept topic={c2Topic} />}
              {activeTab === 'visualization' && <Chapter2Visualizer topic={c2Topic} />}
              {activeTab === 'operations' && <Chapter2Operations topic={c2Topic} />}
              {activeTab === 'c-code' && <Chapter2Code topic={c2Topic} />}
              {activeTab === 'real-world' && <Chapter2RealWorld topic={c2Topic} />}
              {activeTab === 'complexity' && <Chapter2Complexity topic={c2Topic} />}
              {activeTab === 'practice' && <Chapter2Practice topic={c2Topic} />}

              {/* Chapter 2 Quick Reference, Comparison Tables, Viva & Official Citations */}
              <Chapter2SummarySection />
            </>
          ) : isChapter3 && c3Topic ? (
            <>
              {activeTab === 'concept' && <Chapter3Concept topic={c3Topic} />}
              {activeTab === 'visualization' && <Chapter3Visualizer topic={c3Topic} />}
              {activeTab === 'operations' && <Chapter3Operations topic={c3Topic} />}
              {activeTab === 'c-code' && <Chapter3Code topic={c3Topic} />}
              {activeTab === 'real-world' && <Chapter3RealWorld topic={c3Topic} />}
              {activeTab === 'complexity' && <Chapter3Complexity topic={c3Topic} />}
              {activeTab === 'practice' && <Chapter3Practice topic={c3Topic} />}

              {/* Chapter 3 Master Summary, Comparison Matrix, Search vs Sort & Academic Citations */}
              <Chapter3SummarySection />
            </>
          ) : isChapter4 && c4Topic ? (
            <>
              {activeTab === 'concept' && <Chapter4Concept topic={c4Topic} />}
              {activeTab === 'visualization' && <Chapter4Visualizer topic={c4Topic} />}
              {activeTab === 'operations' && <Chapter4Operations topic={c4Topic} />}
              {activeTab === 'c-code' && <Chapter4Code topic={c4Topic} />}
              {activeTab === 'real-world' && <Chapter4RealWorld topic={c4Topic} />}
              {activeTab === 'complexity' && <Chapter4Complexity topic={c4Topic} />}
              {activeTab === 'practice' && <Chapter4Practice topic={c4Topic} />}

              {/* Chapter 4 Master Reference, Comparison Matrix, Viva & Official Citations */}
              <Chapter4SummarySection />
            </>
          ) : isChapter5 && c5Topic ? (
            <>
              {activeTab === 'concept' && <Chapter5Concept topic={c5Topic} />}
              {activeTab === 'visualization' && <Chapter5Visualizer topic={c5Topic} />}
              {activeTab === 'operations' && <Chapter5Operations topic={c5Topic} />}
              {activeTab === 'c-code' && <Chapter5Code topic={c5Topic} />}
              {activeTab === 'real-world' && <Chapter5RealWorld topic={c5Topic} />}
              {activeTab === 'complexity' && <Chapter5Complexity topic={c5Topic} />}
              {activeTab === 'practice' && <Chapter5Practice topic={c5Topic} />}

              {/* Chapter 5 Master Reference, Comparison Matrix, Viva & Official Citations */}
              <Chapter5SummarySection />
            </>
          ) : isChapter6 && c6Topic ? (
            <>
              {activeTab === 'concept' && <Chapter6Concept topic={c6Topic} />}
              {activeTab === 'visualization' && <Chapter6Visualizer topic={c6Topic} />}
              {activeTab === 'operations' && <Chapter6Operations topic={c6Topic} />}
              {activeTab === 'c-code' && <Chapter6Code topic={c6Topic} />}
              {activeTab === 'real-world' && <Chapter6RealWorld topic={c6Topic} />}
              {activeTab === 'complexity' && <Chapter6Complexity topic={c6Topic} />}
              {activeTab === 'practice' && <Chapter6Practice topic={c6Topic} />}

              {/* Chapter 6 Master Reference, Comparison Matrix, Viva & Official Citations */}
              <Chapter6SummarySection />
            </>
          ) : isChapter7 && c7Topic ? (
            <>
              {activeTab === 'concept' && <Chapter7Concept topic={c7Topic} />}
              {activeTab === 'visualization' && <Chapter7Visualizer topic={c7Topic} />}
              {activeTab === 'operations' && <Chapter7Operations topic={c7Topic} />}
              {activeTab === 'c-code' && <Chapter7Code topic={c7Topic} />}
              {activeTab === 'real-world' && <Chapter7RealWorld topic={c7Topic} />}
              {activeTab === 'complexity' && <Chapter7Complexity topic={c7Topic} />}
              {activeTab === 'practice' && <Chapter7Practice topic={c7Topic} />}

              {/* Chapter 7 Master Reference, Comparison Matrix, Viva & Official Citations */}
              <Chapter7SummarySection />
            </>
          ) : isChapter8 && c8Topic ? (
            <>
              {activeTab === 'concept' && <Chapter8Concept topic={c8Topic} />}
              {activeTab === 'visualization' && <Chapter8Visualizer topic={c8Topic} />}
              {activeTab === 'operations' && <Chapter8Operations topic={c8Topic} />}
              {activeTab === 'c-code' && <Chapter8Code topic={c8Topic} />}
              {activeTab === 'real-world' && <Chapter8RealWorld topic={c8Topic} />}
              {activeTab === 'complexity' && <Chapter8Complexity topic={c8Topic} />}
              {activeTab === 'practice' && <Chapter8Practice topic={c8Topic} />}

              {/* Chapter 8 Master Reference, Comparison Matrix, Viva & Official Citations */}
              <Chapter8SummarySection />
            </>
          ) : (
            <>
              {activeTab === 'concept' && <ConceptSection />}
              {activeTab === 'visualization' && <VisualizationSection />}
              {activeTab === 'operations' && <OperationsSection />}
              {activeTab === 'c-code' && <CCodeSection />}
              {activeTab === 'real-world' && <RealWorldSection />}
              {activeTab === 'complexity' && <ComplexitySection />}
              {activeTab === 'practice' && <PracticeSection />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};
