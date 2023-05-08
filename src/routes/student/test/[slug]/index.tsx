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
import { DocumentHead, RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { appUrl } from '~/db/url';
import { TestApi } from '~/db/TestApi';
import { CoderApi } from '~/db/CoderApi';
import { UserApi } from '~/db/UserApi';
import { ExamDataContext, TestDataContext, WorkspaceContext } from '~/contexts/contexts';
import { TestInvitation } from '~/components/test/testInvitation';
import { TestClosed } from '~/components/test/testClosed';
import _ from 'lodash';
import { ExamApi } from '~/db/ExamApi';

//Check authorisation
export const onGet: RequestHandler = async ({ request, redirect, url }) => {
  const slug = url.searchParams.get('test') ?? '';
  if (slug !== '') throw redirect(302, appUrl + 'student/test/' + slug);

  const data = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!data || !data.isAuthorized) {
    throw redirect(302, `${appUrl}login`);
  }
};

//RouteLoaders
export const useTestData = routeLoader$(async ({ request, params }) => {
  const data: any = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));
  if(data?.exam.isOpen){
    const test = await ExamApi.createRepo(request.headers.get('cookie'), data.exam.id)

    return { test: test, exam: data?.exam, user: data?.user, isAuthorized: data?.isAuthorized };
  }else{
    return undefined;
  }

});

