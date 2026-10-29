# `src/components/`: reusable UI pieces

Each file is one React component. Files that start with `"use client"` are **Client Components**: they run in the browser
and can respond to clicks. The rest are Server Components. (See [`../app/README.md`](../app/README.md#server-components-vs-client-components)
for what that means.)

| Component | Client? | What it does |
| --- | --- | --- |
| `AuthForm.tsx` | yes | The sign in / create account form, with a link to switch between them. |
| `TimeZoneInput.tsx` | yes | A hidden form field holding your browser's time zone. |
| `AddProblemForm.tsx` | yes | The "LeetCode problem number" box and **Add problem** button. |
| `CardSection.tsx` | no | A heading ("Overdue (2)") and the list of rows under it. Renders nothing when empty. |
| `CardRow.tsx` | yes | One problem: the circle, title link (to `card.problemUrl`: NeetCode when it has the problem, otherwise LeetCode), difficulty, due text, **Remove**, and its confirm dialog. |
| `TopicFilter.tsx` | yes | The topic dropdown. Picking a topic changes the address to `/?topic=<id>` (or `/` for All topics). |
| `ConfirmDialog.tsx` | yes | The "Are you sure?" popup, used for both solving and removing. |
| `FormMessage.tsx` | no | Shows an error (red) or success (green) message from an `ActionResult`. |

## `CardRow.tsx`: the most interesting one

Each row keeps three pieces of state:

```ts
const [pendingAction, setPendingAction] = useState<PendingAction>(null); // "solve", "remove", or null
const [result, setResult] = useState<ActionResult>(EMPTY_RESULT);         // message to show under the row
const [isSaving, startSaving] = useTransition();                          // true while the server is working
```

- Clicking the circle sets `pendingAction` to `"solve"`. Clicking **Remove** sets it to `"remove"`.
- The `ConfirmDialog` is open whenever `pendingAction` isn't `null`. Its title, text and button label change depending on which action is pending.
  One dialog, two uses (DRY).
- Confirming calls the matching server action inside `startSaving(...)`. While it runs, `isSaving` is `true`, so the dialog's buttons
  are disabled and show "Saving…". That prevents a double submit.
- If the action throws (for example, the network dropped), the `try/catch` shows "Something went wrong" instead of crashing the page.

**The circle is a real `<button>`**, not a styled `<div>`. That means it works with the keyboard (Tab, then Enter or Space)
and screen readers announce it. Its `aria-label` says exactly what it does: "Mark 1. Two Sum as solved".
When it's already solved today the button is `disabled`, so it can't be clicked at all.

**Why confirm before solving?** It's easy to tap the wrong circle on a phone, and a wrong solve pushes a problem days into the future.
The dialog also tells you *when* the next review will be, which is useful on its own.

## `ConfirmDialog.tsx`: using the built-in `<dialog>`

HTML has a native `<dialog>` element. Calling `dialog.showModal()` gives you, for free:

- a dimmed backdrop (styled with `.dialog::backdrop`),
- focus moved into the dialog, and kept there until it closes,
- the page behind it made non-interactive,
- the **Escape** key to cancel.

The component is **controlled** by its parent through an `isOpen` prop. A `useEffect` calls `showModal()` or `close()` when `isOpen` changes.
When you press Escape, the browser fires a `cancel` event. We call `event.preventDefault()` and tell the parent instead (`onCancel`),
so the parent's state stays the single source of truth for whether the dialog is open.

## `AuthForm.tsx` and `AddProblemForm.tsx`: forms with `useActionState`

Both use React's `useActionState` hook, which connects a form to a server action and returns `[result, submit, isPending]`.

`AuthForm` holds two of these hooks, one for sign in and one for create account, and picks one based on `mode`.
(Hooks must always be called in the same order on every render, so both are always called even though only one is used at a time.)
`key={mode}` on the `<form>` tells React to treat it as a brand-new form when you switch modes, which clears the fields.

### Why `onSubmit={submitWithoutReset(formAction)}`?

React 19 automatically clears a form after its action finishes. That's nice after a success, but annoying after an error:
mistype your password and your email disappears too.
[`../lib/submit-without-reset.ts`](../lib/submit-without-reset.ts) takes over submission (`event.preventDefault()`), builds the
`FormData` itself, and calls the action inside `startTransition`, which skips the automatic reset.
`AddProblemForm` then clears its box itself, but only after a success.

The forms keep `action={formAction}` as well, so they still work in the rare case JavaScript hasn't loaded yet.

## `TimeZoneInput.tsx`: why the time zone is set in `useEffect`

The browser knows your time zone (`Intl.DateTimeFormat().resolvedOptions().timeZone`), but the server that first renders the page doesn't.
If the component read the time zone during rendering, the server's HTML would say `UTC` and the browser's would say `America/Chicago`.
React would warn about the mismatch (a **hydration mismatch**). Setting it in `useEffect`, which only runs in the browser after the first render, avoids that.

## `TopicFilter.tsx`: a dropdown that changes the address

The dropdown doesn't filter anything itself. When you pick a topic it calls `router.push("/?topic=trees")` (from `next/navigation`),
and the server renders the page again with only that topic's cards. The current topic comes back in as the `selectedTopicId` prop,
so what the dropdown shows always matches the address. This keeps the component tiny and keeps all the filtering logic in one
tested place (`card-view.ts`) on the server.

The `push` is wrapped in `useTransition`, which gives an `isLoading` flag while the new page loads. The dropdown is disabled for
that moment so you can't fire two changes at once. It's a native `<select>`, so it works with a keyboard and opens the
phone's own picker on mobile. The CSS (`.topic-select`) only swaps the browser's arrow for a small chevron to match the page.

## Responsive design

All components use the classes in [`../app/globals.css`](../app/globals.css). Layouts use flexbox with wrapping, so rows reflow on narrow screens.
Below 520 px wide, the add form stacks vertically, the name fields go one per line, and the topic dropdown goes full width under the counts. The circle is 30 px wide so it's easy to hit with a thumb.
