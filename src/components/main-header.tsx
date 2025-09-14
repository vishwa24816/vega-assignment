"use client";

import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/user-nav";
import { Logo } from "@/components/logo";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/lib/data";
import type { User } from "@/lib/definitions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query) {
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.username.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredUsers);
      setIsPopoverOpen(filteredUsers.length > 0);
    } else {
      setSuggestions([]);
      setIsPopoverOpen(false);
    }
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.startsWith("@")) {
      const username = query.substring(1);
      const user = users.find((u) => u.username === username);
      if (user) {
        router.push(`/profile/${username}`);
        setQuery("");
        inputRef.current?.blur();
      }
    }
  };

  const handleSuggestionClick = (username: string) => {
    router.push(`/profile/${username}`);
    setQuery("");
    inputRef.current?.blur();
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <form
          onSubmit={handleSearchSubmit}
          className="ml-auto flex-1 sm:flex-initial"
        >
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search users... (@username)"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setIsPopoverOpen(true)}
            />
          </div>
        </form>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 sm:w-[300px] md:w-[200px] lg:w-[300px]"
        align="start"
      >
        <div className="flex flex-col">
          {suggestions.length > 0 ? (
            suggestions.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSuggestionClick(user.username)}
                className="flex items-center gap-3 p-2 text-left hover:bg-muted"
              >
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No users found.
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function MainHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Logo />
        <div className="flex flex-1 items-center justify-end gap-4">
          <SearchBar />
          {user ? (
            <UserNav />
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
