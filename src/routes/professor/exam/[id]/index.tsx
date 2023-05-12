/* eslint-disable prettier/prettier */
import { component$, useStore, useTask$, useContextProvider } from '@builder.io/qwik';
import { DocumentHead, RequestHandler, routeLoader$, useLocation } from '@builder.io/qwik-city';
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
/* import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon';
import CommandLineIcon from '@heroicons/react/20/solid/CommandLineIcon'; */
import { qwikify$ } from '@builder.io/qwik-react';
import { ExamApi } from '~/db/ExamApi';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';
import _, { isEmpty } from 'lodash';
import { ExamModal } from '~/components/exam/modal';
import { ExamModalDataContext } from '~/contexts/contexts';
import { ReportApi } from '~/db/ReportApi';
import { Evaluation } from '~/components/professor/evaluation';

interface Report {
  _id: string,
  user: any,
  test: any,
  message: string,
  response: string,
  createdAt: Date,
  isOpen: boolean,
}

export const onGet: RequestHandler = async ({ redirect, request }) => {
  const { isAuthorized } = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!isAuthorized) {
    redirect(302, `${appUrl}login`);
  }
};

export const useExamData = routeLoader$(async ({ params, request }) => {
  const { exam, tests, isAuthorized, user } = await ExamApi.getExamById(
    params.id,
    request.headers.get('cookie'),
  );
  return { exam, tests, isAuthorized, user };
});

