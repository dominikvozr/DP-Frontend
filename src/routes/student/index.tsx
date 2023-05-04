/* eslint-disable prettier/prettier */
import { qwikify$ } from '@builder.io/qwik-react';
import { component$, useStore, $ } from '@builder.io/qwik';
import RectangleStackIcon from '@heroicons/react/20/solid/RectangleStackIcon';
import CheckBadgeIcon from '@heroicons/react/20/solid/CheckBadgeIcon';
import { DocumentHead, RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { TestApi } from '~/db/TestApi';
import { TestItem } from '~/components/student/TestItem';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';
import { CoderApi } from '~/db/CoderApi';
import { EventApi } from '~/db/EventApi';
import { dateDifference } from '~/helpers/dateHelper';
import { eventClassMapping } from '~/helpers/eventClassMapping';

export const useTestsData = routeLoader$(async ({ request }) => {
  const data = await TestApi.getTests(request.headers.get('cookie'));
  return { tests: data?.tests, user: data?.user, isAuthorized: data?.isAuthorized };
});

export const useEventsData = routeLoader$(async ({ request }) => {
  const data = await EventApi.getEvents(request.headers.get('cookie'));
  return {
    events: data.events,
  };
});

export const onGet: RequestHandler = async ({ request, redirect, url }) => {
  const slug = url.searchParams.get('test') ?? '';
  if (slug !== '') throw redirect(302, appUrl + 'student/test/' + slug);

  const data = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!data || !data.isAuthorized) {
    throw redirect(302, `${appUrl}login`);
  }
};

export default component$(() => {
  const eventsResource = useEventsData();
  const state = useStore({
    examCode: '',
    events: eventsResource.value.events,
    maxEvents: 8,
  });
  const dataResource = useTestsData();
  const QCheckBadgeIcon = qwikify$(CheckBadgeIcon);
  const QRectangleStackIcon = qwikify$(RectangleStackIcon);
  const nowDate = new Date();
  const getEventClass = $((type: string): string => {
    return eventClassMapping[type] || 'bg-gray-500'; // Fallback to a default class if the type is not found
  });
  return (
    <>
      {/* Background color split screen for large screens */}
      <div class="relative flex min-h-full flex-col">
        {/* 3 column wrapper */}
        <div class="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
          {/* Left sidebar & main wrapper */}
          <div class="min-w-0 flex-1 bg-white xl:flex">
            {/* Account profile */}
            <div class="bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
              <div class="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                <div class="flex items-center justify-between">
                  <div class="flex-1 space-y-8">
                    <div class="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
                      {/* Profile */}
                      <div class="flex items-center space-x-3">
                        <div class="h-12 w-12 flex-shrink-0">
                          {dataResource.value.user && (
                            <img
                              class="h-12 w-12 rounded-full"
                              src={dataResource.value.user.avatarUrl}
                              alt="avatar"
                            />
                          )}
                        </div>
                        <div class="space-y-1">
                          <div class="text-sm font-medium text-gray-900">
                            {dataResource.value.user && dataResource.value.user.displayName}
                          </div>
                          <a href="#" class="group flex items-center space-x-1">
                            <QCheckBadgeIcon
                              className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span class="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                              Student
                            </span>
                          </a>
                        </div>
                      </div>
                      <div class="flex flex-col">
                        <label
                          for="exam_code"
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Exam code
                        </label>
                        <div class="mt-2">
                          <input
                            type="text"
                            name="exam_code"
                            id="exam_code"
                            onInput$={(evt: any) => {
                              if (evt.target) {
                                state.examCode = evt.target.value;
                              }
                            }}
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            placeholder="exam-123"
                          />
                        </div>
                        <a
                          href={`${appUrl}student/test/${state.examCode}`}
                          class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mt-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 xl:w-full"
                        >
                          Join Exam
                        </a>
                      </div>
                    </div>
                    {/* Meta info */}
                    <div class="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                      <div class="flex items-center space-x-2">
                        <QRectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span class="text-sm font-medium text-gray-500">
                          Tests: {dataResource.value.tests?.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div class="bg-white lg:min-w-0 lg:flex-1">
              <div class="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
                <div class="flex items-center">
                  <h1 class="flex-1 text-lg font-medium">Tests</h1>
                </div>
              </div>
              <ul role="list" class="divide-y divide-gray-200 border-b border-gray-200">
                {dataResource.value.tests?.map((test: any) => (
                  <li
                    key={test._id}
                    class="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                  >
                    <TestItem test={test} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Activity feed */}
          <div class="pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
            <div class="pl-4 pr-2 lg:w-96">
              <div class="pt-6 pb-2 flex space-x-1">
                <h2 class="text-sm font-semibold">Activity</h2>
                <span class="relative top-0.5 text-xs text-gray-500">{state.events? `(${state.events.length})`: '(0)'}</span>
              </div>
              <div>
                <ul role="list" class="divide-y divide-gray-200">
                  {state.events &&
                    state.events.map(async (event: any, index: number) => {
                      if (index < state.maxEvents) return (
                        <li
                          key={index}
                          class={`p-4 my-1.5 rounded-lg ${await getEventClass(event.type)}`}
                        >
                          <div class="flex space-x-3">
                            {event.fromUser && (
                              <img
                                class="h-6 w-6 rounded-full self-center"
                                src={event.fromUser.avatarUrl}
                                alt="avatar"
                              />
                            )}
                            <div class="flex-1 flex flex-col justify-center truncate">
                              <div class="flex items-center justify-between">
                                <h3 class="text-sm font-medium truncate">{event.name}</h3>
                                <p class="text-sm text-gray-500">
                                  {dateDifference(nowDate, new Date(event.createdAt))}
                                </p>
                              </div>
                              <p class="text-sm text-gray-500 truncate">{event.description}</p>
                            </div>
                            <div class="flex flex-col">
                              <button
                                class="self-center bg-white px-1.5 my-1 text-sm rounded-lg"
                                onClick$={async () => {
                                  const res: Response | undefined = await EventApi.hideEvent(
                                    event._id,
                                  );
                                  if (res && res.status == 200)
                                    state.events = state.events.filter((evt: any) => evt._id !== event._id)
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="#DC2626"
                                  class="w-5 h-5"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                              {event.link && (
                                <a class="bg-white px-1.5 my-1 text-sm rounded-lg" href={appUrl + event.link}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  {!state.events && (<>
                    no activity :(
                  </>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Student dashboard',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
