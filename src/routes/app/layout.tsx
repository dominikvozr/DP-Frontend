import { component$, Slot, useContextProvider, useStore, useTask$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { Header } from '~/components/header/header';
import { UserDataContext } from '~/contexts/contexts';
import { UserApi } from '~/db/UserApi';
import { User } from '~/models/User';

export const useUserData = routeLoader$(async ({ request }) => {
  const data = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (data.isAuthorized) {
    return { user: data.user, isAuthorized: true };
  }
  return { isAuthorized: false };
});

export default component$(() => {
  const state = useStore({
    user: {} as any,
  });
  const userData = useUserData();
  useTask$(async () => {
    if (!userData.value) return;
    state.user = userData.value.user as User;
  });

  useContextProvider(UserDataContext, state);
  return (
    <>
      <Header user={state.user} />
      <Slot />
      <footer class="bg-indigo-50">
        <div class="mx-auto max-w-7xl overflow-hidden py-10 px-6 sm:py-12 lg:px-8">
          <p class="text-center text-xs leading-5 text-gray-500">
            &copy; 2023 StudentCODE, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
});
