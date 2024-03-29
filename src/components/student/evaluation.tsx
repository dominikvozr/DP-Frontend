import { component$, useOnDocument, useSignal, useStore, useTask$, $ } from '@builder.io/qwik';
import _ from 'lodash';
import { ReportApi } from '~/db/ReportApi';

export interface EvaluationProps {
  test: any;
  exam: any;
  user: any;
}

export const Evaluation = component$<EvaluationProps>((props) => {
  const state = useStore({
    examTests: [] as { fileName: object; tests: object[] }[],
    showGit: false,
    message: '',
    loading: false,
    alert: false,
    reports: props.test.reports as object[],
  });
  const message = useSignal<Element>();

  useTask$(() => {
    state.examTests = props.exam.tests;
  });

  useOnDocument(
    'DOMContentLoaded',
    $(() => {
      if (message.value) {
        message.value.scrollTop = message.value.scrollHeight;
      }
    }),
  );

  return (
    <>
      <div class="bg-white px-6 pt-24 pb-12 sm:pt-32 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-4xl font-bold tracking-tight text-blue-900 sm:text-6xl">
            {props.exam.name}
          </h2>
          <p class="mt-6 text-lg leading-8 text-blue-600">{props.exam.description}</p>
          <button
            type="button"
            disabled={state.showGit}
            onClick$={() => {
              state.showGit = true;
              setTimeout(() => {
                state.showGit = false;
              }, 5000);
            }}
            class="disabled:bg-gray-500 disabled:scale-90 transition inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <svg
              class="-ml-0.5 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M4.209 4.603c-.247 0-.525.02-.84.088c-.333.07-1.28.283-2.054 1.027C-.403 7.25.035 9.685.089 10.052c.065.446.263 1.687 1.21 2.768c1.749 2.141 5.513 2.092 5.513 2.092s.462 1.103 1.168 2.119c.955 1.263 1.936 2.248 2.89 2.367c2.406 0 7.212-.004 7.212-.004s.458.004 1.08-.394c.535-.324 1.013-.893 1.013-.893s.492-.527 1.18-1.73c.21-.37.385-.729.538-1.068c0 0 2.107-4.471 2.107-8.823c-.042-1.318-.367-1.55-.443-1.627c-.156-.156-.366-.153-.366-.153s-4.475.252-6.792.306c-.508.011-1.012.023-1.512.027v4.474l-.634-.301c0-1.39-.004-4.17-.004-4.17c-1.107.016-3.405-.084-3.405-.084s-5.399-.27-5.987-.324c-.187-.011-.401-.032-.648-.032zm.354 1.832h.111s.271 2.269.6 3.597C5.549 11.147 6.22 13 6.22 13s-.996-.119-1.641-.348c-.99-.324-1.409-.714-1.409-.714s-.73-.511-1.096-1.52C1.444 8.73 2.021 7.7 2.021 7.7s.32-.859 1.47-1.145c.395-.106.863-.12 1.072-.12zm8.33 2.554c.26.003.509.127.509.127l.868.422l-.529 1.075a.686.686 0 0 0-.614.359a.685.685 0 0 0 .072.756l-.939 1.924a.69.69 0 0 0-.66.527a.687.687 0 0 0 .347.763a.686.686 0 0 0 .867-.206a.688.688 0 0 0-.069-.882l.916-1.874a.667.667 0 0 0 .237-.02a.657.657 0 0 0 .271-.137a8.826 8.826 0 0 1 1.016.512a.761.761 0 0 1 .286.282c.073.21-.073.569-.073.569c-.087.29-.702 1.55-.702 1.55a.692.692 0 0 0-.676.477a.681.681 0 1 0 1.157-.252c.073-.141.141-.282.214-.431c.19-.397.515-1.16.515-1.16c.035-.066.218-.394.103-.814c-.095-.435-.48-.638-.48-.638c-.467-.301-1.116-.58-1.116-.58s0-.156-.042-.27a.688.688 0 0 0-.148-.241l.516-1.062l2.89 1.401s.48.218.583.619c.073.282-.019.534-.069.657c-.24.587-2.1 4.317-2.1 4.317s-.232.554-.748.588a1.065 1.065 0 0 1-.393-.045l-.202-.08l-4.31-2.1s-.417-.218-.49-.596c-.083-.31.104-.691.104-.691l2.073-4.272s.183-.37.466-.497a.855.855 0 0 1 .35-.077z"
              />
            </svg>
            Clone GIT repozitory command
          </button>
        </div>
        {state.showGit && (
          <>
            <div class="animate-[show-up-clock_350ms_linear] bg-blue-600 border-2 border-blue-900 mt-4 py-1.5 text-gray-100 text-xs text-center">{`git clone http://${props.user.gitea.accessToken.sha1}@bawix.xyz:81/gitea/${props.user.gitea.username}/${props.test.slug}-student.git`}</div>
          </>
        )}
      </div>
      <div class="bg-blue-900">
        <div class="mx-auto max-w-7xl text-center">
          <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            <div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-blue-400">Total points</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {props.test.score.points}
                </span>
              </p>
            </div>
            <div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-blue-400">Success rate</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {props.test.score.percentage?.toFixed(2)}%
                </span>
              </p>
            </div>
            <div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-blue-400">Number of test cases</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {_.sum(state.examTests.map((ts) => ts.tests.length))}
                </span>
              </p>
            </div>
            <div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-blue-400">Total available points</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {props.exam.points}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {props.test.score?.tests.map(
        (
          testFile: {
            file: string;
            tests: {
              name: string;
              classname: string;
              failure: string;
              value: number;
              passed: boolean;
            }[];
          },
          idx: number,
        ) => (
          <>
            <div class="m-2 bg-gray-50">
              <div class="px-6 pt-6 pb-2 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                  <h2 class="text-lg font-bold tracking-tight text-gray-900">{testFile.file}</h2>
                  {/* <p class="mt-6 text-lg leading-8 text-gray-600">{props.exam.description}</p> */}
                </div>
              </div>
              <div key={idx} class="grid grid-cols-4 gap-4 p-4 w-3/4 mx-auto">
                {testFile.tests.map((test, index: number) => {
                  if (test.passed) {
                    return (
                      <div key={index}>
                        <label
                          for={index.toString()}
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          <strong>{index + 1}.</strong> {test.name}
                        </label>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="number"
                            disabled
                            name={index.toString()}
                            id={index.toString()}
                            class="block w-full rounded-md border-0 py-1.5 pr-10 text-green-900 ring-1 ring-inset ring-green-300 placeholder:text-green-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                            value={test.value}
                            aria-invalid="true"
                            aria-describedby="email-error"
                          />
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                              class="h-5 w-5 text-green-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <label
                          for={index.toString()}
                          class="block text-sm font-medium leading-6 text-gray-900"
                        >
                          <strong>{index + 1}.</strong> {test.name}
                        </label>
                        <span></span>
                        <div class="relative mt-2 rounded-md shadow-sm">
                          <input
                            type="number"
                            disabled
                            name={index.toString()}
                            id={index.toString()}
                            class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                            value={test.value}
                            aria-invalid="true"
                            aria-describedby="email-error"
                          />
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg
                              class="h-5 w-5 text-red-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </>
        ),
      )}
      <div class={`${props.test.reports.length ? '' : 'hidden'}`}>
        <div class="bg-white px-6 py-3 lg:px-8">
          <div class="mx-auto max-w-2xl text-center">
            <h2 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Reports</h2>
          </div>
        </div>
        <div class="w-[450px] h-[35rem] mx-auto px-5 flex flex-col justify-between">
          <div ref={message} class="flex flex-col h-full mt-5 overflow-y-auto">
            {state.reports &&
              state.reports.map((report: any) => (
                <>
                  <div class="flex justify-end mb-4">
                    <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      {report.message}
                    </div>
                    <img
                      src={props.user.avatarUrl}
                      class="object-cover h-8 w-8 rounded-full border border-blue-600"
                      alt=""
                    />
                  </div>
                  <div class={`flex justify-start mb-4 ${report.response ? '' : 'hidden'}`}>
                    <img
                      src={props.test.exam.user.avatarUrl}
                      class="object-cover h-8 w-8 rounded-full border border-indigo-600"
                      alt=""
                    />
                    <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                      {report.response}
                    </div>
                  </div>
                </>
              ))}
          </div>
          <div class="py-5">
            <input
              class="w-full bg-gray-50 py-5 px-3 rounded-xl"
              type="text"
              onInput$={(evt: any) => {
                state.message = evt.target.value;
              }}
              value={state.message}
              placeholder="type your message here..."
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center mb-4">
        <button
          class={`${
            !state.loading ? 'block' : 'hidden'
          } inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 mt-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-36`}
          onClick$={async () => {
            state.loading = true;
            const result: any = await ReportApi.createReport({
              testId: props.test._id,
              message: state.message,
            });
            if (result.status === 200) {
              state.alert = true;
              state.loading = false;
              state.reports.push({
                message: state.message,
              });
              state.message = '';
              setTimeout(() => {
                state.alert = false;
              }, 3000);
            }
          }}
        >
          Send
        </button>
        <div
          class={`${
            state.loading ? 'block' : 'hidden'
          } inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
        <div
          class={`${
            state.alert ? 'block' : 'hidden'
          } fixed bottom-10 right-10 rounded-md bg-green-50 p-4`}
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">Message sent successfully</h3>
              <div class="mt-4">
                <div class="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    onClick$={() => {
                      state.alert = false;
                    }}
                    class="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
