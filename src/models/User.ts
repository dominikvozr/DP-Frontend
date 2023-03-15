export interface UserInterface {
  _id: string,
  email: string,
  name: string,
  displayName: string,
  avatarUrl: string,
  slug: string,
  googleId: string,
  googleToken: string,
  isSignedupViaGoogle: Boolean,
  darkTheme: Boolean,
  createdAt: Date,
  test: string | null,
}

export class User {
	_id: string = '';
	email: string = '';
	name: string = '';
	displayName: string = '';
  avatarUrl: string = '';
	slug: string = '';
	googleId: string = '';
	googleToken: string = '';
	isSignedupViaGoogle: Boolean = false;
  darkTheme: Boolean = false;
  createdAt: Date = new Date();
  test: string | null = '';

	constructor(userData: UserInterface) {
      this._id = userData._id
      this.email = userData.email
      this.name = userData.name
      this.displayName = userData.displayName
      this.avatarUrl = userData.avatarUrl
      this.slug = userData.slug
      this.googleId = userData.googleId
      this.googleToken = userData.googleToken
      this.isSignedupViaGoogle = userData.isSignedupViaGoogle
      this.darkTheme = userData.darkTheme
      this.createdAt = userData.createdAt
      this.test = userData.test
	}
}