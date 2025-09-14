"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

type LoginMode = "user" | "admin";

export default function LoginPage() {
  const [mode, setMode] = useState<LoginMode>("user");
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleModeChange = (value: string) => {
    const newMode = value as LoginMode;
    setMode(newMode);
    if (newMode === "admin") {
      setEmail("admin@example.com");
      setPassword("password");
    } else {
      setEmail("user@example.com");
      setPassword("password");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "admin") {
      if (email === "admin@example.com" && password === "password") {
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push("/admin/dashboard");
      } else {
        toast({
          title: "Admin Login Failed",
          description: "Invalid credentials for admin.",
          variant: "destructive",
        });
      }
    } else {
      // Simulate a successful user login for prototyping
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (login) {
        login({
          displayName: "Vishwa Lingam",
          email: "user@example.com",
          photoURL: "https://picsum.photos/seed/user6/200/200",
        });
      }
      router.push("/feed");
    }

    setLoading(false);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center">
        <CardTitle className="font-headline text-2xl">
          {mode === "admin" ? "Admin Login" : "Login"}
        </CardTitle>
        <CardDescription>
          {mode === "admin"
            ? "Access the admin dashboard"
            : "Enter your email below to login"}
        </CardDescription>
        <Tabs
          defaultValue="user"
          className="w-[200px] pt-2"
          onValueChange={handleModeChange}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {mode === "user" && (
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </div>
        </form>
        {mode === "user" && (
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
