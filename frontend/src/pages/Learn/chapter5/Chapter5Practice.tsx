import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, Award, RefreshCw } from 'lucide-react';
import { useProgressStore } from '../../../store/progressStore';
import { TopicData } from './chapter5Data';

interface Props {
  topic: TopicData;
}

export const Chapter5Practice: React.FC<Props> = ({ topic }) => {
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
        )}
      </div>

      {/* Submitted Result Score Banner */}
      {submitted && (
        <div
          className={`p-6 rounded-2xl border flex items-center justify-between flex-wrap gap-4 shadow-xl ${
            scoreCount >= questions.length * 0.75
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 shrink-0 text-cyan-400" />
            <div>
              <h3 className="font-bold text-base text-white">
                Assessment Complete: {scoreCount} / {questions.length} Correct
              </h3>
              <p className="text-xs text-slate-300">
                {scoreCount === questions.length
                  ? 'Outstanding! You have mastered these linked list & memory concepts.'
                  : scoreCount >= questions.length * 0.75
                  ? 'Well done! Review the detailed technical explanations below for any missed items.'
                  : 'Review the Concept and Code tabs and try again to solidify your understanding.'}
              </p>
            </div>
          </div>
          <span className="text-sm font-mono font-bold px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-cyan-400">
            {Math.round((scoreCount / questions.length) * 100)}% Score
          </span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const isCorrect = submitted && selectedAnswers[qIdx] === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl bg-slate-900/80 border space-y-4 shadow-xl transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-500/40'
                    : 'border-rose-500/40'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm md:text-base leading-snug">
                    {q.question}
                  </h3>
                </div>
                {submitted && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                        <XCircle className="w-3.5 h-3.5" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedAnswers[qIdx] === optIdx;
                  const isThisCorrect = submitted && q.correctAnswer === optIdx;
                  const isThisWrong = submitted && isThisSelected && !isThisCorrect;

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-sans flex items-center justify-between transition-all ${
                        isThisCorrect
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-200 font-semibold'
                          : isThisWrong
                          ? 'bg-rose-500/15 border-rose-500 text-rose-200'
                          : isThisSelected
                          ? 'bg-cyan-500/15 border-cyan-500 text-cyan-200 font-semibold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border ${
                            isThisCorrect
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : isThisWrong
                              ? 'bg-rose-500 text-white border-rose-400'
                              : isThisSelected
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                              : 'border-slate-700 text-slate-500'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {submitted && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans space-y-1">
                  <strong className="text-cyan-400 font-mono text-[11px] uppercase block">
                    Technical Explanation:
                  </strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
              Object.keys(selectedAnswers).length === questions.length
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-glow hover:opacity-90'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            Submit Assessment ({Object.keys(selectedAnswers).length} / {questions.length} Answered)
          </button>
        </div>
      )}
    </div>
  );
};
