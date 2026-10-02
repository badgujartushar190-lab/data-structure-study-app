// Chapter 6: Linked Stack, Queue & Applications — Comprehensive Educational Data Store
// Aligned with standard Computer Science curricula (CLRS, Tanenbaum, Kernighan & Ritchie C, Sedgewick)

export interface OperationStep {
  step: number;
  description: string;
  codeSnippet: string;
  stateExplanation: string;
}

export interface OperationDetail {
  id: string;
  name: string;
  syntax: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  steps: OperationStep[];
  cCodeSnippet: string;
}

export interface RealWorldUseCase {
  title: string;
  domain: string;
  problem: string;
  solution: string;
  typeUsed: string;
  complexity: string;
  realWorldContext: string;
}

export interface ComplexityEntry {
  operation: string;
  linkedStackQueue: string;
  arrayEquivalent: string;
  spaceComplexity: string;
  explanation: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TopicData {
  id: string;
  chapterId: string;
  title: string;
  subtitle: string;
  overview: string;
  definition: string;
  coreConcept: string;
  workingPrinciple: string;
  memoryRepresentation: string;
  invariants: string[];
  commonMistakes: string[];
  advantages: string[];
  limitations: string[];
  operations: OperationDetail[];
  cCode: {
    title: string;
    filename: string;
    code: string;
    explanation: string[];
    simulatedOutput: string;
  };
  realWorldUses: RealWorldUseCase[];
  complexity: ComplexityEntry[];
  practiceQuestions: PracticeQuestion[];
}

export const chapter6Topics: Record<string, TopicData> = {
  'top-601': {
    id: 'top-601',
    chapterId: 'chap-6',
    title: 'Linked Stack Implementation',
    subtitle: 'Dynamic LIFO Abstract Data Type via Singly Linked Nodes, TOP Pointer Mechanics, and Zero-Capacity-Bound Stack Management',
    overview:
      'A Linked Stack is a linear dynamic Abstract Data Type (ADT) governed strictly by the Last-In, First-Out (LIFO) discipline, implemented using a singly linked list. By maintaining an external pointer named TOP at the first node (HEAD), both insertion (Push) and removal (Pop) execute in strictly constant O(1) time without element shifting, resizing latency spikes, or fixed buffer limits.',
    definition:
      'A Linked Stack is a dynamic pointer-based implementation of the Stack ADT where each element is encapsulated in a dynamically allocated node containing a data payload and a link pointer to the node beneath it. The most recently inserted element is referenced by an external pointer variable TOP. If the stack is empty, TOP evaluates strictly to NULL.',
    coreConcept:
      'LIFO Principle & The Dynamic Node Paradigm:\n\n' +
      'In a stack, all access occurs at a single designated boundary called the TOP. The fundamental discipline is LIFO: the last element pushed onto the stack is the first element popped off.\n\n' +
      'Array Stack vs. Linked Stack Comparison:\n' +
      '• Capacity Bounds:\n' +
      '  An array stack requires a predetermined compile-time size bound MAX. Exceeding this bound causes Stack Overflow. While dynamic arrays (like C++ std::vector) can resize, doubling requires allocating a new contiguous buffer, copying all n elements, and freeing the old buffer, causing latency spikes. In contrast, a Linked Stack has NO fixed capacity; it allocates exactly one node per element on the heap as needed.\n\n' +
      '• Memory Allocation:\n' +
      '  Array stacks reside in a single contiguous block of virtual memory. Linked stacks allocate nodes non-contiguously across heap memory pages, linked purely by 64-bit address references.\n\n' +
      '• Memory Overhead:\n' +
      '  Array stacks have zero metadata overhead per element. Linked stacks require an additional 8-byte pointer field (on 64-bit systems) plus structure alignment padding for every stored element.\n\n' +
      '• Stack Overflow Condition:\n' +
      '  In an array stack: top == MAX - 1.\n' +
      '  In a linked stack: true overflow occurs ONLY when physical system memory is exhausted and malloc() returns NULL.\n\n' +
      '• Cache Locality:\n' +
      '  Array stacks exhibit optimal CPU spatial locality. Linked stacks suffer from pointer chasing cache misses.',
    workingPrinciple:
      'Algorithmic Mechanics of Core Operations:\n\n' +
      '1. Basic Node Structure:\n' +
      '   struct Node { int data; struct Node *next; };\n' +
      '   Node *top = NULL; /* Stack is initially empty */\n\n' +
      '2. Push Operation (insertAtBeginning):\n' +
      '   a. Allocate a new node on the heap: Node *newNode = (Node *)malloc(sizeof(Node));\n' +
      '   b. Verify heap allocation: if (newNode == NULL) return Heap_Exhausted;\n' +
      '   c. Populate payload: newNode->data = val;\n' +
      '   d. Connect new node to current top: newNode->next = top;\n' +
      '   e. Advance top: top = newNode;\n' +
      '   Time Complexity: Strictly O(1). Zero shifting.\n\n' +
      '3. Pop Operation (deleteFromBeginning):\n' +
      '   a. Check Underflow: if (top == NULL) return Stack_Underflow_Error;\n' +
      '   b. Store reference to node being removed: Node *temp = top;\n' +
      '   c. Extract stored payload: int poppedVal = temp->data;\n' +
      '   d. Advance top pointer to next node: top = top->next;\n' +
      '   e. Free allocated heap chunk: free(temp);\n' +
      '   f. Return poppedVal;\n' +
      '   Time Complexity: Strictly O(1).\n\n' +
      '4. Peek / Top Operation:\n' +
      '   a. Check Underflow: if (top == NULL) return Error;\n' +
      '   b. Return top->data without modifying the list structure. Time: O(1).\n\n' +
      '5. IsEmpty Operation:\n' +
      '   Return (top == NULL). Time: O(1).\n\n' +
      '6. Display / Traversal:\n' +
      '   Use an auxiliary pointer: Node *curr = top; while (curr != NULL) { print(curr->data); curr = curr->next; }. Time: O(n).',
    memoryRepresentation:
      '=========================================================================\n' +
      '                 LINKED STACK POINTER ARCHITECTURE                       \n' +
      '=========================================================================\n' +
      ' Call Stack:                   Heap Memory (Dynamic Nodes):\n' +
      ' ┌──────────────┐              ┌───────────────┬────────────────┐\n' +
      ' │ TOP: 0x3090  │─────────────>│ Data: 30      │ Next: 0x2050   │ Most Recent (TOP)\n' +
      ' └──────────────┘              ├───────────────┼────────────────┤\n' +
      '                               │ Address: 0x3090                │\n' +
      '                               └───────┬────────────────────────┘\n' +
      '                                       │\n' +
      '                                       ▼\n' +
      '                               ┌───────────────┬────────────────┐\n' +
      '                               │ Data: 20      │ Next: 0x10A0   │\n' +
      '                               ├───────────────┼────────────────┤\n' +
      '                               │ Address: 0x2050                │\n' +
      '                               └───────┬────────────────────────┘\n' +
      '                                       │\n' +
      '                                       ▼\n' +
      '                               ┌───────────────┬────────────────┐\n' +
      '                               │ Data: 10      │ Next: NULL     │ Bottom of Stack\n' +
      '                               ├───────────────┼────────────────┤\n' +
      '                               │ Address: 0x10A0                │\n' +
      '                               └────────────────────────────────┘\n' +
      '=========================================================================\n' +
      ' Push(40) rewires: newNode->next = TOP (0x3090); TOP = newNode (0x40E0); [O(1)]\n' +
      ' Pop() rewires:    temp = TOP; TOP = TOP->next (0x2050); free(temp);    [O(1)]\n' +
      '=========================================================================',
    invariants: [
      'LIFO Access Invariant: All push, pop, and peek operations take place strictly at TOP. No interior node can be accessed directly without popping preceding nodes.',
      'Empty Stack Invariant: The stack is empty if and only if TOP == NULL.',
      'Terminal Bottom Invariant: The very first element pushed onto an empty stack will have its next pointer set to NULL, marking the bottom of the stack.',
      'Heap Memory Invariant: Every successful push invokes malloc(); every successful pop must invoke free() to guarantee zero memory leaks.',
      'Non-Destructive Peek Invariant: The peek() operation inspects top->data without altering top or disconnecting any node.'
    ],
    commonMistakes: [
      'Popping Empty Stack (Underflow): Dereferencing top->data without verifying "top != NULL", triggering an immediate Segmentation Fault (SIGSEGV).',
      'Memory Leak on Pop: Overwriting "top = top->next" without storing the old top pointer in a temporary variable and calling free(temp).',
      'Severing the Stack Chain on Push: Setting "top = newNode" BEFORE setting "newNode->next = top", which permanently orphans the entire existing stack.',
      'Mutating TOP during Display: Writing "while (top != NULL) top = top->next;" in a display function instead of using an auxiliary pointer "Node *curr = top;". This empties and destroys the entire stack!',
      'Ignoring malloc() Failure: Failing to check if malloc() returned NULL before writing "newNode->data = val;".'
    ],
    advantages: [
      'No Fixed Capacity Bound: Dynamically scales to hold as many elements as physical RAM allows; eliminates artificial stack size ceilings.',
      'Strict O(1) Operations: Push, Pop, Peek, and IsEmpty all execute in deterministic constant time with zero element shifting.',
      'No Amortized Resizing Spikes: Unlike dynamic arrays that occasionally freeze execution to double their capacity and copy all elements, linked stacks allocate memory smoothly.',
      'Memory Conservation: Consumes memory proportional to current element count rather than allocating a huge unused static buffer.'
    ],
    limitations: [
      'Memory Overhead: Requires an additional 8-byte pointer field per node (on 64-bit systems), which can exceed the data payload for small types.',
      'Poor Cache Locality: Nodes are scattered throughout heap memory, leading to CPU cache misses during sequential traversal.',
      'Dynamic Allocation Latency: Calling malloc() and free() involves kernel heap allocator bookkeeping, which is slightly slower per-operation than incrementing an array index.'
    ],
    operations: [
      {
        id: 'op-push',
        name: 'Push Operation (Insert at Top)',
        syntax: 'push(&top, value);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1) (allocates 1 node)',
        description: 'Allocates a new node on the heap, binds its next pointer to the current TOP, and updates TOP to point to the new node.',
        steps: [
          {
            step: 1,
            description: 'Allocate node from heap',
            codeSnippet: 'Node *newNode = (Node *)malloc(sizeof(Node));',
            stateExplanation: 'Requests memory from the system heap allocator. Verifies newNode is non-null.'
          },
          {
            step: 2,
            description: 'Assign payload',
            codeSnippet: 'newNode->data = value;',
            stateExplanation: 'Populates the data payload of the newly allocated node.'
          },
          {
            step: 3,
            description: 'Link new node to current top',
            codeSnippet: 'newNode->next = *topRef;',
            stateExplanation: 'Connects the new node to the existing top of the stack (or NULL if list was empty).'
          },
          {
            step: 4,
            description: 'Update TOP pointer',
            codeSnippet: '*topRef = newNode;',
            stateExplanation: 'External TOP pointer now references the new node, completing the O(1) insertion.'
          }
        ],
        cCodeSnippet:
          'void push(Node **topRef, int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    if (newNode == NULL) {\n        fprintf(stderr, "Heap Overflow: Out of Memory\\n");\n        return;\n    }\n    newNode->data = value;\n    newNode->next = *topRef;\n    *topRef = newNode;\n}'
      },
      {
        id: 'op-pop',
        name: 'Pop Operation (Remove from Top)',
        syntax: 'int val = pop(&top);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Extracts the value from TOP, advances TOP to the next node in the chain, and frees the former top node memory.',
        steps: [
          {
            step: 1,
            description: 'Check for Stack Underflow',
            codeSnippet: 'if (*topRef == NULL) { fprintf(stderr, "Stack Underflow\\n"); exit(1); }',
            stateExplanation: 'Prevents illegal dereferencing when attempting to pop an empty stack.'
          },
          {
            step: 2,
            description: 'Store current top in temporary pointer',
            codeSnippet: 'Node *temp = *topRef;\nint poppedVal = temp->data;',
            stateExplanation: 'Retains reference to the node to extract its value and deallocate it later.'
          },
          {
            step: 3,
            description: 'Advance TOP pointer',
            codeSnippet: '*topRef = (*topRef)->next;',
            stateExplanation: 'Top now points to the succeeding node beneath it in the stack.'
          },
          {
            step: 4,
            description: 'Free removed node',
            codeSnippet: 'free(temp); return poppedVal;',
            stateExplanation: 'Releases the allocated heap memory back to the allocator and returns payload.'
          }
        ],
        cCodeSnippet:
          'int pop(Node **topRef) {\n    if (*topRef == NULL) {\n        fprintf(stderr, "Error: Stack Underflow\\n");\n        return -1;\n    }\n    Node *temp = *topRef;\n    int poppedVal = temp->data;\n    *topRef = (*topRef)->next;\n    free(temp);\n    return poppedVal;\n}'
      },
      {
        id: 'op-peek',
        name: 'Peek / Top Operation (Inspect Top Element)',
        syntax: 'int val = peek(top);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Reads and returns the data stored in the TOP node without removing the node or mutating the pointer chain.',
        steps: [
          {
            step: 1,
            description: 'Check if stack is empty',
            codeSnippet: 'if (top == NULL) { fprintf(stderr, "Stack is Empty\\n"); return -1; }',
            stateExplanation: 'Guards against NULL pointer dereference.'
          },
          {
            step: 2,
            description: 'Return top data',
            codeSnippet: 'return top->data;',
            stateExplanation: 'Accesses top node data payload directly in O(1) time.'
          }
        ],
        cCodeSnippet:
          'int peek(Node *top) {\n    if (top == NULL) {\n        fprintf(stderr, "Notice: Stack is empty, cannot peek.\\n");\n        return -1;\n    }\n    return top->data;\n}'
      }
    ],
    cCode: {
      title: 'Complete Menu-Driven Linked Stack Implementation in C99',
      filename: 'linked_stack.c',
      code:
`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* Node structure definition */
typedef struct Node {
    int data;
    struct Node *next;
} Node;

/* 1. Push: Insert element at top - O(1) */
void push(Node **top, int value) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (newNode == NULL) {
        fprintf(stderr, "Heap Overflow: Out of Memory! Cannot push %d\\n", value);
        return;
    }
    newNode->data = value;
    newNode->next = *top;
    *top = newNode;
    printf("Pushed: %d (at %p)\\n", value, (void*)newNode);
}

/* 2. Pop: Remove and return top element - O(1) */
int pop(Node **top) {
    if (*top == NULL) {
        fprintf(stderr, "Stack Underflow: Stack is empty!\\n");
        return -1;
    }
    Node *temp = *top;
    int poppedValue = temp->data;
    *top = (*top)->next;
    free(temp);
    return poppedValue;
}

/* 3. Peek: Return top element without removal - O(1) */
int peek(Node *top) {
    if (top == NULL) {
        fprintf(stderr, "Stack is empty: No top element.\\n");
        return -1;
    }
    return top->data;
}

/* 4. IsEmpty: Check if stack is empty - O(1) */
bool isEmpty(Node *top) {
    return (top == NULL);
}

/* 5. Display: Traverse and print all elements from top to bottom - O(n) */
void display(Node *top) {
    if (isEmpty(top)) {
        printf("Stack is EMPTY (TOP -> NULL)\\n");
        return;
    }
    Node *curr = top;
    printf("TOP -> ");
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL (Bottom)\\n");
}

/* 6. Free entire stack memory */
void clearStack(Node **top) {
    Node *curr = *top;
    while (curr != NULL) {
        Node *next = curr->next;
        free(curr);
        curr = next;
    }
    *top = NULL;
}

int main(void) {
    Node *top = NULL; /* Initialize empty stack */

    printf("=== Linked Stack Demonstration in C99 ===\\n\\n");

    /* Demonstrate Push */
    push(&top, 10);
    push(&top, 20);
    push(&top, 30);
    display(top); /* Expected: TOP -> [30] -> [20] -> [10] -> NULL */

    /* Demonstrate Peek */
    printf("\\nCurrent Top Element (Peek): %d\\n", peek(top));

    /* Demonstrate Pop */
    printf("Popped: %d\\n", pop(&top));
    display(top); /* Expected: TOP -> [20] -> [10] -> NULL */

    push(&top, 40);
    display(top); /* Expected: TOP -> [40] -> [20] -> [10] -> NULL */

    /* Clean up all memory */
    clearStack(&top);
    printf("\\nStack cleared. IsEmpty: %s\\n", isEmpty(top) ? "TRUE" : "FALSE");

    return 0;
}`,
      explanation: [
        'Line 5-8: Standard self-referential Node structure holding an int data and a pointer to the next Node below.',
        'Line 11-21: push() allocates a node on the heap, links newNode->next = *top, and updates *top in O(1) time.',
        'Line 24-34: pop() guards against Stack Underflow, saves the current top node in temp, advances *top, frees temp, and returns the payload.',
        'Line 37-43: peek() inspects top->data without modifying the stack structure.',
        'Line 52-63: display() uses an auxiliary pointer (Node *curr) to prevent accidentally mutating the external TOP reference.',
        'Line 66-74: clearStack() iterates through and deallocates every remaining heap node to prevent memory leaks.'
      ],
      simulatedOutput:
`=== Linked Stack Demonstration in C99 ===

Pushed: 10 (at 0x1ff2010)
Pushed: 20 (at 0x1ff2030)
Pushed: 30 (at 0x1ff2050)
TOP -> [30] -> [20] -> [10] -> NULL (Bottom)

Current Top Element (Peek): 30
Popped: 30
TOP -> [20] -> [10] -> NULL (Bottom)
Pushed: 40 (at 0x1ff2070)
TOP -> [40] -> [20] -> [10] -> NULL (Bottom)

Stack cleared. IsEmpty: TRUE`
    },
    realWorldUses: [
      {
        title: 'CPU Call Stack & Activation Record Management',
        domain: 'Compiler Design & Computer Architecture',
        problem: 'Functions can call other functions recursively to arbitrary depths. The runtime must preserve local variables, return addresses, and frame pointers without predetermined limits.',
        solution: 'Compilers and execution runtimes maintain a call stack where each function invocation pushes a new stack frame (activation record) containing saved registers and local variables, popping it upon function return.',
        typeUsed: 'Hardware/Software Call Stack Frame Chain',
        complexity: 'O(1) frame push on function call, O(1) frame pop on return',
        realWorldContext: 'Underpins program execution in GCC, Clang, x86_64 ABI, and Java Virtual Machine (JVM) thread execution.'
      },
      {
        title: 'Text Editor Undo/Redo Operational History',
        domain: 'Desktop & Web Software Engineering (VS Code, Microsoft Word)',
        problem: 'Users execute edits (insertions, deletions, format changes) that must be reversible in reverse chronological order. A fixed array limit would artificially constrain undo history.',
        solution: 'Editors maintain an undo stack of command action objects. Each keystroke/action pushes a command node onto the stack. Pressing Ctrl+Z pops the most recent action and executes its inverse.',
        typeUsed: 'Dynamic Command Pattern Linked Stack',
        complexity: 'O(1) action push, O(1) undo execution',
        realWorldContext: 'Standard design pattern in text editor buffers, graphic design software (Photoshop history), and CAD applications.'
      },
      {
        title: 'Compiler Syntax Parsing & Parentheses Matching',
        domain: 'Programming Language Compilers & Linters',
        problem: 'Source code contains nested delimiters (), [], {}. Compilers must verify that every opening delimiter is correctly matched and closed in reverse order of appearance.',
        solution: 'The lexer/parser pushes opening brackets onto a stack. When a closing bracket is encountered, it pops the top element and verifies a match. If the stack is empty or types mismatch, a syntax error is flagged.',
        typeUsed: 'Parser Delimiter Verification Stack',
        complexity: 'O(n) linear scan of source tokens, O(n) auxiliary stack space',
        realWorldContext: 'Implemented in GCC/Clang C parser frontend, JSON schema validators, and IDE syntax highlighters.'
      }
    ],
    complexity: [
      {
        operation: 'Push (Insert at Top)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1) amortized [O(n) on resize]',
        spaceComplexity: 'O(1) per node',
        explanation: 'Prepends node at HEAD in strictly constant time. Zero element shifting or array copying.'
      },
      {
        operation: 'Pop (Remove from Top)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1)',
        spaceComplexity: 'O(1)',
        explanation: 'Extracts data, advances TOP to next node, and frees node memory in O(1) time.'
      },
      {
        operation: 'Peek / Top (Inspect)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1)',
        spaceComplexity: 'O(1)',
        explanation: 'Directly dereferences top->data with zero structural modifications.'
      },
      {
        operation: 'IsEmpty (Check Empty)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1)',
        spaceComplexity: 'O(1)',
        explanation: 'Evaluates single boolean condition (top == NULL).'
      },
      {
        operation: 'Display (Traverse All)',
        linkedStackQueue: 'O(n)',
        arrayEquivalent: 'O(n)',
        spaceComplexity: 'O(1)',
        explanation: 'Visits all n elements from TOP to NULL sequentially.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-601-1',
        question: 'In a Linked Stack implemented using a Singly Linked List, where are Push and Pop operations performed to achieve O(1) time complexity?',
        options: [
          'Push at the tail, Pop from the head',
          'Push at the head, Pop from the head (treating HEAD as TOP)',
          'Push at the tail, Pop from the tail',
          'Push at index n/2, Pop from index n/2'
        ],
        correctAnswer: 1,
        explanation: 'In a singly linked list, inserting at the head and removing from the head both take O(1) time with zero element shifting. Therefore, maintaining TOP at HEAD guarantees O(1) Push and O(1) Pop.'
      },
      {
        id: 'q-601-2',
        question: 'Under what specific condition does a Linked Stack experience Stack Overflow?',
        options: [
          'When the number of elements exceeds MAX = 1000',
          'When the stack pointer top becomes equal to -1',
          'When system heap memory is exhausted and malloc() fails to allocate a new node (returns NULL)',
          'When two pop operations are called consecutively'
        ],
        correctAnswer: 2,
        explanation: 'Unlike an array stack which has a predetermined capacity bound, a Linked Stack has no arbitrary capacity limit. Overflow occurs strictly when physical/virtual heap memory is completely exhausted and malloc() returns NULL.'
      },
      {
        id: 'q-601-3',
        question: 'What is the consequence of failing to store "temp = top" and calling free(temp) during a Pop operation?',
        options: [
          'The pop operation executes in O(n) time',
          'A memory leak occurs because the popped node remains allocated on the heap without any accessible pointer reference',
          'A compile-time error is generated by gcc',
          'The stack is automatically converted into a queue'
        ],
        correctAnswer: 1,
        explanation: 'If TOP is simply advanced (top = top->next) without calling free() on the old node, that heap memory is orphaned. It remains reserved and inaccessible for the duration of the program, causing a memory leak.'
      },
      {
        id: 'q-601-4',
        question: 'Which of the following represents an advantage of an Array-based Stack over a Linked Stack?',
        options: [
          'Array stacks consume zero extra memory for pointer links and offer superior CPU cache locality',
          'Array stacks never experience stack overflow',
          'Array stacks allow O(1) deletion from arbitrary positions',
          'Array stacks do not require compile-time size declarations'
        ],
        correctAnswer: 0,
        explanation: 'Array stacks store elements contiguously in a compact buffer without pointer overhead (saving 8 bytes per element on 64-bit systems) and maximize CPU cache line prefetching.'
      }
    ]
  },

  'top-602': {
    id: 'top-602',
    chapterId: 'chap-6',
    title: 'Linked Queue Implementation',
    subtitle: 'Dynamic FIFO Abstract Data Type via Front and Rear Pointers, Modulo-Free Ringless Queueing, and Single-Node Deletion Safety',
    overview:
      'A Linked Queue is a linear dynamic Abstract Data Type (ADT) governed by the First-In, First-Out (FIFO) discipline, implemented using a singly linked list with two dedicated boundary pointers: FRONT (referencing the head where elements leave) and REAR (referencing the tail where elements enter). Maintaining both pointers enables strictly constant O(1) Enqueue and Dequeue operations without capacity limits or circular modulo arithmetic.',
    definition:
      'A Linked Queue is a pointer-based implementation of the Queue ADT where elements are ordered linearly such that new items enter at the terminal node (REAR) and departing items are removed from the initial node (FRONT). If the queue is empty, both FRONT and REAR evaluate to NULL.',
    coreConcept:
      'FIFO Principle & Dual-Pointer Architecture:\n\n' +
      'In a Queue, access is partitioned into two distinct endpoints: items are enqueued at the back (REAR) and dequeued from the front (FRONT). The governing principle is FIFO (First-In, First-Out): the oldest element enqueued is the first one processed.\n\n' +
      'Array Queue Limitations Solved by Linked Queue:\n' +
      '1. Linear Array Queue False Overflow:\n' +
      '   In a simple linear array queue, as elements are dequeued, FRONT advances rightward. When REAR reaches MAX - 1, no new elements can be enqueued even if all slots before FRONT are completely empty! Shifting elements left on every dequeue costs O(n) time.\n\n' +
      '2. Circular Array Queue Modulo & Fixed Capacity:\n' +
      '   While circular queues solve false overflow using modulo arithmetic (rear = (rear + 1) % MAX), they remain bound to a fixed maximum capacity MAX.\n\n' +
      '3. Linked Queue Resolution:\n' +
      '   A Linked Queue eliminates both problems. It never requires modulo math, never requires element shifting, and dynamically scales node by node on the heap.',
    workingPrinciple:
      'Algorithmic Mechanics of Core Queue Operations:\n\n' +
      '1. Structural Definition in C:\n' +
      '   struct Node {\n' +
      '       int data;\n' +
      '       struct Node *next;\n' +
      '   };\n' +
      '   struct Queue {\n' +
      '       struct Node *front;\n' +
      '       struct Node *rear;\n' +
      '   };\n\n' +
      '2. Enqueue Operation (Insert at Rear):\n' +
      '   a. Allocate new node: Node *newNode = (Node *)malloc(sizeof(Node));\n' +
      '   b. Verify allocation: if (newNode == NULL) return Heap_Overflow;\n' +
      '   c. Populate payload: newNode->data = val; newNode->next = NULL;\n' +
      '   d. Case A (Empty Queue): If rear == NULL, then front = rear = newNode;\n' +
      '   e. Case B (Non-Empty Queue): Otherwise, link rear->next = newNode; advance rear = newNode;\n' +
      '   Time Complexity: Strictly O(1).\n\n' +
      '3. Dequeue Operation (Remove from Front):\n' +
      '   a. Check Underflow: If front == NULL, queue is empty! Return error.\n' +
      '   b. Store front node: Node *temp = front; int val = temp->data;\n' +
      '   c. Advance front: front = front->next;\n' +
      '   d. CRITICAL SINGLE-NODE EDGE CASE:\n' +
      '      If front becomes NULL (meaning the removed node was the only element in the queue),\n' +
      '      you MUST also set: rear = NULL!\n' +
      '      Failure to do this leaves rear as a dangling pointer pointing to the freed memory of temp!\n' +
      '   e. Free removed node: free(temp);\n' +
      '   f. Return val;\n' +
      '   Time Complexity: Strictly O(1).\n\n' +
      '4. Peek / Front Operation:\n' +
      '   If front == NULL, underflow; otherwise return front->data in O(1) time.\n\n' +
      '5. IsEmpty Operation:\n' +
      '   Return (front == NULL). Time: O(1).',
    memoryRepresentation:
      '=========================================================================\n' +
      '                 LINKED QUEUE POINTER ARCHITECTURE                       \n' +
      '=========================================================================\n' +
      ' Queue Handle:                   Heap Memory (Chained Nodes):\n' +
      ' ┌───────────────────┐\n' +
      ' │ FRONT: 0x10A0     │──────────>┌───────────────┬────────────────┐\n' +
      ' ├───────────────────┤           │ Data: 10      │ Next: 0x2050   │ FRONT (Head)\n' +
      ' │ REAR:  0x3090     │─────┐     ├───────────────┼────────────────┤\n' +
      ' └───────────────────┘     │     │ Address: 0x10A0                │\n' +
      '                           │     └───────┬────────────────────────┘\n' +
      '                           │             │\n' +
      '                           │             ▼\n' +
      '                           │     ┌───────────────┬────────────────┐\n' +
      '                           │     │ Data: 20      │ Next: 0x3090   │\n' +
      '                           │     ├───────────────┼────────────────┤\n' +
      '                           │     │ Address: 0x2050                │\n' +
      '                           │     └───────┬────────────────────────┘\n' +
      '                           │             │\n' +
      '                           │             ▼\n' +
      '                           │     ┌───────────────┬────────────────┐\n' +
      '                           └────>│ Data: 30      │ Next: NULL     │ REAR (Tail)\n' +
      '                                 ├───────────────┼────────────────┤\n' +
      '                                 │ Address: 0x3090                │\n' +
      '                                 └────────────────────────────────┘\n' +
      '=========================================================================\n' +
      ' Enqueue(40): rear->next = 0x40E0; rear = 0x40E0; newNode->next = NULL;  [O(1)]\n' +
      ' Dequeue():   temp = front; front = front->next (0x2050); free(temp);    [O(1)]\n' +
      ' Edge Case:   If front becomes NULL after dequeue, set rear = NULL!     [O(1)]\n' +
      '=========================================================================',
    invariants: [
      'FIFO Ordering Invariant: Elements exit at FRONT in the exact chronological sequence they arrived at REAR.',
      'Empty Queue Dual-NULL Invariant: The queue is empty if and only if front == NULL. When front == NULL, rear must also equal NULL.',
      'Single-Element Invariant: When the queue contains exactly 1 element, front == rear, and front->next == NULL.',
      'Terminal Tail Invariant: rear->next must always equal NULL in an acyclic linked queue.',
      'Non-Dangling Rear Invariant: Dequeuing the final element must neutralize rear = NULL before calling free(temp).'
    ],
    commonMistakes: [
      'Dangling Rear Pointer on Emptying: When dequeuing the last remaining node, forgetting to set "rear = NULL". This leaves rear pointing to deallocated memory, leading to silent heap corruption on the next enqueue!',
      'Dequeuing from Empty Queue (Underflow): Accessing front->data when front is NULL, producing an immediate SIGSEGV crash.',
      'Failing to Initialize Pointers: Creating a Queue struct without setting "front = NULL; rear = NULL;".',
      'Forgetting free() on Dequeue: Updating front = front->next without freeing the old front node, causing permanent memory leaks.'
    ],
    advantages: [
      'No False Overflow: Unlike linear array queues, empty slots are never wasted; memory is allocated dynamically on demand.',
      'Strictly O(1) Enqueue & Dequeue: Maintaining both front and rear pointers ensures constant time operations with zero element shifting.',
      'No Fixed Capacity Limit: Grows to accommodate millions of elements without buffer size declarations or reallocations.',
      'No Circular Modulo Arithmetic: Eliminates the complexity and edge-case capacity checks of ring buffers.'
    ],
    limitations: [
      'Metadata Overhead: Consumes 8 bytes of pointer storage per element on 64-bit platforms.',
      'Heap Allocator Latency: Calling malloc() and free() per operation is slower than incrementing an integer index in a circular array buffer.',
      'Cache Unfriendliness: Nodes scattered across heap pages produce frequent CPU cache misses during sequential traversal.'
    ],
    operations: [
      {
        id: 'op-enqueue',
        name: 'Enqueue Operation (Append at Rear)',
        syntax: 'enqueue(q, value);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1) (allocates 1 node)',
        description: 'Allocates a new node, appends it after REAR, and updates REAR to point to the new node in O(1) time.',
        steps: [
          {
            step: 1,
            description: 'Allocate new node',
            codeSnippet: 'Node *newNode = (Node *)malloc(sizeof(Node));\nnewNode->data = val; newNode->next = NULL;',
            stateExplanation: 'Allocates node and initializes next to NULL since it will become the new tail.'
          },
          {
            step: 2,
            description: 'Check if queue is empty',
            codeSnippet: 'if (q->rear == NULL) {\n    q->front = q->rear = newNode;\n    return;\n}',
            stateExplanation: 'If queue was empty, the new node is both the first and last element.'
          },
          {
            step: 3,
            description: 'Link existing rear to new node',
            codeSnippet: 'q->rear->next = newNode;',
            stateExplanation: 'Connects former tail to the new node in constant time.'
          },
          {
            step: 4,
            description: 'Advance REAR pointer',
            codeSnippet: 'q->rear = newNode;',
            stateExplanation: 'Updates REAR handle to reference the newly appended node.'
          }
        ],
        cCodeSnippet:
          'void enqueue(Queue *q, int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    if (newNode == NULL) {\n        fprintf(stderr, "Heap Overflow: Out of Memory\\n");\n        return;\n    }\n    newNode->data = value;\n    newNode->next = NULL;\n    if (q->rear == NULL) {\n        q->front = q->rear = newNode;\n        return;\n    }\n    q->rear->next = newNode;\n    q->rear = newNode;\n}'
      },
      {
        id: 'op-dequeue',
        name: 'Dequeue Operation (Remove from Front with Edge Case)',
        syntax: 'int val = dequeue(q);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Removes the node at FRONT, handles the single-node queue edge case, and frees node memory.',
        steps: [
          {
            step: 1,
            description: 'Check for Queue Underflow',
            codeSnippet: 'if (q->front == NULL) { fprintf(stderr, "Queue Underflow\\n"); return -1; }',
            stateExplanation: 'Guards against dereferencing an empty queue.'
          },
          {
            step: 2,
            description: 'Store front node and extract data',
            codeSnippet: 'Node *temp = q->front;\nint val = temp->data;',
            stateExplanation: 'Saves reference to extract payload and free memory later.'
          },
          {
            step: 3,
            description: 'Advance FRONT pointer',
            codeSnippet: 'q->front = q->front->next;',
            stateExplanation: 'Front now points to the succeeding node in the queue.'
          },
          {
            step: 4,
            description: 'Handle Single-Node Queue Edge Case',
            codeSnippet: 'if (q->front == NULL) {\n    q->rear = NULL;\n}',
            stateExplanation: 'CRITICAL: If the removed node was the only element, rear must also be neutralized to NULL!'
          },
          {
            step: 5,
            description: 'Free removed node',
            codeSnippet: 'free(temp); return val;',
            stateExplanation: 'Deallocates heap memory in O(1) time.'
          }
        ],
        cCodeSnippet:
          'int dequeue(Queue *q) {\n    if (q->front == NULL) {\n        fprintf(stderr, "Error: Queue Underflow\\n");\n        return -1;\n    }\n    Node *temp = q->front;\n    int val = temp->data;\n    q->front = q->front->next;\n    if (q->front == NULL) {\n        q->rear = NULL; /* Neutralize dangling rear */\n    }\n    free(temp);\n    return val;\n}'
      }
    ],
    cCode: {
      title: 'Complete Menu-Driven Linked Queue Implementation in C99',
      filename: 'linked_queue.c',
      code:
`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* Node structure */
typedef struct Node {
    int data;
    struct Node *next;
} Node;

/* Queue structure maintaining FRONT and REAR pointers */
typedef struct Queue {
    Node *front;
    Node *rear;
} Queue;

/* 1. Initialize queue to empty state */
Queue* createQueue(void) {
    Queue *q = (Queue *)malloc(sizeof(Queue));
    if (q == NULL) {
        fprintf(stderr, "Fatal: Out of memory creating Queue\\n");
        exit(EXIT_FAILURE);
    }
    q->front = NULL;
    q->rear = NULL;
    return q;
}

/* 2. Enqueue: Insert at rear - O(1) */
void enqueue(Queue *q, int value) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (newNode == NULL) {
        fprintf(stderr, "Heap Overflow: Out of Memory! Cannot enqueue %d\\n", value);
        return;
    }
    newNode->data = value;
    newNode->next = NULL;

    /* If queue is empty, new node is both front and rear */
    if (q->rear == NULL) {
        q->front = q->rear = newNode;
        printf("Enqueued: %d (Queue was empty)\\n", value);
        return;
    }

    /* Otherwise, append after rear and update rear */
    q->rear->next = newNode;
    q->rear = newNode;
    printf("Enqueued: %d\\n", value);
}

/* 3. Dequeue: Remove from front - O(1) */
int dequeue(Queue *q) {
    if (q->front == NULL) {
        fprintf(stderr, "Queue Underflow: Queue is empty!\\n");
        return -1;
    }

    Node *temp = q->front;
    int value = temp->data;

    q->front = q->front->next;

    /* CRITICAL EDGE CASE: If queue became empty, neutralize rear */
    if (q->front == NULL) {
        q->rear = NULL;
    }

    free(temp);
    return value;
}

/* 4. Peek: Inspect front element - O(1) */
int peek(Queue *q) {
    if (q->front == NULL) {
        fprintf(stderr, "Queue is empty: No front element.\\n");
        return -1;
    }
    return q->front->data;
}

/* 5. IsEmpty: Check if queue is empty - O(1) */
bool isEmpty(Queue *q) {
    return (q->front == NULL);
}

/* 6. Display: Traverse and display elements from front to rear - O(n) */
void display(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is EMPTY (FRONT -> NULL <- REAR)\\n");
        return;
    }
    Node *curr = q->front;
    printf("FRONT -> ");
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL <- REAR\\n");
}

/* 7. Free all queue memory */
void destroyQueue(Queue *q) {
    Node *curr = q->front;
    while (curr != NULL) {
        Node *next = curr->next;
        free(curr);
        curr = next;
    }
    free(q);
}

int main(void) {
    Queue *q = createQueue();

    printf("=== Linked Queue Demonstration in C99 ===\\n\\n");

    /* Initial state */
    display(q);

    /* Enqueue elements */
    enqueue(q, 10);
    enqueue(q, 20);
    enqueue(q, 30);
    display(q); /* Expected: FRONT -> [10] -> [20] -> [30] -> NULL <- REAR */

    /* Peek front */
    printf("\\nCurrent Front Element (Peek): %d\\n", peek(q));

    /* Dequeue elements */
    printf("Dequeued: %d\\n", dequeue(q));
    display(q); /* Expected: FRONT -> [20] -> [30] -> NULL <- REAR */

    enqueue(q, 40);
    display(q); /* Expected: FRONT -> [20] -> [30] -> [40] -> NULL <- REAR */

    /* Dequeue all */
    printf("Dequeued: %d\\n", dequeue(q));
    printf("Dequeued: %d\\n", dequeue(q));
    printf("Dequeued: %d\\n", dequeue(q));
    display(q); /* Expected: Queue is EMPTY */

    destroyQueue(q);
    printf("\\nQueue destroyed safely with zero memory leaks.\\n");
    return 0;
}`,
      explanation: [
        'Line 12-15: Queue structure encapsulates dual front and rear pointers, allowing both endpoints to be tracked independently.',
        'Line 28-48: enqueue() handles the empty queue special case (front = rear = newNode) vs the general case (rear->next = newNode; rear = newNode) in O(1) time.',
        'Line 51-68: dequeue() implements the critical single-node queue edge case: if q->front becomes NULL, q->rear is explicitly set to NULL to prevent dangling pointer bugs.',
        'Line 80-92: display() prints the chain from FRONT to REAR using an auxiliary pointer without modifying queue state.',
        'Line 95-103: destroyQueue() frees all allocated node payloads first, then frees the queue container struct.'
      ],
      simulatedOutput:
`=== Linked Queue Demonstration in C99 ===

Queue is EMPTY (FRONT -> NULL <- REAR)
Enqueued: 10 (Queue was empty)
Enqueued: 20
Enqueued: 30
FRONT -> [10] -> [20] -> [30] -> NULL <- REAR

Current Front Element (Peek): 10
Dequeued: 10
FRONT -> [20] -> [30] -> NULL <- REAR
Enqueued: 40
FRONT -> [20] -> [30] -> [40] -> NULL <- REAR
Dequeued: 20
Dequeued: 30
Dequeued: 40
Queue is EMPTY (FRONT -> NULL <- REAR)

Queue destroyed safely with zero memory leaks.`
    },
    realWorldUses: [
      {
        title: 'Operating System CPU Process Runqueues (FIFO & Round Robin)',
        domain: 'Operating System Kernel Scheduling',
        problem: 'In time-sharing operating systems, ready threads must be scheduled fairly in arrival order without preallocating rigid static process capacity limits.',
        solution: 'OS schedulers maintain linked runqueues of task_struct descriptors. New processes are enqueued at REAR in O(1) time, and the CPU dispatches the thread at FRONT in O(1) time.',
        typeUsed: 'Intrusive Linked Queue (struct list_head)',
        complexity: 'O(1) process enqueue, O(1) process dispatch',
        realWorldContext: 'Powers Linux CFS real-time scheduling classes (SCHED_FIFO, SCHED_RR) and embedded FreeRTOS ready lists.'
      },
      {
        title: 'Print Spooling Daemon Architecture (CUPS)',
        domain: 'Enterprise Printing & Peripheral I/O Systems',
        problem: 'Multiple network users submit large print jobs concurrently to a single shared physical printer. Jobs must be buffered and serviced in strict submission order.',
        solution: 'The Common Unix Printing System (CUPS) spools print jobs into an in-memory linked queue. When the printer finishes page rendering, the daemon dequeues the next job document from FRONT.',
        typeUsed: 'Dynamic Document Job Linked Queue',
        complexity: 'O(1) job spooling, O(1) job dispatch',
        realWorldContext: 'Standard print spooler architecture utilized across macOS, Linux desktop distributions, and network print servers.'
      },
      {
        title: 'Network Packet Ingress/Egress Buffering (Linux tc qdisc)',
        domain: 'Computer Networking & Packet Routing',
        problem: 'Network interface cards (NICs) receive packet bursts exceeding transmission bandwidth. Bursts must be queued dynamically without dropping packets due to artificial array bounds.',
        solution: 'Linux Traffic Control (tc) uses linked queues of sk_buff packet structures to implement FIFO packet queuing disciplines (pfifo_fast, fq_codel), absorbing bursts cleanly.',
        typeUsed: 'Kernel Socket Buffer (sk_buff) Linked Queue',
        complexity: 'O(1) packet arrival enqueue, O(1) NIC transmission dequeue',
        realWorldContext: 'Processes gigabits of internet traffic per second across cloud routers, Kubernetes gateways, and switches.'
      }
    ],
    complexity: [
      {
        operation: 'Enqueue (Insert at Rear)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1) amortized [O(n) on resize]',
        spaceComplexity: 'O(1) per node',
        explanation: 'Appends to rear->next and updates rear pointer directly in O(1) time.'
      },
      {
        operation: 'Dequeue (Remove from Front)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1) [Circular] / O(n) [Linear]',
        spaceComplexity: 'O(1)',
        explanation: 'Advances front = front->next and frees node in O(1) time.'
      },
      {
        operation: 'Peek / Front (Inspect)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1)',
        spaceComplexity: 'O(1)',
        explanation: 'Directly reads front->data with zero structural modifications.'
      },
      {
        operation: 'IsEmpty (Check Empty)',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1)',
        spaceComplexity: 'O(1)',
        explanation: 'Evaluates boolean condition (front == NULL).'
      },
      {
        operation: 'Display (Traverse All)',
        linkedStackQueue: 'O(n)',
        arrayEquivalent: 'O(n)',
        spaceComplexity: 'O(1)',
        explanation: 'Sequentially inspects all n nodes from FRONT to REAR.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-602-1',
        question: 'What critical edge case must be handled when dequeuing the very last remaining node from a Linked Queue?',
        options: [
          'The queue must automatically reallocate an array of size 1',
          'The REAR pointer must also be explicitly set to NULL; otherwise it becomes a dangling pointer referencing freed memory',
          'FRONT must be set to point to itself',
          'Modulo arithmetic must be invoked to wrap REAR back to 0'
        ],
        correctAnswer: 1,
        explanation: 'When the last node is dequeued, FRONT becomes NULL. If REAR is not also set to NULL, it continues pointing to the freed memory address of that node, becoming a dangerous dangling pointer that will cause corruption on the next enqueue.'
      },
      {
        id: 'q-602-2',
        question: 'Why does maintaining both FRONT and REAR pointers enable O(1) time complexity for Enqueue in a Linked Queue?',
        options: [
          'Because REAR provides direct O(1) access to the last node, eliminating the need to traverse from the head to find the tail',
          'Because REAR converts the singly linked list into an array',
          'Because REAR automatically sorts the nodes in descending order',
          'Because REAR eliminates the need to call malloc()'
        ],
        correctAnswer: 0,
        explanation: 'Without a REAR pointer, appending a new node would require traversing the entire list from FRONT to NULL in O(n) time. By maintaining REAR, the tail is accessible instantaneously in O(1) time.'
      },
      {
        id: 'q-602-3',
        question: 'What fundamental flaw of a linear array-based queue is completely eliminated by a Linked Queue?',
        options: [
          'Stack overflow',
          'False overflow (where REAR reaches array capacity but earlier slots are vacant due to dequeues)',
          'High memory overhead',
          'Slow O(1) peek speed'
        ],
        correctAnswer: 1,
        explanation: 'In a linear array queue, dequeuing causes FRONT to drift rightward. When REAR reaches MAX - 1, the queue rejects insertions ("False Overflow") even if earlier slots are empty. A Linked Queue dynamically allocates nodes on demand, completely eliminating false overflow.'
      },
      {
        id: 'q-602-4',
        question: 'What is the time complexity to execute Dequeue on a Linked Queue containing n elements?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctAnswer: 0,
        explanation: 'Dequeue removes the node at FRONT by advancing front = front->next and freeing the old node, which takes strictly O(1) constant time regardless of queue length n.'
      }
    ]
  },

