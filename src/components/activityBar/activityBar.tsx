import { component$ } from '@builder.io/qwik';

export const ActivityBar = component$(() => {
  const activityItems = [
    { project: 'Workcation', commit: '2d89f0c8', environment: 'production', time: '1h' },
    // More items...
  ];
  return (
    <>
      {/* Activity feed */}
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
    </>
  );
});
