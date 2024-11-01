"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";

export default function AuthPage() {
  const supabase = createClientComponentClient();
  const [redirectUrl, setRedirectUrl] = useState("");

  // Ensures `redirectUrl` is set only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRedirectUrl(`${window.location.origin}/auth/callback`);
    }
  }, []);

  return (
    <div id="AuthPage" className="w-full min-h-screen bg-white">
      {/* Logo Section */}
      <div className="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
        <Link href="/" className="min-w-[170px]">
          <img width="170" src="/images/logo.svg" alt="Logo" />
        </Link>
      </div>

      {/* Header Section */}
      <div className="w-full flex items-center justify-center p-5 border-b border-b-gray-300">
        Login / Register
      </div>

      {/* Authentication Component */}
      <div className="max-w-[400px] mx-auto px-2 mt-5">
        {/* Render Auth only when `redirectUrl` is set to avoid SSR errors */}
        {redirectUrl && (
          <Auth
            onlyThirdPartyProviders
            redirectTo={redirectUrl}
            supabaseClient={supabase}
            providers={["google"]}
            appearance={{ theme: ThemeSupa }}
          />
        )}
      </div>
    </div>
  );
}
