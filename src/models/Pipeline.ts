export class Pipeline {
	_id: string;
	name: string;
  userId: string;
  description: string;
  file: object;
  slug: string;
  createdAt: Date;
  language: string;
  type: string;

	constructor(
    _id: string,
    name: string,
    userId: string,
    description: string,
    file: object,
    slug: string,
    createdAt: Date,
    language: string,
    type: string,
    ) {
      this._id = _id
      this.name = name
      this.userId = userId
      this.description = description
      this.file = file
      this.createdAt = createdAt
      this.slug = slug
      this.language = language
      this.type = type
	}
}