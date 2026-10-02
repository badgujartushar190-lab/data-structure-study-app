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
  const [output, setOutput] = useState<string>('Click "Run C Code" to execute program.');

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
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
            <Code2 className="w-3.5 h-3.5 text-blue-600" />
            <span>C99 Sandbox Execution Engine</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">C Code Playground</h1>
          <p className="text-sm text-slate-600 mt-1">Live compile and run C99 data structures algorithms</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Preset Template Selector */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span className="text-slate-400 font-semibold px-2">Presets:</span>
            <button
              onClick={() => setCode(templates.stack)}
              className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium transition-colors"
            >
              Stack
            </button>
            <button
              onClick={() => setCode(templates.sorting)}
              className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium transition-colors"
            >
              BubbleSort
            </button>
            <button
              onClick={() => setCode(templates.bst)}
              className="px-2.5 py-1 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium transition-colors"
            >
              BST
            </button>
          </div>

          <button
            onClick={handleRunCode}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{loading ? 'Compiling...' : 'Run C Code'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Editor + Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Box */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden flex flex-col h-[520px] shadow-sm">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>main.c</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-5 bg-[#0F172A] text-slate-100 font-mono text-xs md:text-sm leading-relaxed resize-none focus:outline-none selection:bg-blue-900 selection:text-white"
            spellCheck={false}
          />
        </div>

        {/* Terminal Output Viewer */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden flex flex-col h-[520px] shadow-sm">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Terminal className="w-4 h-4 text-blue-600" />
              <span>Terminal Output (stdout / stderr)</span>
            </div>
            {executionTime && (
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-600 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{executionTime}</span>
              </div>
            )}
          </div>

          <div className="flex-1 p-5 bg-[#0F172A] font-mono text-xs space-y-4 overflow-y-auto">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">STDOUT:</span>
              <pre className="text-emerald-300 bg-transparent border-0 p-0 whitespace-pre-wrap leading-relaxed">{output}</pre>
            </div>

            {stderrOutput && (
              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block mb-1">STDERR:</span>
                <pre className="text-rose-300 bg-transparent border-0 p-0 whitespace-pre-wrap leading-relaxed">{stderrOutput}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
