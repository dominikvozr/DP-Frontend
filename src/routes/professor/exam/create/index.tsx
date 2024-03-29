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
    dateValidationPrompt: '',
    nameValidationPrompt: '',
    projectValidationPrompt: '',
    alert: false,
    loading: false,
    isJson: false,
  });

  const store = useStore({
    jsonContent: '',
    json: ' \
    [ \
      { \
        "id": 1, \
        "name": "", \
        "points": 1, \
      } \
    ]',
  })

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

  useVisibleTask$(() => {
    initTE({ Input, Timepicker, Datepicker });
    const startPicker = document.querySelector('#start-timepicker-format');
    const endPicker = document.querySelector('#end-timepicker-format');
    const datepickerStart = document.querySelector('#start-datepicker');
    const datepickerEnd = document.querySelector('#end-datepicker');
    new Timepicker(startPicker, { format24: true });
    new Timepicker(endPicker, { format24: true });
    new Datepicker(datepickerStart, {
      disablePast: true
    });
    new Datepicker(datepickerEnd, {
      disablePast: true
    });
  });
  const validateName = $(() : boolean => {
    if (state.name.length){
      state.nameValidationPrompt = ''
      return false
    }
    state.nameValidationPrompt = 'Exam Name is required!'
    return true
  })

  const validateProject = $(() : boolean => {
    if (!_.isEmpty(state.project)) {
      state.projectValidationPrompt = ''
      return false
    }
    state.projectValidationPrompt = 'Poject is required!'
    return true
  })

  const validateDates = $((submit: boolean = false) : boolean => {
    if (submit) {
      state.dateValidationPrompt = ''
      if(_.isEmpty(state.startDate))
      state.dateValidationPrompt += 'invalid Date 1'
      if (_.isEmpty(state.startTime))
      state.dateValidationPrompt += ' invalid Time 1'
      if (_.isEmpty(state.endDate))
      state.dateValidationPrompt += ' invalid Date 2'
      if (_.isEmpty(state.endTime))
      state.dateValidationPrompt += ' invalid Time 2'
      if (state.dateValidationPrompt) return true
    }

    // Concatenate date and time strings and convert to Date objects
    const date1 = new Date(state.startDate + " " + state.startTime);
    const date2 = new Date(state.endDate + " " + state.endTime);

    // Get current date
    const now = new Date();

    // Check if date1 is in the past
    if (date1.getTime() < now.getTime()) {
      console.log("date1 must not be from the past");
      state.dateValidationPrompt = 'date1 must not be from the past'
      return true;
    }

    // Add 10 minutes (10*60*1000 milliseconds) to date1
    const minDelay = new Date(date1.getTime() + 10 * 60 * 1000);

    // Check if date2 is at least 10 minutes after date1
    if (date2.getTime() < minDelay.getTime()) {
      console.log("date2 must be at least 5 minutes after date1");
      state.dateValidationPrompt = 'date2 must be at least 10 minutes after date1'
      return true;
    }

    console.log("Both dates are valid");
    state.dateValidationPrompt = ''
    return false;
  })

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
                      <div class={`bg-white mx-4 px-2 relative text-center text-red-600 text-sm top-[36px] ${state.nameValidationPrompt !== '' ? 'inline-block' : 'hidden'}`}>
                        {state.nameValidationPrompt}
                      </div>
                        <div class={`grid grid-cols-6 gap-6 ${state.nameValidationPrompt !== '' ? 'border border-red-600 p-2.5' : ''}`}>
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
                              validateName()
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
                      <div class={`bg-white mx-4 px-2 relative text-center text-red-600 text-sm top-[36px] ${state.dateValidationPrompt !== '' ? 'inline-block': 'hidden' }`}>
                        {state.dateValidationPrompt}
                      </div>
                      <div class={`grid grid-cols-2 gap-6 ${state.dateValidationPrompt !== '' ? 'border border-red-600 p-2.5' : ''}`}>
                        <div class="flex space-x-3 sm:pt-5">
                          <label
                            for="start-date"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 self-center"
                          >
                            Začiatok
                          </label>
                          <div class="mt-1 sm:col-span-2 sm:mt-0 flex-1">
                            <div
                              id='start-datepicker'
                              class="relative mb-3"
                              data-te-datepicker-init
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                placeholder="Select a date"
                                onInput$={(ev: any) => {
                                  state.startDate = ev.target.value;
                                  validateDates()
                                }}
                              />
                              <label
                                for="floatingInput"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
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
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                data-te-toggle="timepicker"
                                id="form14"
                                onInput$={(ev: any) => {
                                  state.startTime = convertToGMT(ev.target.value);
                                  validateDates()
                                }}
                              />
                              <label
                                for="form14"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
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
                              id='end-datepicker'
                              class="relative mb-3"
                              data-te-datepicker-init
                              data-te-input-wrapper-init
                            >
                              <input
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                placeholder="Select a date"
                                onInput$={(ev: any) => {
                                  state.endDate = ev.target.value;
                                  validateDates()
                                }}
                              />
                              <label
                                for="floatingInput"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
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
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                data-te-toggle="timepicker"
                                onInput$={(ev: any) => {
                                  state.endTime = convertToGMT(ev.target.value);
                                  validateDates()
                                }}
                                id="form14"
                              />
                              <label
                                for="form14"
                                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
                              >
                                Select a time
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class={`bg-white mx-4 px-2 relative text-center text-red-600 text-sm top-[36px] ${state.projectValidationPrompt !== '' ? 'inline-block' : 'hidden'}`}>
                        {state.projectValidationPrompt}
                      </div>
                      <div class={`grid grid-cols-2 gap-6 ${state.projectValidationPrompt !== '' ? 'border border-red-600 p-2.5' : ''}`}>
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
                                  <div>{state.project.originalname && `${state.project.originalname}`}</div>
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
                                      validateProject()
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
                                  <ul>
                                    {state.tests ? state.tests.map((tt: any) => (
                                      <li key={tt.classname}>{tt.testsFile.originalname} </li>
                                    )) : ''}
                                  </ul>
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
                                      for (const file of data.files) {
                                        const d = file.testsFile.originalname.split('.')
                                        if( d[1] !== 'java' )
                                          state.isJson = true
                                      }
                                      store.jsonContent = JSON.stringify(data.files)
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

          {!state.isJson && state.tests.length
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
                        {index === 0 &&
                          <div class="flex align-middle justify-between space-x-4">
                              <label for="name" class="block text-sm w-72 font-medium text-gray-700 self-center text-md tracking-wider">
                                All
                              </label>
                              <input
                                type="number"
                                step={0.5}
                                name="name"
                                id="name"
                                onInput$={(ev: any) => {
                                  const num = parseFloat(ev.target.value);
                                  state.points = 0
                                  state.tests = state.tests.map((tsts: {testsFile: object, tests: object[]}) => {
                                    const tts = tsts.tests.map((test: any) => {
                                      test.points = num
                                      state.points += num
                                      return test
                                    })
                                    return {testsFile: tsts.testsFile, tests: tts}
                                  });
                                }}
                                class="mt-1 block w-24 flex-end rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                          }
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
                                    value={state.tests[index].tests[idx].points}
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
            : null }

          {state.isJson && state.tests.length ?
            <div>
              Tests are unrecognized. System is optimized only for Java Maven projects. Example below is JSON object for one test case. Add as many test cases as you need to "tests" array. Name of each testcase must be valid and included in right testsFile object!
              <label for="comment" class="block text-sm font-medium leading-6 text-gray-900">JSON - add this example to "tests" array - example = {store.json}</label>
              <div class="mt-2">
                <textarea rows={4} name="comment" id="comment" onInput$={(evt: any) => {
                  store.jsonContent = evt.target.value;
                }} value={store.jsonContent} class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>
          : null}
          <div class="hidden sm:block" aria-hidden="true">
            <div class="py-5">
              <div class="border-t border-gray-200"></div>
            </div>
          </div>

          { state.isJson || state.tests.length ? (
            <>
              <div class="bg-gray-50 flex flex-col justify-center px-4 py-3 sm:px-6 space-x-6 text-right">
                <div class="self-center">celkový počet bodov: {state.points}</div>
                <button
                  type="submit"
                  disabled={loading.value}
                  onClick$={async () => {
                    state.loading = true;
                    if ( await validateName() ||  await validateProject() || await validateDates(true)) {
                      window.scrollTo(0, 0);
                      state.loading = false;
                      return
                    }
                    if (state.isJson) {
                      try {
                        state.tests = JSON.parse(store.jsonContent)
                      } catch (error) {
                        console.log('json not valid');
                        state.loading = false;
                        return
                      }
                    }
                    const res: any = await ExamApi.createExam(state);
                    state.loading = false;
                    if (res.status === 200) {
                      state.alert = true;
                      window.location = `${appUrl}professor` as any
                    }
                    if (res.message === 'success') window.location = `${appUrl}professor` as any;
                  }}
                  class={`${state.loading ? 'hidden' : 'block'
                    } inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  Uložiť test
                </button>
                <div
                  class={`${state.loading ? 'block' : 'hidden'
                    } inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
                  role="status"
                >
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
                <div
                  class={`${state.alert ? 'block' : 'hidden'
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
