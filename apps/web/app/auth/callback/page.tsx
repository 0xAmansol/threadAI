import { createSupabaseServerClient } from "@/lib/supabseServerClient";
import { redirect } from "next/navigation";

export default async function AuthCallback() {
  const supabase = await createSupabaseServerClient();

  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // user authenticated successfully
    return redirect("/dashboard");
  }

  // No user — redirect to homepage
  return redirect("/");
}
