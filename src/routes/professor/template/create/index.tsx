import { qwikify$ } from '@builder.io/qwik-react';
import { component$ } from "@builder.io/qwik"
import StarIcon from '@heroicons/react/20/solid/StarIcon'
import RectangleStackIcon from '@heroicons/react/20/solid/RectangleStackIcon'
import CheckBadgeIcon from '@heroicons/react/20/solid/CheckBadgeIcon'
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon'
import { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	const QCheckBadgeIcon = qwikify$(CheckBadgeIcon)
	const QChevronRightIcon = qwikify$(ChevronRightIcon)
	const QRectangleStackIcon = qwikify$(RectangleStackIcon)
	const QStarIcon = qwikify$(StarIcon)
  return (
	<>
    <div class="relative flex min-h-full flex-col bg-gray-100">
      <div class="mx-auto max-w-screen-xl mt-6 px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
        <div>
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Template</h3>
                <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div class="shadow sm:overflow-hidden sm:rounded-md">
                  <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                      <input type="text" name="name" id="name" autoComplete="given-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="display-name" class="block text-sm font-medium text-gray-700">Display name</label>
                      <input type="text" name="display-name" id="display-name" autoComplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                  </div>

                    {/* <div class="grid grid-cols-3 gap-6">
                      <div class="col-span-3 sm:col-span-2">
                        <label for="company-website" class="block text-sm font-medium text-gray-700">Website</label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                          <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">http://</span>
                          <input type="text" name="company-website" id="company-website" class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="www.example.com" />
                        </div>
                      </div>
                    </div> */}

                    <div>
                      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                      <div class="mt-1">
                        <textarea id="description" name="description" rows={3} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700">Icon</label>
                      <div class="mt-1 flex items-center">
                        <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                          <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        <button type="button" class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Change</button>
                      </div>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700">Template file</label>
                      <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div class="space-y-1 text-center">
                          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          <div class="flex text-sm text-gray-600">
                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                              <span>Upload a template file</span>
                              <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                            </label>
                            <p class="pl-1">or drag and drop</p>
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
                <h3 class="text-lg font-medium leading-6 text-gray-900">Other</h3>
                <p class="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="bg-white px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                      <button type="button" class="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" role="switch" aria-checked="false" aria-labelledby="annual-billing-label">
                        <span aria-hidden="true" class="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                      </button>
                      <span class="ml-3" id="annual-billing-label">
                        <span class="text-sm font-medium text-gray-900">Allow user cancel workspace jobs</span>
                      </span>
                    </div>
                    <div class="col-span-6 sm:col-span-3 mt-6">
                      <label for="display-name" class="block text-sm font-medium text-gray-700">Default TTL (ms)</label>
                      <input type="text" name="display-name" id="display-name" autoComplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Create</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
              <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <p class="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
              </div>
            </div>
            <div class="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div class="overflow-hidden shadow sm:rounded-md">
                  <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <fieldset>
                      <legend class="sr-only">By Email</legend>
                      <div class="text-base font-medium text-gray-900" aria-hidden="true">By Email</div>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="comments" class="font-medium text-gray-700">Comments</label>
                            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                            <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex h-5 items-center">
                            <input id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="offers" class="font-medium text-gray-700">Offers</label>
                            <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend class="contents text-base font-medium text-gray-900">Push Notifications</legend>
                      <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-center">
                          <input id="push-everything" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">Everything</label>
                        </div>
                        <div class="flex items-center">
                          <input id="push-email" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">Same as email</label>
                        </div>
                        <div class="flex items-center">
                          <input id="push-nothing" name="push-notifications" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">No push notifications</label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div> */}
      </div>
    </div>
	</>
  );
});

export const head: DocumentHead = {
	title: 'Create Template',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};