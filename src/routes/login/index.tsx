import { component$, useClientEffect$ } from "@builder.io/qwik"
import { DocumentHead, RequestHandler, useLocation } from '@builder.io/qwik-city';
import { Logo } from "~/components/logo/logo";
import { baseUrl } from "~/db/url";
import { UserApi } from "~/db/UserApi";
import { User } from "~/models/User";

export const onGet: RequestHandler<User> = async ({ request, response, url }) => {
	const data = await UserApi.checkAuthorization(request.headers.get('cookie'))

  if(!data.isAuthorized) return

  let redirect = '/professor'
  if (url.searchParams.has('test'))
    redirect =`/student/test/${url.searchParams.get('test')}`

  if (data.isAuthorized)
		throw response.redirect(redirect)
  return data.user
};

export default component$(() => {
  const loc = useLocation()

  useClientEffect$( () => {
    if (loc.query.test && loc.query.test != "null") {
			if (loc.query.test.includes('/')) {
				localStorage.setItem('test', loc.query.test.split('/')[0])
			} else {
				localStorage.setItem('test', loc.query.test)
			}
		}
	})
  return (
	<>
      <div class="flex min-h-full">
        <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div class="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Logo svgClass="w-64" color="#0718c4" />
            </div>
            <div class="mt-1">
              <p class="text-sm font-medium text-gray-700 text-center mb-5">Login with</p>
              <div class="mt-1 flex justify-center">
                <a
                  href={ baseUrl + 'auth/google' }
                  class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-red-600 bg-white py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-500"
                >
                  <span class="sr-only">Login with</span>
                  <img
                    class="mr-1"
                    src="https://storage.googleapis.com/async-await-all/G.svg"
                    alt="Log in with Google"
                    />LOGIN WITH GOOGLE
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </>
  );
});


export const head: DocumentHead = {
	title: 'Login',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};