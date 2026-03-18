import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export const SectionWrapper = ({ title, children }: Props) => {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
};
