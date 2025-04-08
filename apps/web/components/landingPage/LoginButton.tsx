import { Button } from "@workspace/ui/components/button";
import { RiTwitterXFill } from "@remixicon/react";
import { useState } from "react";
import { supabase } from "@/lib/supabaseBrowserClient";

function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signInHandler = async () => {
    try {
      console.log("🔥 Attempting to sign in...");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      console.log("📡 API Request Sent:", data, error);
      if (error) console.error("🚨 Auth Error:", error);
    } catch (e) {
      console.error("❌ Exception:", e);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" onClick={signInHandler} disabled={loading}>
        <RiTwitterXFill
          className="me-3 text-[#14171a] dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
        {loading ? "Signing in..." : "Login with X"}
      </Button>
    </div>
  );
}

export { LoginButton };
