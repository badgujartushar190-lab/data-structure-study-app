// Chapter 2 Data Model: SECE2221 / SECE2291 - Unit 2: Array Data Structure
// Primary Source: Course Material - Unit 2: Array
// Reference Textbooks: Tanenbaum (PHI Learning) & Tremblay & Sorenson (McGraw Hill)

export interface ConceptItem {
  name: string;
  source: 'PDF Primary Source' | 'Verified Academic Extension';
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

export interface TopicData {
  id: string;
  title: string;
  sidebarTitle: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
  description: string;
  unitCode: string;
  courseCode: string;
  concepts: ConceptItem[];
  classificationTrees?: any;
  comparisonTable?: {
    header1: string;
    header2: string;
    rows: ComparisonRow[];
  };
  operations?: OperationDetail[];
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
  practiceQuestions: QuizQuestion[];
}

export const chapter2Topics: Record<string, TopicData> = {
  'top-201': {
    id: 'top-201',
    title: 'Array Representation',
    sidebarTitle: 'Array Representation',
    complexity: 'Easy',
    unitCode: 'Unit 2: Array',
    courseCode: 'SECE2221 / SECE2291',
    description:
      'Understanding One-Dimensional (1D) and Two-Dimensional (2D) arrays, contiguous physical memory allocation, indexing mechanisms, and multidimensional flattening.',
    concepts: [
      {
        name: 'One-Dimensional (1D) Array',
        source: 'PDF Primary Source',
        definition:
          'A fixed-size sequential list of elements of the same data type stored in contiguous memory locations, where each item is directly accessible via a numerical index.',
        example: 'int arr[5] = {10, 20, 30, 40, 50};',
        usage: 'Storing sequential records, numerical vectors, lookup tables, and buffers.',
        asciiDiagram: `Index:       0       1       2       3       4
Value:    [ 10  ] [ 20  ] [ 30  ] [ 40  ] [ 50  ]
Address:   1000    1004    1008    1012    1016   (each int = 4 bytes)`
      },
      {
        name: 'Zero-Based Indexing & Offset Formula',
        source: 'PDF Primary Source',
        definition:
          'In C and modern languages, array indices start at 0. The index denotes the offset (distance) from the starting base address rather than an ordinal count.',
        example:
          'arr[2] gives 30 because Address = Base + (2 * sizeof(int)) = 1000 + (2 * 4) = 1008.',
        usage: 'Enables constant-time O(1) direct random access without traversing preceding elements.',
        asciiDiagram: `Address(arr[i]) = Base_Address + (i * Element_Size)`
      },
      {
        name: 'Two-Dimensional (2D) Array',
        source: 'PDF Primary Source',
        definition:
          'An array of 1D arrays organized in rows and columns to represent a matrix or grid of elements.',
        example: `int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};`,
        usage: 'Representing mathematical matrices, image pixel grids, game boards (Chess, Tic-Tac-Toe), and tabular spreadsheets.',
        asciiDiagram: `        Column 0  Column 1  Column 2
Row 0 [    1    ][    2    ][    3    ]
Row 1 [    4    ][    5    ][    6    ]

matrix[1][2] = 6 (Intersection of Row 1 and Column 2)`
      },
      {
        name: 'Multidimensional Extension',
        source: 'PDF Primary Source',
        definition:
          'Array dimensions can be naturally extended to 3D, 4D, and N-dimensional tensors. Regardless of dimension count, physical RAM remains a single linear byte array.',
        example: 'int tensor[3][4][5]; (a 3D array of 3 blocks, 4 rows, and 5 columns = 60 elements).',
        usage: '3D spatial coordinates in gaming, color video processing (frames x height x width x channels), and deep learning tensor computations.',
        asciiDiagram: `N-Dimensional Logical Tensor ──(Flattened by Compiler)──> 1D Linear Physical RAM`
      }
    ],
    comparisonTable: {
      header1: '1D Array (Vector)',
      header2: '2D Array (Matrix)',
      rows: [
        {
          aspect: 'Structure',
          col1: 'Single linear sequence of homogeneous elements.',
          col2: 'Grid of rows and columns (an array of 1D arrays).'
        },
        {
          aspect: 'Indexing',
          col1: 'Single index: arr[i]',
          col2: 'Dual indices: matrix[row][col]'
        },
        {
          aspect: 'Memory Layout',
          col1: 'Directly contiguous single block.',
          col2: 'Contiguous 1D block flattened row-by-row (Row-major in C).'
        },
        {
          aspect: 'Address Calculation',
          col1: 'Base + i * S',
          col2: 'Base + (row * Total_Cols + col) * S'
        },
        {
          aspect: 'Typical Applications',
          col1: 'Lists, queues, numeric counters, time-series.',
          col2: 'Matrices, pixel grids, graph adjacency matrices, tables.'
        }
      ]
    },
    cCode: {
      filename: 'array_representation_1d_2d.c',
      description: 'C99 Demonstration of 1D and 2D Array Representation and Address Arithmetic.',
      code: `#include <stdio.h>

int main(void) {
    // 1. One-Dimensional Array Representation
    int arr[5] = {10, 20, 30, 40, 50};
    
    printf("==========================================\\n");
    printf("   1D ARRAY REPRESENTATION IN MEMORY      \\n");
    printf("==========================================\\n");
    printf("Base Address (&arr[0]): %p\\n\\n", (void*)&arr[0]);

    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d | Address: %p | Byte Offset: +%zu bytes\\n",
               i, arr[i], (void*)&arr[i], (size_t)((char*)&arr[i] - (char*)&arr[0]));
    }

    printf("\\nWhy does arr[2] equal 30?\\n");
    printf("Calculated Address: Base + (2 * sizeof(int)) = %p\\n",
           (void*)((char*)&arr[0] + 2 * sizeof(int)));
    printf("Value at that memory slot: %d\\n\\n", *(arr + 2));

    // 2. Two-Dimensional Array Representation (2 rows x 3 columns)
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    printf("==========================================\\n");
    printf("   2D ARRAY MATRIX REPRESENTATION (2x3)   \\n");
    printf("==========================================\\n");

    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            printf("matrix[%d][%d] = %d (Addr: %p)  ",
                   r, c, matrix[r][c], (void*)&matrix[r][c]);
        }
        printf("\\n");
    }

    printf("\\nElement matrix[1][2] = %d (Row 1, Column 2)\\n", matrix[1][2]);
    printf("Notice that in physical memory, matrix[1][0] immediately follows matrix[0][2]!\\n");

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Digital Audio & PCM Signal Buffers',
        category: 'Audio Engineering',
        system: 'WAV / MP3 Digital Signal Processors',
        description: 'Audio waveforms are stored as 1D contiguous arrays of pulse-code modulation (PCM) amplitude samples.',
        bullets: [
          '44.1 kHz CD audio stores 44,100 integer samples per second in contiguous 1D memory.',
          'Direct indexing allows constant-time access to apply gain, convolution, or fast Fourier transform (FFT) filters.'
        ]
      },
      {
        title: 'Image Framebuffers & Computer Vision Pixels',
        category: 'Graphics Systems',
        system: 'OpenGL & OpenCV Image Buffers',
        description: 'Digital raster images are represented as 2D (grayscale) or 3D (RGB color) arrays.',
        bullets: [
          'A 1080p full HD image is a 2D matrix of 1080 rows and 1920 columns.',
          'Pixel brightness at coordinate (x, y) is resolved instantly via row-major index offset: y * width + x.'
        ]
      },
      {
        title: 'Relational Database Execution Cache',
        category: 'Databases',
        system: 'Columnar Databases (DuckDB, ClickHouse)',
        description: 'Storing database table columns as dense contiguous arrays for vectorized SIMD query execution.',
        bullets: [
          'Aggregating sums or averages over millions of rows executes in CPU cache lines with zero pointer chasing overhead.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Array Representation Complexity Matrix',
      summary:
        'Contiguous physical memory layout guarantees constant-time random access, but requires pre-allocating a fixed capacity.',
      rows: [
        {
          operation: 'Direct Random Access by Index (arr[i])',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Evaluated in a single CPU cycle using Base + (i * Size).'
        },
        {
          operation: '2D Matrix Coordinate Access (matrix[r][c])',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Evaluated via Base + ((r * Cols) + c) * Size.'
        },
        {
          operation: 'Memory Allocation Overhead',
          timeComplexity: 'O(1) Stack / O(n) Heap',
          spaceComplexity: 'O(n) Contiguous',
          notes: 'Requires a contiguous block of N * sizeof(type) bytes in RAM.'
        },
        {
          operation: 'Sequential Full-Scan Traversal',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Iterates through all N elements from index 0 to N-1.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'rep-q1',
        difficulty: 'Easy',
        question: 'Given int arr[5] = {10, 20, 30, 40, 50} in C, what is the value of arr[2]?',
        options: ['10', '20', '30', '40'],
        correctAnswer: 2,
        explanation: 'Due to zero-based indexing, arr[0]=10, arr[1]=20, and arr[2]=30.',
        conceptRef: 'Zero-Based Indexing'
      },
      {
        id: 'rep-q2',
        difficulty: 'Easy',
        question: 'What is the primary physical memory characteristic of a normal C array?',
        options: [
          'Elements are stored in scattered non-contiguous memory connected by pointers',
          'Elements are stored in a contiguous, unbroken block of sequential memory addresses',
          'Elements can be resized automatically at runtime without reallocation',
          'Elements may hold heterogeneous types (ints mixed with strings)'
        ],
        correctAnswer: 1,
        explanation: 'Normal C arrays require a single, contiguous block of physical memory, enabling O(1) random access.',
        conceptRef: 'Contiguous Memory Allocation'
      },
      {
        id: 'rep-q3',
        difficulty: 'Medium',
        question: 'In the 2D array matrix[2][3] = {{1, 2, 3}, {4, 5, 6}}, which element corresponds to matrix[1][2]?',
        options: ['2', '4', '5', '6'],
        correctAnswer: 3,
        explanation: 'matrix[1][2] accesses Row 1 (the second row: {4, 5, 6}) and Column 2 (the third column element), which is 6.',
        conceptRef: '2D Array Matrix Indexing'
      },
      {
        id: 'rep-q4',
        difficulty: 'Hard',
        question: 'If an integer array begins at memory address 2000, and sizeof(int) is 4 bytes, what is the memory address of arr[4]?',
        options: ['2004', '2016', '2020', '2040'],
        correctAnswer: 1,
        explanation: 'Address = Base + (index * size) = 2000 + (4 * 4) = 2000 + 16 = 2016.',
        conceptRef: 'Address Calculation Formula'
      }
    ]
  },

  'top-202': {
    id: 'top-202',
    title: 'Array as an Abstract Data Type',
    sidebarTitle: 'Array as an Abstract Data Type',
    complexity: 'Easy',
    unitCode: 'Unit 2: Array',
    courseCode: 'SECE2221 / SECE2291',
    description:
      'Understanding Array as an Abstract Data Type (ADT): mathematical definition, core operations, interface vs physical implementation, and complexity trade-offs.',
    concepts: [
      {
        name: 'Array ADT Definition',
        source: 'PDF Primary Source',
        definition:
          'A collection of elements, each identified by an index or key, representing a finite ordered list of elements of the same data type.',
        example: 'ArrayADT = { Domain: Elements of Type T, IndexSet: 0..N-1, Operations: create, get, set, insert, delete, search }.',
        usage: 'Formal mathematical contract in computer science separating data specification from physical machine memory layout.',
        asciiDiagram: `+-----------------------------------------------------------+
|                      ARRAY AS AN ADT                      |
|  - Finite size (Capacity N)       - Homogeneous Elements  |
|  - Ordered sequence of items      - Random Access O(1)    |
+-----------------------------------------------------------+`
      },
      {
        name: 'ADT vs Data Structure / Implementation',
        source: 'Verified Academic Extension',
        definition:
          'An Abstract Data Type (ADT) defines WHAT operations can be performed and what rules govern them (the conceptual specification). A Data Structure is the concrete HOW: the actual machine data representation and algorithms implementing that contract.',
        example:
          'Array ADT can be implemented via fixed contiguous stack memory in C, dynamic heap memory (malloc), or dynamic arrays (std::vector, ArrayList).',
        usage: 'Modular programming, data abstraction, encapsulation, and software architecture.',
        asciiDiagram: `[ ADT Specification: Interface (get, set, insert, delete) ]
                            │
               ┌────────────┴────────────┐
               ▼                         ▼
   [ Fixed C Array: int a[5] ]    [ Dynamic Array: malloc(N) ]`
      },
      {
        name: 'The Four Core Characteristics from Course PDF',
        source: 'PDF Primary Source',
        definition: 'The official course material establishes four fundamental characteristics of the Array ADT:',
        example: `1. Fixed Size: Total capacity is determined upon allocation.
2. Homogeneous Elements: All stored values belong to the identical data type.
3. Random Access: Any element at index i can be accessed directly without sequential scanning.
4. O(1) Access Time: Retrieval takes constant time regardless of array length.`,
        usage: 'Serving as the baseline benchmark against which linked lists, trees, and hash tables are compared.',
        asciiDiagram: `Fixed Size + Homogeneous Elements + Random Access => O(1) Access Time`
      }
    ],
    comparisonTable: {
      header1: 'Abstract Data Type (ADT)',
      header2: 'Data Structure (Concrete Implementation)',
      rows: [
        {
          aspect: 'Focus',
          col1: 'What the data structure does (logical interface & behavior).',
          col2: 'How data is stored and manipulated in physical memory.'
        },
        {
          aspect: 'Implementation',
          col1: 'Language-independent conceptual model.',
          col2: 'Language-specific concrete code (C struct, array pointer).'
        },
        {
          aspect: 'User Visibility',
          col1: 'Visible interface (function signatures & pre/post conditions).',
          col2: 'Hidden internal details (memory pointers, byte offsets).'
        },
        {
          aspect: 'Example',
          col1: 'Array ADT, List ADT, Stack ADT, Queue ADT.',
          col2: 'int arr[50], Singly Linked List, Circular Array Buffer.'
        }
      ]
    },
    operations: [
      {
        id: 'adt-create',
        name: '1. Create / Initialize',
        definition: 'Allocates memory for an array with a specified capacity and sets initial size.',
        explanation: 'Initializes internal capacity, element counter, and base memory pointer.',
        arrayExample: 'ArrayADT myArr = createArray(10); initializes empty array with capacity 10.',
        realWorldExample: 'Pre-allocating a network packet buffer of 1500 bytes for Ethernet frames.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Stack allocation or single malloc call.'
        },
        cSnippet: `typedef struct {
    int data[10];
    int size;
    int capacity;
} ArrayADT;`
      },
      {
        id: 'adt-access',
        name: '2. Access / Get',
        definition: 'Retrieves the element value at a specified valid index without modifying the structure.',
        explanation: 'Direct offset calculation: Base + index * sizeof(element).',
        arrayExample: 'get(&myArr, 3) returns element at index 3 in O(1) time.',
        realWorldExample: 'Retrieving user record by employee ID from a lookup table.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Valid index within 0 <= index < size.'
        },
        cSnippet: `int get(const ArrayADT *a, int index) {
    if (index >= 0 && index < a->size)
        return a->data[index];
    return -1; // Boundary error
}`
      },
      {
        id: 'adt-update',
        name: '3. Update / Set',
        definition: 'Overwrites the existing value at a given index with a new element.',
        explanation: 'Direct memory mutation at the specified index without changing array size.',
        arrayExample: 'set(&myArr, 2, 99) replaces the element at index 2 with 99.',
        realWorldExample: 'Updating stock quantity after a product purchase.',
        timeComplexity: {
          best: 'O(1)',
          average: 'O(1)',
          worst: 'O(1)',
          assumptions: 'Valid index within allocated bounds.'
        },
        cSnippet: `void set(ArrayADT *a, int index, int value) {
    if (index >= 0 && index < a->size)
        a->data[index] = value;
}`
      },
      {
        id: 'adt-insert',
        name: '4. Insert',
        definition: 'Inserts a new element at a specified index, shifting existing items to the right.',
        explanation: 'If inserting at index 0, all N existing elements must shift right. If appending at the end, zero shifts are required.',
        arrayExample: 'insert(&myArr, 1, 77) shifts elements from index 1..N-1 right, then writes 77 at index 1.',
        realWorldExample: 'Inserting an urgent patient chart into an appointment schedule.',
        timeComplexity: {
          best: 'O(1) at end (with available capacity)',
          average: 'O(n) at middle position (shifts ~n/2 items)',
          worst: 'O(n) at index 0 (shifts all n items)',
          assumptions: 'Contiguous memory layout requires shifting to avoid holes.'
        },
        cSnippet: `void insert(ArrayADT *a, int index, int val) {
    if (a->size < a->capacity && index >= 0 && index <= a->size) {
        for (int i = a->size; i > index; i--)
            a->data[i] = a->data[i - 1]; // Shift right
        a->data[index] = val;
        a->size++;
    }
}`
      },
      {
        id: 'adt-delete',
        name: '5. Delete',
        definition: 'Removes the element at a specified index and shifts following elements left to fill the gap.',
        explanation: 'Contiguity invariant requires closing any gap left by removed elements.',
        arrayExample: 'delete(&myArr, 0) shifts all elements left by one index and decrements size.',
        realWorldExample: 'Removing a canceled passenger from a flight seat manifest.',
        timeComplexity: {
          best: 'O(1) at end of array (size - 1)',
          average: 'O(n) at middle position',
          worst: 'O(n) at index 0 (shifts all n-1 items)',
          assumptions: 'Contiguous layout must maintain sequential indices.'
        },
        cSnippet: `void delete(ArrayADT *a, int index) {
    if (index >= 0 && index < a->size) {
        for (int i = index; i < a->size - 1; i++)
            a->data[i] = a->data[i + 1]; // Shift left
        a->size--;
    }
}`
      },
      {
        id: 'adt-search',
        name: '6. Search',
        definition: 'Searches for a key in the array and returns its index, or -1 if not found.',
        explanation: 'Linear search scans element by element from index 0 to size - 1.',
        arrayExample: 'search(&myArr, 40) checks arr[0], arr[1], arr[2]... returns matching index.',
        realWorldExample: 'Finding whether an IP address is in a security blocklist.',
        timeComplexity: {
          best: 'O(1) if target is at index 0',
          average: 'O(n) unsorted array',
          worst: 'O(n) target at end or not present',
          assumptions: 'Unsorted array requires exhaustive linear scanning.'
        },
        cSnippet: `int search(const ArrayADT *a, int key) {
    for (int i = 0; i < a->size; i++) {
        if (a->data[i] == key) return i;
    }
    return -1;
}`
      }
    ],
    cCode: {
      filename: 'array_adt_implementation.c',
      description: 'Complete C99 Implementation of the Array ADT with bounds checking and operations.',
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_CAPACITY 8

// Array ADT Structure Definition
typedef struct {
    int items[MAX_CAPACITY];
    int size;
    int capacity;
} ArrayADT;

// Operation 1: Initialize Array ADT
void initArray(ArrayADT *arr) {
    arr->size = 0;
    arr->capacity = MAX_CAPACITY;
}

// Operation 2: Access (Get) - O(1)
int get(const ArrayADT *arr, int index) {
    if (index < 0 || index >= arr->size) {
        printf("[Error] Index %d out of bounds!\\n", index);
        return -1;
    }
    return arr->items[index];
}

// Operation 3: Update (Set) - O(1)
bool set(ArrayADT *arr, int index, int value) {
    if (index < 0 || index >= arr->size) {
        printf("[Error] Invalid update index %d!\\n", index);
        return false;
    }
    arr->items[index] = value;
    return true;
}

// Operation 4: Insert - O(1) end, O(n) general
bool insert(ArrayADT *arr, int index, int value) {
    if (arr->size >= arr->capacity) {
        printf("[Error] Array Overflow! Capacity %d reached.\\n", arr->capacity);
        return false;
    }
    if (index < 0 || index > arr->size) {
        printf("[Error] Invalid insertion position %d!\\n", index);
        return false;
    }
    // Shift elements right
    for (int i = arr->size; i > index; i--) {
        arr->items[i] = arr->items[i - 1];
    }
    arr->items[index] = value;
    arr->size++;
    printf("[Success] Inserted %d at index %d (New size: %d)\\n", value, index, arr->size);
    return true;
}

// Operation 5: Delete - O(1) end, O(n) general
bool delete(ArrayADT *arr, int index) {
    if (arr->size <= 0) {
        printf("[Error] Array Underflow! Array is empty.\\n");
        return false;
    }
    if (index < 0 || index >= arr->size) {
        printf("[Error] Invalid deletion index %d!\\n", index);
        return false;
    }
    int removed = arr->items[index];
    // Shift elements left
    for (int i = index; i < arr->size - 1; i++) {
        arr->items[i] = arr->items[i + 1];
    }
    arr->size--;
    printf("[Success] Deleted %d from index %d (New size: %d)\\n", removed, index, arr->size);
    return true;
}

// Operation 6: Traverse - O(n)
void display(const ArrayADT *arr) {
    printf("Array elements (%d/%d): [ ", arr->size, arr->capacity);
    for (int i = 0; i < arr->size; i++) {
        printf("%d ", arr->items[i]);
    }
    printf("]\\n");
}

int main(void) {
    ArrayADT arr;
    initArray(&arr);

    printf("==========================================\\n");
    printf("       DSAForge: Array ADT in C99         \\n");
    printf("==========================================\\n\\n");

    insert(&arr, 0, 10);
    insert(&arr, 1, 20);
    insert(&arr, 2, 40);
    insert(&arr, 2, 30); // Insert 30 between 20 and 40 (shifts 40 right)
    display(&arr);

    printf("Element at index 2: %d\\n", get(&arr, 2));

    set(&arr, 0, 99); // Update index 0
    display(&arr);

    delete(&arr, 1); // Delete element at index 1 (20)
    display(&arr);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Operating System Memory Page Tables',
        category: 'Operating Systems',
        system: 'Linux MMU Virtual Memory Paging',
        description: 'Page tables are implemented as Array ADTs where Virtual Page Numbers (VPN) serve as direct indices.',
        bullets: [
          'The MMU hardware maps VPN to Physical Frame Number in O(1) time via direct array indexing.',
          'Ensures address translation completes within single-digit nanoseconds.'
        ]
      },
      {
        title: 'CPU L1/L2 Cache Direct-Mapped Lines',
        category: 'Computer Architecture',
        system: 'Hardware Cache Controllers',
        description: 'Cache lines are structured as fixed-size homogeneous array banks.',
        bullets: [
          'Cache line index extracted directly from memory address bits enables instantaneous hardware indexing.'
        ]
      },
      {
        title: 'High-Frequency Financial Order Books',
        category: 'FinTech Software',
        system: 'LMAX Disruptor & Ring Buffers',
        description: 'High-throughput trading systems utilize circular Array ADTs for lock-free inter-thread communication.',
        bullets: [
          'Fixed capacity circular arrays avoid garbage collection pauses and memory fragmentation.',
          'Provides microsecond-level order placement latency.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Array ADT Operations Complexity Matrix',
      summary:
        'Complexity depends strictly on the operation and element position. Access is always O(1), while insertion and deletion require O(n) shifting in the general case.',
      rows: [
        {
          operation: 'Access by Index (get)',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Direct address computation via base pointer.'
        },
        {
          operation: 'Update by Index (set)',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Direct memory overwrite without moving other elements.'
        },
        {
          operation: 'Insertion at End (append)',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Assumes allocated spare capacity exists in array.'
        },
        {
          operation: 'Insertion at Index 0 / Middle',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Requires shifting existing elements right to create a slot.'
        },
        {
          operation: 'Deletion at End',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Simply decrement size counter.'
        },
        {
          operation: 'Deletion at Index 0 / Middle',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Requires shifting subsequent elements left to close the gap.'
        },
        {
          operation: 'Linear Search (unsorted)',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Scans elements sequentially until match is found.'
        },
        {
          operation: 'Binary Search (pre-sorted)',
          timeComplexity: 'O(log n) Logarithmic',
          spaceComplexity: 'O(1)',
          notes: 'Requires array elements to be maintained in sorted order.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'adt-q1',
        difficulty: 'Easy',
        question: 'What is the fundamental difference between an Abstract Data Type (ADT) and a Data Structure?',
        options: [
          'An ADT defines WHAT operations can be performed, while a Data Structure defines HOW they are physically implemented',
          'ADTs are only used in Python, while Data Structures are used in C',
          'An ADT is always slower than a Data Structure',
          'There is no difference; the terms are completely identical'
        ],
        correctAnswer: 0,
        explanation: 'An ADT is a theoretical interface and mathematical model specifying operations and invariants. A Data Structure is the concrete physical implementation in code.',
        conceptRef: 'ADT vs Data Structure'
      },
      {
        id: 'adt-q2',
        difficulty: 'Easy',
        question: 'Which characteristic of the Array ADT enables O(1) constant-time access to any element?',
        options: [
          'Dynamic memory expansion',
          'Random access via index arithmetic on contiguous memory',
          'Pointer linked lists',
          'Recursive traversal'
        ],
        correctAnswer: 1,
        explanation: 'Random access allows computing the exact memory address directly from the index in O(1) time without sequential searching.',
        conceptRef: 'Random Access Property'
      },
      {
        id: 'adt-q3',
        difficulty: 'Medium',
        question: 'Why does inserting an element at index 0 of an Array ADT of size N require O(N) time complexity?',
        options: [
          'Because arrays cannot store numbers at index 0',
          'Because all N existing elements must be shifted one position to the right to maintain contiguous layout',
          'Because the CPU must reboot the memory bus',
          'Because binary search is required before insertion'
        ],
        correctAnswer: 1,
        explanation: 'Arrays require contiguous storage without gaps. Inserting at index 0 requires copying/shifting all N existing elements right by one index.',
        conceptRef: 'Array Shifting Mechanism'
      },
      {
        id: 'adt-q4',
        difficulty: 'Hard',
        question: 'Which of the following operations on an Array ADT has O(1) worst-case time complexity?',
        options: [
          'Searching for a key in an unsorted array',
          'Deleting an element from index 0',
          'Accessing an element by its index',
          'Inserting an element at index 0'
        ],
        correctAnswer: 2,
        explanation: 'Access by index is computed via Base + (index * size) in O(1) constant time in all cases.',
        conceptRef: 'Operation Complexity'
      }
    ]
  },

  'top-203': {
    id: 'top-203',
    title: 'Programming Array in C',
    sidebarTitle: 'Programming Array in C',
    complexity: 'Easy',
    unitCode: 'Unit 2: Array',
    courseCode: 'SECE2221 / SECE2291',
    description:
      'Hands-on C99 implementation: declaration, compile-time/runtime initialization, traversal, element input/output, function passing, searching, and sorting.',
    concepts: [
      {
        name: 'Declaration and Initialization in C',
        source: 'PDF Primary Source',
        definition:
          'Declaring allocates fixed space in the stack frame; initialization assigns initial values to those allocated slots.',
        example: `// Declaration (uninitialized garbage values)
int arr[5];

// Initialization with list
int arr[5] = {1, 2, 3, 4, 5};

// Partial initialization (remaining elements zeroed)
int arr[5] = {10, 20}; // {10, 20, 0, 0, 0}`,
        usage: 'Baseline syntax required for all C array programming.',
        asciiDiagram: `int arr[5] = {1, 2, 3, 4, 5};
Memory: [ 1 | 2 | 3 | 4 | 5 ]`
      },
      {
        name: 'Access and Traversal',
        source: 'PDF Primary Source',
        definition:
          'Accessing retrieves a value via subscript notation arr[i]. Traversal systematically visits each element in order using a loop.',
        example: `// Access
printf("%d", arr[2]); // Prints 3

// Traversal
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
}`,
        usage: 'Displaying arrays, computing statistics (sum, max, min, average), and filtering values.',
        asciiDiagram: `Loop i = 0 to 4:
i=0 -> arr[0]=1
i=1 -> arr[1]=2
i=2 -> arr[2]=3
i=3 -> arr[3]=4
i=4 -> arr[4]=5`
      },
      {
        name: 'Passing Arrays to Functions (Pointer Decay)',
        source: 'Verified Academic Extension',
        definition:
          'In C, when an array is passed to a function, it decays into a pointer to its first element (&arr[0]). The function receives a pointer and has no built-in knowledge of the array size; thus, the size must be passed explicitly as a separate parameter.',
        example: 'void printArray(const int arr[], int n); or void printArray(const int *arr, int n);',
        usage: 'Crucial for writing modular, reusable C functions and preventing stack buffer overruns.',
        asciiDiagram: `Caller: arr[5] (Full 20-byte block) ──(Decays into pointer)──> Callee: int *arr (8-byte pointer)`
      }
    ],
    cCode: {
      filename: 'programming_arrays_complete.c',
      description: 'Comprehensive C99 suite featuring traversal, input/output, linear search, insertion, and bubble sort.',
      code: `#include <stdio.h>

#define MAX_SIZE 10

// 1. Function to Display Array Elements (Traversal from PDF)
void printArray(const int arr[], int n) {
    printf("[Array Traversal]: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("(Total: %d elements)\\n", n);
}

// 2. Linear Search Implementation
int linearSearch(const int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i; // Found at index i
    }
    return -1; // Target not found
}

// 3. Array Insertion at Position
int insertElement(int arr[], int *n, int pos, int value) {
    if (*n >= MAX_SIZE) {
        printf("[Error] Array is full!\\n");
        return 0;
    }
    if (pos < 0 || pos > *n) {
        printf("[Error] Invalid position!\\n");
        return 0;
    }
    for (int i = *n - 1; i >= pos; i--) {
        arr[i + 1] = arr[i]; // Shift right
    }
    arr[pos] = value;
    (*n)++;
    return 1;
}

// 4. Bubble Sort
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

int main(void) {
    // Official program from course PDF:
    int numbers[MAX_SIZE] = {10, 20, 30, 40, 50};
    int n = 5;

    printf("==========================================\\n");
    printf("   Course PDF: Programming Array in C    \\n");
    printf("==========================================\\n\\n");

    // Display initial array
    printArray(numbers, n);

    // Demonstrate access
    printf("Accessing numbers[2]: %d\\n", numbers[2]);

    // Demonstrate update
    numbers[2] = 99;
    printf("Updated numbers[2] to 99\\n");
    printArray(numbers, n);

    // Demonstrate Linear Search
    int target = 99;
    int foundIdx = linearSearch(numbers, n, target);
    printf("Search for %d: Found at index %d\\n", target, foundIdx);

    // Demonstrate Insertion
    insertElement(numbers, &n, 1, 15);
    printf("Inserted 15 at index 1\\n");
    printArray(numbers, n);

    // Demonstrate Bubble Sort
    bubbleSort(numbers, n);
    printf("After Bubble Sort (Ascending):\\n");
    printArray(numbers, n);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Embedded Sensor Sampling in C',
        category: 'Firmware Development',
        system: 'FreeRTOS & Embedded Systems',
        description: 'Reading ADC analog sensor data in a microcontroller sampling loop.',
        bullets: [
          'int adc_samples[64]; collects analog sensor voltages over 64 clock cycles.',
          'Passing arrays to digital filtering routines computes moving averages in real-time.'
        ]
      },
      {
        title: 'Linux Kernel Command-Line Argument Parser',
        category: 'Operating Systems',
        system: 'C Standard Library (argc / argv)',
        description: 'Command line parameters are passed into main() as an array of character pointers (strings).',
        bullets: [
          'char *argv[] represents an array where each entry points to an individual argument string.'
        ]
      },
      {
        title: 'Cryptographic Hash Block Buffers',
        category: 'Cybersecurity',
        system: 'OpenSSL SHA-256 Engine',
        description: 'SHA-256 digests operate on fixed 64-byte (512-bit) message block arrays in C.',
        bullets: [
          'uint8_t buffer[64] processes hash rounds using bitwise operations directly across array elements.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'C Array Programming Complexity Matrix',
      summary:
        'C arrays offer optimal speed due to zero runtime abstraction overhead. Bounds checking is the responsibility of the programmer.',
      rows: [
        {
          operation: 'Direct Element Access (arr[i])',
          timeComplexity: 'O(1) Constant (1 CPU instruction)',
          spaceComplexity: 'O(1)',
          notes: 'Translates directly to single MOV instruction with base+offset.'
        },
        {
          operation: 'Loop Traversal (for loop)',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Visits all n items sequentially in memory order.'
        },
        {
          operation: 'Linear Search in C',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Scans until element is matched or array ends.'
        },
        {
          operation: 'Bubble Sort in C',
          timeComplexity: 'O(n^2) Quadratic',
          spaceComplexity: 'O(1) In-place',
          notes: 'Compares adjacent pairs through nested loops.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'c-q1',
        difficulty: 'Easy',
        question: 'What is the output of the following C code: int a[4] = {5, 10, 15, 20}; printf("%d", a[1]);',
        options: ['5', '10', '15', '20'],
        correctAnswer: 1,
        explanation: 'Due to zero-based indexing, a[0] = 5 and a[1] = 10.',
        conceptRef: 'C Array Subscripting'
      },
      {
        id: 'c-q2',
        difficulty: 'Easy',
        question: 'When passing an array to a function in C (e.g., void print(int arr[], int n)), what actually gets passed?',
        options: [
          'A complete clone of the entire array data in memory',
          'A pointer to the first element of the array (&arr[0])',
          'The total byte size of the array automatically',
          'A compiler error unless the size is in the brackets'
        ],
        correctAnswer: 1,
        explanation: 'In C, array names decay into pointers to their first element when passed as function arguments.',
        conceptRef: 'Pointer Decay'
      },
      {
        id: 'c-q3',
        difficulty: 'Medium',
        question: 'What happens if you initialize an array as int arr[5] = {1, 2}; in C99?',
        options: [
          'The remaining elements arr[2], arr[3], arr[4] will contain random garbage values',
          'The compiler throws a syntax error because not all 5 elements are specified',
          'The remaining elements are automatically initialized to 0',
          'The array automatically shrinks to size 2'
        ],
        correctAnswer: 2,
        explanation: 'In C99, if an initializer list is shorter than the array size, all uninitialized elements are set to zero.',
        conceptRef: 'Partial Initialization'
      },
      {
        id: 'c-q4',
        difficulty: 'Hard',
        question: 'Why does C not prevent accessing arr[10] when int arr[5] was declared?',
        options: [
          'C performs automatic array bounds checking at runtime',
          'C prioritizes execution speed and omits automatic bounds checking; accessing out of bounds causes undefined behavior',
          'C automatically reallocates memory up to index 10',
          'Array indices in C wrap around cyclically'
        ],
        correctAnswer: 1,
        explanation: 'C does not perform runtime array bounds checking to maximize execution speed. Out-of-bounds access leads to undefined behavior or memory access violations (segmentation fault).',
        conceptRef: 'Array Bounds & Undefined Behavior'
      }
    ]
  },

  'top-204': {
    id: 'top-204',
    title: 'Sparse Matrices, Sparse Representations, and its Advantages',
    sidebarTitle: 'Sparse Matrices & Advantages',
    complexity: 'Easy',
    unitCode: 'Unit 2: Array',
    courseCode: 'SECE2221 / SECE2291',
    description:
      'Understanding Sparse Matrices where most elements are zero, triplet representation (row, col, value), memory savings, advantages, and limitations.',
    concepts: [
      {
        name: 'Sparse Matrix Definition',
        source: 'PDF Primary Source',
        definition:
          'A matrix is said to be sparse if a significant majority of its elements are zero.',
        example: `[ 0  0  0  5 ]
[ 0  8  0  0 ]
[ 0  0  0  0 ]
(A 3x4 matrix: total 12 elements, but only 2 non-zero elements!)`,
        usage: 'Graph adjacency representations, finite element scientific simulations, image edge maps, and neural network weight matrices.',
        asciiDiagram: `Normal 3x4 Dense Matrix (12 integers = 48 bytes allocated):
[ 0   0   0   5 ]   <-- Only two values: 5 and 8
[ 0   8   0   0 ]   <-- 10 out of 12 cells are useless zeros!
[ 0   0   0   0 ]`
      },
      {
        name: 'Triplet Representation',
        source: 'PDF Primary Source',
        definition:
          'A compact representation where only non-zero elements are stored together with their row index, column index, and value: (row, column, value).',
        example: `Row 0:  Row 0, Col 3, Value 5
Row 1:  Row 1, Col 1, Value 8`,
        usage: 'Reduces memory from O(M * N) down to O(non_zeros), saving massive storage in large-scale computation.',
        asciiDiagram: `Triplet Format:
Row Index | Column Index | Value
    0     |      3       |   5
    1     |      1       |   8`
      },
      {
        name: 'Metadata Header (Row 0 Convention)',
        source: 'Verified Academic Extension',
        definition:
          'In standard data structure implementations (Tanenbaum / Horowitz), the first row (index 0) of the triplet matrix is often used to store matrix metadata: total rows, total columns, and total non-zero elements.',
        example: 'Row 0: (Total Rows: 3, Total Cols: 4, Non-Zeros: 2)',
        usage: 'Enables matrix algorithms (transposition, addition, multiplication) to know boundary dimensions without external variables.',
        asciiDiagram: `Row 0 [ Total Rows: 3 | Total Cols: 4 | Non-Zero Count: 2 ]
Row 1 [ Row: 0        | Col: 3        | Value: 5           ]
Row 2 [ Row: 1        | Col: 1        | Value: 8           ]`
      },
      {
        name: 'Advantages and Limitations from PDF',
        source: 'PDF Primary Source',
        definition:
          'Memory efficiency and computational speedup vs. algorithmic complexity overhead.',
        example: `Advantages:
- Memory efficient: Massive space savings when matrix is mostly zero.
- Saves space in RAM and disk storage.
- Improves processing time: Algorithms only iterate over non-zero entries.
- Essential for large applications: Web graphs, scientific computing, image processing.

Limitations:
- Element access is more complicated (requires searching triplets).
- Not useful if matrix is dense (triplet overhead requires 3x storage per element).`,
        usage: 'Deciding whether to use a standard 2D array or a sparse matrix representation.',
        asciiDiagram: `Dense: Storage = M * N
Sparse Triplet: Storage = 3 * non_zero_elements`
      }
    ],
    comparisonTable: {
      header1: 'Dense Matrix (Standard 2D Array)',
      header2: 'Sparse Matrix (Triplet Representation)',
      rows: [
        {
          aspect: 'Definition',
          col1: 'Matrix where majority of elements are non-zero.',
          col2: 'Matrix where majority of elements are zero.'
        },
        {
          aspect: 'Storage Model',
          col1: 'Stores every element including zeros: M * N slots.',
          col2: 'Stores only non-zero elements: 3 * K slots (row, col, val).'
        },
        {
          aspect: 'Space Complexity',
          col1: 'O(M * N) fixed storage.',
          col2: 'O(K) where K = count of non-zero elements.'
        },
        {
          aspect: 'Element Access',
          col1: 'Direct O(1) random access via matrix[r][c].',
          col2: 'O(K) search through triplets or O(log K) binary search.'
        },
        {
          aspect: 'Best Use Case',
          col1: 'Matrices where most values contain useful data (>30% non-zero).',
          col2: 'Large matrices where >80% of values are zero.'
        }
      ]
    },
    cCode: {
      filename: 'sparse_matrix_triplet.c',
      description: 'C99 Demonstration of converting a dense matrix into Triplet Sparse Matrix representation.',
      code: `#include <stdio.h>

#define ROWS 3
#define COLS 4
#define MAX_TRIPLETS 10

// Triplet Element Structure: (row, column, value)
typedef struct {
    int row;
    int col;
    int value;
} Element;

// Function to convert Dense Matrix to Triplet Representation
int convertToSparse(const int dense[ROWS][COLS], Element sparse[]) {
    int k = 0;
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS; c++) {
            if (dense[r][c] != 0) {
                sparse[k].row = r;
                sparse[k].col = c;
                sparse[k].value = dense[r][c];
                k++;
            }
        }
    }
    return k; // Returns total non-zero elements
}

int main(void) {
    // Official example from course PDF:
    // [0 0 0 5]
    // [0 8 0 0]
    // [0 0 0 0]
    int denseMatrix[ROWS][COLS] = {
        {0, 0, 0, 5},
        {0, 8, 0, 0},
        {0, 0, 0, 0}
    };

    printf("==========================================\\n");
    printf("     Course PDF: Sparse Matrix Demo       \\n");
    printf("==========================================\\n\\n");

    printf("Original Dense Matrix (3x4 = 12 elements):\\n");
    for (int r = 0; r < ROWS; r++) {
        printf("  [ ");
        for (int c = 0; c < COLS; c++) {
            printf("%d ", denseMatrix[r][c]);
        }
        printf("]\\n");
    }

    Element sparse[MAX_TRIPLETS];
    int nonZeroCount = convertToSparse(denseMatrix, sparse);

    printf("\\nMemory Footprint Comparison:\\n");
    printf("  Dense Matrix Storage   : 12 integers = %zu bytes\\n", 12 * sizeof(int));
    printf("  Sparse Triplet Storage : %d triplets = %zu bytes\\n",
           nonZeroCount, nonZeroCount * sizeof(Element));

    printf("\\nTriplet Representation (Row, Column, Value):\\n");
    printf("+-------+-------+-------+\\n");
    printf("|  Row  |  Col  | Value |\\n");
    printf("+-------+-------+-------+\\n");
    for (int i = 0; i < nonZeroCount; i++) {
        printf("|   %d   |   %d   |   %d   |\\n",
               sparse[i].row, sparse[i].col, sparse[i].value);
    }
    printf("+-------+-------+-------+\\n");

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Social Network Connection Graphs',
        category: 'Graph Computing',
        system: 'Facebook / Twitter Social Graphs',
        description: 'With 1 billion users, an adjacency matrix would require 10^18 cells (exabytes of RAM!).',
        bullets: [
          'Because the average user has only ~500 friends, 99.999% of the matrix is zero.',
          'Sparse matrix representation enables storing the entire worldwide social graph inside practical memory clusters.'
        ]
      },
      {
        title: 'Google PageRank & Web Search Link Matrix',
        category: 'Information Retrieval',
        system: 'Google PageRank Algorithm',
        description: 'Web hyperlinking creates an adjacency matrix of billions of web pages.',
        bullets: [
          'A web page links to only a few dozen other pages, making the link matrix 99.9999% sparse.',
          'Eigenvector computation runs orders of magnitude faster using sparse representation.'
        ]
      },
      {
        title: 'Finite Element Analysis (FEA) Structural Simulation',
        category: 'Mechanical Engineering',
        system: 'ANSYS & Aircraft Wing Stress Simulation',
        description: 'Simulating physical stress, heat distribution, and fluid dynamics on 3D meshes.',
        bullets: [
          'Each 3D node interacts only with immediate physical neighbors, generating massive sparse stiffness matrices.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Sparse vs Dense Complexity Trade-Offs',
      summary:
        'Sparse matrices trade instant O(1) random access for dramatic memory compression when non-zero elements are scarce.',
      rows: [
        {
          operation: 'Memory Storage for M x N Matrix with K Non-Zeros',
          timeComplexity: 'Dense: O(M * N) | Sparse: O(K)',
          spaceComplexity: 'Dense: M * N ints | Sparse: 3 * K ints',
          notes: 'Space savings occur when 3 * K < M * N (sparsity > ~67%).'
        },
        {
          operation: 'Element Lookup at (row, col)',
          timeComplexity: 'Dense: O(1) | Sparse: O(K) linear / O(log K) binary',
          spaceComplexity: 'O(1)',
          notes: 'Dense calculates offset directly; Sparse must search triplet list.'
        },
        {
          operation: 'Sparse Matrix Transposition',
          timeComplexity: 'O(K log K) or O(Cols + K) Fast Transpose',
          spaceComplexity: 'O(K)',
          notes: 'Swaps row and column values and sorts by new row index.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'sp-q1',
        difficulty: 'Easy',
        question: 'According to the course syllabus, what is the definition of a Sparse Matrix?',
        options: [
          'A matrix containing only negative numbers',
          'A matrix in which most of the elements are zero',
          'A matrix with equal rows and columns',
          'A matrix stored in column-major order'
        ],
        correctAnswer: 1,
        explanation: 'The course PDF explicitly defines a Sparse Matrix as "a matrix in which most of the elements are zero."',
        conceptRef: 'Sparse Matrix Definition'
      },
      {
        id: 'sp-q2',
        difficulty: 'Easy',
        question: 'In the Triplet Representation of a sparse matrix, what three values are recorded for each non-zero entry?',
        options: [
          '(row, column, value)',
          '(base_address, offset, pointer)',
          '(length, breadth, height)',
          '(index, key, memory_tag)'
        ],
        correctAnswer: 0,
        explanation: 'Each non-zero element in triplet representation is uniquely identified by (row, column, value).',
        conceptRef: 'Triplet Format'
      },
      {
        id: 'sp-q3',
        difficulty: 'Medium',
        question: 'Consider the matrix from the PDF: [[0, 0, 0, 5], [0, 8, 0, 0], [0, 0, 0, 0]]. What is its triplet representation?',
        options: [
          '(0, 3, 5) and (1, 1, 8)',
          '(0, 0, 0) and (3, 4, 12)',
          '(5, 0, 3) and (8, 1, 1)',
          '(1, 4, 5) and (2, 2, 8)'
        ],
        correctAnswer: 0,
        explanation: 'The value 5 is located at Row 0, Col 3 -> (0, 3, 5). The value 8 is located at Row 1, Col 1 -> (1, 1, 8).',
        conceptRef: 'Matrix to Triplet Conversion'
      },
      {
        id: 'sp-q4',
        difficulty: 'Hard',
        question: 'When is using a Sparse Matrix triplet representation disadvantageous compared to a normal 2D array?',
        options: [
          'When the matrix has thousands of rows',
          'When the matrix is dense (contains mostly non-zero values)',
          'When performing scientific calculations',
          'When the matrix contains floating-point numbers'
        ],
        correctAnswer: 1,
        explanation: 'If a matrix is dense, storing three integers (row, col, value) per element requires 3x more memory than a standard 2D array, negating any advantage.',
        conceptRef: 'Sparse Matrix Limitations'
      }
    ]
  },

  'top-205': {
    id: 'top-205',
    title: 'Row-major Order and Column-major Order Representation',
    sidebarTitle: 'Row & Column Major Order',
    complexity: 'Easy',
    unitCode: 'Unit 2: Array',
    courseCode: 'SECE2221 / SECE2291',
    description:
      'Understanding how 2D multidimensional matrices are flattened into 1D linear physical memory: Row-major order (C) vs Column-major order (Fortran), address calculation formulas, and CPU cache performance implications.',
    concepts: [
      {
        name: 'Row-Major Order',
        source: 'PDF Primary Source',
        definition:
          'Elements are stored row by row sequentially in contiguous physical memory. All elements of the first row are placed first, followed immediately by all elements of the second row, and so forth.',
        example: `Matrix:
[ 1  2 ]
[ 3  4 ]

Physical Memory Order: 1, 2, 3, 4`,
        usage: 'Default memory layout used by C, C++, Python (NumPy default), Java, and C#.',
        asciiDiagram: `Matrix: [ 1  2 ]
        [ 3  4 ]

Row 0: [ 1 ][ 2 ] ──> Row 1: [ 3 ][ 4 ]
Physical Memory: [ 1 | 2 | 3 | 4 ]`
      },
      {
        name: 'Column-Major Order',
        source: 'PDF Primary Source',
        definition:
          'Elements are stored column by column sequentially in contiguous physical memory. All elements of the first column are placed first, followed immediately by all elements of the second column.',
        example: `Matrix:
[ 1  2 ]
[ 3  4 ]

Physical Memory Order: 1, 3, 2, 4`,
        usage: 'Default memory layout used by Fortran, MATLAB, R, and Julia.',
        asciiDiagram: `Matrix: [ 1  2 ]
        [ 3  4 ]

Col 0: [ 1 ][ 3 ] ──> Col 1: [ 2 ][ 4 ]
Physical Memory: [ 1 | 3 | 2 | 4 ]`
      },
      {
        name: 'Row-Major Address Calculation Formula',
        source: 'PDF Primary Source',
        definition:
          'Computes the exact memory address of element A[i][j] in a 0-indexed 2D array of size M rows and N columns, where S is the element size in bytes.',
        example: `Formula:
Address(A[i][j]) = Base + (i * N + j) * S

Where:
- Base = Address of A[0][0]
- i    = Target row index (skips i complete rows of N elements)
- N    = Total number of columns per row
- j    = Target column index
- S    = Size of each element in bytes (sizeof(type))`,
        usage: 'Executed by C/C++ compilers to translate multidimensional array lookups into single pointer machine instructions.',
        asciiDiagram: `Address(A[i][j]) = Base + ((i * N) + j) * S`
      },
      {
        name: 'Column-Major Address Calculation Formula',
        source: 'PDF Primary Source',
        definition:
          'Computes the exact memory address of element A[i][j] in a 0-indexed 2D array of size M rows and N columns when organized in column-major order.',
        example: `Formula:
Address(A[i][j]) = Base + (j * M + i) * S

Where:
- Base = Address of A[0][0]
- j    = Target column index (skips j complete columns of M elements)
- M    = Total number of rows per column
- i    = Target row index
- S    = Size of each element in bytes`,
        usage: 'Employed by Fortran and MATLAB runtime compilers for linear address resolution.',
        asciiDiagram: `Address(A[i][j]) = Base + ((j * M) + i) * S`
      },
      {
        name: 'Hardware Cache Locality & Performance Impact',
        source: 'Verified Academic Extension',
        definition:
          'CPUs fetch data in 64-byte chunks called cache lines. In C (Row-Major), traversing row-wise accesses consecutive addresses within the same cache line (Spatial Locality), maximizing performance. Column-wise traversal in C jumps N*S bytes per step, causing severe CPU cache misses and slowing execution by up to 10x.',
        example: 'In C: for(i) for(j) matrix[i][j] (fast) vs for(j) for(i) matrix[i][j] (slow).',
        usage: 'High-performance computing (HPC), matrix multiplication kernels, and deep learning algorithms.',
        asciiDiagram: `Row-Major Traversal in C:    [ 1 ][ 2 ][ 3 ][ 4 ] (Stride-1: Hits L1 CPU Cache!)
Column-Major Traversal in C: [ 1 ] ──jump──> [ 3 ] (Stride-N: Cache Miss!)`
      }
    ],
    comparisonTable: {
      header1: 'Row-Major Order (C Style)',
      header2: 'Column-Major Order (Fortran Style)',
      rows: [
        {
          aspect: 'Arrangement',
          col1: 'Elements stored row by row sequentially.',
          col2: 'Elements stored column by column sequentially.'
        },
        {
          aspect: 'Primary Languages',
          col1: 'C, C++, Python (NumPy default), Java, C#.',
          col2: 'Fortran, MATLAB, R, Julia.'
        },
        {
          aspect: '2x2 Matrix Example: [[1,2],[3,4]]',
          col1: 'Linear sequence: 1, 2, 3, 4',
          col2: 'Linear sequence: 1, 3, 2, 4'
        },
        {
          aspect: '0-Indexed Address Formula',
          col1: 'Base + (i * N + j) * S',
          col2: 'Base + (j * M + i) * S'
        },
        {
          aspect: 'Dimension Dependency',
          col1: 'Requires knowing total Columns (N).',
          col2: 'Requires knowing total Rows (M).'
        },
        {
          aspect: 'Optimal C Loop Order',
          col1: 'Outer loop: rows (i), Inner loop: cols (j)',
          col2: 'Outer loop: cols (j), Inner loop: rows (i)'
        }
      ]
    },
    cCode: {
      filename: 'row_vs_column_major.c',
      description: 'C99 Demonstration of Row-Major physical layout and custom Column-Major simulation.',
      code: `#include <stdio.h>

#define ROWS 2
#define COLS 3

int main(void) {
    // 2x3 Matrix
    int matrix[ROWS][COLS] = {
        {10, 20, 30},
        {40, 50, 60}
    };

    printf("==========================================\\n");
    printf("   ROW-MAJOR ORDER IN C (Physical RAM)    \\n");
    printf("==========================================\\n\\n");

    printf("Logical Matrix (2 Rows x 3 Columns):\\n");
    printf("  Row 0: [ 10  20  30 ]\\n");
    printf("  Row 1: [ 40  50  60 ]\\n\\n");

    // Treat matrix memory as a continuous 1D raw pointer to inspect physical order
    int *raw_ptr = (int*)matrix;
    printf("Physical 1D RAM Order (Row by Row in C):\\n");
    for (int i = 0; i < ROWS * COLS; i++) {
        printf("Slot [%d]: Value = %d (Address: %p)\\n",
               i, raw_ptr[i], (void*)&raw_ptr[i]);
    }

    printf("\\nVerifying Address Formula for matrix[1][2]:\\n");
    int r = 1, c = 2, S = sizeof(int);
    int calculated_offset = (r * COLS + c) * S;
    int *calculated_address = (int*)((char*)matrix + calculated_offset);
    printf("Base Address (&matrix[0][0])  : %p\\n", (void*)matrix);
    printf("Formula: Base + (1 * 3 + 2) * 4 = Base + %d bytes\\n", calculated_offset);
    printf("Calculated Address              : %p\\n", (void*)calculated_address);
    printf("Actual &matrix[1][2]            : %p\\n", (void*)&matrix[1][2]);
    printf("Value at that address           : %d\\n\\n", *calculated_address);

    printf("==========================================\\n");
    printf("   COLUMN-MAJOR ORDER (Fortran / MATLAB)  \\n");
    printf("==========================================\\n");
    printf("If stored in Column-Major order, physical RAM would be:\\n");
    // Column 0: (0,0)=10, (1,0)=40
    // Column 1: (0,1)=20, (1,1)=50
    // Column 2: (0,2)=30, (1,2)=60
    int col_major_sequence[ROWS * COLS] = {10, 40, 20, 50, 30, 60};
    for (int i = 0; i < ROWS * COLS; i++) {
        printf("Slot [%d]: %d  ", i, col_major_sequence[i]);
    }
    printf("\\n");

    return 0;
}`
    },
    realWorld: [
      {
        title: 'BLAS & LAPACK Linear Algebra Libraries',
        category: 'High-Performance Computing',
        system: 'OpenBLAS, Intel MKL, cuBLAS',
        description: 'Standard numerical packages originally written in Fortran using Column-Major order.',
        bullets: [
          'Modern C/C++ applications calling BLAS functions (like cblas_dgemm) must explicitly specify CblasRowMajor vs CblasColMajor.',
          'Choosing the wrong order triggers expensive matrix transpositions or incorrect calculation.'
        ]
      },
      {
        title: 'GPU Tensor Cores & Deep Learning Frameworks',
        category: 'Artificial Intelligence',
        system: 'PyTorch & NVIDIA TensorRT',
        description: 'Matrix multiplication kernels in GPUs require coalesced global memory transactions.',
        bullets: [
          'Matching thread warp dimensions to row-major or column-major matrix layouts maximizes memory bus throughput by 8x.'
        ]
      },
      {
        title: 'Cross-Language Interoperability (C and Python/MATLAB)',
        category: 'Data Science',
        system: 'NumPy C-API & MATLAB MEX files',
        description: 'Passing 2D matrices between Python/C and MATLAB.',
        bullets: [
          'NumPy supports both flags: order="C" (row-major) and order="F" (Fortran column-major).',
          'Zero-copy memory sharing requires aligning contiguous memory flags across language boundaries.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Memory Layout & Cache Performance Complexity',
      summary:
        'Both Row-Major and Column-Major allow O(1) mathematical address calculation. The critical difference lies in CPU hardware cache line efficiency.',
      rows: [
        {
          operation: 'Row-Major 0-Indexed Address Lookup',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Single multiply-add operation: Base + (i * N + j) * S.'
        },
        {
          operation: 'Column-Major 0-Indexed Address Lookup',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Single multiply-add operation: Base + (j * M + i) * S.'
        },
        {
          operation: 'Row-Wise Traversal in C (Row-Major)',
          timeComplexity: 'O(M * N) with ~95% L1 Cache Hit Rate',
          spaceComplexity: 'O(1)',
          notes: 'Sequential memory addresses utilize 64-byte hardware cache lines perfectly.'
        },
        {
          operation: 'Column-Wise Traversal in C (Row-Major)',
          timeComplexity: 'O(M * N) with ~70% Cache Misses',
          spaceComplexity: 'O(1)',
          notes: 'Jumping N elements per step causes repeated cache line reloads (up to 10x slower).'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'rc-q1',
        difficulty: 'Easy',
        question: 'Which programming language uses Row-Major order as its standard memory representation for 2D arrays?',
        options: ['Fortran', 'MATLAB', 'C', 'R'],
        correctAnswer: 2,
        explanation: 'C (along with C++, Python, and Java) uses Row-Major order. Fortran, MATLAB, and R use Column-Major order.',
        conceptRef: 'Row-Major Languages'
      },
      {
        id: 'rc-q2',
        difficulty: 'Easy',
        question: 'In Row-Major order, how is the 2x2 matrix [[1, 2], [3, 4]] stored linearly in physical memory?',
        options: [
          '1, 2, 3, 4',
          '1, 3, 2, 4',
          '4, 3, 2, 1',
          '2, 1, 4, 3'
        ],
        correctAnswer: 0,
        explanation: 'Row-major stores Row 0 first (1, 2), then Row 1 (3, 4) -> 1, 2, 3, 4.',
        conceptRef: 'Row-Major Linearization'
      },
      {
        id: 'rc-q3',
        difficulty: 'Medium',
        question: 'In Column-Major order, how is the same 2x2 matrix [[1, 2], [3, 4]] stored linearly in physical memory?',
        options: [
          '1, 2, 3, 4',
          '1, 3, 2, 4',
          '2, 4, 1, 3',
          '3, 1, 4, 2'
        ],
        correctAnswer: 1,
        explanation: 'Column-major stores Column 0 first (1, 3), then Column 1 (2, 4) -> 1, 3, 2, 4.',
        conceptRef: 'Column-Major Linearization'
      },
      {
        id: 'rc-q4',
        difficulty: 'Hard',
        question: 'Given an array A[4][5] stored in Row-Major order starting at Base Address 1000, where each element takes 2 bytes. What is the address of A[2][3]?',
        options: ['1016', '1026', '1030', '1046'],
        correctAnswer: 1,
        explanation: 'Address = Base + (i * Total_Cols + j) * Size = 1000 + (2 * 5 + 3) * 2 = 1000 + (10 + 3) * 2 = 1000 + 26 = 1026.',
        conceptRef: 'Row-Major Address Calculation'
      }
    ]
  }
};
