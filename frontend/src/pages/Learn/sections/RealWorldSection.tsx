import React from 'react';
import { Globe, RotateCcw, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export const RealWorldSection: React.FC = () => {
  const caseStudies = [
    {
      title: '1. Web Browser Back/Forward Stack',
      icon: Globe,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
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
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
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
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'CPUs utilize function call stacks to handle recursive function execution.',
      details: [
        'Function invocation pushes stack frame containing local variables and return instruction pointer.',
        'Function return pops stack frame, restoring previous CPU register state.',
        'Infinite recursion triggers system StackOverflowError.'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <h2 className="font-bold text-slate-900 text-base">Industrial Applications & Real-World Case Studies</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((study, idx) => {
          const Icon = study.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4 hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className={`p-3 rounded-xl border w-fit ${study.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{study.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{study.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                {study.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
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
