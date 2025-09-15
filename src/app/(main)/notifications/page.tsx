
import Link from "next/link";
import { getNotifications, getUser, getCurrentUser } from "@/lib/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, User as UserIcon } from "lucide-react";
import type { Notification } from "@/lib/definitions";

async function NotificationItem({ notification }: { notification: Notification }) {
    const user = await getUser(notification.userId);

    if (!user) return null;

    let icon, text, link;

    switch (notification.type) {
        case "like":
            icon = <Heart className="h-6 w-6 text-red-500" />;
            text = <p><span className="font-semibold">{user.name}</span> liked your post.</p>;
            link = notification.postId ? `/post/${notification.postId}?comments=true` : '#';
            break;
        case "comment":
            icon = <MessageCircle className="h-6 w-6 text-primary" />;
            text = <p><span className="font-semibold">{user.name}</span> commented on your post.</p>;
            link = notification.postId ? `/post/${notification.postId}?comments=true` : '#';
            break;
        case "follow":
            icon = <UserIcon className="h-6 w-6 text-accent" />;
            text = <p><span className="font-semibold">{user.name}</span> started following you.</p>;
            link = `/profile/${user.username}`;
            break;
        default:
            return null;
    }

    return (
        <Link href={link} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
            {icon}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                     <Avatar className="h-8 w-8 border">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {text}
                </div>
            </div>
            {!notification.read && (
                <div className="h-2.5 w-2.5 rounded-full bg-primary mt-2"></div>
            )}
        </Link>
    );
}


export default async function NotificationsPage() {
  const currentUser = await getCurrentUser();
  const allNotifications = await getNotifications(currentUser.id);
  const newNotifications = allNotifications.filter((n) => !n.read);
  const earlierNotifications = allNotifications.filter((n) => n.read);

  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Notifications</CardTitle>
          <CardDescription>
            Here's what you've missed.
          </CardDescription>
        </CardHeader>
      </Card>
      
      {newNotifications.length > 0 && (
        <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold font-headline">New</h2>
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {newNotifications.map((notification) => (
                           <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

      {earlierNotifications.length > 0 && (
         <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold font-headline">Earlier</h2>
            <Card>
                <CardContent className="p-0">
                    <div className="divide-y">
                        {earlierNotifications.map((notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

      {allNotifications.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            You don't have any notifications yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
