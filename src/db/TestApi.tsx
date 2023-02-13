import { baseUrl } from "~/db/url";

export class TestApi {
	static createTest = async (data: any) => {
		try {
			const res = await fetch(baseUrl + 'api/v1/professor/test/create', {
				method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
			})
			return await res.json()
		} catch (e) {
			console.error(e);
		}
	}

  static uploadTestProject = async (destination: string, file: File) => {
		try {
      const formData = new FormData()
      formData.append(destination, file)
        const res = await fetch(`${baseUrl}api/v1/professor/test/upload/${destination}`, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        })
        return await res.json()

		} catch (e) {
			console.error(e);
		}
	}

}