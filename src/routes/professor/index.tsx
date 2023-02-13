import { qwikify$ } from '@builder.io/qwik-react';
import { component$, useTask$, useStore } from "@builder.io/qwik"
import StarIcon from '@heroicons/react/20/solid/StarIcon'
import RectangleStackIcon from '@heroicons/react/20/solid/RectangleStackIcon'
import CheckBadgeIcon from '@heroicons/react/20/solid/CheckBadgeIcon'
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon'
import { DocumentHead, RequestHandler, useEndpoint } from '@builder.io/qwik-city';
import Header from '~/components/header/header';
import { User } from '~/models/User';
import { UserApi } from '~/db/UserApi';

export const onGet: RequestHandler<User> = async ({ request, response }) => {
	const {user, isAuthorized} = await UserApi.checkAuthorization(request.headers.get('cookie'))
	if (!isAuthorized) {
		throw response.redirect('/login')
	}
  return user
};

export default component$(() => {
  const state = useStore({
    user: {}
  })
  const userResource = useEndpoint<User>()
	const QCheckBadgeIcon = qwikify$(CheckBadgeIcon)
	const QChevronRightIcon = qwikify$(ChevronRightIcon)
	const QRectangleStackIcon = qwikify$(RectangleStackIcon)
	const QStarIcon = qwikify$(StarIcon)

  useTask$(async () => {
    state.user = await userResource.value as User
  });


	const projects = [
		{
      id: 1,
			name: 'VSA exam 2023',
			href: '/professor/test/1',
			siteHref: 'workspace/1',
			repoHref: 'repository/1',
			repo: 'B-API/vsa_exam_2023',
			tech: 'Java',
			lastDeploy: '21. march at 14:00',
			location: 'Open',
			starred: true,
			active: true,
		},
	]
	const activityItems = [
		{ project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
	]
  return (
	<>
		{/* Background color split screen for large screens */}
		<div class="fixed top-0 left-0 h-full w-1/2 bg-white" aria-hidden="true"></div>
		<div class="fixed top-0 right-0 h-full w-1/2 bg-gray-50" aria-hidden="true"></div>
		<div class="relative flex min-h-full flex-col">
		<Header />
			{/* 3 column wrapper */}
			<div class="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
				{/* Left sidebar & main wrapper */}
				<div class="min-w-0 flex-1 bg-white xl:flex">
					{/* Account profile */}
					<div class="bg-white xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-gray-200">
						<div class="py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
							<div class="flex items-center justify-between">
								<div class="flex-1 space-y-8">
									<div class="space-y-8 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-8">
										{/* Profile */}
										<div class="flex items-center space-x-3">
											<div class="h-12 w-12 flex-shrink-0">
												<img
													class="h-12 w-12 rounded-full"
													src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
													alt=""
												/>
											</div>
											<div class="space-y-1">
												<div class="text-sm font-medium text-gray-900">{state.user.displayName}</div>
												<a href="#" class="group flex items-center space-x-1">
													<QCheckBadgeIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
													<span class="text-sm font-medium text-gray-500 group-hover:text-gray-900">
														Professor
													</span>
												</a>
											</div>
										</div>
										{/* Action buttons */}
										<div class="flex flex-col sm:flex-row xl:flex-col">
											<a
												href="/professor/test/create"
												class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 xl:w-full"
											>
												New Test
											</a>
											<a
												href="/professor/template/create"
												class="mt-3 inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
											>
												New template
											</a>
										</div>
									</div>
									{/* Meta info */}
									<div class="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
										<div class="flex items-center space-x-2">
											<QRectangleStackIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
											<span class="text-sm font-medium text-gray-500">Tests: 1</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Projects List */}
					<div class="bg-white lg:min-w-0 lg:flex-1">
						<div class="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
							<div class="flex items-center">
								<h1 class="flex-1 text-lg font-medium">Tests</h1>
							</div>
						</div>
						<ul role="list" class="divide-y divide-gray-200 border-b border-gray-200">
							{projects.map((project) => (
								<li
									key={project.repo}
									class="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
								>
									<div class="flex items-center justify-between space-x-4">
										{/* Repo name and link */}
										<div class="min-w-0 space-y-3">
											<div class="flex items-center space-x-3">
												<span
                          class={{
                            'bg-green-100': project.active,
                            'bg-gray-100': !project.active,
                            "h-4 w-4 rounded-full flex items-center justify-center": true,
                          }}
													aria-hidden="true"
												>
													<span
                            class={{
                              'bg-green-400': project.active,
                              'bg-gray-400': !project.active,
                              "h-2 w-2 rounded-full": true,
                            }}
													/>
												</span>

												<h2 class="text-sm font-medium">
													<a href={project.href}>
														<span class="absolute inset-0" aria-hidden="true" />
														{project.name}{' '}
														<span class="sr-only">{project.active ? 'Running' : 'Not running'}</span>
													</a>
												</h2>
											</div>
											<a href={project.repoHref} class="group relative flex items-center space-x-2.5">
												<svg
													class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
													viewBox="0 0 18 18"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
												>
													<path
														fillRule="evenodd"
														clipRule="evenodd"
														d="M8.99917 0C4.02996 0 0 4.02545 0 8.99143C0 12.9639 2.57853 16.3336 6.15489 17.5225C6.60518 17.6053 6.76927 17.3277 6.76927 17.0892C6.76927 16.8762 6.76153 16.3104 6.75711 15.5603C4.25372 16.1034 3.72553 14.3548 3.72553 14.3548C3.31612 13.316 2.72605 13.0395 2.72605 13.0395C1.9089 12.482 2.78793 12.4931 2.78793 12.4931C3.69127 12.5565 4.16643 13.4198 4.16643 13.4198C4.96921 14.7936 6.27312 14.3968 6.78584 14.1666C6.86761 13.5859 7.10022 13.1896 7.35713 12.965C5.35873 12.7381 3.25756 11.9665 3.25756 8.52116C3.25756 7.53978 3.6084 6.73667 4.18411 6.10854C4.09129 5.88114 3.78244 4.96654 4.27251 3.72904C4.27251 3.72904 5.02778 3.48728 6.74717 4.65082C7.46487 4.45101 8.23506 4.35165 9.00028 4.34779C9.76494 4.35165 10.5346 4.45101 11.2534 4.65082C12.9717 3.48728 13.7258 3.72904 13.7258 3.72904C14.217 4.96654 13.9082 5.88114 13.8159 6.10854C14.3927 6.73667 14.7408 7.53978 14.7408 8.52116C14.7408 11.9753 12.6363 12.7354 10.6318 12.9578C10.9545 13.2355 11.2423 13.7841 11.2423 14.6231C11.2423 15.8247 11.2313 16.7945 11.2313 17.0892C11.2313 17.3299 11.3937 17.6097 11.8501 17.522C15.4237 16.3303 18 12.9628 18 8.99143C18 4.02545 13.97 0 8.99917 0Z"
														fill="currentcolor"
													/>
												</svg>
												<span class="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
													{project.repo}
												</span>
											</a>
										</div>
										<div class="sm:hidden">
											<QChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
										</div>
										{/* Repo meta info */}
										<div class="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
											<div class="flex items-center space-x-4">
												<a
													href={project.siteHref}
													class="relative text-sm font-medium text-gray-500 hover:text-gray-900"
												>
													Visit site
												</a>
												<button
													type="button"
													class="relative rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
												>
													<span class="sr-only">
														{project.starred ? 'Add to favorites' : 'Remove from favorites'}
													</span>
													<QStarIcon
														className={ project.starred
																? 'text-yellow-300 hover:text-yellow-400 h-5 w-5'
																: 'text-gray-300 hover:text-gray-400 h-5 w-5'
														}
														aria-hidden="true"
													/>
												</button>
											</div>
											<p class="flex space-x-2 text-sm text-gray-500">
												<span>{project.tech}</span>
												<span aria-hidden="true">&middot;</span>
												<span>{project.lastDeploy}</span>
												{/* <span aria-hidden="true">&middot;</span>
												<span>{project.location}</span> */}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				{/* Activity feed */}
				<div class="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
					<div class="pl-6 lg:w-80">
						<div class="pt-6 pb-2">
							<h2 class="text-sm font-semibold">Activity</h2>
						</div>
						<div>
							<ul role="list" class="divide-y divide-gray-200">
								{activityItems.map((item) => (
									<li key={item.commit} class="py-4">
										<div class="flex space-x-3">
											<img
												class="h-6 w-6 rounded-full"
												src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&h=256&q=80"
												alt=""
											/>
											<div class="flex-1 space-y-1">
												<div class="flex items-center justify-between">
													<h3 class="text-sm font-medium">You</h3>
													<p class="text-sm text-gray-500">{item.time}</p>
												</div>
												<p class="text-sm text-gray-500">
													Deployed {item.project} ({item.commit} in master) to {item.environment}
												</p>
											</div>
										</div>
									</li>
								))}
							</ul>
							<div class="border-t border-gray-200 py-4 text-sm">
								<a href="#" class="font-semibold text-indigo-600 hover:text-indigo-900">
									View all activity
									<span aria-hidden="true"> &rarr;</span>
								</a>
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
	title: 'Professor dashboard',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};

function useStore$ (arg0: { user: {}; }) {
  throw new Error('Function not implemented.');
}
