import { component$, Slot, useContextProvider, useResource$, useStore, useTask$ } from '@builder.io/qwik';
import { RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { Header } from '~/components/header/header';
import { UserDataContext } from '~/contexts/contexts';
import { UserApi } from '~/db/UserApi';
import { User } from '~/models/User';

interface UserData {
  user: User,
}

export const onGet: RequestHandler<UserData> = async ({ request, response }) => {
	const data = await UserApi.checkAuthorization(request.headers.get('cookie'))
  return { user: data.user }
};

export default component$(() => {
  const state = useStore({
    user: {} as User
  });
  const userResource = useEndpoint<UserData>()

  useTask$(async () => {
    const data = await userResource.value as UserData
    if (!data) return
    //console.log(data.exams);

    state.user = data.user as User
  });

  useContextProvider(UserDataContext, state);
  return (
    <>
      <Header />
      <Slot />
      <footer class="bg-indigo-50">
        <div class="mx-auto max-w-7xl overflow-hidden py-10 px-6 sm:py-12 lg:px-8">
          <p class="text-center text-xs leading-5 text-gray-500">&copy; 2023 StudentCODE, Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
});
