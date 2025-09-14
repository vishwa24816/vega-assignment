import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Settings</CardTitle>
          <CardDescription>Manage your account and site settings.</CardDescription>
        </CardHeader>
      </Card>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>This will be displayed on your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter your username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us a little about yourself" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <Input id="avatar" type="file" />
                <p className="text-sm text-muted-foreground">Upload a new avatar. JPG or PNG, 2MB max.</p>
              </div>
               <div className="space-y-2">
                <Label htmlFor="banner">Banner</Label>
                <Input id="banner" type="file" />
                 <p className="text-sm text-muted-foreground">Upload a new banner. 1200x400 recommended.</p>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Email Address</h3>
                    <p className="text-sm text-muted-foreground">Your current email is you@example.com</p>
                    <Input className="mt-2" type="email" placeholder="New email address"/>
                     <Button className="mt-2">Update Email</Button>
                </div>
                <Separator />
                 <div>
                    <h3 className="text-lg font-medium">Change Password</h3>
                     <div className="space-y-2 mt-2">
                        <Input type="password" placeholder="Current password"/>
                        <Input type="password" placeholder="New password"/>
                        <Input type="password" placeholder="Confirm new password"/>
                     </div>
                     <Button className="mt-2">Change Password</Button>
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all of your content.</p>
                     <Button variant="destructive" className="mt-2">Delete Account</Button>
                </div>

            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the app.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Theme settings (e.g., light/dark mode) will go here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
