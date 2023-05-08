import { component$, useStore, $ } from '@builder.io/qwik';
import { EventApi } from '~/db/EventApi';
import { appUrl } from '~/db/url';
import { dateDifference } from '~/helpers/dateHelper';
import { eventClassMapping } from '~/helpers/eventClassMapping';

interface ActivityBarProps {
  events: any[];
}

export const ActivityBar = component$<ActivityBarProps>((props) => {
  const state = useStore({
    events: props.events,
  });
  const nowDate = new Date();
  const getEventClass = $((type: string): string => {
    return eventClassMapping[type] || 'bg-gray-500';
  });
  return (
    <>
      {/* Activity feed */}
      <div class="pl-6 lg:w-80">
        <div class="pt-6 pb-2 flex space-x-1">
          <h2 class="text-sm font-semibold">Activity</h2>
          <span class="relative top-0.5 text-xs text-gray-500">
            {state.events ? `(${state.events.length})` : '(0)'}
          </span>
        </div>
        <div>
          <ul role="list" class="divide-y divide-gray-200 overflow-y-auto h-[48rem] max-h-screen">
            {state.events?.map(async (event: any, index: number) => (
              <li key={index} class={`p-4 my-1.5 rounded-lg ${await getEventClass(event.type)}`}>
                <div class="flex space-x-3">
                  {event.fromUser && (
                    <img
                      class="h-6 w-6 rounded-full self-center"
                      src={event.fromUser.avatarUrl}
                      alt="avatar"
                    />
                  )}
                  <div class="flex-1 flex flex-col justify-center truncate">
                    <div class="flex items-center justify-between">
                      <h3 class="text-sm font-medium truncate">{event.name}</h3>
                      <p class="text-sm text-gray-500">
                        {dateDifference(nowDate, new Date(event.createdAt))}
                      </p>
                    </div>
                    <p class="text-sm text-gray-500 truncate">{event.description}</p>
                  </div>
                  <div class="flex flex-col">
                    <button
                      class="self-center bg-white px-1.5 my-1 text-sm rounded-lg"
                      onClick$={async () => {
                        const res: Response | undefined = await EventApi.hideEvent(event._id);
                        if (res && res.status == 200)
                          state.events = state.events.filter((evt: any) => evt._id !== event._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#DC2626"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    {event.link && (
                      <a class="bg-white px-1.5 my-1 text-sm rounded-lg" href={appUrl + event.link}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
            {!state.events && <>no activity :(</>}
          </ul>
        </div>
      </div>
    </>
  );
});
