import { User } from "./User";

export class Pipeline {
	_id: string;
	name: string;
  user: User;
  description: string;
  file: object;
  slug: string;
  createdAt: Date;
  language: string;
  type: string;

	constructor(
    _id: string,
    name: string,
    user: User,
    description: string,
    file: object,
    slug: string,
    createdAt: Date,
    language: string,
    type: string,
    ) {
      this._id = _id
      this.name = name
      this.user = user
      this.description = description
      this.file = file
      this.createdAt = createdAt
      this.slug = slug
      this.language = language
      this.type = type
	}
}