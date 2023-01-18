import { component$ } from "@builder.io/qwik"
import { DocumentHead } from '@builder.io/qwik-city';
import { AuthApi } from "~/db/AuhtApi";

export default component$(() => {
  return (
	<>
      <div class="flex min-h-full">
        <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div class="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                class="h-12 mx-auto w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
              <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 text-center">Prihlásenie do skúšky</h2>
            </div>
            <div class="mt-8">
              <p class="text-sm font-medium text-gray-700 text-center">Prihlásiť sa cez</p>
              <div class="mt-1 flex justify-center">
                <a
                  href="http://localhost:8000/auth/google"
                  /* preventdefault:click
                  onClick$={async () => {
                    const data = await AuthApi.authenticateWithGoogle()
                    console.log(data);
                  }} */
                  class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-red-600 bg-white py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-500"
                >
                  <span class="sr-only">Prihlásiť sa cez Google</span>
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