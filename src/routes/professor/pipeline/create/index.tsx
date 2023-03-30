import { component$, useStore, $, useSignal } from '@builder.io/qwik';
import { DocumentHead, RequestHandler, useNavigate } from '@builder.io/qwik-city';
import { User } from '~/models/User';
import { UserApi } from '~/db/UserApi';
import { PipelineApi } from '~/db/PipelineApi';

export const onGet: RequestHandler<User> = async ({ request, response }) => {
  const { user, isAuthorized } = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!isAuthorized) {
    throw response.redirect('/login');
  }
  return user;
};

export default component$(() => {
  const nav = useNavigate();
  const state = useStore(
    {
      name: '',
      language: '',
      type: '',
      description: '',
      file: {} as any,
    },
    { recursive: true },
  );
  const loading = useSignal<boolean>(false);

  const handleUpload = $(async (file: File) => {
    const data = await PipelineApi.uploadPipeline(file);
    state.file = data;
  });

  const handleCreate = $(async () => {
    const response = await PipelineApi.createPipeline(state);
    if (response.message === 'success') nav.path = '/professor';
  });

  //const userResource = useEndpoint<User>();
  return (
    <>
      <div class="relative flex min-h-full flex-col bg-gray-100">
        <div class="mx-auto max-w-screen-xl mt-6 px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
          <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Nová pipeline</h3>
                  <p class="mt-1 text-sm text-gray-600">
                    Túto pipelinu bude možné použiť pri vytváraní testu. Musí to byť Jenkins
                    pipeline súbor (jenkinsfile). Definujte ju podľa používaného jazyka a
                    buildovacieho nástroja
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
                            Názov pipeliny
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
                          <label for="language" class="block text-sm font-medium text-gray-700">
                            Jazyk
                          </label>
                          <input
                            type="text"
                            name="language"
                            id="language"
                            onInput$={(ev: any) => {
                              state.language = ev.target.value;
                            }}
                            autoComplete="family-name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div class="col-span-6 sm:col-span-3">
                          <label for="type" class="block text-sm font-medium text-gray-700">
                            Typ
                          </label>
                          <input
                            type="text"
                            name="type"
                            id="type"
                            onInput$={(ev: any) => {
                              state.type = ev.target.value;
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

                      <label class="block text-sm font-medium text-gray-700">Pipeline</label>
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
                              <span>Nahraj pipeline (jenkinsfile)</span>
                              <div>{state.file && `${state.file.name}`}</div>
                              <input
                                id="file-upload"
                                name="pipeline"
                                onChange$={(ev: any) => {
                                  handleUpload(ev.target.files[0]);
                                }}
                                type="file"
                                class="sr-only"
                              />
                            </label>
                            {/* <p class="pl-1">alebo presuň</p> */}
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={loading.value}
                        onClick$={handleCreate}
                        class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Uložiť pipelinu
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Pipeline Creation',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
