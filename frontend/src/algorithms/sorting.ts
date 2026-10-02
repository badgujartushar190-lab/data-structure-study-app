export interface SortStep {
  array: number[];
  comparingIndices: number[];
  swappingIndices: number[];
  sortedIndices: number[];
  description: string;
}

export function generateBubbleSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  const sorted: number[] = [];

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [],
    description: 'Initial unsorted array loaded.'
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        sortedIndices: [...sorted],
        description: `Comparing elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]}).`
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [j, j + 1],
          sortedIndices: [...sorted],
          description: `Swapped elements: ${arr[j + 1]} > ${arr[j]}.`
        });
      }
    }
    sorted.push(n - 1 - i);
  }
  sorted.push(0);

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    description: 'Bubble Sort Complete! Array fully sorted.'
  });

  return steps;
}

export function generateInsertionSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  const sorted: number[] = [0];

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: [0],
    description: 'Insertion Sort initialized. Element at index 0 considered sorted.'
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparingIndices: [i],
      swappingIndices: [],
      sortedIndices: [...sorted],
      description: `Selected key element ${key} at index ${i}.`
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        sortedIndices: [...sorted],
        description: `Comparing key ${key} with element at index ${j} (${arr[j]}). Shifting right.`
      });

      arr[j + 1] = arr[j];

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [j, j + 1],
        sortedIndices: [...sorted],
        description: `Shifted element ${arr[j]} from index ${j} to index ${j + 1}.`
      });

      j--;
    }

    arr[j + 1] = key;
    if (!sorted.includes(i)) sorted.push(i);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      sortedIndices: [...sorted],
      description: `Inserted key ${key} into position ${j + 1}.`
    });
  }

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    sortedIndices: Array.from({ length: n }, (_, i) => i),
    description: 'Insertion Sort Complete! Array fully sorted.'
  });

  return steps;
}
