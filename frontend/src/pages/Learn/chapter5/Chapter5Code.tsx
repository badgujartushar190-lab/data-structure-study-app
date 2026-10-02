import React, { useState } from 'react';
import { Code2, Copy, Check, Play, Terminal, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopicData } from './chapter5Data';

interface Props {
  topic: TopicData;
}

export const Chapter5Code: React.FC<Props> = ({ topic }) => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(topic.cCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunInPlayground = () => {
    navigate('/playground', { state: { code: topic.cCode.code } });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Code Header Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="font-bold text-slate-100 text-base">{topic.cCode.filename}</h2>
            <p className="text-xs text-slate-400">{topic.cCode.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied!' : 'Copy C Code'}</span>
          </button>

          <button
            onClick={handleRunInPlayground}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-xs text-slate-950 shadow-cyan-glow hover:opacity-90 transition-opacity"
          >
            <Play className="w-3.5 h-3.5 fill-slate-950" />
            <span>Open in Playground</span>
          </button>
        </div>
      </div>

      {/* C99 Code Box */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2 text-xs">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>{topic.cCode.filename}</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> ISO C99 Validated
          </span>
        </div>
        <div className="p-5 overflow-x-auto text-slate-200 leading-relaxed font-mono">
          <pre>{topic.cCode.code}</pre>
        </div>
      </div>

      {/* Code Explanation Cards */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Implementation Highlights & Code Walkthrough</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic.cCode.explanation.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Output Terminal */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2 text-xs">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulated Terminal Output (ISO C99 Execution)</span>
          </div>
          <span className="text-[10px] text-slate-500">Exit Code: 0</span>
        </div>
        <div className="p-5 text-emerald-400 font-mono overflow-x-auto whitespace-pre">
          {topic.cCode.simulatedOutput}
        </div>
      </div>
    </div>
  );
};
