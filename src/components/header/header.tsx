import { component$, useStore, useStylesScoped$, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { appUrl } from '~/db/url';
import { UserApi } from '~/db/UserApi';
import { Logo } from '../logo/logo';
import styles from './header.css?inline';

export const Header = component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const navigation = [
    { name: 'Professor', href: 'professor' },
    { name: 'Student', href: 'student' },
  ];
  const state = useStore({
    scope: '',
    color: '',
  });
  useTask$(() => {
    state.scope = loc.url.pathname.includes('professor') ? 'professor' : 'student';
    state.color = state.scope.includes('professor') ? 'bg-indigo-600' : 'bg-blue-600';
  });
  return (
    <nav class={`flex-shrink-0 ${state.color}`}>
      <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          {/* Logo section */}
          <div class="flex items-center px-2 lg:px-0 xl:w-64">
            <a href="/professor" class="flex-shrink-0">
              <Logo svgClass="w-20" color="#fff" />
            </a>
          </div>
          {/* Links section */}
          <div class="flex">
            <div class="lg:w-80">
              <div class="flex items-center justify-end">
                <div class="flex">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={appUrl + item.href}
                      class={`rounded-md font-bold px-3 py-2 text-sm text-indigo-200 ${
                        item.href === state.scope ? 'border text-white' : 'hover:text-white'
                      }`}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {/* Profile dropdown */}
              </div>
            </div>
            <div class="flex">
              {/* Mobile menu button */}
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md p-2 text-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                onClick$={async () => {
                  const data: { message: string } = await UserApi.logout();
                  if (data.message === 'success') {
                    window.location = `${appUrl}login` as any;
                  }
                }}
              >
                {/*
								Icon when menu is closed.
								Heroicon name: outline/bars-3-center-left
								Menu open: "hidden", Menu closed: "block"
								*/}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});
