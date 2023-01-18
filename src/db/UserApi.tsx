import axios from "axios";
import { baseUrl } from "~/db/url";

export class UserApi {
  static setTest (test: any): any {
    throw new Error('Method not implemented.');
  }
	static checkAuthorization = async (cookies : any) => {
		try {
			const res = await axios.get(baseUrl + 'api/v1/user/check-authorization', {
				withCredentials: true,
				headers: {
					Cookie: cookies
				}
			})
			return res.data
		} catch (e) {
			console.error(e);
		}
	}

	static getCertificationConfigData = async () => {

		try {
			const url = baseUrl + 'certification/config'
			const res = await axios.get(url, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (res.status !== 200)
				return res
			return res.data

		} catch (error) {
			console.error(error);
		}
	}

	static postReview = async (data: any) => {
		try {
			const res = await axios.post(baseUrl + 'review/create', data, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (res.status !== 200)
				return res
			return res.data

		} catch (error) {
			console.error(error);
		}
	}

	static postService = async (data: any) => {
		try {
			const res = await axios.post(baseUrl + 'service/create', data, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (res.status !== 200)
				return res
			return res.data

		} catch (error) {
			console.error(error);
		}
	}

	static postReviewProtocol = async (data: any) => {
		try {
			const res = await axios.post(baseUrl + 'certification/professionalReviewProtocol/create', data, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			})
			if (res.status !== 200)
				return res
			return res.data

		} catch (error) {
			console.error(error);
		}
	}
}