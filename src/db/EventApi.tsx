import { baseUrl } from '~/db/url';

export class EventApi {
  static getEvents = async (cookies: any) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/event/index', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          Cookie: cookies,
        },
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  };

  static hideEvent = async (eventId: string) => {
    try {
      const res = await fetch(baseUrl + 'api/v1/event/update/' + eventId, {
        method: 'PUT',
        credentials: 'include',
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
