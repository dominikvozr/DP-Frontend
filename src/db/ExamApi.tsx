import { baseUrl } from '~/db/url';

export class ExamApi {
  static createExam = async (data: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/professor/exam/create', {
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

  static getExams = async (cookies: any, page: string) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/professor/exam/index?page=' + page, {
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

  static getExamBySlug = async (slug: string, cookies: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/professor/exam/get?test=' + slug, {
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

  static getExamById = async (id: string, cookies: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/professor/exam/show/' + id, {
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

  static deleteExam = async (id: string) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/professor/exam/delete/' + id, {
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

  static uploadExamProject = async (destination: string, files: File[]) => {
    try {
      const formData = new FormData();
      for (const file of files) {
        formData.append(destination, file);
      }
      const res = await fetch(`${baseUrl}api/v1/professor/exam/upload/${destination}`, {
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
