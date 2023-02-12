import { baseUrl } from "~/db/url";

export class UserApi {
	static createTest = async (cookies : any, data: any) => {
		try {
			const res = await fetch(baseUrl + 'api/v1/professor/test/create', {
				method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          Cookie: cookies
        }
			})
			return res.json()
		} catch (e) {
			console.error(e);
		}
	}
}