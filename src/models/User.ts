export class User {
	_id: String;
	email: String;
	name: String;
	displayName: String;
  avatarUrl: String;
	slug: String;
	googleId: String;
	googleToken: String;
	isSignedupViaGoogle: Boolean;
  darkTheme: Boolean;
  createdAt: Date;
  test: String | null;

	constructor(
    _id: String,
    email: String,
    name: String,
    displayName: String,
    avatarUrl: String,
    slug: String,
    googleId: String,
    googleToken: String,
    isSignedupViaGoogle: Boolean,
    darkTheme: Boolean,
    createdAt: Date,
    test: String | null,
    ) {
      this._id = _id
      this.email = email
      this.name = name
      this.displayName = displayName
      this.avatarUrl = avatarUrl
      this.slug = slug
      this.googleId = googleId
      this.googleToken = googleToken
      this.isSignedupViaGoogle = isSignedupViaGoogle
      this.darkTheme = darkTheme
      this.createdAt = createdAt
      this.test = test
	}
}