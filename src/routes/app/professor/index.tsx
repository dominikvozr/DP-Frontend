import { qwikify$ } from '@builder.io/qwik-react';
import { component$ } from '@builder.io/qwik';
import RectangleStackIcon from '@heroicons/react/20/solid/RectangleStackIcon';
import CheckBadgeIcon from '@heroicons/react/20/solid/CheckBadgeIcon';
import { DocumentHead, RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { ExamApi } from '~/db/ExamApi';
import { Exam } from '~/models/Exam';
import { ExamItem } from '~/components/professor/ExamItem';
import { Pagination } from '~/components/pagination/pagination';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';

export const onGet: RequestHandler = async ({ request, redirect }) => {
  const data = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!data || !data.isAuthorized) {
    throw redirect(302, `${appUrl}login`);
  }
};

export const useTestData = routeLoader$(async ({ request, params }) => {
  const data = await ExamApi.getExams(request.headers.get('cookie'), params.page);
  return {
    user: data.user,
    exams: data.exams,
    isAuthorized: data.isAuthorized,
    examsCount: data.examsCount,
    page: parseInt(params.page),
  };
});

export default component$(() => {
  const dataResource = useTestData();
  const QCheckBadgeIcon = qwikify$(CheckBadgeIcon);
  const QRectangleStackIcon = qwikify$(RectangleStackIcon);
  const activityItems = [
    { project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
  ];
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
                            {dataResource.value.user.displayName}
                          </div>
                          <a href="#" class="group flex items-center space-x-1">
                            <QCheckBadgeIcon
                              className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span class="text-sm font-medium text-gray-500 group-hover:text-gray-900">
                              Professor
                            </span>
                          </a>
                        </div>
                      </div>
                      {/* Action buttons */}
                      <div class="flex flex-col sm:flex-row xl:flex-col">
                        <a
                          href={`${appUrl}professor/exam/create`}
                          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:w-full"
                        >
                          New Exam
                        </a>
                        <a
                          href={`${appUrl}professor/pipeline/create`}
                          class="mt-3 inline-flex items-center justify-center rounded-md border border-gray-300 bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
                        >
                          New pipeline
                        </a>
                        <a
                          href={`${appUrl}professor/template/create`}
                          class="mt-3 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
                        >
                          New template
                        </a>
                      </div>
                    </div>
                    {/* Meta info */}
                    <div class="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
                      <div class="flex items-center space-x-2">
                        <QRectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        <span class="text-sm font-medium text-gray-500">
                          Tests: {dataResource.value.examsCount}
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
                {dataResource.value.exams?.map((exam: Exam) => (
                  <li
                    key={exam._id}
                    class="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
                  >
                    <ExamItem exam={exam} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Activity feed */}
          <div class="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
            <div class="pl-6 lg:w-80">
              <div class="pt-6 pb-2">
                <h2 class="text-sm font-semibold">Activity</h2>
              </div>
              <div>
                <ul role="list" class="divide-y divide-gray-200">
                  {activityItems.map((item) => (
                    <li key={item.commit} class="py-4">
                      <div class="flex space-x-3">
                        <img
                          class="h-6 w-6 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
                          alt=""
                        />
                        <div class="flex-1 space-y-1">
                          <div class="flex items-center justify-between">
                            <h3 class="text-sm font-medium">You</h3>
                            <p class="text-sm text-gray-500">{item.time}</p>
                          </div>
                          <p class="text-sm text-gray-500">
                            Deployed {item.project} ({item.commit} in master) to {item.environment}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div class="border-t border-gray-200 py-4 text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-900">
                    View all activity
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-2 pb-4 mx-4">
          <Pagination count={dataResource.value.examsCount} active={dataResource.value.page} />
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Professor dashboard',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};