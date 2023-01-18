import { component$, Slot } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <Slot />
      <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made by Nehehe
        </a>
      </footer>
    </>
  );
});
