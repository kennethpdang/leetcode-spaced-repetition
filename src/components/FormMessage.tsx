import { ActionResult } from "@/lib/action-result";

export default function FormMessage({ result }: { result: ActionResult }) {
  if (result.error) {
    return (
      <p className="message message-error" role="alert">
        {result.error}
      </p>
    );
  }
  if (result.success) {
    return (
      <p className="message message-success" role="status">
        {result.success}
      </p>
    );
  }
  return null;
}
