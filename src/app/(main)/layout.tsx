import { MainHeader } from "@/components/main-header";
import { WhoToFollow } from "@/components/who-to-follow";
import { getUsersToFollow, currentUser } from "@/lib/data";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usersToFollow = getUsersToFollow(currentUser.id);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainHeader />
      <main className="flex-1 bg-muted/40">
        <div className="container mx-auto grid grid-cols-1 items-start gap-8 py-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-1 hidden lg:block">
            {/* Left sidebar can go here */}
          </div>
          <div className="col-span-1 md:col-span-2">{children}</div>
          <div className="col-span-1 hidden md:block">
            <WhoToFollow users={usersToFollow} />
          </div>
        </div>
      </main>
    </div>
  );
}
