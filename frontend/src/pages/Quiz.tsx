import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, ArrowRight } from 'lucide-react';

export const Quiz: React.FC = () => {
  const sampleQuestions = [
    {
      id: 'q1',
      question: 'What is the worst-case time complexity of inserting an element into a Binary Search Tree (BST)?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      correctAnswer: 2
    },
    {
      id: 'q2',
      question: 'Which algorithmic strategy does Dijkstra’s shortest path algorithm employ?',
      options: ['Divide and Conquer', 'Greedy Choice', 'Dynamic Programming', 'Backtracking'],
      correctAnswer: 1
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (!submitted) setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === sampleQuestions[currentIdx].correctAnswer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setSubmitted(false);
    setCurrentIdx((prev) => (prev + 1) % sampleQuestions.length);
  };

  const q = sampleQuestions[currentIdx];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Assessment Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">DSA Concept Verification</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm font-mono text-cyan-400">
          <Award className="w-4 h-4" />
          <span>Score: {score}</span>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400">
          <span>Question {currentIdx + 1} of {sampleQuestions.length}</span>
          <span className="text-cyan-400">Multiple Choice</span>
        </div>

        <h2 className="text-xl font-bold text-slate-100">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = idx === q.correctAnswer;
            let btnStyle = 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-200';

            if (submitted) {
              if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
              else if (isSelected) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
            } else if (isSelected) {
              btnStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-cyan-glow';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-xl border text-left font-medium text-sm flex items-center justify-between transition-all ${btnStyle}`}
              >
                <span>{opt}</span>
                {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOpt === null}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 font-bold text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 shadow-cyan-glow hover:opacity-90 transition-opacity"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
