"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mountain } from "lucide-react";

export function Logo({ href = "/feed" }: { href?: string }) {
  const [clickCount, setClickCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (clickCount === 3) {
      router.push("/admin/login");
      setClickCount(0);
    }
  }, [clickCount, router]);

  const handleClick = (e: React.MouseEvent) => {
    // We prevent the default Link navigation on the final click to go to the admin page
    if (clickCount === 2) {
      e.preventDefault();
    }
    setClickCount((prev) => prev + 1);
    setTimeout(() => setClickCount(0), 1000); // Reset after 1 second
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="flex items-center gap-2 text-primary transition-colors hover:text-foreground"
    >
      <Mountain className="h-6 w-6" />
      <span className="font-headline text-xl font-bold">Social Connect</span>
    </Link>
  );
}
