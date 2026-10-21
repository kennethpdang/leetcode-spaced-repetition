// The shape every form action returns to the page.
export interface ActionResult {
  error: string | null;
  success: string | null;
}

export const EMPTY_RESULT: ActionResult = { error: null, success: null };

export function failure(message: string): ActionResult {
  return { error: message, success: null };
}

export function success(message: string): ActionResult {
  return { error: null, success: message };
}
