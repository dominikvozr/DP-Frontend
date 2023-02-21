import { baseUrl } from "~/db/url";

export class ExamApi {
	static createExam = async (data: any) => {
		try {
			const res = await fetch(baseUrl + 'api/v1/professor/exam/create', {
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

  static getExams = async () => {
		try {
			const res = await fetch(baseUrl + 'api/v1/professor/exam/index', {
				method: 'GET',
        credentials: 'include'
			})
			return await res.json()
		} catch (e) {
			console.error(e);
		}
	}

  static uploadExamProject = async (destination: string, file: File) => {
		try {
      const formData = new FormData()
      formData.append(destination, file)
        const res = await fetch(`${baseUrl}api/v1/professor/exam/upload/${destination}`, {
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