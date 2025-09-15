
import Link from "next/link";
import { Home, User as UserIcon, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/definitions";

export function MainSidebar({ currentUser }: { currentUser: User }) {
  const pathname = usePathname();
  
  const navItems = [
    { href: "/feed", icon: Home, label: "Feed" },
    { href: `/profile/${currentUser.username}`, icon: UserIcon, label: "Profile" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/settings", icon: Settings, label: "Settings" },
];

  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Button
          key={item.label}
          variant={pathname === item.href ? "secondary" : "ghost"}
          className="justify-start"
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
