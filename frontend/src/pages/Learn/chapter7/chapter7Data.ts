// Chapter 7: Trees & Traversal — Curriculum Data Source
// Grounded in CLRS (Introduction to Algorithms), Sedgewick (Algorithms in C), and Tanenbaum

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

export const chapter7Topics: Record<string, TopicData> = {
  'top-701': {
    id: 'top-701',
    title: 'Tree Fundamentals & Binary Trees',
    chapterId: 'chap-7',
    complexity: 'Easy',
    overview:
      'A tree is an essential non-linear hierarchical data structure consisting of nodes connected by directed edges. Unlike arrays and linked lists where elements follow a sequential order, trees represent natural hierarchies such as file directory systems, organization charts, and HTML DOM structures. A Binary Tree restricts every node to at most two children, forming the architectural foundation for search trees, heaps, and expression evaluators.',
    conceptSections: [
      {
        title: '1. Introduction to Trees & Non-Linear Hierarchy',
        description:
          'In computer science, a tree is defined recursively as a set of one or more nodes where one designated node is the Root, and the remaining nodes are partitioned into disjoint non-empty sets, each of which is itself a subtree.',
        points: [
          'Linear vs Non-Linear: Linear structures (arrays, linked lists, stacks, queues) have a strict 1:1 predecessor-to-successor relationship. Trees exhibit a 1:N hierarchical relationship (one parent, multiple children).',
          'Acyclic Property: A tree is a connected, undirected (or directed from root) acyclic graph. There is exactly one unique path between any two nodes.',
          'Edge-to-Node Relation: Any tree with N nodes contains exactly N - 1 edges. The root node has an in-degree of 0, while all other nodes have an in-degree of 1.',
          'Subtree: Any node in a tree can be considered the root of its own subtree, consisting of that node and all its descendants.'
        ],
        asciiDiagram: `      Tree Invariant: Exactly (N - 1) Edges for N Nodes
                     [Root: A]             <-- In-degree = 0
                    /         \\
           Edge 1  /           \\  Edge 2
                  v             v
             [Node: B]       [Node: C]     <-- Internal Nodes
             /       \\               \\
    Edge 3  /         \\ Edge 4        \\ Edge 5
           v           v               v
       [Leaf: D]   [Leaf: E]       [Leaf: F] <-- Terminal Nodes (Leaves)`
      },
      {
        title: '2. Formal Tree Terminology & Structural Metrics',
        description:
          'Precise engineering definitions must be applied when analyzing tree structures, depths, levels, and degrees.',
        points: [
          'Root: The unique top-level node with no parent (in-degree = 0).',
          'Edge: The directed connection linking a parent node to a child node.',
          'Parent & Child: If an edge connects node U to node V (U -> V), U is the parent and V is the child.',
          'Siblings: Nodes that share the exact same immediate parent (e.g., D and E are siblings).',
          'Leaf / Terminal Node: A node with degree 0 (no children).',
          'Internal / Non-Terminal Node: Any node with degree >= 1 (has at least one child).',
          'Degree of a Node: The total number of children belonging to that specific node.',
          'Degree of a Tree: The maximum degree among all nodes in the tree (for a binary tree, max degree = 2).',
          'Depth of a Node: The length of the path (number of edges) from the root down to that node. Depth(Root) = 0.',
          'Level: In standard CS conventions, Level is defined as Depth (0-based) or Depth + 1 (1-based, where Root is at Level 1). We clearly specify Level = Depth + 1.',
          'Height of a Node: The number of edges on the longest downward path from that node to a leaf. Height of a leaf = 0.',
          'Height of a Tree: The height of the root node (i.e. length of the longest path from root to any leaf in edges). Note: Some literature counts nodes on the path (Levels = Height + 1).',
          'Ancestor & Descendant: Node U is an ancestor of V if U lies on the path from root to V. V is a descendant of U.'
        ],
        asciiDiagram: `Level 1 (Depth 0)              [ A ]             Height = 2
                              /     \\
Level 2 (Depth 1)          [ B ]     [ C ]         Height = 1
                          /     \\         \\
Level 3 (Depth 2)      [ D ]   [ E ]       [ F ]   Height = 0 (Leaves)`
      },
      {
        title: '3. Specialized Taxonomy of Binary Trees',
        description:
          'A Binary Tree is a tree where no node has more than two children. Each child is strictly identified as either a Left Child or a Right Child.',
        points: [
          'Full Binary Tree (Strict / Proper): Every node has either 0 or 2 children. No node has exactly 1 child.',
          'Complete Binary Tree: Every level, except possibly the last, is completely filled, and all nodes in the last level are packed as far left as possible (crucial for binary heap array mapping).',
          'Perfect Binary Tree: All internal nodes have exactly 2 children and all leaves reside at the identical level. Total nodes N = 2^(h+1) - 1 (for edge-height h).',
          'Balanced Binary Tree: A tree where the height is bounded to O(log N). Note: Specific balancing criteria vary by algorithm (e.g., AVL requires balance factor |h_L - h_R| <= 1; Red-Black bounds black-height; B-Trees require all leaves at equal depth).',
          'Degenerate / Skewed Binary Tree: Every internal node has only one child. If all children are left children, it is Left-Skewed; if all right, Right-Skewed. Height = N - 1, degrading operations to O(N) linear time (identical to a singly linked list).'
        ],
        asciiDiagram: `Full Binary Tree:          Complete Binary Tree:       Skewed (Degenerate):
      (10)                         (10)                       (10)
     /    \\                       /    \\                        \\
   (20)  (30)                   (20)  (30)                      (20)
        /    \\                 /    \\                            \\
      (40)  (50)             (40)  (50)                           (30)`
      },
      {
        title: '4. Binary Tree Representation: Linked vs Array-Based',
        description:
          'Binary trees can be represented dynamically using self-referential pointers or statically within contiguous arrays.',
        points: [
          'Linked Representation: Each node is allocated dynamically on the heap with data and two pointers: left and right. Ideal for arbitrary binary trees.',
          'Array Representation: For a Complete Binary Tree, nodes are mapped to array indices without storing pointers.',
          '0-Based Array Indexing Invariants: If node is at index i: Left Child = 2*i + 1; Right Child = 2*i + 2; Parent = floor((i - 1) / 2).',
          '1-Based Array Indexing Invariants: If node is at index i: Left Child = 2*i; Right Child = 2*i + 1; Parent = floor(i / 2).',
          'Memory Trade-Off: Array representation saves pointer overhead for complete binary trees, but for skewed trees, an array of size 2^(N) - 1 is needed, wasting exponential space.'
        ],
        asciiDiagram: `Linked Node Structure:                Array Representation (0-Indexed):
+-----------------------+              Indices: [0]  [1]  [2]  [3]  [4]
| struct Node* |  data  | struct Node* | Values:  [A]  [B]  [C]  [D]  [E]
|    left      |  (val) |    right     |
+-----------------------+              Left(0) = 2(0)+1 = 1 ('B')
                                       Right(0) = 2(0)+2 = 2 ('C')
                                       Parent(4) = (4-1)/2 = 1 ('B')`
      },
      {
        title: '5. Mathematical Properties of Binary Trees',
        description:
          'Provable algebraic theorems governing node counts, levels, leaves, and heights in binary trees.',
        points: [
          'Maximum Nodes at Level l: For level l (0-indexed where root is level 0), max nodes = 2^l.',
          'Maximum Nodes for Height h: For a binary tree of height h (where single root node has height 0), max nodes N = sum(2^i, i=0..h) = 2^(h+1) - 1.',
          'Minimum Height for N Nodes: A binary tree with N nodes has minimum height h_min = ceil(log2(N + 1)) - 1 = floor(log2 N).',
          'Leaf vs Degree-2 Relation: In any non-empty binary tree, if n0 is the number of leaves and n2 is the number of nodes of degree 2, then n0 = n2 + 1. (Proof: Total edges E = N - 1. Also E = 1*n1 + 2*n2. Since N = n0 + n1 + n2, n0 + n1 + n2 - 1 = n1 + 2*n2 => n0 = n2 + 1).'
        ]
      }
    ],
    operations: [
      {
        name: 'Create Node',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        description: 'Allocates a new TreeNode on the heap, initializes data, and sets left and right child pointers to NULL.',
        cSignature: 'struct Node* createNode(int value);',
        steps: [
          'Allocate sizeof(struct Node) bytes using malloc().',
          'Verify allocation success (check if pointer is non-NULL).',
          'Set node->data = value.',
          'Set node->left = NULL and node->right = NULL.',
          'Return the pointer to the newly created node.'
        ],
        codeSnippet: `struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        fprintf(stderr, "Heap allocation failed!\\n");
        return NULL;
    }
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}`
      },
      {
        name: 'Calculate Tree Height',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) stack space',
        description: 'Recursively computes the height of a binary tree by finding the maximum height among left and right subtrees.',
        cSignature: 'int getHeight(struct Node* root);',
        steps: [
          'Base Case: If root == NULL, return -1 (height in edges) or 0 (height in levels). We return 0 for empty, height in levels.',
          'Recursively compute left subtree height: leftH = getHeight(root->left).',
          'Recursively compute right subtree height: rightH = getHeight(root->right).',
          'Return 1 + max(leftH, rightH).'
        ],
        codeSnippet: `int getHeight(struct Node* root) {
    if (root == NULL) return 0; // 0 nodes = height 0
    int leftH = getHeight(root->left);
    int rightH = getHeight(root->right);
    return 1 + (leftH > rightH ? leftH : rightH);
}`
      },
      {
        name: 'Count Total Nodes & Leaves',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) stack space',
        description: 'Traverses the tree to count total nodes and identifies leaf nodes having left == NULL && right == NULL.',
        cSignature: 'int countLeaves(struct Node* root);',
        steps: [
          'If root == NULL, return 0.',
          'If root->left == NULL && root->right == NULL, return 1 (this node is a leaf).',
          'Otherwise, return countLeaves(root->left) + countLeaves(root->right).'
        ],
        codeSnippet: `int countLeaves(struct Node* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}`
      }
    ],
    cCode: {
      title: 'Complete C99 Binary Tree Construction & Property Analyzer',
      description:
        'A complete, standalone ISO C99 program demonstrating manual linked binary tree creation, pointer wiring, leaf node counting, height calculation, and tree deallocation.',
      code: `#include <stdio.h>
#include <stdlib.h>

// Definition of binary tree node
struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

// Function prototypes
struct Node* createNode(int value);
int getHeight(struct Node* root);
int countNodes(struct Node* root);
int countLeaves(struct Node* root);
void freeTree(struct Node* root);

int main(void) {
    printf("==============================================\\n");
    printf("  DSAForge: Binary Tree Linked Representation \\n");
    printf("==============================================\\n\\n");

    /* Constructing the following tree:
                10
              /    \\
            20      30
           /  \\       \\
          40   50      60
    */
    struct Node* root = createNode(10);
    root->left = createNode(20);
    root->right = createNode(30);

    root->left->left = createNode(40);
    root->left->right = createNode(50);
    root->right->right = createNode(60);

    printf("Tree constructed successfully!\\n\\n");
    printf("--- Structural Metrics ---\\n");
    printf("Total Nodes : %d\\n", countNodes(root));
    printf("Leaf Nodes  : %d\\n", countLeaves(root));
    printf("Tree Height : %d levels\\n", getHeight(root));

    // Release allocated memory
    freeTree(root);
    printf("\\nTree memory safely deallocated.\\n");

    return 0;
}

struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        fprintf(stderr, "Error: Memory allocation failed!\\n");
        exit(EXIT_FAILURE);
    }
    newNode->data = value;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

int getHeight(struct Node* root) {
    if (root == NULL) return 0;
    int leftH = getHeight(root->left);
    int rightH = getHeight(root->right);
    return 1 + (leftH > rightH ? leftH : rightH);
}

int countNodes(struct Node* root) {
    if (root == NULL) return 0;
    return 1 + countNodes(root->left) + countNodes(root->right);
}

int countLeaves(struct Node* root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;
    return countLeaves(root->left) + countLeaves(root->right);
}

void freeTree(struct Node* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}`,
      sampleOutput: `==============================================
  DSAForge: Binary Tree Linked Representation 
==============================================

Tree constructed successfully!

--- Structural Metrics ---
Total Nodes : 6
Leaf Nodes  : 3
Tree Height : 3 levels

Tree memory safely deallocated.`
    },
    realWorld: [
      {
        title: 'Linux Virtual File System (VFS) Inode Directory Hierarchy',
        system: 'Linux Kernel VFS / dentry cache',
        description:
          'Operating system directory trees are represented hierarchically. The root directory "/" acts as the tree root, subdirectories are internal nodes, and files are leaf nodes.',
        architecture:
          'Directory entries (dentry structures) maintain parent and child pointers, forming a general tree optimized with hash tables for rapid path traversal (/usr/bin/gcc).',
        advantages: [
          'Enables recursive permission inheritance and path resolution',
          'Prevents cyclic directory links via acyclic tree invariants',
          'Allows sub-mounts to attach as subtrees dynamically'
        ]
      },
      {
        title: 'Document Object Model (DOM) Engine in Web Browsers',
        system: 'Chromium Blink / Mozilla Gecko DOM Parser',
        description:
          'HTML markup is parsed into a tree of DOM nodes where <html> is the root, <body> and <head> are branches, and text/attributes are leaf nodes.',
        architecture:
          'Browser engines use tree traversal algorithms to compute style cascades (CSSOM), calculate layout geometries, and propagate event bubbling from leaves to the root.',
        advantages: [
          'Natural representation of nested container tags',
          'Facilitates incremental rendering and subtree re-layouts',
          'Supports standard XPath and CSS selector tree matching'
        ]
      },
      {
        title: 'Huffman Coding Tree for Lossless Data Compression',
        system: 'ZIP / GZIP / JPEG Entropy Encoding',
        description:
          'Huffman compression generates a full binary tree where characters with higher frequency have shorter path lengths from the root, yielding variable-length prefix codes.',
        architecture:
          'Traversing left represents bit 0 and right represents bit 1. Since characters only reside at leaf nodes, no code is a prefix of another (Prefix Rule).',
        advantages: [
          'Guarantees optimal prefix codes for given character frequencies',
          'Full binary tree property ensures 0 or 2 children at every step',
          'Reduces text payload size by 30% to 70% in lossless archives'
        ]
      }
    ],
    complexityTable: [
      {
        operation: 'Tree Height Calculation',
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Must visit every node once. Stack space bounded by tree height h (log n for balanced, n for skewed).'
      },
      {
        operation: 'Leaf Node Counting',
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Examines left and right child pointers of all n nodes.'
      },
      {
        operation: 'Complete Tree Node Lookup (Array)',
        best: 'O(1)',
        average: 'O(1)',
        worst: 'O(1)',
        space: 'O(1)',
        notes: 'Direct arithmetic indexing: Left = 2*i + 1, Right = 2*i + 2, Parent = (i-1)/2.'
      },
      {
        operation: 'Node Insertion (Arbitrary Binary Tree)',
        best: 'O(1)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Depends on whether target parent location is already known (O(1)) or requires search (O(n)).'
      }
    ],
    practice: [
      {
        id: 'q-701-1',
        question: 'In a non-empty binary tree with n nodes, what is the exact number of edges?',
        options: ['n', 'n - 1', '2n', 'n / 2'],
        correctAnswer: 1,
        explanation:
          'Every node in a tree except the root node has exactly one incoming edge (in-degree = 1). Since the root has 0 incoming edges, the total number of edges is always n - 1.'
      },
      {
        id: 'q-701-2',
        question:
          'If a complete binary tree is stored in an array using 0-based indexing, where is the left child of the node at index 5 located?',
        options: ['Index 10', 'Index 11', 'Index 12', 'Index 9'],
        correctAnswer: 1,
        explanation:
          'Under 0-based indexing, the left child of node at index i is located at 2*i + 1. For i = 5: 2*(5) + 1 = 11.'
      },
      {
        id: 'q-701-3',
        question:
          'A non-empty binary tree has 14 leaf nodes (degree 0). According to the degree-relation theorem, how many nodes with degree 2 exist in this tree?',
        options: ['13', '14', '15', '28'],
        correctAnswer: 0,
        explanation:
          'By the standard theorem, in any non-empty binary tree, the number of leaf nodes n0 is related to the number of degree-2 nodes n2 by n0 = n2 + 1. Therefore, n2 = n0 - 1 = 14 - 1 = 13.'
      },
      {
        id: 'q-701-4',
        question:
          'What distinguishes a Complete Binary Tree from a Full Binary Tree?',
        options: [
          'A complete binary tree has all leaves at the same level, while a full binary tree does not',
          'A full binary tree has 0 or 2 children per node; a complete binary tree fills levels from left to right',
          'A complete binary tree must have an odd number of nodes',
          'They are identical data structures with different names'
        ],
        correctAnswer: 1,
        explanation:
          'In a Full Binary Tree, every node must have either 0 or 2 children. In a Complete Binary Tree, every level except possibly the last is completely filled, and all nodes in the last level are as far left as possible.'
      }
    ]
  },
  'top-702': {
    id: 'top-702',
    title: 'Binary Search Trees (BST)',
    chapterId: 'chap-7',
    complexity: 'Medium',
    overview:
      'A Binary Search Tree (BST) is a specialized binary tree ordered such that for every node X, all keys in the left subtree are strictly less than X, and all keys in the right subtree are strictly greater than X. This ordering invariant enables efficient logarithmic searching, insertion, and deletion on average. However, if keys are inserted in sorted order, an unbalanced BST degenerates into a linear linked list with O(n) worst-case performance.',
    conceptSections: [
      {
        title: '1. The Binary Search Tree Invariant',
        description:
          'A Binary Search Tree maintains a strict binary search property across every subtree.',
        points: [
          'Ordering Invariant: For any node X: Key(Left_Subtree(X)) < Key(X) < Key(Right_Subtree(X)).',
          'Subtree Invariance: The BST property must hold for all ancestors and descendants, not just immediate children. Every single node in the left subtree of X must be less than X.',
          'Duplicate Keys Policy: Standard mathematical BSTs disallow duplicates. In real implementations, duplicates are either: (1) rejected, (2) tracked with an internal frequency counter (node->count++), or (3) consistently placed in the right (or left) subtree. We enforce strict unique keys with counter fallback.',
          'Sorted Inorder Traversal: An inorder traversal (Left -> Root -> Right) of any valid BST visits keys in strictly ascending sorted order.'
        ],
        asciiDiagram: `          Valid BST Invariant:
                  [ 50 ]
                /        \\
           [ 30 ]        [ 70 ]        All Left Subtree < 50
           /    \\        /    \\       All Right Subtree > 50
        [ 20 ] [ 40 ]  [ 60 ] [ 80 ]`
      },
      {
        title: '2. BST Operations: Search, Minimum, and Maximum',
        description:
          'Search algorithms take advantage of the ordering property to prune half the remaining search space at each comparison.',
        points: [
          'Search: Compare target key with root. If target == root->key, found! If target < root->key, search left subtree. If target > root->key, search right subtree. If root == NULL, key is not present.',
          'Find Minimum: Start at root, repeatedly follow node->left pointers until reaching a node whose left child is NULL. That node contains the minimum key.',
          'Find Maximum: Start at root, repeatedly follow node->right pointers until reaching a node whose right child is NULL. That node contains the maximum key.',
          'Time Complexity: All three operations run in O(h) time, where h is the height of the tree.'
        ],
        asciiDiagram: `Searching for Key = 65 in BST:
Step 1: Compare 65 with Root 50 -> 65 > 50 -> Go Right
Step 2: Compare 65 with Node 70 -> 65 < 70 -> Go Left
Step 3: Compare 65 with Node 60 -> 65 > 60 -> Go Right
Step 4: Found target 65! Path length = 3 comparisons.`
      },
      {
        title: '3. BST Insertion: Path Walk & Leaf Attachment',
        description:
          'Inserting a new key into a BST always attaches the new node as a leaf, preserving the BST property throughout the tree.',
        points: [
          'Walk down the tree from the root, comparing the new key with current nodes.',
          'If new_key < current->data, traverse current->left; if new_key > current->data, traverse current->right.',
          'If new_key == current->data, handle duplicate (e.g. ignore or increment counter).',
          'When a NULL child pointer is encountered, attach the newly allocated node at that exact position.',
          'Visual Example: Inserting 65 into the example tree walks: 50 -> 70 -> 60 -> attaches as 60->right.'
        ]
      },
      {
        title: '4. BST Deletion: The Three Critical Cases',
        description:
          'Deletion is the most technically nuanced BST operation because the ordering invariant must be preserved after node removal.',
        points: [
          'Case 1 — Leaf Node (No Children): The node has left == NULL and right == NULL. Disconnect the node from its parent by setting the parent pointer to NULL, then call free() on the node.',
          'Case 2 — Single Child (One Child): The node has either left == NULL or right == NULL. Splice out the node by updating the parent pointer to point directly to the node\'s only child, then free() the node.',
          'Case 3 — Two Children: The node has both left != NULL and right != NULL. Cannot simply delete without severing subtrees. Procedure:',
          'Step 3a: Locate the node\'s Inorder Successor (the smallest node in its right subtree: findMin(node->right)) OR Inorder Predecessor (largest node in left subtree).',
          'Step 3b: Copy the successor\'s data into the current node.',
          'Step 3c: Recursively delete the successor node from the right subtree. Because the successor is the minimum in the right subtree, it is guaranteed to have at most ONE child (it cannot have a left child!), reducing the problem to Case 1 or Case 2.'
        ],
        asciiDiagram: `Case 3 Deletion (Delete 50 with Two Children):
       [ 50 ]*                     [ 60 ]  <-- Replaced with Inorder Successor
      /      \\                   /      \\
   [30]      [70]       ===>   [30]      [70]
            /    \\                      /    \\
         [60]^   [80]                 NULL   [80] <-- Successor node freed
         (Successor)`
      },
      {
        title: '5. Skewed BSTs & The Fallacy of Guaranteed O(log n)',
        description:
          'An ordinary BST provides NO balance guarantees. It is vital for engineering students to understand when and why a BST degrades.',
        points: [
          'Sorted Input Hazard: If keys are inserted in sequential order (10, 20, 30, 40, 50), each new key becomes the right child of the previous key.',
          'Degenerate Shape: The tree height becomes h = n - 1. Search, insertion, and deletion degrade from O(log n) to O(n) linear search.',
          'Average Case: With randomly permuted inputs, average tree height is ~ 2 * ln(n) ~ 1.39 * log2(n), yielding O(log n) operations.',
          'Solution: Self-balancing BSTs (AVL Trees, Red-Black Trees) perform tree rotations to strictly bound height to O(log n) in the worst case.'
        ]
      }
    ],
    operations: [
      {
        name: 'BST Search',
        timeComplexity: 'O(h) -> O(log n) avg, O(n) worst',
        spaceComplexity: 'O(h) recursion stack',
        description: 'Searches for a key by comparing against current node and branching left or right.',
        cSignature: 'struct Node* search(struct Node* root, int key);',
        steps: [
          'If root == NULL or root->data == key, return root.',
          'If key < root->data, return search(root->left, key).',
          'Otherwise, return search(root->right, key).'
        ],
        codeSnippet: `struct Node* search(struct Node* root, int key) {
    if (root == NULL || root->data == key)
        return root;
    if (key < root->data)
        return search(root->left, key);
    return search(root->right, key);
}`
      },
      {
        name: 'BST Insertion',
        timeComplexity: 'O(h) -> O(log n) avg, O(n) worst',
        spaceComplexity: 'O(h) recursion stack',
        description: 'Inserts a new value into the correct position in the BST and returns the updated root pointer.',
        cSignature: 'struct Node* insert(struct Node* node, int key);',
        steps: [
          'If tree is empty (node == NULL), return createNode(key).',
          'If key < node->data, node->left = insert(node->left, key).',
          'If key > node->data, node->right = insert(node->right, key).',
          'If key == node->data, duplicate ignored.',
          'Return unchanged node pointer.'
        ],
        codeSnippet: `struct Node* insert(struct Node* node, int key) {
    if (node == NULL) return createNode(key);
    if (key < node->data)
        node->left = insert(node->left, key);
    else if (key > node->data)
        node->right = insert(node->right, key);
    return node;
}`
      },
      {
        name: 'BST Deletion',
        timeComplexity: 'O(h) -> O(log n) avg, O(n) worst',
        spaceComplexity: 'O(h) recursion stack',
        description: 'Deletes a key from the BST handling all 3 cases (leaf, single child, two children with successor swap).',
        cSignature: 'struct Node* deleteNode(struct Node* root, int key);',
        steps: [
          'Search for the node: recurse left if key < root->data, recurse right if key > root->data.',
          'When found, handle Case 1 & 2: if left == NULL, save right child, free root, return right child.',
          'If right == NULL, save left child, free root, return left child.',
          'Handle Case 3: find inorder successor (min in right subtree), copy its data into root, then delete successor from root->right.'
        ],
        codeSnippet: `struct Node* findMin(struct Node* node) {
    struct Node* current = node;
    while (current && current->left != NULL)
        current = current->left;
    return current;
}

struct Node* deleteNode(struct Node* root, int key) {
    if (root == NULL) return root;
    if (key < root->data)
        root->left = deleteNode(root->left, key);
    else if (key > root->data)
        root->right = deleteNode(root->right, key);
    else {
        // Case 1 & 2: 0 or 1 child
        if (root->left == NULL) {
            struct Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct Node* temp = root->left;
            free(root);
            return temp;
        }
        // Case 3: 2 children
        struct Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}`
      }
    ],
    cCode: {
      title: 'Complete C99 Menu-Driven Binary Search Tree System',
      description:
        'A robust ISO C99 program implementing full BST functionality: node creation, insertion, searching, inorder sorted traversal, minimum key lookup, and comprehensive 3-case deletion with dynamic memory cleanup.',
      code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

// Prototypes
struct Node* createNode(int val);
struct Node* insert(struct Node* root, int val);
struct Node* search(struct Node* root, int val);
struct Node* findMin(struct Node* root);
struct Node* findMax(struct Node* root);
struct Node* deleteNode(struct Node* root, int val);
void inorder(struct Node* root);
void freeTree(struct Node* root);

int main(void) {
    printf("==============================================\\n");
    printf("    DSAForge: Binary Search Tree Engine       \\n");
    printf("==============================================\\n\\n");

    struct Node* root = NULL;
    int initialKeys[] = {50, 30, 70, 20, 40, 60, 80};
    int n = sizeof(initialKeys) / sizeof(initialKeys[0]);

    printf("Inserting initial keys: 50, 30, 70, 20, 40, 60, 80\\n");
    for (int i = 0; i < n; i++) {
        root = insert(root, initialKeys[i]);
    }

    printf("Inorder Traversal (Sorted): ");
    inorder(root);
    printf("\\n\\n");

    // Min and Max
    struct Node* minNode = findMin(root);
    struct Node* maxNode = findMax(root);
    if (minNode) printf("Minimum Key in BST: %d\\n", minNode->data);
    if (maxNode) printf("Maximum Key in BST: %d\\n\\n", maxNode->data);

    // Search Demonstration
    int searchTarget = 60;
    printf("Searching for %d... ", searchTarget);
    if (search(root, searchTarget)) {
        printf("FOUND in BST!\\n");
    } else {
        printf("NOT FOUND.\\n");
    }

    // Deletion Case 1: Leaf node (20)
    printf("\\nDeleting Leaf Node (20)...\\n");
    root = deleteNode(root, 20);
    printf("Inorder: "); inorder(root); printf("\\n");

    // Deletion Case 2: Node with 1 child (Insert 65, then delete 60)
    printf("\\nInserting 65, then deleting 60 (Single Child Case)...\\n");
    root = insert(root, 65);
    root = deleteNode(root, 60);
    printf("Inorder: "); inorder(root); printf("\\n");

    // Deletion Case 3: Node with 2 children (Delete Root 50)
    printf("\\nDeleting Root Node (50 - Two Children Case)...\\n");
    root = deleteNode(root, 50);
    printf("Inorder: "); inorder(root); printf("\\n");

    freeTree(root);
    printf("\\nBST Memory safely deallocated.\\n");
    return 0;
}

struct Node* createNode(int val) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    if (!n) { fprintf(stderr, "Allocation error\\n"); exit(EXIT_FAILURE); }
    n->data = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

struct Node* insert(struct Node* root, int val) {
    if (root == NULL) return createNode(val);
    if (val < root->data)
        root->left = insert(root->left, val);
    else if (val > root->data)
        root->right = insert(root->right, val);
    return root;
}

struct Node* search(struct Node* root, int val) {
    if (root == NULL || root->data == val) return root;
    if (val < root->data) return search(root->left, val);
    return search(root->right, val);
}

struct Node* findMin(struct Node* root) {
    struct Node* curr = root;
    while (curr && curr->left != NULL) curr = curr->left;
    return curr;
}

struct Node* findMax(struct Node* root) {
    struct Node* curr = root;
    while (curr && curr->right != NULL) curr = curr->right;
    return curr;
}

struct Node* deleteNode(struct Node* root, int val) {
    if (root == NULL) return NULL;
    if (val < root->data)
        root->left = deleteNode(root->left, val);
    else if (val > root->data)
        root->right = deleteNode(root->right, val);
    else {
        // Case 1 & 2
        if (root->left == NULL) {
            struct Node* temp = root->right;
            free(root);
            return temp;
        } else if (root->right == NULL) {
            struct Node* temp = root->left;
            free(root);
            return temp;
        }
        // Case 3
        struct Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}

void inorder(struct Node* root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

void freeTree(struct Node* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}`,
      sampleOutput: `==============================================
    DSAForge: Binary Search Tree Engine       
==============================================

Inserting initial keys: 50, 30, 70, 20, 40, 60, 80
Inorder Traversal (Sorted): 20 30 40 50 60 70 80 

Minimum Key in BST: 20
Maximum Key in BST: 80

Searching for 60... FOUND in BST!

Deleting Leaf Node (20)...
Inorder: 30 40 50 60 70 80 

Inserting 65, then deleting 60 (Single Child Case)...
Inorder: 30 40 50 65 70 80 

Deleting Root Node (50 - Two Children Case)...
Inorder: 30 40 65 70 80 

BST Memory safely deallocated.`
    },
    realWorld: [
      {
        title: 'Linux Kernel Completely Fair Scheduler (CFS)',
        system: 'Linux Process Scheduler (kernel/sched/fair.c)',
        description:
          'The Linux kernel CFS uses a self-balancing binary search tree (Red-Black Tree) to track runnable processes ordered by virtual runtime (vruntime).',
        architecture:
          'The leftmost node represents the process that has received the least CPU time. CFS selects this process in O(1) time (via cached pointer) and reinserts it in O(log N) time after execution.',
        advantages: [
          'Guarantees fair CPU time distribution across multi-core systems',
          'Logarithmic re-insertion prevents starvation under high process counts',
          'Supports dynamic process prioritization and nice values seamlessly'
        ]
      },
      {
        title: 'Database In-Memory Indexing & Ordered Range Scans',
        system: 'SQLite / MySQL Memory Storage Engine',
        description:
          'When executing range queries (e.g. SELECT * FROM users WHERE age BETWEEN 25 AND 35), BST structures locate the start key in O(log N) and scan in-order sequentially.',
        architecture:
          'Tree nodes store composite key indices and table row offsets. In-memory trees avoid linear table scans.',
        advantages: [
          'Enables O(log N + K) range lookups where K is the number of matched rows',
          'Eliminates the need for post-query sorting (ORDER BY is satisfied by inorder traversal)',
          'Supports dynamic insertions without full table re-indexing'
        ]
      },
      {
        title: 'Git Revision Tree & Commit History DAG Traversal',
        system: 'Git Distributed Version Control System',
        description:
          'Git repositories utilize tree structures to represent folder hierarchies for every commit snapshot, mapping blob hashes to filenames.',
        architecture:
          'Tree objects reference other tree objects (subdirectories) and blob objects (files), verified through cryptographic SHA hashes.',
        advantages: [
          'De-duplicates unchanged files across branches using identical sub-tree hashes',
          'Enables instant branch switching by replacing directory trees',
          'Facilitates rapid three-way merge difference algorithms'
        ]
      }
    ],
    complexityTable: [
      {
        operation: 'Search',
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Best case at root. Average O(log n) for balanced tree. Degenerates to O(n) for skewed tree.'
      },
      {
        operation: 'Insertion',
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Traverses root-to-leaf path. Always inserts as a new leaf node.'
      },
      {
        operation: 'Deletion',
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Includes search + pointer splicing. Two-child case swaps with successor.'
      },
      {
        operation: 'Find Min / Max',
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(n)',
        space: 'O(1)',
        notes: 'Iterates strictly along the left-most (min) or right-most (max) branch.'
      },
      {
        operation: 'Inorder Traversal',
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Visits every node exactly once, producing strictly sorted output.'
      }
    ],
    practice: [
      {
        id: 'q-702-1',
        question:
          'What is the result of performing an Inorder Traversal on a valid Binary Search Tree with unique keys?',
        options: [
          'Keys in reverse sorted order',
          'Keys in strictly ascending sorted order',
          'Keys grouped by tree depth',
          'Randomly shuffled keys'
        ],
        correctAnswer: 1,
        explanation:
          'By the BST invariant, left < root < right. An inorder traversal visits Left subtree, then Root, then Right subtree recursively, which mathematically guarantees ascending sorted order.'
      },
      {
        id: 'q-702-2',
        question:
          'When deleting a node with two children in a BST, which node can safely replace it while preserving the BST property?',
        options: [
          'Any random leaf node',
          'Its Inorder Successor (min of right subtree) or Inorder Predecessor (max of left subtree)',
          'Its immediate right child directly without checking its left child',
          'The root of the tree'
        ],
        correctAnswer: 1,
        explanation:
          'The Inorder Successor is greater than all nodes in the left subtree and smaller than all remaining nodes in the right subtree. Replacing the deleted node with the successor (or predecessor) guarantees the BST invariant is preserved.'
      },
      {
        id: 'q-702-3',
        question:
          'If keys [10, 20, 30, 40, 50] are inserted in order into an initially empty ordinary BST, what is the resulting time complexity to search for key 50?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 2,
        explanation:
          'Inserting keys in sorted order causes every new key to become the right child of the previous node. The tree degenerates into a right-skewed linked list of height n - 1, resulting in O(n) search time.'
      },
      {
        id: 'q-702-4',
        question:
          'Why does the Inorder Successor of a node with two children never have a left child?',
        options: [
          'Because the root always has a left child',
          'Because if it had a left child, that left child would be smaller, so it would not be the minimum of the right subtree',
          'Because the right subtree cannot contain leaves',
          'Because successors are always leaf nodes'
        ],
        correctAnswer: 1,
        explanation:
          'The inorder successor is defined as the minimum key in the right subtree. If it possessed a left child, that left child would contain a smaller key, contradicting the definition of minimum.'
      }
    ]
  },
  'top-703': {
    id: 'top-703',
    title: 'Tree Traversals & Applications',
    chapterId: 'chap-7',
    complexity: 'Medium',
    overview:
      'Tree traversal is the algorithmic process of visiting every node in a tree data structure exactly once in a systematic order. Because trees are non-linear, traversals are classified into Depth-First Search (DFS: Preorder, Inorder, Postorder) using recursive or explicit call stacks, and Breadth-First Search (BFS: Level-Order) using FIFO queues. Understanding traversal mechanics is critical for expression evaluation, tree serialization, DOM rendering, and compiler abstract syntax trees (ASTs).',
    conceptSections: [
      {
        title: '1. Why Non-Linear Trees Require Specialized Traversals',
        description:
          'Linear data structures (arrays, linked lists) have a single natural sequential traversal order. Trees branch into subtrees, necessitating distinct traversal strategies depending on the application.',
        points: [
          'Depth-First Search (DFS): Explores as deep as possible along each branch before backtracking. Supported naturally via recursion or an explicit Stack.',
          'Breadth-First Search (BFS): Visits all nodes at depth d before moving to nodes at depth d + 1. Supported via an auxiliary FIFO Queue.',
          'Linear Time Complexity: All standard tree traversals run in O(n) time because every node is visited exactly once.'
        ]
      },
      {
        title: '2. Preorder Traversal (Root -> Left -> Right)',
        description:
          'In Preorder traversal, the root node is processed FIRST before recursively traversing the left and right subtrees.',
        points: [
          'Sequence: Visit Root -> Traverse Left Subtree -> Traverse Right Subtree.',
          'Example Tree: Root A, Left child B (with children D, E), Right child C. Preorder sequence: A -> B -> D -> E -> C.',
          'Primary Applications: Creating a clone/copy of a tree, serializing a tree to disk/network, generating prefix expressions (Polish Notation).'
        ],
        asciiDiagram: `Preorder Traversal Trace (Root -> Left -> Right):
          [ A ] (1)
         /     \\
       [ B ](2) [ C ] (5)     Output: A -> B -> D -> E -> C
      /     \\
    [ D ](3)[ E ] (4)`
      },
      {
        title: '3. Inorder Traversal (Left -> Root -> Right)',
        description:
          'In Inorder traversal, the left subtree is traversed completely, then the root is visited, followed by the right subtree.',
        points: [
          'Sequence: Traverse Left Subtree -> Visit Root -> Traverse Right Subtree.',
          'Trace on Example Tree: Leftmost leaf D visited first -> Parent B -> Sibling E -> Root A -> Right branch C. Output: D -> B -> E -> A -> C.',
          'Core BST Relationship: For any valid Binary Search Tree, inorder traversal produces keys in strictly ascending sorted order.',
          'Expression Trees: Inorder traversal of an expression tree reconstructs the original infix mathematical formula (e.g. (3 + 4) * 5).'
        ]
      },
      {
        title: '4. Postorder Traversal (Left -> Right -> Root)',
        description:
          'In Postorder traversal, both left and right subtrees are fully traversed before the parent root node is processed.',
        points: [
          'Sequence: Traverse Left Subtree -> Traverse Right Subtree -> Visit Root.',
          'Trace on Example Tree: D -> E -> B -> C -> A.',
          'Critical Application — Safe Memory Deallocation: When freeing a dynamically allocated tree, children MUST be freed before their parent. Freeing the parent first creates dangling pointer bugs.',
          'Directory Disk Usage: Calculating the disk size of a directory (e.g. \`du\` command in Unix) requires calculating sizes of all subdirectories/files before summing them into the parent directory.',
          'Postfix Expression Generation: Produces Reverse Polish Notation (RPN), used by stack-based virtual machines (JVM, PostScript).'
        ]
      },
      {
        title: '5. Level-Order Traversal (Breadth-First Search)',
        description:
          'Level-Order traversal visits all nodes horizontally level by level from top to bottom and left to right.',
        points: [
          'Mechanism: Utilizes an auxiliary FIFO queue.',
          'Algorithm: (1) Enqueue root. (2) While queue is not empty: dequeue current node, process its data, and enqueue its left child (if exists), then right child (if exists).',
          'Output on Example Tree: Level 1: A | Level 2: B, C | Level 3: D, E. Combined output: A -> B -> C -> D -> E.',
          'Space Complexity: Auxiliary queue holds at most the maximum width of the tree, which can be up to ceil(n / 2) nodes for a complete binary tree.'
        ],
        asciiDiagram: `Level-Order Traversal Queue Simulation:
Step 1: Queue: [A]          -> Dequeue A -> Output: A -> Enqueue B, C
Step 2: Queue: [B, C]       -> Dequeue B -> Output: B -> Enqueue D, E
Step 3: Queue: [C, D, E]    -> Dequeue C -> Output: C -> No children
Step 4: Queue: [D, E]       -> Dequeue D -> Output: D -> No children
Step 5: Queue: [E]          -> Dequeue E -> Output: E -> Empty!
Final Level-Order: A B C D E`
      },
      {
        title: '6. Recursive vs Iterative Traversals: Architectural Trade-Offs',
        description:
          'Understanding recursion stack consumption versus manual stack/queue management.',
        points: [
          'Recursive DFS: Relies on the OS call stack. Elegant to write, but if the tree is heavily skewed (h = n), it risks Call Stack Overflow on deep trees.',
          'Iterative DFS: Uses an explicit heap-allocated stack data structure. Prevents thread stack overflow and allows pausing/resuming traversal state (generators/iterators).',
          'Level-Order BFS: Cannot be implemented with simple recursion; strictly requires a FIFO queue structure.'
        ]
      }
    ],
    operations: [
      {
        name: 'Recursive Preorder Traversal',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) recursion stack',
        description: 'Visits root, traverses left subtree, traverses right subtree.',
        cSignature: 'void preorder(struct Node* root);',
        steps: [
          'Base case: if root == NULL, return.',
          'Print / process root->data.',
          'Recursively call preorder(root->left).',
          'Recursively call preorder(root->right).'
        ],
        codeSnippet: `void preorder(struct Node* root) {
    if (root == NULL) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}`
      },
      {
        name: 'Recursive Inorder Traversal',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) recursion stack',
        description: 'Traverses left subtree, visits root, traverses right subtree.',
        cSignature: 'void inorder(struct Node* root);',
        steps: [
          'Base case: if root == NULL, return.',
          'Recursively call inorder(root->left).',
          'Print / process root->data.',
          'Recursively call inorder(root->right).'
        ],
        codeSnippet: `void inorder(struct Node* root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}`
      },
      {
        name: 'Recursive Postorder Traversal',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) recursion stack',
        description: 'Traverses left subtree, traverses right subtree, visits root.',
        cSignature: 'void postorder(struct Node* root);',
        steps: [
          'Base case: if root == NULL, return.',
          'Recursively call postorder(root->left).',
          'Recursively call postorder(root->right).',
          'Print / process root->data.'
        ],
        codeSnippet: `void postorder(struct Node* root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}`
      },
      {
        name: 'Level-Order Traversal (BFS with Queue)',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(w) queue capacity (w <= n/2)',
        description: 'Iterates horizontally level by level using an array-based FIFO queue.',
        cSignature: 'void levelOrder(struct Node* root);',
        steps: [
          'If root == NULL, return.',
          'Initialize FIFO queue and enqueue root.',
          'While queue is not empty: dequeue current node, print its data.',
          'If current->left != NULL, enqueue current->left.',
          'If current->right != NULL, enqueue current->right.'
        ],
        codeSnippet: `void levelOrder(struct Node* root) {
    if (root == NULL) return;
    struct Node* queue[100];
    int front = 0, rear = 0;
    queue[rear++] = root;

    while (front < rear) {
        struct Node* current = queue[front++];
        printf("%d ", current->data);
        if (current->left != NULL)
            queue[rear++] = current->left;
        if (current->right != NULL)
            queue[rear++] = current->right;
    }
}`
      }
    ],
    cCode: {
      title: 'Complete C99 Traversal Suite: Preorder, Inorder, Postorder & Level-Order',
      description:
        'A comprehensive ISO C99 program implementing binary tree construction and executing all four fundamental traversal strategies with step-by-step console outputs.',
      code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *left;
    struct Node *right;
};

// Prototypes
struct Node* createNode(int val);
void preorder(struct Node* root);
void inorder(struct Node* root);
void postorder(struct Node* root);
void levelOrder(struct Node* root);
void freeTree(struct Node* root);

int main(void) {
    printf("==============================================\\n");
    printf("  DSAForge: Comprehensive Tree Traversals Suite\\n");
    printf("==============================================\\n\\n");

    /* Tree Architecture:
                1
              /   \\
             2     3
            / \\
           4   5
    */
    struct Node* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);

    printf("Tree Structure:\\n");
    printf("        [1]\\n");
    printf("       /   \\\\\\n");
    printf("     [2]   [3]\\n");
    printf("     / \\\\\\n");
    printf("   [4] [5]\\n\\n");

    printf("1. Preorder Traversal   (Root-Left-Right) : ");
    preorder(root);
    printf("\\n");

    printf("2. Inorder Traversal    (Left-Root-Right) : ");
    inorder(root);
    printf("\\n");

    printf("3. Postorder Traversal  (Left-Right-Root) : ");
    postorder(root);
    printf("\\n");

    printf("4. Level-Order Traversal (Breadth-First)  : ");
    levelOrder(root);
    printf("\\n\\n");

    freeTree(root);
    printf("Memory cleanly deallocated via Postorder.\\n");
    return 0;
}

struct Node* createNode(int val) {
    struct Node* n = (struct Node*)malloc(sizeof(struct Node));
    if (!n) { fprintf(stderr, "Allocation failed\\n"); exit(EXIT_FAILURE); }
    n->data = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

void preorder(struct Node* root) {
    if (root == NULL) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void inorder(struct Node* root) {
    if (root == NULL) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

void postorder(struct Node* root) {
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

void levelOrder(struct Node* root) {
    if (root == NULL) return;
    struct Node* queue[64];
    int front = 0, rear = 0;

    queue[rear++] = root;
    while (front < rear) {
        struct Node* curr = queue[front++];
        printf("%d ", curr->data);
        if (curr->left != NULL) queue[rear++] = curr->left;
        if (curr->right != NULL) queue[rear++] = curr->right;
    }
}

void freeTree(struct Node* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}`,
      sampleOutput: `==============================================
  DSAForge: Comprehensive Tree Traversals Suite
==============================================

Tree Structure:
        [1]
       /   \\
     [2]   [3]
     / \\
   [4] [5]

1. Preorder Traversal   (Root-Left-Right) : 1 2 4 5 3 
2. Inorder Traversal    (Left-Root-Right) : 4 2 5 1 3 
3. Postorder Traversal  (Left-Right-Root) : 4 5 2 3 1 
4. Level-Order Traversal (Breadth-First)  : 1 2 3 4 5 

Memory cleanly deallocated via Postorder.`
    },
    realWorld: [
      {
        title: 'Compiler Abstract Syntax Tree (AST) Code Generation',
        system: 'GCC / LLVM / Clang Code Generation Backend',
        description:
          'Compilers parse high-level source code into an AST. Postorder traversal evaluates sub-expressions before emitting machine code for parent operations.',
        architecture:
          'For an expression like a = b + c * d, postorder evaluates c * d first, then adds b, and finally assigns to a, mapping directly to assembly instructions.',
        advantages: [
          'Ensures operator precedence is naturally respected without parentheses',
          'Facilitates common sub-expression elimination (CSE) during traversal',
          'Enables easy translation into intermediate bytecode'
        ]
      },
      {
        title: 'Unix File System Disk Usage Analyzer (du Utility)',
        system: 'GNU Coreutils du / POSIX statfs',
        description:
          'The \`du\` command calculates the total byte size consumed by directories. A directory cannot compute its total size until all its subdirectories and files are evaluated.',
        architecture:
          'Utilizes postorder directory tree walking. It recurses into child directories, sums their physical block allocations, and rolls the total up to the parent directory node.',
        advantages: [
          'Prevents premature aggregation of folder sizes',
          'Handles arbitrary filesystem depths efficiently',
          'Correctly manages hard-linked inodes via visited hash tables'
        ]
      },
      {
        title: 'Game Engine Scene Graphs & Hierarchical Transformations',
        system: 'Unreal Engine 5 / Unity Scene Hierarchy',
        description:
          '3D game engines organize cameras, characters, weapons, and vehicles in a scene graph tree. Preorder traversal applies world transformation matrices from root to leaf.',
        architecture:
          'A weapon attached to a character\'s hand inherits the character\'s body position. Preorder traversal ensures parent model matrices are computed before child object vertices are rendered.',
        advantages: [
          'Enables seamless compound object transformations (vehicles with moving wheels)',
          'Allows frustum culling: if a parent node bounding box is off-screen, its entire subtree is skipped',
          'Simplifies skeletal animation joint hierarchical updates'
        ]
      }
    ],
    complexityTable: [
      {
        operation: 'Preorder Traversal',
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Visits every node once. Stack space bounded by height h (log n for balanced, n for skewed).'
      },
      {
        operation: 'Inorder Traversal',
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Yields sorted key sequence in BSTs. Stack space bounded by tree height h.'
      },
      {
        operation: 'Postorder Traversal',
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(h)',
        notes: 'Processes children before parent. Essential for safe tree memory deallocation.'
      },
      {
        operation: 'Level-Order Traversal (BFS)',
        best: 'O(n)',
        average: 'O(n)',
        worst: 'O(n)',
        space: 'O(w)',
        notes: 'Uses FIFO queue. Space complexity bounded by maximum level width w <= ceil(n/2).'
      }
    ],
    practice: [
      {
        id: 'q-703-1',
        question:
          'Which tree traversal strategy must be used when recursively freeing all dynamically allocated nodes in a binary tree to avoid dangling pointers?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level-Order'],
        correctAnswer: 2,
        explanation:
          'Postorder traversal (Left -> Right -> Root) processes both children before processing the parent. If preorder were used, freeing the parent first would make accessing the left and right children illegal memory accesses (use-after-free).'
      },
      {
        id: 'q-703-2',
        question:
          'Given a binary tree where Root is A, Left child is B, and Right child is C. What is the Postorder traversal sequence?',
        options: ['A B C', 'B A C', 'B C A', 'C B A'],
        correctAnswer: 2,
        explanation:
          'Postorder traversal visits Left subtree, then Right subtree, then Root. Thus, B (left), then C (right), then A (root): B C A.'
      },
      {
        id: 'q-703-3',
        question:
          'What is the supporting auxiliary data structure required to implement iterative Level-Order Traversal?',
        options: ['LIFO Stack', 'FIFO Queue', 'Priority Queue', 'Disjoint Set'],
        correctAnswer: 1,
        explanation:
          'Level-Order Traversal is Breadth-First Search (BFS). BFS requires a First-In, First-Out (FIFO) queue to ensure nodes at the current level are processed before nodes at subsequent levels.'
      },
      {
        id: 'q-703-4',
        question:
          'For a complete binary tree with n nodes, what is the maximum auxiliary space consumed by the queue during Level-Order Traversal?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 2,
        explanation:
          'In a complete or perfect binary tree, the last level contains up to ceil(n / 2) nodes. Therefore, the queue will hold up to n/2 elements simultaneously, resulting in O(n) auxiliary space complexity.'
      }
    ]
  }
};
