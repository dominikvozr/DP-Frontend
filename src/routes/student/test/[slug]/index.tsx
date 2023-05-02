// Import Qwik libraries and functions
import {
    component$,
    useContextProvider,
    useStore,
    useTask$,
    useVisibleTask$,
    useContext,
    useSignal,
} from '@builder.io/qwik';
import {DocumentHead, RequestHandler, routeLoader$} from '@builder.io/qwik-city';
import {appUrl} from "~/db/url";
import {TestApi} from '~/db/TestApi';
import {CoderApi} from "~/db/CoderApi";
import {UserApi} from "~/db/UserApi";
import {ExamDataContext, TestDataContext, WorkspaceContext} from '~/contexts/contexts';
import {TestInvitation} from "~/components/test/testInvitation";
import {TestClosed} from "~/components/test/testClosed";
import _ from 'lodash';

//Check authorisation
export const onGet: RequestHandler = async ({ request, redirect, url }) => {
    const slug = url.searchParams.get('test') ?? '';
    if (slug !== '') throw redirect(302, appUrl + 'student/test/' + slug);

    const data = await UserApi.checkAuthorization(request.headers.get('cookie'));
    if (!data || !data.isAuthorized) {
        throw redirect(302, `${appUrl}login`);
    }
}

//RouteLoaders
export const useTestData = routeLoader$(async ({ request, params }) => {
    const data: any = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));
    const startDate = new Date(data.exam.startDate)
    const endDate = new Date(data.exam.endDate)
    const currentDate =  new Date()
    if((startDate <= currentDate )&& (currentDate < endDate)){
        data.exam.isOpen=true
    }
    return { test: data?.test, exam: data?.exam, user: data?.user, isAuthorized: data?.isAuthorized };
});


export const createAndOrLogin = routeLoader$(async ({request})=>{
  const loginUser = await CoderApi.login(request.headers.get('cookie'));
  if(loginUser?.id){
    return {userObject:loginUser, isLogged: true};
  }
  else{
      const newUserLogin = await CoderApi.createUser(request.headers.get('cookie'));
    if(newUserLogin){
      return {userObject:newUserLogin, isLogged: true};
    }
  }
});


export const createWorkspace=routeLoader$(async(requestEvent)=>{
    const data = await requestEvent.resolveValue(useTestData);
    const user = await requestEvent.resolveValue(createAndOrLogin);
    const cookie = requestEvent.request.headers.get('cookie')
    if(user && cookie && data ) {

        if (user.isLogged) {
            const workspaceStatus = await CoderApi.getStatus(user.userObject.username, data.exam.slug, cookie);
            const accessData = await CoderApi.getSession(user.userObject.username, data.exam.slug, cookie);

            if (workspaceStatus.latest_build?.status === "unfound" && data?.exam.isOpen) {
                // const repo = `${data.test.user.gitea.username}/${data.test.slug}`
                const workspace = await CoderApi.createWorkspace(data.exam, cookie);
                const accessData = await CoderApi.getSession(user.userObject.username, data.exam.slug, cookie);

                return {
                    workspace: workspace,
                    accessData: JSON.parse(accessData),
                    endDate: data.exam.endDate,
                    cookie: cookie
                }
            } else {

                return {
                    workspace: workspaceStatus,
                    accessData: JSON.parse(accessData),
                    endDate: data.exam.endDate,
                    cookie: cookie
                }
            }
        }
    }
        return {workspace: undefined, accessData: undefined,endDate:undefined, cookie: ''}
});

// Components
export default component$(() => {

    const examState = useStore({
        exam: {} as any,
    });

    const testState = useStore({
        test: {} as any,
    });
    const dataResource = useTestData();

    useTask$(async () => {
        testState.test = dataResource.value?.test;
        examState.exam = dataResource.value?.exam;
    })


    useContextProvider(ExamDataContext, examState);
    useContextProvider(TestDataContext, testState);
    return(
        <div class="relative flex min-h-full flex-col bg-indigo-400">

            {/* display test if exist */}
            {!_.isEmpty(testState.test) && <TestInvitation/>}

            {/* display test invite if open */}
            {_.isEmpty(testState.test) && examState.exam.isOpen &&  <TestShow />}

            {/* display a sad image if exam is closed */}
            {_.isEmpty(testState.test) && !examState.exam.isOpen && <TestClosed />}
        </div>
    )
});

const TestShow = component$(()=>{

    const workspaceState = useStore({
        email: undefined,
        password: undefined,
        workspaceLink: undefined,
        workspaceId: undefined,
        cookie: '',
        userKey: undefined,
        endDate:undefined
    });

    const workspaceData = createWorkspace()

    useTask$(async ()=>{
        workspaceState.email =  workspaceData.value?.accessData.email;
        workspaceState.password = workspaceData.value?.accessData.password;
        workspaceState.workspaceLink = workspaceData.value?.accessData.workspaceLink;
        workspaceState.workspaceId = workspaceData.value?.workspace.id;
        workspaceState.cookie = workspaceData.value?.cookie;
        workspaceState.userKey =  workspaceData.value?.accessData.sessionToken
        workspaceState.endDate = workspaceData.value?.endDate
    });


    useContextProvider(WorkspaceContext,workspaceState);

    const statusSignal = useSignal("")

    useVisibleTask$(() => {
        const update =  () => {
            let appsReady = true
            CoderApi.getStatus(workspaceData.value?.workspace.owner_name,workspaceData.value?.workspace.name,workspaceState.cookie)
                .then(r=>{
                    if(r.latest_build.status==="running"){
                        r.latest_build.resources.forEach((resource:any) => {
                            if (resource.agents ) {
                                resource.agents.forEach((agent:any) => {
                                    for (let j = 0; j < agent.apps.length; j++) {
                                        if (agent.apps[j].health !== "healthy") {
                                            statusSignal.value="getting ready!"
                                            appsReady = false;
                                        }
                                    }
                                });
                            }
                        });
                        if(appsReady)
                            statusSignal.value=r.latest_build.status
                    }else{
                        statusSignal.value=r.latest_build.status
                    }

                })
        };
        update()
        const tmrId = setInterval(update, 1000);
        return () => clearInterval(tmrId);
    });

    return (

        <div class="relative flex min-h-full flex-col bg-indigo-400">
            <Clock></Clock>
            <p>Prihlasovacie údaje</p>
            <p>email: {workspaceState.email}</p>
            <p>heslo: {workspaceState.password}</p>
            <a style={statusSignal.value === "running" ? "": "pointer-events:none"} href={statusSignal.value === "running" ? workspaceState.workspaceLink : ""} target={"_blank"}>{statusSignal.value === "running" ? "zacni pisat test" : statusSignal.value }</a>
        </div>

    );
})

const Clock = component$(() => {
    const workspace = useContext(WorkspaceContext);
    const time = useSignal(new Date().toLocaleTimeString());
    useVisibleTask$(({ cleanup }) => {
        const update = () => {
            const endDate = new Date(workspace.endDate);
            time.value = new Date((endDate.getTime() - new Date().getTime())).toLocaleTimeString();
        };
        const id = setInterval(update, 5000);
        cleanup(() => clearInterval(id));
    });
    return <div>{time}</div>;
});
export const head: DocumentHead = {
  title: 'Test',
  meta: [
    {
      name: 'Test page',
      content: 'test',
    },
  ],
};
