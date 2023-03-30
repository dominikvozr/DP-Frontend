import { User } from './User';

export class Exam {
  _id: string;
  name: string;
  user: User;
  pipelineId: string;
  templateId: string;
  subject: string;
  description: string;
  projectRepo: string;
  testRepo: string;
  slug: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  points: number;
  tests: TestInterface[];
  isOpen: boolean;

  constructor(examData: ExamInterface) {
    const tests: TestInterface[] = [];

    for (const test of examData.tests) {
      tests.push({
        id: Number(test.id),
        name: test.name,
        points: Number(test.points),
      });
    }

    this._id = examData._id;
    this.name = examData.name;
    this.user = examData.user;
    this.pipelineId = examData.pipelineId;
    this.templateId = examData.templateId;
    this.subject = examData.subject;
    this.description = examData.description;
    this.projectRepo = examData.projectRepo;
    this.testRepo = examData.testRepo;
    this.slug = examData.slug;
    this.startDate = new Date(examData.startDate);
    this.endDate = new Date(examData.endDate);
    this.createdAt = new Date(examData.createdAt);
    this.points = parseInt(examData.points);
    this.tests = tests;
    this.isOpen = examData.isOpen === 'true' ? true : false;
  }

  public get getStartDate(): string {
    return this.startDate.toLocaleDateString('sk-SK');
  }
}

interface TestInterface {
  id: number;
  name: string;
  points: number;
}

export interface ExamInterface {
  _id: string;
  name: string;
  user: User;
  pipelineId: string;
  templateId: string;
  subject: string;
  description: string;
  projectRepo: string;
  testRepo: string;
  slug: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  points: string;
  tests: TestInterface[];
  isOpen: string;
}
