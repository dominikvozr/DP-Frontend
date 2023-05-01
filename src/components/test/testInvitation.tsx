import { component$, useContext, useStore } from '@builder.io/qwik';
import { ExamDataContext } from '~/contexts/contexts';

export const TestInvitation = component$(() => {
  const examData = useContext(ExamDataContext);
  const state = useStore({
    endDate: new Date(examData.exam.endDate),
  });
  return (
    <>
      <div class="relative bg-gray-900">
        <div class="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
          <img
            class="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply"
            alt="colaboration"
          />
          <svg
            viewBox="0 0 926 676"
            aria-hidden="true"
            class="absolute left-24 -bottom-24 w-[57.875rem] transform-gpu blur-[118px]"
          >
            <path
              fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
              fill-opacity=".4"
              d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            />
            <defs>
              <linearGradient
                id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                x1="926.392"
                x2="-109.635"
                y1=".176"
                y2="321.024"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#776FFF" />
                <stop offset="1" stop-color="#FF4694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:py-40 lg:px-8">
          <div class="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
            <h2 class="text-base font-semibold leading-7 text-indigo-400">Test</h2>
            <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {examData.exam.name} - {examData.exam.subject}
            </p>
            <p class="relative mt-6 text-base leading-7 text-gray-300 pb-5">
              {examData.exam.description}
              <span class="absolute bottom-0 right-0 text-sm italic">
                {' '}
                autor: {examData.exam.user.displayName}
              </span>
            </p>
            <div class="mt-8">
              <div class="text-lg text-center font-semibold leading-7 text-indigo-300 ">
                Otvorený do {state.endDate.toLocaleDateString('sk-SK')},{' '}
                {state.endDate.toLocaleTimeString('sk-SK')}
              </div>
            </div>
            <div class="text-lg text-center font-semibold leading-7 text-indigo-300 ">
              Prihlasovacie údaje
              email: {examData.exam.email}
              heslo: {examData.exam.password}
            </div>
            <div class="mt-8 flex justify-end">
              <a
                href={examData.exam.examLink}
                target="_blank"
                class="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Začať písať test
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ml-3 self-center"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

/*

src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&blend=6366F1&sat=-100&blend-mode=multiply" alt="" />
            <svg viewBox="0 0 926 676" aria-hidden="true" class="absolute left-24 -bottom-24 w-[57.875rem] transform-gpu blur-[118px]">
              <path fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)" fill-opacity=".4" d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z" />
              <defs>
                <linearGradient id="60c3c621-93e0-4a09-a0e6-4c228a0116d8" x1="926.392" x2="-109.635" y1=".176" y2="321.024" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#776FFF" />
                  <stop offset="1" stop-color="#FF4694" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:py-40 lg:px-8">
            <div class="pr-6 pl-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
              <h2 class="text-base font-semibold leading-7 text-indigo-400">Award winning support</h2>
              <p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">We’re here to help</p>
              <p class="mt-6 text-base leading-7 text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.</p>
              <div class="mt-8">
                <a href="#" class="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Visit the help center</a>
              </div>

*/
