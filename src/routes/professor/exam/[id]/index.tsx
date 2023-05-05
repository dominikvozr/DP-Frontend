/* eslint-disable prettier/prettier */
import { component$, useStore, useTask$, useContextProvider } from '@builder.io/qwik';
import { DocumentHead, RequestHandler, routeLoader$, useLocation } from '@builder.io/qwik-city';
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon';
import CommandLineIcon from '@heroicons/react/20/solid/CommandLineIcon';
import { qwikify$ } from '@builder.io/qwik-react';
import { ExamApi } from '~/db/ExamApi';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';
import _ from 'lodash';
import { ExamModal } from '~/components/exam/modal';
import { ExamModalDataContext } from '~/contexts/contexts';
import { ReportApi } from '~/db/ReportApi';
import { Evaluation } from '~/components/professor/evaluation';

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
    replies: {} as any,
    savedHide: [] as any,
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
    })

    if(loc.url.searchParams.has('tab'))
      profileTabs.active = loc.url.searchParams.get('tab') || 'profile'

    state.testOrder = 0;
    state.startDate = new Date(dataResource.value.exam.startDate);
    state.endDate = new Date(dataResource.value.exam.endDate);
  });

  const QChevronLeftIcon = qwikify$(ChevronLeftIcon);
  const QEnvelopeIcon = qwikify$(EnvelopeIcon);
  const QCommandLineIcon = qwikify$(CommandLineIcon);
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
                    <div class={profileTabs.active === 'evaluation'? 'hidden': ''}>
                      <div>
                        <img
                          class="h-32 w-full object-cover lg:h-48"
                          src={profile.coverImageUrl}
                          alt=""
                        />
                      </div>
                      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                          <div class="flex">
                            <img
                              class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                              src={state.test.user.avatarUrl}
                              alt=""
                            />
                          </div>
                          <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                            <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                              <h1 class="truncate text-2xl font-bold text-gray-900">
                                {state.test.user.displayName}
                              </h1>
                            </div>
                            <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                              <a
                                href={`${appUrl}professor/test/${state.test.slug}/evaluation`}
                                type="button"
                                class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                              >
                                <QEnvelopeIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Evaluation</span>
                              </a>
                              <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                              >
                                <QCommandLineIcon
                                  className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span>Open workspace</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                          <h1 class="truncate text-2xl font-bold text-gray-900">
                            {state.test.user.displayName}
                          </h1>
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
                    <Evaluation test={state.test} exam={dataResource.value.exam} />
                  </div>
                  <div class={`p-2 ${profileTabs.active !== 'reports' ? 'hidden' : ''}`}>
                    {state.test.reports && state.test.reports.map((report: any, index: number) => (
                        <>
                          <div key={index} class={`grid grid-cols-12 ${state.savedHide.includes(report._id) ? 'hidden': ''}`}>
                            <div class="col-span-2">{report.message}:</div>
                            <input
                              class="col-span-4"
                              type="text"
                              value={report.value}
                              onInput$={(evt: any) => {
                                if (!evt.target.value) {
                                  delete state.replies[report._id]
                                  return
                                }
                                state.replies[report._id] = evt.target.value;
                              }}
                            />
                          </div>
                        </>
                      )
                    )}
                    { state.test.reports ? (<button
                      type="submit"
                      class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick$={async () => {
                        if (!state.replies.length) return
                        await ReportApi.reply(state.replies, state.test._id);
                        state.savedHide += Object.keys(state.replies)
                      }}
                    >
                      save
                    </button> ): 'no reports :)'}
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
