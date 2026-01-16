"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Top" },
  { href: "/demo1", label: "1" },
  { href: "/demo2", label: "2" },
  { href: "/demo3", label: "3" },
  { href: "/demo4", label: "4" },
  { href: "/demo5", label: "5" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
      <div className="flex h-14 items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-zinc-900">
          JavaScript イベント入門
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
