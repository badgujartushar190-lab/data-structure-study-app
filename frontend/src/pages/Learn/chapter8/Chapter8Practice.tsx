import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw } from 'lucide-react';
import { useProgressStore } from '../../../store/progressStore';
import { TopicData } from './chapter8Data';

interface Props {
  topic: TopicData;
}

export const Chapter8Practice: React.FC<Props> = ({ topic }) => {
  const { setQuizScore, markTopicCompleted } = useProgressStore();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = topic.practice;

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
            Technical Assessment & Practice ({topic.title})
          </h2>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        )}
      </div>

      {/* Score Notification Banner */}
      {submitted && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 border border-purple-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Assessment Completed!</h3>
              <p className="text-xs text-slate-400">
                You scored {scoreCount} out of {questions.length} questions correctly (
                {Math.round((scoreCount / questions.length) * 100)}%).
              </p>
            </div>
          </div>
          <div className="text-2xl font-extrabold font-mono text-purple-400">
            {scoreCount} / {questions.length}
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const isSelected = selectedAnswers[qIdx] !== undefined;
          const isCorrect = submitted && selectedAnswers[qIdx] === q.correctAnswer;
          const isWrong = submitted && isSelected && selectedAnswers[qIdx] !== q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl border transition-all ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {qIdx + 1}
                  </span>
                  <h3 className="font-semibold text-slate-100 text-sm md:text-base leading-snug">
                    {q.question}
                  </h3>
                </div>

                {submitted && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30 font-mono">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  const isChecked = selectedAnswers[qIdx] === optIdx;
                  const isTargetCorrect = submitted && optIdx === q.correctAnswer;

                  return (
                    <button
                      key={`opt-${optIdx}`}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-sans flex items-center justify-between transition-all ${
                        submitted
                          ? isTargetCorrect
                            ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold'
                            : isChecked
                            ? 'bg-rose-500/20 border-rose-500/60 text-rose-200'
                            : 'bg-slate-950/40 border-slate-800 text-slate-400 opacity-60'
                          : isChecked
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-200 font-semibold shadow-cyan-glow'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                            submitted
                              ? isTargetCorrect
                                ? 'border-emerald-400 text-emerald-400'
                                : isChecked
                                ? 'border-rose-400 text-rose-400'
                                : 'border-slate-700 text-slate-600'
                              : isChecked
                              ? 'border-cyan-400 text-cyan-400'
                              : 'border-slate-700 text-slate-500'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {submitted && isTargetCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {submitted && isWrong && isChecked && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (Shown after submit) */}
              {submitted && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
                  <strong className="text-cyan-400 font-mono uppercase tracking-wider text-[10px] block mb-1">
                    Technical Rationale:
                  </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Action Button */}
      {!submitted && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs shadow-lg hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Submit All Answers ({Object.keys(selectedAnswers).length} / {questions.length})
          </button>
        </div>
      )}
    </div>
  );
};
