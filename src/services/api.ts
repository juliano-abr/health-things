import usersData from './data/users.json';
import questionsData from './data/questions.json';
import { delay } from '../utils/helpers';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export const api = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(800);
    
    const user = usersData.users.find(
      u => u.email === email && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  },

  getQuestions: async (): Promise<Question[]> => {
    await delay(1000);
    return questionsData.questions;
  }
}; 