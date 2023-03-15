import { baseUrl } from "~/db/url";

export class UserApi {
	static checkAuthorization = async (cookies : any) => {
		try {
			const res = await fetch(baseUrl + 'api/v1/user/check-authorization', {
				credentials: 'include',
				headers: {
					Cookie: cookies
				}
			})
			const data =  await res.json()
      //const userData = new User(user)
      return data
		} catch (e) {
			console.error(e);
		}
	}

  static logout = async() => {
    try {
			const res = await fetch(baseUrl + 'api/v1/user/logout', {
				credentials: 'include',
			})
			let data =  await res.json()

      //const userData = new User(user)
      return data
		} catch (e) {
			console.error(e);
		}
  }
}