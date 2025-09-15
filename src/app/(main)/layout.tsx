
"use client";

import { MainHeader } from "@/components/main-header";
import { WhoToFollow } from "@/components/who-to-follow";
import { getUsersToFollow, getCurrentUser } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { MainSidebar } from "@/components/main-sidebar";
import { useState, useEffect } from "react";
import type { User } from "@/lib/definitions";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usersToFollow, setUsersToFollow] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const fetchedCurrentUser = await getCurrentUser();
        setCurrentUser(fetchedCurrentUser);
        if (fetchedCurrentUser) {
            const fetchedUsersToFollow = await getUsersToFollow(fetchedCurrentUser.id);
            setUsersToFollow(fetchedUsersToFollow);
        }
    };
    fetchData();
  }, []);


  // Don't render the main layout if the user is not authenticated and loading is finished.
  // The AuthProvider will handle the redirection.
  if (!user) {
    return null;
  }
  
  if (!currentUser) {
      // You can return a loading skeleton for the whole layout
      return <div>Loading layout...</div>
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainHeader currentUser={currentUser} />
      <main className="flex-1">
        <div className="container mx-auto grid grid-cols-1 items-start gap-8 py-8 md:grid-cols-12">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
             <MainSidebar currentUser={currentUser} />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-7">{children}</div>
          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            <div className="sticky top-24 flex flex-col gap-8">
                <WhoToFollow users={usersToFollow} currentUser={currentUser} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
