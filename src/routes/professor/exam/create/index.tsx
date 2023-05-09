/* eslint-disable prettier/prettier */
import { component$, useStore, $, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import {
  DocumentHead,
  RequestHandler,
  routeAction$,
  routeLoader$,
} from '@builder.io/qwik-city';
import _ from 'lodash';
import { ExamApi } from '~/db/ExamApi';
import { PipelineApi } from '~/db/PipelineApi';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';
import { Pipeline } from '~/models/Pipeline';
import { Input, Datepicker, Timepicker, initTE } from 'tw-elements';

export const onGet: RequestHandler = async ({ redirect, request }) => {
  const { isAuthorized } = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!isAuthorized) {
    redirect(302, `${appUrl}login`);
  }
};

export const usePipelinesData = routeLoader$(async ({ request }) => {
  const { pipelines, isAuthorized } = await PipelineApi.getPipelinesData(
    request.headers.get('cookie'),
  );
  return { pipelines, isAuthorized };
});

export const useHandleCreate = routeAction$(async (state: any) => await ExamApi.createExam(state));

export function convertToGMT(inputTime: string): string {
  const [hours, minutes] = inputTime.split(':').map(Number);

  const now = new Date();
  const dateString = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
  ).toUTCString();

  return dateString.substring(dateString.indexOf(':') - 2, dateString.lastIndexOf(':'));
}

