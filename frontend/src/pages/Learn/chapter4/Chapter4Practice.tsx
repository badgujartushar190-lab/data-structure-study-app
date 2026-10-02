import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw } from 'lucide-react';
import { useProgressStore } from '../../../store/progressStore';
import { TopicData } from './chapter4Data';

interface Props {
  topic: TopicData;
}

export const Chapter4Practice: React.FC<Props> = ({ topic }) => {
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
            Technical Assessment & Practice ({topic.title})
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

                  let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (submitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-cyan-glow';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`p-3.5 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono font-bold">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-4 rounded-xl text-xs font-mono border space-y-1 ${
                    selectedOpt === q.correctAnswer
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold">
                    {selectedOpt === q.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Correct! Well done.</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span>Incorrect. Correct Option: {String.fromCharCode(65 + q.correctAnswer)}</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-300 leading-relaxed text-[11px] pt-1">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Action Bar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div>
          <span className="text-xs text-slate-400 font-mono block">
            Progress: {Object.keys(selectedAnswers).length} of {questions.length} answered
          </span>
          {submitted && (
            <div className="flex items-center gap-2 mt-1">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-bold text-white">
                Final Score: {scoreCount} / {questions.length} (
                {Math.round((scoreCount / questions.length) * 100)}%)
              </span>
            </div>
          )}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length === 0}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-slate-950 shadow-cyan-glow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Submit Assessment
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
          >
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
};
