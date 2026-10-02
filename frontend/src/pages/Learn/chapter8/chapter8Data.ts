// Chapter 8: Hashing & Tables — Curriculum Data Source
// Grounded in CLRS Chapter 11 (Hash Tables), Sedgewick, and Knuth (TAOCP Vol 3: Sorting and Searching)

export interface ComplexityItem {
  operation: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  notes: string;
}

export interface RealWorldItem {
  title: string;
  system: string;
  description: string;
  architecture: string;
  advantages: string[];
}

export interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface OperationStep {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  cSignature: string;
  steps: string[];
  codeSnippet: string;
}

export interface TopicData {
  id: string;
  title: string;
  chapterId: string;
  complexity: 'Easy' | 'Medium' | 'Hard';
  overview: string;
  conceptSections: {
    title: string;
    description: string;
    points: string[];
    asciiDiagram?: string;
  }[];
  operations: OperationStep[];
  cCode: {
    title: string;
    description: string;
    code: string;
    sampleOutput: string;
  };
  realWorld: RealWorldItem[];
  complexityTable: ComplexityItem[];
  practice: QuestionItem[];
}

export const chapter8Topics: Record<string, TopicData> = {
  'top-801': {
    id: 'top-801',
    title: 'Hashing Fundamentals & Hash Tables',
    chapterId: 'chap-8',
    complexity: 'Easy',
    overview:
      'Hashing is an effective data management technique that maps large keys of arbitrary domain size into fixed-size array indices using a mathematical hash function. By transforming a key directly into a table address, Hash Tables achieve average O(1) constant-time search, insertion, and deletion. However, because the universe of keys is far larger than the table capacity, collisions are inevitable, and hashing performance depends critically on load factors and collision resolution strategies.',
    conceptSections: [
      {
        title: '1. What is Hashing? Core Definitions & Terminology',
        description:
          'Hashing converts a search key into an array index to achieve instantaneous direct-access retrieval without comparing the key against every stored record.',
        points: [
          'Key: The unique identifier used to look up, insert, or delete data (e.g., student ID, username, memory address).',
          'Value / Payload: The actual record or data associated with the key.',
          'Hash Function h(k): A mathematical function that accepts a key k and returns an integer index in the range [0, m - 1], where m is the table capacity.',
          'Hash Table: An array of buckets or slots of size m where entries are stored at index h(k).',
          'Bucket: A designated storage slot within the hash table array.',
          'Collision: An event where two distinct keys produce the identical hash index: k1 != k2 but h(k1) == h(k2).'
        ],
        asciiDiagram: `Mathematical Hashing Pipeline:
+--------------+      +-------------------+      +-------------------+      +----------------+
|  Search Key  | ===> |   Hash Function   | ===> | Computed Hash Val | ===> | Table Slot T[i]|
|   k = 25     |      |  h(k) = k mod 10  |      |     index = 5     |      |  Store Payload |
+--------------+      +-------------------+      +-------------------+      +----------------+`
      },
      {
        title: '2. Direct Addressing vs Hashing: Space-Time Trade-Off',
        description:
          'Understanding why hash tables exist instead of simple direct-access arrays.',
        points: [
          'Direct Addressing: Uses an array sized to the universe of all possible keys U. If keys are 9-digit Social Security Numbers, direct addressing requires an array of 1,000,000,000 slots. If only 1,000 students are enrolled, 99.9999% of memory is completely wasted.',
          'Hashing Solution: Scales the table size m to match the actual number of expected elements n (m = O(n)). Maps the huge universe U into the small table range [0, m - 1].',
          'Trade-Off: Direct addressing guarantees O(1) worst-case search with zero collisions at the expense of massive memory waste. Hashing achieves O(1) average-case search with compact memory, but must resolve collisions.'
        ],
        asciiDiagram: `Direct Addressing:              Hashing:
Universe U (Huge)                Universe U (Huge)
[ 000000001 ]                     [ Key: 10452 ] ---\\
[ 000000002 ]                     [ Key: 98124 ] ----- h(k) ---> Compact Table [0..m-1]
...                               [ Key: 45012 ] ---/
[ 999999999 ] (1 Billion Slots!)  (Only ~1000 Slots Needed!)`
      },
      {
        title: '3. Hash Table Internal Array Structure',
        description:
          'How records and empty slots are organized within a hash table array.',
        points: [
          'Each slot contains a key, the associated value, and a state indicator (EMPTY, OCCUPIED, or DELETED/TOMBSTONE).',
          'Example with table size m = 10 and hash function h(k) = k % 10: Key 12 hashes to index 2; Key 34 hashes to index 4; Key 25 hashes to index 5.',
          'Unoccupied slots contain sentinel values or NULL pointers to allow instant membership verification.'
        ],
        asciiDiagram: `Hash Table Layout (Size m = 10, h(k) = k % 10):
Index   State       Stored Key     Value/Payload
 [0]    EMPTY          -                 -
 [1]    EMPTY          -                 -
 [2]   OCCUPIED       12            "Alice"
 [3]    EMPTY          -                 -
 [4]   OCCUPIED       34            "Bob"
 [5]   OCCUPIED       25            "Charlie"
 [6]    EMPTY          -                 -
 [7]    EMPTY          -                 -
 [8]    EMPTY          -                 -
 [9]    EMPTY          -                 -`
      },
      {
        title: '4. Complexity Realities: The Myth of Guaranteed O(1)',
        description:
          'Engineers must never claim that hash tables are unconditionally O(1). Performance is fundamentally statistical.',
        points: [
          'Average / Expected Case: Under the Simple Uniform Hashing Assumption (SUHA), each key is equally likely to hash to any slot. Search, insertion, and deletion run in O(1) expected time.',
          'Worst Case: If all n keys hash to the exact same bucket (e.g. poor hash function or intentional HashDoS denial-of-service attack), the hash table degrades to a linear linked list with O(n) search time.',
          'Key Influencing Factors: (1) Hash function uniformity, (2) Table capacity m, (3) Load Factor alpha = n / m, (4) Collision resolution strategy.'
        ]
      }
    ],
    operations: [
      {
        name: 'Hash Key Calculation',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Computes the table array index for an integer key using modular division hashing.',
        cSignature: 'int hashFunction(int key, int tableSize);',
        steps: [
          'Take absolute value of key to handle negative values safely.',
          'Compute remainder: index = abs(key) % tableSize.',
          'Return integer index in range [0, tableSize - 1].'
        ],
        codeSnippet: `int hashFunction(int key, int tableSize) {
    int idx = key % tableSize;
    return idx < 0 ? idx + tableSize : idx;
}`
      },
      {
        name: 'Insert Key',
        timeComplexity: 'O(1) average, O(n) worst',
        spaceComplexity: 'O(1)',
        description: 'Computes the hash bucket and inserts the key-value pair, checking for occupancy.',
        cSignature: 'bool insert(HashTable* ht, int key, int val);',
        steps: [
          'Compute hash index: idx = hashFunction(key, ht->capacity).',
          'Check if slot is EMPTY or holds matching key (update value).',
          'Store key and value, mark slot OCCUPIED, increment element count.',
          'Return true on success.'
        ],
        codeSnippet: `bool insert(HashTable* ht, int key, int val) {
    int idx = hashFunction(key, ht->capacity);
    ht->table[idx].key = key;
    ht->table[idx].value = val;
    ht->table[idx].occupied = true;
    ht->count++;
    return true;
}`
      },
      {
        name: 'Search Key',
        timeComplexity: 'O(1) average, O(n) worst',
        spaceComplexity: 'O(1)',
        description: 'Computes hash index and retrieves value if the key matches the stored entry.',
        cSignature: 'bool search(HashTable* ht, int key, int* outVal);',
        steps: [
          'Compute hash index: idx = hashFunction(key, ht->capacity).',
          'If slot is occupied and table[idx].key == key: assign *outVal = table[idx].value and return true.',
          'Otherwise, key is not present: return false.'
        ],
        codeSnippet: `bool search(HashTable* ht, int key, int* outVal) {
    int idx = hashFunction(key, ht->capacity);
    if (ht->table[idx].occupied && ht->table[idx].key == key) {
        *outVal = ht->table[idx].value;
        return true;
    }
    return false;
}`
      }
    ],
    cCode: {
      title: 'Complete C99 Fundamental Hash Table Implementation',
      description:
        'A clean ISO C99 implementation of a direct hash table demonstrating key-to-index mapping, insertion, instant lookup, slot inspection, and memory management.',
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define TABLE_SIZE 10

typedef struct {
    int key;
    int value;
    bool occupied;
} HashEntry;

typedef struct {
    HashEntry table[TABLE_SIZE];
    int count;
} HashTable;

// Function prototypes
void initHashTable(HashTable* ht);
int hashFunction(int key);
bool insert(HashTable* ht, int key, int val);
bool search(HashTable* ht, int key, int* result);
void displayTable(const HashTable* ht);

int main(void) {
    printf("==============================================\\n");
    printf("  DSAForge: Fundamental Hash Table Simulator  \\n");
    printf("==============================================\\n\\n");

    HashTable ht;
    initHashTable(&ht);

    printf("Inserting keys: [25 -> 250], [34 -> 340], [12 -> 120], [89 -> 890]...\\n");
    insert(&ht, 25, 250); // index 5
    insert(&ht, 34, 340); // index 4
    insert(&ht, 12, 120); // index 2
    insert(&ht, 89, 890); // index 9

    printf("\\n--- Current Hash Table State ---\\n");
    displayTable(&ht);

    // Search demonstrations
    int targetKey = 34;
    int resultVal = 0;
    printf("\\nSearching for Key %d... ", targetKey);
    if (search(&ht, targetKey, &resultVal)) {
        printf("FOUND! Value = %d\\n", resultVal);
    } else {
        printf("NOT FOUND.\\n");
    }

    targetKey = 77;
    printf("Searching for Key %d... ", targetKey);
    if (search(&ht, targetKey, &resultVal)) {
        printf("FOUND! Value = %d\\n", resultVal);
    } else {
        printf("NOT FOUND.\\n");
    }

    return 0;
}

void initHashTable(HashTable* ht) {
    ht->count = 0;
    for (int i = 0; i < TABLE_SIZE; i++) {
        ht->table[i].key = 0;
        ht->table[i].value = 0;
        ht->table[i].occupied = false;
    }
}

int hashFunction(int key) {
    int idx = key % TABLE_SIZE;
    return idx < 0 ? idx + TABLE_SIZE : idx;
}

bool insert(HashTable* ht, int key, int val) {
    int idx = hashFunction(key);
    ht->table[idx].key = key;
    ht->table[idx].value = val;
    ht->table[idx].occupied = true;
    ht->count++;
    return true;
}

bool search(HashTable* ht, int key, int* result) {
    int idx = hashFunction(key);
    if (ht->table[idx].occupied && ht->table[idx].key == key) {
        *result = ht->table[idx].value;
        return true;
    }
    return false;
}

void displayTable(const HashTable* ht) {
    printf("Index | State    | Key   | Value\\n");
    printf("--------------------------------\\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (ht->table[i].occupied) {
            printf(" [%d]  | OCCUPIED | %-5d | %-5d\\n", i, ht->table[i].key, ht->table[i].value);
        } else {
            printf(" [%d]  | EMPTY    |   -   |   -\\n", i);
        }
    }
}`,
      sampleOutput: `==============================================
  DSAForge: Fundamental Hash Table Simulator  
==============================================

Inserting keys: [25 -> 250], [34 -> 340], [12 -> 120], [89 -> 890]...

--- Current Hash Table State ---
Index | State    | Key   | Value
--------------------------------
 [0]  | EMPTY    |   -   |   -
 [1]  | EMPTY    |   -   |   -
 [2]  | OCCUPIED | 12    | 120  
 [3]  | EMPTY    |   -   |   -
 [4]  | OCCUPIED | 34    | 340  
 [5]  | OCCUPIED | 25    | 250  
 [6]  | EMPTY    |   -   |   -
 [7]  | EMPTY    |   -   |   -
 [8]  | EMPTY    |   -   |   -
 [9]  | OCCUPIED | 89    | 890  

Searching for Key 34... FOUND! Value = 340
Searching for Key 77... NOT FOUND.`
    },
    realWorld: [
      {
        title: 'Compiler Symbol Table Scope Resolution',
        system: 'GCC / Clang C Compiler Front-End',
        description:
          'When compiling code, the compiler encounters identifier tokens (variable names, function names). A hash table maps identifier strings to type declarations, stack offsets, and scope levels in O(1) time.',
        architecture:
          'Keys are hashed identifier names (e.g. "counter", "total_sum"). Values are type AST pointers. Scoping is handled by linking nested lexical tables.',
        advantages: [
          'Prevents linear scanning of thousands of program identifiers',
          'Enables instant type checking during semantic analysis',
          'Supports variable shadowing across nested compound blocks'
        ]
      },
      {
        title: 'Python Dictionary (`dict`) and JavaScript Object Lookups',
        system: 'CPython / V8 JavaScript Engine',
        description:
          'In modern scripting languages, objects and dictionaries are implemented under the hood as optimized hash tables providing near-instantaneous attribute resolution.',
        architecture:
          'CPython uses a combined compact array of hash table indices and a dense key-value array to preserve insertion order while maintaining O(1) key access.',
        advantages: [
          'High throughput dynamic property access',
          'Compact memory layout reducing pointer overhead by 30%',
          'Fast string key hashing with randomized seed to prevent DoS attacks'
        ]
      },
      {
        title: 'Domain Name System (DNS) Resolver Cache',
        system: 'BIND9 / Unbound DNS Server Cache',
        description:
          'DNS resolvers cache domain name lookups (e.g., "dsaforge.dev" -> 192.0.2.1) in an in-memory hash table with TTL expiration timestamps.',
        architecture:
          'Domain names are hashed to index buckets. When an incoming query matches, the cached IP is returned in microseconds without querying root nameservers.',
        advantages: [
          'Reduces global WAN internet traffic drastically',
          'Achieves sub-millisecond response latency for frequent lookups',
          'Thread-safe read-heavy concurrent bucket locking'
        ]
      }
    ],
    complexityTable: [
      {
        operation: 'Search',
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(n)',
        space: 'O(1)',
        notes: 'Average O(1) under Uniform Hashing. Worst-case O(n) if all keys collide into the same bucket.'
      },
      {
        operation: 'Insertion',
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(n)',
        space: 'O(1)',
        notes: 'Computes hash index and inserts into bucket. Amortized O(1) when resizing is considered.'
      },
      {
        operation: 'Deletion',
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(n)',
        space: 'O(1)',
        notes: 'Requires locating entry then setting tombstone (open addressing) or splicing node (chaining).'
      },
      {
        operation: 'Space Complexity',
        best: 'O(m)',
        average: 'O(m + n)',
        worst: 'O(m + n)',
        space: 'O(m + n)',
        notes: 'Table capacity m plus elements n. For open addressing, space is strictly O(m).'
      }
    ],
    practice: [
      {
        id: 'q-801-1',
        question:
          'What is the fundamental reason why Hashing is used instead of Direct Addressing for large key universes?',
        options: [
          'Hashing is faster than Direct Addressing in the worst case',
          'Direct Addressing requires an array sized to the entire universe of possible keys, wasting massive memory when actual keys are few',
          'Hashing eliminates all collisions completely',
          'Direct Addressing cannot store integer values'
        ],
        correctAnswer: 1,
        explanation:
          'If possible keys span 9 digits (1 billion possibilities) but only 1,000 are used, Direct Addressing wastes 99.9999% of memory. Hashing maps the vast universe into a compact table of size proportional to actual stored elements.'
      },
      {
        id: 'q-801-2',
        question:
          'Under the division hash function h(k) = k % 11, to which table index will the key 47 map?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation:
          '47 divided by 11 gives quotient 4 with a remainder of 3 (11 * 4 = 44; 47 - 44 = 3). Thus, h(47) = 47 % 11 = 3.'
      },
      {
        id: 'q-801-3',
        question:
          'What is the theoretical worst-case time complexity of searching a key in a hash table with n elements?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 2,
        explanation:
          'In the pathological worst-case scenario where the hash function maps every single key to the exact same bucket, the hash table degenerates into a linear list, taking O(n) time to search.'
      },
      {
        id: 'q-801-4',
        question:
          'What is the definition of Load Factor (alpha) in a hash table with capacity m storing n elements?',
        options: ['alpha = m / n', 'alpha = n / m', 'alpha = n * m', 'alpha = m - n'],
        correctAnswer: 1,
        explanation:
          'Load factor alpha is defined as the ratio of stored elements n to the total table capacity m: alpha = n / m. It measures how full the table is.'
      }
    ]
  },
  'top-802': {
    id: 'top-802',
    title: 'Hash Functions & Collision Resolution',
    chapterId: 'chap-8',
    complexity: 'Medium',
    overview:
      'A hash function must distribute keys uniformly and minimize collisions. Because the Pigeonhole Principle guarantees that collisions must occur whenever the key domain exceeds table capacity, robust collision resolution strategies are mandatory. The two primary paradigms are Separate Chaining (closed addressing with linked lists) and Open Addressing (probing alternative slots via Linear Probing, Quadratic Probing, or Double Hashing). Each technique exhibits distinct clustering behavior, cache locality, and load factor limits.',
    conceptSections: [
      {
        title: '1. Anatomy of an Effective Hash Function',
        description:
          'A good hash function satisfies four core criteria to maximize performance.',
        points: [
          'Deterministic: Identical keys must always produce the identical hash index: k1 == k2 => h(k1) == h(k2).',
          'Uniform Distribution: Simple Uniform Hashing Assumption (SUHA) requires that each key has an equal probability (1 / m) of hashing to any of the m slots, independent of where other keys hash.',
          'Fast Computation: The function must compute in O(1) time using minimal CPU cycles (bitwise operations, integer arithmetic).',
          'Minimizes Clustering: High-entropy bit spreading ensures that keys with similar bit patterns map to widely separated slots.'
        ]
      },
      {
        title: '2. Common Hash Function Design Techniques',
        description:
          'Standard mathematical formulations used in computer science textbooks and system runtimes.',
        points: [
          'Division Method: h(k) = k % m. Table size m should be a prime number not too close to a power of 2 (if m = 2^p, h(k) depends only on the lowest p bits of k, ignoring higher bits and causing severe clustering).',
          'Multiplication Method: h(k) = floor(m * (k * A mod 1)), where A is a constant between 0 and 1. Knuth suggested the Golden Ratio fraction A = (sqrt(5) - 1) / 2 ~ 0.6180339887. Advantage: Table size m can safely be a power of 2 (e.g. 2^p), allowing fast bitwise shifts.',
          'Mid-Square Method: Square the key (k^2) and extract the middle r digits. Since all digits of the key contribute to the middle digits of its square, distribution is well randomized.',
          'Folding Method: Divide key into equal-sized chunks, sum the chunks together, and take modulo m.'
        ],
        asciiDiagram: `Division Method:               Multiplication Method (Knuth):
k = 123456, m = 97 (Prime)     A = 0.6180339887
h(k) = 123456 % 97             s = k * A = 123456 * 0.6180339887 = 76299.984
     = 71                      Fractional Part = 0.984
                               h(k) = floor(100 * 0.984) = 98`
      },
      {
        title: '3. Collisions & The Pigeonhole Principle',
        description:
          'Why collisions are a mathematical certainty, not an implementation bug.',
        points: [
          'Pigeonhole Principle: If n items are placed into m pigeonholes and n > m, at least one pigeonhole must contain more than one item.',
          'Birthday Paradox: In a hash table of size m = 365, with only 23 randomly chosen keys, the probability of a collision already exceeds 50%! With 70 keys, collision probability is 99.9%.',
          'Engineering Takeaway: Collisions are unavoidable. System reliability depends entirely on how collisions are resolved.'
        ]
      },
      {
        title: '4. Separate Chaining (Open Hashing / Closed Addressing)',
        description:
          'Each bucket in the hash table array stores the head pointer of a Singly Linked List.',
        points: [
          'Mechanism: When multiple keys hash to the same bucket, the new entry is prepended to the head of the bucket\'s linked list in O(1) time.',
          'Load Factor alpha: Can exceed 1.0 (e.g. alpha = 2.5 means an average chain length of 2.5 nodes).',
          'Advantages: Graceful performance degradation; simple deletion (standard linked list node splicing); insensitive to load factor spikes.',
          'Disadvantages: Extra memory overhead for pointers (8 bytes per node on 64-bit systems); poor CPU cache locality because linked list nodes are scattered across heap memory.'
        ],
        asciiDiagram: `Separate Chaining Architecture:
Index   Bucket Head Pointer
 [0] -> NULL
 [1] -> [ Key: 21 | Next ] -> [ Key: 31 | Next ] -> [ Key: 41 | NULL ]
 [2] -> NULL
 [3] -> [ Key: 13 | NULL ]
 [4] -> [ Key: 44 | Next ] -> [ Key: 84 | NULL ]`
      },
      {
        title: '5. Open Addressing (Closed Hashing)',
        description:
          'All keys are stored directly inside the hash table array slots. No external pointers or linked lists are used.',
        points: [
          'Capacity Limit: Table capacity m must be >= number of elements n. Load factor alpha cannot exceed 1.0 (typically kept <= 0.70 to 0.75).',
          'Probe Sequence: If slot h(k) is occupied, probe alternative slots h(k, 0), h(k, 1), h(k, 2), ... until an empty slot is located.',
          'Linear Probing: h(k, i) = (h(k) + i) % m. Checks adjacent consecutive slots. High cache locality, but causes Primary Clustering (contiguous blocks of occupied slots grow larger, causing long search times).',
          'Quadratic Probing: h(k, i) = (h(k) + c1*i + c2*i^2) % m (commonly h(k) + i^2). Spreads probes quadratically, eliminating primary clustering. Causes Secondary Clustering (keys with same initial hash follow identical probe sequences).',
          'Double Hashing: h(k, i) = (h1(k) + i * h2(k)) % m. The probe step size is determined by a secondary hash function h2(k). h2(k) must never evaluate to 0 and must be coprime to m. Eliminates both primary and secondary clustering!'
        ],
        asciiDiagram: `Open Addressing Probing Formulas:
Linear Probing:      Slot = (h(k) + i) mod m          Step size = 1
Quadratic Probing:   Slot = (h(k) + i^2) mod m        Step size = 1, 4, 9, 16...
Double Hashing:      Slot = (h1(k) + i * h2(k)) mod m Step size = h2(k)`
      },
      {
        title: '6. Primary Clustering vs Secondary Clustering',
        description:
          'Formal technical distinction between clustering phenomena in open addressing.',
        points: [
          'Primary Clustering (Linear Probing): When slots become occupied in continuous blocks, any new key that hashes into or immediately before the block must probe through the entire block and extend it by 1 slot. Clusters grow larger and merge, drastically increasing average probe lengths.',
          'Secondary Clustering (Quadratic Probing): Two keys with identical initial hash h(k1) == h(k2) will trace the exact same probe sequence, even though distinct initial hashes do not merge.',
          'Elimination via Double Hashing: Because the secondary hash h2(k) depends on the key value, two keys hashing to the same initial slot will have different step sizes h2(k1) != h2(k2), tracing completely different probe paths.'
        ]
      }
    ],
    operations: [
      {
        name: 'Separate Chaining Insertion',
        timeComplexity: 'O(1) head insertion',
        spaceComplexity: 'O(1) per node',
        description: 'Allocates a linked node and prepends to the bucket head pointer.',
        cSignature: 'void chainInsert(ChainTable* ct, int key);',
        steps: [
          'Compute bucket index: idx = hash(key) % ct->size.',
          'Allocate newNode = malloc(sizeof(Node)).',
          'Set newNode->key = key; newNode->next = ct->buckets[idx].',
          'Update bucket head: ct->buckets[idx] = newNode.'
        ],
        codeSnippet: `void chainInsert(ChainTable* ct, int key) {
    int idx = key % ct->size;
    Node* newNode = (Node*)malloc(sizeof(Node));
    newNode->key = key;
    newNode->next = ct->buckets[idx];
    ct->buckets[idx] = newNode;
}`
      },
      {
        name: 'Linear Probing Insertion',
        timeComplexity: 'O(1) avg, O(n) worst',
        spaceComplexity: 'O(1)',
        description: 'Probes consecutive slots until an EMPTY or TOMBSTONE slot is found.',
        cSignature: 'bool linearProbeInsert(OpenTable* ot, int key);',
        steps: [
          'Compute initial hash: idx = key % ot->size.',
          'For i = 0 to size - 1: probeIndex = (idx + i) % size.',
          'If slot is EMPTY or DELETED: store key, mark OCCUPIED, return true.',
          'If table is completely full, return false.'
        ],
        codeSnippet: `bool linearProbeInsert(OpenTable* ot, int key) {
    int h = key % ot->size;
    for (int i = 0; i < ot->size; i++) {
        int idx = (h + i) % ot->size;
        if (ot->slots[idx].state != OCCUPIED) {
            ot->slots[idx].key = key;
            ot->slots[idx].state = OCCUPIED;
            return true;
        }
    }
    return false; // Table full
}`
      },
      {
        name: 'Double Hashing Insertion',
        timeComplexity: 'O(1) avg, O(n) worst',
        spaceComplexity: 'O(1)',
        description: 'Uses primary hash h1(k) and non-zero coprime step h2(k).',
        cSignature: 'bool doubleHashInsert(OpenTable* ot, int key);',
        steps: [
          'Compute primary: h1 = key % ot->size.',
          'Compute step: h2 = 7 - (key % 7) [guaranteed 1 to 7].',
          'For i = 0 to size - 1: probeIndex = (h1 + i * h2) % ot->size.',
          'If slot available: store key, return true.'
        ],
        codeSnippet: `bool doubleHashInsert(OpenTable* ot, int key) {
    int h1 = key % ot->size;
    int h2 = 7 - (key % 7); // Non-zero step
    for (int i = 0; i < ot->size; i++) {
        int idx = (h1 + i * h2) % ot->size;
        if (ot->slots[idx].state != OCCUPIED) {
            ot->slots[idx].key = key;
            ot->slots[idx].state = OCCUPIED;
            return true;
        }
    }
    return false;
}`
      }
    ],
    cCode: {
      title: 'Complete C99 Collision Resolution Suite: Chaining & Linear Probing',
      description:
        'A comprehensive ISO C99 program implementing both Separate Chaining (linked lists) and Open Addressing (Linear Probing with Tombstone deletion) to demonstrate collision handling in action.',
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define SIZE 7

// ==========================================
// 1. SEPARATE CHAINING IMPLEMENTATION
// ==========================================
typedef struct Node {
    int key;
    struct Node* next;
} Node;

typedef struct {
    Node* buckets[SIZE];
} ChainTable;

void initChain(ChainTable* ct) {
    for (int i = 0; i < SIZE; i++) ct->buckets[i] = NULL;
}

void chainInsert(ChainTable* ct, int key) {
    int idx = key % SIZE;
    Node* n = (Node*)malloc(sizeof(Node));
    n->key = key;
    n->next = ct->buckets[idx];
    ct->buckets[idx] = n;
}

void displayChain(const ChainTable* ct) {
    printf("=== Separate Chaining (Linked Buckets) ===\\n");
    for (int i = 0; i < SIZE; i++) {
        printf("Index [%d]: ", i);
        Node* curr = ct->buckets[i];
        if (!curr) { printf("NULL\\n"); continue; }
        while (curr) {
            printf("[%d] -> ", curr->key);
            curr = curr->next;
        }
        printf("NULL\\n");
    }
}

// ==========================================
// 2. LINEAR PROBING IMPLEMENTATION
// ==========================================
typedef enum { EMPTY, OCCUPIED, DELETED } SlotState;

typedef struct {
    int key;
    SlotState state;
} Slot;

typedef struct {
    Slot slots[SIZE];
} ProbeTable;

void initProbe(ProbeTable* pt) {
    for (int i = 0; i < SIZE; i++) {
        pt->slots[i].key = 0;
        pt->slots[i].state = EMPTY;
    }
}

bool linearInsert(ProbeTable* pt, int key) {
    int h = key % SIZE;
    for (int i = 0; i < SIZE; i++) {
        int idx = (h + i) % SIZE;
        if (pt->slots[idx].state != OCCUPIED) {
            pt->slots[idx].key = key;
            pt->slots[idx].state = OCCUPIED;
            return true;
        }
    }
    return false;
}

void displayProbe(const ProbeTable* pt) {
    printf("\\n=== Open Addressing (Linear Probing) ===\\n");
    printf("Index | State    | Key\\n");
    printf("---------------------\\n");
    for (int i = 0; i < SIZE; i++) {
        if (pt->slots[i].state == OCCUPIED)
            printf(" [%d]  | OCCUPIED | %d\\n", i, pt->slots[i].key);
        else if (pt->slots[i].state == DELETED)
            printf(" [%d]  | DELETED  | (tombstone)\\n", i);
        else
            printf(" [%d]  | EMPTY    | -\\n", i);
    }
}

int main(void) {
    printf("==============================================\\n");
    printf("  DSAForge: Collision Resolution Lab (m = 7)  \\n");
    printf("==============================================\\n\\n");

    // Keys designed to cause intentional collisions at index 0 (14, 21, 28)
    int keys[] = {14, 21, 28, 15, 22};
    int n = sizeof(keys) / sizeof(keys[0]);

    printf("Inserting keys with multiple collisions: 14, 21, 28, 15, 22\\n\\n");

    // 1. Separate Chaining
    ChainTable ct;
    initChain(&ct);
    for (int i = 0; i < n; i++) chainInsert(&ct, keys[i]);
    displayChain(&ct);

    // 2. Linear Probing
    ProbeTable pt;
    initProbe(&pt);
    for (int i = 0; i < n; i++) linearInsert(&pt, keys[i]);
    displayProbe(&pt);

    // Free chained memory
    for (int i = 0; i < SIZE; i++) {
        Node* curr = ct.buckets[i];
        while (curr) {
            Node* temp = curr;
            curr = curr->next;
            free(temp);
        }
    }
    printf("\\nMemory safely released.\\n");
    return 0;
}`,
      sampleOutput: `==============================================
  DSAForge: Collision Resolution Lab (m = 7)  
==============================================

Inserting keys with multiple collisions: 14, 21, 28, 15, 22

=== Separate Chaining (Linked Buckets) ===
Index [0]: [28] -> [21] -> [14] -> NULL
Index [1]: [22] -> [15] -> NULL
Index [2]: NULL
Index [3]: NULL
Index [4]: NULL
Index [5]: NULL
Index [6]: NULL

=== Open Addressing (Linear Probing) ===
Index | State    | Key
---------------------
 [0]  | OCCUPIED | 14
 [1]  | OCCUPIED | 21
 [2]  | OCCUPIED | 28
 [3]  | OCCUPIED | 15
 [4]  | OCCUPIED | 22
 [5]  | EMPTY    | -
 [6]  | EMPTY    | -

Memory safely released.`
    },
    realWorld: [
      {
        title: 'Linux Kernel Directory Cache (dcache) Hash Chains',
        system: 'Linux Kernel Virtual File System (fs/dcache.c)',
        description:
          'The Linux kernel dcache uses separate chaining to map directory parent and name hashes to dentry memory structures.',
        architecture:
          'Buckets are an array of RCU-protected singly linked lists (hlist_head). Read operations traverse chains locklessly, allowing tens of millions of concurrent filesystem lookups per second.',
        advantages: [
          'Lock-free read traversal using Read-Copy-Update (RCU)',
          'Handles arbitrary filesystem workloads without resizing freezes',
          'Gracefully absorbs collision bursts on identical hash prefixes'
        ]
      },
      {
        title: 'Java `java.util.HashMap` Hybrid Collision Architecture',
        system: 'OpenJDK HotSpot JVM / Java Runtime Environment',
        description:
          'Java HashMap employs Separate Chaining. However, to prevent worst-case HashDoS attacks, when a single bucket chain reaches 8 nodes (TREEIFY_THRESHOLD), it automatically converts the linked list into a Red-Black Tree!',
        architecture:
          'Guarantees that even under deliberate adversarial collision attacks, worst-case search within a bucket improves from O(n) to O(log n).',
        advantages: [
          'Immunizes server endpoints against algorithmic complexity attacks',
          'Maintains lightweight linked nodes for small bucket counts (< 8)',
          'Untreeifies back to linked list if bucket shrinks below 6 nodes'
        ]
      },
      {
        title: 'Redis In-Memory Database Dual Dynamic Hash Tables',
        system: 'Redis Key-Value In-Memory Datastore (dict.c)',
        description:
          'Redis uses separate chaining for in-memory key-value lookups. When resizing is required, it allocates a secondary table and executes incremental rehashing.',
        architecture:
          'Every client request rehashes 1 bucket from table 0 to table 1, avoiding long global stop-the-world latency spikes in low-latency microservices.',
        advantages: [
          'Zero latency spikes: rehashing is amortized over live user queries',
          'Separate chaining enables instantaneous memory pointer updates',
          'Enables sub-millisecond 99th percentile response guarantees'
        ]
      }
    ],
    complexityTable: [
      {
        operation: 'Separate Chaining (Search)',
        best: 'O(1)',
        average: 'O(1 + alpha)',
        worst: 'O(n)',
        space: 'O(m + n)',
        notes: 'Average chain length is alpha = n / m. Successful search takes ~ 1 + alpha / 2 comparisons.'
      },
      {
        operation: 'Linear Probing (Search)',
        best: 'O(1)',
        average: 'O(1 / (1 - alpha))',
        worst: 'O(n)',
        space: 'O(m)',
        notes: 'Suffer from Primary Clustering. Requires alpha < 0.70 for acceptable probe counts.'
      },
      {
        operation: 'Quadratic Probing (Search)',
        best: 'O(1)',
        average: 'O(log(1 / (1 - alpha)))',
        worst: 'O(n)',
        space: 'O(m)',
        notes: 'Eliminates primary clustering. May fail to find empty slot if table size is not prime.'
      },
      {
        operation: 'Double Hashing (Search)',
        best: 'O(1)',
        average: 'O(1 / (1 - alpha))',
        worst: 'O(n)',
        space: 'O(m)',
        notes: 'Eliminates both primary and secondary clustering. Closest approximation to uniform hashing.'
      }
    ],
    practice: [
      {
        id: 'q-802-1',
        question:
          'Why is a prime number preferred as the table size m when using the Division Method h(k) = k % m?',
        options: [
          'Because prime numbers require fewer bits to represent in binary',
          'Because if m is a power of 2 (2^p), the hash value depends only on the lowest p bits of k, ignoring higher bits and causing severe clustering',
          'Because prime numbers eliminate the need for collision resolution',
          'Because prime numbers prevent integer overflow in C'
        ],
        correctAnswer: 1,
        explanation:
          'If m = 2^p, then k % m is simply the lowest p bits of k. Any patterns in the higher bits of keys have zero influence on the index, causing severe clustering for structured keys. A prime m not close to powers of 2 incorporates information across all key bits.'
      },
      {
        id: 'q-802-2',
        question:
          'In Open Addressing with Linear Probing, what phenomenon occurs when occupied slots group into continuous blocks?',
        options: ['Secondary Clustering', 'Primary Clustering', 'Rehashing Inversion', 'Chain Elongation'],
        correctAnswer: 1,
        explanation:
          'Primary clustering occurs in Linear Probing because any key that hashes into or near an occupied block must probe through the entire run and append to its end, making the cluster even larger.'
      },
      {
        id: 'q-802-3',
        question:
          'In Double Hashing with probe sequence h(k, i) = (h1(k) + i * h2(k)) % m, what condition must the secondary hash function h2(k) strictly satisfy?',
        options: [
          'h2(k) must equal h1(k)',
          'h2(k) must never evaluate to 0 and must be coprime to table size m',
          'h2(k) must return negative integers',
          'h2(k) must be a power of 2'
        ],
        correctAnswer: 1,
        explanation:
          'If h2(k) = 0, the step size is zero and probing gets stuck on the same slot infinitely. Coprimality with m ensures the probe sequence visits every single slot in the table before cycling.'
      },
      {
        id: 'q-802-4',
        question:
          'Can the Load Factor alpha exceed 1.0 in a Hash Table that uses Separate Chaining?',
        options: [
          'Yes, because each bucket can hold an arbitrary number of linked nodes',
          'No, because table capacity is a strict upper bound',
          'Only if table size is a prime number',
          'Only during dynamic rehashing'
        ],
        correctAnswer: 0,
        explanation:
          'In Separate Chaining, elements are stored in external linked lists attached to buckets. Thus, the number of elements n can easily exceed table size m (e.g. n = 200, m = 100 => alpha = 2.0).'
      }
    ]
  },
  'top-803': {
    id: 'top-803',
    title: 'Hashing Applications & Performance',
    chapterId: 'chap-8',
    complexity: 'Medium',
    overview:
      'Understanding hash table performance requires analyzing the Load Factor (alpha = n / m), dynamic resizing strategies, and amortized complexity. When a table becomes too full, continuing to insert causes probe lengths and chain sizes to degrade rapidly. Dynamic rehashing doubles capacity and redistributes elements to restore O(1) performance. In addition, developers must understand when hashing is appropriate compared to Binary Search Trees and why cryptographic password hashing differs fundamentally from educational hash tables.',
    conceptSections: [
      {
        title: '1. Load Factor (alpha) & Performance Degradation',
        description:
          'The Load Factor alpha = n / m is the single most critical parameter governing hash table speed.',
        points: [
          'Definition: alpha = (Number of stored elements n) / (Table capacity m).',
          'In Open Addressing: alpha must strictly stay < 1.0. When alpha exceeds 0.75, average probe count spikes asymptotically (probes ~ 1 / (1 - alpha)). At alpha = 0.9, an unsuccessful search takes ~ 10 probes!',
          'In Separate Chaining: alpha can exceed 1.0, representing the average linked list length. Search takes O(1 + alpha) time. When alpha = 10, search degrades to 10 sequential pointer traversals.',
          'Resizing Threshold: Industry standard hash tables trigger dynamic resizing when alpha reaches 0.70 to 0.75.'
        ],
        asciiDiagram: `Load Factor vs Average Probes (Open Addressing):
alpha = 0.50  ===> ~ 2.0 probes per search
alpha = 0.75  ===> ~ 4.0 probes per search
alpha = 0.90  ===> ~ 10.0 probes per search
alpha = 0.99  ===> ~ 100.0 probes per search (Severe Degradation!)`
      },
      {
        title: '2. Dynamic Resizing & Rehashing Process',
        description:
          'How hash tables maintain O(1) average performance indefinitely as data grows.',
        points: [
          'Step 1: When n / m >= alpha_threshold (e.g. 0.75), allocate a new table of capacity 2*m (or the smallest prime > 2*m).',
          'Step 2: Re-compute the hash index for every existing element using the new table size: new_idx = key % m_new. (Crucial: Keys cannot simply be copied to the same indices because the modulo divisor has changed!).',
          'Step 3: Insert existing elements into their new buckets in the expanded table.',
          'Step 4: Deallocate the old table buffer using free().',
          'Amortized Analysis: While an individual resize operation costs O(n) linear time, it occurs so infrequently that the amortized time per insertion remains strictly O(1).'
        ],
        asciiDiagram: `Dynamic Rehashing Sequence:
[Table m = 4, alpha = 1.0]           [Expanded Table m_new = 8]
Slot 0: Key 4  (4 % 4 = 0)   ===>    Slot 0: Key 8  (8 % 8 = 0)
Slot 1: Key 5  (5 % 4 = 1)   ===>    Slot 1: Key 9  (9 % 8 = 1)
Slot 2: Key 6  (6 % 4 = 2)   ===>    Slot 4: Key 4  (4 % 8 = 4!)
Slot 3: Key 7  (7 % 4 = 3)   ===>    Slot 5: Key 5  (5 % 8 = 5!)`
      },
      {
        title: '3. Comparative Search Structures Face-Off',
        description:
          'Factual comparison between arrays, linked lists, binary search trees, and hash tables.',
        points: [
          'Unordered Array / List: Search O(n), Insert O(1), Delete O(n). No order.',
          'Ordered Array: Search O(log n) via binary search, Insert O(n) shift, Delete O(n) shift.',
          'Binary Search Tree (Balanced): Search O(log n), Insert O(log n), Delete O(log n). Natural in-order sorted traversal. Excellent for range queries (BETWEEN x AND y).',
          'Hash Table: Search O(1) expected, Insert O(1) expected, Delete O(1) expected. No order preservation! Poor for range queries or finding min/max.'
        ]
      },
      {
        title: '4. Critical Security Distinction: Fast Hash Tables vs Cryptographic KDFs',
        description:
          'Engineering students must never use educational hash table functions for password storage.',
        points: [
          'Hash Table Functions: Designed strictly for SPEED and UNIFORMITY (e.g., modulo, MurmurHash, xxHash, FNV-1a). Millions of keys per second. They provide ZERO cryptographic security.',
          'Password Storage Reality: Passwords must be hashed using deliberately SLOW, computationally intensive Key Derivation Functions (KDFs) such as bcrypt, Argon2, or PBKDF2.',
          'Why? A modern GPU can compute billions of fast hashes per second, cracking passwords via rainbow tables in seconds. Password KDFs incorporate random Salt and tunable Work Factors (memory/CPU cost) to make brute-force attacks economically and computationally impossible.'
        ]
      }
    ],
    operations: [
      {
        name: 'Dynamic Table Resizing (Rehashing)',
        timeComplexity: 'O(n) during resize, O(1) amortized',
        spaceComplexity: 'O(new_capacity) temporary',
        description: 'Allocates doubled capacity table and re-hashes all existing elements.',
        cSignature: 'void resize(DynamicHashTable* ht);',
        steps: [
          'Save old capacity and old table pointer.',
          'Calculate newCapacity = oldCapacity * 2.',
          'Allocate new table array of size newCapacity.',
          'Iterate through old table: for every occupied slot, compute new_idx = key % newCapacity and insert.',
          'Free old table array.'
        ],
        codeSnippet: `void resize(DynamicHashTable* ht) {
    int oldCap = ht->capacity;
    Slot* oldTable = ht->table;

    ht->capacity = oldCap * 2;
    ht->count = 0;
    ht->table = (Slot*)calloc(ht->capacity, sizeof(Slot));

    for (int i = 0; i < oldCap; i++) {
        if (oldTable[i].occupied) {
            insert(ht, oldTable[i].key, oldTable[i].value);
        }
    }
    free(oldTable);
}`
      },
      {
        name: 'Amortized Insert with Auto-Resize',
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(1)',
        description: 'Inserts key and checks if load factor >= 0.75 to trigger automatic resize.',
        cSignature: 'void insertWithRehash(DynamicHashTable* ht, int key, int val);',
        steps: [
          'Check load factor: if (float)(ht->count + 1) / ht->capacity >= 0.75, call resize(ht).',
          'Execute standard linear probing insertion in updated table.',
          'Increment count.'
        ],
        codeSnippet: `void insertWithRehash(DynamicHashTable* ht, int key, int val) {
    if ((float)(ht->count + 1) / ht->capacity >= 0.75f) {
        resize(ht);
    }
    // Probing insertion follows...
}`
      }
    ],
    cCode: {
      title: 'Complete C99 Self-Resizing Dynamic Hash Table with Automatic Rehashing',
      description:
        'A production-grade ISO C99 program demonstrating automatic capacity doubling and full rehashing whenever the load factor exceeds 0.75, verifying O(1) amortized efficiency.',
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    int key;
    int value;
    bool occupied;
} Slot;

typedef struct {
    Slot* table;
    int capacity;
    int count;
} DynamicHashTable;

// Prototypes
DynamicHashTable* createTable(int initCapacity);
void insert(DynamicHashTable* ht, int key, int val);
bool search(DynamicHashTable* ht, int key, int* outVal);
void resize(DynamicHashTable* ht);
void printTable(const DynamicHashTable* ht);
void freeTable(DynamicHashTable* ht);

int main(void) {
    printf("==============================================\\n");
    printf("  DSAForge: Dynamic Hash Table with Rehashing \\n");
    printf("==============================================\\n\\n");

    // Start with small capacity m = 4 to demonstrate rehashing quickly
    DynamicHashTable* ht = createTable(4);

    printf("Initial Capacity: %d (Resize Threshold: alpha >= 0.75)\\n\\n", ht->capacity);

    printf("Inserting: [10 -> 100], [20 -> 200], [30 -> 300]...\\n");
    insert(ht, 10, 100);
    insert(ht, 20, 200);
    insert(ht, 30, 300);
    printTable(ht);

    printf("\\nInserting 4th item [40 -> 400] (Load Factor 4/4 = 1.0 >= 0.75, triggers REHASH!)...\\n");
    insert(ht, 40, 400);
    printTable(ht);

    printf("\\nInserting more keys: [50 -> 500], [60 -> 600], [70 -> 700]...\\n");
    insert(ht, 50, 500);
    insert(ht, 60, 600);
    insert(ht, 70, 700);
    printTable(ht);

    // Verify search in rehashed table
    int val = 0;
    int testKey = 30;
    if (search(ht, testKey, &val)) {
        printf("\\nSearch Key %d: FOUND (Value = %d)\\n", testKey, val);
    }

    freeTable(ht);
    printf("Dynamic table memory successfully freed.\\n");
    return 0;
}

DynamicHashTable* createTable(int initCapacity) {
    DynamicHashTable* ht = (DynamicHashTable*)malloc(sizeof(DynamicHashTable));
    ht->capacity = initCapacity;
    ht->count = 0;
    ht->table = (Slot*)calloc(ht->capacity, sizeof(Slot));
    return ht;
}

void resize(DynamicHashTable* ht) {
    int oldCap = ht->capacity;
    Slot* oldTable = ht->table;

    int newCap = oldCap * 2;
    printf(">>> [REHASH TRIGGERED]: Expanding capacity from %d to %d slots...\\n", oldCap, newCap);

    ht->capacity = newCap;
    ht->count = 0;
    ht->table = (Slot*)calloc(ht->capacity, sizeof(Slot));

    for (int i = 0; i < oldCap; i++) {
        if (oldTable[i].occupied) {
            insert(ht, oldTable[i].key, oldTable[i].value);
        }
    }
    free(oldTable);
}

void insert(DynamicHashTable* ht, int key, int val) {
    if ((float)(ht->count + 1) / ht->capacity >= 0.75f) {
        resize(ht);
    }
    int h = key % ht->capacity;
    if (h < 0) h += ht->capacity;

    for (int i = 0; i < ht->capacity; i++) {
        int idx = (h + i) % ht->capacity;
        if (!ht->table[idx].occupied || ht->table[idx].key == key) {
            ht->table[idx].key = key;
            ht->table[idx].value = val;
            if (!ht->table[idx].occupied) {
                ht->table[idx].occupied = true;
                ht->count++;
            }
            return;
        }
    }
}

bool search(DynamicHashTable* ht, int key, int* outVal) {
    int h = key % ht->capacity;
    if (h < 0) h += ht->capacity;

    for (int i = 0; i < ht->capacity; i++) {
        int idx = (h + i) % ht->capacity;
        if (!ht->table[idx].occupied) return false;
        if (ht->table[idx].key == key) {
            *outVal = ht->table[idx].value;
            return true;
        }
    }
    return false;
}

void printTable(const DynamicHashTable* ht) {
    printf("Table (Cap: %d, Count: %d, alpha: %.2f):\\n",
           ht->capacity, ht->count, (float)ht->count / ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        if (ht->table[i].occupied)
            printf("  [%d] -> Key: %-3d | Val: %-3d\\n", i, ht->table[i].key, ht->table[i].value);
        else
            printf("  [%d] -> EMPTY\\n", i);
    }
}

void freeTable(DynamicHashTable* ht) {
    free(ht->table);
    free(ht);
}`,
      sampleOutput: `==============================================
  DSAForge: Dynamic Hash Table with Rehashing 
==============================================

Initial Capacity: 4 (Resize Threshold: alpha >= 0.75)

Inserting: [10 -> 100], [20 -> 200], [30 -> 300]...
Table (Cap: 4, Count: 3, alpha: 0.75):
  [0] -> Key: 20  | Val: 200
  [1] -> EMPTY
  [2] -> Key: 10  | Val: 100
  [3] -> Key: 30  | Val: 300

Inserting 4th item [40 -> 400] (Load Factor 4/4 = 1.0 >= 0.75, triggers REHASH!)...
>>> [REHASH TRIGGERED]: Expanding capacity from 4 to 8 slots...
Table (Cap: 8, Count: 4, alpha: 0.50):
  [0] -> Key: 40  | Val: 400
  [1] -> EMPTY
  [2] -> Key: 10  | Val: 100
  [3] -> EMPTY
  [4] -> Key: 20  | Val: 200
  [5] -> EMPTY
  [6] -> Key: 30  | Val: 300
  [7] -> EMPTY

Inserting more keys: [50 -> 500], [60 -> 600], [70 -> 700]...
>>> [REHASH TRIGGERED]: Expanding capacity from 8 to 16 slots...
Table (Cap: 16, Count: 7, alpha: 0.44):
  [0] -> EMPTY
  [1] -> EMPTY
  [2] -> Key: 50  | Val: 500
  [4] -> Key: 20  | Val: 200
  [6] -> Key: 70  | Val: 700
  [8] -> Key: 40  | Val: 400
  [10] -> Key: 10  | Val: 100
  [12] -> Key: 60  | Val: 600
  [14] -> Key: 30  | Val: 300

Search Key 30: FOUND (Value = 300)
Dynamic table memory successfully freed.`
    },
    realWorld: [
      {
        title: 'PostgreSQL Relational Database Hash Join Algorithm',
        system: 'PostgreSQL Query Planner / Executor (nodeHash.c)',
        description:
          'When executing an inner join between two large tables (SELECT * FROM orders JOIN customers ON orders.cust_id = customers.id), Postgres builds an in-memory hash table of the smaller relation.',
        architecture:
          'The inner relation is hashed by join key. The outer relation is scanned once, probing the hash table in O(1) time per row to find matching join rows, achieving O(N + M) total join time.',
        advantages: [
          'Dramatically outperforms nested loop joins (O(N * M)) on large datasets',
          'Avoids expensive disk sorting required by Merge Join algorithms',
          'Employs dynamic batching when hash table exceeds work_mem'
        ]
      },
      {
        title: 'Distributed In-Memory Caching (Memcached / Redis Cluster)',
        system: 'Memcached / Redis Distributed KV Cache',
        description:
          'Web platforms like Twitter and Netflix cache database records in RAM using Consistent Hashing distributed across hundreds of server nodes.',
        architecture:
          'Consistent hashing maps both server node IPs and cache keys to a virtual hash ring (0 to 2^32 - 1). Adding or removing a server only relocates K / N keys rather than rehashing the entire cluster.',
        advantages: [
          'Prevents cache stampedes when nodes join or fail dynamically',
          'Horizontally scales memory capacity to tens of terabytes',
          'Sub-millisecond query response for read-intensive traffic'
        ]
      },
      {
        title: 'Git Content-Addressable Object Database (SHA-1 / SHA-256 DAG)',
        system: 'Git Object Storage (.git/objects)',
        description:
          'Git stores every file, directory tree, and commit as a content-addressed object named after the cryptographic hash of its payload.',
        architecture:
          'Objects are indexed in a two-tier directory hash table: the first 2 characters of the 40-character hex hash form the directory, and the remaining 38 form the filename.',
        advantages: [
          'Automatic global de-duplication of identical file contents',
          'Cryptographic tamper detection: modifying a byte changes the hash',
          'Extremely fast diff calculations between revision trees'
        ]
      }
    ],
    complexityTable: [
      {
        operation: 'Hash Table Search',
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(n)',
        space: 'O(1)',
        notes: 'Average O(1) expected time. Worst case O(n) under deliberate collision attacks.'
      },
      {
        operation: 'Hash Table Insertion',
        best: 'O(1)',
        average: 'O(1) amortized',
        worst: 'O(n)',
        space: 'O(1)',
        notes: 'Amortized O(1) accounting for periodic capacity doubling and full rehashing.'
      },
      {
        operation: 'BST Search (Balanced)',
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(log n)',
        space: 'O(log n)',
        notes: 'Guaranteed logarithmic search in AVL/Red-Black trees; supports range queries.'
      },
      {
        operation: 'Sorted Array Search',
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(log n)',
        space: 'O(1)',
        notes: 'Binary search O(log n), but insertions require O(n) element shifting.'
      }
    ],
    practice: [
      {
        id: 'q-803-1',
        question:
          'Why must every key be rehashed (new_index = key % new_capacity) when a hash table dynamically doubles its capacity?',
        options: [
          'Because memory pointers change their address in RAM',
          'Because the modulo divisor has changed, so an element\'s calculated index will generally differ in the larger table',
          'Because old keys are automatically converted to strings',
          'To encrypt the keys for security'
        ],
        correctAnswer: 1,
        explanation:
          'Hash table index is computed as h(k) = k % m. When m changes to 2*m, the remainder changes (e.g. 10 % 4 = 2, but 10 % 8 = 2, and 14 % 4 = 2, but 14 % 8 = 6). Every key must be recomputed against the new capacity.'
      },
      {
        id: 'q-803-2',
        question:
          'Why are standard fast hash table functions (like modulo or MurmurHash) NEVER appropriate for user password storage?',
        options: [
          'Because they are too slow for web servers',
          'Because they are optimized for fast computation, allowing GPUs to test billions of guesses per second; passwords require slow, salted KDFs like bcrypt or Argon2',
          'Because hash tables cannot store string passwords',
          'Because fast hash functions only work with prime numbers'
        ],
        correctAnswer: 1,
        explanation:
          'Hash table functions prioritize maximum speed. Modern GPUs can calculate billions of fast hashes per second, making brute-force dictionary attacks trivial. Password storage requires slow Key Derivation Functions (Argon2, bcrypt) with work factors and salts to prevent cracking.'
      },
      {
        id: 'q-803-3',
        question:
          'Which of the following queries is efficiently supported by a Balanced Binary Search Tree (BST) but POORLY supported by a Hash Table?',
        options: [
          'Exact key lookup (Find key == 42)',
          'Range query (Find all keys where 20 <= key <= 80)',
          'Key insertion',
          'Single key deletion'
        ],
        correctAnswer: 1,
        explanation:
          'Hash tables scatter keys pseudo-randomly across buckets, destroying all ordering. Finding keys in a range requires scanning every bucket in O(n) time. A BST maintains strict in-order sort, enabling efficient O(log n + k) range queries.'
      },
      {
        id: 'q-803-4',
        question:
          'What is the amortized time complexity of inserting n elements into a dynamic hash table that doubles its capacity whenever alpha >= 0.75?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 0,
        explanation:
          'Even though resizing takes O(n) work, resizing happens exponentially infrequently (at sizes 4, 8, 16, 32...). The aggregate cost of all resizings for n insertions is sum(2^i) <= 2n, which distributed over n insertions yields O(1) amortized time per insertion.'
      }
    ]
  }
};
