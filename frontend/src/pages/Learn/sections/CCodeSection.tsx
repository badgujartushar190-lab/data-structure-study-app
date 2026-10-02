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
    <div className="space-y-6">
      {/* Code Header */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-600" />
          <h2 className="font-bold text-slate-900 text-base">C99 Stack Implementation</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied!' : 'Copy C Code'}</span>
          </button>

          <button
            onClick={handleRunInPlayground}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-xs text-white shadow-sm transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Open in Playground</span>
          </button>
        </div>
      </div>

      {/* High-Contrast Code Box */}
      <div className="rounded-xl bg-[#0F172A] border border-slate-800 overflow-hidden font-mono text-xs shadow-sm">
        <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
          <span className="font-semibold text-slate-300">stack_implementation.c</span>
          <span className="text-[11px] text-blue-400 font-medium">ISO/IEC 9899:1999 (C99)</span>
        </div>
        <pre className="p-6 text-slate-100 leading-relaxed overflow-x-auto bg-transparent border-0 rounded-none">
          <code>{cCodeSnippet}</code>
        </pre>
      </div>
    </div>
  );
};
