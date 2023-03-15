import { component$ } from "@builder.io/qwik";
import { Exam } from "~/models/Exam";

export interface TestInviteProps {
  exam: Exam
}

export const TestInvite = component$<TestInviteProps>((props) => {
  return (
    <div onClick$={(ev) => {}}>

    </div>
  );
});