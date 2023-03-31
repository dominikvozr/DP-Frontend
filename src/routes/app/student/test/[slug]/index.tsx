import { component$, useContextProvider, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { Test } from '~/models/Test';
import { TestApi } from '~/db/TestApi';
import { Exam } from '~/models/Exam';
import _ from 'lodash';
import { TestClosed } from '~/components/test/testClosed';
import { TestInvitation } from '~/components/test/testInvitation';
import { TestShow } from '~/components/test/testShow';
import { ExamDataContext, TestDataContext } from '~/contexts/contexts';

interface TestData {
  test: Test;
  exam: Exam;
}

export const onGet: RequestHandler<TestData> = async ({ request, params }) => {
  const data = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));
  return { test: data.test, exam: data.exam };
};

export default component$(() => {
  const examState = useStore({
    exam: {} as any,
  });

  const testState = useStore({
    test: {} as any,
  });

  const dataResource = useEndpoint<TestData>();

  useTask$(async () => {
    const data = (await dataResource.value) as any;
    testState.test = data.test;
    examState.exam = data.exam;
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
