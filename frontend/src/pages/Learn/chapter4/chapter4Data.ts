// Chapter 4 Data Model: Stack & Queue Data Structures
// Curriculum Alignment: Standard University CS Syllabus / CLRS / Tanenbaum / Dijkstra
// Reference Textbooks: Cormen, Leiserson, Rivest, Stein (MIT Press) & Tanenbaum (PHI) & Sedgewick (Pearson)

export interface ConceptItem {
  name: string;
  source: 'CLRS Primary Source' | 'Verified Academic Curriculum' | 'IEEE / ACM Standard';
  definition: string;
  example: string;
  usage: string;
  asciiDiagram?: string;
}

export interface ComparisonRow {
  aspect: string;
  col1: string;
  col2: string;
}

export interface OperationDetail {
  id: string;
  name: string;
  definition: string;
  explanation: string;
  arrayExample: string;
  realWorldExample: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
    assumptions: string;
  };
  cSnippet: string;
}

export interface CaseStudy {
  title: string;
  category: string;
  system: string;
  description: string;
  bullets: string[];
}

export interface QuizQuestion {
  id: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  conceptRef: string;
}

export interface StepTrace {
  stepNumber: number;
  action: string;
  stateDisplay: string;
  highlightedIndices: number[];
  statusText: string;
}