export default component$(() => {
  const loc = useLocation();
  const profileTabs = useStore({
    active: 'profile',
    tabs: [
      { name: 'Profile', slug: 'profile', current: true },
      { name: 'Reports', slug: 'reports', current: false },
      { name: 'Evaluation', slug: 'evaluation', current: false },
    ],
  });
  const state = useStore({
    exam: {} as any,
    startDate: new Date(),
    endDate: new Date(),
    testOrder: -1,
    test: {} as any,
    reports: [] as Report[],
    replies: {} as any,
    //savedHide: [] as any,
  });
  const dataResource = useExamData();
  const examModalData = useStore({
    open: false,
    exam: dataResource.value.exam,
  });

  useTask$(async () => {
    if (!loc.url.searchParams.has('email'))
      state.test = !_.isEmpty(dataResource.value.tests) ? dataResource.value.tests[0] : {};

    dataResource.value.tests.map((test: any) => {
      if (test.user.email == loc.url.searchParams.get('email'))
      state.test = test
      state.reports = test.reports
    })

    if(loc.url.searchParams.has('tab'))
      profileTabs.active = loc.url.searchParams.get('tab') || 'profile'

    state.testOrder = 0;
    state.startDate = new Date(dataResource.value.exam.startDate);
    state.endDate = new Date(dataResource.value.exam.endDate);
  });

  const QChevronLeftIcon = qwikify$(ChevronLeftIcon);
  useContextProvider(ExamModalDataContext, examModalData);

  const profile = {
    coverImageUrl:
      'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  };
  return (
    <>
      <ExamModal />
      <div class={`flex border-t border-indigo-700 ${profileTabs.active !== 'evaluation'? 'h-full': ''}`}>
        <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div class="py-2 min-w-0 border-b border-indigo-800 bg-indigo-600">
            <nav class="flex justify-between w-full px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
              <div class="flex">
                <a
                  href={`${appUrl}professor`}
                  class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
                >
                  <QChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </a>
                <h1 class="truncate self-center ml-5 text-2xl text-center font-bold text-indigo-200">
                  {dataResource.value.exam.name} - {dataResource.value.exam.subject}
                </h1>
                <button
                  class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900 ml-3"
                  preventdefault:click
                  onClick$={() => {
                    examModalData.open = true;
                    document.body.classList.add('fixed', 'w-full')
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="rgb(236 72 153)"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </button>
              </div>
            </nav>
          </div>
          <div class="relative z-0 flex flex-1 overflow-hidden">
            <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <article>
                {/* Profile header */}
                {!_.isEmpty(state.test) && (
                  <>
                    <div>
                      <div>
                        <img
                          class={`w-full object-cover ${profileTabs.active === 'evaluation' ? 'h-16' : 'h-32 lg:h-48'}`}
                          src={profile.coverImageUrl}
                          alt=""
                        />
                      </div>
                      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div class={`-mt-12 sm:-mt-16 sm:flex ${profileTabs.active === 'evaluation' ? 'relative top-1' : ''}`}>
                          <div class="flex relative z-20">
                            <img
                              class="h-24 w-24 rounded-full ring-2 ring-blue-600 sm:h-32 sm:w-32 bg-white"
                              src={state.test.user.avatarUrl}
                              alt=""
                            />
                          </div>
                          <div class="-left-[10px] relative sm:flex sm:flex-1 sm:items-center sm:justify-end sm:min-w-0 sm:pb-1 sm:space-x-6 z-10">
                            <div class="min-w-0 flex-1 2xl:block">
                              <h1 class="inline border-2 border-blue-600 bg-white px-6 py-2 rounded-r-lg truncate text-2xl font-bold text-blue-800">
                                {state.test.user.displayName}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-6 sm:mt-2 2xl:mt-5">
                      <div class="border-b border-gray-200">
                        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                            {profileTabs.tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href="#"
                                preventdefault:click
                                class={{
                                  'border-pink-500 text-gray-900': profileTabs.active === tab.slug,
                                  'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                                    profileTabs.active !== tab.slug,
                                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm':
                                    true,
                                }}
                                onClick$={() => {
                                  profileTabs.active = tab.slug;
                                }}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div class="text-gray-600">
                  <div class={`p-2 ${profileTabs.active !== 'profile' ? 'hidden' : ''}`}>
                    <div>email: {state.test.user && state.test.user.email}</div>
                  </div>
                  <div class={profileTabs.active !== 'evaluation' ? 'hidden' : ''}>
                    <Evaluation user={state.test.user} test={state.test} exam={dataResource.value.exam} />
                  </div>
                  <div class={`p-2 ${profileTabs.active !== 'reports' ? 'hidden' : ''}`}>
                    {state.reports?.slice(0).reverse().map((report: Report) => (
                        <>
                        <div key={report._id} class="flex justify-center items-center space-x-4 my-4">
                            <div class="w-1/2">{report.message}</div>
                            <div class="w-1/3 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                              <label for="response" class="block text-xs font-medium text-gray-900">Response</label>
                              <input type="text" name="response" id="response" disabled={report.response ? true : false} value={report.response} onInput$={(evt: any) => {
                                if (!evt.target.value) {
                                  delete state.replies[report._id]
                                  return
                                }
                                state.replies[report._id] = evt.target.value;
                              }} class="block w-full border-0 p-0 text-gray-900 disabled:bg-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                            </div>
                          </div>
                        </>
                      )
                    )}
                    { state.reports.length ? (
                      <div class="flex justify-center">
                        <button
                          type="submit"
                          class="inline-flex mt-6 w-48 justify-center mx-auto items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick$={async () => {
                            if (isEmpty(state.replies)) return
                            await ReportApi.reply(state.replies, state.test._id);
                            state.reports = state.reports.map((report: any) => {
                              if(state.replies[report._id])
                                report['response'] = state.replies[report._id]
                              return report
                            })
                          }}
                        >
                          save
                        </button>
                      </div>
                    ): 'no reports :)'}
                  </div>
                </div>
              </article>
            </main>
            <aside class={`flex-shrink-0 border-r border-gray-200 order-first flex flex-col ${profileTabs.active === 'evaluation' ? 'md:w-36 lg:w-56' : 'md:w-64 lg:w-96'}`}>
              <div class="px-6 pt-6 pb-4">
                <h2 class="text-lg font-medium text-gray-900">Students</h2>
                <p class="mt-1 text-sm text-gray-600">Active: {dataResource.value.tests.length}</p>
              </div>
              {/* Directory list */}
              <nav class="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
                {dataResource.value.tests.map((test: any, index: number) => (
                  <div key={test.user._id} class="relative">
                    <div
                      class="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 hover:bg-gray-100 px-6 py-1 text-sm font-medium text-gray-500 hover:cursor-pointer"
                      onClick$={() => {
                        state.test = test;
                        state.reports = test.reports;
                        state.testOrder = index;
                        profileTabs.active = 'profile';
                      }}
                    >
                      <h3>
                        {test.user.displayName} ・ {test.user.email}
                      </h3>
                    </div>
                  </div>
                ))}
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Test detail',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
