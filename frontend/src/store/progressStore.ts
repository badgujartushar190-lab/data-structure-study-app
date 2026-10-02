import { create } from 'zustand';

export interface VisualizerState {
  stack: number[];
  capacity: number;
  topIndex: number;
  message: string;
  messageType: 'info' | 'error' | 'success';
}

interface ProgressState {
  completedTopicIds: string[];
  quizScores: Record<string, number>;
  activeTab: string;
  visualizerState: VisualizerState;
  
  // Actions
  markTopicCompleted: (topicId: string) => void;
  setQuizScore: (topicId: string, score: number) => void;
  setActiveTab: (tab: string) => void;
  pushStack: (val: number) => void;
  popStack: () => void;
  peekStack: () => void;
  resetStack: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  completedTopicIds: ['top-1'],
  quizScores: {},
  activeTab: 'concept',
  visualizerState: {
    stack: [10, 25, 42],
    capacity: 8,
    topIndex: 2,
    message: 'Initial stack state loaded with 3 elements.',
    messageType: 'info'
  },

  markTopicCompleted: (topicId: string) => {
    set((state) => ({
      completedTopicIds: state.completedTopicIds.includes(topicId)
        ? state.completedTopicIds
        : [...state.completedTopicIds, topicId]
    }));
  },

  setQuizScore: (topicId: string, score: number) => {
    set((state) => ({
      quizScores: { ...state.quizScores, [topicId]: score }
    }));
  },

  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },

  pushStack: (val: number) => {
    const { stack, capacity } = get().visualizerState;
    if (stack.length >= capacity) {
      set({
        visualizerState: {
          ...get().visualizerState,
          message: 'CRITICAL: Stack Overflow! Max capacity (8 elements) reached. Cannot push further.',
          messageType: 'error'
        }
      });
      return;
    }
    const newStack = [...stack, val];
    set({
      visualizerState: {
        stack: newStack,
        capacity,
        topIndex: newStack.length - 1,
        message: `PUSH Successful: Pushed value ${val} onto top of stack at index [${newStack.length - 1}].`,
        messageType: 'success'
      }
    });
  },

  popStack: () => {
    const { stack, capacity } = get().visualizerState;
    if (stack.length === 0) {
      set({
        visualizerState: {
          ...get().visualizerState,
          message: 'CRITICAL: Stack Underflow! Stack is completely empty. Cannot pop element.',
          messageType: 'error'
        }
      });
      return;
    }
    const poppedVal = stack[stack.length - 1];
    const newStack = stack.slice(0, -1);
    set({
      visualizerState: {
        stack: newStack,
        capacity,
        topIndex: newStack.length - 1,
        message: `POP Successful: Removed element ${poppedVal} from top of stack.`,
        messageType: 'success'
      }
    });
  },

  peekStack: () => {
    const { stack } = get().visualizerState;
    if (stack.length === 0) {
      set({
        visualizerState: {
          ...get().visualizerState,
          message: 'PEEK Error: Stack is empty. Top pointer points to NULL (-1).',
          messageType: 'error'
        }
      });
      return;
    }
    const topVal = stack[stack.length - 1];
    set({
      visualizerState: {
        ...get().visualizerState,
        message: `PEEK Inspection: Value at TOP index [${stack.length - 1}] is ${topVal}. Stack unmutated.`,
        messageType: 'info'
      }
    });
  },

  resetStack: () => {
    set({
      visualizerState: {
        stack: [10, 25, 42],
        capacity: 8,
        topIndex: 2,
        message: 'Stack reset to default initial state [10, 25, 42].',
        messageType: 'info'
      }
    });
  }
}));
