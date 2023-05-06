/* eslint-disable prettier/prettier */
import { component$, useStore, $, useTask$, useVisibleTask$, useSignal } from '@builder.io/qwik';
import _ from 'lodash';
import { TestApi } from '~/db/TestApi';

export interface EvaluationProps {
  test: any;
  exam: any;
  user: any;
}

interface ScoreTests {
  file: string,
  tests: {
    name: string,
    classname: string,
    failure: string,
    value: number
  }[]
}

export const Evaluation = component$<EvaluationProps>((props) => {
  const state = useStore({
    examTests: [] as any,
    displayTests: [] as ScoreTests[],
    message: '',
    loading: false,
    alert: false,
    points: props.test.score?.points || 0,
    percentage: ((props.test.score?.points / props.exam.points) * 100) || 0,
  });

  const recalculateScore = $(() => {
    state.points = _.sum(props.test.score.tests.map((tts: ScoreTests) => tts.tests.reduce(
      (acc: number, curr) => acc + (curr.value || 0),
      0,
    ))) || 0
    props.test.score.points = state.points;
    state.percentage = (state.points / props.exam.points) * 100;
    props.test.score.percentage = state.percentage.toFixed(2);
  });

  const copyableRef = useSignal<HTMLElement>();
  useVisibleTask$(({ cleanup }) => {
    if (copyableRef.value) {
      // Use the DOM API to add an event listener.
      const copy = () =>
        window.navigator.clipboard.writeText(copyableRef.value?.dataset.link || '');

      copyableRef.value!.addEventListener('click', copy);
      cleanup(() => {
        copyableRef.value!.removeEventListener('click', copy);
      });
    }
  });

  useTask$(() => {
    state.displayTests = props.test.score.tests
    state.examTests = props.exam.tests;
  });

  return (
    <>
      <div class="bg-white px-6 py-12 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {props.exam.name}
          </h2>
          <p class="mt-6 text-lg leading-8 text-gray-600">{props.exam.description}</p>
          <button
            type="button"
            ref={copyableRef}
            data-link={`git clone http://${props.user.gitea.accessToken.sha1}@bawix.xyz:81/gitea/${props.user.gitea.username}/${props.test.slug}.git`}
            class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <svg class="-ml-0.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="#fff" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#fff"
                d="M4.209 4.603c-.247 0-.525.02-.84.088c-.333.07-1.28.283-2.054 1.027C-.403 7.25.035 9.685.089 10.052c.065.446.263 1.687 1.21 2.768c1.749 2.141 5.513 2.092 5.513 2.092s.462 1.103 1.168 2.119c.955 1.263 1.936 2.248 2.89 2.367c2.406 0 7.212-.004 7.212-.004s.458.004 1.08-.394c.535-.324 1.013-.893 1.013-.893s.492-.527 1.18-1.73c.21-.37.385-.729.538-1.068c0 0 2.107-4.471 2.107-8.823c-.042-1.318-.367-1.55-.443-1.627c-.156-.156-.366-.153-.366-.153s-4.475.252-6.792.306c-.508.011-1.012.023-1.512.027v4.474l-.634-.301c0-1.39-.004-4.17-.004-4.17c-1.107.016-3.405-.084-3.405-.084s-5.399-.27-5.987-.324c-.187-.011-.401-.032-.648-.032zm.354 1.832h.111s.271 2.269.6 3.597C5.549 11.147 6.22 13 6.22 13s-.996-.119-1.641-.348c-.99-.324-1.409-.714-1.409-.714s-.73-.511-1.096-1.52C1.444 8.73 2.021 7.7 2.021 7.7s.32-.859 1.47-1.145c.395-.106.863-.12 1.072-.12zm8.33 2.554c.26.003.509.127.509.127l.868.422l-.529 1.075a.686.686 0 0 0-.614.359a.685.685 0 0 0 .072.756l-.939 1.924a.69.69 0 0 0-.66.527a.687.687 0 0 0 .347.763a.686.686 0 0 0 .867-.206a.688.688 0 0 0-.069-.882l.916-1.874a.667.667 0 0 0 .237-.02a.657.657 0 0 0 .271-.137a8.826 8.826 0 0 1 1.016.512a.761.761 0 0 1 .286.282c.073.21-.073.569-.073.569c-.087.29-.702 1.55-.702 1.55a.692.692 0 0 0-.676.477a.681.681 0 1 0 1.157-.252c.073-.141.141-.282.214-.431c.19-.397.515-1.16.515-1.16c.035-.066.218-.394.103-.814c-.095-.435-.48-.638-.48-.638c-.467-.301-1.116-.58-1.116-.58s0-.156-.042-.27a.688.688 0 0 0-.148-.241l.516-1.062l2.89 1.401s.48.218.583.619c.073.282-.019.534-.069.657c-.24.587-2.1 4.317-2.1 4.317s-.232.554-.748.588a1.065 1.065 0 0 1-.393-.045l-.202-.08l-4.31-2.1s-.417-.218-.49-.596c-.083-.31.104-.691.104-.691l2.073-4.272s.183-.37.466-.497a.855.855 0 0 1 .35-.077z"
              />
            </svg>
            copy clone GIT repozitory command
          </button>
        </div>
      </div>
      <div class="bg-indigo-900">
        <div class="mx-auto max-w-7xl text-center">
          <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            <div class="bg-indigo-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-indigo-400">Total points</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">{state.points}</span>
              </p>
            </div>
            <div class="bg-indigo-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-indigo-400">Success rate</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {state.percentage.toFixed(2)}%
                </span>
              </p>
            </div>
            <div class="bg-indigo-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-indigo-400">Number of test cases</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {_.sum(state.displayTests.map((ts) => ts.tests.length))}
                </span>
              </p>
            </div>
            <div class="bg-indigo-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-indigo-400">Total available points</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {props.exam.points}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {state.displayTests?.map((testFile, idx: number) =>
      <>
        <div class="m-2 bg-gray-50">
          <div class="px-6 pt-6 pb-2 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
              <h2 class="text-lg font-bold tracking-tight text-gray-900">{testFile.file}</h2>
              {/* <p class="mt-6 text-lg leading-8 text-gray-600">{dataResource.value.exam.description}</p> */}
            </div>
          </div>
          <div key={idx} class="grid grid-cols-4 gap-4 p-4 w-3/4 mx-auto">
            {testFile.tests.map((test: { name: string, classname: string, failure: string, value: number }, index: any) => (
            <div key={index}>
              <label for={index} class="block relative text-sm font-medium leading-6">
                <strong>{index + 1}.</strong> {test.name}
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <input
                  onInput$={(evt: any) => {
                    props.test.score.tests[idx].tests[index].value = parseInt(evt.target.value);
                    props.test.score.tests[idx].tests[index].passed = props.test.score.tests[idx].tests[index].value > 0;
                    recalculateScore();
                  }}
                  type="number"
                  name={index}
                  id={index}
                  class="block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  value={test.value}
                  aria-invalid="true"
                  aria-describedby="email-error"
                />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span class="absolute px-2 text-sm bg-indigo-300 rounded-full text-white right-2">
                    {props.exam.tests[idx].tests[index].points}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>)}
      <div class="flex justify-center mb-4">
        <button
          class={`${
            !state.loading ? 'block' : 'hidden'
          } inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 mt-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-36`}
          onClick$={async () => {
            state.loading = true;
            const result: any = await TestApi.updateTestResults(props.test);
            state.loading = false;
            if (result.status === 200) {
              state.alert = true;
            }
          }}
        >
          Save
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
              <h3 class="text-sm font-medium text-green-800">Evaluation saved</h3>
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
