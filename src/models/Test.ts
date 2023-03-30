import { Exam } from './Exam';

export class Test {
  _id: string;
  userId: string;
  examId: string;
  testRepo: string;
  slug: string;
  startedAt: Date;
  endedAt: Date;
  exam: Exam;
  projectRepo: any;
  score: {
    points: number;
    message: string;
    percentage: number;
    mark: string;
    time: Date;
  };
  isOpen: boolean;

  constructor(testData: TestInterface) {
    this._id = testData._id;
    this.userId = testData.userId;
    this.examId = testData.examId;
    this.testRepo = testData.testRepo;
    this.slug = testData.slug;
    this.startedAt = new Date(testData.startedAt);
    this.endedAt = new Date(testData.endedAt);
    this.exam = testData.exam;
    this.projectRepo = testData.projectRepo;
    this.score = testData.score;
    this.isOpen = testData.isOpen === 'true' ? true : false;
  }
}

export interface TestInterface {
  _id: string;
  userId: string;
  examId: string;
  testRepo: string;
  slug: string;
  startedAt: string;
  endedAt: string;
  projectRepo: any;
  score: Score;
  isOpen: string;
  exam: Exam;
}

interface Score {
  points: number;
  message: string;
  percentage: number;
  mark: string;
  time: Date;
}
