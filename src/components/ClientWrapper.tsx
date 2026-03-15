"use client";

import { Sidebar } from "@/components/Sidebar";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 pl-[100px] transition-all duration-500">
        {children}
      </div>
      <PodcastPlayer />
    </div>
  );
}
