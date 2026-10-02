import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw } from 'lucide-react';
import { useProgressStore } from '../../../store/progressStore';

export const PracticeSection: React.FC = () => {
  const { setQuizScore, markTopicCompleted } = useProgressStore();

  const questions = [
    {
      id: 'q1',
      question: 'Which principle governs the order of element insertion and removal in a Stack?',
      options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'Random Order Access', 'Sorted Priority'],
      correctAnswer: 1,
      explanation: 'Stack elements are inserted and popped from the TOP, meaning the most recently added item is retrieved first (LIFO).'
    },
    {
      id: 'q2',
      question: 'What happens when a PUSH operation is invoked on a Stack that has reached its maximum allocated capacity?',
      options: ['Stack Underflow', 'Stack Overflow', 'Automatic Memory Doubling', 'NullPointer Exception'],
      correctAnswer: 1,
      explanation: 'Stack Overflow occurs when TOP equals MAX_SIZE - 1 and additional item insertion is attempted.'
    },
    {
      id: 'q3',
      question: 'What is the time complexity of the PEEK operation in an array-backed Stack?',
      options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
      correctAnswer: 0,
      explanation: 'PEEK inspects the value at items[TOP] via direct array indexing in constant O(1) time.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (!submitted) {
      setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex });
    }
  };

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore('top-stack', score);
    markTopicCompleted('top-stack');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <h2 className="font-bold text-slate-100 text-base">Topic Mastery Quiz</h2>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedOpt = selectedAnswers[qIdx];
          return (
            <div key={q.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">Question {qIdx + 1} of {questions.length}</span>
                <span className="text-slate-500">10 Points</span>
              </div>

              <h3 className="text-base font-bold text-slate-100">{q.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOpt === optIdx;
                  const isCorrect = optIdx === q.correctAnswer;
                  let style = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

                  if (submitted) {
                    if (isCorrect) style = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    else if (isSelected) style = 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold';
                  } else if (isSelected) {
                    style = 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-cyan-glow';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-400 font-mono">
                  <strong className="text-cyan-400 block mb-1">Explanation:</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-cyan-glow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="flex items-center gap-3 text-sm font-bold text-emerald-400 font-mono">
            <Award className="w-5 h-5" />
            <span>Quiz Complete! Topic marked as completed.</span>
          </div>
        )}
      </div>
    </div>
  );
};
