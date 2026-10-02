export interface TreeNode {
  val: number;
  left?: TreeNode;
  right?: TreeNode;
  id: string;
}

export interface TreeStep {
  currentNodeId: string | null;
  traversalResult: number[];
  description: string;
}

export function generateInorderTraversalSteps(root: TreeNode | null): TreeStep[] {
  const steps: TreeStep[] = [];
  const result: number[] = [];

  function helper(node: TreeNode | null) {
    if (!node) return;

    steps.push({
      currentNodeId: node.id,
      traversalResult: [...result],
      description: `Visiting left subtree of Node (${node.val}).`
    });

    helper(node.left || null);

    result.push(node.val);
    steps.push({
      currentNodeId: node.id,
      traversalResult: [...result],
      description: `Processed Node (${node.val}). Appended to result list.`
    });

    helper(node.right || null);
  }

  helper(root);
  steps.push({
    currentNodeId: null,
    traversalResult: [...result],
    description: `Inorder Traversal Complete: [${result.join(', ')}].`
  });

  return steps;
}
