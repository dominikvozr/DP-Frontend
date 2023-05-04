import { component$, useStore, $, useTask$ } from '@builder.io/qwik';
import { TestApi } from '~/db/TestApi';

export interface EvaluationProps {
  test: any;
  exam: any;
}

export const Evaluation = component$<EvaluationProps>((props) => {
  const state = useStore({
    examTests: [] as any,
    message: '',
    loading: false,
    alert: false,
    points: props.test.score.points,
    percentage: (props.test.score.points / props.exam.points) * 100,
  });

  const recalculateScore = $(() => {
    state.points = props.test.score.tests.reduce(
      (acc: number, curr: any) => acc + parseInt(curr.value),
      0,
    );
    props.test.score.points = state.points;
    state.percentage = (state.points / props.exam.points) * 100;
    props.test.score.percentage = state.percentage.toFixed(2);
  });

  useTask$(() => {
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
                  {state.examTests.length}
                </span>
              </p>
            </div>
            <div class="bg-indigo-900 px-4 py-6 sm:px-6 lg:px-8">
              <p class="text-sm font-medium leading-6 text-indigo-400">Total available points</p>
              <p class="mt-2 flex items-baseline gap-x-2 justify-center">
                <span class="text-4xl font-semibold tracking-tight text-white">
                  {state.examTests.reduce((acc: number, curr: any) => acc + curr.points, 0)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 px-4 py-4 w-3/4 mx-auto">
        {props.test.score &&
          props.test.score.tests.map((test: any, index: any) => (
            <div key={index}>
              <label for={index} class="block relative text-sm font-medium leading-6">
                <strong>{index + 1}.</strong> {state.examTests[index].name}
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <input
                  onInput$={(evt: any) => {
                    props.test.score.tests[index].value = parseInt(evt.target.value);
                    props.test.score.tests[index].passed = props.test.score.tests[index].value > 0;
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
                    {state.examTests[index].points}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

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
