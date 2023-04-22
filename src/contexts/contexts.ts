import { createContextId } from '@builder.io/qwik';

export const UserDataContext = createContextId<UserState>('user-data');
interface UserState {
  user: any;
}

export const ExamDataContext = createContextId<ExamState>('exam-data');
interface ExamState {
  exam: any;
}

export const TestDataContext = createContextId<TestState>('test-data');
interface TestState {
  test: any;
}

export const WorkspaceContext = createContextId<WorkspaceState>('workspace-data');
interface WorkspaceState {
  email: any,
  password: any,
  workspaceLink: any,
  workspaceId: any,
  cookie: string,
  userKey: any
}