import { qwikify$ } from '@builder.io/qwik-react';
import { component$, useStore } from '@builder.io/qwik';
import ArrowLongRightIcon from '@heroicons/react/20/solid/ArrowLongRightIcon';
import ArrowLongLeftIcon from '@heroicons/react/20/solid/ArrowLongLeftIcon';
import { appUrl } from '~/db/url';

export interface PaginationProps {
  count: number;
  active: number;
  dashboard: string;
}

export const Pagination = component$<PaginationProps>((props) => {
  const QArrowLongLeftIcon = qwikify$(ArrowLongLeftIcon);
  const QArrowLongRightIcon = qwikify$(ArrowLongRightIcon);
  const m = props.count / 8;
  const page = Math.floor(m);
  const state = useStore({
    pages: m > page ? page + 1 : page,
    active: props.active || 1,
  });

  return (
    <>
      <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div class="-mt-px flex w-0 flex-1">
          <a
            href={`${appUrl}professor`}
            class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <QArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            First
          </a>
        </div>
        <div class="hidden md:-mt-px md:flex">
          {state.pages &&
            Array.from(Array(state.pages), (_e, i) => {
              if (state.active === i + 1) {
                return (
                  <>
                    <a
                      key={i}
                      href={`${appUrl + props.dashboard}?page=` + (i + 1)}
                      class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 border-indigo-300 hover:text-gray-700"
                    >
                      {i + 1}
                    </a>
                  </>
                );
              } else if (
                (i <= state.active && i > state.active - 4) ||
                (i > state.active && i < state.active + 2)
              ) {
                return (
                  <>
                    <a
                      key={i}
                      href={`${appUrl + props.dashboard}?page=` + (i + 1)}
                      class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    >
                      {i + 1}
                    </a>
                  </>
                );
              } else
                return (
                  <>
                    <span class="inline-flex items-center pt-4 text-sm text-gray-500">.</span>
                  </>
                );
            })}
        </div>
        <div class="-mt-px flex w-0 flex-1 justify-end">
          <a
            href={appUrl + props.dashboard + '?page=' + state.pages}
            class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Last
            <QArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </>
  );
});
