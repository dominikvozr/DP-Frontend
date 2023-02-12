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
			return res.json()
		} catch (e) {
			console.error(e);
		}
	}
}