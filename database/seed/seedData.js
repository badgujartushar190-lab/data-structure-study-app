import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import Chapter from '../../backend/src/models/Chapter.js';
import Topic from '../../backend/src/models/Topic.js';
import Question from '../../backend/src/models/Question.js';
import User from '../../backend/src/models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../backend/.env') });

const sampleChapters = [
  {
    order: 1,
    title: 'Introduction to DSA',
    description: 'Unit 1: Basic terminology, classification of data structures (primitive and non-primitive, linear and non-linear), and core operations on data structures.',
    topics: [
      {
        title: 'Basic Terminology',
        complexity: 'Easy',
        content: 'Data (raw facts and figures), Data Structure (organization for efficient access and modification), Element, Field, Record, File, Key, Attribute, Node, Pointer, Collection, Index, and Data Type.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the definition of Data according to the course syllabus?',
            options: ['Raw facts and figures', 'A compiled algorithm', 'A database table', 'An executable program'],
            correctAnswer: 'Raw facts and figures'
          },
          {
            type: 'MCQ',
            question: 'Which sequence correctly represents the data hierarchy from largest to smallest unit?',
            options: ['File -> Record -> Field -> Data', 'Record -> File -> Field -> Data', 'Data -> Field -> Record -> File', 'Field -> Record -> File -> Data'],
            correctAnswer: 'File -> Record -> Field -> Data'
          }
        ]
      },
      {
        title: 'Classification of Data Structures: Primitive and Non-Primitive',
        complexity: 'Easy',
        content: 'Primitive Data Structures are basic types directly supported by programming languages (int, float, char, boolean, pointer). Non-Primitive Data Structures are composite structures formed by combining primitive types (Linear and Non-Linear).',
        questions: [
          {
            type: 'MCQ',
            question: 'Which of the following is classified as a Primitive Data Structure in the course syllabus?',
            options: ['Pointer', 'Stack', 'Linked List', 'Graph'],
            correctAnswer: 'Pointer'
          }
        ]
      },
      {
        title: 'Linear and Non-linear',
        complexity: 'Easy',
        content: 'Linear Data Structures store elements in a sequential manner (Array, Linked List, Stack, Queue, Deque, String). Non-Linear Data Structures store elements in a hierarchical or network manner (Trees, Graphs, Heaps).',
        questions: [
          {
            type: 'MCQ',
            question: 'Do all linear data structures require contiguous physical memory?',
            options: ['No, linked lists are linear logically, but nodes can reside at non-contiguous heap addresses', 'Yes, all linear structures must be contiguous', 'Only arrays can be linear', 'Only graphs are linear'],
            correctAnswer: 'No, linked lists are linear logically, but nodes can reside at non-contiguous heap addresses'
          }
        ]
      },
      {
        title: 'Operations on Data Structures',
        complexity: 'Easy',
        content: 'The six core operations: Traversal (visiting each item once), Insertion (adding an element), Deletion (removing an element), Searching (finding target location), Sorting (arranging in order), and Updation (modifying an element).',
        questions: [
          {
            type: 'MCQ',
            question: 'Which operation is defined as visiting each element of a data structure exactly once?',
            options: ['Traversal', 'Searching', 'Updation', 'Insertion'],
            correctAnswer: 'Traversal'
          }
        ]
      }
    ]
  },
  {
    order: 2,
    title: 'Array Data Structure',
    description: 'Unit 2: Array representation (1D & 2D), Array as ADT, programming arrays in C99, sparse matrices and triplet representation, and row/column-major order memory addressing.',
    topics: [
      {
        title: 'Array Representation',
        complexity: 'Easy',
        content: 'One-dimensional and two-dimensional array representations, contiguous memory allocation, zero-based indexing, element offsets, and multidimensional matrix structures.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is an array according to the course definition?',
            options: ['A finite ordered list of elements of the same data type stored contiguously', 'A collection of nodes linked via pointers across memory', 'A hierarchical tree of keys', 'A hash table with bucket chaining'],
            correctAnswer: 'A finite ordered list of elements of the same data type stored contiguously'
          },
          {
            type: 'MCQ',
            question: 'Given int arr[5] = {10, 20, 30, 40, 50}; in C, what is the value of arr[2]?',
            options: ['30', '20', '10', '40'],
            correctAnswer: '30'
          }
        ]
      },
      {
        title: 'Array as an Abstract Data Type',
        complexity: 'Easy',
        content: 'Array ADT definition: a collection of elements identified by index/key, representing a finite ordered list of homogeneous elements. Operations: Create, Access, Update, Traverse, Search, Insert, and Delete.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the time complexity to access an element by index in an Array ADT?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
            correctAnswer: 'O(1)'
          },
          {
            type: 'MCQ',
            question: 'Why does general insertion into a fixed contiguous array take O(n) time?',
            options: ['Existing elements following the insertion index must be shifted right to make space', 'Memory must always be reallocated from the OS', 'An array must be sorted before insertion', 'Index calculation takes linear time'],
            correctAnswer: 'Existing elements following the insertion index must be shifted right to make space'
          }
        ]
      },
      {
        title: 'Programming Array in C',
        complexity: 'Easy',
        content: 'C99 array programming: declaration, compile-time/runtime initialization, index access, linear traversal, scanf input, pointer decay, 2D matrix arrays, passing arrays to functions, linear search, and bubble sort.',
        questions: [
          {
            type: 'MCQ',
            question: 'What happens when an array name is passed to a C function?',
            options: ['It decays into a pointer to its first element', 'The entire array is copied by value onto the call stack', 'A new dynamic heap array is allocated', 'It throws a compilation error without pointer syntax'],
            correctAnswer: 'It decays into a pointer to its first element'
          }
        ]
      },
      {
        title: 'Sparse Matrices, Sparse Representations, and its Advantages',
        complexity: 'Medium',
        content: 'A sparse matrix is a matrix where most elements are zero. Triplet representation stores only non-zero entries as (row, col, value). Advantages include massive memory savings and faster operations on large sparse systems like graph adjacency and scientific matrices.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is stored in the 3-tuple / triplet representation of a sparse matrix?',
            options: ['(Row index, Column index, Non-zero Value)', '(Row index, Column index, Zero count)', '(Matrix determinant, Rank, Non-zero count)', '(Base address, Dimension, Element size)'],
            correctAnswer: '(Row index, Column index, Non-zero Value)'
          },
          {
            type: 'MCQ',
            question: 'For a 3 x 4 matrix with non-zero elements at matrix[0][3] = 5 and matrix[1][1] = 8, what are the triplets?',
            options: ['(0, 3, 5) and (1, 1, 8)', '(3, 0, 5) and (1, 1, 8)', '(0, 5, 3) and (1, 8, 1)', '(1, 4, 5) and (2, 2, 8)'],
            correctAnswer: '(0, 3, 5) and (1, 1, 8)'
          }
        ]
      },
      {
        title: 'Row-major Order and Column-major Order Representation',
        complexity: 'Medium',
        content: 'Linear memory serialization of 2D matrices: Row-major order stores consecutive elements of each row sequentially (used by C/C++), whereas Column-major order stores consecutive elements of each column sequentially (used by Fortran/MATLAB). Address mapping formulas calculate exact memory offsets from Base address, element size, dimensions, and indices.',
        questions: [
          {
            type: 'MCQ',
            question: 'Which programming language uses Row-major memory layout for 2D arrays?',
            options: ['C', 'Fortran', 'MATLAB', 'R'],
            correctAnswer: 'C'
          },
          {
            type: 'MCQ',
            question: 'In a 0-indexed 2D array A[M][N] stored in Row-major order with base address B and element size S, what is the address of A[i][j]?',
            options: ['B + (i * N + j) * S', 'B + (j * M + i) * S', 'B + (i * M + j) * S', 'B + (i + j) * S'],
            correctAnswer: 'B + (i * N + j) * S'
          }
        ]
      }
    ]
  },
  {
    order: 3,
    title: 'Search & Sort',
    description: 'Unit 3: Linear search, binary search, bubble sort, insertion sort, selection sort, and radix sort.',
    topics: [
      {
        title: 'Linear Search',
        complexity: 'Easy',
        content: 'Sequential search inspecting elements one-by-one from index 0 to n-1. Works on both unsorted and sorted datasets without prerequisite ordering.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the worst-case number of comparisons in a Linear Search on an array of size n?',
            options: ['n', 'log2(n)', 'n / 2', '1'],
            correctAnswer: 'n'
          }
        ]
      },
      {
        title: 'Binary Search',
        complexity: 'Easy',
        content: 'Logarithmic divide-and-conquer search on sorted arrays. Halves the search space each step using low, high, and mid pointers.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the mandatory prerequisite for standard Binary Search on an array?',
            options: ['The array must be sorted', 'The array size must be a power of 2', 'All elements must be positive', 'The array must be stored in a linked list'],
            correctAnswer: 'The array must be sorted'
          }
        ]
      },
      {
        title: 'Bubble Sort',
        complexity: 'Easy',
        content: 'In-place, stable comparison sort that repeatedly compares adjacent elements and swaps them if out of order, bubbling the largest element to the end.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the best-case time complexity of optimized Bubble Sort with a swapped flag?',
            options: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(1)'],
            correctAnswer: 'O(n)'
          }
        ]
      },
      {
        title: 'Insertion Sort',
        complexity: 'Easy',
        content: 'Builds sorted array one element at a time by picking a key and shifting larger preceding elements rightward. Highly efficient and adaptive for nearly-sorted data.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the time complexity of Insertion Sort on an already-sorted array?',
            options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(n log n)'],
            correctAnswer: 'O(n)'
          }
        ]
      },
      {
        title: 'Selection Sort',
        complexity: 'Easy',
        content: 'Repeatedly finds minimum element in unsorted suffix and swaps it with the first unsorted position. Minimizes memory writes to at most n - 1 swaps.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the maximum number of swaps performed by Selection Sort on an array of size n?',
            options: ['n - 1', 'n(n - 1)/2', 'n^2', '2n'],
            correctAnswer: 'n - 1'
          }
        ]
      },
      {
        title: 'Radix Sort',
        complexity: 'Medium',
        content: 'Non-comparative integer sorting algorithm that processes individual digits (e.g. LSD from ones to tens to hundreds) using a stable subroutine like Counting Sort.',
        questions: [
          {
            type: 'MCQ',
            question: 'Why does LSD Radix Sort require the intermediate digit sorting subroutine to be stable?',
            options: [
              'To preserve the relative order established by previous lower-order digit passes',
              'To keep memory space bounded by O(1)',
              'To avoid integer overflow in C',
              'To reduce the number of passes'
            ],
            correctAnswer: 'To preserve the relative order established by previous lower-order digit passes'
          }
        ]
      }
    ]
  },
  {
    order: 4,
    title: 'Stack & Queue',
    description: 'Stack LIFO principle and ADT, Expression processing and recursion call stack mechanics, and Queue FIFO principle with circular ring buffers.',
    topics: [
      {
        title: 'Stack & Its Applications',
        complexity: 'Easy',
        content: 'Linear LIFO data structure where insertions and deletions happen exclusively at TOP. Array vs linked list implementation, overflow, underflow, peek, and applications in call stacks, undo/redo, and backtracking.',
        questions: [
          {
            type: 'MCQ',
            question: 'What access discipline governs a standard Stack Abstract Data Type?',
            options: ['LIFO (Last-In, First-Out)', 'FIFO (First-In, First-Out)', 'LILO (Last-In, Last-Out)', 'Random Direct Access'],
            correctAnswer: 'LIFO (Last-In, First-Out)'
          },
          {
            type: 'MCQ',
            question: 'In an array-based stack with capacity MAX, what condition indicates Stack Overflow before pushing?',
            options: ['top == MAX - 1', 'top == -1', 'top == 0', 'top == MAX'],
            correctAnswer: 'top == MAX - 1'
          }
        ]
      },
      {
        title: 'Expression Processing & Recursion',
        complexity: 'Medium',
        content: 'Infix, prefix, and postfix notations. Dijkstra Shunting-Yard conversion algorithm, postfix evaluation using an operand stack, activation records on OS call stack, and Tower of Hanoi recursion.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the equivalent postfix notation for the infix expression A + B * C?',
            options: ['A B C * +', '+ A * B C', 'A B + C *', 'A B C + *'],
            correctAnswer: 'A B C * +'
          },
          {
            type: 'MCQ',
            question: 'What is the minimum number of moves required to solve the Tower of Hanoi problem for n disks?',
            options: ['2^n - 1', '2n - 1', 'n^2', 'n!'],
            correctAnswer: '2^n - 1'
          }
        ]
      },
      {
        title: 'Queue & Its Applications',
        complexity: 'Easy',
        content: 'Linear FIFO data structure with front (removal) and rear (insertion). Linear queue false overflow, Circular Queue modulo arithmetic (rear + 1) % MAX, Double-ended Queue (Deque), and process scheduling.',
        questions: [
          {
            type: 'MCQ',
            question: 'What problem in a linear array queue is resolved by a Circular Queue?',
            options: [
              'False overflow when empty slots exist before FRONT',
              'Slow O(1) enqueue speed',
              'Memory fragmentation in dynamic arrays',
              'Inability to store negative values'
            ],
            correctAnswer: 'False overflow when empty slots exist before FRONT'
          },
          {
            type: 'MCQ',
            question: 'In a circular queue of capacity MAX using one slot reserved, what condition indicates queue is full?',
            options: [
              '(rear + 1) % MAX == front',
              'rear == front',
              'rear == MAX - 1',
              'front == (rear - 1) % MAX'
            ],
            correctAnswer: '(rear + 1) % MAX == front'
          }
        ]
      }
    ]
  },
  {
    order: 5,
    title: 'Linked Lists',
    description: 'Dynamic memory allocation in C, Singly Linked List fundamentals, Doubly & Circular Linked Lists, and practical systems applications.',
    topics: [
      {
        title: 'Dynamic Memory & Structures',
        complexity: 'Easy',
        content: 'Runtime heap allocation with malloc, calloc, realloc, and free. Self-referential structures, pointer mechanics, dangling pointers, and memory leak prevention.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the primary difference between malloc() and calloc() in C?',
            options: [
              'calloc() initializes allocated bytes to zero, whereas malloc() leaves them uninitialized (garbage values)',
              'malloc() allocates on stack while calloc() allocates on heap',
              'calloc() is faster than malloc()',
              'malloc() can only allocate memory for primitive integers'
            ],
            correctAnswer: 'calloc() initializes allocated bytes to zero, whereas malloc() leaves them uninitialized (garbage values)'
          }
        ]
      },
      {
        title: 'Linked List Fundamentals',
        complexity: 'Easy',
        content: 'Linear dynamic chain of nodes linked via next pointers. HEAD pointer anchor, terminal NULL, O(1) prepend, linear traversal, searching, and deletion.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the time complexity to insert a new node at the very beginning of a Singly Linked List with n elements?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
            correctAnswer: 'O(1)'
          }
        ]
      },
      {
        title: 'Types of Linked Lists',
        complexity: 'Medium',
        content: 'Singly Linked List, Doubly Linked List with prev and next pointers for bidirectional traversal and O(1) deletion, and Circular Linked Lists for ring buffers.',
        questions: [
          {
            type: 'MCQ',
            question: 'Why can a node in a Doubly Linked List be deleted in O(1) time if a pointer to that node is already known?',
            options: [
              'Because its predecessor is directly accessible via node->prev without traversing from HEAD',
              'Because free() takes zero instructions in DLL',
              'Because doubly linked lists reside entirely in CPU L1 cache',
              'Because DLL does not require memory deallocation'
            ],
            correctAnswer: 'Because its predecessor is directly accessible via node->prev without traversing from HEAD'
          }
        ]
      },
      {
        title: 'Linked List Applications',
        complexity: 'Medium',
        content: 'Dynamic Stacks and Queues with zero capacity limits, Hash Table separate chaining, Graph Adjacency Lists, Polynomial addition, and OS heap free lists.',
        questions: [
          {
            type: 'MCQ',
            question: 'Why are Adjacency Lists preferred over an Adjacency Matrix for sparse graphs?',
            options: [
              'Adjacency lists consume O(V + E) space, whereas an Adjacency Matrix consumes O(V^2) space regardless of edge count',
              'Adjacency lists allow O(1) direct edge queries',
              'Adjacency lists do not require pointers',
              'Adjacency matrices cannot represent weighted graphs'
            ],
            correctAnswer: 'Adjacency lists consume O(V + E) space, whereas an Adjacency Matrix consumes O(V^2) space regardless of edge count'
          }
        ]
      }
    ]
  },
  {
    order: 6,
    title: 'Linked Stack, Queue & Applications',
    description: 'Implementation of dynamic Stacks (LIFO) and Queues (FIFO) using linked nodes, with systems applications in polynomials, sparse graphs, and hash chaining.',
    topics: [
      {
        title: 'Linked Stack Implementation',
        complexity: 'Easy',
        content: 'Dynamic LIFO data structure where elements are pushed and popped strictly at the head node (top). Guarantees O(1) push, pop, and peek without fixed capacity limits.',
        questions: [
          {
            type: 'MCQ',
            question: 'In a linked stack implementation, where should push and pop operations occur for O(1) time complexity?',
            options: ['At the head (top) of the singly linked list', 'At the tail (bottom) without a tail pointer', 'At the midpoint', 'Alternating between head and tail'],
            correctAnswer: 'At the head (top) of the singly linked list'
          },
          {
            type: 'MCQ',
            question: 'What is the primary condition that causes stack overflow in a linked stack implementation?',
            options: ['Heap memory exhaustion when malloc() returns NULL', 'Exceeding a fixed array capacity MAX_SIZE', 'Popping an empty stack', 'Setting top->next to NULL'],
            correctAnswer: 'Heap memory exhaustion when malloc() returns NULL'
          }
        ]
      },
      {
        title: 'Linked Queue Implementation',
        complexity: 'Easy',
        content: 'Dynamic FIFO data structure maintaining front and rear pointers. Guarantees O(1) enqueue at rear and O(1) dequeue at front. Requires resetting rear to NULL when dequeuing the final node.',
        questions: [
          {
            type: 'MCQ',
            question: 'When dequeuing the last remaining element from a linked queue, what edge case must be handled?',
            options: ['Set rear to NULL to prevent it from becoming a dangling pointer', 'Set front to rear->next', 'Reallocate the queue buffer with realloc()', 'Double the queue size'],
            correctAnswer: 'Set rear to NULL to prevent it from becoming a dangling pointer'
          },
          {
            type: 'MCQ',
            question: 'What are the time complexities of enqueue and dequeue in a linked queue with front and rear pointers?',
            options: ['O(1) enqueue and O(1) dequeue', 'O(1) enqueue and O(n) dequeue', 'O(n) enqueue and O(1) dequeue', 'O(n) for both'],
            correctAnswer: 'O(1) enqueue and O(1) dequeue'
          }
        ]
      },
      {
        title: 'Linked List Applications',
        complexity: 'Medium',
        content: 'Core systems and algebraic applications of linked structures: polynomial addition/multiplication, sparse matrix representation, graph adjacency lists, and hash table separate chaining.',
        questions: [
          {
            type: 'MCQ',
            question: 'Why are linked lists specifically well-suited for separate chaining in hash tables?',
            options: ['They allow dynamic collision resolution with O(1) insertion at bucket heads without rehashing the entire table', 'They use less cache memory than open addressing', 'They eliminate the need for a hash function', 'They guarantee O(1) search even under worst-case collisions'],
            correctAnswer: 'They allow dynamic collision resolution with O(1) insertion at bucket heads without rehashing the entire table'
          },
          {
            type: 'MCQ',
            question: 'In polynomial representation using linked lists, what two essential fields must each node store alongside next?',
            options: ['Coefficient (float/int) and Exponent (int)', 'Base (int) and Radix (int)', 'Row index and Column index', 'Key and Hash value'],
            correctAnswer: 'Coefficient (float/int) and Exponent (int)'
          }
        ]
      }
    ]
  },
  {
    order: 7,
    title: 'Trees & Traversal',
    description: 'Hierarchical tree topology, Binary Search Trees (BST), and depth-first/breadth-first traversal algorithms.',
    topics: [
      {
        title: 'Tree Fundamentals & Binary Trees',
        complexity: 'Easy',
        content: 'Non-linear hierarchical data structures with N nodes and N - 1 edges. Covers tree terminology (root, edge, leaf, internal, degree, depth, height), binary tree variants (full, complete, perfect), and linked vs array representations.',
        questions: [
          {
            type: 'MCQ',
            question: 'In any non-empty binary tree with n0 leaf nodes and n2 nodes of degree 2, what mathematical relation always holds?',
            options: ['n0 = n2 + 1', 'n0 = 2 * n2', 'n0 = n2 - 1', 'n0 = n2'],
            correctAnswer: 'n0 = n2 + 1'
          },
          {
            type: 'MCQ',
            question: 'Under 0-based array indexing for a complete binary tree, where is the right child of node at index i located?',
            options: ['2*i + 2', '2*i + 1', '2*i', 'floor((i - 1) / 2)'],
            correctAnswer: '2*i + 2'
          }
        ]
      },
      {
        title: 'Binary Search Trees (BST)',
        complexity: 'Medium',
        content: 'Binary tree enforcing Left < Node < Right ordering invariant. Implements search, insertion, and 3-case deletion (leaf, single child, two children with inorder successor swap). Analyzes O(log n) average vs O(n) skewed worst-case complexities.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the result of performing an Inorder Traversal on a valid Binary Search Tree?',
            options: ['Keys in strictly ascending sorted order', 'Keys in reverse sorted order', 'Keys grouped by depth', 'Random permutation'],
            correctAnswer: 'Keys in strictly ascending sorted order'
          },
          {
            type: 'MCQ',
            question: 'When deleting a node with two children in a BST, which node can safely replace it?',
            options: ['Its Inorder Successor (min in right subtree) or Inorder Predecessor', 'Any random leaf node', 'Its parent node', 'Its left child directly'],
            correctAnswer: 'Its Inorder Successor (min in right subtree) or Inorder Predecessor'
          }
        ]
      },
      {
        title: 'Tree Traversals & Applications',
        complexity: 'Medium',
        content: 'Systematic node visitation strategies: DFS (Preorder Root-L-R, Inorder L-Root-R, Postorder L-R-Root) using call stacks, and BFS (Level-Order) using FIFO queues. Real-world applications in AST compilers, DOM trees, and POSIX file systems.',
        questions: [
          {
            type: 'MCQ',
            question: 'Why must Postorder Traversal be used when deallocating or freeing dynamic nodes of a binary tree?',
            options: ['Children must be freed before the parent node to prevent use-after-free dangling pointer bugs', 'Postorder requires less memory than preorder', 'Postorder runs in O(log n) time', 'Because C compilers mandate postorder for heap structs'],
            correctAnswer: 'Children must be freed before the parent node to prevent use-after-free dangling pointer bugs'
          },
          {
            type: 'MCQ',
            question: 'What auxiliary data structure is required to implement iterative Level-Order Traversal (BFS)?',
            options: ['FIFO Queue', 'LIFO Stack', 'Priority Queue', 'Disjoint Set'],
            correctAnswer: 'FIFO Queue'
          }
        ]
      }
    ]
  },
  {
    order: 8,
    title: 'Hashing & Tables',
    description: 'Direct key-to-index mapping, collision resolution mechanisms (chaining and probing), load factor scaling, and dynamic rehashing.',
    topics: [
      {
        title: 'Hashing Fundamentals & Hash Tables',
        complexity: 'Easy',
        content: 'Mathematical key-to-index transformation h(k) achieving expected O(1) search, insert, and delete. Contrasts direct addressing with compact hash tables and examines load factors and statistical bounds.',
        questions: [
          {
            type: 'MCQ',
            question: 'What is the theoretical worst-case time complexity of searching a key in an unmitigated hash table with n elements?',
            options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
            correctAnswer: 'O(n)'
          },
          {
            type: 'MCQ',
            question: 'What does the Load Factor alpha measure in a hash table of size m storing n keys?',
            options: ['Ratio of stored keys to table capacity (n / m)', 'Ratio of table capacity to stored keys (m / n)', 'Number of collisions divided by 2', 'Depth of the longest cluster'],
            correctAnswer: 'Ratio of stored keys to table capacity (n / m)'
          }
        ]
      },
      {
        title: 'Hash Functions & Collision Resolution',
        complexity: 'Medium',
        content: 'Uniform hash function design (division, multiplication, mid-square) and collision resolution paradigms: Separate Chaining (linked buckets) and Open Addressing (Linear Probing, Quadratic Probing, Double Hashing). Explains primary and secondary clustering.',
        questions: [
          {
            type: 'MCQ',
            question: 'What phenomenon occurs in Linear Probing when occupied slots form contiguous blocks that grow larger with each collision?',
            options: ['Primary Clustering', 'Secondary Clustering', 'Rehashing Inversion', 'Bucket Overflow'],
            correctAnswer: 'Primary Clustering'
          },
          {
            type: 'MCQ',
            question: 'Can the Load Factor alpha exceed 1.0 in a hash table that uses Separate Chaining?',
            options: ['Yes, because each bucket can hold an arbitrary number of linked nodes', 'No, table capacity is a strict limit', 'Only if table size is a prime number', 'Only during rehashing'],
            correctAnswer: 'Yes, because each bucket can hold an arbitrary number of linked nodes'
          }
        ]
      },
      {
        title: 'Hashing Applications & Performance',
        complexity: 'Medium',
        content: 'Load factor thresholds, dynamic table capacity doubling, full rehashing mechanics, and amortized O(1) analysis. Compares hash tables with BSTs and clarifies the critical distinction between fast hash tables and slow cryptographic password KDFs (bcrypt/Argon2).',
        questions: [
          {
            type: 'MCQ',
            question: 'Why must all stored keys be rehashed when a dynamic hash table doubles its capacity?',
            options: ['Because the modulo divisor has changed, so an element index will generally differ in the larger table', 'Because pointers are moved to disk', 'To encrypt keys against attacks', 'Because old buckets are deleted by garbage collection'],
            correctAnswer: 'Because the modulo divisor has changed, so an element index will generally differ in the larger table'
          },
          {
            type: 'MCQ',
            question: 'Why are fast hash functions (like modulo or MurmurHash) NEVER appropriate for user password storage?',
            options: ['They are optimized for speed, allowing GPUs to test billions of guesses per second; passwords require slow salted KDFs like bcrypt or Argon2', 'They cannot hash string passwords', 'They cause integer overflow', 'They are only supported in C99'],
            correctAnswer: 'They are optimized for speed, allowing GPUs to test billions of guesses per second; passwords require slow salted KDFs like bcrypt or Argon2'
          }
        ]
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dsaforge';
    console.log(`[Seed] Connecting to ${mongoUri}...`);
    
    // Set a short connection timeout (3 seconds) for quick feedback if MongoDB service is offline
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });

    console.log('[Seed] Clearing existing collections...');
    await Chapter.deleteMany({});
    await Topic.deleteMany({});
    await Question.deleteMany({});
    await User.deleteMany({});

    console.log('[Seed] Populating sample user...');
    await User.create({
      name: 'Demo Student',
      email: 'student@dsaforge.dev',
      password: 'password123',
      role: 'student'
    });

    console.log('[Seed] Populating 8 DSA Chapters, Topics, and Questions...');
    for (const chapData of sampleChapters) {
      const chapter = await Chapter.create({
        order: chapData.order,
        title: chapData.title,
        description: chapData.description
      });

      for (const topicData of chapData.topics) {
        const topic = await Topic.create({
          chapterId: chapter._id,
          title: topicData.title,
          complexity: topicData.complexity,
          content: topicData.content
        });

        for (const qData of topicData.questions) {
          await Question.create({
            topicId: topic._id,
            type: qData.type,
            question: qData.question,
            options: qData.options,
            correctAnswer: qData.correctAnswer
          });
        }
      }
    }

    console.log('[Seed] Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.warn('[Seed Warning]: Could not connect to MongoDB server:', error.message);
    console.warn('[Seed Note]: Ensure MongoDB service is running (e.g., mongod or MongoDB Compass / Docker container) to populate database records.');
    process.exit(0);
  }
};

seedDatabase();
