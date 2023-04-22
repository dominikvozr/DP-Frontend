import {
    component$,
    useContextProvider,
    useStore,
    useTask$,
    useSignal,
    useVisibleTask$,
} from '@builder.io/qwik';
import {DocumentHead, routeLoader$, server$} from '@builder.io/qwik-city';
import {TestApi} from '~/db/TestApi';
import _, {set} from 'lodash';
import {ExamDataContext, TestDataContext, WorkspaceContext} from '~/contexts/contexts';
import {CoderApi} from "~/db/CoderApi";
import {TestInvitation} from "~/components/test/testInvitation";
import {TestClosed} from "~/components/test/testClosed";



/* interface TestData {
  test: Test;
  exam: Exam;
}

export const onGet: RequestHandler<TestData> = async ({ request, params }) => {
  const data = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));
  return { test: data.test, exam: data.exam };
}; */

export const useTestData = routeLoader$(async ({ request, params }) => {
  const data: any = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));
  return { test: data?.test, exam: data?.exam, user: data?.user, isAuthorized: data?.isAuthorized };
});

export const createAndOrLogin = routeLoader$(async ({request})=>{
  const loginUser = await CoderApi.login(request.headers.get('cookie'));

  if(loginUser?.id){
    return {userObject:loginUser, isLogged: true};
  }
  else{
    const newUserLogin = await CoderApi.createUser(request.headers.get('cookie'));
    if(newUserLogin?.id){
      return {userObject:newUserLogin, isLogged: true};
    }
  }
});
const data ={
    exam:{
        startDate: new Date("2023-04-17T18:00:00.000+00:00"),
        name: "OOP",
        template_id: "c4496287-7799-4996-a0f0-46003bda3a51",
        endDate: new Date("2023-04-18T19:00:00.000+00:00"),
        isOpen: true
    }
}

export const createWorkspace=routeLoader$(async(requestEvent)=>{
  // const data = await requestEvent.resolveValue(useTestData);
  const user = await requestEvent.resolveValue(createAndOrLogin);
  const cookie = requestEvent.request.headers.get('cookie')

    if(user?.isLogged && cookie){

        const workspaceStatus = await CoderApi.getStatus(user.userObject.username,data.exam.name,cookie);
        const accessData = await  CoderApi.getSession(user.userObject.username,data.exam.name,cookie);

        if(workspaceStatus.latest_build?.status === "unfound" && data?.exam.isOpen){
            const workspace = await CoderApi.createWorkspace(data.exam,cookie);
            const accessData = await  CoderApi.getSession(user.userObject.username,data.exam.name,cookie);
            return {workspace : workspace, accessData: JSON.parse(accessData), cookie:cookie}
        }else{
            return {workspace: workspaceStatus, accessData: JSON.parse(accessData),cookie:cookie}
        }
    }else
        return {workspace: undefined, accessData: undefined, cookie: ''}
});


export default component$(() => {

    const examState = useStore({
        exam: {} as any,
    });

    const testState = useStore({
        test: {} as any,
    });
    const dataResource = useTestData();

    useTask$(async () => {
        testState.test = dataResource.value.test;
        examState.exam = dataResource.value.exam;
    })

    useContextProvider(ExamDataContext, examState);
    useContextProvider(TestDataContext, testState);
    return(
        <div class="relative flex min-h-full flex-col bg-indigo-400">
            {/* display test if exist */}
            {/*{!_.isEmpty(testState.test) && <TestShow />}*/}
            <TestShow />
            {/* display test invite if open */}
            {/*{_.isEmpty(testState.test) && examState.exam.isOpen && <TestInvitation />}*/}

            {/* display a sad image if exam is closed */}
            {/*{_.isEmpty(testState.test) && !examState.exam.isOpen && <TestClosed />}*/}
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
    });

    const workspaceData = createWorkspace()

    useTask$(()=>{
        workspaceState.email =  workspaceData.value?.accessData.email;
        workspaceState.password = workspaceData.value?.accessData.password;
        workspaceState.workspaceLink = workspaceData.value?.accessData.workspaceLink;
        workspaceState.workspaceId = workspaceData.value?.workspace.id;
        workspaceState.cookie = workspaceData.value?.cookie;
        workspaceState.userKey =  workspaceData.value?.accessData.sessionToken
    });


    useContextProvider(WorkspaceContext,workspaceState);

    const statusSignal = useSignal("")

    useVisibleTask$(() => {
        const update =  () => {
            CoderApi.getStatus(workspaceData.value?.workspace.owner_name,workspaceData.value?.workspace.name,workspaceState.cookie).then(r=>statusSignal.value=r.latest_build.status)
        };
        update()
        const tmrId = setInterval(update, 5000);
        return () => clearInterval(tmrId);
    });

    return (

        <div class="relative flex min-h-full flex-col bg-indigo-400">
            <p>Prihlasovacie údaje</p>
            <p>email: {workspaceState.email}</p>
            <p>heslo: {workspaceState.password}</p>
            <a href={statusSignal.value === "running" ? workspaceState.workspaceLink : ""} target={"_blank"}>{statusSignal.value === "running" ? "zacni pisat test" : statusSignal.value }</a>
        </div>

    );
})
export const head: DocumentHead = {
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
