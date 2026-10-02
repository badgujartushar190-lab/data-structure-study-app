// Chapter 1 Data Model: SECE2291 - Unit 1: Introduction to Data Structures
// Primary Source: Course Material SECE2291 (PPSU) - Unit 1: Introduction to Data Structures
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

export const chapter1Topics: Record<string, TopicData> = {
  'top-101': {
    id: 'top-101',
    title: 'Basic Terminology',
    sidebarTitle: 'Basic Terminology',
    complexity: 'Easy',
    unitCode: 'Unit 1: Introduction to Data Structures',
    courseCode: 'SECE2291',
    description:
      'Fundamental vocabulary forming the bedrock of Computer Science: Data, Data Structures, Elements, Fields, Records, Files, and essential data attributes.',
    concepts: [
      {
        name: 'Data',
        source: 'PDF Primary Source',
        definition: 'Raw facts and figures without inherent context or processing.',
        example: 'The integer 42, the string "Alice", or raw temperature reading 36.6.',
        usage: 'Representing baseline input values collected from sensors, keyboards, or network streams.',
        asciiDiagram: `[ Raw Fact: "42" ]  ──(processed into context)──>  [ Meaning: "Room Temperature: 42°C" ]`
      },
      {
        name: 'Data Structure',
        source: 'PDF Primary Source',
        definition: 'A way of organizing and storing data so that it can be accessed and modified efficiently.',
        example: 'An array of student marks, a stack of browser history URLs, or a tree of folders.',
        usage: 'Designing scalable algorithms, minimizing computational time, and optimizing memory consumption.',
        asciiDiagram: `Data Elements + Defined Relationships + Legal Operations = Data Structure`
      },
      {
        name: 'Element',
        source: 'PDF Primary Source',
        definition: 'A single data item stored in a data structure.',
        example: 'The number 25 stored at arr[2], or an individual character \'c\' in a string.',
        usage: 'The indivisible atomic or compound unit being retrieved, updated, or manipulated.',
        asciiDiagram: `Array: [ 10 | 20 | [30] | 40 ]  ──> [30] is a single Element`
      },
      {
        name: 'Field',
        source: 'PDF Primary Source',
        definition: 'A part of a record that holds a single data item representing a specific attribute.',
        example: 'roll_no, student_name, or account_balance within a customer record.',
        usage: 'Constituent atomic member of a composite record (e.g., struct member in C).',
        asciiDiagram: `+--------------------+-----------------------+---------------------+
| Field 1: roll_no   | Field 2: student_name | Field 3: grade      |
+--------------------+-----------------------+---------------------+`
      },
      {
        name: 'Record',
        source: 'PDF Primary Source',
        definition: 'A collection of related fields that treat information about a single entity as a unit.',
        example: 'A student record: { roll_no: 101, name: "Prakhar", grade: "A+" }.',
        usage: 'Modeled using struct in C, classes in OOP, or rows in relational databases.',
        asciiDiagram: `Record (Entity): [ ID: 464 | Name: "Tushar" | Dept: "CSE-AI" | GPA: 9.4 ]`
      },
      {
        name: 'File',
        source: 'PDF Primary Source',
        definition: 'A collection of related records stored collectively under a unified identifier.',
        example: 'A "students.dat" file containing records of all 500 enrolled university students.',
        usage: 'Persistent secondary storage on disk, tables in database engines, and datasets in file systems.',
        asciiDiagram: `File: "students.dat"
 ├── Record 1: { roll_no: 101, name: "Aarav" }
 ├── Record 2: { roll_no: 102, name: "Diya" }
 └── Record 3: { roll_no: 103, name: "Rohan" }`
      },
      {
        name: 'Key',
        source: 'Verified Academic Extension',
        definition: 'A field or attribute within a record used to search, sort, or uniquely identify that record.',
        example: 'Student ID, National ID number, or Primary Key in a database table.',
        usage: 'Fast retrieval via binary search, hash table lookups, and index B-trees.',
        asciiDiagram: `Record: [ Key: #101 ] ──> Unique identifier for record retrieval`
      },
      {
        name: 'Attribute',
        source: 'Verified Academic Extension',
        definition: 'A distinctive quality or characteristic property that describes an entity.',
        example: 'Color, weight, speed, or date_of_birth.',
        usage: 'Entity-relationship modeling and defining schema columns.',
        asciiDiagram: `Entity (Car) ── Attributes: [ Brand, Model, MaxSpeed, Horsepower ]`
      },
      {
        name: 'Node',
        source: 'Verified Academic Extension',
        definition: 'A self-contained computational structure containing data fields and one or more references (pointers) to other nodes.',
        example: 'A linked list node: { int data; struct Node* next; }.',
        usage: 'Building non-contiguous linear structures (Linked Lists) and hierarchical structures (Trees, Graphs).',
        asciiDiagram: `+---------------+------------------+
| Data: 42      | Next: 0x7ffd98   | ───> [ Next Node ]
+---------------+------------------+`
      },
      {
        name: 'Pointer / Reference',
        source: 'Verified Academic Extension',
        definition: 'A variable that stores the direct memory address of another variable or node.',
        example: 'int *ptr = &val; holding memory address 0x7ffeeb.',
        usage: 'Dynamic memory allocation (malloc), pointer-based linking, and passing data without copying.',
        asciiDiagram: `ptr [ 0x7ffeeb ] ──────> Variable at 0x7ffeeb [ Value: 99 ]`
      },
      {
        name: 'Collection',
        source: 'Verified Academic Extension',
        definition: 'An aggregated container holding zero or more elements grouped as a unified logical object.',
        example: 'A set of unique numbers, a list of tasks, or a priority queue.',
        usage: 'High-level abstractions in software libraries and algorithm containers.',
        asciiDiagram: `Collection = { elem_1, elem_2, elem_3, ... elem_n }`
      },
      {
        name: 'Index',
        source: 'Verified Academic Extension',
        definition: 'A numeric integer offset denoting the exact sequential or contiguous position of an element.',
        example: 'Index 0 corresponds to the initial item arr[0] in 0-indexed C arrays.',
        usage: 'Direct O(1) random memory access using base address formula: Address = Base + (Index * Size).',
        asciiDiagram: `Offset:    0      1      2      3
Array:  [ 100 ][ 200 ][ 300 ][ 400 ]`
      },
      {
        name: 'Data Type',
        source: 'Verified Academic Extension',
        definition: 'A formal specification determining the domain of permissible values and valid operations that can be executed on those values.',
        example: 'int (integer values, addition/subtraction), char (character glyphs).',
        usage: 'Compiler memory sizing, type checking, and CPU instruction selection.',
        asciiDiagram: `Data Type = Set of Valid Values + Set of Allowed Operations`
      }
    ],
    cCode: {
      filename: 'basic_terminology_demo.c',
      description: 'C99 Demonstration of Field, Record (struct), Element, and Pointer references.',
      code: `#include <stdio.h>
#include <string.h>

// Field & Record Concept: A Record defined as a C struct
typedef struct {
    int student_id;       // Field 1: Unique Key / Attribute
    char name[30];        // Field 2: Text Attribute
    float gpa;            // Field 3: Numeric Attribute
} StudentRecord;

int main(void) {
    // A Collection of Records (File equivalent in memory)
    StudentRecord classroom[3] = {
        { 101, "Aarav Sharma", 8.9f },
        { 102, "Prakhar Muraliya", 9.4f },
        { 103, "Tushar Badgujar", 9.1f }
    };

    printf("==========================================\\n");
    printf("   DSAForge: Basic Terminology C99 Demo  \\n");
    printf("==========================================\\n\\n");

    // Demonstrating Elements & Direct Indexing
    int total_students = sizeof(classroom) / sizeof(classroom[0]);
    for (int i = 0; i < total_students; i++) {
        // Direct Index Access
        StudentRecord *rec_ptr = &classroom[i]; // Pointer reference to Record

        printf("Record [%d] at Memory Address: %p\\n", i, (void*)rec_ptr);
        printf("  -> Key (ID)     : %d\\n", rec_ptr->student_id);
        printf("  -> Field (Name) : %s\\n", rec_ptr->name);
        printf("  -> Field (GPA)  : %.2f\\n\\n", rec_ptr->gpa);
    }

    // Demonstrating specific Element modification
    classroom[0].gpa = 9.2f;
    printf("[Updation]: Student %s updated GPA to %.2f\\n",
           classroom[0].name, classroom[0].gpa);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Relational Database Management Systems (RDBMS)',
        category: 'Databases',
        system: 'PostgreSQL & MySQL Storage Engines',
        description: 'The exact hierarchy from the course syllabus underpins modern relational databases.',
        bullets: [
          'A Database Table directly maps to a File of records stored on disk (e.g., InnoDB tablespace .ibd).',
          'Each row is a Record containing fields representing attributes.',
          'Each column is a Field holding a single data element.',
          'Primary Keys index individual records for B+ Tree lookups in logarithmic time.'
        ]
      },
      {
        title: 'Operating System File Systems',
        category: 'Operating Systems',
        system: 'Linux ext4 & Windows NTFS',
        description: 'File descriptors, inodes, and directory table hierarchies.',
        bullets: [
          'Directory tables store records of filenames, permissions, and pointer links to inode blocks.',
          'File contents consist of sequential blocks of raw data bytes.',
          'Inodes act as records with fields for file size, timestamps, and data block block pointers.'
        ]
      },
      {
        title: 'Enterprise ERP & Student Information Systems',
        category: 'Enterprise Software',
        system: 'SAP, Oracle University SIS',
        description: 'Managing vast collections of student and employee records.',
        bullets: [
          'Enrollment numbers serve as primary keys to resolve student records instantly.',
          'Fields like semester_credits and attendance_percentage dictate graduation eligibility.',
          'Serialization libraries convert in-memory records into JSON/XML files for network transport.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Structural Access Complexity Context',
      summary:
        'Terminology concepts represent data representations rather than standalone algorithms. Complexity depends on how the record collection is physically organized in memory.',
      rows: [
        {
          operation: 'Direct Contiguous Index Access (arr[i])',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Computed directly via base pointer formula: Base + (Index * ElementSize).'
        },
        {
          operation: 'Key-based Linear Search across File Records',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Unsorted collection requires scanning each record sequentially.'
        },
        {
          operation: 'Key-based Binary Search across Sorted File Records',
          timeComplexity: 'O(log n) Logarithmic',
          spaceComplexity: 'O(1)',
          notes: 'Requires contiguous random-access memory and pre-sorted keys.'
        },
        {
          operation: 'Field Updation via Known Pointer Reference',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Direct memory mutation at the specified field offset.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'term-q1',
        difficulty: 'Easy',
        question: 'According to the official course syllabus, what is the precise definition of "Data"?',
        options: [
          'Organized information stored in a relational database',
          'Raw facts and figures without inherent context',
          'A contiguous block of allocated memory bytes',
          'A compiled computer program instruction'
        ],
        correctAnswer: 1,
        explanation: 'The course PDF explicitly defines Data as "Raw facts and figures" before context or processing is applied.',
        conceptRef: 'Data Definition (PDF)'
      },
      {
        id: 'term-q2',
        difficulty: 'Easy',
        question: 'What is the correct hierarchical relationship from largest to smallest unit?',
        options: [
          'Field → Record → File → Data',
          'File → Record → Field → Data',
          'Record → File → Field → Data',
          'Data → Field → File → Record'
        ],
        correctAnswer: 1,
        explanation: 'A File contains multiple Records; a Record is made of multiple Fields; each Field stores an atomic Data item.',
        conceptRef: 'Data Hierarchy (PDF)'
      },
      {
        id: 'term-q3',
        difficulty: 'Medium',
        question: 'In C programming, which language construct is most commonly used to represent a "Record"?',
        options: [
          'A primitive float variable',
          'A struct keyword grouping heterogeneous fields',
          'A while loop control block',
          'A standard header file inclusion'
        ],
        correctAnswer: 1,
        explanation: 'A struct in C allows bundling diverse fields (int, char[], float) into a single cohesive Record.',
        conceptRef: 'Record Representation'
      },
      {
        id: 'term-q4',
        difficulty: 'Hard',
        question: 'Why does an array allow O(1) direct element access via an index, whereas a linked list does not?',
        options: [
          'Arrays are non-primitive whereas linked lists are primitive',
          'Arrays reside in contiguous memory enabling direct offset arithmetic (Base + Index * Size)',
          'Linked lists store data in CPU registers only',
          'Arrays do not store data elements'
        ],
        correctAnswer: 1,
        explanation: 'Contiguous memory layout allows computing memory address directly in constant time. Linked list nodes are scattered, requiring sequential pointer traversal.',
        conceptRef: 'Index and Memory Layout'
      }
    ]
  },

  'top-102': {
    id: 'top-102',
    title: 'Classification of Data Structures: Primitive and Non-Primitive',
    sidebarTitle: 'Classification: Primitive & Non-Primitive',
    complexity: 'Easy',
    unitCode: 'Unit 1: Introduction to Data Structures',
    courseCode: 'SECE2291',
    description:
      'Differentiating fundamental primitive data types directly supported by hardware/compilers from structured, composite non-primitive data structures.',
    concepts: [
      {
        name: 'Primitive Data Structures',
        source: 'PDF Primary Source',
        definition: 'Basic data types provided directly by programming languages and supported at the hardware/CPU level.',
        example: 'int (integer numbers), float (floating-point decimals), char (single character), boolean (truth values), and pointer (memory addresses).',
        usage: 'Storing individual atomic values, arithmetic evaluations, and building blocks for composite structures.',
        asciiDiagram: `Primitive Data Types (Machine Supported):
 [ int: 4 Bytes ]   [ float: 4 Bytes ]   [ char: 1 Byte ]   [ pointer: 4/8 Bytes ]`
      },
      {
        name: 'Non-Primitive Data Structures',
        source: 'PDF Primary Source',
        definition: 'Complex, sophisticated data organizations created by grouping and linking primitive data types.',
        example: 'Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, and Hash Tables.',
        usage: 'Managing bulk data, preserving relationships (sequential or hierarchical), and solving computational problems.',
        asciiDiagram: `Non-Primitive Structure:
 [ Primitive int ] + [ Primitive pointer ] ──> Node ──> Linked List / Tree`
      },
      {
        name: 'Language Context: Pointer Classification',
        source: 'Verified Academic Extension',
        definition: 'In C/C++, a pointer is treated as a fundamental primitive type because it directly stores machine addresses. In higher-level languages (Java, Python), direct pointers are abstracted into managed references.',
        example: 'int *p = &x; in C vs Object ref = new Object(); in Java.',
        usage: 'Explaining system-level memory semantics without confusing universal language rules.',
        asciiDiagram: `C/C++: Direct Memory Pointer (Primitive Value = Address 0x7ffd10)
Java/Python: Managed Object Reference (Garbage collected, no pointer arithmetic)`
      }
    ],
    comparisonTable: {
      header1: 'Primitive Data Structures',
      header2: 'Non-Primitive Data Structures',
      rows: [
        {
          aspect: 'Definition',
          col1: 'Basic data types directly provided by the language.',
          col2: 'Complex structures formed by grouping primitive types.'
        },
        {
          aspect: 'Examples (from Course PDF)',
          col1: 'int, float, char, boolean, pointer',
          col2: 'Linear (Array, List, Stack, Queue) & Non-Linear (Tree, Graph, Heap)'
        },
        {
          aspect: 'Complexity',
          col1: 'Simple, direct hardware/CPU representation.',
          col2: 'Higher complexity with structured data relationships.'
        },
        {
          aspect: 'Usage',
          col1: 'Hold individual, atomic values for computations.',
          col2: 'Manage datasets, multi-entity relationships, and workflows.'
        },
        {
          aspect: 'Memory Representation',
          col1: 'Fixed size known at compile-time (e.g., 4 bytes for int).',
          col2: 'Varies; can be contiguous (array) or dynamically linked.'
        },
        {
          aspect: 'Typical Purpose',
          col1: 'Mathematical arithmetic, counters, and flag conditions.',
          col2: 'Searching, sorting, priority scheduling, and network graphs.'
        }
      ]
    },
    cCode: {
      filename: 'primitive_vs_nonprimitive.c',
      description: 'Demonstrating primitive types (int, float, char, pointer) vs non-primitive (array, struct).',
      code: `#include <stdio.h>
#include <stdbool.h>

// 1. Primitive Data Types in C99
void demonstrate_primitives(void) {
    int whole_number = 42;             // Primitive: int (typically 4 bytes)
    float decimal_val = 3.14159f;      // Primitive: float (4 bytes IEEE-754)
    char letter = 'D';                 // Primitive: char (1 byte ASCII)
    bool flag = true;                  // Primitive: boolean (stdbool.h in C99)
    int *addr_ptr = &whole_number;     // Primitive: pointer (stores address)

    printf("--- 1. PRIMITIVE DATA TYPES ---\\n");
    printf("int value      : %d (Size: %zu bytes)\\n", whole_number, sizeof(whole_number));
    printf("float value    : %.2f (Size: %zu bytes)\\n", decimal_val, sizeof(decimal_val));
    printf("char value     : '%c' (Size: %zu bytes)\\n", letter, sizeof(letter));
    printf("bool value     : %s (Size: %zu bytes)\\n", flag ? "true" : "false", sizeof(flag));
    printf("pointer value  : %p (Size: %zu bytes, Points to: %d)\\n\\n",
           (void*)addr_ptr, sizeof(addr_ptr), *addr_ptr);
}

// 2. Non-Primitive Data Structure: Composite Struct & Array
typedef struct {
    int id;
    float score;
} ResultRecord;

void demonstrate_non_primitives(void) {
    // Linear Non-Primitive: Contiguous Array
    int number_list[4] = { 10, 20, 30, 40 };

    // Non-Primitive: User-defined Composite Struct
    ResultRecord student = { 464, 98.5f };

    printf("--- 2. NON-PRIMITIVE DATA STRUCTURES ---\\n");
    printf("Array element at index [0]: %d\\n", number_list[0]);
    printf("Array element at index [3]: %d\\n", number_list[3]);
    printf("Total array memory footprint: %zu bytes\\n", sizeof(number_list));
    printf("Composite Record Student ID: %d, Score: %.1f (Size: %zu bytes)\\n",
           student.id, student.score, sizeof(student));
}

int main(void) {
    demonstrate_primitives();
    demonstrate_non_primitives();
    return 0;
}`
    },
    realWorld: [
      {
        title: 'Microcontroller & Embedded Firmware',
        category: 'Hardware Engineering',
        system: 'ARM Cortex & Arduino IoT Nodes',
        description: 'Direct reliance on primitive types for direct register manipulation.',
        bullets: [
          'GPIO pin states are represented by 1-byte primitive char or boolean flags.',
          'Sensor readings map directly to primitive int16_t or float ADC channels.',
          'Memory address pointers configure memory-mapped hardware peripheral registers.'
        ]
      },
      {
        title: 'High-Performance Graphics Engines',
        category: 'Computer Graphics',
        system: 'OpenGL & Vulkan Shader Pipelines',
        description: 'Bridging primitive vertex scalars with non-primitive scene mesh graphs.',
        bullets: [
          'Primitive floats represent coordinates (X, Y, Z, W) and RGBA color channels.',
          'Non-primitive vertex arrays and scene trees organize 3D character geometries and skeletal meshes.'
        ]
      },
      {
        title: 'Distributed Web & Financial Backends',
        category: 'Enterprise Infrastructure',
        system: 'FinTech Trading Exchanges',
        description: 'Composing non-primitive order books from primitive price scalars.',
        bullets: [
          'Primitive int64 stores currency amounts in smallest denominations (cents/satoshis) to avoid precision loss.',
          'Non-primitive binary search trees and doubly linked lists structure the limit order books for matching bids.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Primitive vs Non-Primitive Complexity Comparison',
      summary:
        'Primitive operations map directly to single CPU instruction cycles, while non-primitive structures exhibit algorithmic complexity based on size N.',
      rows: [
        {
          operation: 'Primitive Variable Assignment (x = y)',
          timeComplexity: 'O(1) Constant (1 CPU cycle)',
          spaceComplexity: 'O(1)',
          notes: 'Executed via single register load/store machine instruction (MOV).'
        },
        {
          operation: 'Primitive Pointer Dereference (*ptr)',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Single indirect memory read from RAM address.'
        },
        {
          operation: 'Non-Primitive Array Linear Traversal',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Visits all N composite elements sequentially.'
        },
        {
          operation: 'Non-Primitive Tree Search (Balanced BST)',
          timeComplexity: 'O(log n) Logarithmic',
          spaceComplexity: 'O(1) iterative / O(log n) call stack',
          notes: 'Discards half of the remaining nodes at each branch decision.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'class-q1',
        difficulty: 'Easy',
        question: 'Which of the following is explicitly listed as a Primitive Data Structure in the course syllabus?',
        options: ['Stack', 'Pointer', 'Linked List', 'Binary Tree'],
        correctAnswer: 1,
        explanation: 'The course PDF specifically lists "int, float, char, boolean, pointer" under Primitive Data Structures.',
        conceptRef: 'Primitive Types (PDF)'
      },
      {
        id: 'class-q2',
        difficulty: 'Medium',
        question: 'Why are Arrays, Stacks, and Trees classified as "Non-Primitive" data structures?',
        options: [
          'They cannot store numbers',
          'They are built by combining and organizing primitive data types into structured formats',
          'They are only available in modern languages like Python',
          'They do not require memory allocation'
        ],
        correctAnswer: 1,
        explanation: 'Non-primitive data structures are composite organizations created by assembling primitive elements with defined relationships.',
        conceptRef: 'Non-Primitive Definition'
      },
      {
        id: 'class-q3',
        difficulty: 'Medium',
        question: 'In C, what is the memory size of a pointer variable on a 64-bit operating system?',
        options: ['1 byte', '4 bytes', '8 bytes', '16 bytes'],
        correctAnswer: 2,
        explanation: 'On a 64-bit architecture, memory addresses are 64 bits wide, making pointer variables 8 bytes in size regardless of the data type they point to.',
        conceptRef: 'Pointer Size'
      },
      {
        id: 'class-q4',
        difficulty: 'Hard',
        question: 'Into which two major categories are Non-Primitive data structures divided?',
        options: [
          'Static and Volatile',
          'Linear and Non-Linear',
          'Synchronous and Asynchronous',
          'Direct and Indirect'
        ],
        correctAnswer: 1,
        explanation: 'The official course classification divides Non-Primitive structures into Linear and Non-Linear structures.',
        conceptRef: 'Classification Hierarchy'
      }
    ]
  },

  'top-103': {
    id: 'top-103',
    title: 'Linear and Non-linear',
    sidebarTitle: 'Linear and Non-linear',
    complexity: 'Easy',
    unitCode: 'Unit 1: Introduction to Data Structures',
    courseCode: 'SECE2291',
    description:
      'Exhaustive analysis of Linear (sequential) and Non-Linear (hierarchical/graph) data structures, their memory models, traversal rules, and real applications.',
    concepts: [
      {
        name: 'Linear Data Structures',
        source: 'PDF Primary Source',
        definition: 'Data structures where elements are arranged in a sequential manner, one after another. Every element has a unique predecessor and successor (except the first and last).',
        example: 'Array, Linked List, Stack, Queue, Deque, String.',
        usage: 'Representing ordered sequences, buffers, queues, and undo/redo stacks.',
        asciiDiagram: `Linear Sequential Ordering:
[ First ] <---> [ Element 2 ] <---> [ Element 3 ] <---> [ Last ]`
      },
      {
        name: 'Six Core Linear Structures from PDF',
        source: 'PDF Primary Source',
        definition: 'The official syllabus specifies six distinct linear examples:',
        example: `1. Array: Fixed-size, contiguous block of memory.
2. Linked List: Elements (nodes) linked using pointers/references.
3. Stack: Follows LIFO (Last In First Out) ordering.
4. Queue: Follows FIFO (First In First Out) ordering.
5. Deque: Double-ended queue permitting insert/delete at both ends.
6. String: Sequential array of characters terminated with '\\0' in C.`,
        usage: 'Fundamental tools used across operating systems, compilers, and applications.',
        asciiDiagram: `Array:       [10][20][30][40] (Contiguous)
Linked List: [10|*]->[20|*]->[30|NULL] (Pointer linked)
Stack:       Push/Pop at TOP only (LIFO)
Queue:       Enqueue at REAR, Dequeue at FRONT (FIFO)
Deque:       Push/Pop at both FRONT and REAR
String:      ['H']['e']['l']['l']['o']['\\0']`
      },
      {
        name: 'Non-Linear Data Structures',
        source: 'PDF Primary Source',
        definition: 'Data structures where elements are stored in a hierarchical, multi-level, or interconnected network manner rather than in a single sequence.',
        example: 'Tree (Binary Tree, BST, AVL, B-Tree, B+ Tree), Graph (Directed, Undirected, Weighted), Heap.',
        usage: 'Representing hierarchies, shortest path routing, database indexes, and priority queues.',
        asciiDiagram: `Tree Hierarchy:             Graph Network:
        [Root A]                    (A) ─── (B)
        /      \\                    │  ╲   ╱ │
     [B]        [C]                 │   (C)  │
     /  \\      /   \\                │  ╱   ╲ │
   [D]  [E]  [F]   [G]              (D) ─── (E)`
      },
      {
        name: 'Critical Technical Clarification: Memory Contiguity',
        source: 'Verified Academic Extension',
        definition: 'Linearity refers to LOGICAL arrangement, NOT physical memory contiguity. An Array is both logically linear and physically contiguous. A Linked List is logically linear, but its nodes are physically non-contiguous in heap memory.',
        example: 'Array at 0x1000, 0x1004, 0x1008 vs Linked List nodes at 0x1040, 0x9800, 0x2100.',
        usage: 'Dispelling the common misconception that all linear structures must occupy contiguous memory.',
        asciiDiagram: `Logical Linearity != Physical Contiguity
Array:       [Cell 0] (0x100) -> [Cell 1] (0x104) -> [Cell 2] (0x108)  == Contiguous
Linked List: [Node A] (0x100) -> [Node B] (0x940) -> [Node C] (0x320)  == Non-Contiguous`
      }
    ],
    comparisonTable: {
      header1: 'Linear Data Structures',
      header2: 'Non-Linear Data Structures',
      rows: [
        {
          aspect: 'Arrangement',
          col1: 'Sequential, one element directly after another in a line.',
          col2: 'Hierarchical (levels) or interconnected network (nodes & edges).'
        },
        {
          aspect: 'Element Relationship',
          col1: 'Each element has at most one predecessor and one successor.',
          col2: 'An element can be linked to multiple parents, children, or adjacent nodes.'
        },
        {
          aspect: 'Memory Allocation',
          col1: 'Can be contiguous (Array) or non-contiguous (Linked List).',
          col2: 'Usually non-contiguous dynamic nodes connected via pointer graphs.'
        },
        {
          aspect: 'Traversal Order',
          col1: 'Single run can visit all elements sequentially in one pass.',
          col2: 'Requires recursive or queue/stack strategies (Pre/In/Postorder, BFS, DFS).'
        },
        {
          aspect: 'PDF Examples',
          col1: 'Array, Linked List, Stack, Queue, Deque, String',
          col2: 'Tree (Binary, BST, AVL, B-Tree, B+ Tree), Graph, Heap'
        },
        {
          aspect: 'Typical Applications',
          col1: 'Task queues, undo buffers, sequential data storage.',
          col2: 'File systems (Trees), Maps/GPS routing (Graphs), Priority (Heaps).'
        },
        {
          aspect: 'Advantages',
          col1: 'Simple implementation, intuitive sequential access, memory-efficient.',
          col2: 'Efficient multi-level relationships, fast logarithmic searching.'
        },
        {
          aspect: 'Limitations',
          col1: 'Linear search is O(n), inefficient for hierarchical relationships.',
          col2: 'Higher structural complexity, pointer overhead, intricate algorithms.'
        }
      ]
    },
    cCode: {
      filename: 'linear_vs_nonlinear.c',
      description: 'C99 code contrasting a Linear Array with a Non-Linear Binary Tree.',
      code: `#include <stdio.h>
#include <stdlib.h>

// ==========================================
// 1. LINEAR STRUCTURE: Sequential Array
// ==========================================
void linear_array_traversal(void) {
    int linear_seq[5] = { 10, 20, 30, 40, 50 };
    printf("1. LINEAR TRAVERSAL (Sequential Single Pass):\\n");
    for (int i = 0; i < 5; i++) {
        printf("  Element [%d] = %d (Predecessor: %s, Successor: %s)\\n",
               i, linear_seq[i],
               (i > 0 ? "Exists" : "None/Head"),
               (i < 4 ? "Exists" : "None/Tail"));
    }
    printf("\\n");
}

// ==========================================
// 2. NON-LINEAR STRUCTURE: Binary Tree Node
// ==========================================
typedef struct TreeNode {
    char label;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode* create_node(char label) {
    TreeNode* n = (TreeNode*)malloc(sizeof(TreeNode));
    n->label = label;
    n->left = NULL;
    n->right = NULL;
    return n;
}

// Preorder Traversal: Root -> Left -> Right
void print_tree_preorder(TreeNode *root) {
    if (root == NULL) return;
    printf("%c ", root->label);
    print_tree_preorder(root->left);
    print_tree_preorder(root->right);
}

int main(void) {
    printf("==========================================\\n");
    printf("  Linear vs Non-Linear Structures (C99)  \\n");
    printf("==========================================\\n\\n");

    // 1. Run Linear Demonstration
    linear_array_traversal();

    // 2. Build Non-Linear Hierarchy:
    //         A
    //        / \\
    //       B   C
    //      / \\
    //     D   E
    TreeNode *root = create_node('A');
    root->left = create_node('B');
    root->right = create_node('C');
    root->left->left = create_node('D');
    root->left->right = create_node('E');

    printf("2. NON-LINEAR HIERARCHICAL TREE TRAVERSAL:\\n");
    printf("  Root element 'A' branches into two subtrees.\\n");
    printf("  Preorder Traversal: ");
    print_tree_preorder(root);
    printf("\\n\\n");

    // Clean up allocated nodes
    free(root->left->left);
    free(root->left->right);
    free(root->left);
    free(root->right);
    free(root);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Operating System Process Management (Linear)',
        category: 'Operating Systems',
        system: 'Linux CFS & Windows Task Scheduler',
        description: 'Linear FIFO and Priority Queues for CPU dispatching.',
        bullets: [
          'Ready queues organize runnable process control blocks (PCBs) in linear FIFO order.',
          'Printer spoolers use linear queues to service print jobs in exact arrival sequence.',
          'Call stacks record active function stack frames in strict LIFO order.'
        ]
      },
      {
        title: 'File Systems & Directory Trees (Non-Linear)',
        category: 'Storage Architecture',
        system: 'Linux VFS & Windows NTFS Directory Structure',
        description: 'Hierarchical tree structure organizing folders and subfolders.',
        bullets: [
          'The root directory "/" branches into "/home", "/usr", "/etc" as child nodes.',
          'B-Trees and B+ Trees (as listed in course PDF) index millions of disk blocks for sub-millisecond seek times.',
          'Enables instant path navigation like /users/prakhar/docs.'
        ]
      },
      {
        title: 'Social Networks & Road Navigation (Non-Linear)',
        category: 'Graph Applications',
        system: 'Google Maps & LinkedIn Social Graph',
        description: 'Interconnected network graphs with weighted edges.',
        bullets: [
          'Intersections represent vertices; roads represent edges with weights equal to travel time/distance.',
          'Dijkstra algorithm evaluates graph edges to compute shortest delivery route.',
          'Social graph models follower relationships with directed and undirected edges.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Linear vs Non-Linear Performance Comparison',
      summary:
        'Linear structures provide straightforward sequential access, while non-linear structures optimize hierarchical searches and relationship modeling.',
      rows: [
        {
          operation: 'Sequential Search in Unsorted Linear List',
          timeComplexity: 'O(n) Linear',
          spaceComplexity: 'O(1)',
          notes: 'Must examine every element from head to target.'
        },
        {
          operation: 'Search in Balanced Non-Linear BST (AVL)',
          timeComplexity: 'O(log n) Logarithmic',
          spaceComplexity: 'O(1) iterative',
          notes: 'Binary search tree halves the candidate search space at each branch.'
        },
        {
          operation: 'Linear Queue Insertion (Enqueue at Rear)',
          timeComplexity: 'O(1) Constant',
          spaceComplexity: 'O(1)',
          notes: 'Maintained via direct REAR pointer.'
        },
        {
          operation: 'Graph Traversal (BFS / DFS)',
          timeComplexity: 'O(V + E)',
          spaceComplexity: 'O(V)',
          notes: 'V = Vertices, E = Edges. Explores all accessible network paths.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'lin-q1',
        difficulty: 'Easy',
        question: 'Which of the following is a Linear data structure?',
        options: ['Binary Search Tree', 'Queue', 'Weighted Graph', 'AVL Tree'],
        correctAnswer: 1,
        explanation: 'Queue is a linear data structure following FIFO. Trees and Graphs are non-linear.',
        conceptRef: 'Linear Classification'
      },
      {
        id: 'lin-q2',
        difficulty: 'Easy',
        question: 'Is it true that all linear data structures must be stored in contiguous physical memory?',
        options: [
          'Yes, linear always means contiguous memory',
          'No, linked lists are linear logically, but their nodes can reside in scattered, non-contiguous memory',
          'Yes, the operating system forbids non-contiguous linear structures',
          'No, arrays are non-contiguous'
        ],
        correctAnswer: 1,
        explanation: 'Linearity describes the logical sequential arrangement of elements. Linked lists are linear, yet their nodes reside at disparate heap addresses linked by pointers.',
        conceptRef: 'Memory Contiguity Clarification'
      },
      {
        id: 'lin-q3',
        difficulty: 'Medium',
        question: 'Which non-linear tree structures are explicitly specified in the course syllabus?',
        options: [
          'Binary Tree, BST, AVL Tree, B-Tree, B+ Tree',
          'Red-Black Tree, Splay Tree only',
          'Trie and Suffix Tree only',
          'Stack and Queue'
        ],
        correctAnswer: 0,
        explanation: 'The course PDF explicitly enumerates: Binary Tree, Binary Search Tree (BST), AVL Tree, B-Tree, and B+ Tree.',
        conceptRef: 'Tree Classifications (PDF)'
      },
      {
        id: 'lin-q4',
        difficulty: 'Hard',
        question: 'What is a Deque, as classified under Linear Data Structures in the course outline?',
        options: [
          'A single-ended queue where elements can only be deleted from the middle',
          'A Double-Ended Queue allowing insertion and deletion at both FRONT and REAR ends',
          'A non-linear graph with dual roots',
          'A tree with exactly two leaves'
        ],
        correctAnswer: 1,
        explanation: 'Deque (Double-ended queue) is a generalized linear queue permitting push and pop operations at both the front and rear boundaries.',
        conceptRef: 'Deque Definition (PDF)'
      }
    ]
  },

  'top-104': {
    id: 'top-104',
    title: 'Operations on Data Structures',
    sidebarTitle: 'Operations on Data Structures',
    complexity: 'Easy',
    unitCode: 'Unit 1: Introduction to Data Structures',
    courseCode: 'SECE2291',
    description:
      'The six fundamental operations defined in the course syllabus: Traversal, Insertion, Deletion, Searching, Sorting, and Updation with algorithmic mechanics and complexities.',
    concepts: [
      {
        name: 'The Six Core Operations',
        source: 'PDF Primary Source',
        definition: 'The official course material establishes six major operations universally performed on data structures: Traversal, Insertion, Deletion, Searching, Sorting, and Updation.',
        example: 'Traversing an array, inserting into a stack, deleting from a queue, searching a key, sorting numbers, updating record values.',
        usage: 'The standard manipulation vocabulary required for all data processing algorithms.',
        asciiDiagram: `[ Data Structure ] ──(Supported Core Operations)──>
 1. Traversal  2. Insertion  3. Deletion  4. Searching  5. Sorting  6. Updation`
      }
    ],
    operations: [
      {
        id: 'op-traversal',
        name: '1. Traversal',
        definition: 'Accessing and visiting each element of a data structure exactly once in order to inspect or process it.',
        explanation: 'A pointer or index systematically advances through the structure. In an array, this is done via a loop from index 0 to N-1.',
        arrayExample: 'Traversing an array int arr[4] = {10, 20, 30, 40} to display all items: 10, 20, 30, 40.',
        realWorldExample: 'Iterating through user accounts in a bank to generate monthly statement reports, or rendering items in a shopping cart.',
        timeComplexity: {
          best: 'O(n)',
          average: 'O(n)',
          worst: 'O(n)',
          assumptions: 'Must touch all n elements regardless of internal values.'
        },
        cSnippet: `// Traversal: Visit every element
for (int i = 0; i < n; i++) {
    printf("%d ", arr[i]);
}`
      },
      {
        id: 'op-insertion',
        name: '2. Insertion',
        definition: 'Adding a new element into the data structure at a designated position.',
        explanation: 'Depending on the structure, elements may need to be shifted to create an empty slot. In a stack, insertion is called push.',
        arrayExample: 'Inserting value 99 at index 2 of [10, 20, 30, 40]: shift 30 and 40 right -> [10, 20, 99, 30, 40].',
        realWorldExample: 'Adding a newly registered customer to a database, or pushing an undo state in a graphic design tool.',
        timeComplexity: {
          best: 'O(1) at end (with available capacity)',
          average: 'O(n) at arbitrary position',
          worst: 'O(n) at beginning (shifts all n items)',
          assumptions: 'Assumes contiguous array with spare allocated capacity.'
        },
        cSnippet: `// Insertion: Shift elements right then insert
for (int i = n - 1; i >= pos; i--) {
    arr[i + 1] = arr[i];
}
arr[pos] = new_val;
n++;`
      },
      {
        id: 'op-deletion',
        name: '3. Deletion',
        definition: 'Removing an existing element from the data structure.',
        explanation: 'In contiguous structures like arrays, subsequent elements must shift left to fill the vacated index. In queues, deletion is called dequeue.',
        arrayExample: 'Deleting element at index 1 from [10, 20, 30, 40]: shift 30 and 40 left -> [10, 30, 40].',
        realWorldExample: 'Deleting a canceled flight booking, or popping the top task from a priority execution queue.',
        timeComplexity: {
          best: 'O(1) at end of array',
          average: 'O(n) at arbitrary position',
          worst: 'O(n) at index 0 (shifts all n-1 items)',
          assumptions: 'Contiguous array requires shifting to prevent memory gaps.'
        },
        cSnippet: `// Deletion: Shift elements left to fill hole
for (int i = pos; i < n - 1; i++) {
    arr[i] = arr[i + 1];
}
n--;`
      },
      {
        id: 'op-searching',
        name: '4. Searching',
        definition: 'Finding the location (index or pointer) of a given target element, or confirming its presence.',
        explanation: 'Linear search scans from the start; Binary search repeatedly splits a sorted array in half.',
        arrayExample: 'Searching for target 30 in [10, 20, 30, 40] returns index 2.',
        realWorldExample: 'Searching for a contact name in your phone directory, or finding a student by Roll Number.',
        timeComplexity: {
          best: 'O(1) target at first position',
          average: 'O(n) linear search / O(log n) binary search',
          worst: 'O(n) target at end or not found',
          assumptions: 'Linear search on unsorted data; Binary search requires sorted array.'
        },
        cSnippet: `// Linear Search: Sequential check
int search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i; // Found at index i
    }
    return -1; // Not found
}`
      },
      {
        id: 'op-sorting',
        name: '5. Sorting',
        definition: 'Arranging elements in a particular order, either ascending or descending.',
        explanation: 'Algorithms like Bubble Sort, Selection Sort, or Quick Sort reorder elements based on comparison keys.',
        arrayExample: 'Sorting unsorted array [40, 10, 30, 20] into ascending order -> [10, 20, 30, 40].',
        realWorldExample: 'Sorting products on Amazon by price, or ranking leaderboard participants by high score.',
        timeComplexity: {
          best: 'O(n) Bubble sort with early exit / O(n log n) Merge Sort',
          average: 'O(n^2) Simple sorts / O(n log n) Quick/Merge Sort',
          worst: 'O(n^2) Bubble/Insertion sort',
          assumptions: 'Comparison-based sorting across N items.'
        },
        cSnippet: `// Bubble Sort: Ascending order
for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}`
      },
      {
        id: 'op-updation',
        name: '6. Updation',
        definition: 'Modifying or replacing the data value of an existing element at a known position or matching a condition.',
        explanation: 'Once the element location is known, the new value is directly written to that memory slot without changing structure size.',
        arrayExample: 'Updating element at index 2 of [10, 20, 30, 40] with value 99 -> [10, 20, 99, 40].',
        realWorldExample: 'Changing a user\'s password or shipping address, or incrementing an item count in warehouse stock.',
        timeComplexity: {
          best: 'O(1) when index/address is known',
          average: 'O(1) direct index / O(n) if search needed first',
          worst: 'O(1) direct index / O(n) search + update',
          assumptions: 'Direct array index access takes constant O(1) time.'
        },
        cSnippet: `// Updation: Direct modification at known index
void update(int arr[], int pos, int new_val) {
    arr[pos] = new_val;
}`
      }
    ],
    cCode: {
      filename: 'six_operations_suite.c',
      description: 'Comprehensive, runnable C99 implementation of all 6 operations on an array.',
      code: `#include <stdio.h>

#define MAX_CAPACITY 10

// 1. Traversal Operation
void traverse(const int arr[], int n) {
    printf("[Traversal]: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("(Total: %d elements)\\n", n);
}

// 2. Insertion Operation (at specific position)
int insert_at(int arr[], int *n, int pos, int value) {
    if (*n >= MAX_CAPACITY) {
        printf("[Error]: Array is full (Overflow)!\\n");
        return 0;
    }
    if (pos < 0 || pos > *n) {
        printf("[Error]: Invalid insertion index %d\\n", pos);
        return 0;
    }
    // Shift elements to the right
    for (int i = *n - 1; i >= pos; i--) {
        arr[i + 1] = arr[i];
    }
    arr[pos] = value;
    (*n)++;
    printf("[Insertion]: Inserted %d at index %d\\n", value, pos);
    return 1;
}

// 3. Deletion Operation (from specific position)
int delete_at(int arr[], int *n, int pos) {
    if (*n <= 0) {
        printf("[Error]: Array is empty (Underflow)!\\n");
        return 0;
    }
    if (pos < 0 || pos >= *n) {
        printf("[Error]: Invalid deletion index %d\\n", pos);
        return 0;
    }
    int removed = arr[pos];
    // Shift elements to the left
    for (int i = pos; i < *n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    (*n)--;
    printf("[Deletion]: Removed %d from index %d\\n", removed, pos);
    return 1;
}

// 4. Searching Operation (Linear Search)
int linear_search(const int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

// 5. Sorting Operation (Bubble Sort)
void bubble_sort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    printf("[Sorting]: Array sorted in ascending order.\\n");
}

// 6. Updation Operation
int update_at(int arr[], int n, int pos, int new_val) {
    if (pos < 0 || pos >= n) {
        printf("[Error]: Invalid update index %d\\n", pos);
        return 0;
    }
    int old_val = arr[pos];
    arr[pos] = new_val;
    printf("[Updation]: Index %d changed from %d to %d\\n", pos, old_val, new_val);
    return 1;
}

int main(void) {
    int arr[MAX_CAPACITY] = { 40, 10, 30, 20 };
    int n = 4;

    printf("==========================================\\n");
    printf("   DSAForge: 6 Core Operations Suite     \\n");
    printf("==========================================\\n\\n");

    // 1. Traversal
    traverse(arr, n);

    // 2. Insertion
    insert_at(arr, &n, 2, 99);
    traverse(arr, n);

    // 3. Deletion
    delete_at(arr, &n, 1);
    traverse(arr, n);

    // 4. Searching
    int target = 99;
    int idx = linear_search(arr, n, target);
    printf("[Search]: Element %d found at index %d\\n", target, idx);

    // 5. Updation
    update_at(arr, n, 0, 77);
    traverse(arr, n);

    // 6. Sorting
    bubble_sort(arr, n);
    traverse(arr, n);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'E-Commerce Product Catalogs',
        category: 'Web Architecture',
        system: 'Amazon & Shopify Catalog Services',
        description: 'Applying all 6 operations continuously to manage millions of items.',
        bullets: [
          'Searching: Customers find items via instant search query filters.',
          'Sorting: Results are sorted by Price, Customer Rating, or Relevance.',
          'Insertion: Vendors insert new product listings into warehouse inventories.',
          'Updation: Flash sales update product discounts and stock count in real-time.',
          'Deletion: Deprecated or out-of-stock items are archived or removed from active view.',
          'Traversal: Web scrapers and sitemap generators traverse all items to build search indexes.'
        ]
      },
      {
        title: 'Banking Ledger & Transaction Core',
        category: 'Financial Software',
        system: 'Core Banking Ledger (FIS / Temenos)',
        description: 'Auditing, inserting, and reconciling transaction entries.',
        bullets: [
          'Insertion: Each swipe or transfer inserts an immutable transaction record.',
          'Updation: Updating account current balance and last-active timestamp.',
          'Searching: Fraud detection searches for anomalous transaction patterns.',
          'Traversal: Daily reconciliation jobs traverse all day accounts for balancing.'
        ]
      },
      {
        title: 'Operating System Memory & Task Management',
        category: 'Systems Software',
        system: 'Linux Kernel Process Table',
        description: 'Maintaining task lists and process descriptors.',
        bullets: [
          'fork() inserts a new task descriptor into the active process table.',
          'exit() deletes the terminated process and frees resources.',
          'ps command traverses the task list to format running processes for the terminal.'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Contextual Complexity Matrix for the 6 Operations',
      summary:
        'IMPORTANT: Complexity cannot be stated as a single universal number. It depends heavily on the chosen data structure, physical memory representation, element position, and the algorithm employed.',
      rows: [
        {
          operation: '1. Traversal',
          timeComplexity: 'Array: O(n) | Linked List: O(n) | Tree: O(n)',
          spaceComplexity: 'O(1) Array / O(h) Tree call stack',
          notes: 'Every element must be visited once. Universal lower bound is Ω(n).'
        },
        {
          operation: '2. Insertion',
          timeComplexity: 'Array End: O(1)* | Array Mid/Beg: O(n) | Stack Push: O(1) | BST: O(log n)',
          spaceComplexity: 'O(1)',
          notes: 'Array insertion requires right-shifting existing items unless appending with spare capacity.'
        },
        {
          operation: '3. Deletion',
          timeComplexity: 'Array End: O(1) | Array Mid/Beg: O(n) | Queue Dequeue: O(1) | BST: O(log n)',
          spaceComplexity: 'O(1)',
          notes: 'Array deletion requires left-shifting items to preserve contiguous layout.'
        },
        {
          operation: '4. Searching',
          timeComplexity: 'Unsorted Array: O(n) | Sorted Array: O(log n) | Hash Table: O(1) avg',
          spaceComplexity: 'O(1)',
          notes: 'Linear search scans item-by-item; binary search requires pre-sorted contiguous data.'
        },
        {
          operation: '5. Sorting',
          timeComplexity: 'Bubble/Insertion: O(n^2) | Merge/Heap: O(n log n) | Best: O(n log n)',
          spaceComplexity: 'O(1) in-place / O(n) Merge Sort',
          notes: 'Theoretical comparison sort lower bound is Ω(n log n).'
        },
        {
          operation: '6. Updation',
          timeComplexity: 'Known Index: O(1) | Value Search First: O(n) + O(1)',
          spaceComplexity: 'O(1)',
          notes: 'Direct assignment at known memory offset is a single CPU store operation.'
        }
      ]
    },
    practiceQuestions: [
      {
        id: 'op-q1',
        difficulty: 'Easy',
        question: 'Which operation is defined as visiting each element of a data structure exactly once?',
        options: ['Searching', 'Traversal', 'Insertion', 'Updation'],
        correctAnswer: 1,
        explanation: 'Traversal is the formal operation of visiting and processing every element in a data structure exactly once.',
        conceptRef: 'Traversal Definition (PDF)'
      },
      {
        id: 'op-q2',
        difficulty: 'Easy',
        question: 'What operation does "push" represent in a Stack and "dequeue" represent in a Queue?',
        options: [
          'Push = Insertion, Dequeue = Deletion',
          'Push = Deletion, Dequeue = Insertion',
          'Push = Sorting, Dequeue = Searching',
          'Push = Updation, Dequeue = Traversal'
        ],
        correctAnswer: 0,
        explanation: 'Push inserts a new element on top of a stack; Dequeue deletes and returns the front item of a queue.',
        conceptRef: 'Stack & Queue Operations (PDF)'
      },
      {
        id: 'op-q3',
        difficulty: 'Medium',
        question: 'Why does inserting an element at index 0 of an array containing N elements take O(N) time?',
        options: [
          'Because arrays cannot store data at index 0',
          'Because all existing N elements must be shifted one position to the right to make room',
          'Because binary search is required before insertion',
          'Because the CPU cache must be rebooted'
        ],
        correctAnswer: 1,
        explanation: 'Arrays require contiguous storage without gaps. Inserting at index 0 requires copying/shifting all N existing elements right by one index.',
        conceptRef: 'Array Shifting Mechanism'
      },
      {
        id: 'op-q4',
        difficulty: 'Hard',
        question: 'In an e-commerce platform, which combination of operations is executed when a customer updates their cart quantity and sorts products by price?',
        options: [
          'Traversal and Deletion',
          'Updation and Sorting',
          'Linear Search only',
          'Stack Underflow and Overflow'
        ],
        correctAnswer: 1,
        explanation: 'Modifying the quantity in the cart is Updation; reordering product listings based on a key (price) is Sorting.',
        conceptRef: 'Real World Operations'
      }
    ]
  }
};
