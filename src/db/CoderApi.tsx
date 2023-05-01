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

    static createWorkspace = async (data: any,cookies: any, params?: any) => {
        try {
            const endDate = new Date(data.endDate);
            let startDate = new Date(data.startDate)

            if(startDate.getTime()<= new Date().getTime()){
                startDate = new Date()
            }

            const ttl_ms = Math.round(endDate.getTime() - startDate.getTime());
            if(ttl_ms<=120_000){
                return new Error("bad ttl_ms")
            }
            if(params) {
                // TODO additional parameters for creation
            }
            const body = {
                name: data.name,
                template_id: data.templateId,
                ttl_ms: ttl_ms
            }

            const res = await fetch(baseUrl + 'api/v1/coder/workspaces/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Cookie: cookies,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return await res.json();
        } catch (e) {
            return e
        }
    };

    static getSession = async (username: string, workspaceName:string, cookies:any) => {
        const res = await fetch(baseUrl + `api/v1/coder/workspaces/session/${username}/${workspaceName}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookie: cookies,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

        });

        return await res.json();
    }

    static getStatus = async (username: string, workspaceName:string, cookies:any) => {
        const res = await fetch(baseUrl + `api/v1/coder/workspaces/status/${username}/${workspaceName}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Cookie: cookies,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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

    static getStatusInterval = async (workspaceId: string, userKey:string, cookies: any, ) => {
        try {
            const res = await fetch(`http://bawix.xyz:81/api/v2/workspaces/${workspaceId}/watch`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    Cookie: cookies,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Coder-Session-Token': userKey

                },
            });
            return res.text();


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