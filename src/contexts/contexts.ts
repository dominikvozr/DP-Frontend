import { createContextId } from '@builder.io/qwik';
import { Exam } from '~/models/Exam';

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

<<<<<<< HEAD
export const WorkspaceContext = createContextId<WorkspaceState>('workspace-data');
interface WorkspaceState {
  email: any,
  password: any,
  workspaceLink: any,
  workspaceId: any,
  cookie: string,
  userKey: any,
  endDate: any
}
=======
export const ExamModalDataContext = createContextId<ExamModalState>('exam-modal-data');
interface ExamModalState {
  open: boolean;
  exam: Exam;
}
>>>>>>> dev
