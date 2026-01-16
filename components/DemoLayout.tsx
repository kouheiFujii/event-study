import type { ReactNode } from "react";
import { Navigation } from "./Navigation";

interface DemoLayoutProps {
  title: string;
  description?: string;
  materialContent: ReactNode;
  demoContent: ReactNode;
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}

export function DemoLayout({
  title,
  description,
  materialContent,
  demoContent,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: DemoLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-56px)] flex-col bg-white">
      <div className="shrink-0 border-b border-zinc-200 bg-zinc-50 px-8 py-4">
        <h1 className="text-xl font-bold text-zinc-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-zinc-600">{description}</p>
        )}
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 divide-x divide-zinc-200">
        <section className="overflow-y-auto p-4">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-zinc-800">
            <span>📖</span> 資料
          </h2>
          <div className="space-y-4">{materialContent}</div>
        </section>

        <section className="overflow-y-auto p-4">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-zinc-800">
            <span>🎮</span> 動作確認
          </h2>
          <div className="space-y-4">{demoContent}</div>
        </section>
      </div>

      <div className="shrink-0">
        <Navigation
          prevHref={prevHref}
          prevLabel={prevLabel}
          nextHref={nextHref}
          nextLabel={nextLabel}
        />
      </div>
    </div>
  );
}
