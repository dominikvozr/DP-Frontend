import { component$ } from '@builder.io/qwik';
import { qwikify$ } from '@builder.io/qwik-react';
import StarIcon from '@heroicons/react/20/solid/StarIcon';
import ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import { appUrl } from '~/db/url';

export const ProjectList = component$(() => {
  const QChevronRightIcon = qwikify$(ChevronRightIcon);
  const QStarIcon = qwikify$(StarIcon);
  //const classNames$ = $((...classes: string[]) => classes.filter(Boolean).join(' '));
  const projects = [
    {
      name: 'Workcation',
      href: '#',
      siteHref: '#',
      repoHref: '#',
      repo: 'debbielewis/workcation',
      tech: 'Laravel',
      lastDeploy: '3h ago',
      location: 'United states',
      starred: true,
      active: true,
    },
  ];
  return (
    <>
      {/* Projects List */}
      <div class="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
        <div class="flex items-center">
          <h1 class="flex-1 text-lg font-medium">Projects</h1>
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
                    class={
                      'h-4 w-4 rounded-full flex items-center justify-center ' + project.active
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }
                    aria-hidden="true"
                  >
                    <span
                      class={
                        'h-2 w-2 rounded-full ' + project.active ? 'bg-green-400' : 'bg-gray-400'
                      }
                    />
                  </span>

                  <h2 class="text-sm font-medium">
                    <a href={appUrl + project.href}>
                      <span class="absolute inset-0" aria-hidden="true" />
                      {project.name}{' '}
                      <span class="sr-only">{project.active ? 'Running' : 'Not running'}</span>
                    </a>
                  </h2>
                </div>
                <a
                  href={appUrl + project.repoHref}
                  class="group relative flex items-center space-x-2.5"
                >
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
                    href={appUrl + project.siteHref}
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
                      className={
                        'h-5 w-5 ' + project.starred
                          ? 'text-yellow-300 hover:text-yellow-400'
                          : 'text-gray-300 hover:text-gray-400'
                      }
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <p class="flex space-x-2 text-sm text-gray-500">
                  <span>{project.tech}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>Last deploy {project.lastDeploy}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>{project.location}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
});
