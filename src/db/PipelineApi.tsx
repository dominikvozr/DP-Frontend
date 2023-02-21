import { baseUrl } from "~/db/url";

export class PipelineApi {
	static createPipeline = async (data: any) => {
		try {
			const res = await fetch(baseUrl + 'api/v1/pipeline/create', {
				method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        }
			})
			return await res.json()
		} catch (e) {
			console.error(e);
		}
	}

  static uploadPipeline = async (file: File) => {
		try {
      const formData = new FormData()
      formData.append('pipeline', file)
        const res = await fetch(`${baseUrl}api/v1/pipeline/upload`, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        })
        return await res.json()
		} catch (e) {
			console.error(e);
		}
	}

  static getPipelinesData = async () => {
    try {
			const res = await fetch(baseUrl + 'api/v1/pipeline/index', {
				method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        }
			})
			return await res.json()
		} catch (e) {
			console.error(e);
		}
  }

}