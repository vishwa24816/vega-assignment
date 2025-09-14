"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext<User | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
