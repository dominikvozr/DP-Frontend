/* eslint-disable prettier/prettier */
import { component$, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead, RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';
import _ from 'lodash';
import { TestApi } from '~/db/TestApi';
import { ReportApi } from '~/db/ReportApi';

export const onGet: RequestHandler = async ({ redirect, request }) => {
	const { isAuthorized } = await UserApi.checkAuthorization(request.headers.get('cookie'));
	if (!isAuthorized) {
		redirect(302, `${appUrl}login`);
	}
};

//RouteLoaders
export const useTestData = routeLoader$(async ({ request, params }) => {
	const data: any = await TestApi.getTestByExamSlug(params.slug, request.headers.get('cookie'));
	const startDate = new Date(data.exam.startDate);
	const endDate = new Date(data.exam.endDate);
	const currentDate = new Date();
	if (startDate <= currentDate && currentDate <= endDate) {
		data.exam.isOpen = true;
	}
	return { test: data?.test, exam: data?.exam, user: data?.user, isAuthorized: data?.isAuthorized };
});

export default component$(() => {
	const state = useStore({
		examTests: [],
		message: '',
		loading: false,
		alert: false,
	});
	const dataResource = useTestData();
	useTask$(() => {
		state.examTests = dataResource.value.exam.tests
	})

	return (
		<>
			<div class="bg-white px-6 pt-24 pb-12 sm:pt-32 lg:px-8">
				<div class="mx-auto max-w-2xl text-center">
					<h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{dataResource.value.exam.name}</h2>
					<p class="mt-6 text-lg leading-8 text-gray-600">{dataResource.value.exam.description}</p>
				</div>
			</div>
			<div class="bg-blue-900">
				<div class="mx-auto max-w-7xl text-center">
					<div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
						<div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
							<p class="text-sm font-medium leading-6 text-blue-400">Total points</p>
							<p class="mt-2 flex items-baseline gap-x-2 justify-center">
								<span class="text-4xl font-semibold tracking-tight text-white">{dataResource.value.test.score.points}</span>
							</p>
						</div>
						<div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
							<p class="text-sm font-medium leading-6 text-blue-400">Success rate</p>
							<p class="mt-2 flex items-baseline gap-x-2 justify-center">
								<span class="text-4xl font-semibold tracking-tight text-white">{dataResource.value.test.score.percentage}%</span>
							</p>
						</div>
						<div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
							<p class="text-sm font-medium leading-6 text-blue-400">Number of test cases</p>
							<p class="mt-2 flex items-baseline gap-x-2 justify-center">
								<span class="text-4xl font-semibold tracking-tight text-white">{state.examTests.length}</span>
							</p>
						</div>
						<div class="bg-blue-900 px-4 py-6 sm:px-6 lg:px-8">
							<p class="text-sm font-medium leading-6 text-blue-400">Total available points</p>
							<p class="mt-2 flex items-baseline gap-x-2 justify-center">
								<span class="text-4xl font-semibold tracking-tight text-white">{state.examTests.reduce((acc, curr) => acc + curr.points, 0)}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-4 gap-4 px-4 py-4 w-3/4 mx-auto">
				{dataResource.value.test.score && dataResource.value.test.score.tests.map((test: any, index: any) => {
					if(test.passed) {
						return (
							<div key={index}>
								<label for={index} class="block text-sm font-medium leading-6 text-gray-900">
									<strong>{index + 1}.</strong> {state.examTests[index].name}
								</label>
								<div class="relative mt-2 rounded-md shadow-sm">
								<input type="number" disabled name={index} id={index} class="block w-full rounded-md border-0 py-1.5 pr-10 text-green-900 ring-1 ring-inset ring-green-300 placeholder:text-green-300 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6" value={test.value} aria-invalid="true" aria-describedby="email-error" />
									<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
										<svg class="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
										</svg>
									</div>
								</div>
							</div>
						)
					} else {
							return (
								<div key={index}>
									<label for={index} class="block text-sm font-medium leading-6 text-gray-900">
										<strong>{index + 1}.</strong> {state.examTests[index].name}
									</label>
									<div class="relative mt-2 rounded-md shadow-sm">
										<input type="number" disabled name={index} id={index} class="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" value={test.value} aria-invalid="true" aria-describedby="email-error" />
										<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
											<svg class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
												<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
											</svg>
										</div>
									</div>
								</div>
							)
						}
					}
				)}
			</div>
			<div class={`${dataResource.value.test.reports.length ? '' : 'hidden'}`}>
				<div class="bg-white px-6 py-3 lg:px-8">
					<div class="mx-auto max-w-2xl text-center">
						<h2 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Resolved reviews</h2>
					</div>
				</div>
				{
					dataResource.value.test.reports && dataResource.value.test.reports.map((report: any, index: number) => {
						if(!report.isOpen) {
							return (
								<>
									<div key={index} class="lg:col-span-2 mx-auto lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
										<div class="lg:pr-4">
											<div class="lg:max-w-lg">
												<div class="flex">
													<span class="text-sm">{dataResource.value.user.displayName}</span>
													<h3 class="mt-2 text-xl font-bold tracking-tight text-gray-900">{report.message}</h3>
												</div>
												<div class="flex relative">
													<span class="text-sm absolute right-2">{dataResource.value.test.exam.user.displayName}</span>
													<p class="mt-6 text-lg leading-8 text-gray-700">{report.response}</p>
												</div>
											</div>
										</div>
									</div>
									<hr />
								</>
							)
						}
					})
				}
			</div>
			<div class="bg-white px-6 py-3 lg:px-8">
				<div class="mx-auto max-w-2xl text-center">
					<h2 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Review my test</h2>
				</div>
			</div>
			<div class="mx-auto max-w-2xl text-center">
				<label for="comment" class="block text-sm font-medium leading-6 text-gray-900">Add your comment</label>
				<div class="mt-2">
					<textarea onInput$={(evt: any) => {
						state.message = evt.target.value
					}} rows={4} name="comment" id="comment" placeholder="I need to check test case number 1 because..." class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"></textarea>
				</div>
			</div>
			<div class="flex justify-center mb-4">
				<button
					class={`${!state.loading ? 'block' : 'hidden'} inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 mt-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-36`}
					onClick$={async() => {
						state.loading = true
						const result = await ReportApi.createReport({ testId: dataResource.value.test._id, message: state.message })
						state.loading = false
						if (result.status === 200) {
							state.alert = true
						}
					}}
				>
					Report
				</button>
				<div
					class={`${state.loading? 'block' : 'hidden'} inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
					role="status">
					<span
						class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
					>Loading...</span>
				</div>
				<div class={`${state.alert ? 'block' : 'hidden'} fixed bottom-10 right-10 rounded-md bg-green-50 p-4`}>
					<div class="flex">
						<div class="flex-shrink-0">
							<svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-green-800">Message sent successfully</h3>
							<div class="mt-4">
								<div class="-mx-2 -my-1.5 flex">
									<button type="button" onClick$={() => {state.alert = false}} class="ml-3 rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">close</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'Test detail',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};