export const createAndOrLogin = routeLoader$(async (requestEvent) => {
  const data = await requestEvent.resolveValue(useTestData);
<<<<<<< HEAD
  if (data.exam?.isOpen) {
=======
  if(data?.exam?.isOpen){
>>>>>>> fbdfb91fe6577ba478de56dbc9c5e8975a0f6d69
    const loginUser = await CoderApi.login(requestEvent.request.headers.get('cookie'));

    if (loginUser?.id) {
      return { userObject: loginUser, isLogged: true };
    } else {
      const newUserLogin = await CoderApi.createUser(requestEvent.request.headers.get('cookie'));
      if (newUserLogin) {
        return { userObject: newUserLogin, isLogged: true };
      }
    }
  }
  return undefined;
});

export const createWorkspace = routeLoader$(async (requestEvent) => {
  const data = await requestEvent.resolveValue(useTestData);
  const user = await requestEvent.resolveValue(createAndOrLogin);
  const cookie = requestEvent.request.headers.get('cookie');
  if (user && cookie && data) {
    if (user.isLogged) {
      const workspaceStatus = await CoderApi.getStatus(
        user.userObject.username,
        data.exam.slug,
        cookie,
      );
<<<<<<< HEAD
      const accessData = await CoderApi.getSession(
        user.userObject.username,
        data.exam.slug,
        cookie,
      );

      if (workspaceStatus.latest_build?.status === 'unfound' && data?.exam.isOpen) {
        const workspace = await CoderApi.createWorkspace(data.user, data.exam, cookie);
        console.log(workspace);
        const email = await CoderApi.sentEmailWithLoginData(cookie);
        const accessData = await CoderApi.getSession(
          user.userObject.username,
          data.exam.slug,
          cookie,
=======
      if (workspaceStatus.latest_build?.status === 'unfound' && data?.exam.isOpen) {

        const workspace = await CoderApi.createWorkspace(data.user,data.test, cookie);
        console.log(workspace)
        const email = await CoderApi.sentEmailWithLoginData(cookie);
        const accessData = await CoderApi.getSession(
            user.userObject.username,
            data.test.slug,
            cookie,
>>>>>>> fbdfb91fe6577ba478de56dbc9c5e8975a0f6d69
        );
        return {
          workspace: workspace,
          accessData: JSON.parse(accessData),
          endDate: data.exam.endDate,
          cookie: cookie,
        };
      } else {

        const accessData = await CoderApi.getSession(
            user.userObject.username,
            data.test.slug,
            cookie,
        );
        return {
          workspace: workspaceStatus,
          accessData: JSON.parse(accessData),
          endDate: data.exam.endDate,
          cookie: cookie,
        };
      }
    }
  }
  return { workspace: undefined, accessData: undefined, endDate: undefined, cookie: '' };
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
  });

  useContextProvider(ExamDataContext, examState);
  useContextProvider(TestDataContext, testState);
  return (
    <div class="relative flex min-h-full flex-col bg-indigo-400">
      {/* display test if exist */}
      {!_.isEmpty(testState.test) && <TestInvitation />}

      {/* display test invite if open */}
      {_.isEmpty(testState.test) && examState.exam.isOpen && <TestShow />}

      {/* display a sad image if exam is closed */}
      {_.isEmpty(testState.test) && !examState.exam.isOpen && <TestClosed />}
    </div>
  );
});

const TestShow = component$(() => {
  const workspaceState = useStore({
    email: undefined,
    password: undefined,
    workspaceLink: undefined,
    workspaceId: undefined,
    cookie: '',
    userKey: undefined,
    endDate: undefined,
  });

  const workspaceData = createWorkspace();

  useTask$(async () => {
    workspaceState.email = workspaceData.value?.accessData.email;
    workspaceState.password = workspaceData.value?.accessData.password;
    workspaceState.workspaceLink = workspaceData.value?.accessData.workspaceLink;
    workspaceState.workspaceId = workspaceData.value?.workspace.id;
    workspaceState.cookie = workspaceData.value?.cookie;
    workspaceState.userKey = workspaceData.value?.accessData.sessionToken;
    workspaceState.endDate = workspaceData.value?.endDate;
  });

  useContextProvider(WorkspaceContext, workspaceState);

  const statusSignal = useSignal('');

  useVisibleTask$(({ cleanup }) => {
    const update = () => {
      let appsReady = true;
      CoderApi.getStatus(
        workspaceData.value?.workspace.owner_name,
        workspaceData.value?.workspace.name,
        workspaceState.cookie,
      ).then((r) => {
        if (r.latest_build.status === 'running') {
          r.latest_build.resources.forEach((resource: any) => {
            if (resource.agents) {
              resource.agents.forEach((agent: any) => {
                for (let j = 0; j < agent.apps.length; j++) {
                  if (agent.apps[j].health !== 'healthy') {
                    statusSignal.value = 'Posledné prípravy!';
                    appsReady = false;
                    return;
                  }
                }
              });
            }
          });
          if (appsReady) {
            statusSignal.value = r.latest_build.status;
            window.open(workspaceState.workspaceLink);
            clearInterval(tmrId);
          }
        } else {
          statusSignal.value = `Status: ${r.latest_build.status}`;
        }
      });
    };
    update();
    const tmrId = setInterval(update, 1000);
    cleanup(() => clearInterval(tmrId));
  });
  const emailSent = useSignal(false);
  useVisibleTask$(({ cleanup }) => {
    const update = () => {
      if (emailSent.value) {
        emailSent.value = false;
      }
    };
    const id = setInterval(update, 120_000);
    cleanup(() => clearInterval(id));
  });

  const examData = useContext(ExamDataContext);
  return (
<<<<<<< HEAD
    <>
      <div class="relative bg-gray-900">
        <div class="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img class="h-full w-full object-cover" src="/image/thinkin-monke.jpg" alt="sad-face" />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            class="absolute left-24 -bottom-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fill-opacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#776FFF" />
                <stop offset="1" stop-color="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:py-40 lg:px-8">
          <div class="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-3xl">
              {examData.exam.name} - {examData.exam.subject}
            </p>
            <h1 class="text-base font-semibold leading-7 text-indigo-400">
              <Clock></Clock>
            </h1>
            <div>
              {/*<p class="text-base font-semibold leading-7 text-white">Skontrolujte email: </p>*/}
              <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-2xl">
                {workspaceState.email}
=======
      <>
        <div class="relative bg-gray-900">
          <div class="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
            <img class="h-full w-full object-cover" src="/image/thinkin-monke.jpg" alt="sad-face" />
            <svg
                viewBox="0 0 926 676"
                aria-hidden="true"
                class="absolute left-24 -bottom-24 w-[57.875rem] transform-gpu blur-[118px]"
            >
              <path
                  fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
                  fill-opacity=".4"
                  d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
              />
              <defs>
                <linearGradient
                    id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                    x1="926.392"
                    x2="-109.635"
                    y1=".176"
                    y2="321.024"
                    gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#776FFF" />
                  <stop offset="1" stop-color="#FF4694" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:py-40 lg:px-8">
            <div class="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
              <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-3xl">
                {examData.exam.name} - {examData.exam.subject}
>>>>>>> fbdfb91fe6577ba478de56dbc9c5e8975a0f6d69
              </p>
              <div class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-2xl">
                <button
                  disabled={emailSent.value}
                  onClick$={async () => {
                    //const { value } = await handleCreate.run(state);
                    const res = await CoderApi.sentEmailWithLoginData(workspaceState.cookie);
                    console.log(res);

                    if (res.response?.startsWith('250')) {
                      emailSent.value = true;
                    }
                  }}
                  class={
                    emailSent.value
                      ? 'inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm'
                      : 'inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  }
                >
                  {emailSent.value ? 'Údaje poslané' : 'Znova poslať údaje'}
                </button>
              </div>
            </div>
            <p class="relative mt-6 text-base leading-7 text-gray-300 pb-5">
              {examData.exam.description}
              <span class="absolute bottom-0 right-0 text-sm italic">
                {' '}
                autor: {examData.exam.user.displayName}
              </span>
            </p>
            <div class="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32"></div>
            <div class="mt-8">
              <div
                class={
                  statusSignal.value === 'running'
                    ? 'text-2xl uppercase text-center p-2 animate-pulse duration-1000 font-semibold leading-7 text-white bg-green-400'
                    : 'text-2xl uppercase text-center p-2 animate-pulse duration-1000 font-semibold leading-7 text-white bg-red-400'
                }
              >
                <a
                  style={statusSignal.value === 'running' ? '' : 'pointer-events:none'}
                  href={statusSignal.value === 'running' ? workspaceState.workspaceLink : ''}
                  target={'_blank'}
                >
                  {statusSignal.value === 'running' ? 'Začni písať test' : statusSignal.value}
                </a>
              </div>
            </div>
            <div class="mt-8">
              <a
                href={`${appUrl}student`}
                class="flex text-base font-semibold leading-7 text-indigo-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
                späť
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

const Clock = component$(() => {
  const workspace = useContext(WorkspaceContext);
  const time = useSignal(new Date().toLocaleTimeString());
  useVisibleTask$(({ cleanup }) => {
    const update = () => {
      const endDate = new Date(workspace.endDate);
      const timeToEnd = new Date(endDate.getTime() - new Date().getTime());
      const hours =
        timeToEnd.getUTCHours() < 10 ? `0${timeToEnd.getUTCHours()}` : timeToEnd.getUTCHours();
      const minutes =
        timeToEnd.getUTCMinutes() < 10
          ? `0${timeToEnd.getUTCMinutes()}`
          : timeToEnd.getUTCMinutes();
      const seconds =
        timeToEnd.getUTCSeconds() < 10
          ? `0${timeToEnd.getUTCSeconds()}`
          : timeToEnd.getUTCSeconds();
      time.value = `${hours}:${minutes}:${seconds}`;
      if (endDate == new Date()) {
        location.reload();
      }
    };
    const id = setInterval(update, 1000);
    cleanup(() => clearInterval(id));
  });
  return <p>Zostávajúci čas: {time}</p>;
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
