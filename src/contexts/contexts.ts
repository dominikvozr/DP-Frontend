import { createContext } from '@builder.io/qwik';

export const UserDataContext = createContext<UserState>('user-data');
interface UserState {
  user: any;
}

export const ExamDataContext = createContext<ExamState>('exam-data');
interface ExamState {
  exam: any;
}

export const TestDataContext = createContext<TestState>('test-data');
interface TestState {
  test: any;
}
