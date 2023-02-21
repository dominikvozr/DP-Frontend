export class Exam {
	_id: string;
	name: string;
  userId: string;
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
  tests: [{
    id: number,
    name: string,
    points: number,
  }];
  isOpen: boolean;

	constructor(
    _id: string,
    name: string,
    userId: string,
    pipelineId: string,
    templateId: string,
    subject: string,
    description: string,
    projectRepo: string,
    testRepo: string,
    slug: string,
    startDate: Date,
    endDate: Date,
    createdAt: Date,
    points: number,
    tests: [{
      id: number,
      name: string,
      points: number,
    }],
    isOpen: boolean,
    ) {
      this._id = _id
      this.name = name
      this.userId = userId
      this.pipelineId = pipelineId
      this.templateId = templateId
      this.subject = subject
      this.description = description
      this.projectRepo = projectRepo
      this.testRepo = testRepo
      this.slug = slug
      this.startDate = startDate
      this.endDate = endDate
      this.createdAt = createdAt
      this.points = points
      this.tests = tests
      this.isOpen = isOpen
	}
}