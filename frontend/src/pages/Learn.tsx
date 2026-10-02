import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { CheckCircle2, Cpu, Code2, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';

export const Learn: React.FC = () => {
  const { chapterId, topicId } = useParams();
  const [topic, setTopic] = useState<any>(null);

  useEffect(() => {
    if (topicId && topicId !== 'default') {
      axios.get(`/api/topics/${topicId}`)
        .then(res => {
          if (res.data.success) setTopic(res.data.data);
        })
        .catch(() => {
          setTopic({
            title: 'Two Pointer Technique',
            complexity: 'Easy',
            content: 'The two-pointer technique uses two indices to iterate through a sequence simultaneously to reduce time complexity from O(N^2) to O(N).\n\nCommonly applied in sorted arrays, palindrome checking, and container with most water problems.'
          });
        });
    } else {
      setTopic({
        title: 'Select a Topic to Begin',
        complexity: 'Easy',
        content: 'Choose a topic from the curriculum sidebar on the left to read theory, examine code patterns, and test your knowledge.'
      });
    }
  }, [chapterId, topicId]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <main className="ml-72 flex-1 p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4">
          <Link to="/" className="hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <span>/</span>
          <span>Chapter {chapterId || '1'}</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {topic?.complexity || 'Easy'} Complexity
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-3">{topic?.title || 'Topic Overview'}</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/visual-lab"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition-colors"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Visualizer</span>
              </Link>
              <Link
                to="/playground"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold text-sm shadow-cyan-glow"
              >
                <Code2 className="w-4 h-4" />
                <span>Practice Code</span>
              </Link>
            </div>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-4">
            <p className="whitespace-pre-line text-base">{topic?.content}</p>
          </div>

          <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
            <button className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Mark as Completed</span>
            </button>

            <Link
              to="/quiz"
              className="flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>Take Topic Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
