import axios from "axios";
import { baseUrl } from "~/db/url";

export class AuthApi {
	static authenticateWithGoogle = async () => {

		try {
			const url = baseUrl + 'auth/google/'
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