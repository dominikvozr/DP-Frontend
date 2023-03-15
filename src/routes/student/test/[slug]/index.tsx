// import { qwikify$ } from '@builder.io/qwik-react';
import { component$, useContextProvider, useStore, useTask$ } from "@builder.io/qwik"
/* import StarIcon from '@heroicons/react/20/solid/StarIcon'
import RectangleStackIcon from '@heroicons/react/20/solid/RectangleStackIcon'
import CheckBadgeIcon from '@heroicons/react/20/solid/CheckBadgeIcon'
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon' */
import { DocumentHead, RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import { Test } from '~/models/Test';
import { TestApi } from '~/db/TestApi';
import { Exam } from "~/models/Exam";
import _ from "lodash";
import { TestClosed } from "~/components/test/testClosed";
import { TestInvitation } from "~/components/test/testInvitation";
import { TestShow } from "~/components/test/testShow";
import { ExamDataContext, TestDataContext } from "~/contexts/contexts";

interface TestData {
  test: Test,
  exam: Exam,
}

export const onGet: RequestHandler<TestData> = async ({ request, response, params }) => {
  const data = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'))
  return { test: data.test, exam: data.exam }
};

export default component$(() => {
  const examState = useStore({
    exam: {} as Exam
  });

  const testState = useStore({
    test: {} as Test
  });



  const dataResource = useEndpoint<TestData>()
	/* const QCheckBadgeIcon = qwikify$(CheckBadgeIcon)
	const QChevronRightIcon = qwikify$(ChevronRightIcon)
	const QRectangleStackIcon = qwikify$(RectangleStackIcon)
	const QStarIcon = qwikify$(StarIcon) */

  useTask$(async () => {
    const data = await dataResource.value as TestData
    testState.test = data.test
    examState.exam = data.exam
  });

  useContextProvider(ExamDataContext, examState)
  useContextProvider(TestDataContext, testState)

  return (
		<div class="relative flex min-h-full flex-col bg-indigo-400">
      {/* display test if exist */}
      { !_.isEmpty(testState.test) && ( <TestShow /> )}

      {/* display test invite if open */}
      { _.isEmpty(testState.test) && examState.exam.isOpen && ( <TestInvitation /> )}

      {/* display a sad image if exam is closed */}
      { _.isEmpty(testState.test) && !examState.exam.isOpen && ( <TestClosed /> )}
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