import React, { useState } from 'react';
import { Code2, Play, Terminal } from 'lucide-react';

export const Playground: React.FC = () => {
  const [code, setCode] = useState<string>(
`// DSAForge Live Execution Playground
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

console.log("Result:", twoSum([2, 7, 11, 15], 9));`
  );

  const [output, setOutput] = useState<string>('Click "Run Code" to execute script.');

  const handleRun = () => {
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '))
      };

      const runFn = new Function('console', code);
      runFn(customConsole);
      setOutput(logs.join('\n') || 'Executed successfully with no console output.');
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/30 text-xs font-mono text-blue-400 mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>Interactive Code Execution</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Coding Playground</h1>
        </div>

        <button
          onClick={handleRun}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 shadow-cyan-glow hover:opacity-90 transition-opacity"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Run Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col h-[500px]">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">solution.js</span>
            <span className="text-[10px] font-mono text-cyan-400">JavaScript (ES6)</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-slate-900 text-slate-100 font-mono text-sm resize-none focus:outline-none focus:ring-0 leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Console Output */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col h-[500px]">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-slate-300">Console Output</span>
          </div>
          <pre className="flex-1 p-4 font-mono text-sm text-cyan-400 overflow-y-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};
