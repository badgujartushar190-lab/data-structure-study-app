import React from 'react';
import { BookOpen, CheckCircle2, FileText, Layers, ShieldCheck } from 'lucide-react';
import { TopicData } from './chapter1Data';

interface Props {
  topic: TopicData;
}

export const Chapter1Concept: React.FC<Props> = ({ topic }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Primary Course Source Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-3 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Primary Source: {topic.courseCode} — {topic.unitCode}</span>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Official Course Syllabus Aligned
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">{topic.title}</h1>
        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          {topic.description}
        </p>
      </div>

      {/* Concept Breakdown Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2>Core Definitions & Technical Explanations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topic.concepts.map((concept, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>{concept.name}</span>
                  </h3>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      concept.source === 'PDF Primary Source'
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {concept.source}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  {concept.definition}
                </p>

                {concept.example && (
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1">
                    <span className="text-cyan-400 font-bold block text-[11px]">Example:</span>
                    <p className="text-slate-300 whitespace-pre-wrap">{concept.example}</p>
                  </div>
                )}
              </div>

              {concept.usage && (
                <div className="pt-2.5 border-t border-slate-800/70 flex items-start gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Where it is used:</strong> {concept.usage}</span>
                </div>
              )}

              {concept.asciiDiagram && (
                <div className="mt-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800/90 overflow-x-auto text-[11px] font-mono text-cyan-300">
                  <pre className="whitespace-pre">{concept.asciiDiagram}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table if present (e.g. Primitive vs Non-Primitive or Linear vs Non-Linear) */}
      {topic.comparisonTable && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <Layers className="w-5 h-5 text-blue-400" />
            <h2>Comprehensive Comparison Matrix</h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
            <table className="w-full text-left text-xs md:text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-4 w-1/4">Comparison Aspect</th>
                  <th className="p-4 w-3/8 text-cyan-400 font-bold">{topic.comparisonTable.header1}</th>
                  <th className="p-4 w-3/8 text-blue-400 font-bold">{topic.comparisonTable.header2}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {topic.comparisonTable.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-850/50 transition-colors">
                    <td className="p-4 font-bold text-slate-200 bg-slate-950/40">{row.aspect}</td>
                    <td className="p-4 text-slate-300 leading-relaxed">{row.col1}</td>
                    <td className="p-4 text-slate-300 leading-relaxed">{row.col2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quick Academic Note */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Curriculum Foundation: Tanenbaum (Data Structures Using C) & Tremblay & Sorenson.</span>
        </div>
        <span className="text-slate-500">Unit 1 • SECE2291</span>
      </div>
    </div>
  );
};
