import { Button } from "@workspace/ui/components/button";
import { RiTwitterXFill } from "@remixicon/react";
import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const signInHandler = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "twitter",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        console.log("Auth-error:", error);
      } else {
        console.log("Auth-data:", data);
      }
    } catch (e: any) {
      console.error("Exception:", e);
      setError(e.message);
    } finally {
      console.log(error);
      setLoading(false);
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
