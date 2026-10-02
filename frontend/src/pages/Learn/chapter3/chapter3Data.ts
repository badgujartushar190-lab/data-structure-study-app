// Chapter 3 Data Model: Search & Sort Algorithms
// Curriculum Alignment: Standard Computer Science Curriculum / CLRS (Introduction to Algorithms)
// Textbooks: Cormen, Leiserson, Rivest, Stein (MIT Press) & Sedgewick & Wayne (Pearson) & Tanenbaum (PHI)

export interface ConceptItem {
  name: string;
  source: 'CLRS Primary Source' | 'Verified Academic Curriculum' | 'IEEE Standard';
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
  arrayState: number[];
  highlightedIndices: number[];
  statusText: string;
}

export interface TopicData {
  id: string;
  title: string;
  sidebarTitle: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
  category: 'Searching' | 'Sorting';
  description: string;
  unitCode: string;
  courseCode: string;
  coreIdea: string;
  howItWorks: string[];
  pseudocode: string;
  stepByStepExample: {
    title: string;
    initialArray: number[];
    target?: number;
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

export const chapter3Topics: Record<string, TopicData> = {
  // ==========================================
  // TOPIC 1: LINEAR SEARCH
  // ==========================================
  'top-301': {
    id: 'top-301',
    title: 'Linear Search',
    sidebarTitle: 'Linear Search',
    complexity: 'Easy',
    category: 'Searching',
    description:
      'Linear Search (sequential search) is the most direct searching algorithm that traverses an array or collection element-by-element from the beginning to find a target value. It operates seamlessly on both unsorted and sorted datasets without requiring any data restructuring.',
    unitCode: 'Unit 3: Search & Sort',
    courseCode: 'CS201 / CLRS Ch. 2',
    coreIdea:
      'Scan the array sequentially starting at index 0. Compare every element with the target value. Return the current index as soon as a match is detected. If the loop exhausts the entire array without finding the target, conclude that the element is absent and return -1.',
    howItWorks: [
      'Initialize a pointer or loop index i = 0 pointing to the start of the array.',
      'Check loop condition: if i >= n (array length), terminate and return -1 (element not present).',
      'Compare element at arr[i] with target key.',
      'If arr[i] == target: match confirmed! Immediately return index i (first occurrence).',
      'If arr[i] != target: increment index i by 1 (i = i + 1) and repeat from Step 2.',
      'Memory footprint is strictly O(1) auxiliary space because only loop counter storage is allocated.'
    ],
    pseudocode: `ALGORITHM LinearSearch(A, n, target)
  INPUT: Array A of n elements, target search key
  OUTPUT: Index of target if found, else -1

  FOR i = 0 TO n - 1 DO
    IF A[i] == target THEN
      RETURN i   // Target located at index i
    END IF
  END FOR

  RETURN -1       // Target element not found in array`,
    stepByStepExample: {
      title: 'Searching for target = 42 in array [10, 25, 7, 42, 18]',
      initialArray: [10, 25, 7, 42, 18],
      target: 42,
      steps: [
        {
          stepNumber: 1,
          action: 'Inspect Index [0]',
          arrayState: [10, 25, 7, 42, 18],
          highlightedIndices: [0],
          statusText: 'arr[0] = 10. Compare 10 == 42 -> False. Move pointer to index 1.'
        },
        {
          stepNumber: 2,
          action: 'Inspect Index [1]',
          arrayState: [10, 25, 7, 42, 18],
          highlightedIndices: [1],
          statusText: 'arr[1] = 25. Compare 25 == 42 -> False. Move pointer to index 2.'
        },
        {
          stepNumber: 3,
          action: 'Inspect Index [2]',
          arrayState: [10, 25, 7, 42, 18],
          highlightedIndices: [2],
          statusText: 'arr[2] = 7. Compare 7 == 42 -> False. Move pointer to index 3.'
        },
        {
          stepNumber: 4,
          action: 'Inspect Index [3] -> FOUND!',
          arrayState: [10, 25, 7, 42, 18],
          highlightedIndices: [3],
          statusText: 'arr[3] = 42. Compare 42 == 42 -> TRUE! Target 42 found at index 3.'
        }
      ]
    },
    concepts: [
      {
        name: 'Sequential Traversal Mechanism',
        source: 'CLRS Primary Source',
        definition:
          'Linear search evaluates items in strict monotonic order (index 0, 1, ..., n-1). It does not assume any structural ordering or relationship between elements, making it the universal fallback search algorithm for raw or streaming data.',
        example: 'int linear_search(int a[], int n, int val) { for(int i=0; i<n; i++) if(a[i]==val) return i; return -1; }',
        usage: 'Finding an unsorted config key in memory or querying small dynamic collections (<30 items).',
        asciiDiagram: `[10] -> [25] -> [ 7] -> [42] -> [18]
  ^       ^       ^       ^
  i=0     i=1     i=2     i=3 (MATCH!)`
      },
      {
        name: 'Sentinel Linear Search Optimization',
        source: 'Verified Academic Curriculum',
        definition:
          'In standard linear search, two tests occur per loop iteration: (1) whether index i < n, and (2) whether arr[i] == target. Sentinel search eliminates the boundary check by placing the target at arr[n], halving loop condition evaluations.',
        example: 'arr[n] = target; int i=0; while(arr[i] != target) i++; arr[n] = original; return (i < n) ? i : -1;',
        usage: 'Micro-optimization in high-frequency low-level C routines where branch prediction misses must be avoided.'
      },
      {
        name: 'First Occurrence vs All Occurrences',
        source: 'Verified Academic Curriculum',
        definition:
          'Standard linear search terminates immediately at the first match (early exit). To locate all occurrences or count duplicates, the traversal must continue unconditionally through all n elements, yielding O(n) runtime even in best-case scenarios.',
        example: 'int count = 0; for(int i=0; i<n; i++) if(arr[i] == target) matches[count++] = i;',
        usage: 'Auditing log streams, finding multiple indices of non-unique identifiers.'
      }
    ],
    comparisonTable: {
      header1: 'Standard Linear Search',
      header2: 'Sentinel Linear Search',
      rows: [
        {
          aspect: 'Comparisons Per Loop',
          col1: '2 comparisons (i < n AND arr[i] == key)',
          col2: '1 comparison (arr[i] == key only)'
        },
        {
          aspect: 'Array Size Requirement',
          col1: 'Requires exact array size n',
          col2: 'Requires 1 extra allocated slot at index n'
        },
        {
          aspect: 'Worst Case Time',
          col1: 'O(n) time',
          col2: 'O(n) time with ~30% lower branch overhead'
        },
        {
          aspect: 'Implementation Complexity',
          col1: 'Trivial 4-line for loop',
          col2: 'Requires mutable array buffer with spare capacity'
        }
      ]
    },
    operations: [
      {
        id: 'op-lin-search',
        name: 'Sequential Comparison',
        definition: 'Systematic comparison of array elements against search target from left to right.',
        explanation:
          'Evaluates each memory address offset successively using stride-1 pointer increments, leveraging hardware L1 CPU cache lines.',
        arrayExample: 'Target = 42 in [10, 25, 7, 42, 18] requires 4 element comparisons.',
        realWorldExample: 'Scanning unindexed CSV line rows sequentially.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(n)',
          worst: 'O(n)',
          assumptions: 'Uniform target probability distribution across all indices.'
        },
        cSnippet: `int linear_search(const int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i; // Early exit on match
    }
    return -1; // Element absent
}`
      },
      {
        id: 'op-lin-sentinel',
        name: 'Sentinel Boundary Elimination',
        definition: 'Replacing array boundary check with temporary target insertion at terminal index.',
        explanation:
          'Stores the target at index n. The while loop runs without testing i < n. A single comparison after loop exit tests if the match occurred before index n.',
        arrayExample: 'Array of size 5: arr[5] = target; while(arr[i] != target) i++;',
        realWorldExample: 'High-frequency embedded device interrupt table search.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(n)',
          worst: 'O(n)',
          assumptions: 'Array buffer has at least n + 1 allocated elements.'
        },
        cSnippet: `int sentinel_search(int arr[], int n, int target) {
    int last = arr[n - 1];
    arr[n - 1] = target;
    int i = 0;
    while (arr[i] != target) i++;
    arr[n - 1] = last;
    if (i < n - 1 || last == target) return i;
    return -1;
}`
      }
    ],
    cCode: {
      filename: 'linear_search.c',
      description: 'Production ISO C99 sequential search implementation with target trace and test cases.',
      code: `/*
 * DSAForge Educational Series - Chapter 3: Search & Sort
 * File: linear_search.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Linear Search on Unsorted Array with Step-by-Step Telemetry
 */

#include <stdio.h>
#include <stdbool.h>

/**
 * Searches for a target value in an unsorted array using Linear Search.
 * 
 * @param arr    Pointer to the constant integer array
 * @param n      Number of elements in the array
 * @param target Integer value to locate
 * @return       Zero-based index of first occurrence, or -1 if not found
 */
int linear_search(const int arr[], int n, int target) {
    printf("[Linear Search Engine]: Beginning sequential scan for target = %d (n = %d)\\n", target, n);
    
    for (int i = 0; i < n; i++) {
        printf("  Step %d: Evaluating arr[%d] = %d against target %d...", i + 1, i, arr[i], target);
        if (arr[i] == target) {
            printf(" [MATCH FOUND! Returned index %d]\\n", i);
            return i;
        }
        printf(" [No match]\\n");
    }
    
    printf("[Linear Search Engine]: Scan exhausted. Target %d is not in the array.\\n", target);
    return -1;
}

int main(void) {
    int dataset[] = {10, 25, 7, 42, 18};
    int n = sizeof(dataset) / sizeof(dataset[0]);

    printf("=========================================\\n");
    printf("   DSAForge: Linear Search Verification  \\n");
    printf("=========================================\\n");
    printf("Input Array: [ ");
    for (int i = 0; i < n; i++) printf("%d ", dataset[i]);
    printf("]\\n\\n");

    // Test Case 1: Existing element (42)
    int target1 = 42;
    int idx1 = linear_search(dataset, n, target1);
    printf("Result 1: Target %d located at index %d\\n\\n", target1, idx1);

    // Test Case 2: Absent element (99)
    int target2 = 99;
    int idx2 = linear_search(dataset, n, target2);
    printf("Result 2: Target %d returned code %d (Not Found)\\n", target2, idx2);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Kernel Device Driver Registration',
        category: 'Operating Systems',
        system: 'Linux Kernel Module Subsystem',
        description:
          'When dynamically attaching hardware peripherals, the Linux kernel searches internal linked lists or small arrays of device IDs sequentially to match vendor and product identifiers.',
        bullets: [
          'Handles unsorted peripheral lists gracefully without pre-sorting overhead',
          'Small array sizes (typically 4 to 20 devices) make linear scan faster than hash tables due to cache locality',
          'Zero heap allocation required, critical for kernel memory safety'
        ]
      },
      {
        title: 'Real-Time Sensor Bus Polling',
        category: 'Embedded Systems',
        system: 'Automotive CAN Bus & I2C Peripherals',
        description:
          'Engine electronic control units (ECUs) poll temperature, pressure, and RPM telemetry channels in sequential order, matching sensor IDs against active alert threshold lists.',
        bullets: [
          'Deterministic linear execution path eliminates complex branch prediction penalties',
          'Runs predictably on 8-bit / 16-bit microcontrollers with minimal RAM (<2KB)',
          'Facilitates straightforward worst-case execution time (WCET) certification'
        ]
      },
      {
        title: 'Unsorted Document Keyword Scan',
        category: 'Text Processing',
        system: 'Command-Line Tools (grep / findstr)',
        description:
          'Raw text streams arriving from standard input (stdin) cannot be sorted in advance. Linear search parses byte streams sequentially character-by-character.',
        bullets: [
          'Operates on arbitrary data streams without loading the entire dataset into memory',
          'Single-pass processing enables immediate pipeline forwarding',
          'Minimal instruction cache footprint'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Linear Search Complexity Breakdown',
      summary:
        'Linear search operates in linear time because each element is inspected at most once. No pre-sorting or structural assumptions exist.',
      rows: [
        {
          operation: 'Best Case (Target at Index 0)',
          timeComplexity: 'Ω(1)',
          spaceComplexity: 'O(1)',
          notes: 'Target is the first element inspected; loop terminates immediately on iteration 1.'
        },
        {
          operation: 'Average Case (Uniform Target Distribution)',
          timeComplexity: 'Θ(n)',
          spaceComplexity: 'O(1)',
          notes: 'Target is found after inspecting approximately (n + 1) / 2 elements.'
        },
        {
          operation: 'Worst Case (Target at Index n-1 or Absent)',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          notes: 'All n elements must be evaluated before concluding element location or absence.'
        },
        {
          operation: 'Auxiliary Memory Space',
          timeComplexity: '—',
          spaceComplexity: 'O(1)',
          notes: 'Strictly in-place. Requires only a single integer loop counter variable.'
        }
      ]
    },
    advantages: [
      'Universal applicability: works on unsorted, sorted, contiguous, or linked data structures.',
      'Extremely simple to implement with minimal cognitive overhead and zero library dependencies.',
      'O(1) auxiliary space complexity with zero dynamic memory allocation required.',
      'Fastest algorithm for small collections (n < 20 to 30) due to CPU cache-line spatial locality.',
      'Supports online searching over incoming data streams without requiring all data upfront.'
    ],
    disadvantages: [
      'Scales linearly O(n), becoming prohibitively slow for large datasets (e.g., millions of elements).',
      'Does not capitalize on sorted data order (Binary Search performs O(log n) searches on sorted data).',
      'High comparison count in worst-case scenarios makes repeated lookups computationally expensive.'
    ],
    whenToUse: [
      'When the dataset is small (n < 30 elements).',
      'When data is completely unsorted and only a single or rare lookup is needed (sorting costs O(n log n)).',
      'When searching through non-random-access structures like Singly Linked Lists.',
      'When processing real-time streaming data where future elements are unknown.'
    ],
    whenNotToUse: [
      'When the dataset is large (n > 1,000) and already sorted (use Binary Search).',
      'When frequent lookups are performed on a static dataset (pre-sort or build a Hash Table / BST).',
      'When low-latency query response is an SLA requirement on big data tables.'
    ],
    commonMistakes: [
      'Off-by-one errors in loop boundaries (e.g., looping while i <= n instead of i < n, causing buffer overread).',
      'Forgetting to return -1 when the element is not found, leading to undefined return values in C.',
      'Assuming linear search is always slower than binary search for tiny arrays (linear search often wins due to lower instruction overhead and zero sorting cost).'
    ],
    interviewQuestions: [
      {
        question: 'Under what specific conditions is Linear Search superior to Binary Search?',
        answer:
          'Linear search is superior when: (1) The dataset is unsorted and you only perform one or two lookups (sorting takes O(n log n), whereas linear search takes O(n)); (2) The collection is implemented as a Linked List where random O(1) midpoint access is impossible; (3) The array is tiny (n < 20), where cache locality and minimal branch instructions make linear search faster in wall-clock time.'
      },
      {
        question: 'What is the Sentinel Linear Search technique and what advantage does it offer?',
        answer:
          'Sentinel search places the target value at the end of the array (arr[n] = target), which guarantees that the target will always be found. This eliminates the need to test the loop boundary (i < n) on every iteration. While asymptotic complexity remains O(n), it reduces CPU instruction count by approximately 30-50% in the inner loop.'
      },
      {
        question: 'What is the average number of comparisons in Linear Search for a successful lookup?',
        answer:
          'Assuming every element has an equal probability (1/n) of being the target, the expected comparison count is (1 + 2 + 3 + ... + n) / n = [n(n + 1) / 2] / n = (n + 1) / 2 comparisons, which asymptotically evaluates to Θ(n).'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-lin-1',
        difficulty: 'Easy',
        question: 'What is the worst-case number of comparisons in a Linear Search on an array with n elements?',
        options: ['1 comparison', 'log2(n) comparisons', 'n comparisons', 'n / 2 comparisons'],
        correctAnswer: 2,
        explanation: 'In the worst case (when the target is at the final index or absent), all n elements must be compared.',
        conceptRef: 'Time Complexity Analysis'
      },
      {
        id: 'q-lin-2',
        difficulty: 'Easy',
        question: 'Which of the following data structures can be searched using Linear Search but CANNOT be efficiently searched using Binary Search in O(log n)?',
        options: ['Singly Linked List', 'Contiguous Array', 'Dynamic Vector', 'Sorted Ring Buffer'],
        correctAnswer: 0,
        explanation: 'Binary Search requires O(1) random access to determine the middle element. A Singly Linked List requires O(n) traversal to reach the midpoint, making binary search on linked lists O(n).',
        conceptRef: 'Data Structure Constraints'
      },
      {
        id: 'q-lin-3',
        difficulty: 'Medium',
        question: 'Given an array [10, 25, 7, 42, 18], how many comparisons does Linear Search perform when searching for target = 42?',
        options: ['1 comparison', '3 comparisons', '4 comparisons', '5 comparisons'],
        correctAnswer: 2,
        explanation: 'It compares with 10 (idx 0), 25 (idx 1), 7 (idx 2), and 42 (idx 3). It succeeds at the 4th comparison.',
        conceptRef: 'Step Tracing'
      },
      {
        id: 'q-lin-4',
        difficulty: 'Hard',
        question: 'If you have an unsorted array of size n = 1,000,000 and need to perform exactly 1 lookup, what is the best algorithmic choice?',
        options: [
          'Sort the array with QuickSort O(n log n) and then run Binary Search O(log n)',
          'Run Linear Search O(n) directly on the unsorted array',
          'Build a balanced AVL tree in O(n log n) and then search',
          'Build a Hash Map in O(n) with extra memory and then search'
        ],
        correctAnswer: 1,
        explanation: 'Sorting requires ~1,000,000 * 20 ≈ 20,000,000 operations. Linear Search takes at most 1,000,000 operations. For a single lookup on unsorted data, sorting first is ~20x slower!',
        conceptRef: 'Search vs Sort Decision Theory'
      }
    ]
  },

  // ==========================================
  // TOPIC 2: BINARY SEARCH
  // ==========================================
  'top-302': {
    id: 'top-302',
    title: 'Binary Search',
    sidebarTitle: 'Binary Search',
    complexity: 'Easy',
    category: 'Searching',
    description:
      'Binary Search is a logarithmic divide-and-conquer search algorithm that locates a target value in a sorted array by repeatedly halving the remaining search space. It eliminates half of the candidate elements in every iteration.',
    unitCode: 'Unit 3: Search & Sort',
    courseCode: 'CS201 / CLRS Ch. 2.3 & 12',
    coreIdea:
      'CRITICAL PREREQUISITE: The array MUST be sorted. Inspect the midpoint element arr[mid]. If arr[mid] == target, search is complete. If target < arr[mid], the target can only exist in the left half, so discard the right half (high = mid - 1). If target > arr[mid], discard the left half (low = mid + 1). Repeat until found or search interval collapses (low > high).',
    howItWorks: [
      'Initialize pointers: low = 0, high = n - 1.',
      'Check loop condition: while low <= high.',
      'Calculate midpoint safely to prevent integer overflow: mid = low + (high - low) / 2.',
      'Compare target with arr[mid]:',
      '  - Case 1: arr[mid] == target -> Target located! Return index mid.',
      '  - Case 2: arr[mid] < target -> Target is greater than midpoint. Discard left half: low = mid + 1.',
      '  - Case 3: arr[mid] > target -> Target is smaller than midpoint. Discard right half: high = mid - 1.',
      'If low exceeds high, the search interval has collapsed without a match. Conclude target is not present and return -1.'
    ],
    pseudocode: `ALGORITHM BinarySearch(A, n, target)
  INPUT: Sorted Array A of n elements, target search key
  OUTPUT: Index of target if found, else -1

  low = 0
  high = n - 1

  WHILE low <= high DO
    mid = low + (high - low) / 2     // Prevent 32-bit overflow

    IF A[mid] == target THEN
      RETURN mid                    // Match found
    ELSE IF A[mid] < target THEN
      low = mid + 1                 // Narrow to right sub-array
    ELSE
      high = mid - 1                // Narrow to left sub-array
    END IF
  END WHILE

  RETURN -1                         // Target does not exist in array`,
    stepByStepExample: {
      title: 'Searching for target = 50 in sorted array [10, 20, 30, 40, 50, 60, 70]',
      initialArray: [10, 20, 30, 40, 50, 60, 70],
      target: 50,
      steps: [
        {
          stepNumber: 1,
          action: 'Pass 1: Evaluate Entire Array',
          arrayState: [10, 20, 30, 40, 50, 60, 70],
          highlightedIndices: [0, 3, 6],
          statusText: 'low = 0, high = 6. Mid = 0 + (6-0)/2 = 3. arr[3] = 40. Target 50 > 40 -> Discard left half [10..40]. Set low = 4.'
        },
        {
          stepNumber: 2,
          action: 'Pass 2: Right Sub-array [50, 60, 70]',
          arrayState: [10, 20, 30, 40, 50, 60, 70],
          highlightedIndices: [4, 5, 6],
          statusText: 'low = 4, high = 6. Mid = 4 + (6-4)/2 = 5. arr[5] = 60. Target 50 < 60 -> Discard right half [60..70]. Set high = 4.'
        },
        {
          stepNumber: 3,
          action: 'Pass 3: Single Element [50] -> MATCH FOUND!',
          arrayState: [10, 20, 30, 40, 50, 60, 70],
          highlightedIndices: [4],
          statusText: 'low = 4, high = 4. Mid = 4. arr[4] = 50 == Target 50 -> TRUE! Target located at index 4 in only 3 comparisons.'
        }
      ]
    },
    concepts: [
      {
        name: 'Mandatory Sorted Array Precondition',
        source: 'CLRS Primary Source',
        definition:
          'Binary search is mathematically invalid on unsorted data. The halving invariant relies strictly on transitivity: if target > arr[mid], the target is guaranteed to be greater than all elements arr[0..mid-1], allowing safe elimination of the entire left partition.',
        example: '// If input is unsorted [30, 10, 50], binary search will make incorrect branching decisions!',
        usage: 'Always verify or sort data prior to invoking binary search routines.',
        asciiDiagram: `[10  20  30  40  50  60  70]
  L           M           H   -> M=40 < 50
              [50  60  70]
               L   M   H       -> M=60 > 50
              [50]
               L=M=H           -> MATCH!`
      },
      {
        name: 'Integer Overflow in Midpoint Computation',
        source: 'IEEE Standard',
        definition:
          'The historical midpoint formula (low + high) / 2 fails in languages like C/C++/Java when low + high exceeds 2^31 - 1 (maximum signed 32-bit int), overflowing into a negative number and causing an out-of-bounds memory segfault. The algebraically equivalent low + (high - low) / 2 prevents overflow.',
        example: 'int mid = low + (high - low) / 2; // Mathematically equivalent, 100% overflow safe',
        usage: 'Standard bug identified in Java standard library bsearch in 2006 (Joshua Bloch).'
      },
      {
        name: 'Lower Bound and Upper Bound Search',
        source: 'Verified Academic Curriculum',
        definition:
          'Variants of binary search for arrays with duplicate keys: Lower Bound finds the first position where arr[i] >= target; Upper Bound finds the first position where arr[i] > target. Together they yield the frequency count of duplicate keys in O(log n).',
        example: 'int count = upper_bound(arr, n, key) - lower_bound(arr, n, key);',
        usage: 'Range queries in database indexing, C++ STL std::lower_bound.'
      }
    ],
    comparisonTable: {
      header1: 'Iterative Binary Search',
      header2: 'Recursive Binary Search',
      rows: [
        {
          aspect: 'Auxiliary Memory Space',
          col1: 'O(1) strictly in-place (3 local variables)',
          col2: 'O(log n) auxiliary stack space from recursive frames'
        },
        {
          aspect: 'Stack Overflow Risk',
          col1: 'Zero risk; runs in a flat while loop',
          col2: 'Minimal for arrays up to 2^64 (depth ≤ 64), but still consumes call frames'
        },
        {
          aspect: 'Execution Speed',
          col1: 'Marginally faster due to absence of function call overhead',
          col2: 'Slightly slower due to stack push/pop instructions'
        },
        {
          aspect: 'Code Elegance',
          col1: 'Practical, production-grade standard',
          col2: 'Pure mathematical divide-and-conquer expression'
        }
      ]
    },
    operations: [
      {
        id: 'op-bin-search-iter',
        name: 'Iterative Interval Halving',
        definition: 'Halves the search range in an iterative loop using pointer adjustment.',
        explanation:
          'Maintains low and high bounds, computing mid on each pass and updating bounds until target is found or interval is empty.',
        arrayExample: 'Finding 50 in [10..70]: Range 7 -> 3 -> 1 -> Found.',
        realWorldExample: 'Standard C library bsearch() implementation.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(log n)',
          worst: 'O(log n)',
          assumptions: 'Array is sorted in ascending order and stored contiguously.'
        },
        cSnippet: `int binary_search(const int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
      },
      {
        id: 'op-bin-lower-bound',
        name: 'Lower Bound Bisect',
        definition: 'Locates the first index containing a value greater than or equal to target.',
        explanation:
          'When arr[mid] >= target, high is set to mid (narrowing search space leftward) until low == high.',
        arrayExample: 'Lower bound of 20 in [10, 20, 20, 30] returns index 1.',
        realWorldExample: 'B-Tree database index node navigation.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(log n)',
          worst: 'O(log n)',
          assumptions: 'Monotonically non-decreasing sorted array.'
        },
        cSnippet: `int lower_bound(const int arr[], int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) high = mid;
        else low = mid + 1;
    }
    return low;
}`
      }
    ],
    cCode: {
      filename: 'binary_search.c',
      description: 'ISO C99 binary search implementation providing both iterative and recursive implementations.',
      code: `/*
 * DSAForge Educational Series - Chapter 3: Search & Sort
 * File: binary_search.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Binary Search (Iterative & Recursive) on Sorted Array
 */

#include <stdio.h>

/**
 * Iterative Binary Search with Overflow-Safe Midpoint Calculation.
 * 
 * @param arr    Pointer to sorted integer array (ascending)
 * @param n      Total count of elements
 * @param target Value to locate
 * @return       Index if found, -1 if absent
 */
int binary_search_iterative(const int arr[], int n, int target) {
    int low = 0;
    int high = n - 1;
    int step = 1;

    printf("[Binary Search]: Searching for %d in sorted dataset (n = %d)\\n", target, n);

    while (low <= high) {
        // Safe midpoint to prevent 32-bit signed integer overflow
        int mid = low + (high - low) / 2;

        printf("  Pass %d: Window [%d..%d] -> Mid index [%d] = %d\\n", 
               step++, low, high, mid, arr[mid]);

        if (arr[mid] == target) {
            printf("  -> MATCH CONFIRMED at index %d!\\n", mid);
            return mid;
        } else if (arr[mid] < target) {
            printf("  -> %d < target %d: Discarding left half. Setting low = %d\\n", 
                   arr[mid], target, mid + 1);
            low = mid + 1;
        } else {
            printf("  -> %d > target %d: Discarding right half. Setting high = %d\\n", 
                   arr[mid], target, mid - 1);
            high = mid - 1;
        }
    }

    printf("  -> Search space collapsed (low > high). Target not in array.\\n");
    return -1;
}

int main(void) {
    // Array MUST be strictly sorted
    int sorted_dataset[] = {10, 20, 30, 40, 50, 60, 70};
    int n = sizeof(sorted_dataset) / sizeof(sorted_dataset[0]);

    printf("=========================================\\n");
    printf("   DSAForge: Binary Search Verification  \\n");
    printf("=========================================\\n");
    printf("Sorted Input: [ ");
    for (int i = 0; i < n; i++) printf("%d ", sorted_dataset[i]);
    printf("]\\n\\n");

    // Case 1: Target = 50
    int target1 = 50;
    int res1 = binary_search_iterative(sorted_dataset, n, target1);
    printf("Result 1: Target %d located at index: %d\\n\\n", target1, res1);

    // Case 2: Target = 35 (Absent)
    int target2 = 35;
    int res2 = binary_search_iterative(sorted_dataset, n, target2);
    printf("Result 2: Target %d returned code: %d (Not Found)\\n", target2, res2);

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Git Bisect Bug Tracking Engine',
        category: 'Version Control Systems',
        system: 'Git Core Revision Engine',
        description:
          'git bisect uses binary search on a project commit tree history to identify which specific commit introduced a regression bug out of thousands of historical commits in just ~10 to 15 automated test checks.',
        bullets: [
          'Searches 10,000 commits in at most 14 test steps (log2(10000) ≈ 13.28)',
          'Automates code regression localization with deterministic script execution',
          'Saves hundreds of developer troubleshooting hours on massive codebases'
        ]
      },
      {
        title: 'Database B+Tree Leaf Node Search',
        category: 'Database Engines',
        system: 'PostgreSQL / MySQL InnoDB Storage Engine',
        description:
          'When database engines traverse a B+Tree index to evaluate an SQL query, each index page contains an in-memory sorted array of record keys. Binary search pinpoints the specific record pointer inside the page in nanoseconds.',
        bullets: [
          'Evaluates 512 keys per 16KB disk page in only 9 comparisons',
          'Maximizes database throughput under millions of concurrent reads',
          'Implements lower_bound logic for lightning-fast SQL range scan queries'
        ]
      },
      {
        title: 'Network Routing Table Subnet Lookup',
        category: 'Networking',
        system: 'Cisco IOS / Linux IP Route Table',
        description:
          'Hardware IP packet forwarders organize Classless Inter-Domain Routing (CIDR) routing tables in sorted arrays of IP prefixes to execute Longest Prefix Match (LPM) binary searches at multi-gigabit wire speed.',
        bullets: [
          'Ensures real-time packet forwarding with bounded latency guarantees',
          'Executes millions of address resolutions per second per core',
          'Prevents routing table bottlenecking under high network traffic'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Binary Search Mathematical Complexity',
      summary:
        'Because the search space n is halved in every iteration (n, n/2, n/4, ..., 1), the maximum number of iterations k satisfies n / 2^k = 1, giving k = log2(n).',
      rows: [
        {
          operation: 'Best Case (Mid matches Target on Pass 1)',
          timeComplexity: 'Ω(1)',
          spaceComplexity: 'O(1)',
          notes: 'Target happens to be at the exact initial midpoint; loop executes once.'
        },
        {
          operation: 'Average Case (Target at arbitrary valid position)',
          timeComplexity: 'Θ(log n)',
          spaceComplexity: 'O(1)',
          notes: 'Expected comparison count is approximately log2(n) - 1.'
        },
        {
          operation: 'Worst Case (Target at leaf or absent)',
          timeComplexity: 'O(log n)',
          spaceComplexity: 'O(1)',
          notes: 'Interval is repeatedly halved until low > high, taking exactly floor(log2(n)) + 1 steps.'
        },
        {
          operation: 'Iterative Auxiliary Space',
          timeComplexity: '—',
          spaceComplexity: 'O(1)',
          notes: 'Requires only 3 local integer variables (low, high, mid).'
        },
        {
          operation: 'Recursive Auxiliary Space',
          timeComplexity: '—',
          spaceComplexity: 'O(log n)',
          notes: 'Consumes stack memory proportional to recursion depth (max log2(n) frames).'
        }
      ]
    },
    advantages: [
      'Incredible algorithmic efficiency: searches 1,000,000 items in ≤ 20 comparisons and 1,000,000,000 in ≤ 30 comparisons.',
      'O(1) auxiliary space complexity for the standard iterative version.',
      'Deterministic logarithmic time complexity guarantees predictable performance for real-time systems.',
      'Extensible to complex mathematical search problems (binary search on answer / monotonic functions).'
    ],
    disadvantages: [
      'Strict requirement that the data collection MUST be sorted in advance.',
      'Requires constant O(1) random-access indexing; cannot be used efficiently on linked lists.',
      'Array insertions and deletions are slow O(n) because contiguous order must be preserved.'
    ],
    whenToUse: [
      'When the dataset is already sorted or infrequently updated.',
      'When repeated fast lookup queries are performed over a fixed static list.',
      'When searching monotonic mathematical functions (e.g., finding square roots or optimization boundaries).'
    ],
    whenNotToUse: [
      'When data is unsorted and you only perform a single search (sorting first is O(n log n), which is slower than O(n) linear search).',
      'When data is stored in a linked list or streaming pipe without random access.'
    ],
    commonMistakes: [
      'Attempting binary search on unsorted data, producing completely erratic and incorrect results.',
      'Using (low + high) / 2 instead of low + (high - low) / 2, leading to 32-bit integer overflow bugs.',
      'Incorrect while condition: using low < high instead of low <= high, which misses the target when it resides at the single remaining element where low == high.'
    ],
    interviewQuestions: [
      {
        question: 'Why does integer overflow happen in mid = (low + high) / 2 and how do you fix it?',
        answer:
          'In 32-bit signed integers, values range from -2^31 to 2^31 - 1 (approx 2.14 billion). If low and high are both large positive integers (e.g. low = 1.5B, high = 1.8B), their sum (3.3B) exceeds 2.14B, wrapping around into a negative number due to two\'s complement overflow. Dividing by 2 yields a negative index, crashing with an out-of-bounds error. The fix is mid = low + (high - low) / 2, which never exceeds the value of high.'
      },
      {
        question: 'How many comparisons are required in the worst case to search 1,048,576 elements with Binary Search?',
        answer:
          '1,048,576 = 2^20. In the worst case, binary search inspects floor(log2(n)) + 1 elements. For n = 2^20, this is 20 + 1 = 21 comparisons maximum.'
      },
      {
        question: 'Can Binary Search be implemented efficiently on a Singly Linked List?',
        answer:
          'No. Binary search requires O(1) random access to locate the midpoint element. In a Singly Linked List, reaching the midpoint requires traversing n/2 pointers (O(n) time). The recurrence becomes T(n) = T(n/2) + O(n), which solves to O(n) total time, completely eliminating the logarithmic advantage of binary search.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-bin-1',
        difficulty: 'Easy',
        question: 'What is the maximum number of comparisons needed to search for an element in a sorted array of 128 elements using Binary Search?',
        options: ['128', '64', '8', '16'],
        correctAnswer: 2,
        explanation: 'log2(128) = 7. In the worst case, floor(log2(128)) + 1 = 7 + 1 = 8 comparisons are needed.',
        conceptRef: 'Logarithmic Scalability'
      },
      {
        id: 'q-bin-2',
        difficulty: 'Medium',
        question: 'In a sorted array [10, 20, 30, 40, 50, 60, 70], which element is compared first when searching for target = 20?',
        options: ['10', '40', '30', '20'],
        correctAnswer: 1,
        explanation: 'low = 0, high = 6. mid = 0 + (6-0)/2 = 3. arr[3] = 40. 40 is compared first.',
        conceptRef: 'Algorithm Mechanics'
      },
      {
        id: 'q-bin-3',
        difficulty: 'Medium',
        question: 'What is the auxiliary space complexity of iterative binary search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 0,
        explanation: 'Iterative binary search operates strictly in-place using only three integer index variables (low, high, mid).',
        conceptRef: 'Space Complexity'
      },
      {
        id: 'q-bin-4',
        difficulty: 'Hard',
        question: 'What happens if binary search is executed with while (low < high) instead of while (low <= high)?',
        options: [
          'It runs in an infinite loop',
          'It compiles with a warning',
          'It will fail to find the target if the target is located when low == high',
          'It automatically converts into linear search'
        ],
        correctAnswer: 2,
        explanation: 'If the search space narrows down to a single element where low == high, a while (low < high) condition terminates without evaluating that final candidate element.',
        conceptRef: 'Boundary Invariants'
      }
    ]
  },

  // ==========================================
  // TOPIC 3: BUBBLE SORT
  // ==========================================
  'top-303': {
    id: 'top-303',
    title: 'Bubble Sort',
    sidebarTitle: 'Bubble Sort',
    complexity: 'Easy',
    category: 'Sorting',
    description:
      'Bubble Sort is an elementary comparison-based, in-place, and stable sorting algorithm that repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order. In each pass, the largest unsorted element "bubbles up" to its correct position at the end of the array.',
    unitCode: 'Unit 3: Search & Sort',
    courseCode: 'CS201 / CLRS Problem 2-2',
    coreIdea:
      'Iterate through adjacent element pairs (arr[j], arr[j+1]). If arr[j] > arr[j+1], swap them. After pass 1, the maximum element is guaranteed to be placed at the final index (n - 1). Repeat for n - 1 passes, reducing the inner comparison boundary each time. An optimization flag (swapped) allows early termination in O(n) time if the array is already sorted.',
    howItWorks: [
      'Outer loop runs i from 0 to n - 2 (representing completed passes).',
      'Initialize a boolean flag swapped = false at the beginning of each pass.',
      'Inner loop runs j from 0 to n - 2 - i (comparing adjacent pairs in the unsorted prefix).',
      'If arr[j] > arr[j + 1], swap them and set swapped = true.',
      'After the inner loop finishes, if swapped is still false, no elements were out of order. Break immediately (array is sorted).',
      'The rightmost i + 1 elements are guaranteed to be in their final sorted positions.'
    ],
    pseudocode: `ALGORITHM BubbleSortOptimized(A, n)
  INPUT: Array A of n elements
  OUTPUT: Array A sorted in non-decreasing order

  FOR i = 0 TO n - 2 DO
    swapped = FALSE

    FOR j = 0 TO n - 2 - i DO
      IF A[j] > A[j + 1] THEN
        SWAP(A[j], A[j + 1])
        swapped = TRUE
      END IF
    END FOR

    IF swapped == FALSE THEN
      BREAK    // Early exit: array is already sorted
    END IF
  END FOR`,
    stepByStepExample: {
      title: 'Sorting array [10, 25, 7, 42, 18] with Bubble Sort',
      initialArray: [10, 25, 7, 42, 18],
      steps: [
        {
          stepNumber: 1,
          action: 'Pass 1 - Bubble largest element to index 4',
          arrayState: [10, 7, 25, 18, 42],
          highlightedIndices: [3, 4],
          statusText: 'Comparisons: (10,25) ok -> (25,7) swap -> (25,42) ok -> (42,18) swap. 42 is locked at index 4.'
        },
        {
          stepNumber: 2,
          action: 'Pass 2 - Bubble 2nd largest to index 3',
          arrayState: [7, 10, 18, 25, 42],
          highlightedIndices: [2, 3],
          statusText: 'Comparisons: (10,7) swap -> (10,25) ok -> (25,18) swap. 25 is locked at index 3.'
        },
        {
          stepNumber: 3,
          action: 'Pass 3 - Verify remaining prefix',
          arrayState: [7, 10, 18, 25, 42],
          highlightedIndices: [0, 1],
          statusText: 'Comparisons: (7,10) ok -> (10,18) ok. 0 swaps performed! Early exit flag terminates sort.'
        },
        {
          stepNumber: 4,
          action: 'Complete: Array fully sorted',
          arrayState: [7, 10, 18, 25, 42],
          highlightedIndices: [0, 1, 2, 3, 4],
          statusText: 'Final sorted array: [7, 10, 18, 25, 42]. Total passes: 3.'
        }
      ]
    },
    concepts: [
      {
        name: 'Adjacent Pair Comparison & Bubble Mechanics',
        source: 'CLRS Primary Source',
        definition:
          'Unlike selection sort which can execute long-distance swaps, bubble sort strictly compares immediate neighbors arr[j] and arr[j+1]. This local interaction guarantees algorithmic stability because identical elements never cross each other.',
        example: 'if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }',
        usage: 'Textbook algorithm for demonstrating inversion count and sorting invariants.',
        asciiDiagram: `[10] [25] [ 7] [42] [18]
       ^    ^   -> 25 > 7, SWAP!
[10] [ 7] [25] [42] [18]
                 ^    ^ -> 42 > 18, SWAP!
[10] [ 7] [25] [18] | [42] (42 sorted)`
      },
      {
        name: 'Optimized Early Termination via Swapped Flag',
        source: 'Verified Academic Curriculum',
        definition:
          'Unoptimized bubble sort always executes n(n-1)/2 comparisons regardless of initial array state. By maintaining a boolean swapped flag, execution halts after a single pass of n - 1 comparisons if the input is already sorted, reducing best-case time from O(n^2) to Ω(n).',
        example: 'bool swapped = false; ... if (!swapped) break;',
        usage: 'Essential enhancement for adaptive sorting behavior.'
      },
      {
        name: 'Algorithmic Stability Invariant',
        source: 'CLRS Primary Source',
        definition:
          'A sorting algorithm is STABLE if elements with equal keys maintain their relative input order. Because bubble sort uses a strict greater-than check (arr[j] > arr[j+1]) and never swaps equal keys (arr[j] == arr[j+1]), original relative ordering is preserved.',
        example: '[4a, 4b, 2] -> (4a,4b) no swap -> (4b,2) swap -> [4a, 2, 4b] -> [2, 4a, 4b]. 4a stays before 4b.',
        usage: 'Multi-column database sorting (e.g., sort by First Name, then sort stably by Last Name).'
      }
    ],
    comparisonTable: {
      header1: 'Bubble Sort',
      header2: 'Selection Sort',
      rows: [
        {
          aspect: 'Swaps Performed',
          col1: 'Up to O(n^2) swaps (many swaps per pass)',
          col2: 'At most n - 1 swaps total (exactly 1 swap per pass)'
        },
        {
          aspect: 'Stability',
          col1: 'Stable (adjacent swaps preserve equal key order)',
          col2: 'Unstable in standard swap implementation'
        },
        {
          aspect: 'Best Case Time',
          col1: 'Ω(n) with swapped flag optimization',
          col2: 'Ω(n^2) always (must inspect all unsorted items for min)'
        },
        {
          aspect: 'Adaptive Behavior',
          col1: 'Highly adaptive to nearly sorted data',
          col2: 'Non-adaptive (same comparisons regardless of order)'
        }
      ]
    },
    operations: [
      {
        id: 'op-bub-swap',
        name: 'Adjacent Swap & Flag Update',
        definition: 'Exchanging adjacent inversion pairs and marking pass activity.',
        explanation:
          'Swaps values using a temporary register and records swapped = true to prevent premature loop exit.',
        arrayExample: 'Swap (25, 7) -> [..., 7, 25, ...].',
        realWorldExample: 'Simple graphical sorting visualization demos.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(1)',
          worst: 'O(1)',
          assumptions: 'Primitive 4-byte integer swap in memory.'
        },
        cSnippet: `if (arr[j] > arr[j + 1]) {
    int temp = arr[j];
    arr[j] = arr[j + 1];
    arr[j + 1] = temp;
    swapped = true;
}`
      },
      {
        id: 'op-bub-boundary',
        name: 'Boundary Contraction',
        definition: 'Reducing inner loop limit as suffix elements lock into place.',
        explanation:
          'After pass i, the largest i elements occupy the last i positions. The inner loop safely stops at n - 2 - i.',
        arrayExample: 'Pass 1 checks up to index 3; Pass 2 checks up to index 2.',
        realWorldExample: 'Saves 50% of inner comparisons over fixed n loops.',
        timeComplexity: {
          best: 'Ω(n)',
          average: 'Θ(n^2)',
          worst: 'O(n^2)',
          assumptions: 'Arithmetic boundary decrement.'
        },
        cSnippet: `for (int j = 0; j < n - 1 - i; j++) {
    // Inner loop bounds shrink with outer index i
}`
      }
    ],
    cCode: {
      filename: 'bubble_sort.c',
      description: 'Optimized ISO C99 Bubble Sort with swapped flag, telemetry tracing, and pass counters.',
      code: `/*
 * DSAForge Educational Series - Chapter 3: Search & Sort
 * File: bubble_sort.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Optimized Bubble Sort with Early Exit Swapped Flag
 */

#include <stdio.h>
#include <stdbool.h>

/**
 * Sorts an array using Optimized Bubble Sort.
 * 
 * @param arr Array of integers to sort
 * @param n   Number of elements in the array
 */
void bubble_sort(int arr[], int n) {
    int total_comparisons = 0;
    int total_swaps = 0;

    printf("[Bubble Sort Engine]: Initializing sort for n = %d\\n", n);

    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        printf("--- Pass %d (Targeting placement of %d-th largest item) ---\\n", i + 1, i + 1);

        for (int j = 0; j < n - 1 - i; j++) {
            total_comparisons++;
            if (arr[j] > arr[j + 1]) {
                // Adjacent pair inversion detected: Swap
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                swapped = true;
                total_swaps++;
                printf("  Swap: arr[%d](%d) <-> arr[%d](%d)\\n", j, arr[j+1], j+1, arr[j]);
            }
        }

        // Telemetry state at end of pass
        printf("  Pass %d State: [ ", i + 1);
        for (int k = 0; k < n; k++) printf("%d ", arr[k]);
        printf("]\\n");

        // Optimization: If no elements were swapped, array is fully sorted!
        if (!swapped) {
            printf("[Early Exit]: Zero swaps in pass %d. Array is completely sorted!\\n", i + 1);
            break;
        }
    }

    printf("\\n[Sort Complete]: Total Comparisons = %d, Total Swaps = %d\\n", 
           total_comparisons, total_swaps);
}

int main(void) {
    int data[] = {10, 25, 7, 42, 18};
    int n = sizeof(data) / sizeof(data[0]);

    printf("=========================================\\n");
    printf("     DSAForge: Bubble Sort Verification  \\n");
    printf("=========================================\\n");
    printf("Initial Array: [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n\\n");

    bubble_sort(data, n);

    printf("\\nFinal Sorted:  [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n");

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Computer Graphics Z-Buffer Depth Check',
        category: 'Graphics Programming',
        system: 'Legacy 2.5D Sprite Rendering Engines',
        description:
          'When drawing transparent sprites from back to front (Painter\'s Algorithm), game entities move slightly between consecutive 60 FPS frames. Since the sprite list is nearly sorted each frame, an optimized bubble sort verifies depth order in near-linear O(n) time.',
        bullets: [
          'Runs in O(n) time when elements are already mostly in order',
          'Stable sort property prevents flickering artifacts between identical depth planes',
          'Trivial memory footprint for low-power embedded gaming handhelds'
        ]
      },
      {
        title: 'Microcontroller Low-Power Sorting',
        category: 'Embedded Systems',
        system: 'IoT Sensor Nodes (ATTiny / PIC Microcontrollers)',
        description:
          'Small microcontrollers with strict ROM constraints (<1KB) cannot afford the code footprint of QuickSort or MergeSort. Bubble sort compiles into tiny machine code routines with zero stack or heap overhead.',
        bullets: [
          'Minimal binary instruction footprint (under 30 assembly instructions)',
          'Operates strictly in-place without recursion stack allocations',
          'Easy verification for safety-critical industrial firmware'
        ]
      },
      {
        title: 'Operating System Process Priority Auditing',
        category: 'Operating Systems',
        system: 'RTOS Task Queue Maintenance',
        description:
          'In micro-RTOS kernels where tasks shift priorities incrementally by ±1, a single bubble sort pass checks and corrects single-inversion priority discrepancies immediately.',
        bullets: [
          'Corrects single-inversion perturbations in a single O(n) pass',
          'In-place reordering guarantees zero memory allocation during interrupt context',
          'Stable ordering preserves FIFO dispatch order among equal priority tasks'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Bubble Sort Complexity Analysis',
      summary:
        'Standard Bubble Sort makes n(n-1)/2 comparisons. The optimized version achieves Ω(n) on pre-sorted arrays using the swapped flag.',
      rows: [
        {
          operation: 'Best Case (Array Already Sorted)',
          timeComplexity: 'Ω(n)',
          spaceComplexity: 'O(1)',
          notes: 'Pass 1 completes with 0 swaps; early exit flag halts algorithm in n - 1 comparisons.'
        },
        {
          operation: 'Average Case (Random Permutation)',
          timeComplexity: 'Θ(n^2)',
          spaceComplexity: 'O(1)',
          notes: 'Performs approximately n(n-1)/4 comparisons and swaps.'
        },
        {
          operation: 'Worst Case (Array Reversed)',
          timeComplexity: 'O(n^2)',
          spaceComplexity: 'O(1)',
          notes: 'Requires exactly n(n-1)/2 comparisons and n(n-1)/2 swaps.'
        },
        {
          operation: 'Auxiliary Memory Space',
          timeComplexity: '—',
          spaceComplexity: 'O(1)',
          notes: 'Strictly in-place. Requires only temporary swap register.'
        }
      ]
    },
    advantages: [
      'Simple and intuitive concept with clear visual step-by-step logic.',
      'Strictly in-place O(1) auxiliary space complexity.',
      'Naturally STABLE: preserves relative ordering of equal keys.',
      'Adaptive: achieves Ω(n) linear performance on already-sorted arrays when optimized with a swapped flag.'
    ],
    disadvantages: [
      'Quadratic O(n^2) worst and average time complexity makes it unsuitable for large datasets.',
      'Performs excessive memory write operations (up to O(n^2) swaps) compared to Selection Sort (O(n) swaps).',
      'Significantly slower in real-world benchmarks than Insertion Sort, which also operates in O(n^2) but with lower constant factors.'
    ],
    whenToUse: [
      'For educational and pedagogical instruction on sorting mechanics, invariants, and stability.',
      'When testing whether an array is already sorted (takes a single O(n) pass).',
      'In severely memory-constrained microcontroller environments where code space is tiny.'
    ],
    whenNotToUse: [
      'For general-purpose sorting on datasets where n > 50 elements.',
      'When write cycles are expensive (e.g., EEPROM/Flash memory, where Selection Sort\'s O(n) writes are vastly superior).',
      'In production performance-critical sorting routines (use QuickSort, MergeSort, or Timsort).'
    ],
    commonMistakes: [
      'Omitting the swapped flag optimization, forcing the algorithm to run in O(n^2) even on already sorted data.',
      'Failing to decrement the inner loop boundary (running j < n - 1 instead of j < n - 1 - i), resulting in redundant comparisons against already-sorted suffix elements.',
      'Using >= instead of > in the comparison, which destroys algorithm stability by swapping equal keys.'
    ],
    interviewQuestions: [
      {
        question: 'Why is Bubble Sort considered a stable sorting algorithm?',
        answer:
          'Bubble Sort only swaps elements when arr[j] is strictly greater than arr[j+1] (arr[j] > arr[j+1]). If two adjacent elements have identical values (arr[j] == arr[j+1]), no swap occurs. Therefore, their relative order in the input array is strictly preserved.'
      },
      {
        question: 'What is the maximum number of swaps performed by Bubble Sort on an array of n elements?',
        answer:
          'The maximum number of swaps occurs when the array is in reverse sorted order. Every element must be swapped past every other element, resulting in exactly n(n - 1) / 2 swaps.'
      },
      {
        question: 'How does the swapped flag optimize Bubble Sort from O(n^2) to O(n)?',
        answer:
          'In each pass, the swapped flag starts as false. If any swap occurs, it is set to true. If a full pass completes and swapped is still false, it proves that no adjacent inversions exist in the array (the array is completely sorted). The algorithm breaks immediately after n - 1 comparisons, achieving Ω(n) linear time.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-bub-1',
        difficulty: 'Easy',
        question: 'After the first full pass of Bubble Sort on an array of size n, which element is guaranteed to be in its final position?',
        options: ['The smallest element at index 0', 'The largest element at index n - 1', 'The median element', 'No element is guaranteed'],
        correctAnswer: 1,
        explanation: 'In pass 1, adjacent comparisons bubble the maximum element through the array until it settles at the final index (n - 1).',
        conceptRef: 'Bubble Sort Invariant'
      },
      {
        id: 'q-bub-2',
        difficulty: 'Medium',
        question: 'What is the minimum number of comparisons made by an optimized Bubble Sort on an already-sorted array of 10 elements?',
        options: ['0', '9', '45', '100'],
        correctAnswer: 1,
        explanation: 'The first pass compares all adjacent pairs: 10 - 1 = 9 comparisons. Since 0 swaps occur, the swapped flag triggers an early exit.',
        conceptRef: 'Adaptive Best Case'
      },
      {
        id: 'q-bub-3',
        difficulty: 'Medium',
        question: 'How many total comparisons are performed by unoptimized Bubble Sort on an array of size n = 5?',
        options: ['5', '10', '25', '20'],
        correctAnswer: 1,
        explanation: 'n(n - 1) / 2 = 5 * 4 / 2 = 10 comparisons.',
        conceptRef: 'Mathematical Counting'
      },
      {
        id: 'q-bub-4',
        difficulty: 'Hard',
        question: 'Which of the following modifications to Bubble Sort would make it UNSTABLE?',
        options: [
          'Changing arr[j] > arr[j+1] to arr[j] >= arr[j+1]',
          'Adding the swapped boolean early-exit flag',
          'Decreasing the inner loop limit by i',
          'Sorting from right to left instead of left to right'
        ],
        correctAnswer: 0,
        explanation: 'If arr[j] >= arr[j+1] is used, equal keys will be swapped with each other, altering their relative order and destroying stability.',
        conceptRef: 'Stability Invariant'
      }
    ]
  },

  // ==========================================
  // TOPIC 4: INSERTION SORT
  // ==========================================
  'top-304': {
    id: 'top-304',
    title: 'Insertion Sort',
    sidebarTitle: 'Insertion Sort',
    complexity: 'Easy',
    category: 'Sorting',
    description:
      'Insertion Sort is an intuitive, stable, and in-place comparison sorting algorithm that builds the final sorted array one item at a time. It maintains a sorted sub-array at the front and repeatedly extracts the next element ("key"), shifting larger preceding elements rightward to insert the key into its correct position.',
    unitCode: 'Unit 3: Search & Sort',
    courseCode: 'CS201 / CLRS Ch. 2.1',
    coreIdea:
      'Analogous to sorting playing cards in hand: consider arr[0] as a sorted hand of size 1. For each subsequent card i from 1 to n - 1, pick key = arr[i]. Compare key backwards with elements in the sorted portion (j = i - 1 down to 0). Shift all elements greater than key one position to the right. Place key into the created opening at arr[j + 1].',
    howItWorks: [
      'Index 0 is trivially considered sorted by definition.',
      'Outer loop runs i from 1 to n - 1: extract key = arr[i].',
      'Set scanning pointer j = i - 1.',
      'Inner while loop: while j >= 0 and arr[j] > key:',
      '  - Shift element rightward: arr[j + 1] = arr[j].',
      '  - Decrement pointer: j = j - 1.',
      'Place the key into its proper sorted slot: arr[j + 1] = key.',
      'Sorted sub-array expands by one element each iteration until the entire array is sorted.'
    ],
    pseudocode: `ALGORITHM InsertionSort(A, n)
  INPUT: Array A of n elements
  OUTPUT: Array A sorted in non-decreasing order

  FOR i = 1 TO n - 1 DO
    key = A[i]
    j = i - 1

    // Shift elements of A[0..i-1] that are greater than key to the right
    WHILE j >= 0 AND A[j] > key DO
      A[j + 1] = A[j]
      j = j - 1
    END WHILE

    A[j + 1] = key    // Insert key into vacant position
  END FOR`,
    stepByStepExample: {
      title: 'Sorting array [10, 25, 7, 42, 18] with Insertion Sort',
      initialArray: [10, 25, 7, 42, 18],
      steps: [
        {
          stepNumber: 1,
          action: 'i = 1: Key = 25',
          arrayState: [10, 25, 7, 42, 18],
          highlightedIndices: [0, 1],
          statusText: 'Sorted prefix: [10]. Key = 25. Compare 10 <= 25 -> No shift needed. 25 placed at index 1.'
        },
        {
          stepNumber: 2,
          action: 'i = 2: Key = 7',
          arrayState: [7, 10, 25, 42, 18],
          highlightedIndices: [0, 1, 2],
          statusText: 'Sorted prefix: [10, 25]. Key = 7. Shift 25 right, Shift 10 right. Insert 7 at index 0.'
        },
        {
          stepNumber: 3,
          action: 'i = 3: Key = 42',
          arrayState: [7, 10, 25, 42, 18],
          highlightedIndices: [2, 3],
          statusText: 'Sorted prefix: [7, 10, 25]. Key = 42. Compare 25 <= 42 -> No shift needed. 42 stays at index 3.'
        },
        {
          stepNumber: 4,
          action: 'i = 4: Key = 18',
          arrayState: [7, 10, 18, 25, 42],
          highlightedIndices: [2, 3, 4],
          statusText: 'Sorted prefix: [7, 10, 25, 42]. Key = 18. Shift 42, Shift 25. Insert 18 at index 2. Array fully sorted!'
        }
      ]
    },
    concepts: [
      {
        name: 'Sorted vs Unsorted Partition Invariant',
        source: 'CLRS Primary Source',
        definition:
          'At the start of outer loop iteration i, the sub-array arr[0..i-1] consists of the original elements originally in positions 0 through i - 1, but sorted in non-decreasing order. This is the canonical Loop Invariant of Insertion Sort.',
        example: '[ 7, 10, 25 | 42, 18 ] -> Left of line is strictly sorted, right of line is unsorted.',
        usage: 'Formal verification of correctness via mathematical induction in CLRS.',
        asciiDiagram: `[ 7  10  25 |  18  42 ]
  ---SORTED--   KEY=18
  Shift 25 ->
  Shift 42 ->
[ 7  10  18  25  42 ]`
      },
      {
        name: 'Shift vs Swap Efficiency',
        source: 'Verified Academic Curriculum',
        definition:
          'Bubble sort requires 3 memory assignments per swap (temp = a; a = b; b = temp). Insertion sort performs a single shift assignment per comparison (arr[j+1] = arr[j]) and writes the key only once after shifting finishes. This makes Insertion Sort roughly 2x faster than Bubble Sort in practice.',
        example: 'arr[j + 1] = arr[j]; // 1 memory write instead of 3 writes for swap',
        usage: 'Key reason Insertion Sort is preferred over Bubble Sort in standard libraries.'
      },
      {
        name: 'Online Sorting Capability',
        source: 'CLRS Primary Source',
        definition:
          'An algorithm is ONLINE if it can process a piece-by-piece stream of inputs without requiring the entire dataset upfront. Insertion sort can accept new numbers arriving one-by-one and insert each into the existing sorted structure in O(n) time.',
        example: 'stream_insert(arr, current_size, new_arrived_element);',
        usage: 'Real-time telemetry event streams, live scoreboards.'
      }
    ],
    comparisonTable: {
      header1: 'Insertion Sort',
      header2: 'Bubble Sort',
      rows: [
        {
          aspect: 'Memory Writes Per Inversion',
          col1: '1 shift write per comparison + 1 key write per pass',
          col2: '3 memory writes per swap'
        },
        {
          aspect: 'Best Case (Sorted Array)',
          col1: 'Ω(n) time (exactly n - 1 comparisons, 0 shifts)',
          col2: 'Ω(n) time (only with extra boolean swapped flag)'
        },
        {
          aspect: 'Practical Speed',
          col1: 'Fastest elementary sort; low constant factor',
          col2: 'Slower due to heavy swap overhead'
        },
        {
          aspect: 'Production Use',
          col1: 'Active core subroutine in Timsort and Introsort',
          col2: 'Virtually never used in production standard libraries'
        }
      ]
    },
    operations: [
      {
        id: 'op-ins-shift',
        name: 'Rightward Memory Shift',
        definition: 'Displaces elements greater than key one slot rightward to make space.',
        explanation:
          'Assigns arr[j+1] = arr[j] while scanning backwards through the sorted sub-array.',
        arrayExample: 'Shifting 25 to index 3 creates vacancy at index 2.',
        realWorldExample: 'Inserting a card into a sorted playing deck.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(n)',
          worst: 'O(n)',
          assumptions: 'Contiguous array memory layout.'
        },
        cSnippet: `while (j >= 0 && arr[j] > key) {
    arr[j + 1] = arr[j]; // Single write shift
    j--;
}
arr[j + 1] = key;`
      },
      {
        id: 'op-ins-online',
        name: 'Single Element Online Insertion',
        definition: 'Inserts a new value into an already sorted list in O(n) time.',
        explanation:
          'Extends array size by 1 and places the new element into its exact sorted position.',
        arrayExample: 'Inserting 15 into [10, 20, 30] yields [10, 15, 20, 30].',
        realWorldExample: 'Live auction bidding order maintenance.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(n)',
          worst: 'O(n)',
          assumptions: 'Array has pre-allocated spare capacity.'
        },
        cSnippet: `void insert_sorted(int arr[], int *n, int val) {
    int i = *n - 1;
    while (i >= 0 && arr[i] > val) {
        arr[i + 1] = arr[i];
        i--;
    }
    arr[i + 1] = val;
    (*n)++;
}`
      }
    ],
    cCode: {
      filename: 'insertion_sort.c',
      description: 'ISO C99 Insertion Sort implementation with telemetry tracking and detailed pass breakdown.',
      code: `/*
 * DSAForge Educational Series - Chapter 3: Search & Sort
 * File: insertion_sort.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Insertion Sort with Shift Tracing and Step Telemetry
 */

#include <stdio.h>

/**
 * Sorts an array of integers using Insertion Sort.
 * 
 * @param arr Pointer to the integer array
 * @param n   Number of elements in the array
 */
void insertion_sort(int arr[], int n) {
    int total_shifts = 0;
    int total_comparisons = 0;

    printf("[Insertion Sort Engine]: Starting sort for n = %d\\n", n);

    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;

        printf("--- Step %d: Extracted Key = %d at index [%d] ---\\n", i, key, i);
        printf("  Sorted sub-array before insertion: [ ");
        for (int k = 0; k < i; k++) printf("%d ", arr[k]);
        printf("]\\n");

        // Shift elements of arr[0..i-1] that are greater than key
        while (j >= 0) {
            total_comparisons++;
            if (arr[j] > key) {
                printf("    Shift: arr[%d] (%d) > key (%d) -> moving to index [%d]\\n", 
                       j, arr[j], key, j + 1);
                arr[j + 1] = arr[j];
                total_shifts++;
                j--;
            } else {
                printf("    Stop: arr[%d] (%d) <= key (%d) -> correct position found\\n", 
                       j, arr[j], key);
                break;
            }
        }

        // Insert the key into its correct sorted slot
        arr[j + 1] = key;
        printf("  Inserted Key %d at index [%d]\\n", key, j + 1);
        printf("  Current Array: [ ");
        for (int k = 0; k < n; k++) printf("%d ", arr[k]);
        printf("]\\n\\n");
    }

    printf("[Sort Complete]: Comparisons = %d, Shifts = %d\\n", 
           total_comparisons, total_shifts);
}

int main(void) {
    int dataset[] = {10, 25, 7, 42, 18};
    int n = sizeof(dataset) / sizeof(dataset[0]);

    printf("=========================================\\n");
    printf("   DSAForge: Insertion Sort Verification \\n");
    printf("=========================================\\n");
    printf("Unsorted Input: [ ");
    for (int i = 0; i < n; i++) printf("%d ", dataset[i]);
    printf("]\\n\\n");

    insertion_sort(dataset, n);

    printf("Final Sorted:   [ ");
    for (int i = 0; i < n; i++) printf("%d ", dataset[i]);
    printf("]\\n");

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Timsort Base Sort Subroutine',
        category: 'Language Standard Libraries',
        system: 'Python sorted() / Java Arrays.sort()',
        description:
          'Timsort (the default sorting algorithm in Python, Java 7+, Android, and Rust) divides large arrays into chunks of 32 to 64 items and uses Binary Insertion Sort to sort each chunk because Insertion Sort is unbeatable on small partitions.',
        bullets: [
          'Runs with minimal overhead on small sub-arrays (n < 64)',
          'Capitalizes on pre-existing ordered runs in real-world data',
          'Preserves stability across complex multi-key objects'
        ]
      },
      {
        title: 'Live Auction Bidding Order',
        category: 'Financial Technology',
        system: 'Real-Time Financial Order Books',
        description:
          'When high-frequency trading engines receive new bids, the existing order book is already sorted by price. Inserting a newly arrived bid into the live book executes in near-O(1) to O(k) time using insertion sort mechanics.',
        bullets: [
          'Online processing: handles continuous stream of incoming bids without re-sorting the whole book',
          'Deterministic in-place latency with zero dynamic heap allocation',
          'Stable ordering guarantees strict price-time priority fairness'
        ]
      },
      {
        title: 'Introsort Base Sort Subroutine',
        category: 'Systems Programming',
        system: 'C++ Standard Template Library (std::sort)',
        description:
          'GNU libstdc++ std::sort uses Introsort (hybrid QuickSort + HeapSort). When recursive partitions drop below 16 elements, it switches directly to Insertion Sort to avoid function call overhead.',
        bullets: [
          'Eliminates QuickSort recursive stack overhead on tiny partitions',
          'Maximizes L1 cache hit rate by working within a single cache line',
          'Achieves peak sorting throughput in GCC runtime'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Insertion Sort Complexity Matrix',
      summary:
        'Insertion Sort is highly adaptive: on nearly-sorted data it runs in linear Ω(n) time with minimal comparisons.',
      rows: [
        {
          operation: 'Best Case (Array Already Sorted)',
          timeComplexity: 'Ω(n)',
          spaceComplexity: 'O(1)',
          notes: 'Every element key is compared only once with its predecessor; 0 shifts occur.'
        },
        {
          operation: 'Average Case (Random Permutation)',
          timeComplexity: 'Θ(n^2)',
          spaceComplexity: 'O(1)',
          notes: 'Each element key shifts past half of the sorted prefix (~n^2 / 4 shifts).'
        },
        {
          operation: 'Worst Case (Array Reverse Sorted)',
          timeComplexity: 'O(n^2)',
          spaceComplexity: 'O(1)',
          notes: 'Every key must shift past all preceding elements; n(n - 1) / 2 shifts.'
        },
        {
          operation: 'Auxiliary Memory Space',
          timeComplexity: '—',
          spaceComplexity: 'O(1)',
          notes: 'Strictly in-place. Requires only one key variable.'
        }
      ]
    },
    advantages: [
      'Fastest sorting algorithm for small arrays (n ≤ 32) due to tiny constant factors and cache locality.',
      'Adaptive: runs in Ω(n) time on nearly-sorted data.',
      'Stable: maintains relative order of equal keys.',
      'Strictly in-place: O(1) auxiliary memory.',
      'Online: can sort a continuous stream of data as it arrives.'
    ],
    disadvantages: [
      'Quadratic O(n^2) time complexity makes it inefficient for large arrays.',
      'Excessive element shifts when small values reside near the end of the array.'
    ],
    whenToUse: [
      'When n is small (n < 32 to 50 elements).',
      'When the array is already nearly sorted (e.g., only a few elements are displaced).',
      'As the base-case sorting subroutine in hybrid algorithms (Timsort, Introsort).',
      'When processing real-time streaming data.'
    ],
    whenNotToUse: [
      'When sorting large datasets (n > 1,000) with random or reverse ordering (use QuickSort/MergeSort).'
    ],
    commonMistakes: [
      'Writing arr[j] = arr[j+1] instead of arr[j+1] = arr[j], which overwrites elements with incorrect values.',
      'Forgetting to insert key at arr[j+1] after the while loop finishes.',
      'Failing to include the j >= 0 check, causing negative array indexing in C.'
    ],
    interviewQuestions: [
      {
        question: 'Why do production hybrid algorithms like Timsort and Introsort use Insertion Sort for small arrays?',
        answer:
          'Advanced algorithms like QuickSort and MergeSort carry overhead: recursion stack allocations, pivot partition checks, and auxiliary merge buffers. For small arrays (n < 32), this overhead outweighs the asymptotic benefit. Insertion Sort has virtually zero setup overhead, executes simple loop branches, and operates entirely within a single L1 CPU cache line, making it faster in actual wall-clock execution.'
      },
      {
        question: 'What is the relationship between Insertion Sort running time and the number of inversions in an array?',
        answer:
          'The number of shifts performed by Insertion Sort is EXACTLY equal to the number of inversions in the input array. If an array has I inversions, Insertion Sort runs in O(n + I) time. When the array is nearly sorted (I = O(n)), Insertion Sort runs in strictly linear O(n) time.'
      },
      {
        question: 'How does Binary Insertion Sort improve on standard Insertion Sort?',
        answer:
          'Binary Insertion Sort uses Binary Search to find the correct insertion index for the key in O(log n) comparisons instead of O(n) sequential comparisons. However, shifting the elements still takes O(n) time, so total worst-case time remains O(n^2), although total comparisons drop to O(n log n).'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-ins-1',
        difficulty: 'Easy',
        question: 'What is the best-case time complexity of Insertion Sort on an already-sorted array?',
        options: ['O(n^2)', 'O(n log n)', 'Ω(n)', 'O(1)'],
        correctAnswer: 2,
        explanation: 'For an already sorted array, each key is compared once with its predecessor and 0 shifts are made, executing in linear Ω(n) time.',
        conceptRef: 'Best-Case Performance'
      },
      {
        id: 'q-ins-2',
        difficulty: 'Medium',
        question: 'In Insertion Sort, what happens to elements that are greater than the key being inserted?',
        options: [
          'They are swapped with the first element of the array',
          'They are deleted from the array',
          'They are shifted one position to the right',
          'They are moved to an auxiliary external queue'
        ],
        correctAnswer: 2,
        explanation: 'Elements in the sorted sub-array that are greater than key are shifted rightward by one index to create a vacancy for the key.',
        conceptRef: 'Shift Mechanics'
      },
      {
        id: 'q-ins-3',
        difficulty: 'Medium',
        question: 'How many shifts are performed by Insertion Sort on the array [1, 2, 3, 4, 5]?',
        options: ['0 shifts', '4 shifts', '10 shifts', '5 shifts'],
        correctAnswer: 0,
        explanation: 'Since the array is already sorted, no element is greater than its subsequent key. Exactly 0 shifts are performed.',
        conceptRef: 'Inversion Count'
      },
      {
        id: 'q-ins-4',
        difficulty: 'Hard',
        question: 'If an array of size n has exactly k inversions, what is the exact time complexity of Insertion Sort?',
        options: ['O(n * k)', 'O(n + k)', 'O(k^2)', 'O(n log k)'],
        correctAnswer: 1,
        explanation: 'Each shift resolves exactly one inversion (k shifts total), and the outer loop performs n iterations. Thus, total time is O(n + k).',
        conceptRef: 'Inversion Complexity Theorem'
      }
    ]
  },

  // ==========================================
  // TOPIC 5: SELECTION SORT
  // ==========================================
  'top-305': {
    id: 'top-305',
    title: 'Selection Sort',
    sidebarTitle: 'Selection Sort',
    complexity: 'Easy',
    category: 'Sorting',
    description:
      'Selection Sort is an in-place comparison sorting algorithm that divides the array into a sorted sub-array at the front and an unsorted sub-array at the back. In each pass, it scans the entire unsorted sub-array to find the minimum element, and exchanges it with the first unsorted element, minimizing memory write operations.',
    unitCode: 'Unit 3: Search & Sort',
    courseCode: 'CS201 / CLRS Problem 2-1',
    coreIdea:
      'Selection Sort repeatedly finds the smallest element in the unsorted portion and swaps it into its final sorted position. DIFFERENCE FROM BUBBLE SORT: While Bubble Sort performs up to O(n^2) swaps as it compares adjacent pairs, Selection Sort performs at most ONE swap per pass, guaranteeing at most n - 1 total swaps (O(n) writes).',
    howItWorks: [
      'Outer loop runs i from 0 to n - 2 (current target slot for the minimum element).',
      'Assume the element at index i is the minimum: min_idx = i.',
      'Inner loop scans j from i + 1 to n - 1:',
      '  - If arr[j] < arr[min_idx], update candidate index: min_idx = j.',
      'After scanning the entire unsorted suffix, if min_idx != i, swap arr[i] with arr[min_idx].',
      'Repeat until all positions are filled. The algorithm guarantees at most n - 1 memory writes.'
    ],
    pseudocode: `ALGORITHM SelectionSort(A, n)
  INPUT: Array A of n elements
  OUTPUT: Array A sorted in non-decreasing order

  FOR i = 0 TO n - 2 DO
    min_idx = i

    // Find the minimum element in the unsorted suffix A[i+1..n-1]
    FOR j = i + 1 TO n - 1 DO
      IF A[j] < A[min_idx] THEN
        min_idx = j
      END IF
    END FOR

    // Swap the found minimum element with the first unsorted position
    IF min_idx != i THEN
      SWAP(A[i], A[min_idx])
    END IF
  END FOR`,
    stepByStepExample: {
      title: 'Sorting array [25, 10, 7, 42, 18] with Selection Sort',
      initialArray: [25, 10, 7, 42, 18],
      steps: [
        {
          stepNumber: 1,
          action: 'Pass 1: Find minimum in [25, 10, 7, 42, 18]',
          arrayState: [7, 10, 25, 42, 18],
          highlightedIndices: [0, 2],
          statusText: 'Minimum found is 7 at index 2. Swap arr[0] (25) with arr[2] (7). Index 0 locked.'
        },
        {
          stepNumber: 2,
          action: 'Pass 2: Find minimum in [10, 25, 42, 18]',
          arrayState: [7, 10, 25, 42, 18],
          highlightedIndices: [1],
          statusText: 'Minimum found is 10 at index 1. Already in place (min_idx == 1, no swap). Index 1 locked.'
        },
        {
          stepNumber: 3,
          action: 'Pass 3: Find minimum in [25, 42, 18]',
          arrayState: [7, 10, 18, 42, 25],
          highlightedIndices: [2, 4],
          statusText: 'Minimum found is 18 at index 4. Swap arr[2] (25) with arr[4] (18). Index 2 locked.'
        },
        {
          stepNumber: 4,
          action: 'Pass 4: Find minimum in [42, 25]',
          arrayState: [7, 10, 18, 25, 42],
          highlightedIndices: [3, 4],
          statusText: 'Minimum found is 25 at index 4. Swap arr[3] (42) with arr[4] (25). Array fully sorted!'
        }
      ]
    },
    concepts: [
      {
        name: 'Write Minimization Property (O(n) Memory Writes)',
        source: 'CLRS Primary Source',
        definition:
          'Selection sort is unique among elementary sorting algorithms because it executes at most n - 1 swaps in total. While it performs O(n^2) comparisons, memory writes are strictly bounded by O(n), making it valuable when write operations wear out memory.',
        example: 'Total writes <= 3 * (n - 1) assignments across the entire sort.',
        usage: 'Sorting in EEPROM / Flash memory microcontrollers where writes cause physical wear.',
        asciiDiagram: `Pass 1: [ 25  10  (7)  42  18 ] -> Min=7, Swap with arr[0]
        [  7 | 10  25  42  18 ]
Pass 2: [  7 |(10) 25  42  18 ] -> Min=10, already in place
        [  7   10 | 25  42 (18)] -> Min=18, Swap with arr[2]
        [  7   10   18 | 25  42 ] -> Sorted!`
      },
      {
        name: 'Instability in Standard Swap Selection Sort',
        source: 'CLRS Primary Source',
        definition:
          'Standard Selection Sort is UNSTABLE because long-range swaps can jump an element over identical keys. For example, sorting [4a, 4b, 1] finds min 1 at index 2 and swaps with arr[0] (4a), resulting in [1, 4b, 4a]. The relative order of 4a and 4b is reversed.',
        example: '[5a, 5b, 2] -> 2 swaps with 5a -> [2, 5b, 5a]. 5b now precedes 5a!',
        usage: 'Contrast with Bubble Sort and Insertion Sort which are naturally stable.'
      },
      {
        name: 'Non-Adaptive Comparison Counting',
        source: 'Verified Academic Curriculum',
        definition:
          'Unlike Bubble Sort and Insertion Sort, Selection Sort CANNOT adapt to already-sorted data. It must always scan every unsorted element to confirm that no smaller candidate exists, resulting in Θ(n^2) comparisons across all best, average, and worst cases.',
        example: 'Even on [1, 2, 3, 4, 5], Selection Sort makes exactly 4 + 3 + 2 + 1 = 10 comparisons.',
        usage: 'Predictable worst-case and best-case execution bounds.'
      }
    ],
    comparisonTable: {
      header1: 'Selection Sort',
      header2: 'Bubble Sort',
      rows: [
        {
          aspect: 'Total Swaps',
          col1: 'At most n - 1 swaps total (O(n) writes)',
          col2: 'Up to n(n - 1) / 2 swaps (O(n^2) writes)'
        },
        {
          aspect: 'Stability',
          col1: 'Unstable (long-range swaps displace equal keys)',
          col2: 'Stable (adjacent swaps never cross equal keys)'
        },
        {
          aspect: 'Best Case Comparisons',
          col1: 'Θ(n^2) comparisons always',
          col2: 'Ω(n) comparisons with swapped flag'
        },
        {
          aspect: 'Ideal Hardware Target',
          col1: 'Flash memory / EEPROM where writes wear out chips',
          col2: 'Graphics depth sorting and education'
        }
      ]
    },
    operations: [
      {
        id: 'op-sel-scan',
        name: 'Minimum Element Scan',
        definition: 'Linearly scans the unsorted suffix to find the index of the smallest element.',
        explanation:
          'Initializes min_idx = i and tests arr[j] < arr[min_idx] for all j from i + 1 to n - 1.',
        arrayExample: 'Scanning [25, 42, 18] finds min 18 at index 4.',
        realWorldExample: 'Locating lowest bidding price in an unindexed list.',
        timeComplexity: {
          best: 'Ω(n - i)',
          average: 'Θ(n - i)',
          worst: 'O(n - i)',
          assumptions: 'Exhaustive sequential scan.'
        },
        cSnippet: `int min_idx = i;
for (int j = i + 1; j < n; j++) {
    if (arr[j] < arr[min_idx]) min_idx = j;
}`
      },
      {
        id: 'op-sel-swap',
        name: 'Single Swap Per Pass',
        definition: 'Exchanges candidate minimum with target slot i if min_idx != i.',
        explanation:
          'Guarantees at most 1 swap per outer loop pass, limiting total memory writes to n - 1.',
        arrayExample: 'Swap arr[0] (25) with arr[2] (7).',
        realWorldExample: 'EEPROM flash block endurance preservation.',
        timeComplexity: {
          best: 'Ω(1)',
          average: 'Θ(1)',
          worst: 'O(1)',
          assumptions: 'Register-based temporary swap.'
        },
        cSnippet: `if (min_idx != i) {
    int temp = arr[i];
    arr[i] = arr[min_idx];
    arr[min_idx] = temp;
}`
      }
    ],
    cCode: {
      filename: 'selection_sort.c',
      description: 'ISO C99 Selection Sort with minimum index telemetry, comparison counters, and write metrics.',
      code: `/*
 * DSAForge Educational Series - Chapter 3: Search & Sort
 * File: selection_sort.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Selection Sort with Minimum Index Tracking and Write Analysis
 */

#include <stdio.h>

/**
 * Sorts an array using Selection Sort.
 * 
 * @param arr Array of integers to sort
 * @param n   Total number of elements
 */
void selection_sort(int arr[], int n) {
    int total_comparisons = 0;
    int total_swaps = 0;

    printf("[Selection Sort Engine]: Initializing for n = %d\\n", n);

    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        printf("--- Pass %d: Searching minimum for slot [%d] ---\\n", i + 1, i);

        // Find the index of the minimum element in unsorted suffix arr[i..n-1]
        for (int j = i + 1; j < n; j++) {
            total_comparisons++;
            if (arr[j] < arr[min_idx]) {
                printf("  New Minimum: arr[%d] (%d) < arr[%d] (%d)\\n", 
                       j, arr[j], min_idx, arr[min_idx]);
                min_idx = j;
            }
        }

        // Perform at most ONE swap per pass
        if (min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;

            total_swaps++;
            printf("  Executed Swap: arr[%d](%d) <-> arr[%d](%d)\\n", 
                   i, arr[min_idx], min_idx, arr[i]);
        } else {
            printf("  Element arr[%d] = %d is already the minimum. Zero swaps performed.\\n", 
                   i, arr[i]);
        }

        printf("  Array State: [ ");
        for (int k = 0; k < n; k++) printf("%d ", arr[k]);
        printf("]\\n\\n");
    }

    printf("[Sort Summary]: Comparisons = %d (Always n*(n-1)/2), Swaps = %d (Max n-1)\\n", 
           total_comparisons, total_swaps);
}

int main(void) {
    int data[] = {25, 10, 7, 42, 18};
    int n = sizeof(data) / sizeof(data[0]);

    printf("=========================================\\n");
    printf("   DSAForge: Selection Sort Verification \\n");
    printf("=========================================\\n");
    printf("Initial Input: [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n\\n");

    selection_sort(data, n);

    printf("Final Sorted:  [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n");

    return 0;
}`
    },
    realWorld: [
      {
        title: 'Flash Memory / EEPROM Wear-Leveling Sorting',
        category: 'Hardware Engineering',
        system: 'Embedded Flash Controllers (NAND/NOR Flash)',
        description:
          'Flash memory cells have a strictly limited write endurance (typically 10,000 to 100,000 write cycles before permanent hardware failure). Selection Sort performs at most n - 1 writes, making it vastly safer for flash endurance than Bubble Sort or QuickSort.',
        bullets: [
          'Guarantees at most n - 1 memory write operations (O(n) writes)',
          'Drastically minimizes flash memory gate oxidation and cell degradation',
          'Read operations do not degrade flash memory, so O(n^2) reads are acceptable'
        ]
      },
      {
        title: 'Industrial Heavy-Machinery Inventory Binning',
        category: 'Physical Logistics',
        system: 'Automated Guided Vehicle (AGV) Warehouses',
        description:
          'When an automated warehouse crane rearranges heavy metal containers weighing several tons, moving a physical container requires high energy and mechanical wear. Selection Sort minimizes physical crane movements to at most n - 1 moves.',
        bullets: [
          'Scanning container barcodes with laser scanners is virtually free (comparisons)',
          'Physical container relocation consumes significant electrical power and hydraulic wear (swaps)',
          'Selection Sort provides a mathematically minimal swap solution'
        ]
      },
      {
        title: 'Low-Bandwidth Satellite Telemetry Sorting',
        category: 'Aerospace Engineering',
        system: 'CubeSat Radiation Telemetry Buffers',
        description:
          'Onboard radiation sensor readings must be sorted by signal amplitude before downlink transmission. Radiation-hardened satellite RAM is limited and writes require high voltage charge pump activation.',
        bullets: [
          'Minimizes satellite battery power spent on RAM write cycles',
          'Deterministic cycle count aids hard real-time scheduling constraints',
          'Zero dynamic memory overhead ensures radiation fault tolerance'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Selection Sort Asymptotic Performance',
      summary:
        'Selection Sort performs exactly n(n - 1) / 2 comparisons across all cases, but guarantees at most n - 1 swaps.',
      rows: [
        {
          operation: 'Best Case Time (Any Array Permutation)',
          timeComplexity: 'Ω(n^2)',
          spaceComplexity: 'O(1)',
          notes: 'Still performs n(n-1)/2 comparisons to verify minimums; performs 0 swaps.'
        },
        {
          operation: 'Average Case Time',
          timeComplexity: 'Θ(n^2)',
          spaceComplexity: 'O(1)',
          notes: 'Performs n(n-1)/2 comparisons and approximately n - 1 swaps.'
        },
        {
          operation: 'Worst Case Time',
          timeComplexity: 'O(n^2)',
          spaceComplexity: 'O(1)',
          notes: 'Performs n(n-1)/2 comparisons and at most n - 1 swaps.'
        },
        {
          operation: 'Memory Write Operations',
          timeComplexity: '—',
          spaceComplexity: 'O(n) writes',
          notes: 'At most n - 1 swaps (3 * (n - 1) writes maximum).'
        },
        {
          operation: 'Auxiliary Memory Space',
          timeComplexity: '—',
          spaceComplexity: 'O(1)',
          notes: 'Strictly in-place. Requires only min_idx and loop indices.'
        }
      ]
    },
    advantages: [
      'Minimizes memory write operations: performs at most n - 1 swaps (O(n) writes total).',
      'Simple implementation with strictly in-place O(1) auxiliary memory.',
      'Deterministic execution time: comparisons are independent of input distribution.',
      'Valuable on hardware where memory writes are substantially more expensive than reads (EEPROM/Flash).'
    ],
    disadvantages: [
      'Unfavorable comparison count: always runs in Θ(n^2) time, even when the array is already sorted.',
      'Standard swap implementation is UNSTABLE.',
      'Significantly slower than Insertion Sort and QuickSort in general-purpose computing.'
    ],
    whenToUse: [
      'When memory write operations are physically expensive or wear-limited (EEPROM, Flash memory).',
      'When physical items are expensive to move (e.g., heavy machinery, physical crates in a warehouse).',
      'When small code size is needed and memory writes must be strictly bounded.'
    ],
    whenNotToUse: [
      'When the array is already mostly sorted (use Insertion Sort for Ω(n) performance).',
      'When stability is strictly required for multi-key objects (use Bubble Sort or Merge Sort).',
      'When sorting large datasets (n > 100).'
    ],
    commonMistakes: [
      'Assuming Selection Sort is stable (the standard swap can alter the relative order of duplicate elements).',
      'Believing Selection Sort runs in O(n) on sorted arrays (it always takes n(n-1)/2 comparisons).',
      'Updating array values inside the inner loop instead of only updating the min_idx index.'
    ],
    interviewQuestions: [
      {
        question: 'Give a concrete example showing that Selection Sort is an unstable sorting algorithm.',
        answer:
          'Consider the array [4a, 4b, 1], where 4a and 4b have equal keys. In pass 1 (i = 0), the minimum element in the array is 1 at index 2. The algorithm swaps arr[0] (4a) with arr[2] (1). The array becomes [1, 4b, 4a]. Now 4b appears before 4a, reversing their original relative order. Hence, standard Selection Sort is not stable.'
      },
      {
        question: 'Under what hardware conditions is Selection Sort preferred over Bubble Sort and Insertion Sort?',
        answer:
          'Selection Sort is preferred on memory hardware with limited write cycles (like EEPROM, NOR Flash, or phase-change memory), or where write operations are dramatically slower than read operations. Bubble Sort and Insertion Sort can perform up to O(n^2) writes (swaps or shifts), whereas Selection Sort performs at most n - 1 swaps (O(n) writes), prolonging hardware life.'
      },
      {
        question: 'Why is Selection Sort non-adaptive to already-sorted input?',
        answer:
          'Selection Sort must find the true minimum element in the remaining unsorted sub-array. Even if the array is already [1, 2, 3, 4, 5], when considering slot 0 it must inspect all elements at indices 1, 2, 3, and 4 to verify that none is smaller than 1. It repeats this for all slots, performing exactly n(n - 1) / 2 comparisons unconditionally.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-sel-1',
        difficulty: 'Easy',
        question: 'What is the maximum number of swaps performed by Selection Sort on an array of size n = 6?',
        options: ['36 swaps', '15 swaps', '5 swaps', '1 swap'],
        correctAnswer: 2,
        explanation: 'Selection Sort performs at most one swap per outer loop pass. For n = 6, the outer loop runs n - 1 = 5 passes, yielding at most 5 swaps.',
        conceptRef: 'Write Minimization'
      },
      {
        id: 'q-sel-2',
        difficulty: 'Easy',
        question: 'What is the best-case time complexity of Selection Sort?',
        options: ['Ω(n)', 'Ω(n log n)', 'Ω(n^2)', 'Ω(1)'],
        correctAnswer: 2,
        explanation: 'Selection Sort cannot adapt to sorted input. It always performs n(n - 1) / 2 comparisons, resulting in Ω(n^2) best-case time.',
        conceptRef: 'Non-Adaptive Mechanics'
      },
      {
        id: 'q-sel-3',
        difficulty: 'Medium',
        question: 'Given the array [64, 25, 12, 22, 11], what is the state of the array after the first pass of Selection Sort?',
        options: [
          '[11, 25, 12, 22, 64]',
          '[25, 12, 22, 11, 64]',
          '[11, 12, 22, 25, 64]',
          '[64, 25, 22, 12, 11]'
        ],
        correctAnswer: 0,
        explanation: 'The minimum element is 11 at index 4. It swaps with arr[0] (64), yielding [11, 25, 12, 22, 64].',
        conceptRef: 'Step Tracing'
      },
      {
        id: 'q-sel-4',
        difficulty: 'Hard',
        question: 'Why is Selection Sort not considered an online sorting algorithm?',
        options: [
          'It requires internet connectivity to compute minimums',
          'It cannot process incoming streaming elements without re-evaluating past positions',
          'It uses too much memory space',
          'Its time complexity is O(n^2)'
        ],
        correctAnswer: 1,
        explanation: 'An online algorithm can accept new incoming items without restarting. Because Selection Sort assumes the sorted prefix is finalized, a newly arrived small element would have to be placed into an already-locked position, breaking the algorithm.',
        conceptRef: 'Online Algorithm Classification'
      }
    ]
  },

  // ==========================================
  // TOPIC 6: RADIX SORT
  // ==========================================
  'top-306': {
    id: 'top-306',
    title: 'Radix Sort',
    sidebarTitle: 'Radix Sort',
    complexity: 'Medium',
    category: 'Sorting',
    description:
      'Radix Sort is a non-comparative integer sorting algorithm that sorts keys with d digits by processing individual digit values, typically from Least Significant Digit (LSD) to Most Significant Digit (MSD), using a stable sub-sort (such as Counting Sort). It breaks the Ω(n log n) comparison barrier.',
    unitCode: 'Unit 3: Search & Sort',
    courseCode: 'CS201 / CLRS Ch. 8.3',
    coreIdea:
      'Unlike comparison sorts (QuickSort, MergeSort, BubbleSort) which compare elements against each other, Radix Sort groups elements by individual digit values (0 through 9 in base 10). It sorts by the 1s digit, then stably by the 10s digit, then 100s digit, and so on. CRITICAL REQUIREMENT: The digit-sorting subroutine MUST BE STABLE so that earlier digit orderings are preserved during subsequent passes.',
    howItWorks: [
      'Find the maximum element in the array to determine the maximum number of digits d.',
      'Initialize exponent multiplier exp = 1 (representing the 1s place).',
      'While max / exp > 0:',
      '  - Execute a stable Counting Sort subroutine based on the digit at position exp: (arr[i] / exp) % 10.',
      '  - Count the frequency of each digit (0 to 9) in a count[10] array.',
      '  - Calculate prefix sums in count[] to determine ending positions for each digit.',
      '  - Iterate BACKWARDS through arr[] to place elements into output[] stably.',
      '  - Copy output[] back into arr[].',
      '  - Multiply exp by 10 (advancing to 10s, 100s, 1000s, etc.).',
      'After d passes, the array is completely sorted.'
    ],
    pseudocode: `ALGORITHM RadixSort(A, n)
  INPUT: Array A of n non-negative integers
  OUTPUT: Array A sorted in non-decreasing order

  max_val = GetMax(A, n)
  exp = 1

  WHILE (max_val / exp) > 0 DO
    CountingSortByDigit(A, n, exp)
    exp = exp * 10
  END WHILE

ALGORITHM CountingSortByDigit(A, n, exp)
  count[10] = {0}
  output[n]

  // Frequency count of digits (A[i] / exp) % 10
  FOR i = 0 TO n - 1 DO
    digit = (A[i] / exp) % 10
    count[digit] = count[digit] + 1
  END FOR

  // Cumulative positions
  FOR i = 1 TO 9 DO
    count[i] = count[i] + count[i - 1]
  END FOR

  // Build output array iterating backwards for STABILITY
  FOR i = n - 1 DOWNTO 0 DO
    digit = (A[i] / exp) % 10
    output[count[digit] - 1] = A[i]
    count[digit] = count[digit] - 1
  END FOR

  // Copy output back to A
  FOR i = 0 TO n - 1 DO
    A[i] = output[i]
  END FOR`,
    stepByStepExample: {
      title: 'Sorting [170, 45, 75, 90, 802, 24, 2, 66] with LSD Radix Sort',
      initialArray: [170, 45, 75, 90, 802, 24, 2, 66],
      steps: [
        {
          stepNumber: 1,
          action: 'Pass 1 (exp = 1): Stable sort by Units (1s) digit',
          arrayState: [170, 90, 802, 2, 24, 45, 75, 66],
          highlightedIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          statusText: 'Digits extracted: 170(0), 45(5), 75(5), 90(0), 802(2), 24(4), 2(2), 66(6). Stable result: [170, 90, 802, 2, 24, 45, 75, 66].'
        },
        {
          stepNumber: 2,
          action: 'Pass 2 (exp = 10): Stable sort by Tens (10s) digit',
          arrayState: [802, 2, 24, 45, 66, 170, 75, 90],
          highlightedIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          statusText: 'Digits: 802(0), 2(0), 24(2), 45(4), 66(6), 170(7), 75(7), 90(9). Notice 802 precedes 2 because 802 preceded 2 in Pass 1!'
        },
        {
          stepNumber: 3,
          action: 'Pass 3 (exp = 100): Stable sort by Hundreds (100s) digit',
          arrayState: [2, 24, 45, 66, 75, 90, 170, 802],
          highlightedIndices: [0, 1, 2, 3, 4, 5, 6, 7],
          statusText: 'Digits: 2(0), 24(0), 45(0), 66(0), 75(0), 90(0), 170(1), 802(8). Result is fully sorted in non-decreasing order!'
        }
      ]
    },
    concepts: [
      {
        name: 'Non-Comparative Sorting Paradigm',
        source: 'CLRS Primary Source',
        definition:
          'Comparison sorts are mathematically bound by Ω(n log n) by decision tree lower bounds. Radix sort bypasses this limitation because it does not compare two elements against each other; instead, it uses positional digit values directly as array indices.',
        example: 'int digit = (arr[i] / exp) % 10; count[digit]++;',
        usage: 'Sorting large collections of fixed-width integers or strings in linear time.',
        asciiDiagram: `Input: [170, 045, 075, 090, 802, 024, 002, 066]
Pass 1 (1s):   [170, 090, 802, 002, 024, 045, 075, 066]
Pass 2 (10s):  [802, 002, 024, 045, 066, 170, 075, 090]
Pass 3 (100s): [002, 024, 045, 066, 075, 090, 170, 802]`
      },
      {
        name: 'LSD vs MSD Radix Sort',
        source: 'CLRS Primary Source',
        definition:
          'Least Significant Digit (LSD) sorts from right to left (1s, 10s, 100s) using a stable iterative subroutine. Most Significant Digit (MSD) sorts from left to right (100s, 10s, 1s) using recursive bucket partitioning (similar to QuickSort), which is ideal for variable-length strings.',
        example: 'LSD: iterative, simpler memory. MSD: recursive, ideal for lexicographical string prefixes.',
        usage: 'LSD for fixed-length integers; MSD for dictionary and IP routing prefix tables.'
      },
      {
        name: 'Complexity Parameter Breakdown: n, d, and b',
        source: 'CLRS Primary Source',
        definition:
          'Radix sort is NOT unconditionally O(n). Its runtime is Θ(d * (n + b)), where n is element count, d is the number of digits (d = floor(log_b(max)) + 1), and b is the radix base (10 for decimal, 256 for bytes, 2 for binary bits). If keys have d = O(log n) digits, runtime is O(n log n).',
        example: 'For 32-bit integers with b = 256 (byte radix), d = 4 passes, yielding Θ(4 * (n + 256)) = O(n).',
        usage: 'Essential theoretical distinction required in advanced CS exams and technical interviews.'
      }
    ],
    comparisonTable: {
      header1: 'Radix Sort (LSD)',
      header2: 'Comparison Sorts (QuickSort / MergeSort)',
      rows: [
        {
          aspect: 'Asymptotic Lower Bound',
          col1: 'Can achieve O(d * (n + b)) (linear when d is constant)',
          col2: 'Strictly bounded by Ω(n log n) by decision tree theorem'
        },
        {
          aspect: 'Key Type Restrictions',
          col1: 'Requires discrete integer or fixed-width string keys',
          col2: 'Works on any datatype with a defined comparison operator (<)'
        },
        {
          aspect: 'Auxiliary Memory Space',
          col1: 'Requires O(n + b) external buffer memory',
          col2: 'QuickSort is in-place O(log n); MergeSort is O(n)'
        },
        {
          aspect: 'CPU Cache Friendliness',
          col1: 'Lower cache hit rate due to random scatter into buckets',
          col2: 'High cache hit rate due to contiguous memory scanning'
        }
      ]
    },
    operations: [
      {
        id: 'op-rad-max',
        name: 'Maximum Element Identification',
        definition: 'Scans array once to determine the maximum value and digit count d.',
        explanation:
          'Iterates through n elements tracking the maximum value to determine when max / exp == 0.',
        arrayExample: 'Max of [170..66] is 802 (3 digits -> 3 passes).',
        realWorldExample: 'Calculating pass bounds before allocating buffers.',
        timeComplexity: {
          best: 'Ω(n)',
          average: 'Θ(n)',
          worst: 'O(n)',
          assumptions: 'Single linear scan.'
        },
        cSnippet: `int max_val = arr[0];
for (int i = 1; i < n; i++) {
    if (arr[i] > max_val) max_val = arr[i];
}`
      },
      {
        id: 'op-rad-counting',
        name: 'Stable Counting Sub-sort',
        definition: 'Sorts elements stably based on the digit (arr[i] / exp) % 10.',
        explanation:
          'Builds histogram of digits 0-9, calculates prefix sums, and writes elements into output buffer backwards to maintain stability.',
        arrayExample: 'Sorting by 1s digit places 170 and 90 into bucket 0.',
        realWorldExample: 'Fixed-width key distribution in GPU CUDA sorting.',
        timeComplexity: {
          best: 'Ω(n + b)',
          average: 'Θ(n + b)',
          worst: 'O(n + b)',
          assumptions: 'b = 10 buckets for decimal.'
        },
        cSnippet: `int count[10] = {0};
for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
for (int i = 1; i < 10; i++) count[i] += count[i - 1];
for (int i = n - 1; i >= 0; i--) {
    output[count[(arr[i] / exp) % 10] - 1] = arr[i];
    count[(arr[i] / exp) % 10]--;
}`
      }
    ],
    cCode: {
      filename: 'radix_sort.c',
      description: 'ISO C99 LSD Radix Sort using Counting Sort subroutine with pass telemetry on 8-element array.',
      code: `/*
 * DSAForge Educational Series - Chapter 3: Search & Sort
 * File: radix_sort.c
 * Standard: ISO/IEC 9899:1999 (C99)
 * Description: Least Significant Digit (LSD) Radix Sort with Counting Sort Subroutine
 */

#include <stdio.h>
#include <stdlib.h>

/**
 * Finds the maximum value in an integer array to calculate required digit passes.
 */
static int get_max(const int arr[], int n) {
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

/**
 * Stable Counting Sort based on the digit represented by exp (1, 10, 100, ...).
 */
static void counting_sort_by_digit(int arr[], int n, int exp) {
    int *output = (int *)malloc(n * sizeof(int));
    int count[10] = {0};

    // Step 1: Store count of occurrences of each digit
    for (int i = 0; i < n; i++) {
        int digit = (arr[i] / exp) % 10;
        count[digit]++;
    }

    // Step 2: Change count[i] so that count[i] contains actual position in output
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build the output array iterating BACKWARDS to ensure STABILITY
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    // Step 4: Copy the sorted elements back into the original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }

    free(output);
}

/**
 * LSD Radix Sort main routine.
 */
void radix_sort(int arr[], int n) {
    int max_val = get_max(arr, n);
    int pass = 1;

    printf("[Radix Sort Engine]: Maximum Value = %d\\n", max_val);

    // Apply counting sort to each digit place: 1, 10, 100, ...
    for (int exp = 1; max_val / exp > 0; exp *= 10) {
        printf("--- Pass %d: Sorting by %ds place (exp = %d) ---\\n", 
               pass++, exp, exp);

        counting_sort_by_digit(arr, n, exp);

        printf("  Array State after Pass %d: [ ", pass - 1);
        for (int k = 0; k < n; k++) printf("%d ", arr[k]);
        printf("]\\n\\n");
    }
}

int main(void) {
    // Realistic multi-digit dataset
    int data[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int n = sizeof(data) / sizeof(data[0]);

    printf("=========================================\\n");
    printf("     DSAForge: Radix Sort Verification   \\n");
    printf("=========================================\\n");
    printf("Initial Dataset: [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n\\n");

    radix_sort(data, n);

    printf("Final Sorted:    [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n");

    return 0;
}`
    },
    realWorld: [
      {
        title: 'GPU Massively Parallel Integer Sorting',
        category: 'High Performance Computing',
        system: 'NVIDIA CUDA Thrust Library (RadixSort)',
        description:
          'On graphics processing units (GPUs) with thousands of concurrent CUDA cores, branch-heavy comparison sorts like QuickSort perform poorly due to thread warp divergence. NVIDIA uses 4-bit / 8-bit Radix Sort because prefix sums and bucket scatters run with zero branching.',
        bullets: [
          'Eliminates thread warp divergence penalties on SIMD/GPU hardware',
          'Sorts billions of integer coordinates per second in physics simulations',
          'Industry standard algorithm used in CUDA Thrust and DirectX Compute'
        ]
      },
      {
        title: 'Bioinformatics Suffix Array Construction',
        category: 'Computational Genomics',
        system: 'DNA Sequencing & Alignment Pipelines (Bowtie / BWA)',
        description:
          'Genomic sequencing maps billions of short DNA reads against reference genomes. Radix sort groups fixed-length k-mers (e.g., sequences of A, C, G, T) into suffix arrays in linear time.',
        bullets: [
          'Radix base b = 4 matches the 4 DNA nucleotides (A, C, G, T)',
          'Processes multi-gigabyte genomic sequences in deterministic linear time',
          'Powers rapid search for viral variants and genetic disease mutations'
        ]
      },
      {
        title: 'Postal Mail & Parcel Routing Automation',
        category: 'Industrial Automation',
        system: 'USPS / Royal Mail Optical Sorters',
        description:
          'Automated mail sorting conveyor belts scan fixed 5-digit or 9-digit postal ZIP codes. Mechanical diverter gates physically sort envelopes digit-by-digit from right to left using LSD Radix Sort.',
        bullets: [
          'Physical conveyor belts route mail into 10 numbered bins (0 through 9)',
          'Multi-pass mechanical sorting mirrors exact software LSD Radix Sort',
          'Handles millions of physical postal items per hour without human intervention'
        ]
      }
    ],
    complexityMatrix: {
      title: 'Radix Sort Asymptotic Complexity',
      summary:
        'Time complexity is Θ(d * (n + b)), where n is number of elements, d is the number of digits, and b is the radix base (10 for decimal). Auxiliary space is O(n + b).',
      rows: [
        {
          operation: 'Best Case Time',
          timeComplexity: 'Ω(d * (n + b))',
          spaceComplexity: 'O(n + b)',
          notes: 'Algorithm always performs d passes; each pass scans n elements and b buckets.'
        },
        {
          operation: 'Average Case Time',
          timeComplexity: 'Θ(d * (n + b))',
          spaceComplexity: 'O(n + b)',
          notes: 'Linear when d is fixed (e.g., 32-bit integers with base 256 requires 4 passes).'
        },
        {
          operation: 'Worst Case Time',
          timeComplexity: 'O(d * (n + b))',
          spaceComplexity: 'O(n + b)',
          notes: 'If keys have d ≈ log(n) digits, runtime is O(n log n). If d ≈ n, runtime degrades to O(n^2).'
        },
        {
          operation: 'Auxiliary Memory Space',
          timeComplexity: '—',
          spaceComplexity: 'O(n + b)',
          notes: 'Requires external output array of size n and bucket count array of size b (10).'
        },
        {
          operation: 'Stability Status',
          timeComplexity: '—',
          spaceComplexity: 'STABLE',
          notes: 'Strictly stable due to backward output iteration in Counting Sort subroutine.'
        }
      ]
    },
    advantages: [
      'Breaks the Ω(n log n) comparison sort lower bound, achieving linear O(n) performance when d is a small constant.',
      'Strictly STABLE: preserves initial order of duplicate keys.',
      'Highly parallelizable on SIMD and GPU hardware due to branchless prefix sum routines.',
      'Extremely fast for sorting 32-bit or 64-bit integers and fixed-length ASCII strings.'
    ],
    disadvantages: [
      'Not in-place: requires O(n + b) auxiliary memory for output and bucket count arrays.',
      'Limited key types: requires keys that can be decomposed into discrete positional digits or radix chunks.',
      'Higher constant factor and worse cache locality than QuickSort for small arrays.'
    ],
    whenToUse: [
      'When sorting large collections of integers or fixed-length strings (e.g., phone numbers, ZIP codes).',
      'In GPU computing (CUDA / OpenCL) where comparison branches cause thread divergence.',
      'When linear O(n) sorting is required and auxiliary memory is readily available.'
    ],
    whenNotToUse: [
      'When sorting general floating-point values or complex objects without natural integer representations.',
      'When memory is strictly constrained (Radix Sort requires an extra O(n) buffer).',
      'When the number of digits d is large relative to n (e.g., d > n).'
    ],
    commonMistakes: [
      'Incorrectly assuming Radix Sort is always O(n) without considering digit count d and base b.',
      'Iterating forwards instead of backwards in the Counting Sort subroutine, which destroys stability.',
      'Using an unstable sorting algorithm as the intermediate digit-sorting subroutine, which causes earlier digit passes to be corrupted.'
    ],
    interviewQuestions: [
      {
        question: 'Why does Radix Sort require the intermediate digit sorting algorithm to be STABLE?',
        answer:
          'LSD Radix Sort processes digits from least significant (1s) to most significant (10s, 100s). When sorting by the 10s place, multiple numbers may have the same 10s digit (e.g., 24 and 28). If the digit sort is stable, 24 will remain before 28 because 4 was smaller than 8 in the previous 1s pass. An unstable sort would scramble their relative order, corrupting the earlier work and producing an incorrect result.'
      },
      {
        question: 'Why is Radix Sort not subject to the Ω(n log n) lower bound for sorting algorithms?',
        answer:
          'The Ω(n log n) lower bound proven by the decision tree theorem applies strictly to COMPARISON-BASED sorting algorithms (where the algorithm only accesses elements by asking "is A[i] < A[j]?"). Radix Sort is NOT a comparison sort; it uses the actual bits and digit values of the keys as direct array indices to bucket items, completely bypassing the comparison decision tree model.'
      },
      {
        question: 'Under what mathematical conditions does Radix Sort become slower than QuickSort or MergeSort?',
        answer:
          'Radix Sort has time complexity O(d * (n + b)). If the keys are very large numbers with d = Ω(n) digits, Radix Sort takes O(n^2) time. Furthermore, if d > log(n), O(d * n) becomes strictly worse than QuickSort\'s O(n log n). Additionally, QuickSort has much better L1/L2 cache locality, often beating Radix Sort in wall-clock time unless n is very large.'
      }
    ],
    practiceQuestions: [
      {
        id: 'q-rad-1',
        difficulty: 'Easy',
        question: 'What is the primary reason Radix Sort requires a stable subroutine for sorting each digit?',
        options: [
          'To ensure the algorithm runs in in-place memory',
          'To prevent numbers with identical current digits from scrambling previously sorted lower-order digits',
          'To minimize the number of passes d',
          'To allow the algorithm to work with negative floating point numbers'
        ],
        correctAnswer: 1,
        explanation: 'Stability ensures that when elements have the same digit at the current place, their relative order established by earlier lower-order digit passes is preserved.',
        conceptRef: 'Subroutine Stability'
      },
      {
        id: 'q-rad-2',
        difficulty: 'Medium',
        question: 'How many passes will LSD Radix Sort perform on the array [170, 45, 75, 90, 802, 24, 2, 66]?',
        options: ['2 passes', '3 passes', '8 passes', '10 passes'],
        correctAnswer: 1,
        explanation: 'The maximum value is 802, which has 3 digits. Hence, it executes exactly 3 passes (1s, 10s, 100s place).',
        conceptRef: 'Pass Determination'
      },
      {
        id: 'q-rad-3',
        difficulty: 'Medium',
        question: 'What is the auxiliary space complexity of standard LSD Radix Sort using Counting Sort on n elements with radix base b?',
        options: ['O(1)', 'O(log n)', 'O(n + b)', 'O(n * b)'],
        correctAnswer: 2,
        explanation: 'It requires an auxiliary output array of size n and a frequency count bucket array of size b (10 for decimal).',
        conceptRef: 'Space Complexity'
      },
      {
        id: 'q-rad-4',
        difficulty: 'Hard',
        question: 'Which of the following statements about Radix Sort is mathematically ACCURATE?',
        options: [
          'Radix Sort is always O(n) regardless of the key values',
          'Radix Sort is a comparison-based sort',
          'Radix Sort runtime is Θ(d * (n + b)), where d is number of digits and b is base',
          'Radix Sort cannot be implemented iteratively'
        ],
        correctAnswer: 2,
        explanation: 'Radix Sort is non-comparative and its runtime depends on both the count of elements n, the number of digits d, and the bucket base b.',
        conceptRef: 'Formal Complexity Theory'
      }
    ]
  }
};
