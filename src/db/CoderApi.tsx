import {baseUrl} from '~/db/url';

export class CoderApi {

    static login = async (cookies: any) => {
        try {
            const res = await fetch(baseUrl + 'api/v1/coder/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Cookie: cookies,
                },
            });

            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    static devLogin = async (cookies: any) => {
        try {
            const res = await fetch(baseUrl + 'api/v1/coder/dev-login', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Cookie: cookies,
                },
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    static logout = async () => {
        try {
            const res = await fetch(baseUrl + 'api/v1/coder/users/logout', {
                method: 'POST',
                credentials: 'include',
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    static createWorkspace = async (cookies: any,data: any, params?: any) => {
        try {
            const ttl_ms = Math.round(data.startDate.getTime() - data.endDate.getTime());
            if(params) {
                // TODO additional parameters for creation
            }
            const body = {
                autostart_schedule: data.startDate.toString(),
                "name": data.name,
                "template_id": data.template_id,
                "ttl_ms": ttl_ms
            }
            const res = await fetch(baseUrl + 'api/v1/coder/workspaces', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Cookie: cookies,
                },
                body: JSON.stringify(body)
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };

    static getSession = async (cookies:any) => {
        const res = await fetch(baseUrl + 'api/v1/coder/workspaces', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookie: cookies,
            },

        });
        return await res.json();
    }

    static getOrganization = async (data: any) => {
        try {
            const res = await fetch(baseUrl + 'api/v1/coder/workspaces', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };
    static createUser = async (cookies: any) => {
        try {
            const res = await fetch(baseUrl + 'api/v1/coder/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Cookie: cookies,
                },
            });
            return await res.json();
        } catch (e) {
            console.error(e);
        }
    };
}