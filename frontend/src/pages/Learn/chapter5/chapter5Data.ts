// Chapter 5: Linked Lists — Comprehensive Educational Data Store
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
  singlyList: string;
  doublyList: string;
  circularList: string;
  arrayComparison: string;
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

export const chapter5Topics: Record<string, TopicData> = {
  'top-501': {
    id: 'top-501',
    chapterId: 'chap-5',
    title: 'Dynamic Memory & Structures',
    subtitle: 'Heap Memory Allocation (malloc, calloc, realloc, free), Pointer Mechanics, and Self-Referential C Structures',
    overview:
      'Dynamic memory allocation grants programs the ability to request memory from the operating system heap at runtime, overcoming the fixed compile-time constraints of stack-allocated arrays. When paired with C structures and self-referential pointers, dynamic memory serves as the foundational substrate for all pointer-based data structures, including linked lists, trees, and graphs.',
    definition:
      'Dynamic Memory Allocation is the process by which a running program explicitly reserves, resizes, and releases memory from the system heap area during execution using standard library routines (malloc, calloc, realloc, free). A C Structure is a user-defined composite data type that encapsulates heterogeneous variables under a single type name; when it contains a pointer to its own type, it forms a self-referential structure capable of dynamic recursive linking.',
    coreConcept:
      'In C program execution, virtual memory is partitioned into four major segments:\n\n1. Text Segment: Read-only machine code instructions.\n2. Data/BSS Segments: Global and static variables (initialized and uninitialized).\n3. Call Stack: Automatic local variables, function frames, return addresses. Allocation/deallocation is O(1) via the stack pointer register (RSP/ESP), but lifetime is strictly scoped to the enclosing function.\n4. System Heap: Managed pool of dynamic memory controlled by the programmer and OS runtime allocator. Heap allocations persist across function calls until explicitly released via free().\n\nBecause linked list sizes cannot be predicted at compile time and nodes must survive function returns, nodes are allocated individually on the heap.',
    workingPrinciple:
      'The four primary memory management primitives defined in <stdlib.h> operate as follows:\n\n' +
      '• malloc(size_t size):\n' +
      '  Allocates a contiguous block of "size" bytes from the heap. It returns a generic void* pointer to the beginning of the block, or NULL if the system is out of memory. The allocated bytes contain indeterminate (garbage) values. Never assume malloc zeroes memory.\n\n' +
      '• calloc(size_t num, size_t size):\n' +
      '  Allocates memory for an array of "num" elements, each of "size" bytes, and initializes every byte to 0. It also guards against integer overflow in num * size on modern platforms. Slightly slower than malloc due to zero-initialization.\n\n' +
      '• realloc(void *ptr, size_t new_size):\n' +
      '  Modifies the size of a previously allocated heap block. It attempts to expand/shrink in-place; if adjacent heap space is unavailable, it allocates a new block elsewhere, copies the existing payload, frees the old block, and returns the new pointer. Always assign the return value to a temporary pointer to prevent memory leaks if realloc fails.\n\n' +
      '• free(void *ptr):\n' +
      '  Returns the allocated heap memory back to the memory manager. If ptr is NULL, no operation is performed. After freeing, the pointer variable becomes a "dangling pointer" unless explicitly assigned to NULL.\n\n' +
      'Structures & Self-Referential Pointers:\n' +
      'A structure groups heterogeneous data. To form linked structures, a struct must contain a pointer member pointing to an instance of the identical struct type:\n' +
      '  struct Node { int data; struct Node *next; };\n' +
      'Direct member access uses dot notation (node.data), while pointer access uses arrow notation (ptr->data), which is syntactic sugar for (*ptr).data.',
    memoryRepresentation:
      '=========================================================================\n' +
      '                    C PROCESS VIRTUAL MEMORY LAYOUT                      \n' +
      '=========================================================================\n' +
      ' High Memory 0xFFFFFFFF\n' +
      ' ┌────────────────────────────────────────────────────────┐\n' +
      ' │ Call Stack (grows downward ↓)                           │\n' +
      ' │ Local pointers: Node *head = 0x10A0; int x = 42;       │\n' +
      ' ├────────────────────────────────────────────────────────┤\n' +
      ' │                  ↓                                     │\n' +
      ' │             Unallocated Virtual Memory                 │\n' +
      ' │                  ↑                                     │\n' +
      ' ├────────────────────────────────────────────────────────┤\n' +
      ' │ System Heap (grows upward ↑)                           │\n' +
      ' │ [0x10A0]: { data: 10, next: 0x2050 }  <- Node 1 (malloc)│\n' +
      ' │ [0x2050]: { data: 20, next: 0x3090 }  <- Node 2 (malloc)│\n' +
      ' │ [0x3090]: { data: 30, next: NULL }    <- Node 3 (malloc)│\n' +
      ' ├────────────────────────────────────────────────────────┤\n' +
      ' │ BSS Segment (Uninitialized globals: static int g_val;) │\n' +
      ' ├────────────────────────────────────────────────────────┤\n' +
      ' │ Data Segment (Initialized globals: int count = 100;)   │\n' +
      ' ├────────────────────────────────────────────────────────┤\n' +
      ' │ Text Segment (Machine instructions: main(), traverse())│\n' +
      ' └────────────────────────────────────────────────────────┘\n' +
      ' Low Memory  0x00000000\n' +
      '=========================================================================\n' +
      ' Key Distinction: "head" lives on the STACK (holding address 0x10A0),\n' +
      ' but the Node payload { data, next } lives on the HEAP.\n' +
      '=========================================================================',
    invariants: [
      'Heap Memory Invariant: Every successful call to malloc/calloc/realloc must have a corresponding free() invocation before termination to avoid leaks.',
      'Pointer Safety Invariant: Any pointer returned by malloc/calloc must be checked against NULL before dereferencing.',
      'Dangling Pointer Prevention: Once free(ptr) is executed, ptr must immediately be set to NULL.',
      'Self-Referential Size Invariant: A structure cannot contain an instance of itself (infinite recursion), but CAN contain a pointer to itself because pointer size is fixed (4 or 8 bytes).',
      'Arrow Operator Equivalence: ptr->member is strictly equivalent to (*ptr).member.'
    ],
    commonMistakes: [
      'Memory Leak: Losing the only pointer to dynamically allocated memory without calling free(), causing unrecoverable heap exhaustion.',
      'Dangling Pointer Dereference: Accessing or writing to a pointer after calling free(ptr). This invokes Undefined Behavior (UB) and security vulnerabilities (Use-After-Free).',
      'Double Free: Calling free() on the same heap memory address twice, corrupting the heap allocator metadata and causing crashes.',
      'Forgetting to Check NULL: Assuming malloc() always succeeds. On low-memory conditions, dereferencing NULL causes an immediate segmentation fault (SIGSEGV).',
      'Uninitialized Memory Read: Reading from memory returned by malloc() without writing data first. Use calloc() if zeroed memory is required.',
      'Losing realloc Pointer on Failure: Writing "ptr = realloc(ptr, new_size);". If realloc fails, it returns NULL, overwriting ptr and leaking the original block!'
    ],
    advantages: [
      'Variable Runtime Size: Data structures can grow and shrink dynamically based on exact workload needs.',
      'Heap Persistence: Allocated nodes remain valid across function boundaries until explicitly freed.',
      'Memory Efficiency: Only allocate memory for elements currently in use; no need to declare arbitrarily large static arrays.',
      'Heterogeneous Grouping: C structs allow bundling diverse data types together with link pointers.'
    ],
    limitations: [
      'Manual Lifecycle Management: C has no garbage collector; the developer bears full responsibility for avoiding leaks and double frees.',
      'Allocation Latency: Heap allocation requires OS syscalls (brk/sbrk or mmap) and free list searches, which is orders of magnitude slower than stack pointer bumping.',
      'Memory Fragmentation: Frequent allocations and deallocations of non-uniform sizes lead to internal and external heap fragmentation.',
      'Cache Unfriendliness: Nodes scattered across heap memory lack spatial locality, triggering frequent CPU cache misses during traversal.'
    ],
    operations: [
      {
        id: 'op-malloc',
        name: 'Dynamic Allocation with malloc() & NULL Verification',
        syntax: 'Node *newNode = (Node *)malloc(sizeof(Node));',
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(1) (sizeof(Node) bytes on heap)',
        description: 'Requests sizeof(Node) bytes from the heap runtime manager, verifies the returned pointer, and initializes structure members.',
        steps: [
          {
            step: 1,
            description: 'Calculate Node byte footprint',
            codeSnippet: 'size_t bytes = sizeof(struct Node);',
            stateExplanation: 'sizeof(struct Node) evaluates the exact byte footprint on the target architecture (e.g., 4 bytes int + 4 bytes padding + 8 bytes pointer = 16 bytes on 64-bit).'
          },
          {
            step: 2,
            description: 'Request memory block from heap allocator',
            codeSnippet: 'struct Node *node = (struct Node *)malloc(bytes);',
            stateExplanation: 'The OS heap manager finds an available chunk in its free-list bins and returns its starting virtual address.'
          },
          {
            step: 3,
            description: 'Perform mandatory NULL check',
            codeSnippet: 'if (node == NULL) { fprintf(stderr, "Heap exhausted\\n"); exit(EXIT_FAILURE); }',
            stateExplanation: 'Guards against out-of-memory crashes before any dereference occurs.'
          },
          {
            step: 4,
            description: 'Initialize fields via arrow operator',
            codeSnippet: 'node->data = 100;\nnode->next = NULL;',
            stateExplanation: 'Sets the payload and establishes NULL as the initial link pointer.'
          }
        ],
        cCodeSnippet:
          '#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    if (newNode == NULL) {\n        fprintf(stderr, "Error: Memory allocation failed.\\n");\n        return NULL;\n    }\n    newNode->data = value;\n    newNode->next = NULL;\n    return newNode;\n}'
      },
      {
        id: 'op-free',
        name: 'Safe Memory Deallocation & Dangling Pointer Neutralization',
        syntax: 'free(ptr); ptr = NULL;',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Releases a heap-allocated block back to the allocator and immediately neutralizes the pointer to prevent use-after-free bugs.',
        steps: [
          {
            step: 1,
            description: 'Check pointer validity',
            codeSnippet: 'if (ptr != NULL)',
            stateExplanation: 'Standard free(NULL) is a safe no-op in C, but checking or handling custom cleanup is good engineering.'
          },
          {
            step: 2,
            description: 'Invoke free() to return chunk to heap pool',
            codeSnippet: 'free(ptr);',
            stateExplanation: 'Allocator records the chunk as available in its segregation bin/freelist. The memory remains mapped in virtual address space, but content is now invalid.'
          },
          {
            step: 3,
            description: 'Assign NULL to pointer variable',
            codeSnippet: 'ptr = NULL;',
            stateExplanation: 'Neutralizes the dangling pointer. Any subsequent accidental dereference causes an immediate, identifiable crash rather than silent data corruption.'
          }
        ],
        cCodeSnippet:
          'void safeFree(Node **ptrRef) {\n    if (ptrRef != NULL && *ptrRef != NULL) {\n        free(*ptrRef);\n        *ptrRef = NULL;\n    }\n}'
      },
      {
        id: 'op-realloc',
        name: 'Safe Dynamic Array Resizing with realloc()',
        syntax: 'void *temp = realloc(arr, newSize * sizeof(int));',
        timeComplexity: 'O(n) if relocated, O(1) if expanded in-place',
        spaceComplexity: 'O(n) during reallocation copy',
        description: 'Demonstrates resilient reallocation using temporary storage to protect against pointer loss upon allocation failure.',
        steps: [
          {
            step: 1,
            description: 'Allocate new size via temporary pointer',
            codeSnippet: 'int *temp = (int *)realloc(arr, newCapacity * sizeof(int));',
            stateExplanation: 'If realloc fails, it returns NULL without altering the existing memory block.'
          },
          {
            step: 2,
            description: 'Verify temporary pointer',
            codeSnippet: 'if (temp == NULL) { /* handle failure, arr is still valid */ }',
            stateExplanation: 'Preserves the original data and allows graceful fallback or error reporting.'
          },
          {
            step: 3,
            description: 'Adopt new memory address',
            codeSnippet: 'arr = temp;\ncapacity = newCapacity;',
            stateExplanation: 'Updates the primary buffer pointer to the potentially relocated block.'
          }
        ],
        cCodeSnippet:
          'int* expandBuffer(int *arr, size_t *capacity) {\n    size_t newCap = (*capacity) * 2;\n    int *temp = (int *)realloc(arr, newCap * sizeof(int));\n    if (temp == NULL) {\n        fprintf(stderr, "Reallocation failed; buffer untouched.\\n");\n        return arr;\n    }\n    *capacity = newCap;\n    return temp;\n}'
      }
    ],
    cCode: {
      title: 'Dynamic Node Allocation, Initialization, and Safe Deallocation in C99',
      filename: 'dynamic_memory_structs.c',
      code:
`#include <stdio.h>
#include <stdlib.h>

/* 1. Define self-referential structure */
typedef struct Node {
    int data;
    struct Node *next; /* Pointer to structure of identical type */
} Node;

/* 2. Function to allocate and initialize a single node on the heap */
Node* createNode(int value) {
    /* Allocate exact sizeof(Node) bytes on heap */
    Node *newNode = (Node *)malloc(sizeof(Node));
    
    /* Mandatory NULL verification */
    if (newNode == NULL) {
        fprintf(stderr, "FATAL: Heap allocation failed for value %d\\n", value);
        return NULL;
    }
    
    /* Initialize fields using arrow operator */
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

/* 3. Function to safely deallocate a node and nullify the pointer */
void freeNode(Node **nodeRef) {
    if (nodeRef != NULL && *nodeRef != NULL) {
        free(*nodeRef);
        *nodeRef = NULL; /* Neutralize dangling pointer */
    }
}

int main(void) {
    printf("=== Dynamic Memory & Structures in C99 ===\\n\\n");

    /* Create 3 nodes independently on heap */
    Node *first  = createNode(10);
    Node *second = createNode(20);
    Node *third  = createNode(30);

    if (!first || !second || !third) {
        fprintf(stderr, "Initialization aborted due to heap exhaustion.\\n");
        return EXIT_FAILURE;
    }

    /* Link nodes together sequentially */
    first->next  = second;
    second->next = third;
    third->next  = NULL;

    /* Traverse the dynamically linked nodes */
    printf("Traversing dynamically linked nodes:\\n");
    Node *curr = first;
    while (curr != NULL) {
        printf("Node Address: %p | Data: %2d | Next Address: %p\\n",
               (void*)curr, curr->data, (void*)curr->next);
        curr = curr->next;
    }

    /* Clean up all allocated memory to prevent memory leaks */
    printf("\\nFreeing heap memory safely:\\n");
    freeNode(&first);
    freeNode(&second);
    freeNode(&third);

    printf("Cleanup complete. first = %p (dangling pointer neutralized)\\n", (void*)first);
    return EXIT_SUCCESS;
}`,
      explanation: [
        'Line 5-8: Defines struct Node with an integer data payload and a self-referential pointer struct Node *next.',
        'Line 12: malloc(sizeof(Node)) requests contiguous heap bytes. The pointer is cast to (Node*).',
        'Line 15-18: Mandatory guard verifies that the OS returned a valid heap address and not NULL.',
        'Line 21-22: Arrow operator (newNode->data) accesses structure members through the pointer.',
        'Line 27-32: safeFree uses a double pointer (Node**) so it can directly set the caller pointer variable to NULL after free().',
        'Line 46-48: Establishes dynamic links across nodes scattered at distinct heap addresses.',
        'Line 59-61: Sequentially releases each heap chunk to maintain zero memory leak invariant.'
      ],
      simulatedOutput:
`=== Dynamic Memory & Structures in C99 ===

Traversing dynamically linked nodes:
Node Address: 0x18c2010 | Data: 10 | Next Address: 0x18c2030
Node Address: 0x18c2030 | Data: 20 | Next Address: 0x18c2050
Node Address: 0x18c2050 | Data: 30 | Next Address: (nil)

Freeing heap memory safely:
Cleanup complete. first = (nil) (dangling pointer neutralized)`
    },
    realWorldUses: [
      {
        title: 'Linux Kernel Memory Subsystem (SLUB Allocator)',
        domain: 'Operating System Engineering',
        problem: 'Kernel subsystems require millions of small, heterogeneous objects (e.g., struct task_struct, struct inode) allocated and deallocated at extreme speeds without incurring massive external fragmentation.',
        solution: 'The Linux kernel SLUB allocator creates dedicated memory caches of homogeneous struct sizes carved out of kernel pages, tracking free blocks via linked lists of metadata pointers embedded directly into the free chunks.',
        typeUsed: 'Self-referential C structures with intrusive list pointers (struct list_head)',
        complexity: 'O(1) allocation and deallocation from per-CPU slabs',
        realWorldContext: 'Every process running on Linux is represented by a dynamically allocated task_struct on the kernel heap.'
      },
      {
        title: 'Redis In-Memory Key-Value Store (Zmalloc Wrapper)',
        domain: 'High-Performance Distributed Databases',
        problem: 'Standard glibc malloc does not report exact allocated byte sizes back to application metrics, making strict memory quota enforcement and cache eviction impossible.',
        solution: 'Redis implements zmalloc, a custom wrapper around malloc() that prepends a size_t header to every allocation to record the exact byte footprint in an atomic memory counter before returning the payload pointer.',
        typeUsed: 'Dynamic memory wrappers with metadata prefixes',
        complexity: 'O(1) allocation overhead with real-time memory telemetry',
        realWorldContext: 'Powers Redis maxmemory eviction policies (volatile-lru, allkeys-lru) under multi-gigabyte production workloads.'
      },
      {
        title: 'SQLite Embedded Database Engine (MemSys5 Allocator)',
        domain: 'Embedded Systems & Aviation Flight Software',
        problem: 'In mission-critical embedded avionics (DO-178B/C standards), standard heap malloc() is strictly prohibited because unconstrained fragmentation can cause non-deterministic allocation failure.',
        solution: 'SQLite provides MemSys5, a deterministic first-fit power-of-two pool allocator that carves dynamic structures out of a single pre-allocated static byte array buffer provided at system boot.',
        typeUsed: 'Static buffer dynamic slab carving with structure link nodes',
        complexity: 'Deterministic O(log N) allocation with zero heap fragmentation',
        realWorldContext: 'Used in Airbus and Boeing flight deck navigation databases and smartphone operating system storage layers.'
      }
    ],
    complexity: [
      {
        operation: 'malloc() Allocation',
        singlyList: 'O(1) amortized',
        doublyList: 'O(1) amortized',
        circularList: 'O(1) amortized',
        arrayComparison: 'O(1) stack bump / O(n) realloc',
        explanation: 'Heap managers use segregated free-list bins to find matching chunks in constant amortized time.'
      },
      {
        operation: 'calloc() Allocation',
        singlyList: 'O(k) where k=bytes',
        doublyList: 'O(k) where k=bytes',
        circularList: 'O(k) where k=bytes',
        arrayComparison: 'O(k) for calloc',
        explanation: 'Must perform a linear memset zero-fill across all allocated bytes, proportional to allocation size.'
      },
      {
        operation: 'free() Deallocation',
        singlyList: 'O(1)',
        doublyList: 'O(1)',
        circularList: 'O(1)',
        arrayComparison: 'O(1) stack return',
        explanation: 'Inserts the freed chunk back into the allocator free-list bin and coalesces with adjacent buddy chunks.'
      },
      {
        operation: 'Structure Member Access (ptr->data)',
        singlyList: 'O(1)',
        doublyList: 'O(1)',
        circularList: 'O(1)',
        arrayComparison: 'O(1) array[i]',
        explanation: 'Direct CPU pointer dereference plus fixed compile-time struct byte offset calculation.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-501-1',
        question: 'What is the primary technical difference between malloc() and calloc() in standard C?',
        options: [
          'malloc() allocates from heap while calloc() allocates from stack',
          'calloc() initializes all allocated bytes to zero; malloc() leaves memory uninitialized (garbage values)',
          'malloc() returns void* whereas calloc() returns char*',
          'calloc() cannot allocate memory for structures'
        ],
        correctAnswer: 1,
        explanation: 'calloc(num, size) zeroes out all requested bytes and guards against integer multiplication overflow, whereas malloc(size) leaves the allocated heap memory uninitialized.'
      },
      {
        id: 'q-501-2',
        question: 'What is a "dangling pointer" in C programming?',
        options: [
          'A pointer that has been explicitly assigned NULL',
          'A pointer holding the memory address of an active global variable',
          'A pointer that still references a memory location after that memory has been freed',
          'A pointer that points to another pointer'
        ],
        correctAnswer: 2,
        explanation: 'A dangling pointer continues to point to the address of a heap block that has already been deallocated via free(). Dereferencing it invokes Undefined Behavior (Use-After-Free).'
      },
      {
        id: 'q-501-3',
        question: 'Why must a self-referential linked list node contain a pointer member (struct Node *next) rather than an actual instance (struct Node next)?',
        options: [
          'Because C does not allow structures with more than one member',
          'Because an instance inside itself creates an infinite recursive size requirement, preventing the compiler from determining structure byte size',
          'Because pointers are faster to execute than integer data',
          'Because stack memory is strictly forbidden from holding structs'
        ],
        correctAnswer: 1,
        explanation: 'If a struct contained a direct instance of itself, its size would be sizeof(int) + sizeof(struct Node), leading to infinite recursive size. A pointer has a fixed, known size (4 or 8 bytes), allowing clean compile-time size determination.'
      },
      {
        id: 'q-501-4',
        question: 'Consider the code: "ptr = realloc(ptr, new_size);". Why is this pattern dangerous if memory reallocation fails?',
        options: [
          'It causes a compilation error in C99',
          'If realloc() fails, it returns NULL, which overwrites ptr and permanently leaks the original block of memory',
          'It causes realloc() to zero out the existing memory',
          'It frees the stack pointer register'
        ],
        correctAnswer: 1,
        explanation: 'When realloc() fails to allocate new memory, it returns NULL but leaves the original heap block intact. Assigning directly to ptr overwrites the only reference to the original block, causing an unrecoverable memory leak. Always use a temporary pointer variable.'
      }
    ]
  },

  'top-502': {
    id: 'top-502',
    chapterId: 'chap-5',
    title: 'Linked List Fundamentals',
    subtitle: 'Node Architecture, HEAD Pointer, Dynamic Chaining, Linear Traversal, and Insertion/Deletion Mechanics',
    overview:
      'A Singly Linked List is the quintessential linear dynamic data structure. Unlike static contiguous arrays that require predetermined memory bounds and costly shifting operations, a linked list consists of dynamically allocated nodes chained via forward pointers. This enables constant-time insertion and deletion at known positions and seamless growth without capacity constraints.',
    definition:
      'A Linked List is a linear collection of data elements called nodes, whose linear order is not governed by their physical placement in memory. Instead, each node consists of a data payload and one or more pointer links pointing to adjacent nodes. The list is accessed via an external entry pointer named HEAD, and terminates with a NULL pointer signifying the end of the chain.',
    coreConcept:
      'Why Linked Lists are Needed — Solving Array Bottlenecks:\n\n' +
      '1. Dynamic Sizing:\n' +
      '   Arrays have a fixed size allocated upfront. If the bound is exceeded, a costly resize (allocate double capacity, copy all n elements, free old buffer) is mandatory. Linked lists allocate exactly one node per element on demand and deallocate when removed.\n\n' +
      '2. Inexpensive Insertion & Deletion:\n' +
      '   Inserting or deleting an element at index 0 of an array requires shifting all n existing elements right or left, incurring O(n) worst-case time. In a linked list, inserting at the HEAD requires only updating two pointer addresses in O(1) time with zero element shifting!\n\n' +
      '3. Non-Contiguous Memory Utilization:\n' +
      '   Large arrays require a massive single contiguous block of virtual memory. If physical RAM is fragmented, allocating a 1GB array may fail even if 2GB of total RAM is free. Linked list nodes can be scattered across non-contiguous heap fragments.\n\n' +
      'Trade-offs to Recognize:\n' +
      '• No O(1) Random Access: Finding the k-th element requires sequential traversal from HEAD (O(k) time).\n' +
      '• Memory Overhead: Every node must store an extra pointer field (4 or 8 bytes per node).\n' +
      '• Cache Penalties: Pointer chasing across non-contiguous heap addresses produces frequent CPU cache line misses.',
    workingPrinciple:
      'Mechanics of Fundamental Operations:\n\n' +
      '1. The HEAD Pointer:\n' +
      '   HEAD is an external pointer variable residing on the stack or in global memory. It holds the memory address of the first node. If the list is empty, HEAD == NULL.\n\n' +
      '2. Traversal:\n' +
      '   Start a temporary pointer "curr = head". In a loop, process "curr->data", then advance "curr = curr->next" until "curr == NULL". The loop terminates strictly when the terminal NULL pointer is encountered.\n\n' +
      '3. Insertion at Beginning (Prepend):\n' +
      '   Allocate newNode -> Set newNode->data -> Point newNode->next to current head -> Update head = newNode. Time: O(1).\n\n' +
      '4. Insertion at End (Append):\n' +
      '   If list is empty, set head = newNode. Otherwise, traverse to the last node (where curr->next == NULL), and rewire curr->next = newNode. Time: O(n) without tail pointer, O(1) with tail pointer.\n\n' +
      '5. Insertion After a Given Node:\n' +
      '   Connect newNode->next = prevNode->next -> Rewire prevNode->next = newNode. Order is critical: reversing these two steps severs and permanently loses the rest of the list!\n\n' +
      '6. Deletion from Beginning:\n' +
      '   Save temp = head -> Advance head = head->next -> Invoke free(temp). Time: O(1).\n\n' +
      '7. Deletion by Key:\n' +
      '   Find target node while tracking previous node "prev". Rewire prev->next = curr->next -> Invoke free(curr). Special case: if target is head, handle as deletion from beginning.',
    memoryRepresentation:
      '=========================================================================\n' +
      '               SINGLY LINKED LIST MEMORY ARCHITECTURE                    \n' +
      '=========================================================================\n' +
      ' Stack Frame:                  Heap Memory (Non-Contiguous Addresses):\n' +
      ' ┌──────────────┐              ┌───────────────┬────────────────┐\n' +
      ' │ HEAD: 0x10A0 │─────────────>│ Data: 12      │ Next: 0x2050   │ Node 1 (Head)\n' +
      ' └──────────────┘              ├───────────────┼────────────────┤\n' +
      '                               │ Address: 0x10A0                │\n' +
      '                               └───────┬────────────────────────┘\n' +
      '                                       │\n' +
      '                                       ▼\n' +
      '                               ┌───────────────┬────────────────┐\n' +
      '                               │ Data: 99      │ Next: 0x3090   │ Node 2\n' +
      '                               ├───────────────┼────────────────┤\n' +
      '                               │ Address: 0x2050                │\n' +
      '                               └───────┬────────────────────────┘\n' +
      '                                       │\n' +
      '                                       ▼\n' +
      '                               ┌───────────────┬────────────────┐\n' +
      '                               │ Data: 37      │ Next: NULL     │ Node 3 (Tail)\n' +
      '                               ├───────────────┼────────────────┤\n' +
      '                               │ Address: 0x3090                │\n' +
      '                               └────────────────────────────────┘\n' +
      '=========================================================================\n' +
      ' Pointer Chain Invariant: HEAD points to first node; last node next is NULL.\n' +
      ' Insertion at Head rewires: newNode->next = HEAD; HEAD = newNode; [O(1)]\n' +
      '=========================================================================',
    invariants: [
      'Empty List Invariant: When the list contains 0 nodes, HEAD must evaluate to NULL.',
      'Terminal Invariant: The next pointer of the final (tail) node in a singly linked list must always equal NULL.',
      'Single Predecessor Invariant: In an acyclic singly linked list, every node except HEAD has exactly one predecessor pointing to it.',
      'Order of Assignment Invariant during Insertion: When inserting node N after P: N->next must be set to P->next BEFORE P->next is overwritten to point to N.',
      'Non-Destructive Traversal: Standard read traversal must never modify the HEAD pointer itself; always use an auxiliary "curr" pointer.'
    ],
    commonMistakes: [
      'Severing the Chain: Writing "prev->next = newNode" before "newNode->next = prev->next", which permanently orphans and leaks the entire remainder of the list.',
      'Losing HEAD during Traversal: Writing "while (head != NULL) { head = head->next; }" instead of using an auxiliary pointer "Node *curr = head;". This destroys the entry point to the list!',
      'Dereferencing NULL on Empty List: Failing to check if "head == NULL" before accessing "head->data" or "head->next", producing immediate SIGSEGV crashes.',
      'Memory Leak on Deletion: Updating pointers to bypass a deleted node without calling free(targetNode).',
      'Use-After-Free during Deletion: Writing "head = head->next; free(temp);" when temp was already freed earlier, or accessing "curr->next" after freeing curr.'
    ],
    advantages: [
      'Constant-Time Head Insertion/Deletion: O(1) operations with zero element shifting.',
      'Dynamic Sizing: Grows and shrinks smoothly with workload; zero preallocated buffer waste.',
      'Non-Contiguous Allocation: Can utilize scattered fragments of free heap memory.',
      'Simplifies Complex Linear ADTs: Serves as the natural backbone for variable-size stacks, queues, and graph adjacency lists.'
    ],
    limitations: [
      'Sequential Access Only: No O(1) indexing; accessing element k requires O(k) steps.',
      'Pointer Overhead: Consumes 4 to 8 bytes per node solely for link metadata.',
      'Unidirectional Traversal: In singly linked lists, moving backward requires O(n) traversal from head.',
      'Poor Cache Locality: Nodes at disparate memory addresses cause high cache miss rates during linear iterations.'
    ],
    operations: [
      {
        id: 'op-insert-head',
        name: 'Insert at Beginning (Prepend)',
        syntax: 'insertAtBeginning(&head, value);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Creates a new node and places it at the very front of the list, making it the new HEAD in constant time.',
        steps: [
          {
            step: 1,
            description: 'Allocate and initialize new node',
            codeSnippet: 'Node *newNode = (Node *)malloc(sizeof(Node));\nnewNode->data = val;',
            stateExplanation: 'Reserves heap memory for the new node and populates its payload.'
          },
          {
            step: 2,
            description: 'Link new node to current head',
            codeSnippet: 'newNode->next = *headRef;',
            stateExplanation: 'The new node points to whatever node head currently references (or NULL if list was empty).'
          },
          {
            step: 3,
            description: 'Update HEAD to new node',
            codeSnippet: '*headRef = newNode;',
            stateExplanation: 'External HEAD reference now points to the new node, completing the O(1) insertion.'
          }
        ],
        cCodeSnippet:
          'void insertAtBeginning(Node **headRef, int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    if (!newNode) return;\n    newNode->data = value;\n    newNode->next = *headRef;\n    *headRef = newNode;\n}'
      },
      {
        id: 'op-insert-end',
        name: 'Insert at End (Append)',
        syntax: 'insertAtEnd(&head, value);',
        timeComplexity: 'O(n) without tail pointer / O(1) with tail',
        spaceComplexity: 'O(1)',
        description: 'Appends a new node at the terminal position of the list, setting its next pointer to NULL.',
        steps: [
          {
            step: 1,
            description: 'Allocate new node',
            codeSnippet: 'Node *newNode = (Node *)malloc(sizeof(Node));\nnewNode->data = val; newNode->next = NULL;',
            stateExplanation: 'Creates node with next initialized to NULL since it will become the final node.'
          },
          {
            step: 2,
            description: 'Check if list is empty',
            codeSnippet: 'if (*headRef == NULL) { *headRef = newNode; return; }',
            stateExplanation: 'If list is empty, the new node directly becomes HEAD.'
          },
          {
            step: 3,
            description: 'Traverse to last node',
            codeSnippet: 'Node *curr = *headRef;\nwhile (curr->next != NULL) curr = curr->next;',
            stateExplanation: 'Stops precisely at the node whose next pointer is NULL.'
          },
          {
            step: 4,
            description: 'Link last node to new node',
            codeSnippet: 'curr->next = newNode;',
            stateExplanation: 'Previous tail now points to the new node.'
          }
        ],
        cCodeSnippet:
          'void insertAtEnd(Node **headRef, int value) {\n    Node *newNode = (Node *)malloc(sizeof(Node));\n    if (!newNode) return;\n    newNode->data = value;\n    newNode->next = NULL;\n    if (*headRef == NULL) { *headRef = newNode; return; }\n    Node *curr = *headRef;\n    while (curr->next != NULL) curr = curr->next;\n    curr->next = newNode;\n}'
      },
      {
        id: 'op-delete-val',
        name: 'Delete Node by Value (Key Deletion)',
        syntax: 'deleteByValue(&head, key);',
        timeComplexity: 'O(n) worst/average, O(1) if head matches',
        spaceComplexity: 'O(1)',
        description: 'Searches for the first occurrence of key, bridges the predecessor to the successor, and frees target node heap memory.',
        steps: [
          {
            step: 1,
            description: 'Verify list non-empty',
            codeSnippet: 'if (*headRef == NULL) return;',
            stateExplanation: 'Safety check against empty list dereference.'
          },
          {
            step: 2,
            description: 'Handle head node deletion special case',
            codeSnippet: 'if ((*headRef)->data == key) {\n    Node *temp = *headRef;\n    *headRef = (*headRef)->next;\n    free(temp);\n    return;\n}',
            stateExplanation: 'If target is at the head, advance head and release old head in O(1).'
          },
          {
            step: 3,
            description: 'Traverse tracking predecessor and current',
            codeSnippet: 'Node *prev = *headRef, *curr = (*headRef)->next;\nwhile (curr != NULL && curr->data != key) {\n    prev = curr; curr = curr->next;\n}',
            stateExplanation: 'Maintains prev pointer one step behind curr until match or end is reached.'
          },
          {
            step: 4,
            description: 'Unlink and free node',
            codeSnippet: 'if (curr != NULL) {\n    prev->next = curr->next;\n    free(curr);\n}',
            stateExplanation: 'Bypasses curr node and frees its allocated heap memory.'
          }
        ],
        cCodeSnippet:
          'void deleteByValue(Node **headRef, int key) {\n    if (!headRef || !*headRef) return;\n    Node *temp = *headRef;\n    if (temp->data == key) {\n        *headRef = temp->next;\n        free(temp);\n        return;\n    }\n    Node *prev = NULL;\n    while (temp != NULL && temp->data != key) {\n        prev = temp;\n        temp = temp->next;\n    }\n    if (temp == NULL) return; /* Key not found */\n    prev->next = temp->next;\n    free(temp);\n}'
      }
    ],
    cCode: {
      title: 'Complete Singly Linked List Implementation in C99',
      filename: 'singly_linked_list.c',
      code:
`#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* Node structure definition */
typedef struct Node {
    int data;
    struct Node *next;
} Node;

/* 1. Create a dynamic node */
Node* createNode(int value) {
    Node *newNode = (Node *)malloc(sizeof(Node));
    if (newNode == NULL) {
        fprintf(stderr, "Heap allocation failed!\\n");
        return NULL;
    }
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

/* 2. Insert at beginning - O(1) */
void insertBeginning(Node **head, int value) {
    Node *newNode = createNode(value);
    if (!newNode) return;
    newNode->next = *head;
    *head = newNode;
}

/* 3. Insert at end - O(n) */
void insertEnd(Node **head, int value) {
    Node *newNode = createNode(value);
    if (!newNode) return;
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    Node *curr = *head;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    curr->next = newNode;
}

/* 4. Delete first occurrence of key - O(n) */
bool deleteKey(Node **head, int key) {
    if (*head == NULL) return false;

    Node *temp = *head;
    /* Case A: Head contains key */
    if (temp->data == key) {
        *head = temp->next;
        free(temp);
        return true;
    }

    /* Case B: Search for key maintaining predecessor */
    Node *prev = NULL;
    while (temp != NULL && temp->data != key) {
        prev = temp;
        temp = temp->next;
    }

    if (temp == NULL) return false; /* Not found */

    prev->next = temp->next;
    free(temp);
    return true;
}

/* 5. Linear Search - O(n) */
bool search(Node *head, int key) {
    Node *curr = head;
    while (curr != NULL) {
        if (curr->data == key) return true;
        curr = curr->next;
    }
    return false;
}

/* 6. Traverse and display list - O(n) */
void display(Node *head) {
    Node *curr = head;
    printf("HEAD -> ");
    while (curr != NULL) {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

/* 7. Clean up all nodes - O(n) */
void freeList(Node **head) {
    Node *curr = *head;
    while (curr != NULL) {
        Node *next = curr->next;
        free(curr);
        curr = next;
    }
    *head = NULL;
}

int main(void) {
    Node *head = NULL;

    printf("=== Singly Linked List Demonstration ===\\n\\n");

    /* Insert elements */
    insertEnd(&head, 10);
    insertEnd(&head, 20);
    insertBeginning(&head, 5);
    insertEnd(&head, 30);
    display(head); /* Expected: HEAD -> [5] -> [10] -> [20] -> [30] -> NULL */

    /* Search */
    int query = 20;
    printf("Search for %d: %s\\n", query, search(head, query) ? "FOUND" : "NOT FOUND");

    /* Delete key */
    printf("Deleting key 10...\\n");
    deleteKey(&head, 10);
    display(head); /* Expected: HEAD -> [5] -> [20] -> [30] -> NULL */

    /* Delete head */
    printf("Deleting key 5 (head)...\\n");
    deleteKey(&head, 5);
    display(head); /* Expected: HEAD -> [20] -> [30] -> NULL */

    /* Free all memory */
    freeList(&head);
    printf("List cleared. head = %p\\n", (void*)head);

    return 0;
}`,
      explanation: [
        'Line 6-9: Standard Singly Linked List Node definition with payload and next pointer.',
        'Line 23-29: insertBeginning updates pointers in O(1) time without traversing the chain.',
        'Line 32-46: insertEnd traverses to the tail (where curr->next == NULL) in O(n) time.',
        'Line 49-74: deleteKey cleanly segregates head-deletion vs internal node deletion, preventing pointer corruption.',
        'Line 86-94: display uses an auxiliary pointer (Node *curr) to prevent mutating the caller head reference.',
        'Line 97-105: freeList stores next = curr->next before calling free(curr), avoiding use-after-free bugs.'
      ],
      simulatedOutput:
`=== Singly Linked List Demonstration ===

HEAD -> [5] -> [10] -> [20] -> [30] -> NULL
Search for 20: FOUND
Deleting key 10...
HEAD -> [5] -> [20] -> [30] -> NULL
Deleting key 5 (head)...
HEAD -> [20] -> [30] -> NULL
List cleared. head = (nil)`
    },
    realWorldUses: [
      {
        title: 'Filesystem Free Cluster Allocation Chaining (FAT32)',
        domain: 'Operating System File Systems',
        problem: 'Files stored on disk are rarely written into contiguous physical disk sectors. Fragmented storage requires tracking where the next chunk of a file resides without preallocating rigid contiguous disk space.',
        solution: 'The File Allocation Table (FAT32) architecture uses an on-disk singly linked list where each cluster entry points directly to the sector index of the succeeding cluster, with an EOF (End-Of-File) marker acting as NULL.',
        typeUsed: 'Singly linked sector index chain',
        complexity: 'O(1) cluster extension, O(k) sequential read of cluster k',
        realWorldContext: 'Standard format used globally across USB flash drives, SD cards, and embedded firmware partitions.'
      },
      {
        title: 'Git Version Control Commit DAG Lineage',
        domain: 'Distributed Version Control Systems',
        problem: 'In version control, each commit must preserve an immutable cryptographic reference to its ancestor commit(s) to guarantee tamper-proof commit histories across branch merges.',
        solution: 'Git represents project commit histories as an immutable singly linked chain (specifically a Directed Acyclic Graph), where each commit object stores the SHA-1/SHA-256 hash of its parent commit.',
        typeUsed: 'Cryptographic singly linked node graph',
        complexity: 'O(1) commit creation, O(d) history traversal',
        realWorldContext: 'Underpins git log, git checkout, and commit ancestor verification across all Git repositories.'
      },
      {
        title: 'Music Player Play Queue & Streaming Playlists',
        domain: 'Audio & Multimedia Engineering',
        problem: 'Streaming audio players require dynamic rearrangement, insertion of user-queued songs, and smooth advancement without re-copying large audio metadata arrays.',
        solution: 'Audio playback queues store song track handles in dynamic linked list nodes, allowing instant constant-time reordering and track prepending.',
        typeUsed: 'Singly and circular linked track queues',
        complexity: 'O(1) track skip, O(1) next-track queuing',
        realWorldContext: 'Employed in background audio daemons on mobile and desktop media engines.'
      }
    ],
    complexity: [
      {
        operation: 'Access / Indexing (arr[i] vs get(i))',
        singlyList: 'O(n) [must traverse]',
        doublyList: 'O(n)',
        circularList: 'O(n)',
        arrayComparison: 'O(1) [direct index calculation]',
        explanation: 'Arrays compute memory offset in O(1) time: base + i * size. Linked lists must chase pointers sequentially.'
      },
      {
        operation: 'Search for Element (unsorted)',
        singlyList: 'O(n)',
        doublyList: 'O(n)',
        circularList: 'O(n)',
        arrayComparison: 'O(n)',
        explanation: 'Both structures require linear examination of elements until target key is found.'
      },
      {
        operation: 'Insert at Beginning (Prepend)',
        singlyList: 'O(1)',
        doublyList: 'O(1)',
        circularList: 'O(1) [with tail]',
        arrayComparison: 'O(n) [requires shifting all]',
        explanation: 'Linked list re-links HEAD in O(1). Array must shift every existing element rightward.'
      },
      {
        operation: 'Insert at End (Append)',
        singlyList: 'O(n) [O(1) with tail]',
        doublyList: 'O(1) [with tail]',
        circularList: 'O(1) [with tail]',
        arrayComparison: 'O(1) amortized',
        explanation: 'With a maintained tail pointer, inserting at the end requires only linking tail->next = newNode.'
      },
      {
        operation: 'Delete from Beginning',
        singlyList: 'O(1)',
        doublyList: 'O(1)',
        circularList: 'O(1)',
        arrayComparison: 'O(n) [requires left shift]',
        explanation: 'Advancing HEAD and freeing old node is strictly constant time in linked lists.'
      },
      {
        operation: 'Delete from End',
        singlyList: 'O(n) [must find n-1th]',
        doublyList: 'O(1) [with tail & prev]',
        circularList: 'O(n) [O(1) if CDLL]',
        arrayComparison: 'O(1)',
        explanation: 'Singly linked list must traverse from head to find the second-to-last node to update its next pointer to NULL.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-502-1',
        question: 'What is the time complexity to insert a new node at the very beginning of a Singly Linked List with n elements?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correctAnswer: 0,
        explanation: 'Inserting at the beginning requires only allocating the node, setting newNode->next = head, and updating head = newNode. No elements are shifted, making it strictly O(1).'
      },
      {
        id: 'q-502-2',
        question: 'Why does deleting the last node of a Singly Linked List take O(n) time even if a tail pointer is maintained?',
        options: [
          'Because the memory of the tail cannot be freed directly',
          'Because to update the tail pointer, one must find the second-to-last node, which requires traversing from HEAD in a unidirectional singly linked list',
          'Because free() takes linear time for tail nodes',
          'Because singly linked lists cannot have tail pointers'
        ],
        correctAnswer: 1,
        explanation: 'In a singly linked list, pointers only point forward. While the tail node can be accessed in O(1), the second-to-last node (which must become the new tail with next = NULL) cannot be reached without traversing from HEAD, taking O(n) time.'
      },
      {
        id: 'q-502-3',
        question: 'What happens if a developer executes "head = head->next;" to traverse a linked list in C without saving the initial head in an auxiliary pointer?',
        options: [
          'The compiler throws a syntax error',
          'The list is reversed',
          'The entry point to the earlier nodes is permanently lost, causing a massive memory leak of all skipped nodes',
          'The nodes are automatically freed by C runtime'
        ],
        correctAnswer: 2,
        explanation: 'HEAD is the sole external anchor for the list. Overwriting HEAD during traversal permanently destroys references to preceding nodes, causing unrecoverable memory leaks.'
      },
      {
        id: 'q-502-4',
        question: 'Which of the following is an advantage of an Array over a Singly Linked List?',
        options: [
          'Arrays can grow dynamically without reallocation',
          'Arrays provide O(1) random access via index arithmetic and superior CPU cache locality',
          'Arrays take O(1) time to insert at index 0',
          'Arrays consume less memory when storing sparse, non-uniform data'
        ],
        correctAnswer: 1,
        explanation: 'Arrays reside in contiguous memory, allowing instantaneous O(1) address calculation (base + i * size) and taking full advantage of CPU hardware prefetchers and cache lines.'
      }
    ]
  },

  'top-503': {
    id: 'top-503',
    chapterId: 'chap-5',
    title: 'Types of Linked Lists',
    subtitle: 'Singly Linked List, Doubly Linked List (Bidirectional Pointers), and Circular Linked List (Ring Structures)',
    overview:
      'Different computational workloads require specialized linking topologies. While Singly Linked Lists minimize pointer memory overhead, Doubly Linked Lists introduce bidirectional traversal and constant-time node deletion, and Circular Linked Lists eliminate NULL boundaries to model continuous ring buffers and round-robin scheduling.',
    definition:
      'The three primary variations of linked lists are: 1) Singly Linked List (SLL), where nodes contain a single forward link (next); 2) Doubly Linked List (DLL), where nodes maintain dual forward (next) and backward (prev) links; and 3) Circular Linked List (CLL), where the terminal node links back to the initial node, forming an unbroken closed ring without NULL pointers.',
    coreConcept:
      'Architectural Comparison of the Three Types:\n\n' +
      '1. Singly Linked List (SLL):\n' +
      '   • Structure: { data, next }\n' +
      '   • Traversal: Forward only (head to NULL).\n' +
      '   • Overhead: 1 pointer per node (8 bytes on 64-bit).\n' +
      '   • Deletion: Requires predecessor pointer. Deleting a given node target takes O(n) to locate predecessor.\n\n' +
      '2. Doubly Linked List (DLL):\n' +
      '   • Structure: { data, prev, next }\n' +
      '   • Traversal: Bidirectional (head to tail, and tail to head).\n' +
      '   • Overhead: 2 pointers per node (16 bytes on 64-bit).\n' +
      '   • Deletion: Strictly O(1) if target node pointer is provided! Why? target->prev->next = target->next; target->next->prev = target->prev; free(target);\n\n' +
      '3. Circular Linked List (CLL):\n' +
      '   • Structure: Singly or doubly linked, but last->next == head (and head->prev == last in CDLL).\n' +
      '   • Traversal: Continuous loop. Loop condition changes from "curr != NULL" to "curr->next != head" or "do { ... } while (curr != head);".\n' +
      '   • Best Practice: Maintain a TAIL pointer instead of HEAD! Why? Because tail->next is HEAD! This gives immediate O(1) access to BOTH the first element and last element using just ONE pointer variable!',
    workingPrinciple:
      'Detailed Mechanics by Type:\n\n' +
      '• Doubly Linked List Pointer Updates:\n' +
      '  Inserting node N between node A and B requires updating 4 pointers:\n' +
      '    1. N->next = B;\n' +
      '    2. N->prev = A;\n' +
      '    3. A->next = N;\n' +
      '    4. B->prev = N;\n' +
      '  Boundary checking is essential: if A is NULL, N becomes HEAD. If B is NULL, N becomes TAIL.\n\n' +
      '• Circular Linked List Traversal & Insertion:\n' +
      '  Because there is no NULL pointer, traversal without a termination condition produces an infinite loop.\n' +
      '  When inserting at the beginning using a TAIL pointer:\n' +
      '    newNode->next = tail->next;\n' +
      '    tail->next = newNode;\n' +
      '  If inserting at the end, execute the exact same two lines, then update:\n' +
      '    tail = newNode;\n' +
      '  This elegant property makes circular lists with tail pointers extraordinarily concise.',
    memoryRepresentation:
      '=========================================================================\n' +
      '                  LINKED LIST TOPOLOGY COMPARISON                        \n' +
      '=========================================================================\n' +
      ' 1. SINGLY LINKED LIST (Unidirectional):\n' +
      '    HEAD ───> [ 10 | • ] ───> [ 20 | • ] ───> [ 30 | NULL ]\n\n' +
      ' 2. DOUBLY LINKED LIST (Bidirectional):\n' +
      '            ┌───────────────┐       ┌───────────────┐\n' +
      '            │               ▼       │               ▼\n' +
      '    HEAD ──>│ NULL ◄── [ 10 ] ──► [ 20 ] ◄── [ 30 ] ──► NULL\n' +
      '            │                                   ▲\n' +
      '            └───────────────────────────────────┼── TAIL\n\n' +
      ' 3. CIRCULAR SINGLY LINKED LIST (Ring Structure, No NULL):\n' +
      '    ┌────────────────────────────────────────────────────────┐\n' +
      '    │                                                        │\n' +
      '    ▼                                                        │\n' +
      '  [ 10 | • ] ───> [ 20 | • ] ───> [ 30 | • ] ────────────────┘\n' +
      '    ▲                               ▲\n' +
      '    HEAD                            TAIL (tail->next is HEAD!)\n' +
      '=========================================================================',
    invariants: [
      'DLL Symmetry Invariant: For any non-boundary node N in a Doubly Linked List, N->next->prev == N and N->prev->next == N.',
      'DLL Boundary Invariants: HEAD->prev == NULL and TAIL->next == NULL in standard Doubly Linked Lists.',
      'CLL Closed-Loop Invariant: In a Circular Linked List, no node pointer ever equals NULL; traversing next eventually visits every node and returns to start.',
      'CLL Tail-Head Relationship: In a circular list maintained via TAIL pointer, TAIL->next always identifies HEAD.',
      'CDLL Universal Symmetry: In a Circular Doubly Linked List, HEAD->prev == TAIL and TAIL->next == HEAD.'
    ],
    commonMistakes: [
      'Infinite Loops in Circular Lists: Writing "while (curr != NULL)" on a circular linked list, resulting in an infinite loop that freezes the process.',
      'Partial Pointer Rewiring in DLL: Updating newNode->next and prevNode->next but forgetting to update newNode->prev or nextNode->prev, breaking backward traversal.',
      'Single-Node Deletion in Circular Lists: Failing to handle the edge case where a circular list has only 1 node (head->next == head). Freeing it requires setting head = NULL.',
      'Memory Overhead Ignorance: Using a Doubly Linked List for millions of small 4-byte integers, resulting in 400% memory overhead due to dual 8-byte 64-bit pointers and alignment padding.'
    ],
    advantages: [
      'Doubly Linked Lists allow true O(1) deletion of any node given its reference.',
      'Doubly Linked Lists support effortless bidirectional traversal (ideal for undo/redo and browser history).',
      'Circular Linked Lists naturally model cyclical processes (round-robin scheduling, turn-based systems) without resetting pointers to HEAD.',
      'Circular Lists with TAIL pointer enable O(1) insertion at both front and back with a single tracking pointer.'
    ],
    limitations: [
      'Doubly Linked Lists double the pointer memory overhead compared to Singly Linked Lists.',
      'Doubly Linked List operations require 4 pointer rewires per insertion/deletion instead of 2.',
      'Circular Lists risk infinite loops if traversal termination conditions are improperly implemented.',
      'Debugging circular pointer structures in core dumps or debuggers is more prone to recursion traps.'
    ],
    operations: [
      {
        id: 'op-dll-insert',
        name: 'Doubly Linked List — Insert at Front',
        syntax: 'dllInsertFront(&head, val);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Allocates a DNode and splices it at the front, properly setting prev and next pointers.',
        steps: [
          {
            step: 1,
            description: 'Allocate DNode',
            codeSnippet: 'DNode *node = (DNode *)malloc(sizeof(DNode));\nnode->data = val; node->prev = NULL; node->next = *head;',
            stateExplanation: 'New node will have prev = NULL (it becomes new head) and next pointing to current head.'
          },
          {
            step: 2,
            description: 'Update existing head prev pointer',
            codeSnippet: 'if (*head != NULL) (*head)->prev = node;',
            stateExplanation: 'If old head exists, its backward pointer must point to the new node.'
          },
          {
            step: 3,
            description: 'Point head to new node',
            codeSnippet: '*head = node;',
            stateExplanation: 'Updates external HEAD pointer.'
          }
        ],
        cCodeSnippet:
          'typedef struct DNode {\n    int data;\n    struct DNode *prev;\n    struct DNode *next;\n} DNode;\n\nvoid dllInsertFront(DNode **head, int val) {\n    DNode *node = (DNode *)malloc(sizeof(DNode));\n    if (!node) return;\n    node->data = val;\n    node->prev = NULL;\n    node->next = *head;\n    if (*head != NULL) (*head)->prev = node;\n    *head = node;\n}'
      },
      {
        id: 'op-dll-delete',
        name: 'Doubly Linked List — O(1) Node Deletion Given Node Pointer',
        syntax: 'dllDeleteNode(&head, targetNode);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Removes target node directly in O(1) without requiring linear search for its predecessor.',
        steps: [
          {
            step: 1,
            description: 'Rewire predecessor if exists',
            codeSnippet: 'if (target->prev != NULL) target->prev->next = target->next;\nelse *head = target->next;',
            stateExplanation: 'If target is head, advance head; otherwise update predecessor forward link.'
          },
          {
            step: 2,
            description: 'Rewire successor if exists',
            codeSnippet: 'if (target->next != NULL) target->next->prev = target->prev;',
            stateExplanation: 'Successor backward link bridges directly to target predecessor.'
          },
          {
            step: 3,
            description: 'Free target node memory',
            codeSnippet: 'free(target);',
            stateExplanation: 'Releases heap memory in pure O(1) time.'
          }
        ],
        cCodeSnippet:
          'void dllDeleteNode(DNode **head, DNode *target) {\n    if (!head || !*head || !target) return;\n    if (*head == target) *head = target->next;\n    if (target->prev != NULL) target->prev->next = target->next;\n    if (target->next != NULL) target->next->prev = target->prev;\n    free(target);\n}'
      },
      {
        id: 'op-cll-insert',
        name: 'Circular Singly Linked List — Insert with TAIL Pointer',
        syntax: 'cllInsertEnd(&tail, val);',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Demonstrates constant-time insertion into a circular list using a single TAIL reference.',
        steps: [
          {
            step: 1,
            description: 'Allocate node',
            codeSnippet: 'Node *node = (Node *)malloc(sizeof(Node)); node->data = val;',
            stateExplanation: 'Allocates new circular node on heap.'
          },
          {
            step: 2,
            description: 'Handle single-node empty list',
            codeSnippet: 'if (*tail == NULL) { *tail = node; node->next = node; return; }',
            stateExplanation: 'In a 1-node circular list, the node points to itself (node->next = node).'
          },
          {
            step: 3,
            description: 'Splice after tail and advance tail pointer',
            codeSnippet: 'node->next = (*tail)->next;\n(*tail)->next = node;\n*tail = node;',
            stateExplanation: 'New node points to head ((*tail)->next), old tail points to new node, and tail advances.'
          }
        ],
        cCodeSnippet:
          'void cllInsertEnd(Node **tail, int val) {\n    Node *node = (Node *)malloc(sizeof(Node));\n    if (!node) return;\n    node->data = val;\n    if (*tail == NULL) {\n        *tail = node;\n        node->next = node;\n        return;\n    }\n    node->next = (*tail)->next;\n    (*tail)->next = node;\n    *tail = node;\n}'
      }
    ],
    cCode: {
      title: 'Doubly and Circular Linked Lists in C99',
      filename: 'types_of_linked_lists.c',
      code:
`#include <stdio.h>
#include <stdlib.h>

/* ========================================================
   PART 1: DOUBLY LINKED LIST (DLL)
   ======================================================== */
typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

void dllInsertEnd(DNode **head, int val) {
    DNode *node = (DNode *)malloc(sizeof(DNode));
    node->data = val;
    node->next = NULL;
    if (*head == NULL) {
        node->prev = NULL;
        *head = node;
        return;
    }
    DNode *curr = *head;
    while (curr->next != NULL) curr = curr->next;
    curr->next = node;
    node->prev = curr;
}

void dllDisplayForward(DNode *head) {
    printf("DLL Forward:  NULL <-> ");
    DNode *curr = head;
    while (curr != NULL) {
        printf("[%d] <-> ", curr->data);
        curr = curr->next;
    }
    printf("NULL\\n");
}

void dllDisplayBackward(DNode *head) {
    if (!head) return;
    DNode *curr = head;
    while (curr->next != NULL) curr = curr->next; /* Go to tail */
    printf("DLL Backward: NULL <-> ");
    while (curr != NULL) {
        printf("[%d] <-> ", curr->data);
        curr = curr->prev;
    }
    printf("NULL\\n");
}

/* ========================================================
   PART 2: CIRCULAR SINGLY LINKED LIST (CLL)
   ======================================================== */
typedef struct CNode {
    int data;
    struct CNode *next;
} CNode;

void cllInsertEnd(CNode **tail, int val) {
    CNode *node = (CNode *)malloc(sizeof(CNode));
    node->data = val;
    if (*tail == NULL) {
        *tail = node;
        node->next = node;
        return;
    }
    node->next = (*tail)->next; /* Points to HEAD */
    (*tail)->next = node;
    *tail = node; /* Advance TAIL */
}

void cllDisplay(CNode *tail) {
    if (tail == NULL) { printf("CLL is Empty\\n"); return; }
    CNode *head = tail->next;
    CNode *curr = head;
    printf("CLL Ring:     (Head) ");
    do {
        printf("[%d] -> ", curr->data);
        curr = curr->next;
    } while (curr != head);
    printf("(Loops to %d)\\n", head->data);
}

int main(void) {
    printf("=== Demonstration of Linked List Types in C99 ===\\n\\n");

    /* 1. Test Doubly Linked List */
    DNode *dHead = NULL;
    dllInsertEnd(&dHead, 100);
    dllInsertEnd(&dHead, 200);
    dllInsertEnd(&dHead, 300);
    dllDisplayForward(dHead);
    dllDisplayBackward(dHead);

    printf("\\n");

    /* 2. Test Circular Linked List */
    CNode *cTail = NULL;
    cllInsertEnd(&cTail, 10);
    cllInsertEnd(&cTail, 20);
    cllInsertEnd(&cTail, 30);
    cllInsertEnd(&cTail, 40);
    cllDisplay(cTail);

    return 0;
}`,
      explanation: [
        'Line 8-12: Doubly Linked List node struct with prev and next pointers.',
        'Line 24-25: In dllInsertEnd, node->prev = curr binds the backward link in O(1).',
        'Line 38-48: dllDisplayBackward demonstrates backward traversal enabled by the prev pointers.',
        'Line 54-57: Circular Linked List node struct.',
        'Line 66-70: cllInsertEnd uses a TAIL pointer to insert at the end in O(1) without loop traversal!',
        'Line 76-85: cllDisplay uses a do-while loop to inspect every node until returning to head.'
      ],
      simulatedOutput:
`=== Demonstration of Linked List Types in C99 ===

DLL Forward:  NULL <-> [100] <-> [200] <-> [300] <-> NULL
DLL Backward: NULL <-> [300] <-> [200] <-> [100] <-> NULL

CLL Ring:     (Head) [10] -> [20] -> [30] -> [40] -> (Loops to 10)`
    },
    realWorldUses: [
      {
        title: 'Linux Kernel Intrusive Circular Doubly Linked List (list_head)',
        domain: 'Operating System Kernel Architecture',
        problem: 'The Linux kernel tracks millions of objects of varying types (processes, open files, network devices). Creating custom linked list implementations for each struct would cause massive code bloat and type-safety nightmares.',
        solution: 'Linux standardizes on struct list_head { struct list_head *next, *prev; }, an intrusive circular doubly linked list embedded directly inside parent structs. Using the container_of() macro, the kernel traverses and deletes any kernel object in O(1) with zero allocation overhead.',
        typeUsed: 'Circular Doubly Linked Intrusive List',
        complexity: 'O(1) insertion, O(1) removal without predecessor search',
        realWorldContext: 'Powers the Linux task scheduler runqueues, process tree siblings, and virtual memory VMA chains.'
      },
      {
        title: 'Browser Navigation History (Back & Forward Engine)',
        domain: 'Web Browser Architecture (Chromium & WebKit)',
        problem: 'Web browsers must support instantaneous Back and Forward navigation across visited web pages, while truncating forward history whenever the user navigates to a new URL from an intermediate page.',
        solution: 'Browser history tabs use a Doubly Linked List where each node represents a Document State object. "Back" advances curr = curr->prev; "Forward" advances curr = curr->next; clicking a new link deletes curr->next and appends a new node.',
        typeUsed: 'Doubly Linked List with active position pointer',
        complexity: 'O(1) forward/back navigation, O(k) forward history truncation',
        realWorldContext: 'Standard navigation model implemented across Google Chrome, Apple Safari, and Mozilla Firefox.'
      },
      {
        title: 'OS Process CPU Round-Robin Scheduling Runqueue',
        domain: 'Real-Time Operating Systems (RTOS)',
        problem: 'Time-sharing operating systems allocate a fixed CPU time slice (quantum) to each ready thread. Once a thread quantum expires, the CPU must seamlessly switch to the next ready thread in an unbroken circular cycle.',
        solution: 'The scheduler maintains a Circular Linked List of runnable threads. When a quantum expires, the scheduler saves registers and simply advances: activeThread = activeThread->next.',
        typeUsed: 'Circular Singly/Doubly Linked List',
        complexity: 'O(1) process dispatch and context switch rotation',
        realWorldContext: 'Found in real-time embedded kernels (FreeRTOS, VxWorks) and OS timer tick interrupt handlers.'
      }
    ],
    complexity: [
      {
        operation: 'Delete Given Node Pointer (node known)',
        singlyList: 'O(n) [must find prev]',
        doublyList: 'O(1) [node->prev known]',
        circularList: 'O(n) [Singly] / O(1) [Doubly]',
        arrayComparison: 'O(n) [shift elements]',
        explanation: 'Doubly linked lists store the predecessor pointer directly in node->prev, enabling instant O(1) unlinking.'
      },
      {
        operation: 'Backward Traversal (Tail to Head)',
        singlyList: 'Impossible (or O(n^2))',
        doublyList: 'O(n) [natural via prev]',
        circularList: 'O(n) [only if Doubly]',
        arrayComparison: 'O(n) [i--]',
        explanation: 'Singly linked lists cannot traverse backward. DLLs support seamless reverse traversal.'
      },
      {
        operation: 'Memory Overhead per Node (64-bit)',
        singlyList: '8 bytes (1 pointer)',
        doublyList: '16 bytes (2 pointers)',
        circularList: '8 or 16 bytes',
        arrayComparison: '0 bytes [pure payload]',
        explanation: 'DLLs require twice as much pointer metadata as SLLs, which can be significant for small data payloads.'
      },
      {
        operation: 'Cycle Detection / Loop Handling',
        singlyList: 'Floyd Cycle Detection O(n)',
        doublyList: 'Floyd Cycle Detection O(n)',
        circularList: 'By design a cycle O(1)',
        arrayComparison: 'Not applicable (linear buffer)',
        explanation: 'Circular lists are intentionally cyclical; termination relies on matching the starting HEAD reference.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-503-1',
        question: 'What is the primary advantage of a Doubly Linked List over a Singly Linked List during node deletion?',
        options: [
          'It uses half as much memory as a singly linked list',
          'A node can be deleted in O(1) time if a pointer to that node is given, because its predecessor is directly accessible via node->prev',
          'It allows random access in O(1) time',
          'It guarantees automatic sorting of elements'
        ],
        correctAnswer: 1,
        explanation: 'In a Doubly Linked List, every node contains a pointer to its predecessor (node->prev). Thus, unlinking the node does not require traversing from HEAD to find who points to it, enabling true O(1) deletion.'
      },
      {
        id: 'q-503-2',
        question: 'Why is it widely considered best practice to maintain a TAIL pointer instead of a HEAD pointer in a Circular Singly Linked List?',
        options: [
          'Because tail pointers consume fewer bytes of RAM',
          'Because tail->next is HEAD, granting instantaneous O(1) access to both the first and last elements using a single pointer',
          'Because circular lists cannot legally have a head pointer in C99',
          'Because tail pointers prevent memory fragmentation'
        ],
        correctAnswer: 1,
        explanation: 'In a circular linked list, the last node links directly to the first node. If you hold TAIL, TAIL is the last node, and TAIL->next is the HEAD node! Both ends are accessible in O(1) with one pointer.'
      },
      {
        id: 'q-503-3',
        question: 'What is the standard loop termination condition when traversing an entire Circular Linked List starting at HEAD?',
        options: [
          'while (curr != NULL)',
          'while (curr->data != 0)',
          'do { ... curr = curr->next; } while (curr != head);',
          'while (curr->next == NULL)'
        ],
        correctAnswer: 2,
        explanation: 'Since a circular linked list contains no NULL pointer, checking "curr != NULL" causes an infinite loop. Using a do-while loop ensures the first node is processed, and loop terminates when curr wraps around back to head.'
      },
      {
        id: 'q-503-4',
        question: 'On a 64-bit architecture, what is the minimum pointer overhead per node in a Doubly Linked List?',
        options: ['4 bytes', '8 bytes', '16 bytes', '32 bytes'],
        correctAnswer: 2,
        explanation: 'On a 64-bit architecture, each memory pointer is 8 bytes. A Doubly Linked List node holds two pointers (prev and next), consuming 8 + 8 = 16 bytes of metadata overhead per node.'
      }
    ]
  },

  'top-504': {
    id: 'top-504',
    chapterId: 'chap-5',
    title: 'Linked List Applications',
    subtitle: 'Dynamic Stacks & Queues, Hash Chaining, Graph Adjacency, Polynomial Arithmetic, and OS Memory Free Lists',
    overview:
      'Linked lists are not merely standalone storage structures; they form the operational foundation for numerous advanced computer science abstractions and systems. From dynamic Stack/Queue ADTs with zero capacity overflow risks to hash table collision chaining, sparse graph adjacency representations, and operating system heap free-lists, linked structures provide flexible, non-contiguous memory management.',
    definition:
      'Linked List Applications encompass the diverse data structures, algorithms, and system architectures that employ pointer-linked nodes as their internal storage engine. These include dynamic Abstract Data Types (Stack, Queue, Deque), collision resolution in Hash Tables (Separate Chaining), Sparse Matrix representations, Graph Adjacency Lists, Polynomial manipulation, and OS Heap Free Block allocators.',
    coreConcept:
      'Major Application Domains in Computer Science:\n\n' +
      '1. Dynamic Stack ADT (LIFO):\n' +
      '   • Implementation: Singly Linked List with "TOP" maintained at HEAD.\n' +
      '   • Push: insertAtBeginning(val) — O(1) time.\n' +
      '   • Pop: deleteFromBeginning() — O(1) time.\n' +
      '   • Key Benefit: Zero fixed capacity constraints; stack overflow only occurs if physical system RAM is exhausted.\n\n' +
      '2. Dynamic Queue ADT (FIFO):\n' +
      '   • Implementation: Singly Linked List with FRONT pointer at HEAD and REAR pointer at TAIL.\n' +
      '   • Enqueue: insertAtEnd(val) — O(1) time via REAR.\n' +
      '   • Dequeue: deleteFromBeginning() — O(1) time via FRONT.\n' +
      '   • Key Benefit: Eliminates array shifting and circular modulo array size bounds.\n\n' +
      '3. Hash Table Separate Chaining:\n' +
      '   • When two keys hash to the same bucket index (collision), the bucket stores a Singly Linked List of colliding entries.\n' +
      '   • Insertion: O(1) at head of bucket chain.\n' +
      '   • Search: O(1 + alpha) where alpha is load factor (N / buckets).\n\n' +
      '4. Graph Representation (Adjacency Lists):\n' +
      '   • An array of V linked lists. Array index u holds a linked list of all neighbor vertices v adjacent to u.\n' +
      '   • Space: O(V + E) compared to O(V^2) for Adjacency Matrix. Essential for sparse graphs (where E << V^2).\n\n' +
      '5. Polynomial Arithmetic (Representation & Addition):\n' +
      '   • Each node represents a term: { coeff, exp, next }.\n' +
      '   • Addition merges two sorted polynomial lists in O(m + n) time, identical to the merge step of Mergesort.\n\n' +
      '6. OS Heap Memory Allocators (Free Lists):\n' +
      '   • Free heap blocks are linked together using pointers embedded directly into the unused memory chunks, forming an OS free list for malloc/free management.',
    workingPrinciple:
      'Deep Dive into Real Mechanisms:\n\n' +
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
      '• Hash Table Chaining Mechanics:\n' +
      '  An array of pointers: Node *buckets[TABLE_SIZE] = { NULL };\n' +
      '  hash(key) -> returns index 0 to TABLE_SIZE-1.\n' +
      '  New key prepended to buckets[index]:\n' +
      '    newNode->next = buckets[index];\n' +
      '    buckets[index] = newNode;',
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
      '    P(x) = 4x^3 + 3x^2 + 5:\n' +
      '    [ coeff: 4 | exp: 3 | • ] ──> [ coeff: 3 | exp: 2 | • ] ──> [ coeff: 5 | exp: 0 | NULL ]\n' +
      '=========================================================================',
    invariants: [
      'Stack LIFO Invariant: In a linked stack, TOP is always HEAD; push and pop happen strictly at HEAD in O(1).',
      'Queue FIFO Invariant: In a linked queue, FRONT removes from HEAD and REAR appends to TAIL; items leave in exact arrival order.',
      'Polynomial Exponent Invariant: Nodes in a polynomial linked list are maintained in strictly descending order of exponents.',
      'Adjacency List Space Bound: The sum of the lengths of all adjacency lists in an undirected graph equals 2 * |E|.',
      'Free List Coalescing Invariant: An OS heap free list must coalesce physically adjacent free blocks to prevent unbounded external fragmentation.'
    ],
    commonMistakes: [
      'Queue Underflow Blindness: Attempting to dequeue from a linked queue when FRONT == NULL, causing an immediate NULL dereference.',
      'Queue Rear Pointer Corruption on Emptying: When dequeuing the very last node in a queue, forgetting to set rear = NULL along with front = NULL.',
      'Unordered Polynomial Merging: Attempting to add polynomials without ensuring both input lists are sorted by descending exponents, producing incorrect combined terms.',
      'Hash Table Memory Leaks on Resize: Reallocating hash bucket arrays without rehashing or traversing and freeing every node in the collision chains.'
    ],
    advantages: [
      'No Overflow Constraints: Stacks and queues dynamically grow as long as system heap memory is available.',
      'Optimal Space for Sparse Graphs: Consumes O(V + E) memory instead of O(V^2), saving gigabytes of memory on large real-world graphs.',
      'Simple Hash Collision Resolution: Separate chaining handles arbitrary collision counts without complex open addressing probing schemes.',
      'Natural Algebraic Manipulation: Polynomial addition, differentiation, and multiplication map cleanly to pointer manipulation algorithms.'
    ],
    limitations: [
      'Pointer Overhead in Large Graphs: For dense graphs (E close to V^2), adjacency lists consume significantly more memory than a bit-matrix due to pointer overhead.',
      'Cache Inefficiency in Hash Chaining: Traversing collision chains scattered across heap induces CPU cache misses compared to open addressing (Robin Hood hashing).',
      'Non-Contiguous Access Latency: Linked stacks and queues are slightly slower per operation than contiguous ring buffers due to malloc/free overhead.'
    ],
    operations: [
      {
        id: 'op-linked-stack',
        name: 'Linked Stack ADT (Push & Pop via Head)',
        syntax: 'push(&top, val); int v = pop(&top);',
        timeComplexity: 'O(1) push, O(1) pop',
        spaceComplexity: 'O(1) per operation',
        description: 'Implements LIFO stack operations by treating the singly linked list HEAD as TOP.',
        steps: [
          {
            step: 1,
            description: 'Push operation',
            codeSnippet: 'Node *newNode = (Node *)malloc(sizeof(Node));\nnewNode->data = val; newNode->next = *top;\n*top = newNode;',
            stateExplanation: 'Prepends new element to top in constant O(1) time.'
          },
          {
            step: 2,
            description: 'Pop operation with underflow guard',
            codeSnippet: 'if (*top == NULL) { /* Stack Underflow */ }\nNode *temp = *top;\nint val = temp->data;\n*top = (*top)->next;\nfree(temp);\nreturn val;',
            stateExplanation: 'Removes top element, updates top pointer, and frees heap memory in O(1).'
          }
        ],
        cCodeSnippet:
          'typedef struct Node { int data; struct Node *next; } Node;\n\nvoid push(Node **top, int val) {\n    Node *n = (Node *)malloc(sizeof(Node));\n    n->data = val; n->next = *top; *top = n;\n}\n\nint pop(Node **top) {\n    if (*top == NULL) { fprintf(stderr, "Stack Underflow\\n"); exit(1); }\n    Node *t = *top; int val = t->data; *top = t->next; free(t);\n    return val;\n}'
      },
      {
        id: 'op-linked-queue',
        name: 'Linked Queue ADT (Enqueue at Rear, Dequeue at Front)',
        syntax: 'enqueue(q, val); int v = dequeue(q);',
        timeComplexity: 'O(1) enqueue, O(1) dequeue',
        spaceComplexity: 'O(1) per operation',
        description: 'Implements FIFO queue operations using dual FRONT (head) and REAR (tail) pointers.',
        steps: [
          {
            step: 1,
            description: 'Enqueue at rear',
            codeSnippet: 'Node *n = (Node *)malloc(sizeof(Node));\nn->data = val; n->next = NULL;\nif (q->rear == NULL) { q->front = q->rear = n; }\nelse { q->rear->next = n; q->rear = n; }',
            stateExplanation: 'Appends to rear in O(1). If queue was empty, sets both front and rear.'
          },
          {
            step: 2,
            description: 'Dequeue from front',
            codeSnippet: 'if (q->front == NULL) { /* Underflow */ }\nNode *t = q->front; int val = t->data;\nq->front = q->front->next;\nif (q->front == NULL) q->rear = NULL;\nfree(t);\nreturn val;',
            stateExplanation: 'Removes front element. If list becomes empty, neutralizes rear pointer to NULL.'
          }
        ],
        cCodeSnippet:
          'typedef struct Queue {\n    Node *front;\n    Node *rear;\n} Queue;\n\nvoid enqueue(Queue *q, int val) {\n    Node *n = (Node *)malloc(sizeof(Node));\n    n->data = val; n->next = NULL;\n    if (q->rear == NULL) { q->front = q->rear = n; return; }\n    q->rear->next = n; q->rear = n;\n}\n\nint dequeue(Queue *q) {\n    if (q->front == NULL) { fprintf(stderr, "Queue Underflow\\n"); exit(1); }\n    Node *t = q->front; int val = t->data;\n    q->front = q->front->next;\n    if (q->front == NULL) q->rear = NULL;\n    free(t);\n    return val;\n}'
      },
      {
        id: 'op-poly-add',
        name: 'Polynomial Addition via Ordered Merging',
        syntax: 'PolyNode *res = addPolynomials(p1, p2);',
        timeComplexity: 'O(m + n)',
        spaceComplexity: 'O(m + n) for result list',
        description: 'Merges two polynomials sorted by exponent in a single linear pass.',
        steps: [
          {
            step: 1,
            description: 'Compare exponents of current terms',
            codeSnippet: 'if (p1->exp == p2->exp) { append(&res, p1->coeff + p2->coeff, p1->exp); p1 = p1->next; p2 = p2->next; }',
            stateExplanation: 'When exponents match, add coefficients together.'
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
          'typedef struct PolyNode {\n    int coeff;\n    int exp;\n    struct PolyNode *next;\n} PolyNode;\n\nPolyNode* addPoly(PolyNode *p1, PolyNode *p2) {\n    PolyNode *res = NULL, **last = &res;\n    while (p1 && p2) {\n        int c = 0, e = 0;\n        if (p1->exp == p2->exp) { c = p1->coeff + p2->coeff; e = p1->exp; p1 = p1->next; p2 = p2->next; }\n        else if (p1->exp > p2->exp) { c = p1->coeff; e = p1->exp; p1 = p1->next; }\n        else { c = p2->coeff; e = p2->exp; p2 = p2->next; }\n        if (c != 0) {\n            PolyNode *n = (PolyNode *)malloc(sizeof(PolyNode));\n            n->coeff = c; n->exp = e; n->next = NULL;\n            *last = n; last = &(n->next);\n        }\n    }\n    /* Append remaining terms */\n    PolyNode *rem = p1 ? p1 : p2;\n    while (rem) {\n        PolyNode *n = (PolyNode *)malloc(sizeof(PolyNode));\n        n->coeff = rem->coeff; n->exp = rem->exp; n->next = NULL;\n        *last = n; last = &(n->next); rem = rem->next;\n    }\n    return res;\n}'
      }
    ],
    cCode: {
      title: 'Polynomial Representation and Addition in C99',
      filename: 'polynomial_addition.c',
      code:
`#include <stdio.h>
#include <stdlib.h>

/* Node representing a single polynomial term: coeff * x^exp */
typedef struct PolyNode {
    int coeff;
    int exp;
    struct PolyNode *next;
} PolyNode;

/* Helper to append a term to the polynomial chain */
void appendTerm(PolyNode **poly, int coeff, int exp) {
    if (coeff == 0) return; /* Omit zero terms */
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

/* Display polynomial in mathematical format */
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

/* Add two polynomials sorted by exponent descending - O(m + n) */
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

    /* Append remaining terms of p1 */
    while (p1 != NULL) {
        appendTerm(&result, p1->coeff, p1->exp);
        p1 = p1->next;
    }

    /* Append remaining terms of p2 */
    while (p2 != NULL) {
        appendTerm(&result, p2->coeff, p2->exp);
        p2 = p2->next;
    }

    return result;
}

int main(void) {
    printf("=== Polynomial Addition using Linked Lists ===\\n\\n");

    /* P1 = 5x^3 + 4x^1 + 2 */
    PolyNode *P1 = NULL;
    appendTerm(&P1, 5, 3);
    appendTerm(&P1, 4, 1);
    appendTerm(&P1, 2, 0);
    printf("Polynomial 1: ");
    displayPoly(P1);

    /* P2 = 3x^3 + 2x^2 + 1 */
    PolyNode *P2 = NULL;
    appendTerm(&P2, 3, 3);
    appendTerm(&P2, 2, 2);
    appendTerm(&P2, 1, 0);
    printf("Polynomial 2: ");
    displayPoly(P2);

    /* Sum = 8x^3 + 2x^2 + 4x^1 + 3 */
    PolyNode *Sum = addPolynomials(P1, P2);
    printf("\\nResultant Sum: ");
    displayPoly(Sum);

    return 0;
}`,
      explanation: [
        'Line 5-9: PolyNode stores coefficient, exponent, and next pointer.',
        'Line 12-25: appendTerm adds terms in order, omitting zero-coefficient terms.',
        'Line 41-72: addPolynomials processes terms in parallel similar to mergesort, executing in O(m + n) time.',
        'Line 45-50: When exponents match, coefficients are summed algebraically.',
        'Line 51-56: Higher exponent terms are prioritized to preserve descending polynomial ordering.'
      ],
      simulatedOutput:
`=== Polynomial Addition using Linked Lists ===

Polynomial 1: 5x^3 + 4x^1 + 2x^0
Polynomial 2: 3x^3 + 2x^2 + 1x^0

Resultant Sum: 8x^3 + 2x^2 + 4x^1 + 3x^0`
    },
    realWorldUses: [
      {
        title: 'Network Packet Scheduling (Linux Traffic Control qdisc)',
        domain: 'Computer Networking & Kernel Subsystems',
        problem: 'Network interface cards (NICs) receive packets from hundreds of concurrent sockets. Packets must be queued, prioritized by QoS (Quality of Service), and dispatched without fixed buffer drops.',
        solution: 'Linux Traffic Control (tc) uses linked queues for queuing disciplines (pfifo, fq_codel), chaining sk_buff network packet buffers dynamically in kernel memory.',
        typeUsed: 'Singly linked packet buffer queue',
        complexity: 'O(1) enqueue, O(1) dequeue per interface interrupt',
        realWorldContext: 'Manages all packet transmission across routers, switches, and Linux web servers globally.'
      },
      {
        title: 'Separate Chaining in Database Index Hash Tables',
        domain: 'Database Internals (PostgreSQL & MySQL InnoDB)',
        problem: 'Hash index structures inevitably encounter key collisions. If open addressing is used, deletions require complex tombstone markers and clustered probing chains.',
        solution: 'Database buffer pool hash tables employ separate chaining with singly linked lists per hash bucket. Deletions simply unlink the target record node in O(1) once located.',
        typeUsed: 'Hash Table Bucket Singly Linked Chains',
        complexity: 'O(1) insertion, O(1) average lookup and deletion',
        realWorldContext: 'Used in PostgreSQL Buffer Mapping Table to translate RelFileNode + BlockNumber to internal buffer pool frame indexes.'
      },
      {
        title: 'Symbolic Computer Algebra Systems (CAS)',
        domain: 'Scientific Computing & Mathematics (SymPy, Mathematica)',
        problem: 'Representing sparse multivariable polynomials with thousands of variables and unpredictable degree distributions in dense arrays would waste petabytes of RAM on zero coefficients.',
        solution: 'Computer Algebra Systems represent sparse polynomial expressions as sorted linked lists of non-zero terms, executing symbolic addition and differentiation in linear time.',
        typeUsed: 'Ordered Polynomial Term Linked Lists',
        complexity: 'O(m + n) symbolic addition, O(n) differentiation',
        realWorldContext: 'Powers symbolic calculus and physics simulations in aerospace engineering software.'
      }
    ],
    complexity: [
      {
        operation: 'Linked Stack: Push',
        singlyList: 'O(1)',
        doublyList: 'O(1)',
        circularList: 'O(1)',
        arrayComparison: 'O(1) amortized',
        explanation: 'Prepending a node at HEAD is strictly constant time with zero resizing delays.'
      },
      {
        operation: 'Linked Stack: Pop',
        singlyList: 'O(1)',
        doublyList: 'O(1)',
        circularList: 'O(1)',
        arrayComparison: 'O(1)',
        explanation: 'Removing from HEAD and freeing memory is strictly constant time.'
      },
      {
        operation: 'Linked Queue: Enqueue',
        singlyList: 'O(1) [with REAR]',
        doublyList: 'O(1)',
        circularList: 'O(1)',
        arrayComparison: 'O(1) amortized',
        explanation: 'Appending at REAR tail pointer is constant time.'
      },
      {
        operation: 'Linked Queue: Dequeue',
        singlyList: 'O(1) [from FRONT]',
        doublyList: 'O(1)',
        circularList: 'O(1)',
        arrayComparison: 'O(1) [circular array]',
        explanation: 'Removing from FRONT (HEAD) is constant time.'
      },
      {
        operation: 'Polynomial Addition (m & n terms)',
        singlyList: 'O(m + n)',
        doublyList: 'O(m + n)',
        circularList: 'O(m + n)',
        arrayComparison: 'O(max(deg1, deg2))',
        explanation: 'Simultaneous single-pass traversal of both sorted linked lists.'
      },
      {
        operation: 'Graph Adjacency List Space',
        singlyList: 'O(V + E)',
        doublyList: 'O(V + 2E)',
        circularList: 'O(V + E)',
        arrayComparison: 'O(V^2) [Adjacency Matrix]',
        explanation: 'Massive memory reduction for sparse graphs where E << V^2.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-504-1',
        question: 'How is a dynamic Stack ADT implemented using a Singly Linked List to ensure O(1) time complexity for both Push and Pop?',
        options: [
          'Push at tail, Pop from head',
          'Push at head, Pop from head (treating HEAD as TOP)',
          'Push at tail, Pop from tail',
          'Push at index n/2'
        ],
        correctAnswer: 1,
        explanation: 'In a singly linked list, inserting at the head and deleting from the head both take O(1) time. Therefore, maintaining TOP at HEAD guarantees O(1) Push and O(1) Pop.'
      },
      {
        id: 'q-504-2',
        question: 'Why are Adjacency Lists preferred over Adjacency Matrices for sparse graphs?',
        options: [
          'Adjacency lists allow O(1) edge lookup between any two vertices',
          'Adjacency lists consume O(V + E) space, whereas an Adjacency Matrix consumes O(V^2) space regardless of how few edges exist',
          'Adjacency matrices cannot store directed edges',
          'Adjacency lists consume zero memory for vertices'
        ],
        correctAnswer: 1,
        explanation: 'A sparse graph with 1,000,000 vertices and 2,000,000 edges would require 1,000,000^2 * 4 bytes = 4 Terabytes of RAM for an Adjacency Matrix! An Adjacency List stores only existing edges, requiring under 50 MB.'
      },
      {
        id: 'q-504-3',
        question: 'In a dynamic Queue implemented with a Singly Linked List using FRONT and REAR pointers, what edge case must be handled when dequeuing the final remaining element?',
        options: [
          'The queue must allocate an empty dummy node',
          'REAR must also be set to NULL when FRONT becomes NULL, otherwise REAR becomes a dangling pointer',
          'FRONT must point to itself',
          'A circular modulo shift must be invoked'
        ],
        correctAnswer: 1,
        explanation: 'When the last node is dequeued, FRONT becomes NULL. If REAR is not also explicitly set to NULL, it remains pointing to the deallocated memory of the former node, becoming a dangerous dangling pointer.'
      },
      {
        id: 'q-504-4',
        question: 'What is the time complexity to add two single-variable polynomials of sizes m and n represented as linked lists sorted in descending order of exponents?',
        options: ['O(m * n)', 'O(m + n)', 'O(log(m + n))', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Because both polynomial lists are pre-sorted by exponents, the algorithm advances along both lists simultaneously in a single linear pass (like the merge step in Mergesort), running in O(m + n) time.'
      }
    ]
  }
};