export default component$(() => {
  const state = useStore({
    name: '',
    description: '',
    subject: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    project: {} as any,
    tests: [] as any,
    pipeline: '',
    mainFile: '',
    templateId: '6cc010ee-6a4b-4e44-8e5b-9de913643975',
    points: 0,
    workSpaceCPU: 2,
    workSpaceMemory: 2,
    workSpaceDisk: 2,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const loading = useSignal<boolean>(false);
  const recalculatePoints = $(() => {
    state.points = 0
    for (const test of state.tests) {
      state.points += test.tests.reduce((acc: any, obj: any) => acc + (obj.points ? obj.points : 0), 0) || 0;
    }
  });

  const pipelinesData = usePipelinesData();

  useTask$(async () => {
    state.pipeline = !_.isEmpty(pipelinesData.value.pipelines)
      ? pipelinesData.value.pipelines[0]._id
      : '';
  });

  useVisibleTask$(async () => {
    initTE({ Input, Timepicker, Datepicker });
    const startPicker = document.querySelector('#start-timepicker-format');
    const endPicker = document.querySelector('#end-timepicker-format');
    new Timepicker(startPicker, { format24: true });
    new Timepicker(endPicker, { format24: true });
  });

  return (
    <>
      <div class="relative flex min-h-full flex-col bg-gray-100">
        <div class="mx-auto max-w-screen-xl mt-6 px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Nový test</h3>
                  <p class="mt-1 text-sm text-gray-600">
                    Tieto informácie sa budú zobrazovať verejne, preto si dávajte pozor na to, čo
                    zdieľate.
                  </p>
                </div>
              </div>
              <div class="mt-5 md:col-span-2 md:mt-0">
                <form action="#" method="POST">
                  <div class="shadow sm:overflow-hidden sm:rounded-md">
                    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div class="grid grid-cols-6 gap-6">
                        <div class="col-span-6 sm:col-span-3">
                          <label for="name" class="block text-sm font-medium text-gray-700">
                            Názov testu
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onInput$={(ev: any) => {
                              state.name = ev.target.value;
                            }}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="subject" class="block text-sm font-medium text-gray-700">
                            Predmet
                          </label>
                          <input
                            type="text"
                            name="subject"
                            id="subject"
                            onInput$={(ev: any) => {
                              state.subject = ev.target.value;
                            }}
                            autoComplete="family-name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">
                          Popis
                        </label>
                        <div class="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            onInput$={(ev: any) => {
                              state.description = ev.target.value;
                            }}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          ></textarea>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-6">
                        <div class="flex space-x-3 sm:pt-5">
                          <label
                            for="start-date"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 self-center"
                          >
                            Začiatok
                          </label>
                          <div class="mt-1 sm:col-span-2 sm:mt-0 flex-1">
                            <div
                              class="relative mb-3"
                              data-te-datepicker-init
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                placeholder="Select a date"
                                onInput$={(ev: any) => {
                                  console.log(ev.target.value);
                                  state.startDate = ev.target.value;
                                }}
                              />
                              <label
                                for="floatingInput"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                              >
                                Select a date
                              </label>
                            </div>
                            <div
                              class="relative"
                              data-te-format24="true"
                              id="start-timepicker-format"
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                data-te-toggle="timepicker"
                                id="form14"
                                onInput$={(ev: any) => {
                                  console.log(convertToGMT(ev.target.value));
                                  state.startTime = convertToGMT(ev.target.value);
                                }}
                              />
                              <label
                                for="form14"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                              >
                                Select a time
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="flex space-x-3 sm:pt-5">
                          <label
                            for="end-date"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 self-center"
                          >
                            Koniec
                          </label>
                          <div class="mt-1 sm:col-span-2 sm:mt-0 flex-1">
                            <div
                              class="relative mb-3"
                              data-te-datepicker-init
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                placeholder="Select a date"
                                onInput$={(ev: any) => {
                                  console.log(ev.target.value);
                                  state.endDate = ev.target.value;
                                }}
                              />
                              <label
                                for="floatingInput"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                              >
                                Select a date
                              </label>
                            </div>
                            <div
                              class="relative"
                              data-te-format24="true"
                              id="end-timepicker-format"
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                data-te-toggle="timepicker"
                                onInput$={(ev: any) => {
                                  console.log(convertToGMT(ev.target.value));
                                  state.endTime = convertToGMT(ev.target.value);
                                }}
                                id="form14"
                              />
                              <label
                                for="form14"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                              >
                                Select a time
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="grid grid-cols-2 gap-6">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">
                            Začiatočný projekt
                          </label>
                          <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div class="space-y-1 text-center">
                              <svg
                                class="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <div class="flex text-sm text-gray-600">
                                <label
                                  for="file-upload"
                                  class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Nahraj projekt (.zip)</span>
                                  <div>{state.project && `${state.project.originalname}`}</div>
                                  <input
                                    id="file-upload"
                                    name="project"
                                    accept=".zip"
                                    onChange$={async (ev: any) => {
                                      const data = await ExamApi.uploadExamProject(
                                        'project',
                                        ev.target.files,
                                      );
                                      state.project = data;
                                    }}
                                    type="file"
                                    class="sr-only"
                                  />
                                </label>
                                {/* <p class="pl-1">alebo presuň</p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Testy</label>
                          <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div class="space-y-1 text-center">
                              <svg
                                class="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              <div class="flex text-sm text-gray-600">
                                <label
                                  for="tests"
                                  class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Nahraj testy</span>
                                  <div>{state.tests ? state.tests.map((tt: any) => {
                                    `${tt.originalname} `
                                  }) : ''}</div>
                                  <input
                                    id="tests"
                                    name="tests"
                                    multiple
                                    onInput$={async (ev: any) => {
                                      const data = await ExamApi.uploadExamProject(
                                        'tests',
                                        ev.target.files,
                                      );
                                      state.tests = data.files;
                                    }}
                                    type="file"
                                    class="sr-only"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Prostredie</h3>
                  <p class="mt-1 text-sm text-gray-600">
                    Definujte podrobnosti o programovacom prostredí a druh pipeliny.
                  </p>
                </div>
              </div>
              <div class="mt-5 md:col-span-2 md:mt-0">
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="bg-white px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2">
                      <div class="flex sm:pt-5">
                        <label
                          for="pipeline"
                          class="block text-sm font-medium text-gray-700 pr-4 sm:mt-px sm:pt-2 self-center"
                        >
                          Pipeline
                        </label>
                        <div class="mt-1 sm:mt-0">
                          <select
                            id="pipeline"
                            onChange$={(evt) => {
                              state.pipeline = evt.target.value;
                            }}
                            name="pipeline"
                            class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          >
                            {state.pipeline}
                            {pipelinesData.value.pipelines?.map((pipeline: Pipeline) => {
                              return (
                                <option
                                  key={pipeline ? pipeline._id : ''}
                                  value={pipeline ? pipeline._id : ''}
                                  selected={pipeline && state.pipeline === pipeline._id}
                                >
                                  {pipeline && pipeline.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div class="flex sm:pt-5">
                        <label
                          for="template"
                          class="block text-sm font-medium text-gray-700 pr-4 sm:mt-px sm:pt-2 self-center"
                        >
                          Template
                        </label>
                        <div class="mt-1 sm:mt-0">
                          <select
                            onChange$={(evt) => {
                              state.templateId = evt.target.value;
                            }}
                            id="template"
                            name="template"
                            class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          >
                            <option
                              value="6aa4e225-9fa5-4c03-aa7c-f393ea7a110b"
                              selected={state.templateId === '6aa4e225-9fa5-4c03-aa7c-f393ea7a110b'}
                            >
                              default
                            </option>
                            <option
                              value="6cc010ee-6a4b-4e44-8e5b-9de913643975"
                              selected={state.templateId === '6cc010ee-6a4b-4e44-8e5b-9de913643975'}
                            >
                              main
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-white px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2">
                      <div class="flex sm:pt-5">
                        <label
                          for="workSpaceCPU"
                          class="block text-sm font-medium text-gray-700 pr-4 sm:mt-px sm:pt-2 self-center"
                        >
                          Veľkosť CPU (GB)
                        </label>
                        <div class="mt-1 sm:mt-0">
                          <select
                            onChange$={(evt) => {
                              state.workSpaceCPU = Number(evt.target.value);
                            }}
                            id="template"
                            name="template"
                            class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          >
                            <option value="2" selected={state.workSpaceCPU === 2}>
                              2
                            </option>
                            <option value="4" selected={state.workSpaceCPU === 4}>
                              4
                            </option>
                            <option value="6" selected={state.workSpaceCPU === 6}>
                              6
                            </option>
                            <option value="8" selected={state.workSpaceCPU === 8}>
                              8
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="flex sm:pt-5">
                        <label
                          for="workSpaceCPU"
                          class="block text-sm font-medium text-gray-700 pr-4 sm:mt-px sm:pt-2 self-center"
                        >
                          Veľkosť RAM (GB)
                        </label>
                        <div class="mt-1 sm:mt-0">
                          <select
                            onChange$={(evt) => {
                              state.workSpaceMemory = Number(evt.target.value);
                            }}
                            id="template"
                            name="template"
                            class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                          >
                            <option value="2" selected={state.workSpaceMemory === 2}>
                              2
                            </option>
                            <option value="4" selected={state.workSpaceMemory === 4}>
                              4
                            </option>
                            <option value="6" selected={state.workSpaceMemory === 6}>
                              6
                            </option>
                            <option value="8" selected={state.workSpaceMemory === 8}>
                              8
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="flex mt-12 justify-end">
                        <label
                          for="workSpaceDisk"
                          class="block mt-2 text-sm w-72 font-medium text-gray-700 self-center sm:mt-px text-md tracking-wider"
                        >
                          Veľkosť disku (GB)
                        </label>
                        <input
                          type="number"
                          step={1}
                          min={1}
                          max={9999}
                          name="workSpaceDisk"
                          id="workSpaceDisk"
                          onInput$={(ev: any) => {
                            if (ev.target.value < 1) {
                              ev.target.value = undefined;
                            }
                            state.workSpaceDisk = Number(ev.target.value);
                          }}
                          class="mt-1 block w-48 flex-end rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {state.tests.length
            ? state.tests.map((testsFile: { testsFile: any; tests: any }, index: number) => (
                <>
                  <div class="hidden sm:block" aria-hidden="true">
                    <div class="py-5">
                      <div class="border-t border-gray-200"></div>
                    </div>
                  </div>
                  <div class="mt-10 sm:mt-0">
                    <div class="md:grid md:grid-cols-3 md:gap-6">
                      <div class="md:col-span-1">
                        <div class="px-4 sm:px-0">
                          <h3 class="text-lg font-medium leading-6 text-gray-900">
                            Testy - {testsFile.testsFile.originalname}
                          </h3>
                          <p class="mt-1 text-sm text-gray-600">
                            Definujte body za jednotlivé testové funkcie.
                          </p>
                        </div>
                      </div>
                      <div class="mt-5 md:col-span-2 md:mt-0">
                        <div class="overflow-hidden shadow sm:rounded-md">
                          <div class="bg-white px-4 py-5 sm:p-6">
                            {testsFile.tests?.map((exam: any, idx: number) => {
                              return (
                                <div
                                  key={exam._id}
                                  class="flex align-middle justify-between space-x-4"
                                >
                                  <label
                                    for="name"
                                    class="block text-sm w-72 font-medium text-gray-700 self-center text-md tracking-wider"
                                  >
                                    <span class="text-lg font-bold">{exam.id}</span> {exam.name}
                                  </label>
                                  <input
                                    type="number"
                                    step={0.5}
                                    name="name"
                                    id="name"
                                    onInput$={(ev: any) => {
                                      state.tests[index].tests[idx].points = parseFloat(
                                        ev.target.value,
                                      );
                                      recalculatePoints();
                                    }}
                                    class="mt-1 block w-24 flex-end rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            : null}
          {state.tests.length ? (
            <>
              <div class="bg-gray-50 flex flex-col justify-center px-4 py-3 sm:px-6 space-x-6 text-right">
                <div class="self-center">celkový počet bodov: {state.points}</div>
                <button
                  type="submit"
                  disabled={loading.value}
                  onClick$={async () => {
                    //const { value } = await handleCreate.run(state);
                    const res = await ExamApi.createExam(state);
                    if (res.message === 'success') window.location = `${appUrl}professor` as any;
                  }}
                  class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Uložiť test
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Test Creation',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
