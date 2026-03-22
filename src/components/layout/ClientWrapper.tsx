"use client";

import { Sidebar } from "@/components/Sidebar";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const checkAuth = async () => {
      const host = window.location.hostname;
      const isLocalhost = host === "localhost" || host === "127.0.0.1" || host === "::1";
      const { data: { session } } = await supabase.auth.getSession();

      const isAuthPage = pathname?.startsWith("/auth");

      if (!session && !isAuthPage && !isLocalhost) {
        router.replace("/auth");
        // don't setLoading(false) here — keep spinner until redirect lands
        return;
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (!mounted || (loading && !pathname?.startsWith("/auth"))) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pl-[80px] transition-all duration-500">
        {children}
      </div>
      <PodcastPlayer />
    </div>
  );
}
