import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/current-user";

export const metadata = { title: "Sign in · LeetCode Review" };

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return (
    <main className="auth-page">
      <AuthForm />
    </main>
  );
}
