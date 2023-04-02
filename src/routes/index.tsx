import { component$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';

export const onGet: RequestHandler = async ({ url, request, redirect }) => {
  const data = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!data.isAuthorized) redirect(302, `${appUrl}login`);
  else if (url.searchParams.has('test'))
    redirect(302, `${appUrl}student?test=${url.searchParams.get('test')}`);
  else redirect(302, `${appUrl}professor`);
};

export default component$(() => {
  return <>:)</>;
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
