import { component$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { UserApi } from '~/db/UserApi';
import { User } from '~/models/User';

export const onGet: RequestHandler<User> = async ({ url, request, response }) => {
	const data = await UserApi.checkAuthorization(request.headers.get('cookie'))
	if (!data.isAuthorized)
		throw response.redirect('/login')
  else if (url.searchParams.has('test'))
    throw response.redirect(`/student?test=${url.searchParams.get('test')}`);
  else
    throw response.redirect('/professor');
};

export default component$(() => {
  return (
    <>
				:)
		</>
  );
});

export const head: DocumentHead = {
  title: 'Who are you?',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
