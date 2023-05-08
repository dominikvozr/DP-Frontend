import { baseUrl } from '~/db/url';

export class TestApi {
  static createTest = async (data: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/student/test/create', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  };

  static updateTestResults = async (testId: any, scoreData: any) => {
    try {
      const res = await fetch(`${baseUrl}api/v1/student/test/update/score/${testId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(scoreData),
        headers: {
          'content-type': 'application/json',
        },
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  static getTests = async (cookies: any, page: string | null) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/student/test/index?page=' + page, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: cookies,
        },
      });
      const data = await res.json();
      console.log(data);

      return data;
    } catch (e) {
      console.error(e);
    }
  };

  static getTestBySlug = async (slug: string, cookies: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/student/test/get?test=' + slug, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: cookies,
        },
      });
      const data = await res.json();
      /* const userData = user? new User(user) : undefined
      const examsData = exams? exams.map((exam) => new Exam(exam)) : undefined */
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  static getTestByExamSlug = async (slug: string, cookies: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/student/test/exam/' + slug, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: cookies,
        },
      });

      const data = await res.json();
      /* const userData = user? new User(user) : undefined
      const examsData = exams? exams.map((exam) => new Exam(exam)) : undefined */
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  static getTestById = async (id: string, cookies: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/student/test/show/' + id, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: cookies,
        },
      });
      const data = await res.json();
      /* const userData = user? new User(user) : undefined
      const examsData = exams? exams.map((exam) => new Exam(exam)) : undefined */

      return data;
    } catch (e) {
      console.error(e);
    }
  };

  static deleteTest = async (id: string) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/student/test/delete/' + id, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  static uploadTestProject = async (destination: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append(destination, file);
      const res = await fetch(`${baseUrl}api/v1/student/test/upload/${destination}`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  };
}
