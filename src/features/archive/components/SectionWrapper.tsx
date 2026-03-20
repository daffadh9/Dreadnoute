import type { ReactNode } from "react";

type Props = {
  title: string;
  icon?: React.ReactNode;
  children: ReactNode;
  tone?: "default" | "featured";
};

export const SectionWrapper = ({ title, icon, children, tone = "default" }: Props) => {
  const isFeatured = tone === "featured";

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${
        isFeatured
          ? "border-red-500/55 bg-[linear-gradient(160deg,rgba(24,24,27,0.97),rgba(7,7,10,1))] shadow-[0_34px_78px_-34px_rgba(220,38,38,0.56)]"
          : "border-zinc-800/95 bg-[linear-gradient(160deg,rgba(24,24,27,0.9),rgba(9,9,11,0.96))] shadow-[0_20px_46px_-34px_rgba(0,0,0,0.95)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_72%_at_84%_6%,rgba(220,38,38,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_66%_at_14%_100%,rgba(76,29,149,0.15),transparent_62%)]" />
      {isFeatured ? (
        <div className="pointer-events-none absolute -top-12 right-8 h-40 w-40 rounded-full bg-red-500/34 blur-2xl animate-pulse" />
      ) : null}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px ${
          isFeatured
            ? "bg-gradient-to-r from-transparent via-red-400/95 to-transparent"
            : "bg-gradient-to-r from-transparent via-zinc-500/60 to-transparent"
        }`}
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          {icon && (
            <div className={`flex items-center justify-center ${isFeatured ? "text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]" : "text-zinc-400"}`}>
              {icon}
            </div>
          )}
          <h2
            className={`text-lg font-bold uppercase tracking-[0.15em] ${
              isFeatured ? "text-zinc-100" : "text-zinc-200"
            }`}
          >
            {title}
          </h2>
        </div>
        <div
          className={`mt-2 h-px w-24 ${
            isFeatured
              ? "bg-gradient-to-r from-red-400/100 via-purple-400/70 to-transparent shadow-[0_0_14px_rgba(248,113,113,0.52)]"
              : "bg-gradient-to-r from-zinc-500/60 to-transparent"
          }`}
        />
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
};
