
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, FileText, Trash2 } from "lucide-react";
import { users, posts } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function AdminDashboardPage() {
  const totalUsers = users.length;
  const totalPosts = posts.length;

  return (
    <div className="w-full max-w-6xl flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Admin Dashboard</CardTitle>
          <CardDescription>
            User management and basic content oversight.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              All registered users on the platform.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              Total posts created by all users.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Click on a user to view their posts and take action.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {users.map((user) => {
              const userPosts = posts.filter(p => p.userId === user.id);
              return (
                <AccordionItem value={user.id} key={user.id}>
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                     <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">
                                @{user.username}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Badge variant="outline" className="hidden md:inline-flex">Active</Badge>
                            <span className="text-sm text-muted-foreground hidden md:inline">{userPosts.length} posts</span>
                        </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-muted/20 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold">Posts by {user.name}</h4>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4"/>
                            Delete User
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4">
                      {userPosts.length > 0 ? (
                        userPosts.map(post => (
                          <div key={post.id} className="flex items-start justify-between gap-4 rounded-lg border bg-card p-4">
                            <div className="flex items-start gap-4">
                                {post.imageUrl && (
                                    <Image src={post.imageUrl} alt="Post image" width={80} height={80} className="rounded-md object-cover aspect-square"/>
                                )}
                                <p className="text-sm flex-1">{post.content}</p>
                            </div>
                            <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">This user has no posts.</p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
