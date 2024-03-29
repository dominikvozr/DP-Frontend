/* eslint-disable prettier/prettier */
import { component$, useContext, useStore } from '@builder.io/qwik';
import { ExamModalDataContext } from '~/contexts/contexts';

export const ExamModal = component$(() => {
  const examModalData = useContext(ExamModalDataContext)
  const state = useStore({
    startDate: new Date(examModalData.exam.startDate),
    endDate: new Date(examModalData.exam.endDate),
  })

  return (
    <div class={examModalData.open ? 'block relative z-10 overflow-hidden': 'hidden relative z-10 overflow-hidden'} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class={examModalData.open ? 'opacity-100 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity': 'opacity-0 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'}></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class={examModalData.open ? 'relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 opacity-100 translate-y-0 sm:scale-100': 'relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}>
            <div>
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  class="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  {examModalData.exam.name} - {examModalData.exam.subject}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {examModalData.exam.description}
                  </p>
                  <div class="text-sm text-red-500 py-2 border-t-2">
                    is Open: {examModalData.exam.isOpen ? 'Yes' : 'No'}
                  </div>
                  <div class="text-sm text-gray-500 py-2 border-t-2">
                    Start: {state.startDate.toLocaleDateString()} at {state.startDate.toLocaleTimeString()}
                  </div>
                  <div class="text-sm text-gray-500 py-2 border-t-2">
                    End: {state.endDate.toLocaleDateString()} at {state.endDate.toLocaleTimeString()}
                  </div>
                  <div class="text-sm text-gray-500 py-2 border-t-2">
                    Total points: {examModalData.exam.points}
                  </div>
                  <div class=" text-md text-gray-500 my-2">
                    <div class="self-center">Tests:</div>
                    {examModalData.exam.tests?.map((test: { testsFile: { classname: string, originalname: string | undefined }, tests: { id: number, name: string, points: number }[] }, index: number) => <>
                      <div key={index} class="mt-4">
                        <h2 class="text-sm font-medium bg-gray-50 text-gray-500 border-2 p-2">{test.testsFile?.originalname}</h2>
                        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                          {test.tests.map((test) => <>
                            <li key={test.id} class="col-span-1 flex rounded-md shadow-sm">
                              <div class="flex flex-1 items-center justify-between truncate rounded-l-md border-b border-l border-t border-gray-200 bg-white">
                                <div class="flex-1 truncate px-4 py-2 text-sm">
                                  <p class="font-medium text-gray-900 hover:text-gray-600">
                                    {test.name}
                                  </p>
                                </div>
                              </div>
                              <div class="flex w-16 flex-shrink-0 items-center justify-center text-sm rounded-r-md font-medium text-white bg-indigo-600">
                                {test.points}
                              </div>
                            </li>
                          </>)}
                        </ul>
                      </div>
                    </>)}
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                preventdefault:click
                // eslint-disable-next-line qwik/valid-lexical-scope
                onClick$={() => {
                  examModalData.open = false
                  document.body.classList.remove('fixed', 'w-full')
                }}
                class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
