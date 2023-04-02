import { component$, useTask$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { DocumentHead, RequestHandler, routeLoader$, useNavigate } from '@builder.io/qwik-city';
import { appUrl } from '~/db/url';
import { useUserData } from './layout';
import { UserApi } from '~/db/UserApi';

export const onGet: RequestHandler = async ({ url, request, redirect }) => {
  const data = await UserApi.checkAuthorization(request.headers.get('cookie'));
  if (!data.isAuthorized) redirect(302, `${appUrl}login`);
  else if (url.searchParams.has('test'))
    redirect(302, `${appUrl}student?test=${url.searchParams.get('test')}`);
  else redirect(302, `${appUrl}professor`);
};

export const useStudentData = routeLoader$(async ({ params }) => {
  /* if (url.searchParams.has('test'))
    throw response.redirect(`${appUrl}student?test=${url.searchParams.get('test')}`);
  else throw response.redirect(`${appUrl}professor`); */
  console.log(params);
  return { params };
});

export default component$(() => {
  const userData = useUserData();
  const studentData = useStudentData();
  const useNav = useNavigate();
  useTask$(() => {
    if (isServer) {
      if (!userData.value.isAuthorized) {
        useNav(`${appUrl}login`);
      }
      console.log(studentData.value.params);
    }
  });

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
