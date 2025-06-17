import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';
import type { Question } from '../services/api';

interface QuestionsState {
  questions: Question[];
  answers: Record<number, string>;
  currentQuestionIndex: number;
  isLoading: boolean;
  error: string | null;
  fetchQuestions: () => Promise<void>;
  setAnswer: (questionId: number, answer: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  resetQuestionsAnswers: () => void;
}

export const useQuestionsStore = create<QuestionsState>()(
  persist(
    (set) => ({
      questions: [],
      answers: {},
      currentQuestionIndex: 0,
      isLoading: false,
      error: null,

      fetchQuestions: async () => {
        try {
          set({ isLoading: true, error: null });
          const questions = await api.getQuestions();
          set({ questions, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch questions', 
            isLoading: false 
          });
          throw error;
        }
      },
      
      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: answer,
          },
        })),
        
      setCurrentQuestionIndex: (index) =>
        set(() => ({
          currentQuestionIndex: index,
        })),
        
      resetQuestionsAnswers: () =>
        set(() => ({
          answers: {},
          currentQuestionIndex: 0,
          questions: [],
          error: null
        })),
    }),
    {
      name: 'questions-storage',
      partialize: (state) => ({
        questions: state.questions,
        answers: state.answers,
      }),
    }
  )
); 