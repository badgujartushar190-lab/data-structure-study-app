export interface SearchStep {
  array: number[];
  target: number;
  currentIndex: number | null;
  leftIndex: number | null;
  rightIndex: number | null;
  foundIndex: number | null;
  description: string;
}

export function generateLinearSearchSteps(array: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  let found = false;

  steps.push({
    array,
    target,
    currentIndex: null,
    leftIndex: null,
    rightIndex: null,
    foundIndex: null,
    description: `Linear Search initialized for target = ${target}.`
  });

  for (let i = 0; i < array.length; i++) {
    steps.push({
      array,
      target,
      currentIndex: i,
      leftIndex: null,
      rightIndex: null,
      foundIndex: null,
      description: `Checking index [${i}]: Value is ${array[i]}.`
    });

    if (array[i] === target) {
      steps.push({
        array,
        target,
        currentIndex: i,
        leftIndex: null,
        rightIndex: null,
        foundIndex: i,
        description: `SUCCESS! Target ${target} found at index [${i}].`
      });
      found = true;
      break;
    }
  }

  if (!found) {
    steps.push({
      array,
      target,
      currentIndex: null,
      leftIndex: null,
      rightIndex: null,
      foundIndex: null,
      description: `Target ${target} not found in array.`
    });
  }

  return steps;
}

export function generateBinarySearchSteps(sortedArray: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  let left = 0;
  let right = sortedArray.length - 1;
  let found = false;

  steps.push({
    array: sortedArray,
    target,
    currentIndex: null,
    leftIndex: left,
    rightIndex: right,
    foundIndex: null,
    description: `Binary Search initialized. Search space: index [${left}..${right}].`
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: sortedArray,
      target,
      currentIndex: mid,
      leftIndex: left,
      rightIndex: right,
      foundIndex: null,
      description: `Checking mid index [${mid}] (Value = ${sortedArray[mid]}).`
    });

    if (sortedArray[mid] === target) {
      steps.push({
        array: sortedArray,
        target,
        currentIndex: mid,
        leftIndex: left,
        rightIndex: right,
        foundIndex: mid,
        description: `SUCCESS! Target ${target} found at mid index [${mid}].`
      });
      found = true;
      break;
    } else if (sortedArray[mid] < target) {
      left = mid + 1;
      steps.push({
        array: sortedArray,
        target,
        currentIndex: mid,
        leftIndex: left,
        rightIndex: right,
        foundIndex: null,
        description: `Value ${sortedArray[mid]} < target ${target}. Narrowing search to right half [${left}..${right}].`
      });
    } else {
      right = mid - 1;
      steps.push({
        array: sortedArray,
        target,
        currentIndex: mid,
        leftIndex: left,
        rightIndex: right,
        foundIndex: null,
        description: `Value ${sortedArray[mid]} > target ${target}. Narrowing search to left half [${left}..${right}].`
      });
    }
  }

  if (!found) {
    steps.push({
      array: sortedArray,
      target,
      currentIndex: null,
      leftIndex: left,
      rightIndex: right,
      foundIndex: null,
      description: `Target ${target} not present in sorted array.`
    });
  }

  return steps;
}
