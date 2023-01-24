import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <Slot />
      <footer class="bg-white">
        <div class="mx-auto max-w-7xl overflow-hidden py-10 px-6 sm:py-12 lg:px-8">
          <p class="text-center text-xs leading-5 text-gray-500">&copy; 2023 StudentCODE, Inc. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
});
