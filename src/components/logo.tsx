import Link from "next/link";
import { Mountain } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/feed"
      className="flex items-center gap-2 text-primary transition-colors hover:text-foreground"
    >
      <Mountain className="h-6 w-6" />
      <span className="font-headline text-xl font-bold">Social Connect</span>
    </Link>
  );
}
