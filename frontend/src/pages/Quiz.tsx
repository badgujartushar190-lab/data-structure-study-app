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
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Assessment Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">DSA Concept Verification</h1>
          <p className="text-sm text-slate-600 mt-1">Challenge your understanding with interactive problem evaluations</p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-800">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Score: <strong className="text-blue-600 font-bold">{score}</strong></span>
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-xl bg-white border border-slate-200 space-y-6 shadow-sm">
        <div className="flex justify-between items-center text-xs font-medium text-slate-500">
          <span>Question {currentIdx + 1} of {sampleQuestions.length}</span>
          <span className="text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-semibold">Multiple Choice</span>
        </div>

        <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const isSelected = selectedOpt === idx;
            const isCorrect = idx === q.correctAnswer;
            let btnStyle = 'bg-slate-50 border-slate-200 hover:bg-blue-50/40 hover:border-blue-200 text-slate-800';

            if (submitted) {
              if (isCorrect) btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-400';
              else if (isSelected) btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-semibold ring-1 ring-rose-400';
            } else if (isSelected) {
              btnStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-semibold ring-1 ring-blue-500';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full p-4 rounded-xl border text-left font-medium text-sm flex items-center justify-between transition-all ${btnStyle}`}
              >
                <span>{opt}</span>
                {submitted && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                {submitted && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOpt === null}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-white shadow-sm transition-all"
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
