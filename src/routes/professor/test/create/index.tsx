import { component$, useStore, $, noSerialize, useSignal } from "@builder.io/qwik"
import { DocumentHead, RequestHandler, useEndpoint, useNavigate } from '@builder.io/qwik-city';
import Header from '~/components/header/header';
import { User } from '~/models/User';
import { UserApi } from '~/db/UserApi';
import { baseUrl } from "~/db/url";
import { TestApi } from "~/db/TestApi";

export const onGet: RequestHandler<User> = async ({ request, response }) => {
	const {user, isAuthorized} = await UserApi.checkAuthorization(request.headers.get('cookie'))
	if (!isAuthorized) {
		throw response.redirect('/login')
	}
  return user
};

export default component$(() => {
    const nav = useNavigate()
    const state = useStore({
        examName: '',
        description: '',
        subject: '',
        startDate: '',
        endDate: '',
        project: '',
        tests: [],
        testsFile: {},
        pipelineId: '',
        templateId: '',
        points: 0
    })
    const loading = useSignal<boolean>(false);

    const handleUpload = $(async(destination: string, file: File) => {
      const data = await TestApi.uploadTestProject(destination, file)
        if (destination === 'project') {
          state.project = data
        } else {
          state.tests = data.matches
          state.testsFile = data.file
        }
    });

  const userResource = useEndpoint<User>()
  return (
	<>
    <div class="relative flex min-h-full flex-col bg-gray-100">
      <Header />
      <div class="mx-auto max-w-screen-xl mt-6 px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div>
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Nový test</h3>
                <p class="mt-1 text-sm text-gray-600">Tieto informácie sa budú zobrazovať verejne, preto si dávajte pozor na to, čo zdieľate.</p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div class="shadow sm:overflow-hidden sm:rounded-md">
                  <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label for="name" class="block text-sm font-medium text-gray-700">Názov testu</label>
                        <input type="text" name="name" id="name"
                          onInput$={(ev: any) => {
                            state.examName = ev.target.value
                          }}
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="subject" class="block text-sm font-medium text-gray-700">Predmet</label>
                        <input type="text" name="subject" id="subject"
                          onInput$={(ev: any) => {
                            state.subject = ev.target.value
                          }}
                          autoComplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                      </div>
                    </div>

                    <div>
                      <label for="description" class="block text-sm font-medium text-gray-700">Popis</label>
                      <div class="mt-1">
                        <textarea id="description" name="description" rows={3}
                          onInput$={(ev: any) => {
                            state.description = ev.target.value
                          }}
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                      </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                      <div class="flex space-x-3 sm:pt-5">
                        <label htmlFor="start-date" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 self-center">
                          Začiatok
                        </label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0 flex-1">
                          <input
                            type="text"
                            name="start-date"
                            placeholder="YYYY-MM-DD HH:MM"
                            onInput$={(ev: any) => {
                              state.startDate = ev.target.value
                            }}
                            id="start-date"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div class="flex space-x-3 sm:pt-5">
                        <label htmlFor="end-date" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 self-center">
                          Koniec
                        </label>
                        <div class="mt-1 sm:col-span-2 sm:mt-0 flex-1">
                          <input
                            type="text"
                            name="end-date"
                            placeholder="YYYY-MM-DD HH:MM"
                            onInput$={(ev: any) => {
                              state.endDate = ev.target.value
                            }}
                            id="end-date"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-6">
                      <div>
                        <label class="block text-sm font-medium text-gray-700">Začiatočný projekt</label>
                        <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                          <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Nahraj projekt (.zip)</span>
                                <div>{state.project && `${state.project.name}`}</div>
                                <input id="file-upload" name="project"
                                  onChange$={(ev: any) => {
                                    handleUpload('project', ev.target.files[0])
                                  }}
                                  type="file" class="sr-only" />
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
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600">
                              <label for="tests" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Nahraj testy</span>
                                <div>{state.tests && `${state.testsFile.name}`}</div>
                                <input id="tests" name="tests"
                                  onInput$={(ev: any) => {
                                    handleUpload('tests', ev.target.files[0])
                                  }}
                                  type="file" class="sr-only" />
                              </label>
                              {/* <p class="pl-1">alebo presuň</p> */}
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
                <p class="mt-1 text-sm text-gray-600">Definujte podrobnosti o programovacom prostredí a druh pipeliny.</p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <div class="overflow-hidden shadow sm:rounded-md">
                <div class="bg-white px-4 py-5 sm:p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2">
                    <div class="flex sm:pt-5">
                      <label for="pipeline" class="block text-sm font-medium text-gray-700 pr-4 sm:mt-px sm:pt-2 self-center">Pipeline</label>
                      <div class="mt-1 sm:mt-0">
                        <select id="pipeline" value={state.pipelineId} name="pipeline" class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                          <option value={1}>United States</option>
                          <option value={2}>Canada</option>
                          <option value={3}>Mexico</option>
                        </select>
                      </div>
                    </div>
                    <div class="flex sm:pt-5">
                      <label for="template" class="block text-sm font-medium text-gray-700 pr-4 sm:mt-px sm:pt-2 self-center">Template</label>
                      <div class="mt-1 sm:mt-0">
                        <select value={state.templateId} id="template" name="template" class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
                          <option value={1}>IntelliJ IDEA</option>
                          <option value={2}>PyCharm</option>
                          <option value={3}>Clion</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        { state.tests.length ? (<>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>
          <div class="mt-10 sm:mt-0">
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Testy</h3>
                  <p class="mt-1 text-sm text-gray-600">Definujte body za jednotlivé testové funkcie.</p>
                </div>
              </div>
              <div class="mt-5 md:col-span-2 md:mt-0">
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="bg-white px-4 py-5 sm:p-6">
                    {
                      state.tests.map((test) => {
                        return (
                          <div class="flex align-middle justify-between space-x-4">
                            <label for="name" class="block text-sm w-72 font-medium text-gray-700 self-center text-md tracking-wider">
                              <span class="text-lg font-bold">{test.id}</span> {test.name}
                            </label>
                            <input type="number" step={0.5} name="name" id="name"
                              onInput$={(ev: any) => {
                                state.tests[test.id - 1].points = parseFloat(ev.target.value)
                              }}
                            class="mt-1 block w-24 flex-end rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                          </div>
                        )
                      })
                    }
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 flex space-x-6 justify-end">
                    <div class="self-center">celkový počet bodov: {state.tests.reduce((acc, obj) => acc + obj.points, 0) || 0}</div>
                    <button
                      type="submit"
                      disabled={loading.value}
                      onClick$={async () => {
                        const response = await TestApi.createTest(state)
                        if(response.message === "success")
                          nav.path = '/professor'
                      }}
                      class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Uložiť test</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>) : null}
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

function useSignal$ (arg0: boolean) {
  throw new Error("Function not implemented.");
}
