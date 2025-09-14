"use client";

import { MainHeader } from "@/components/main-header";
import { WhoToFollow } from "@/components/who-to-follow";
import { getUsersToFollow, currentUser } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { MainSidebar } from "@/components/main-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  // Don't render the main layout if the user is not authenticated and loading is finished.
  // The AuthProvider will handle the redirection.
  if (!user) {
    return null;
  }

  const usersToFollow = getUsersToFollow(currentUser.id);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainHeader />
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 items-start gap-8 py-8 md:grid-cols-12">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
             <MainSidebar />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-7">{children}</div>
          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <div className="sticky top-24 flex flex-col gap-8">
                <WhoToFollow users={usersToFollow} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
