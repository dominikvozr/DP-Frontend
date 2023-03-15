import { createContext } from "@builder.io/qwik";
import { Exam } from "~/models/Exam";
import { Test } from "~/models/Test";
import { User } from "~/models/User";

export const UserDataContext = createContext<UserState>('user-data');
interface UserState {
  user: User
}

export const ExamDataContext = createContext<ExamState>('exam-data');
interface ExamState {
  exam: Exam
}

export const TestDataContext = createContext<TestState>('test-data');
interface TestState {
  test: Test
}