import React from 'react';
import { Globe, RotateCcw, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export const RealWorldSection: React.FC = () => {
  const caseStudies = [
    {
      title: '1. Web Browser Back/Forward Stack',
      icon: Globe,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description: 'Browsers maintain two distinct stacks: a "Back Stack" and a "Forward Stack".',
      details: [
        'Visiting a new URL pushes it onto the Back Stack.',
        'Clicking "Back" pops the current page from the Back Stack onto the Forward Stack.',
        'Visiting a brand new link clears the Forward Stack.'
      ]
    },
    {
      title: '2. Text Editor Undo/Redo Engine',
      icon: RotateCcw,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description: 'Modern editors (VSCode, MS Word) track atomic text edits via dual LIFO stacks.',
      details: [
        'Every keystroke/command pushes an operation object onto the Undo Stack.',
        'Pressing Ctrl+Z pops the operation from Undo Stack, reverses it, and pushes it onto Redo Stack.',
        'Ensures constant O(1) state restoration.'
      ]
    },
    {
      title: '3. Operating System Call Stack & Recursion',
      icon: Cpu,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      description: 'CPUs utilize function call stacks to handle recursive function execution.',
      details: [
        'Function invocation pushes stack frame containing local variables and return instruction pointer.',
        'Function return pops stack frame, restoring previous CPU register state.',
        'Infinite recursion triggers system StackOverflowError.'
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-400" />
        <h2 className="font-bold text-slate-100 text-base">Industrial Applications & Real-World Case Studies</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((study, idx) => {
          const Icon = study.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className={`p-3 rounded-xl border w-fit ${study.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-100 text-base">{study.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{study.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                {study.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
