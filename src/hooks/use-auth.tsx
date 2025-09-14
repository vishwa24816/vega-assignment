"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { currentUser } from "@/lib/data";

// This is a mock user type, in a real app you'd get this from your auth provider
type MockUser = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
};


type AuthContextType = {
  user: MockUser | null;
  login: (user: MockUser) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // In a real app, you might check for a token in localStorage
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);
  
  const login = useCallback((user: MockUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser(null);
    router.push('/login');
  }, [router]);


  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === "/login" || pathname === "/signup";
    const isProtectedPage = !isAuthPage && pathname !== "/";

    if (!user && isProtectedPage) {
      router.push("/login");
    }
    if (user && isAuthPage) {
      router.push("/feed");
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    // You can return a loading spinner here
    return null;
  }

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
