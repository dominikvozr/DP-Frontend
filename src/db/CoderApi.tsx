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

    static createWorkspace = async (user: any,data: any, workspaceConf: any,cookies: any) => {

        try {
            const endDate = new Date(workspaceConf.endDate);
            let startDate = new Date(workspaceConf.startDate)
            const repo = data.testRepo;
            console.log(data.testRepo)
            let git = undefined
            if(repo){
                git = `http://${user.gitea.accessToken.sha1}@bawix.xyz:81/gitea/${repo}`;
            }
            if(startDate.getTime()<= new Date().getTime()){
                startDate = new Date()
            }

            let ttl_ms = Math.round(endDate.getTime() - startDate.getTime());
            if(ttl_ms<=120_000){
                ttl_ms = 120_000
            }
            const params = [
                {
                    name: `${workspaceConf.workSpaceCPU} Cores`,
                    value: workspaceConf.workSpaceCPU.toString()
                },
                {
                    name: `${workspaceConf.workSpaceMemory} GB`,
                    value: workspaceConf.workSpaceMemory.toString()
                },
                {
                    name: "Home Disk Size (GB)",
                    value: workspaceConf.workSpaceDisk.toString()
                },
                {
                    name: "Git repository",
                    value: git
                },
            ]
            const body = {
                name: workspaceConf.slug,
                rich_parameter_values: params,
                ttl_ms: ttl_ms,
                template_id: workspaceConf.templateId,
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