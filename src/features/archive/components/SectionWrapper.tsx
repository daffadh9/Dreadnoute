import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  tone?: "default" | "featured";
};

export const SectionWrapper = ({ title, children, tone = "default" }: Props) => {
  const isFeatured = tone === "featured";

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border p-6 ${
        isFeatured
          ? "border-red-500/35 bg-[linear-gradient(160deg,rgba(24,24,27,0.96),rgba(9,9,11,0.98))] shadow-[0_24px_55px_-34px_rgba(220,38,38,0.32)]"
          : "border-zinc-800 bg-[linear-gradient(160deg,rgba(24,24,27,0.9),rgba(9,9,11,0.96))]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_72%_at_84%_6%,rgba(220,38,38,0.12),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_66%_at_14%_100%,rgba(76,29,149,0.1),transparent_65%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-500/60 to-transparent" />

      <div className="relative">
        <h2
          className={`text-lg font-semibold ${
            isFeatured ? "text-zinc-100" : "text-zinc-200"
          }`}
        >
          {title}
        </h2>
        <div
          className={`mt-2 h-px w-24 ${
            isFeatured
              ? "bg-gradient-to-r from-red-400/70 via-purple-400/45 to-transparent"
              : "bg-gradient-to-r from-zinc-500/60 to-transparent"
          }`}
        />
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
};
