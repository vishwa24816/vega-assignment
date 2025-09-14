import Link from "next/link";
import { Home, User, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/feed", icon: Home, label: "Feed" },
    { href: `/profile/${currentUser.username}`, icon: User, label: "Profile" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
    { href: "/settings", icon: Settings, label: "Settings" },
];

export function MainSidebar() {
  const pathname = usePathname();

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
