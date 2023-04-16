import { component$, useContextProvider, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { TestApi } from '~/db/TestApi';
import _ from 'lodash';
import { TestClosed } from '~/components/test/testClosed';
import { TestInvitation } from '~/components/test/testInvitation';
import { TestShow } from '~/components/test/testShow';
import { ExamDataContext, TestDataContext } from '~/contexts/contexts';
import {CoderApi} from "~/db/CoderApi";

/* interface TestData {
  test: Test;
  exam: Exam;
}

export const onGet: RequestHandler<TestData> = async ({ request, params }) => {
  const data = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));
  return { test: data.test, exam: data.exam };
}; */

export const useTestData = routeLoader$(async ({ request, params }) => {
  const data = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));

  let link = ''
  if(data?.exam){
    let login = await CoderApi.login(request.headers.get('cookie'))
    // TODO: change response on backend in coder api workspace
    if(login.id){
      // TODO: create post data request
      link = await CoderApi.createWorkspace(data)
    }else{
      login = await CoderApi.createUser(request.headers.get('cookie'))
      if(login.id)
        link = await CoderApi.createWorkspace(data)
    }
  }

  return { test: data?.test, exam: data?.exam, user: data?.user, examLink:link, isAuthorized: data?.isAuthorized };
});

export default component$(() => {
  const examState = useStore({
    exam: {} as any,
  });

  const testState = useStore({
    test: {} as any,
  });

  const dataResource = useTestData();

  useTask$(async () => {
    testState.test = dataResource.value.test;
    examState.exam = dataResource.value.exam;
  });

  useContextProvider(ExamDataContext, examState);
  useContextProvider(TestDataContext, testState);

  return (
    <div class="relative flex min-h-full flex-col bg-indigo-400">
      {/* display test if exist */}
      {!_.isEmpty(testState.test) && <TestShow />}

      {/* display test invite if open */}
      {_.isEmpty(testState.test) && examState.exam.isOpen && <TestInvitation />}

      {/* display a sad image if exam is closed */}
      {_.isEmpty(testState.test) && !examState.exam.isOpen && <TestClosed />}
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Test',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
