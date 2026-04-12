"use client";

import createClient from "@/lib/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  id: string | null;
  email: string | null;
  avatarUrl: string | null;
  full_name: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const authContext = createContext<UserContextType>({
  id: null,
  email: null,
  avatarUrl: null,
  full_name: null,
  isAuthenticated: false,
  loading: true,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [full_name, setFullName] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  async function syncUser() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const metadata = (user?.user_metadata ?? {}) as Record<string, unknown>;
    const image =
      (metadata.avatar_url as string | undefined) ??
      (metadata.picture as string | undefined) ??
      null;
    const name =
      (metadata.full_name as string | undefined) ??
      (metadata.name as string | undefined) ??
      null;

    setIsAuthenticated(Boolean(user));
    setAvatarUrl(image);
    setEmail(user?.email ?? null);
    setFullName(name);
    setId(user?.id ?? null);
    setLoading(false);
  }

  useEffect(() => {
    const supabase = createClient();
    let mounted = true;

    void syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      if (mounted) {
        void syncUser();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider
      value={{ id, email, avatarUrl, full_name, isAuthenticated, loading }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
