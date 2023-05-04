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

    static createWorkspace = async (user: any,data: any,cookies: any) => {
        try {
            const endDate = new Date(data.endDate);
            let startDate = new Date(data.startDate)
            const repo = `${user.gitea.username}/${data.slug}`;
            let git = "";

            if(startDate.getTime()<= new Date().getTime()){
                startDate = new Date()
            }

            let ttl_ms = Math.round(endDate.getTime() - startDate.getTime());
            if(ttl_ms<=120_000){
                ttl_ms = 120_000
            }
            if(user.gitea.accesToken.sha1){
                 git =`http://${user.gitea.accesToken.sha1}@bawix.xyz:81/gitea/${repo}`
            }
            const params = [
                {
                    name: "cpu",
                    value: data.workSpaceCPU.toString()
                },
                {
                    name: "memory",
                    value: data.workSpaceMemory.toString()
                },
                {
                    name: "home_disk_size",
                    value: data.workSpaceDisk.toString()
                },
                {
                    name: "git_repo",
                    value: git
                },
            ]
            const body = {
                name: data.slug,
                template_id: data.templateId,
                ttl_ms: ttl_ms,
                rich_parameter_values: params
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
    static sentEmailWithLoginData = async (cookies:any)=>{
        const res = await fetch(baseUrl + `api/v1/coder/workspaces/session/email`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Cookie: cookies,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        return await res.json()
    }
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