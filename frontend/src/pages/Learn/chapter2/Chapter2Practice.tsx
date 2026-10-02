import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw, BookOpen } from 'lucide-react';
import { useProgressStore } from '../../../store/progressStore';
import { TopicData } from './chapter2Data';

interface Props {
  topic: TopicData;
}

export const Chapter2Practice: React.FC<Props> = ({ topic }) => {
  const { setQuizScore, markTopicCompleted } = useProgressStore();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = topic.practiceQuestions;

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
    setQuizScore(topic.id, score);
    markTopicCompleted(topic.id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const scoreCount = questions.reduce(
    (acc, q, idx) => (selectedAnswers[idx] === q.correctAnswer ? acc + 1 : acc),
    0
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-purple-400" />
          <h2 className="font-bold text-slate-100 text-base">
            Topic Assessment & Practice Questions ({topic.title})
          </h2>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Retake Questions</span>
          </button>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const selectedOpt = selectedAnswers[qIdx];

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700/80 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">Question {qIdx + 1} of {questions.length}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <span className="text-slate-500 text-[11px]">{q.conceptRef}</span>
              </div>

              <h3 className="text-base font-bold text-slate-100 leading-snug">{q.question}</h3>

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
                      {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Academic Explanation:</span>
                  </div>
                  <p className="leading-relaxed text-slate-400">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        {!submitted ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-mono text-slate-400">
              {Object.keys(selectedAnswers).length} of {questions.length} questions answered
            </span>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers).length < questions.length}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-xs shadow-cyan-glow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Submit Topic Assessment
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Assessment Completed</span>
                <span className="text-xs font-mono text-emerald-400">
                  Score: {scoreCount} / {questions.length} Correct ({Math.round((scoreCount / questions.length) * 100)}%)
                </span>
              </div>
            </div>

            <span className="text-xs font-mono text-slate-400">
              Topic status automatically marked as completed in syllabus tracker.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