  'top-603': {
    id: 'top-603',
    chapterId: 'chap-6',
    title: 'Linked List Applications',
    subtitle: 'Dynamic Memory Collections, Polynomial Arithmetic, Sparse Matrix Cross-Lists, Graph Adjacency, and Hash Chaining',
    overview:
      'Linked lists are foundational building blocks across computer science. Beyond serving as standalone linear collections, dynamic node-based pointer architectures power fundamental abstractions including dynamic stacks and queues, separate chaining collision resolution in hash tables, space-efficient graph adjacency lists, polynomial algebraic operations, and sparse matrix representations.',
    definition:
      'Linked List Applications encompass the diverse data structures, algorithms, and system architectures that employ pointer-linked nodes as their internal storage engine. These include dynamic Abstract Data Types (Stack, Queue, Deque), collision resolution in Hash Tables (Separate Chaining), Sparse Matrix representations, Graph Adjacency Lists, Polynomial manipulation, and OS Heap Free Block allocators.',
    coreConcept:
      'Why Dynamic Node-Based Structures are Essential in Computer Science:\n\n' +
      '1. Dynamic Memory-Based Collections:\n' +
      '   When collection capacity is unpredictable, memory allocation must expand and contract smoothly without allocating massive unused contiguous static buffers.\n\n' +
      '2. Implementing Stacks & Queues:\n' +
      '   • Linked List -> Stack: Insertion and deletion at HEAD map directly to Push and Pop in O(1) time with zero capacity limits.\n' +
      '   • Linked List -> Queue: Insertion at REAR and deletion at FRONT map directly to Enqueue and Dequeue in O(1) time with zero element shifting.\n\n' +
      '3. Polynomial Representation & Arithmetic:\n' +
      '   A polynomial P(x) = 5x^3 + 4x^2 + 2x + 7 can be represented as an ordered linked list of nodes, where each node encapsulates [coefficient | exponent | next]. Polynomial addition executes in O(m + n) time using a single parallel merge traversal.\n\n' +
      '4. Sparse Matrix Representation (Orthogonal Linked Lists):\n' +
      '   In matrices where >95% of entries are zero (e.g. graph adjacency, finite element analysis), dense 2D arrays waste gigabytes of memory. A multi-linked cross-list stores only non-zero entries (row, col, val) with horizontal row_next and vertical col_next pointers.\n\n' +
      '5. Graph Representation (Adjacency Lists):\n' +
      '   An array of linked lists where adj[u] chains all neighbor vertices v incident to u. Space complexity is O(V + E) compared to O(V^2) for an Adjacency Matrix, which is transformative for real-world sparse graphs.\n\n' +
      '6. Hash Table Collision Resolution (Separate Chaining):\n' +
      '   When multiple keys hash to the same bucket index, each bucket maintains a Singly Linked List of colliding key-value pairs.\n\n' +
      '7. Browser History & Media Playlists:\n' +
      '   Doubly Linked Lists support back/forward browser navigation; Circular Linked Lists model repeating media queues.',
    workingPrinciple:
      'Detailed Mechanics Across Major Application Domains:\n\n' +
      '• Polynomial Representation & Addition Algorithm:\n' +
      '  Let P1 = 5x^3 + 4x^1 + 2 and P2 = 3x^3 + 2x^2 + 1.\n' +
      '  Nodes are ordered by descending exponent:\n' +
      '    P1: [5, 3] -> [4, 1] -> [2, 0] -> NULL\n' +
      '    P2: [3, 3] -> [2, 2] -> [1, 0] -> NULL\n' +
      '  Pointers p1 and p2 advance simultaneously:\n' +
      '    - If p1->exp == p2->exp: sum coefficients (5+3=8), create node [8, 3], advance both.\n' +
      '    - If p1->exp > p2->exp: copy p1 node [2, 2], advance p1.\n' +
      '    - If p2->exp > p1->exp: copy p2 node, advance p2.\n' +
      '  Result: [8, 3] -> [2, 2] -> [4, 1] -> [3, 0] -> NULL.\n\n' +
      '• Graph Adjacency List Space Comparison:\n' +
      '  Consider a graph with V = 100,000 vertices and E = 200,000 edges.\n' +
      '  - Adjacency Matrix: 100,000 x 100,000 integers = 10^10 x 4 bytes = 40 GIGABYTES of RAM!\n' +
      '  - Adjacency List: V pointers + 2E edge nodes = (100,000 x 8) + (400,000 x 16) = ~7.2 MEGABYTES of RAM!\n' +
      '  Memory reduction: Over 5,000x space savings for sparse graphs.',
    memoryRepresentation:
      '=========================================================================\n' +
      '               LINKED LIST APPLICATION ARCHITECTURES                     \n' +
      '=========================================================================\n' +
      ' 1. HASH TABLE SEPARATE CHAINING:\n' +
      '    Bucket 0 [ • ] ───> [ "Alice", 92 | • ] ───> [ "Dan", 85 | NULL ]\n' +
      '    Bucket 1 [NULL]\n' +
      '    Bucket 2 [ • ] ───> [ "Bob", 78 | NULL ]\n' +
      '    Bucket 3 [ • ] ───> [ "Carol", 99 | • ] ───> [ "Eve", 61 | NULL ]\n\n' +
      ' 2. GRAPH ADJACENCY LIST (Sparse Graph V=4, E=3):\n' +
      '    Vertex 0 [ • ] ───> [ 1 | • ] ───> [ 2 | NULL ]  (Edges: 0-1, 0-2)\n' +
      '    Vertex 1 [ • ] ───> [ 2 | NULL ]                 (Edge: 1-2)\n' +
      '    Vertex 2 [NULL]\n' +
      '    Vertex 3 [ • ] ───> [ 0 | NULL ]                 (Edge: 3-0)\n\n' +
      ' 3. POLYNOMIAL REPRESENTATION:\n' +
      '    P(x) = 5x^3 + 4x^2 + 2x + 7:\n' +
      '    [ coeff: 5 | exp: 3 | • ] ──> [ 4 | 2 | • ] ──> [ 2 | 1 | • ] ──> [ 7 | 0 | NULL ]\n' +
      '=========================================================================',
    invariants: [
      'Polynomial Ordering Invariant: Nodes in a polynomial linked list are maintained in strictly descending order of exponents.',
      'Sparse Graph Space Bound: Adjacency list space is bounded by O(V + E), strictly superior to O(V^2) for sparse graphs.',
      'Hash Chaining Collision Invariant: All elements in bucket k have hash(key) % NUM_BUCKETS == k.',
      'Stack LIFO Mapping: In a linked stack, TOP is always HEAD; push and pop happen strictly at HEAD in O(1).',
      'Queue FIFO Mapping: In a linked queue, FRONT removes from HEAD and REAR appends to TAIL in O(1).'
    ],
    commonMistakes: [
      'Unordered Polynomial Insertion: Adding terms without sorting exponents, resulting in corrupted term merging.',
      'Adjacency List Directed vs Undirected Confusion: In an undirected graph, an edge (u, v) must be added to BOTH adj[u] and adj[v].',
      'Memory Leaks during Hash Rehashing: Reallocating hash bucket arrays without traversing and rehashing or freeing every collision node.',
      'Assuming Linked Lists are Always Faster: For dense graphs (E close to V^2), adjacency matrices are faster and use less memory than linked lists due to pointer overhead.'
    ],
    advantages: [
      'Massive Space Savings for Sparse Data: Reduces memory consumption from quadratic O(V^2) to linear O(V + E) for sparse graphs.',
      'Zero Capacity Bounds for Dynamic ADTs: Stacks and queues scale smoothly without fixed buffer ceilings or reallocation latency.',
      'Simple Hash Collision Resolution: Separate chaining handles arbitrary collision counts without complex open-addressing probing algorithms.',
      'Natural Algebraic Manipulation: Polynomial addition, multiplication, and differentiation map cleanly to pointer manipulation.'
    ],
    limitations: [
      'High Pointer Overhead for Dense Data: For dense graphs or matrices, pointer fields consume more memory than bitmasks.',
      'Non-Contiguous Cache Misses: Chasing pointers across heap pages triggers frequent CPU L1/L2 cache misses.',
      'No O(1) Direct Edge Lookup: Checking if edge (u, v) exists in an adjacency list takes O(degree(u)) time compared to O(1) in an adjacency matrix.'
    ],
    operations: [
      {
        id: 'op-poly-add',
        name: 'Polynomial Addition via Merge Traversal',
        syntax: 'PolyNode *res = addPolynomials(p1, p2);',
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(m + n) for result list',
        description: 'Merges two polynomials sorted by descending exponents in a single linear pass.',
        steps: [
          {
            step: 1,
            description: 'Compare current exponents',
            codeSnippet: 'if (p1->exp == p2->exp) { append(&res, p1->coeff + p2->coeff, p1->exp); p1 = p1->next; p2 = p2->next; }',
            stateExplanation: 'When exponents match, algebraically sum coefficients.'
          },
          {
            step: 2,
            description: 'Handle mismatched exponents',
            codeSnippet: 'else if (p1->exp > p2->exp) { append(&res, p1->coeff, p1->exp); p1 = p1->next; }\nelse { append(&res, p2->coeff, p2->exp); p2 = p2->next; }',
            stateExplanation: 'Appends higher degree term first to maintain descending exponent order.'
          },
          {
            step: 3,
            description: 'Append remaining terms',
            codeSnippet: 'while (p1) { append(&res, p1->coeff, p1->exp); p1 = p1->next; }\nwhile (p2) { append(&res, p2->coeff, p2->exp); p2 = p2->next; }',
            stateExplanation: 'Copies any leftover terms once one list is exhausted.'
          }
        ],
        cCodeSnippet:
          'typedef struct PolyNode {\n    int coeff;\n    int exp;\n    struct PolyNode *next;\n} PolyNode;\n\nPolyNode* addPoly(PolyNode *p1, PolyNode *p2) {\n    PolyNode *res = NULL, **last = &res;\n    while (p1 && p2) {\n        int c = 0, e = 0;\n        if (p1->exp == p2->exp) { c = p1->coeff + p2->coeff; e = p1->exp; p1 = p1->next; p2 = p2->next; }\n        else if (p1->exp > p2->exp) { c = p1->coeff; e = p1->exp; p1 = p1->next; }\n        else { c = p2->coeff; e = p2->exp; p2 = p2->next; }\n        if (c != 0) {\n            PolyNode *n = (PolyNode *)malloc(sizeof(PolyNode));\n            n->coeff = c; n->exp = e; n->next = NULL;\n            *last = n; last = &(n->next);\n        }\n    }\n    PolyNode *rem = p1 ? p1 : p2;\n    while (rem) {\n        PolyNode *n = (PolyNode *)malloc(sizeof(PolyNode));\n        n->coeff = rem->coeff; n->exp = rem->exp; n->next = NULL;\n        *last = n; last = &(n->next); rem = rem->next;\n    }\n    return res;\n}'
      },
      {
        id: 'op-hash-chain',
        name: 'Hash Table Separate Chaining (Insert & Lookup)',
        syntax: 'hashInsert(table, "Alice", 92);',
        timeComplexity: 'O(1) insert, O(1 + alpha) lookup',
        spaceComplexity: 'O(N) for N stored keys',
        description: 'Inserts colliding key-value pairs at the head of a bucket linked list in O(1) time.',
        steps: [
          {
            step: 1,
            description: 'Compute bucket hash index',
            codeSnippet: 'int bucket = hash(key) % TABLE_SIZE;',
            stateExplanation: 'Maps key to bucket index using modulo arithmetic.'
          },
          {
            step: 2,
            description: 'Prepend node to bucket chain',
            codeSnippet: 'HashNode *node = (HashNode *)malloc(sizeof(HashNode));\nnode->next = table[bucket];\ntable[bucket] = node;',
            stateExplanation: 'Inserts at the head of the bucket linked list in O(1) time.'
          }
        ],
        cCodeSnippet:
          'typedef struct HashNode {\n    char key[32];\n    int val;\n    struct HashNode *next;\n} HashNode;\n\nvoid hashInsert(HashNode *table[], const char *key, int val) {\n    int idx = hash(key) % 16;\n    HashNode *newNode = (HashNode *)malloc(sizeof(HashNode));\n    strcpy(newNode->key, key);\n    newNode->val = val;\n    newNode->next = table[idx];\n    table[idx] = newNode;\n}'
      }
    ],
    cCode: {
      title: 'Polynomial Addition and Graph Adjacency Lists in C99',
      filename: 'linked_list_applications.c',
      code:
`#include <stdio.h>
#include <stdlib.h>

/* ========================================================
   PART 1: POLYNOMIAL REPRESENTATION & ADDITION
   ======================================================== */
typedef struct PolyNode {
    int coeff;
    int exp;
    struct PolyNode *next;
} PolyNode;

void appendTerm(PolyNode **poly, int coeff, int exp) {
    if (coeff == 0) return;
    PolyNode *newNode = (PolyNode *)malloc(sizeof(PolyNode));
    newNode->coeff = coeff;
    newNode->exp   = exp;
    newNode->next  = NULL;

    if (*poly == NULL) {
        *poly = newNode;
        return;
    }
    PolyNode *curr = *poly;
    while (curr->next != NULL) curr = curr->next;
    curr->next = newNode;
}

void displayPoly(PolyNode *poly) {
    if (poly == NULL) { printf("0\\n"); return; }
    PolyNode *curr = poly;
    while (curr != NULL) {
        printf("%dx^%d", curr->coeff, curr->exp);
        if (curr->next != NULL && curr->next->coeff > 0)
            printf(" + ");
        else if (curr->next != NULL)
            printf(" ");
        curr = curr->next;
    }
    printf("\\n");
}

PolyNode* addPolynomials(PolyNode *p1, PolyNode *p2) {
    PolyNode *result = NULL;
    while (p1 != NULL && p2 != NULL) {
        if (p1->exp == p2->exp) {
            int sumCoeff = p1->coeff + p2->coeff;
            if (sumCoeff != 0) appendTerm(&result, sumCoeff, p1->exp);
            p1 = p1->next;
            p2 = p2->next;
        } else if (p1->exp > p2->exp) {
            appendTerm(&result, p1->coeff, p1->exp);
            p1 = p1->next;
        } else {
            appendTerm(&result, p2->coeff, p2->exp);
            p2 = p2->next;
        }
    }
    while (p1 != NULL) { appendTerm(&result, p1->coeff, p1->exp); p1 = p1->next; }
    while (p2 != NULL) { appendTerm(&result, p2->coeff, p2->exp); p2 = p2->next; }
    return result;
}

/* ========================================================
   PART 2: GRAPH ADJACENCY LIST REPRESENTATION
   ======================================================== */
typedef struct AdjNode {
    int dest;
    struct AdjNode *next;
} AdjNode;

typedef struct Graph {
    int numVertices;
    AdjNode **adjLists;
} Graph;

Graph* createGraph(int vertices) {
    Graph *g = (Graph *)malloc(sizeof(Graph));
    g->numVertices = vertices;
    g->adjLists = (AdjNode **)malloc(vertices * sizeof(AdjNode *));
    for (int i = 0; i < vertices; i++) g->adjLists[i] = NULL;
    return g;
}

void addEdge(Graph *g, int src, int dest) {
    /* Add edge from src to dest */
    AdjNode *newNode = (AdjNode *)malloc(sizeof(AdjNode));
    newNode->dest = dest;
    newNode->next = g->adjLists[src];
    g->adjLists[src] = newNode;
}

void printGraph(Graph *g) {
    printf("Graph Adjacency Lists:\\n");
    for (int v = 0; v < g->numVertices; v++) {
        AdjNode *curr = g->adjLists[v];
        printf("Vertex %d: ", v);
        while (curr) {
            printf("-> %d ", curr->dest);
            curr = curr->next;
        }
        printf("-> NULL\\n");
    }
}

int main(void) {
    printf("=== Demonstration of Linked List Applications in C99 ===\\n\\n");

    /* 1. Polynomial Addition */
    PolyNode *p1 = NULL, *p2 = NULL;
    appendTerm(&p1, 5, 3);
    appendTerm(&p1, 4, 2);
    appendTerm(&p1, 2, 1);
    appendTerm(&p1, 7, 0);

    appendTerm(&p2, 3, 3);
    appendTerm(&p2, 2, 2);
    appendTerm(&p2, 1, 0);

    printf("Polynomial P1: "); displayPoly(p1);
    printf("Polynomial P2: "); displayPoly(p2);
    PolyNode *sum = addPolynomials(p1, p2);
    printf("Resultant Sum: "); displayPoly(sum);

    printf("\\n");

    /* 2. Graph Adjacency List */
    Graph *g = createGraph(4);
    addEdge(g, 0, 1);
    addEdge(g, 0, 2);
    addEdge(g, 1, 3);
    addEdge(g, 2, 0);
    addEdge(g, 3, 1);
    printGraph(g);

    return 0;
}`,
      explanation: [
        'Line 8-12: PolyNode struct stores coefficient, exponent, and next pointer.',
        'Line 40-61: addPolynomials() executes in O(m + n) time using a parallel linear merge traversal.',
        'Line 66-74: Graph structure represents an array of linked list heads (AdjNode**), one per vertex.',
        'Line 84-90: addEdge() prepends a new adjacent vertex node in strictly O(1) time.',
        'Line 93-104: printGraph() iterates through each vertex and displays its neighbor linked chain.'
      ],
      simulatedOutput:
`=== Demonstration of Linked List Applications in C99 ===

Polynomial P1: 5x^3 + 4x^2 + 2x^1 + 7x^0
Polynomial P2: 3x^3 + 2x^2 + 1x^0
Resultant Sum: 8x^3 + 6x^2 + 2x^1 + 8x^0

Graph Adjacency Lists:
Vertex 0: -> 2 -> 1 -> NULL
Vertex 1: -> 3 -> NULL
Vertex 2: -> 0 -> NULL
Vertex 3: -> 1 -> NULL`
    },
    realWorldUses: [
      {
        title: 'Database Hash Index Collision Resolution (Separate Chaining)',
        domain: 'Database Internals (PostgreSQL & MySQL InnoDB)',
        problem: 'Hash indexing generates hash collisions when diverse database keys map to the same bucket. Open addressing requires tombstone markers that complicate deletion.',
        solution: 'Database engines use separate chaining with singly linked lists per hash bucket. Inserting a colliding record prepends to the bucket head in O(1) time.',
        typeUsed: 'Singly Linked Bucket Collision Chains',
        complexity: 'O(1) insert, O(1) average lookup and deletion',
        realWorldContext: 'Standard collision resolution mechanism used across Java HashMap, Python dictionary (historical), and database memory buffers.'
      },
      {
        title: 'Sparse Graph Representation in Social Networks & Web Graphs',
        domain: 'Big Data & Graph Databases (Neo4j, Apache Giraph)',
        problem: 'Real-world social networks (e.g. 1 billion users where each user has 200 friends) cannot be stored in a 1B x 1B Adjacency Matrix (which would require 1 Exabyte of RAM!).',
        solution: 'Graph systems use Adjacency Lists where each vertex stores a linked list of edges. Total space is proportional to actual connections: O(V + E), fitting easily in memory.',
        typeUsed: 'Adjacency Linked Lists',
        complexity: 'O(V + E) space complexity, O(degree(u)) edge traversal',
        realWorldContext: 'Powers recommendation algorithms at LinkedIn, friend graphs at Meta, and web crawling at Google.'
      },
      {
        title: 'Symbolic Mathematics & Computer Algebra Systems (CAS)',
        domain: 'Scientific Computing (SymPy, Maple, Wolfram Mathematica)',
        problem: 'Multivariable polynomials with hundreds of terms and sparse exponent distributions cannot be represented efficiently in dense arrays without allocating massive blocks for zero coefficients.',
        solution: 'Algebraic software stores polynomials as linked chains of non-zero terms, executing symbolic addition, multiplication, and differentiation via pointer manipulation.',
        typeUsed: 'Ordered Polynomial Linked Lists',
        complexity: 'O(m + n) addition, O(m * n) multiplication',
        realWorldContext: 'Used in aerospace flight dynamics simulators and quantum mechanical wave equation solvers.'
      }
    ],
    complexity: [
      {
        operation: 'Linked Stack: Push & Pop',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1) amortized',
        spaceComplexity: 'O(n) total',
        explanation: 'Constant time insertion and deletion at HEAD with zero shifting.'
      },
      {
        operation: 'Linked Queue: Enqueue & Dequeue',
        linkedStackQueue: 'O(1)',
        arrayEquivalent: 'O(1) [Circular array]',
        spaceComplexity: 'O(n) total',
        explanation: 'Constant time append at REAR and removal at FRONT.'
      },
      {
        operation: 'Polynomial Addition (m & n terms)',
        linkedStackQueue: 'O(m + n)',
        arrayEquivalent: 'O(max(deg1, deg2))',
        spaceComplexity: 'O(m + n)',
        explanation: 'Simultaneous single-pass traversal of both sorted linked lists.'
      },
      {
        operation: 'Graph Adjacency List Space',
        linkedStackQueue: 'O(V + E)',
        arrayEquivalent: 'O(V^2) [Adjacency Matrix]',
        spaceComplexity: 'O(V + E)',
        explanation: 'Tremendous memory savings on sparse graphs where E << V^2.'
      },
      {
        operation: 'Hash Table Separate Chaining',
        linkedStackQueue: 'O(1) insert, O(1+alpha) search',
        arrayEquivalent: 'O(1) [Open Addressing]',
        spaceComplexity: 'O(N + B)',
        explanation: 'Singly linked collision chains support smooth growth without resizing locks.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-603-1',
        question: 'Why is an Adjacency List dramatically more memory-efficient than an Adjacency Matrix for a sparse graph with V = 100,000 vertices and E = 200,000 edges?',
        options: [
          'Adjacency lists store vertices in hardware cache lines',
          'An Adjacency Matrix requires V^2 = 10,000,000,000 entries (40 GB of RAM), whereas an Adjacency List requires only V + E nodes (~7.2 MB)',
          'Adjacency lists automatically compress graph edges using gzip',
          'Adjacency matrices cannot store edge weights'
        ],
        correctAnswer: 1,
        explanation: 'An Adjacency Matrix allocates a full V x V grid regardless of whether edges exist. For a sparse graph, >99.9% of the matrix entries would be zeroes, wasting gigabytes of RAM. An Adjacency List stores only existing edges, consuming O(V + E) space.'
      },
      {
        id: 'q-603-2',
        question: 'What is the time complexity to add two single-variable polynomials of sizes m and n represented as linked lists sorted in descending order of exponents?',
        options: ['O(m * n)', 'O(m + n)', 'O(log(m + n))', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Because both input polynomial linked lists are sorted by exponents, the algorithm advances along both lists simultaneously in a single linear pass (analogous to the merge step in Mergesort), running in O(m + n) time.'
      },
      {
        id: 'q-603-3',
        question: 'How does separate chaining in a Hash Table handle key collisions using linked lists?',
        options: [
          'It deletes the old key and overwrites it with the new key',
          'Each hash table bucket maintains a Singly Linked List; colliding key-value pairs are prepended to the bucket list in O(1) time',
          'It rehashes the entire table into a binary search tree',
          'It probes sequentially to the next adjacent bucket'
        ],
        correctAnswer: 1,
        explanation: 'In separate chaining, each array bucket holds the HEAD pointer of a Singly Linked List. When multiple keys hash to the same bucket, the new key-value pair is simply prepended to that bucket linked list in O(1) time.'
      },
      {
        id: 'q-603-4',
        question: 'Why are Doubly Linked Lists uniquely suitable for browser navigation history (Back and Forward buttons)?',
        options: [
          'Because Doubly Linked Lists use less memory than Singly Linked Lists',
          'Because each node stores both prev and next pointers, allowing instantaneous O(1) backward and forward traversal from the current active page',
          'Because browsers only support circular memory buffers',
          'Because Doubly Linked Lists prevent cross-site scripting'
        ],
        correctAnswer: 1,
        explanation: 'Browser history requires moving backward to previous pages and forward to already-visited pages. A Doubly Linked List with an active node pointer enables O(1) back (curr = curr->prev) and forward (curr = curr->next) navigation.'
      }
    ]
  }
};
