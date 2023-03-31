import { component$, useStylesScoped$, useStore, useSignal, useContext } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { UserDataContext } from '~/contexts/contexts';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';
import { Logo } from '../logo/logo';
import styles from './header.css?inline';

export const Header = component$(() => {
  useStylesScoped$(styles);
  const userData = useContext(UserDataContext);
  const state = useStore({
    showNavDropdown: false,
  });
  const nav = useNavigate();
  const navDropdown = useSignal<Element>();
  const navigation = [
    { name: 'My exams', href: 'professor', current: true },
    { name: 'Passed tests', href: 'student', current: true },
  ];
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
  ];
  return (
    <nav class="flex-shrink-0 bg-indigo-600">
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          {/* Logo section */}
          <div class="flex items-center px-2 lg:px-0 xl:w-64">
            <div class="flex-shrink-0">
              <Logo svgClass="w-20" color="#fff" />
            </div>
          </div>

          {/* Search section */}
          <div class="flex flex-1 justify-center lg:justify-end">
            <div class="w-full px-2 lg:px-6">
              <label for="search" class="sr-only">
                Search projects
              </label>
              <div class="relative text-indigo-200 focus-within:text-gray-400">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  {/* Heroicon name: mini/magnifying-glass */}
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  name="search"
                  class="block w-full rounded-md border border-transparent bg-indigo-400 bg-opacity-25 py-2 pl-10 pr-3 leading-5 text-indigo-100 placeholder-indigo-200 focus:bg-white focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Search projects"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div class="flex lg:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              {/*
								Icon when menu is closed.
								Heroicon name: outline/bars-3-center-left
								Menu open: "hidden", Menu closed: "block"
								*/}
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                />
              </svg>
              {/*
								Icon when menu is open.
								Heroicon name: outline/x-mark
								Menu open: "block", Menu closed: "hidden"
								*/}
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Links section */}
          <div class="hidden lg:block lg:w-80">
            <div class="flex items-center justify-end">
              <div class="flex">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={appUrl + item.href}
                    class="rounded-md px-3 py-2 text-sm font-medium text-indigo-200 hover:text-white"
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {/* Profile dropdown */}
              <div class="relative ml-4 flex-shrink-0">
                <div>
                  <button
                    type="button"
                    onClick$={() => {
                      state.showNavDropdown = !state.showNavDropdown;

                      if (state.showNavDropdown) {
                        navDropdown.value?.classList.add('showNavDropdown');
                        navDropdown.value?.classList.remove('hideNavDropdown');
                      } else {
                        navDropdown.value?.classList.add('hideNavDropdown');
                        navDropdown.value?.classList.remove('showNavDropdown');
                      }
                    }}
                    class="flex rounded-full bg-indigo-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Open user menu</span>
                    {userData.user && (
                      <img
                        class="h-8 w-8 rounded-full"
                        src={userData.user.avatarUrl}
                        alt="avatar"
                      />
                    )}
                  </button>
                </div>
                <div
                  ref={navDropdown}
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hideNavDropdown"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  {/* Active: "bg-gray-100", Not Active: "" */}
                  {userNavigation.map((item) => (
                    <div key="item.name">
                      <a
                        href={item.href}
                        class="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                      >
                        {item.name}
                      </a>
                    </div>
                  ))}
                  <div>
                    <a
                      href="#"
                      preventdefault:click
                      onClick$={async () => {
                        const data: { message: string } = await UserApi.logout();
                        if (data.message === 'success') {
                          nav.path = `${appUrl}login`;
                        }
                      }}
                      class="bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex={-1}
                    >
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div class="lg:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pt-2 pb-3">
          {/* Current: "text-white bg-indigo-800", Default: "text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600" */}
          <a
            href={`${appUrl}professor`}
            class="text-white bg-indigo-800 block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            My tests
          </a>
          <a
            href={`${appUrl}student`}
            class="text-indigo-200 hover:text-indigo-100 hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Passed Exams
          </a>
        </div>
        <div class="border-t border-indigo-800 pt-4 pb-3">
          <div class="space-y-1 px-2">
            <a
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
            >
              Your Profile
            </a>

            <a
              href="#"
              class="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
            >
              Settings
            </a>

            <a
              href="#"
              preventdefault:click
              onClick$={async () => {
                const data: { message: string } = await UserApi.logout();
                if (data.message === 'success') {
                  nav.path = `${appUrl}login`;
                }
              }}
              class="block rounded-md px-3 py-2 text-base font-medium text-indigo-200 hover:bg-indigo-600 hover:text-indigo-100"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
});
