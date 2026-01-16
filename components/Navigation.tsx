import Link from "next/link";

interface NavigationProps {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}

export function Navigation({
  prevHref,
  prevLabel = "前へ",
  nextHref,
  nextLabel = "次へ",
}: NavigationProps) {
  return (
    <nav className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-6 py-4">
      <div>
        {prevHref ? (
          <Link
            href={prevHref}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <span>←</span> {prevLabel}
          </Link>
        ) : (
          <span />
        )}
      </div>

      <div>
        {nextHref && (
          <Link
            href={nextHref}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {nextLabel} <span>→</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
