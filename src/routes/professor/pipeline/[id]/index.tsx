import { component$ } from "@builder.io/qwik"
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon'
import EnvelopeIcon from '@heroicons/react/20/solid/EnvelopeIcon'
import MagnifyingGlassIcon from '@heroicons/react/20/solid/MagnifyingGlassIcon'
import CommandLineIcon from '@heroicons/react/20/solid/CommandLineIcon'
import { qwikify$ } from "@builder.io/qwik-react";

export default component$(() => {
const location = useLocation();

const QChevronLeftIcon = qwikify$(ChevronLeftIcon)
const QEnvelopeIcon = qwikify$(EnvelopeIcon)
const QMagnifyingGlassIcon = qwikify$(MagnifyingGlassIcon)
const QCommandLineIcon = qwikify$(CommandLineIcon)

const tabs = [
  { name: 'Profile', href: '#', current: true },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Recognition', href: '#', current: false },
]
const profile = {
  name: 'Ricardo Cooper',
  imageUrl:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  coverImageUrl:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: '(555) 123-4567',
    Email: 'ricardocooper@example.com',
    Title: 'Senior Front-End Developer',
    Team: 'Product Development',
    Location: 'San Francisco',
    Sits: 'Oasis, 4th floor',
    Salary: '$145,000',
    Birthday: 'June 8, 1990',
  },
}
const directory = {
  A: [
    {
      id: 1,
      active: true,
      name: 'Leslie Abbott',
      role: '98241',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 2,
      active: true,
      name: 'Hector Adams',
      role: '98221',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 3,
      active: false,
      name: 'Blake Alexander',
      role: '98412',
      imageUrl:
        'https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 4,
      active: true,
      name: 'Fabricio Andrews',
      role: '99231',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  B: [
    {
      id: 5,
      active: true,
      name: 'Angela Beaver',
      role: '94345',
      imageUrl:
        'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 6,
      active: true,
      name: 'Yvette Blanchard',
      role: '100571',
      imageUrl:
        'https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 7,
      active: false,
      name: 'Lawrence Brooks',
      role: '99622',
      imageUrl:
        'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  C: [
    {
      id: 8,
      active: true,
      name: 'Jeffrey Clark',
      role: 'Senior Art Director',
      imageUrl:
        'https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 9,
      active: true,
      name: 'Kathryn Cooper',
      role: 'Associate Creative Director',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  E: [
    {
      id: 10,
      active: false,
      name: 'Alicia Edwards',
      role: 'Junior Copywriter',
      imageUrl:
        'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 11,
      active: true,
      name: 'Benjamin Emerson',
      role: 'Director, Print Operations',
      imageUrl:
        'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 12,
      active: true,
      name: 'Jillian Erics',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 13,
      active: true,
      name: 'Chelsea Evans',
      role: 'Human Resources Manager',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  G: [
    {
      id: 14,
      active: true,
      name: 'Michael Gillard',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 15,
      active: true,
      name: 'Dries Giuessepe',
      role: 'Manager, Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  M: [
    {
      id: 16,
      active: true,
      name: 'Jenny Harrison',
      role: 'Studio Artist',
      imageUrl:
        'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 17,
      active: false,
      name: 'Lindsay Hatley',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 18,
      active: true,
      name: 'Anna Hill',
      role: 'Partner, Creative',
      imageUrl:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  S: [
    {
      id: 19,
      active: true,
      name: 'Courtney Samuels',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 20,
      active: true,
      name: 'Tom Simpson',
      role: 'Director, Product Development',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  T: [
    {
      id: 21,
      active: false,
      name: 'Floyd Thompson',
      role: 'Principal Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 22,
      active: true,
      name: 'Leonard Timmons',
      role: 'Senior Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 23,
      active: true,
      name: 'Whitney Trudeau',
      role: 'Copywriter',
      imageUrl:
        'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  W: [
    {
      id: 24,
      active: true,
      name: 'Kristin Watson',
      role: 'VP, Human Resources',
      imageUrl:
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: 25,
      active: false,
      name: 'Emily Wilson',
      role: 'VP, User Experience',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  Y: [
    {
      id: 26,
      active: true,
      name: 'Emma Young',
      role: 'Senior Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
}
  return (
    <>
      <div class="flex h-full">
        <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div class="py-2 min-w-0 border-b border-indigo-800 bg-indigo-600">
            <nav class="flex px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
                <a href="/professor" class="inline-flex items-center space-x-3 text-sm font-medium text-gray-900">
                  <QChevronLeftIcon className="-ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </a>
                <h1 class="truncate self-center ml-5 text-2xl text-center font-bold text-indigo-200">Test VSA</h1>
              </nav>
            </div>
          <div class="relative z-0 flex flex-1 overflow-hidden">
            <main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Breadcrumb */}
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img class="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt="" />
                  </div>
                  <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div class="flex">
                        <img
                          class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile.imageUrl}
                          alt=""
                        />
                      </div>
                      <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                          <h1 class="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
                        </div>
                        <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          <button
                            type="button"
                            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                          >
                            <QEnvelopeIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Message</span>
                          </button>
                          <button
                            type="button"
                            class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                          >
                            <QCommandLineIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Open workspace</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 class="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div class="mt-6 sm:mt-2 2xl:mt-5">
                  <div class="border-b border-gray-200">
                    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                          <a
                            key={tab.name}
                            href={tab.href}
                            class={{
                              'border-pink-500 text-gray-900': tab.current,
                              'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': !tab.current,
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm': true
                            }}
                            aria-current={tab.current ? 'page' : undefined}
                          >
                            {tab.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>

                {/* Description list */}
                <div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {
                      Object.keys(profile.fields).map((field) => (
                        <div key={field} class="sm:col-span-1">
                          <dt class="text-sm font-medium text-gray-500">{field}</dt>
                          <dd class="mt-1 text-sm text-gray-900">{ profile.fields[field] }</dd>
                        </div>
                      ))
                    }
                    <div class="sm:col-span-2">
                      <dt class="text-sm font-medium text-gray-500">About</dt>
                      <dd
                        class="mt-1 max-w-prose space-y-5 text-sm text-gray-900"
                        dangerouslySetInnerHTML={{ __html: profile.about }}
                      />
                    </div>
                  </dl>
                </div>
              </article>
            </main>
            <aside class="md:w-64 lg:w-96 flex-shrink-0 border-r border-gray-200 order-first flex flex-col">
              <div class="px-6 pt-6 pb-4">
                <h2 class="text-lg font-medium text-gray-900">Invited Students</h2>
                <p class="mt-1 text-sm text-gray-600">Active: 38</p>
                <form class="mt-6 flex space-x-4" action="#">
                  <div class="min-w-0 flex-1">
                    <label htmlFor="search" class="sr-only">
                      Search
                    </label>
                    <div class="relative rounded-md shadow-sm">
                      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <QMagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        class="block w-full h-8 rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
              {/* Directory list */}
              <nav class="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
                {Object.keys(directory).map((letter) => (
                  <div key={letter} class="relative">
                    <div class="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                      <h3>{letter}</h3>
                    </div>
                    <ul role="list" class="relative z-0 divide-y divide-gray-200">
                      {
                        directory[letter].map((person) => (
                          <li key={person.id}>
                            <div class="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                              <div class="flex-shrink-0">
                                <img class="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                              </div>
                              <div class="min-w-0 flex-1">
                                <a href="#" class="focus:outline-none flex justify-between">
                                  {/* Extend touch target to entire panel */}
                                  <div>
                                    <span class="absolute inset-0" aria-hidden="true" />
                                    <p class="text-sm font-medium text-gray-900">{person.name}</p>
                                    <p class="truncate text-sm text-gray-500">{person.role}</p>
                                  </div>

                                  <div class="self-center">
                                    <span class={{
                                        'bg-green-100': person.active,
                                        'bg-gray-100': !person.active,
                                        "h-4 w-4 rounded-full flex items-center justify-center": true,
                                      }}
                                      aria-hidden="true"
                                    >
                                      <span class={{
                                          'bg-green-400': person.active,
                                          'bg-gray-400': !person.active,
                                          "h-2 w-2 rounded-full": true,
                                        }}
                                      />
                                    </span>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>
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