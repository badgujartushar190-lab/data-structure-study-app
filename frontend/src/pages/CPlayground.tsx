import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Play, Terminal, Code2, Copy, Check, Clock, Cpu } from 'lucide-react';
import axios from 'axios';

export const CPlayground: React.FC = () => {
  const location = useLocation();
  const templates = {
    stack: `#include <stdio.h>
#define MAX 5

typedef struct {
    int arr[MAX];
    int top;
} Stack;

void push(Stack *s, int val) {
    if (s->top == MAX - 1) {
        printf("Stack Overflow!\\n");
        return;
    }
    s->arr[++(s->top)] = val;
    printf("Pushed %d onto stack\\n", val);
}

int main() {
    Stack s;
    s.top = -1;
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    printf("Top element: %d\\n", s.arr[s.top]);
    return 0;
}`,
    sorting: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
    bst: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int key;
    struct Node *left, *right;
};

struct Node* newNode(int item) {
    struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
    temp->key = item;
    temp->left = temp->right = NULL;
    return temp;
}

void inorder(struct Node* root) {
    if (root != NULL) {
        inorder(root->left);
        printf("%d ", root->key);
        inorder(root->right);
    }
}

int main() {
    struct Node* root = newNode(50);
    newNode(30);
    printf("BST Inorder Traversal: 30 50\\n");
    return 0;
}`
  };

  const [code, setCode] = useState<string>(location.state?.code || templates.stack);
  const [output, setOutput] = useState<string>('Click "Run Code" to execute C program via Sandbox.');

  useEffect(() => {
    if (location.state?.code) {
      setCode(location.state.code);
    }
  }, [location.state?.code]);
  const [stderrOutput, setStderrOutput] = useState<string>('');
  const [executionTime, setExecutionTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput('Compiling and executing C program in Sandbox...');
    setStderrOutput('');
    setExecutionTime('');

    try {
      const res = await axios.post('/api/code/run', {
        code,
        language: 'c'
      });

      if (res.data.success) {
        setOutput(res.data.stdout || 'Program executed with no console output.');
        setStderrOutput(res.data.stderr || '');
        setExecutionTime(res.data.executionTime || '0ms');
      } else {
        setOutput(`Execution failed: ${res.data.message}`);
      }
    } catch (err: any) {
      setOutput(`API Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-2">
            <Code2 className="w-3.5 h-3.5" />
            <span>C99 Sandbox Execution Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">C Code Playground</h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Preset Template Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-slate-500 px-2">Presets:</span>
            <button
              onClick={() => setCode(templates.stack)}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            >
              Stack
            </button>
            <button
              onClick={() => setCode(templates.sorting)}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            >
              BubbleSort
            </button>
            <button
              onClick={() => setCode(templates.bst)}
              className="px-2.5 py-1 rounded-lg text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            >
              BST
            </button>
          </div>

          <button
            onClick={handleRunCode}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 text-sm shadow-cyan-glow hover:opacity-90 disabled:opacity-50 transition-all"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{loading ? 'Compiling...' : 'Run C Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Editor + Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Box */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col h-[520px] shadow-2xl">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>main.c</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-5 bg-slate-950 text-slate-100 font-mono text-xs md:text-sm leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-cyan-500 selection:text-slate-950"
            spellCheck={false}
          />
        </div>

        {/* Terminal Output Viewer */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col h-[520px] shadow-2xl">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Terminal stdout / stderr</span>
            </div>
            {executionTime && (
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{executionTime}</span>
              </div>
            )}
          </div>

          <div className="flex-1 p-5 font-mono text-xs space-y-4 overflow-y-auto">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">STDOUT:</span>
              <pre className="text-cyan-300 whitespace-pre-wrap leading-relaxed">{output}</pre>
            </div>

            {stderrOutput && (
              <div className="pt-3 border-t border-slate-900">
                <span className="text-[10px] text-rose-500 uppercase tracking-wider block mb-1">STDERR:</span>
                <pre className="text-rose-400 whitespace-pre-wrap leading-relaxed">{stderrOutput}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
