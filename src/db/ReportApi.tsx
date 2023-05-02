import { baseUrl } from '~/db/url';

export class ReportApi {
  static createReport = async (data: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/report/create', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  static reply = async (data: any, testId: string) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/report/update', {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify({ data, testId }),
        headers: {
          'content-type': 'application/json',
        },
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  };
}
