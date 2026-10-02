import React, { useState } from 'react';
import { Code2, Copy, Check, Play, Terminal, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopicData } from './chapter8Data';

interface Props {
  topic: TopicData;
}

export const Chapter8Code: React.FC<Props> = ({ topic }) => {
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

  const filename =
    topic.id === 'top-801'
      ? 'hash_table.c'
      : topic.id === 'top-802'
      ? 'collision_resolution.c'
      : 'dynamic_rehashing.c';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Code Header Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="font-bold text-slate-100 text-base">{filename}</h2>
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
            <span>{filename}</span>
          </div>
          <span className="text-[11px] text-slate-500">ISO C99 Compliant & Memory Safe</span>
        </div>

        <div className="p-4 md:p-6 overflow-x-auto text-slate-300 leading-relaxed max-h-[500px] scrollbar-thin scrollbar-thumb-slate-800">
          <pre>{topic.cCode.code}</pre>
        </div>
      </div>

      {/* Program Output Terminal Simulation */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-xl">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">Standard Output (Terminal Execution)</span>
          </div>
          <span className="text-[10px] text-slate-500">gcc -std=c99 -Wall -Wextra</span>
        </div>

        <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto whitespace-pre leading-relaxed">
          {topic.cCode.sampleOutput}
        </div>
      </div>
    </div>
  );
};
