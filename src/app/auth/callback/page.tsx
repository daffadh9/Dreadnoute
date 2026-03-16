"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2, Skull } from "lucide-react";
import { Suspense } from "react";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Handle PKCE flow — Supabase v2 sends ?code=... query param
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (errorParam) {
        console.error("OAuth error:", errorParam, errorDescription);
        router.replace("/auth?error=" + encodeURIComponent(errorDescription || errorParam));
        return;
      }

      if (code) {
        try {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error("Code exchange error:", error.message);
            router.replace("/auth?error=" + encodeURIComponent(error.message));
            return;
          }
        } catch (err) {
          console.error("Exchange failed:", err);
        }
      }

      // Also handle implicit flow (hash fragment — older Supabase/browsers)
      // supabase-js v2 auto-detects hash tokens via detectSessionInUrl
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        router.replace("/auth?intro=true");
      } else {
        // Wait for auth state change (implicit flow may be async)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sess) => {
          if (event === "SIGNED_IN" && sess) {
            subscription.unsubscribe();
            router.replace("/auth?intro=true");
          }
        });

        // Fallback timeout — redirect to auth if nothing happens in 5s
        setTimeout(() => {
          subscription.unsubscribe();
          router.replace("/auth");
        }, 5000);
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white font-cinzel relative overflow-hidden">
      {/* Background pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,0,0.05)_0%,transparent_70%)] animate-pulse" />

      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
          <Skull className="w-5 h-5 text-red-500/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center">
          <p className="text-[12px] font-black uppercase tracking-[0.5em] text-white animate-pulse mb-2">
            MENSINKRONKAN ATRIBUT JIWA...
          </p>
          <p className="text-[9px] text-gray-700 tracking-widest uppercase">
            V.O.I.D. identity verification in progress
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#020202]">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