export interface TopicData {
  id: string;
  title: string;
  sidebarTitle: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
  category: 'Linear Data Structure' | 'Algorithmic Processing';
  description: string;
  unitCode: string;
  courseCode: string;
  coreIdea: string;
  howItWorks: string[];
  pseudocode: string;
  stepByStepExample: {
    title: string;
    initialState: string;
    steps: StepTrace[];
  };
  concepts: ConceptItem[];
  comparisonTable?: {
    header1: string;
    header2: string;
    rows: ComparisonRow[];
  };
  operations: OperationDetail[];
  cCode: {
    filename: string;
    description: string;
    code: string;
  };
  realWorld: CaseStudy[];
  complexityMatrix: {
    title: string;
    summary: string;
    rows: {
      operation: string;
      timeComplexity: string;
      spaceComplexity: string;
      notes: string;
    }[];
  };
  advantages: string[];
  disadvantages: string[];
  whenToUse: string[];
  whenNotToUse: string[];
  commonMistakes: string[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  practiceQuestions: QuizQuestion[];
}

export const chapter4Topics: Record<string, TopicData> = {
  // ==========================================
  // TOPIC 1: STACK & ITS APPLICATIONS
  // ==========================================
  'top-401': {
    id: 'top-401',
    title: 'Stack & Its Applications',
    sidebarTitle: 'Stack & Its Applications',
    complexity: 'Easy',
    category: 'Linear Data Structure',
    description:
      'A Stack is a fundamental linear data structure that operates under the strict Last-In, First-Out (LIFO) access constraint. All insertions (push) and deletions (pop) occur exclusively at a single accessible end designated as the TOP of the stack.',
    unitCode: 'Unit 4: Stack & Queue',
    courseCode: 'CS202 / CLRS Ch. 10.1',
    coreIdea:
      'Think of a physical stack of plates: you can only place a new plate on top, and you can only remove the topmost plate. The last element pushed is invariably the first element to be popped (LIFO). Attempting to insert into a full stack triggers Stack Overflow, while attempting to remove from an empty stack triggers Stack Underflow.',
    howItWorks: [
      'Maintain an internal storage container (array or linked list) and a pointer or integer index named TOP.',
      'Initialize TOP = -1 for empty array-based stack, or TOP = NULL for linked list stack.',
      'PUSH(item): Check if full (TOP == MAX - 1). If full, trigger Stack Overflow. Otherwise, increment TOP (TOP = TOP + 1) and store item at arr[TOP].',
      'POP(): Check if empty (TOP == -1). If empty, trigger Stack Underflow. Otherwise, retrieve item at arr[TOP] and decrement TOP (TOP = TOP - 1).',
      'PEEK() / TOP(): Read and return arr[TOP] without modifying TOP or deleting the element.',
      'isEmpty(): Returns true if TOP == -1; isFull(): Returns true if TOP == MAX - 1.'
    ],
    pseudocode: `ADT Stack:
  DATA:
    arr[MAX] of Type T
    top: Integer = -1

  OPERATION Push(item: T):
    IF IsFull() THEN
      ERROR "Stack Overflow"
    END IF
    top = top + 1
    arr[top] = item

  OPERATION Pop() -> T:
    IF IsEmpty() THEN
      ERROR "Stack Underflow"
    END IF
    item = arr[top]
    top = top - 1
    RETURN item

  OPERATION Peek() -> T:
    IF IsEmpty() THEN
      ERROR "Stack Underflow"
    END IF
    RETURN arr[top]

  OPERATION IsEmpty() -> Boolean:
    RETURN top == -1

  OPERATION IsFull() -> Boolean:
    RETURN top == MAX - 1`,
    stepByStepExample: {
      title: 'Executing Push(10), Push(20), Push(30), Pop(), Peek() on Stack of Capacity 5',
      initialState: 'Stack is Empty [TOP = -1]',
      steps: [
        {
          stepNumber: 1,
          action: 'Push(10)',
          stateDisplay: '[10] (TOP = 0)',
          highlightedIndices: [0],
          statusText: 'TOP incremented to 0. Inserted 10 at arr[0]. Stack has 1 element.'
        },
        {
          stepNumber: 2,
          action: 'Push(20)',
          stateDisplay: '[10, 20] (TOP = 1)',
          highlightedIndices: [1],
          statusText: 'TOP incremented to 1. Inserted 20 at arr[1]. Stack has 2 elements.'
        },
        {
          stepNumber: 3,
          action: 'Push(30)',
          stateDisplay: '[10, 20, 30] (TOP = 2)',
          highlightedIndices: [2],
          statusText: 'TOP incremented to 2. Inserted 30 at arr[2]. Stack has 3 elements.'
        },
        {
          stepNumber: 4,
          action: 'Pop() -> Returns 30',
          stateDisplay: '[10, 20] (TOP = 1)',
          highlightedIndices: [1],
          statusText: 'Retrieved value 30. TOP decremented from 2 to 1. 30 is removed logically.'
        },
        {
          stepNumber: 5,
          action: 'Peek() -> Returns 20',
          stateDisplay: '[10, 20] (TOP = 1)',
          highlightedIndices: [1],
          statusText: 'Read topmost element arr[1] = 20 without decrementing TOP. Stack unchanged.'
        }
      ]
    },
    concepts: [
      {
        name: 'The LIFO (Last-In, First-Out) Invariant',
        source: 'CLRS Primary Source',
        definition:
          'LIFO is the mathematical invariant governing stacks: the temporal order of element entry is strictly inverted upon exit. The most recently inserted element has the lowest eviction latency, and the oldest element cannot be accessed until all subsequent elements are removed.',
        example: 'Push(A) -> Push(B) -> Push(C) -> Pop() yields C, Pop() yields B, Pop() yields A.',
        usage: 'Grammar parsing, expression reversal, call-return semantics.',
        asciiDiagram: `|     |
| [30]| <-- TOP (Index 2)
| [20]|     (Index 1)
| [10]|     (Index 0)
+-----+`
      },
      {
        name: 'Array vs Linked List Stack Implementations',
        source: 'Verified Academic Curriculum',
        definition:
          'Array-based stack allocates a fixed contiguous memory buffer. All operations are strict O(1) with optimal cache locality, but subject to fixed capacity limits (Stack Overflow). Linked List stack allocates dynamic heap nodes on push, allowing unbounded growth until system RAM exhaustion, but consumes pointer memory and incurs allocator overhead.',
        example: 'Array: arr[top++]; Linked: newNode->next = top; top = newNode;',
        usage: 'Array for bounded performance-critical systems; Linked list for unpredictable load.'
      },
      {
        name: 'Stack Overflow and Underflow Boundary Conditions',
        source: 'IEEE / ACM Standard',
        definition:
          'Stack Overflow occurs when invoking push() on a stack that has exhausted its allocated capacity. Stack Underflow occurs when invoking pop() or peek() on an empty stack (top == -1). Unchecked underflows in C lead to negative index memory corruption (arr[-1]).',
        example: 'if (top == MAX - 1) { /* OVERFLOW */ } if (top == -1) { /* UNDERFLOW */ }',
        usage: 'Security audits, preventing stack-based buffer overflows.'
      },
      {
        name: 'Parentheses / Delimiter Matching',
        source: 'CLRS Primary Source',
        definition:
          'A classic compiler validation problem: every opening bracket (, [, { is pushed onto a stack. When a closing bracket ), ], } is scanned, the top element is popped and verified to match. An expression is balanced if and only if the stack is completely empty at end of string.',
        example: '{ [ ( ) ] } is balanced; { [ ( ] ) } causes a mismatch error when ] is compared with (.',
        usage: 'IDE syntax checkers, compiler lexers and parsers.'
      }
    ],
    comparisonTable: {
      header1: 'Array-Based Stack',
      header2: 'Linked List-Based Stack',
      rows: [
        {
          aspect: 'Memory Allocation',
          col1: 'Static, contiguous memory block allocated upfront',
          col2: 'Dynamic node allocation on heap per push'
        },
        {
          aspect: 'Capacity Limit',
          col1: 'Fixed maximum size MAX (can cause Stack Overflow)',
          col2: 'Dynamic; bounded only by total available RAM'
        },
        {
          aspect: 'Memory Overhead',
          col1: 'Zero pointer overhead; stores pure data elements',
          col2: 'High pointer overhead (e.g., 8 bytes next pointer per node)'
        },
        {
          aspect: 'CPU Cache Locality',
          col1: 'Excellent spatial locality (stride-1 contiguous RAM)',
          col2: 'Poor cache locality (nodes scattered across heap)'
        },
        {
          aspect: 'Operation Time Complexity',
          col1: 'O(1) strictly constant time for all operations',
          col2: 'O(1) time, but with higher malloc()/free() constant factor'
        }
      ]
    },
    operations: [
      {
        id: 'op-push',
        name: 'Push Operation',
        definition: 'Inserts a new element onto the top of the stack.',
        explanation:
          'Verifies top < MAX - 1. If not full, increments top index and writes value into arr[top]. In linked list, allocates node and prepends to head.',
        arrayExample: 'Pushing 42 when top = 2 places 42 at arr[3] and sets top = 3.',
        realWorldExample: 'Pushing local function activation frame when calling a subroutine.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Fixed-size array stack without reallocation.'
        },
        cSnippet: `bool push(Stack *s, int val) {
    if (s->top >= MAX - 1) {
        printf("Error: Stack Overflow!\\n");
        return false;
    }
    s->items[++(s->top)] = val;
    return true;
}`
      },
      {
        id: 'op-pop',
        name: 'Pop Operation',
        definition: 'Removes and returns the topmost element from the stack.',
        explanation:
          'Verifies top >= 0. If not empty, reads arr[top], decrements top index by 1, and returns the retrieved value.',
        arrayExample: 'Popping when top = 3 returns arr[3] and updates top = 2.',
        realWorldExample: 'Triggering Ctrl+Z (Undo) in an image manipulation editor.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Single element deletion from top.'
        },
        cSnippet: `int pop(Stack *s, bool *success) {
    if (s->top < 0) {
        printf("Error: Stack Underflow!\\n");
        if (success) *success = false;
        return -1;
    }
    if (success) *success = true;
    return s->items[(s->top)--];
}`
      },
      {
        id: 'op-peek',
        name: 'Peek / Top Operation',
        definition: 'Returns the current topmost element without removing it.',
        explanation:
          'Reads arr[top] while leaving top index unchanged. Crucial for inspection before deciding whether to pop.',
        arrayExample: 'Peek on stack [10, 20, 30] returns 30; stack remains [10, 20, 30].',
        realWorldExample: 'Checking operator precedence on top of stack during Shunting-Yard conversion.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Constant time index lookup.'
        },
        cSnippet: `int peek(const Stack *s, bool *success) {
    if (s->top < 0) {
        if (success) *success = false;
        return -1;
    }
    if (success) *success = true;
    return s->items[s->top];
}`
      }
    ],
    cCode: {
      filename: 'stack_array.c',
      description: 'Robust ISO C99 array-based Stack implementation with overflow and underflow protection.',
      code: `/*
 * DSAForge Educational Series - Chapter 4: Stack & Queue
 * File: stack_array.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Bounded Array Stack Implementation with Telemetry
 */

#include <stdio.h>
#include <stdbool.h>

#define STACK_CAPACITY 5

typedef struct {
    int data[STACK_CAPACITY];
    int top;
} Stack;

/**
 * Initializes a new stack setting TOP index to -1 (empty).
 */
void init_stack(Stack *s) {
    s->top = -1;
}

bool is_empty(const Stack *s) {
    return s->top == -1;
}

bool is_full(const Stack *s) {
    return s->top == STACK_CAPACITY - 1;
}

bool push(Stack *s, int val) {
    if (is_full(s)) {
        printf("[STACK OVERFLOW]: Cannot push %d. Stack is full (Capacity = %d)!\\n", 
               val, STACK_CAPACITY);
        return false;
    }
    s->data[++(s->top)] = val;
    printf("[PUSH SUCCESS]: Inserted %d at index [%d]\\n", val, s->top);
    return true;
}

int pop(Stack *s, bool *ok) {
    if (is_empty(s)) {
        printf("[STACK UNDERFLOW]: Cannot pop. Stack is empty!\\n");
        if (ok) *ok = false;
        return -1;
    }
    if (ok) *ok = true;
    int popped_val = s->data[(s->top)--];
    printf("[POP SUCCESS]: Removed %d from TOP. New TOP index = %d\\n", 
           popped_val, s->top);
    return popped_val;
}

int peek(const Stack *s, bool *ok) {
    if (is_empty(s)) {
        printf("[PEEK FAILED]: Stack is empty.\\n");
        if (ok) *ok = false;
        return -1;
    }
    if (ok) *ok = true;
    return s->data[s->top];
}

void print_stack(const Stack *s) {
    printf("Stack State (bottom -> top): [ ");
    for (int i = 0; i <= s->top; i++) {
        printf("%d%s", s->data[i], (i == s->top) ? " (TOP)" : ", ");
    }
    printf(" ]\\n");
}

int main(void) {
    Stack s;
    init_stack(&s);
    bool status;

    printf("=========================================\\n");
    printf("     DSAForge: Stack ADT Verification    \\n");
    printf("=========================================\\n\\n");

    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    print_stack(&s);

    printf("\\nTop element is: %d\\n", peek(&s, &status));

    printf("\\nExecuting Pop operations:\\n");
    pop(&s, &status);
    print_stack(&s);

    printf("\\nPushing elements to test boundary conditions:\\n");
    push(&s, 40);
    push(&s, 50);
    push(&s, 60);
    // This will trigger Stack Overflow:
    push(&s, 70);
    print_stack(&s);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'CPU Program Call Stack & Activation Records',
        category: 'Operating Systems & Architecture',
        system: 'x86_64 Call Stack / Linux Process Memory',
        description:
          'When a C program executes a function call, the CPU hardware pushes an activation frame (return address, register saves, local variables) onto the thread stack. When the function returns, the frame is popped in LIFO order.',
        bullets: [
          'Hardware stack pointer (RSP/ESP register) automates subroutine execution',
          'Enables nested function calls to any depth without variable collisions',
          'Stack corruption triggers segmentation faults or buffer overflow security exploits'
        ]
      },
      {
        title: 'Multi-Level Undo/Redo Engine',
        category: 'Desktop Software Engineering',
        system: 'VS Code, Photoshop & Microsoft Word',
        description:
          'Productivity applications maintain two companion stacks: the Undo Stack and Redo Stack. Every edit action pushes state to the Undo stack. Pressing Ctrl+Z pops the state and pushes it to the Redo stack.',
        bullets: [
          'LIFO order ensures the most recent user error is reverted first',
          'Bounded stack capacity prevents unlimited memory growth during long editing sessions',
          'Typing a new action immediately flushes the Redo stack'
        ]
      },
      {
        title: 'Web Browser History Navigation',
        category: 'Web Browsers',
        system: 'Chromium / Firefox Navigation Controller',
        description:
          'Browsers manage URL navigation using two stacks: Back Stack and Forward Stack. Clicking a link pushes the current URL to the Back stack. Clicking Back pops the previous URL and pushes current page to Forward.',
        bullets: [
          'Guarantees predictable backward step navigation through nested hyperlinks',
          'Zero latency O(1) state transitions during browsing',
          'Visits to new links clear the forward stack in accordance with W3C specs'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Stack Operations Asymptotic Complexity',
      summary:
        'All core stack operations execute in strictly constant O(1) time because interactions are confined exclusively to the TOP element.',
      rows: [
        {
          operation: 'Push(item)',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Array index increment or linked list head pointer insertion.'
        },
        {
          operation: 'Pop()',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Array index decrement or linked list head deletion.'
        },
        {
          operation: 'Peek() / Top()',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Direct read of arr[top] or top->data.'
        },
        {
          operation: 'isEmpty() / isFull()',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Single equality comparison against sentinel bounds.'
        },
        {
          operation: 'Total Auxiliary Space',
          timeComplexity: '—',
          spaceComplexity: 'O(n)',
          notes: 'Linear memory proportional to the maximum stored capacity n.'
        }
      ]
    },
    advantages: [
      'Guaranteed O(1) time complexity for all fundamental operations (Push, Pop, Peek).',
      'Simple, robust, and intuitive programming model with minimal edge cases.',
      'Optimal memory utilization when implemented using contiguous arrays (zero pointer overhead).',
      'Naturally mirrors human and machine recursive thought processes.'
    ],
    disadvantages: [
      'No random access: accessing the bottom or middle element requires popping all preceding elements (destructive).',
      'Array implementation has a fixed size and is vulnerable to Stack Overflow.',
      'Linked list implementation introduces heap fragmentation and pointer storage overhead.'
    ],
    whenToUse: [
      'When elements must be processed in the exact reverse order of their arrival (LIFO).',
      'When tracking nested structures (parentheses, HTML/XML tags, function calls).',
      'When implementing backtracking algorithms (maze solving, Depth First Search, N-Queens).',
      'When implementing Undo/Redo or history state machines.'
    ],
    whenNotToUse: [
      'When elements need to be searched or accessed by arbitrary index (use Array or Hash Table).',
      'When first-arrived elements must be serviced first (use FIFO Queue).',
      'When elements must be serviced by importance or priority (use Priority Queue).'
    ],
    commonMistakes: [
      'Attempting to pop from an empty stack without checking isEmpty(), producing undefined values or memory faults.',
      'Allowing top to exceed MAX - 1, overwriting adjacent variables in memory (classic buffer overflow).',
      'Assuming stack elements are cleared from physical RAM upon pop (the index decrements, but old values remain until overwritten).'
    ],
    interviewQuestions: [
      {
        question: 'How can you implement a Queue using two Stacks, and what is the amortized complexity of operations?',
        answer:
          'Maintain two stacks: in_stack and out_stack. For enqueue(x), push x onto in_stack (O(1)). For dequeue(), if out_stack is empty, pop all elements from in_stack and push them into out_stack (reversing LIFO into FIFO order), then pop from out_stack. While an individual dequeue can take O(n) when transferring, each element is pushed and popped at most twice, yielding amortized O(1) time per operation.'
      },
      {
        question: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.',
        answer:
          'Maintain a companion min_stack alongside the main stack. On push(x), push x to main_stack, and push min(x, min_stack.top()) to min_stack. On pop(), pop from both stacks. getMin() simply returns min_stack.top() in O(1) time with O(n) extra space. Alternatively, store encoded differences (2*x - minVal) to achieve O(1) getMin with O(1) extra space.'
      },
      {
        question: 'What is the difference between a Call Stack and a Heap in computer architecture?',
        answer:
          'The Call Stack is managed automatically by the CPU and OS. It stores activation records (local variables, parameters, return addresses) in strict LIFO order with fast contiguous pointer movement, but has limited size (typically 1MB to 8MB). The Heap is a large pool of unstructured dynamic memory managed explicitly by the programmer (malloc/free in C) with random lifetimes, but slower allocation and risk of fragmentation.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-stk-1',
        difficulty: 'Easy',
        question: 'Which principle governs the order of insertion and removal in a Stack?',
        options: ['FIFO (First-In, First-Out)', 'LIFO (Last-In, First-Out)', 'SJF (Shortest Job First)', 'LRU (Least Recently Used)'],
        correctAnswer: 1,
        explanation: 'Stack strictly enforces LIFO (Last-In, First-Out). The most recently added element is always the first to be removed.',
        conceptRef: 'LIFO Invariant'
      },
      {
        id: 'q-stk-2',
        difficulty: 'Easy',
        question: 'What condition triggers a Stack Underflow error?',
        options: [
          'Pushing an element when top == MAX - 1',
          'Attempting to pop or peek when top == -1 (empty stack)',
          'Attempting to insert a negative integer',
          'Having more than 1000 items in memory'
        ],
        correctAnswer: 1,
        explanation: 'Stack Underflow occurs when an algorithm attempts to pop or peek from a stack that has zero elements (top == -1).',
        conceptRef: 'Boundary Invariants'
      },
      {
        id: 'q-stk-3',
        difficulty: 'Medium',
        question: 'Given an empty stack, elements A, B, C, D are pushed in order. Two pops are executed, then element E is pushed, followed by one pop. What is the final state of the stack from bottom to top?',
        options: ['[A, B, E]', '[A, B]', '[A, E]', '[D, C, E]'],
        correctAnswer: 1,
        explanation: 'Push A, B, C, D -> Stack: [A, B, C, D]. Pop -> removes D. Pop -> removes C. Stack is [A, B]. Push E -> Stack: [A, B, E]. Pop -> removes E. Final stack is [A, B].',
        conceptRef: 'Operation Tracing'
      },
      {
        id: 'q-stk-4',
        difficulty: 'Hard',
        question: 'Which of the following bracket sequences is considered BALANCED by a stack-based syntax checker?',
        options: ['{ [ ( ] ) }', '[ ( { } ) ]', '( [ ) ]', '{ { [ ( ) } }'],
        correctAnswer: 1,
        explanation: '[ ( { } ) ] is properly nested. All inner brackets close in reverse order of opening before outer brackets close.',
        conceptRef: 'Delimiter Matching'
      }
    ]
  },

  // ==========================================
  // TOPIC 2: EXPRESSION PROCESSING & RECURSION
  // ==========================================
  'top-402': {
    id: 'top-402',
    title: 'Expression Processing & Recursion',
    sidebarTitle: 'Expression Processing & Recursion',
    complexity: 'Medium',
    category: 'Algorithmic Processing',
    description:
      'A comprehensive module exploring two core stack-driven computer science domains: parsing and evaluating mathematical expressions (Infix, Prefix, and Postfix) and understanding how recursion relies fundamentally on the system call stack, highlighted by the classical Tower of Hanoi problem.',
    unitCode: 'Unit 4: Stack & Queue',
    courseCode: 'CS202 / CLRS Ch. 10.1 & Dijkstra',
    coreIdea:
      'Compilers cannot easily evaluate Infix notation (A + B * C) due to operator precedence and parentheses ambiguities. By transforming Infix into Postfix notation (A B C * +) via an operator stack, expressions can be evaluated in a single linear pass without parentheses. Similarly, recursion is the execution of self-referential functions where the CPU automatically manages call frames using a runtime Call Stack.',
    howItWorks: [
      'Infix to Postfix (Shunting-Yard): Scan tokens. Operands append to output. Operators are pushed to a stack after popping all higher or equal precedence operators. Parentheses dictate scope.',
      'Postfix Evaluation: Scan tokens. Push operands onto an operand stack. When an operator is met, pop two operands, compute the operation, and push result back.',
      'Recursion Mechanics: Every recursive call requires a base condition (stopping rule) and a recursive step. Each invocation pushes a new stack frame containing local variables, parameters, and return addresses.',
      'Tower of Hanoi: To move n disks from A to C using B: (1) Move n-1 disks from A to B; (2) Move disk n from A to C; (3) Move n-1 disks from B to C. Requires exactly 2^n - 1 moves.'
    ],
    pseudocode: `// Shunting-Yard Algorithm: Infix to Postfix
ALGORITHM InfixToPostfix(expr):
  operatorStack = new Stack()
  output = ""

  FOR EACH token in expr DO
    IF IsOperand(token) THEN
      output += token
    ELSE IF token == '(' THEN
      operatorStack.Push(token)
    ELSE IF token == ')' THEN
      WHILE operatorStack.Top() != '(' DO
        output += operatorStack.Pop()
      END WHILE
      operatorStack.Pop() // Discard '('
    ELSE IF IsOperator(token) THEN
      WHILE !operatorStack.IsEmpty() AND Precedence(operatorStack.Top()) >= Precedence(token) DO
        output += operatorStack.Pop()
      END WHILE
      operatorStack.Push(token)
    END IF
  END FOR

  WHILE !operatorStack.IsEmpty() DO
    output += operatorStack.Pop()
  END WHILE
  RETURN output`,
    stepByStepExample: {
      title: 'Converting Infix "A + B * C" to Postfix "A B C * +" using Operator Stack',
      initialState: 'Infix: A + B * C | Stack: Empty | Output: ""',
      steps: [
        {
          stepNumber: 1,
          action: 'Scan Operand "A"',
          stateDisplay: 'Output: "A" | Stack: [ ]',
          highlightedIndices: [0],
          statusText: 'Operand A appended directly to output string.'
        },
        {
          stepNumber: 2,
          action: 'Scan Operator "+"',
          stateDisplay: 'Output: "A" | Stack: [ + ]',
          highlightedIndices: [1],
          statusText: 'Stack is empty. Push "+" onto operator stack.'
        },
        {
          stepNumber: 3,
          action: 'Scan Operand "B"',
          stateDisplay: 'Output: "A B" | Stack: [ + ]',
          highlightedIndices: [2],
          statusText: 'Operand B appended directly to output.'
        },
        {
          stepNumber: 4,
          action: 'Scan Operator "*"',
          stateDisplay: 'Output: "A B" | Stack: [ +, * ]',
          highlightedIndices: [3],
          statusText: 'Precedence of "*" (2) > "+" (1). Push "*" onto stack above "+".'
        },
        {
          stepNumber: 5,
          action: 'Scan Operand "C"',
          stateDisplay: 'Output: "A B C" | Stack: [ +, * ]',
          highlightedIndices: [4],
          statusText: 'Operand C appended directly to output.'
        },
        {
          stepNumber: 6,
          action: 'End of Input: Flush Stack',
          stateDisplay: 'Output: "A B C * +" | Stack: [ ]',
          highlightedIndices: [3, 1],
          statusText: 'Pop "*" then "+" to output. Final Postfix: "A B C * +".'
        }
      ]
    },
    concepts: [
      {
        name: 'Infix, Prefix, and Postfix Notations',
        source: 'CLRS Primary Source',
        definition:
          'Infix places operators between operands (A + B). Prefix (Polish) places operators before operands (+ A B). Postfix (Reverse Polish) places operators after operands (A B +). Postfix and Prefix completely eliminate parentheses and operator ambiguity.',
        example: 'Infix: (A + B) * C  ==>  Postfix: A B + C *  ==>  Prefix: * + A B C',
        usage: 'Bytecode virtual machines (JVM, Python disassembler, Forth language).',
        asciiDiagram: `Infix:    ( A  +  B )  *  C
Postfix:    A  B  +  C  *
Stack:    [A, B] -> (+) -> [AB_sum, C] -> (*) -> Result`
      },
      {
        name: 'The Role of the Stack in Expression Parsing',
        source: 'Verified Academic Curriculum',
        definition:
          'During conversion, the stack defers the evaluation of operators until their higher-precedence operands have been processed. In postfix evaluation, an operand stack stores numbers until an operator combines the top two values.',
        example: 'Evaluating "5 3 2 * +": 3 * 2 = 6, then 5 + 6 = 11.',
        usage: 'Scientific pocket calculators (HP RPN calculators), compiler AST generation.'
      },
      {
        name: 'Activation Records & The Runtime Call Stack',
        source: 'IEEE / ACM Standard',
        definition:
          'When a recursive function calls itself, the CPU pushes a new Activation Record (containing local variables, arguments, and return address) onto the call stack. Once the base case is hit, stack frames unwind in LIFO order.',
        example: 'fact(3) -> fact(2) -> fact(1) (base case 1) -> unwinds returning 2 -> 6.',
        usage: 'Underlying execution model of C, C++, Java, Python runtimes.'
      },
      {
        name: 'Tower of Hanoi Mathematical Proof',
        source: 'CLRS Primary Source',
        definition:
          'A classic recursive puzzle moving n disks from rod A to C using auxiliary B. The recurrence relation is T(n) = 2T(n-1) + 1 with base case T(1) = 1. Solving by induction yields exactly 2^n - 1 moves with time complexity O(2^n).',
        example: 'For n = 3 disks, total moves = 2^3 - 1 = 7 moves.',
        usage: 'Teaches divide-and-conquer subproblem reduction and recurrence solving.'
      }
    ],
    comparisonTable: {
      header1: 'Infix Notation',
      header2: 'Postfix Notation (RPN)',
      rows: [
        {
          aspect: 'Human Readability',
          col1: 'Highly readable and intuitive for humans',
          col2: 'Unnatural for human mental arithmetic'
        },
        {
          aspect: 'Parentheses Requirement',
          col1: 'Requires parentheses to override default operator precedence',
          col2: 'Parentheses are completely unnecessary and forbidden'
        },
        {
          aspect: 'Machine Evaluation',
          col1: 'Complex; requires multiple passes or syntax parse tree',
          col2: 'Trivial; evaluated in a single linear O(n) stack scan'
        },
        {
          aspect: 'Operator Position',
          col1: 'Between operands: A + B',
          col2: 'Following operands: A B +'
        }
      ]
    },
    operations: [
      {
        id: 'op-shunting-yard',
        name: 'Shunting-Yard Conversion (Infix -> Postfix)',
        definition: 'Parses an infix math expression and converts it into postfix.',
        explanation:
          'Uses operator stack. Operands go directly to output. Operators are pushed according to precedence. Parentheses flush operators.',
        arrayExample: '"(A + B) * C" -> "A B + C *"',
        realWorldExample: 'Compiler front-end lexical parsing stage.',
        timeComplexity: {
          best: 'O(n)',
          average: 'O(n)',
          worst: 'O(n)',
          assumptions: 'Each token pushed and popped at most once.'
        },
        cSnippet: `int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}`
      },
      {
        id: 'op-postfix-eval',
        name: 'Postfix Evaluation Routine',
        definition: 'Evaluates a postfix expression using an operand stack.',
        explanation:
          'When scanning operand, push to stack. When operator, pop op2 then op1, compute op1 <operator> op2, push result.',
        arrayExample: '"5 3 + 2 *" -> (5 + 3) * 2 = 16.',
        realWorldExample: 'Java Virtual Machine (JVM) stack-based bytecode evaluation.',
        timeComplexity: {
          best: 'O(n)',
          average: 'O(n)',
          worst: 'O(n)',
          assumptions: 'Expression contains valid syntax.'
        },
        cSnippet: `int eval_postfix(char *expr) {
    int stack[100], top = -1;
    for (int i = 0; expr[i]; i++) {
        if (isdigit(expr[i])) stack[++top] = expr[i] - '0';
        else {
            int op2 = stack[top--];
            int op1 = stack[top--];
            if (expr[i] == '+') stack[++top] = op1 + op2;
            else if (expr[i] == '*') stack[++top] = op1 * op2;
        }
    }
    return stack[top];
}`
      },
      {
        id: 'op-hanoi',
        name: 'Tower of Hanoi Recursive Solver',
        definition: 'Solves the n-disk puzzle using divide-and-conquer recursion.',
        explanation:
          'Moves n-1 disks from Source to Aux, moves disk n to Dest, then moves n-1 disks from Aux to Dest.',
        arrayExample: 'hanoi(3, "A", "C", "B") prints 7 distinct moves.',
        realWorldExample: 'Backup tape rotation algorithms and recursive fractal rendering.',
        timeComplexity: {
          best: 'O(2^n)',
          average: 'O(2^n)',
          worst: 'O(2^n)',
          assumptions: 'Strict binary recurrence tree of height n.'
        },
        cSnippet: `void hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", from, to);
        return;
    }
    hanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c to %c\\n", n, from, to);
    hanoi(n - 1, aux, to, from);
}`
      }
    ],
    cCode: {
      filename: 'expression_recursion.c',
      description: 'ISO C99 program showing Infix to Postfix conversion, Postfix evaluation, and Tower of Hanoi recursion.',
      code: `/*
 * DSAForge Educational Series - Chapter 4: Stack & Queue
 * File: expression_recursion.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Infix to Postfix Conversion, Evaluation & Tower of Hanoi
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

/* --- PART 1: Infix to Postfix Converter --- */
int precedence(char op) {
    if (op == '^') return 3;
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

void infix_to_postfix(const char *infix, char *postfix) {
    char stack[100];
    int top = -1;
    int k = 0;

    for (int i = 0; infix[i] != '\\0'; i++) {
        char ch = infix[i];

        if (isalnum(ch)) {
            postfix[k++] = ch;
        } else if (ch == '(') {
            stack[++top] = ch;
        } else if (ch == ')') {
            while (top >= 0 && stack[top] != '(') {
                postfix[k++] = stack[top--];
            }
            if (top >= 0) top--; // Discard '('
        } else if (strchr("+-*/^", ch)) {
            while (top >= 0 && precedence(stack[top]) >= precedence(ch)) {
                postfix[k++] = stack[top--];
            }
            stack[++top] = ch;
        }
    }

    while (top >= 0) {
        postfix[k++] = stack[top--];
    }
    postfix[k] = '\\0';
}

/* --- PART 2: Postfix Expression Evaluator --- */
int evaluate_postfix(const char *postfix) {
    int stack[100];
    int top = -1;

    for (int i = 0; postfix[i] != '\\0'; i++) {
        char ch = postfix[i];

        if (isdigit(ch)) {
            stack[++top] = ch - '0';
        } else {
            int op2 = stack[top--];
            int op1 = stack[top--];
            switch (ch) {
                case '+': stack[++top] = op1 + op2; break;
                case '-': stack[++top] = op1 - op2; break;
                case '*': stack[++top] = op1 * op2; break;
                case '/': stack[++top] = op1 / op2; break;
            }
        }
    }
    return stack[top];
}

/* --- PART 3: Tower of Hanoi Recursive Engine --- */
void solve_hanoi(int n, char from_rod, char to_rod, char aux_rod, int *moves) {
    if (n == 0) return;
    solve_hanoi(n - 1, from_rod, aux_rod, to_rod, moves);
    (*moves)++;
    printf("  Move %2d: Transfer Disk %d from Rod %c -> Rod %c\\n", 
           *moves, n, from_rod, to_rod);
    solve_hanoi(n - 1, aux_rod, to_rod, from_rod, moves);
}

int main(void) {
    printf("==================================================\\n");
    printf(" DSAForge: Expression Processing & Recursion C99  \\n");
    printf("==================================================\\n\\n");

    // Test 1: Infix to Postfix
    const char *infix = "A+B*(C-D)";
    char postfix[100];
    infix_to_postfix(infix, postfix);
    printf("[Expression Conversion]:\\n");
    printf("  Infix:   %s\\n", infix);
    printf("  Postfix: %s\\n\\n", postfix);

    // Test 2: Postfix Evaluation
    const char *numeric_postfix = "53+2*"; // (5+3)*2 = 16
    int eval_result = evaluate_postfix(numeric_postfix);
    printf("[Postfix Evaluation]:\\n");
    printf("  Postfix Expression: %s\\n", numeric_postfix);
    printf("  Calculated Result:  %d\\n\\n", eval_result);

    // Test 3: Tower of Hanoi
    int num_disks = 3;
    int total_moves = 0;
    printf("[Tower of Hanoi Solution (n = %d disks)]:\\n", num_disks);
    solve_hanoi(num_disks, 'A', 'C', 'B', &total_moves);
    printf("  Total Moves = %d (Formula: 2^n - 1 = %d)\\n", 
           total_moves, (1 << num_disks) - 1);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Java Virtual Machine (JVM) Execution Engine',
        category: 'Runtime Systems & Compilers',
        system: 'HotSpot JVM Bytecode Interpreter',
        description:
          'The Java Virtual Machine is an explicit stack-based execution architecture. Bytecode instructions like iadd, imul, and iload execute operations directly against an operand stack using Reverse Polish Notation semantics.',
        bullets: [
          'Stack-based bytecode enables compact binary sizes and zero register-allocation complexity',
          'Portable execution across disparate CPU hardware architectures',
          'Eliminates need for complex hardware register mappings on embedded systems'
        ]
      },
      {
        title: 'PostScript & PDF Document Rendering Engine',
        category: 'Graphics & Document Processing',
        system: 'Adobe PostScript / PDF Printer Runtimes',
        description:
          'Adobe PostScript is a stack-based concatenative language. Page layouts, vector curves, and font glyphs are interpreted as postfix expressions evaluated in a single streaming pass.',
        bullets: [
          'Direct stream interpretation requires minimal memory footprint on network printers',
          'Parenthesis-free syntax allows immediate inline parsing of vector paths',
          'Industry standard document processing standard since 1982'
        ]
      },
      {
        title: 'Compiler Syntax Tree Construction & Recursive Descent',
        category: 'Language Toolchains',
        system: 'GCC / Clang C Compilers',
        description:
          'Compilers parse recursive grammar specifications using Recursive Descent Parsers. Each non-terminal grammar rule corresponds directly to a C function that calls other grammar functions via the call stack.',
        bullets: [
          'Direct mapping between Context-Free Grammar (BNF) and recursive code routines',
          'Call stack automatically tracks lexical scope and variable lifetimes',
          'Generates optimized Abstract Syntax Trees (ASTs) for subsequent code generation'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Expression & Recursion Complexity Analysis',
      summary:
        'Expression parsing and evaluation run in linear O(n) time. Divide-and-conquer recursion algorithms vary from logarithmic to exponential based on branching factor.',
      rows: [
        {
          operation: 'Infix to Postfix (Shunting-Yard)',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          notes: 'Every token pushed and popped at most once.'
        },
        {
          operation: 'Postfix Evaluation',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          notes: 'Single pass; pushes operands and computes operations immediately.'
        },
        {
          operation: 'Linear Recursion (Factorial, Fibonacci Tabulation)',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          notes: 'Stack depth is proportional to input size n.'
        },
        {
          operation: 'Tower of Hanoi Solution',
          timeComplexity: 'O(2^n)',
          spaceComplexity: 'O(n)',
          notes: 'Recurrence T(n) = 2T(n-1) + 1. Call stack depth is bounded by n.'
        }
      ]
    },
    advantages: [
      'Postfix expressions eliminate all operator precedence and grouping ambiguity.',
      'Single-pass O(n) expression evaluation enables lightning-fast arithmetic interpreters.',
      'Recursion creates concise, mathematically elegant solutions to hierarchical and combinatorial problems.',
      'Call stack handles memory scope and back-tracking automatically without manual memory management.'
    ],
    disadvantages: [
      'Uncontrolled or deep recursion triggers Stack Overflow (call stack exhaustion).',
      'Recursive function calls carry instruction overhead (frame push/pop, parameter copying).',
      'Prefix and Postfix notations are difficult for human users to construct manually.'
    ],
    whenToUse: [
      'When building calculators, formula engines, or compiler arithmetic evaluators.',
      'When traversing naturally recursive structures (Trees, Graphs, JSON/XML documents).',
      'When implementing divide-and-conquer algorithms (MergeSort, QuickSort, Tower of Hanoi).'
    ],
    whenNotToUse: [
      'When an iterative solution is trivial and performance is critical (e.g., simple array loops).',
      'When recursion depth exceeds the system stack limit (e.g., recursion depth > 10,000 in C).'
    ],
    commonMistakes: [
      'Missing or incorrect base condition in a recursive function, causing infinite recursion and a segmentation fault.',
      'Popping operands in the wrong order during evaluation: subtraction and division are non-commutative (op1 - op2 != op2 - op1).',
      'Failing to pop and output remaining operators on the stack at the end of Shunting-Yard conversion.'
    ],
    interviewQuestions: [
      {
        question: 'Why are subtraction and division handled carefully during Postfix evaluation?',
        answer:
          'Subtraction and division are non-commutative operations (a - b != b - a and a / b != b / a). When an operator is encountered in postfix evaluation, the first popped value is op2 (the right operand), and the second popped value is op1 (the left operand). The calculation MUST be executed as op1 - op2 or op1 / op2. Reversing them produces incorrect results.'
      },
      {
        question: 'What is Tail Call Optimization (TCO) and why is it important in recursion?',
        answer:
          'Tail recursion occurs when the recursive call is the very last instruction executed in the function (with no pending operations after return). Smart compilers (GCC with -O2/O3) optimize tail calls by reusing the current stack frame instead of allocating a new one, transforming recursion into an iterative loop with O(1) stack space, preventing stack overflow.'
      },
      {
        question: 'How many moves are required to solve Tower of Hanoi with 5 disks, and what is the general formula?',
        answer:
          'The formula for Tower of Hanoi moves is M(n) = 2^n - 1. For n = 5 disks, M(5) = 2^5 - 1 = 32 - 1 = 31 total moves.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-exp-1',
        difficulty: 'Easy',
        question: 'What is the Postfix equivalent of the Infix expression: A + B * C?',
        options: ['A B C * +', 'A B + C *', '+ A * B C', '* + A B C'],
        correctAnswer: 0,
        explanation: 'Multiplication has higher precedence than addition. B * C is evaluated first (B C *), then added to A -> A B C * +.',
        conceptRef: 'Precedence Rules'
      },
      {
        id: 'q-exp-2',
        difficulty: 'Medium',
        question: 'Evaluating the postfix expression "4 2 / 3 +" yields which numeric result?',
        options: ['5', '8', '2', '14'],
        correctAnswer: 0,
        explanation: 'Scan 4, scan 2 -> encounter /: 4 / 2 = 2. Push 2. Scan 3 -> encounter +: 2 + 3 = 5. Final answer is 5.',
        conceptRef: 'Postfix Evaluation'
      },
      {
        id: 'q-exp-3',
        difficulty: 'Medium',
        question: 'How many recursive calls are made to move 4 disks in the Tower of Hanoi problem?',
        options: ['4', '8', '15', '16'],
        correctAnswer: 2,
        explanation: 'The number of moves is 2^n - 1. For n = 4, 2^4 - 1 = 16 - 1 = 15 moves.',
        conceptRef: 'Tower of Hanoi Recurrence'
      },
      {
        id: 'q-exp-4',
        difficulty: 'Hard',
        question: 'What is the cause of a "Stack Overflow" error during recursive function execution?',
        options: [
          'The hard disk runs out of storage space',
          'The base condition is never met, causing activation records to consume all available call stack memory',
          'The compiler runs out of registers',
          'The program tries to divide a number by zero'
        ],
        correctAnswer: 1,
        explanation: 'Uncontrolled recursion continuously allocates new stack frames on the thread call stack until the operating system stack memory limit (e.g. 8MB) is exceeded, crashing the process.',
        conceptRef: 'Call Stack Exhaustion'
      }
    ]
  },

  // ==========================================
  // TOPIC 3: QUEUE & ITS APPLICATIONS
  // ==========================================
  'top-403': {
    id: 'top-403',
    title: 'Queue & Its Applications',
    sidebarTitle: 'Queue & Its Applications',
    complexity: 'Easy',
    category: 'Linear Data Structure',
    description:
      'A Queue is a fundamental linear data structure that operates under the First-In, First-Out (FIFO) principle. Elements are inserted exclusively at the REAR and removed exclusively from the FRONT, ensuring items are serviced in their exact order of arrival.',
    unitCode: 'Unit 4: Stack & Queue',
    courseCode: 'CS202 / CLRS Ch. 10.1',
    coreIdea:
      'Like a real-world supermarket checkout line: the first person to join the queue is the first person served (FIFO). The Linear Queue suffers from the "False Overflow" problem where memory before FRONT is wasted. The Circular Queue solves this using modulo arithmetic, wrapping REAR back to 0. Advanced variants include Deques (Double-Ended Queues) and Priority Queues.',
    howItWorks: [
      'Linear Queue uses front and rear indices initialized to -1.',
      'ENQUEUE(x): Increment rear and insert at arr[rear]. If rear == MAX - 1, reports Queue Full (even if front has moved forward).',
      'DEQUEUE(): Retrieve arr[front] and increment front. When front > rear, queue becomes empty (reset to -1).',
      'CIRCULAR QUEUE ENQUEUE(x): rear = (rear + 1) % MAX. Checked full if (rear + 1) % MAX == front.',
      'CIRCULAR QUEUE DEQUEUE(): item = arr[front]; if front == rear reset to -1, else front = (front + 1) % MAX.',
      'All standard queue operations run in strictly constant O(1) time.'
    ],
    pseudocode: `// Circular Queue ADT Specification
ADT CircularQueue:
  DATA:
    arr[MAX] of Type T
    front: Integer = -1
    rear: Integer = -1

  OPERATION Enqueue(item: T):
    IF IsFull() THEN
      ERROR "Queue Overflow"
    END IF
    IF IsEmpty() THEN
      front = 0
      rear = 0
    ELSE
      rear = (rear + 1) MOD MAX
    END IF
    arr[rear] = item

  OPERATION Dequeue() -> T:
    IF IsEmpty() THEN
      ERROR "Queue Underflow"
    END IF
    item = arr[front]
    IF front == rear THEN
      // Queue contained only 1 item; reset to empty
      front = -1
      rear = -1
    ELSE
      front = (front + 1) MOD MAX
    END IF
    RETURN item

  OPERATION Peek() -> T:
    IF IsEmpty() THEN
      ERROR "Queue Underflow"
    END IF
    RETURN arr[front]

  OPERATION IsEmpty() -> Boolean:
    RETURN front == -1

  OPERATION IsFull() -> Boolean:
    RETURN (rear + 1) MOD MAX == front`,
    stepByStepExample: {
      title: 'Circular Queue of Capacity 4: Enqueue(10), Enqueue(20), Dequeue(), Enqueue(30), Enqueue(40), Enqueue(50)',
      initialState: 'Circular Queue is Empty [front = -1, rear = -1, MAX = 4]',
      steps: [
        {
          stepNumber: 1,
          action: 'Enqueue(10)',
          stateDisplay: '[10, _, _, _] (F=0, R=0)',
          highlightedIndices: [0],
          statusText: 'Queue was empty. Set front = 0, rear = 0. Inserted 10 at arr[0].'
        },
        {
          stepNumber: 2,
          action: 'Enqueue(20)',
          stateDisplay: '[10, 20, _, _] (F=0, R=1)',
          highlightedIndices: [1],
          statusText: 'rear = (0 + 1) % 4 = 1. Inserted 20 at arr[1].'
        },
        {
          stepNumber: 3,
          action: 'Dequeue() -> Returns 10',
          stateDisplay: '[_, 20, _, _] (F=1, R=1)',
          highlightedIndices: [1],
          statusText: 'Removed 10 from front. front advances to (0 + 1) % 4 = 1. arr[0] is now vacant!'
        },
        {
          stepNumber: 4,
          action: 'Enqueue(30)',
          stateDisplay: '[_, 20, 30, _] (F=1, R=2)',
          highlightedIndices: [2],
          statusText: 'rear = (1 + 1) % 4 = 2. Inserted 30 at arr[2].'
        },
        {
          stepNumber: 5,
          action: 'Enqueue(40)',
          stateDisplay: '[_, 20, 30, 40] (F=1, R=3)',
          highlightedIndices: [3],
          statusText: 'rear = (2 + 1) % 4 = 3. Inserted 40 at arr[3]. End of linear array reached!'
        },
        {
          stepNumber: 6,
          action: 'Enqueue(50) -> CIRCULAR WRAPAROUND!',
          stateDisplay: '[50, 20, 30, 40] (F=1, R=0)',
          highlightedIndices: [0],
          statusText: 'rear = (3 + 1) % 4 = 0! Wraps around to fill vacant slot arr[0]! Queue is now FULL.'
        }
      ]
    },
    concepts: [
      {
        name: 'The FIFO (First-In, First-Out) Invariant',
        source: 'CLRS Primary Source',
        definition:
          'FIFO guarantees fairness in service ordering: the first element inserted at REAR is guaranteed to be the first element removed at FRONT. Inversion of order is strictly forbidden.',
        example: 'Enqueue(A) -> Enqueue(B) -> Dequeue() returns A, then Dequeue() returns B.',
        usage: 'OS process queues, network packet routing, ticket booking engines.',
        asciiDiagram: `FRONT                         REAR
  |                             |
  v                             v
[ 10 ]  ->  [ 20 ]  ->  [ 30 ]  ->  [ 40 ]
(Dequeue)                       (Enqueue)`
      },
      {
        name: 'The False Overflow Problem & Circular Queue Solution',
        source: 'Verified Academic Curriculum',
        definition:
          'In a standard linear array queue, as items are dequeued, front moves to the right. When rear reaches MAX - 1, the queue cannot accept new items even if slots before front are vacant ("False Overflow"). The Circular Queue treats the array as a ring buffer using modulo arithmetic, wrapping rear back to index 0.',
        example: 'rear = (rear + 1) % MAX; isFull: (rear + 1) % MAX == front;',
        usage: 'Audio stream buffers, keyboard ring buffers, Linux kernel circular pipe buffers.'
      },
      {
        name: 'Double-Ended Queue (Deque) & Priority Queue',
        source: 'CLRS Primary Source',
        definition:
          'A Deque allows insertion and removal at BOTH ends (front and rear). A Priority Queue associates a priority key with every item; items with highest priority are dequeued first regardless of arrival time (commonly implemented using a Binary Heap).',
        example: 'Deque: push_front, pop_front, push_back, pop_back. Priority Queue: Dijkstra algorithm, A* search.',
        usage: 'Sliding window maximum algorithm, task scheduler with priority levels.'
      },
      {
        name: 'Producer-Consumer Synchronization Model',
        source: 'IEEE / ACM Standard',
        definition:
          'A classic concurrent architecture where Producer threads generate data into a bounded circular queue, and Consumer threads remove and process data. The queue acts as an asynchronous decoupling buffer between disparate processing speeds.',
        example: 'Video decoder produces frames -> Queue buffer -> Display hardware consumes frames.',
        usage: 'Message brokers (Kafka, RabbitMQ), OS pipe communication.'
      }
    ],
    comparisonTable: {
      header1: 'Linear Array Queue',
      header2: 'Circular Array Queue (Ring Buffer)',
      rows: [
        {
          aspect: 'False Overflow Risk',
          col1: 'High; rear reaches MAX-1 even if early slots are empty',
          col2: 'Completely eliminated via modulo arithmetic wraparound'
        },
        {
          aspect: 'Memory Reusability',
          col1: 'Poor; dequeued slots are wasted unless shifted left O(n)',
          col2: '100% efficient; continuously recycles freed slots in O(1)'
        },
        {
          aspect: 'Index Advancement',
          col1: 'Linear increment: rear = rear + 1',
          col2: 'Modulo increment: rear = (rear + 1) % MAX'
        },
        {
          aspect: 'Full Condition Test',
          col1: 'rear == MAX - 1',
          col2: '(rear + 1) % MAX == front'
        }
      ]
    },
    operations: [
      {
        id: 'op-enqueue',
        name: 'Circular Enqueue',
        definition: 'Inserts a new element at the rear of the circular queue.',
        explanation:
          'Verifies (rear + 1) % MAX != front. Updates rear = (rear + 1) % MAX and writes value into arr[rear].',
        arrayExample: 'Enqueueing 50 into slot 0 wraps rear from 3 to 0.',
        realWorldExample: 'Incoming network packet arriving at network interface card buffer.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Modulo index calculation.'
        },
        cSnippet: `bool enqueue(CircularQueue *q, int val) {
    if ((q->rear + 1) % MAX == q->front) {
        printf("Queue Overflow!\\n");
        return false;
    }
    if (q->front == -1) q->front = 0;
    q->rear = (q->rear + 1) % MAX;
    q->data[q->rear] = val;
    return true;
}`
      },
      {
        id: 'op-dequeue',
        name: 'Circular Dequeue',
        definition: 'Removes and returns the element at the front of the queue.',
        explanation:
          'Verifies front != -1. Retrieves arr[front]. If front == rear, resets queue to -1; otherwise front = (front + 1) % MAX.',
        arrayExample: 'Dequeuing 10 from index 0 advances front to index 1.',
        realWorldExample: 'CPU scheduler picking next thread from Round Robin ready queue.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Constant time pointer adjustment.'
        },
        cSnippet: `int dequeue(CircularQueue *q, bool *ok) {
    if (q->front == -1) {
        printf("Queue Underflow!\\n");
        if (ok) *ok = false;
        return -1;
    }
    int val = q->data[q->front];
    if (q->front == q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % MAX;
    }
    if (ok) *ok = true;
    return val;
}`
      },
      {
        id: 'op-qpeek',
        name: 'Queue Peek / Front',
        definition: 'Inspects the front element without removing it.',
        explanation:
          'Reads arr[front] without advancing front index.',
        arrayExample: 'Peek on queue [20, 30, 40] returns 20.',
        realWorldExample: 'Printer inspecting document metadata before initiating print pass.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Direct array index access.'
        },
        cSnippet: `int peek(const CircularQueue *q, bool *ok) {
    if (q->front == -1) {
        if (ok) *ok = false;
        return -1;
    }
    if (ok) *ok = true;
    return q->data[q->front];
}`
      }
    ],
    cCode: {
      filename: 'circular_queue.c',
      description: 'ISO C99 Circular Queue implementation using modulo arithmetic with wraparound telemetry.',
      code: `/*
 * DSAForge Educational Series - Chapter 4: Stack & Queue
 * File: circular_queue.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Circular Queue (Ring Buffer) with Full Wraparound Support
 */

#include <stdio.h>
#include <stdbool.h>

#define QUEUE_CAPACITY 5

typedef struct {
    int items[QUEUE_CAPACITY];
    int front;
    int rear;
} CircularQueue;

void init_queue(CircularQueue *q) {
    q->front = -1;
    q->rear = -1;
}

bool is_empty(const CircularQueue *q) {
    return q->front == -1;
}

bool is_full(const CircularQueue *q) {
    return (q->rear + 1) % QUEUE_CAPACITY == q->front;
}

bool enqueue(CircularQueue *q, int value) {
    if (is_full(q)) {
        printf("[QUEUE OVERFLOW]: Cannot enqueue %d. Queue is FULL!\\n", value);
        return false;
    }

    if (is_empty(q)) {
        q->front = 0;
        q->rear = 0;
    } else {
        q->rear = (q->rear + 1) % QUEUE_CAPACITY;
    }

    q->items[q->rear] = value;
    printf("[ENQUEUE SUCCESS]: Inserted %d at index [%d] (front=%d, rear=%d)\\n", 
           value, q->rear, q->front, q->rear);
    return true;
}

int dequeue(CircularQueue *q, bool *ok) {
    if (is_empty(q)) {
        printf("[QUEUE UNDERFLOW]: Cannot dequeue. Queue is EMPTY!\\n");
        if (ok) *ok = false;
        return -1;
    }

    int value = q->items[q->front];
    printf("[DEQUEUE SUCCESS]: Removed %d from index [%d]\\n", value, q->front);

    if (q->front == q->rear) {
        // Last remaining element dequeued -> reset queue
        q->front = -1;
        q->rear = -1;
        printf("  -> Queue has become completely empty. Reset front & rear to -1.\\n");
    } else {
        q->front = (q->front + 1) % QUEUE_CAPACITY;
    }

    if (ok) *ok = true;
    return value;
}

void print_queue(const CircularQueue *q) {
    if (is_empty(q)) {
        printf("Queue State: [ EMPTY ]\\n");
        return;
    }

    printf("Queue State (Capacity = %d): [ ", QUEUE_CAPACITY);
    int i = q->front;
    while (true) {
        printf("%d%s", q->items[i], 
               (i == q->front && i == q->rear) ? " (F & R)" :
               (i == q->front) ? " (FRONT)" :
               (i == q->rear) ? " (REAR)" : "");
        if (i == q->rear) break;
        printf(", ");
        i = (i + 1) % QUEUE_CAPACITY;
    }
    printf(" ]\\n");
}

int main(void) {
    CircularQueue q;
    init_queue(&q);
    bool status;

    printf("===================================================\\n");
    printf("    DSAForge: Circular Queue (Ring Buffer) C99     \\n");
    printf("===================================================\\n\\n");

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    enqueue(&q, 40);
    print_queue(&q);

    printf("\\nDequeuing 2 elements to create front vacancies:\\n");
    dequeue(&q, &status);
    dequeue(&q, &status);
    print_queue(&q);

    printf("\\nEnqueueing elements to demonstrate CIRCULAR WRAPAROUND:\\n");
    enqueue(&q, 50);
    // Notice index wraps around to index 0:
    enqueue(&q, 60);
    print_queue(&q);

    // This will trigger Queue Overflow:
    enqueue(&q, 70);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'CPU Round Robin Process Scheduler',
        category: 'Operating Systems',
        system: 'Linux Kernel CFS / Multitasking Kernels',
        description:
          'Operating systems manage multi-tasking by scheduling processes in a circular queue. Each process receives a fixed time slice (quantum). If the process does not finish within its quantum, it is moved to the rear of the queue.',
        bullets: [
          'Guarantees fair CPU allocation without thread starvation',
          'O(1) context-switch dispatch time between threads',
          'Circular buffer structure eliminates memory reallocation overhead'
        ]
      },
      {
        title: 'Network Socket Packet Buffering & Traffic Shaping',
        category: 'Computer Networks',
        system: 'Linux TCP/IP Ring Buffers (sk_buff)',
        description:
          'Network cards (NICs) receive thousands of Ethernet packets per second. Drivers store incoming packets into circular DMA ring buffers so packets are not dropped during CPU load spikes.',
        bullets: [
          'Buffers high-burst traffic to smooth out latency spikes',
          'Hardware DMA transfers packets directly into ring buffer without CPU interruption',
          'Strict FIFO guarantees in-order packet processing'
        ]
      },
      {
        title: 'Breadth-First Search (BFS) in Graph Traversal',
        category: 'Graph Algorithms & AI',
        system: 'GPS Navigation (Shortest Path) & Web Crawlers',
        description:
          'BFS algorithms explore vertices level-by-level using a FIFO queue. When exploring vertex V, all its unvisited neighbors are enqueued at the rear, ensuring shortest paths on unweighted graphs.',
        bullets: [
          'Guarantees finding the minimum number of edges to destination',
          'Powers Google search web crawlers exploring hyperlinks level-by-level',
          'Standard subroutine in AI state space searching and robotics'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Queue Complexity Matrix',
      summary:
        'Circular and linked queues execute Enqueue, Dequeue, and Peek in strictly O(1) constant time.',
      rows: [
        {
          operation: 'Enqueue(item)',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Direct assignment at rear index or tail node linkage.'
        },
        {
          operation: 'Dequeue()',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Direct retrieval and front pointer advancement.'
        },
        {
          operation: 'Peek() / Front()',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Constant time read of arr[front].'
        },
        {
          operation: 'isEmpty() / isFull()',
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Single equality test of index bounds.'
        },
        {
          operation: 'Auxiliary Memory Space',
          timeComplexity: '—',
          spaceComplexity: 'O(n)',
          notes: 'Linear buffer size proportional to capacity n.'
        }
      ]
    },
    advantages: [
      'Strictly FIFO: guarantees fair, in-order service for requests.',
      'All operations (Enqueue, Dequeue, Peek) run in guaranteed O(1) time.',
      'Circular Queue completely prevents false overflow and reclaims 100% of memory.',
      'Asynchronously decouples producers and consumers operating at different speeds.'
    ],
    disadvantages: [
      'No random access: middle elements cannot be inspected without dequeuing preceding items.',
      'Linear array queues suffer from False Overflow unless circular modulo logic is used.',
      'Fixed circular buffers have hard capacity limits that require rejection or overwriting when full.'
    ],
    whenToUse: [
      'When items must be processed in the exact order of their arrival (FIFO).',
      'For shared resource buffering (printers, CPU scheduling, I/O streams).',
      'For implementing Breadth First Search (BFS) on graphs and trees.',
      'In asynchronous multi-threaded producer-consumer systems.'
    ],
    whenNotToUse: [
      'When elements must be processed in reverse arrival order (use LIFO Stack).',
      'When elements must be accessed by priority rather than arrival time (use Priority Queue / Heap).',
      'When random index access is needed (use Array or Hash Table).'
    ],
    commonMistakes: [
      'Using a linear array without circular modulo logic, causing false overflow when rear hits MAX-1.',
      'Incorrect circular full condition: forgetting the modulo and writing rear + 1 == front.',
      'Failing to reset front and rear to -1 when the last remaining element is dequeued.'
    ],
    interviewQuestions: [
      {
        question: 'Why is a Circular Queue superior to a Linear Queue implemented on a standard array?',
        answer:
          'In a Linear Queue, as elements are dequeued, front moves to the right. When rear reaches MAX - 1, the queue cannot accept new items even if all slots before front are vacant ("False Overflow"). Shifting elements left on every dequeue would cost O(n) time. The Circular Queue solves this in O(1) time using modulo arithmetic: rear = (rear + 1) % MAX, recycling freed memory seamlessly.'
      },
      {
        question: 'What is the condition for a Circular Queue to be FULL and to be EMPTY?',
        answer:
          'Empty Condition: front == -1 (or front == rear in some 1-slot empty designs). Full Condition: (rear + 1) % MAX == front. This means the next position after rear wraps around and collides with front.'
      },
      {
        question: 'What is a Deque and what applications benefit from it?',
        answer:
          'A Deque (Double-Ended Queue) allows insertions and deletions at BOTH the front and the rear in O(1) time. It can function simultaneously as both a Stack and a Queue. Applications include: (1) Sliding Window Maximum problem in O(n) time; (2) Undo-Redo history where old history is pruned from the front; (3) Work-stealing schedulers in concurrent runtimes (e.g., Go runtime / Java ForkJoinPool).'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-que-1',
        difficulty: 'Easy',
        question: 'Which ordering principle governs a Queue data structure?',
        options: ['LIFO (Last-In, First-Out)', 'FIFO (First-In, First-Out)', 'LILO (Last-In, Last-Out)', 'Both FIFO and LILO'],
        correctAnswer: 3,
        explanation: 'Queue is strictly FIFO (First-In, First-Out), which is logically equivalent to LILO (Last-In, Last-Out).',
        conceptRef: 'FIFO Principle'
      },
      {
        id: 'q-que-2',
        difficulty: 'Medium',
        question: 'In a Circular Queue of size MAX = 6, with front = 2 and rear = 5, what will be the value of rear after an enqueue operation?',
        options: ['6', '0', '1', 'Queue is full'],
        correctAnswer: 1,
        explanation: 'rear = (5 + 1) % 6 = 6 % 6 = 0. Since (rear + 1) % 6 = 0 != front (2), the queue has space and rear wraps around to 0.',
        conceptRef: 'Modulo Arithmetic'
      },
      {
        id: 'q-que-3',
        difficulty: 'Medium',
        question: 'Which graph traversal algorithm fundamentally relies on a FIFO Queue?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Dijkstra on a dense matrix', 'Topological Sort with Tarjan'],
        correctAnswer: 1,
        explanation: 'BFS visits vertices level-by-level, requiring a FIFO Queue to ensure all neighbors at depth d are visited before depth d + 1.',
        conceptRef: 'BFS Queue Usage'
      },
      {
        id: 'q-que-4',
        difficulty: 'Hard',
        question: 'In a circular array implementation of capacity N, why is one slot often left unused in the condition (rear + 1) % N == front?',
        options: [
          'To prevent memory alignment segmentation faults',
          'To unambiguously distinguish the FULL condition from the EMPTY condition',
          'To store the null terminator',
          'Due to 1-based indexing in C'
        ],
        correctAnswer: 1,
        explanation: 'If all N slots are filled, rear catches up to front, making front == rear identical to the empty condition. Reserving 1 slot or using an explicit count variable disambiguates Full vs Empty.',
        conceptRef: 'Full vs Empty Disambiguation'
      }
    ]
  }
};
