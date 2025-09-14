
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, FileText } from "lucide-react";
import { users, posts } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

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
            A list of all users in the system.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            <div className="grid grid-cols-12 items-center px-6 py-3 font-medium text-muted-foreground">
                <div className="col-span-5">User</div>
                <div className="col-span-3 hidden md:block">Status</div>
                <div className="col-span-3 hidden md:block">Post Count</div>
                <div className="col-span-1 text-right"></div>
            </div>
             {users.map((user) => (
                <div key={user.id} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-muted/50 transition-colors">
                  <div className="col-span-5">
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
                  </div>
                  <div className="col-span-3 hidden md:block">
                     <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="col-span-3 hidden md:block">
                     {posts.filter(p => p.userId === user.id).length}
                  </div>
                  <div className="col-span-1 flex justify-end">
                     <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
