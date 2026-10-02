import React, { useState } from 'react';
import { Code2, Copy, Check, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CCodeSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const cCodeSnippet = `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_SIZE 8

typedef struct {
    int items[MAX_SIZE];
    int top;
} Stack;

// Initialize stack
void initStack(Stack *s) {
    s->top = -1;
}

// Check if stack is full
bool isFull(Stack *s) {
    return s->top == MAX_SIZE - 1;
}

// Check if stack is empty
bool isEmpty(Stack *s) {
    return s->top == -1;
}

// Push item onto stack
bool push(Stack *s, int value) {
    if (isFull(s)) {
        printf("[Error] Stack Overflow! Cannot push %d\\n", value);
        return false;
    }
    s->items[++(s->top)] = value;
    printf("[Success] Pushed %d to stack (TOP = %d)\\n", value, s->top);
    return true;
}

// Pop item from stack
int pop(Stack *s) {
    if (isEmpty(s)) {
        printf("[Error] Stack Underflow! Stack is empty\\n");
        return -1;
    }
    int val = s->items[(s->top)--];
    printf("[Success] Popped %d from stack\\n", val);
    return val;
}

// Peek top element
int peek(Stack *s) {
    if (isEmpty(s)) {
        printf("[Error] Stack is empty\\n");
        return -1;
    }
    return s->items[s->top];
}

int main() {
    Stack s;
    initStack(&s);

    push(&s, 10);
    push(&s, 25);
    push(&s, 42);

    printf("Top element is: %d\\n", peek(&s));

    pop(&s);
    pop(&s);
    return 0;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunInPlayground = () => {
    navigate('/playground');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Code Header */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <h2 className="font-bold text-slate-100 text-base">C99 Stack Implementation</h2>
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

      {/* Dark Syntax Highlighted Editor Box */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between text-slate-400">
          <span>stack_implementation.c</span>
          <span className="text-[10px] text-cyan-400">ISO/IEC 9899:1999 (C99)</span>
        </div>
        <pre className="p-6 text-slate-200 leading-relaxed overflow-x-auto selection:bg-cyan-500 selection:text-slate-950">
          <code>{cCodeSnippet}</code>
        </pre>
      </div>
    </div>
  );
};
