import { FormEvent, startTransition } from "react";

// React clears a form after its action runs. This keeps what the user typed, so a typo
// in one field doesn't wipe the others when the server sends back an error.
export function submitWithoutReset(formAction: (formData: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };
}
