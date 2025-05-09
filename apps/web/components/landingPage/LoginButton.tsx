"use client";

import { Button } from "@workspace/ui/components/button";
import { RiTwitterXFill } from "@remixicon/react";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export function LoginButton() {
  const [loading, setLoading] = useState(false);

  const signInWithTwitter = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (data?.url) {
      redirect(data.url); // Force redirectS
    }

    if (error) {
      console.error("OAuth error:", error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={signInWithTwitter}
      disabled={loading}
      className="hover:cursor-pointer active:cursor-pointer focus:cursor-pointer rounded-4xl bg-gradient-to-t from-yellow-500 to-yellow-300 text-black"
    >
      <RiTwitterXFill
        className="me-3 text-[#14171a]  rounded-e-full"
        size={16}
      />
      {loading ? "Signing in..." : "Start Curating"}
    </Button>
  );
}
