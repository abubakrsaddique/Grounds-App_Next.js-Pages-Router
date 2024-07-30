import React, { useEffect, useState, ReactNode } from "react";
import { useQuery } from "react-query";
import { auth } from "../../Firebase";
import { fetchUser } from "@/libs/firebase/userAuth";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery("authUser", fetchUser, {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const logout = () => {
    auth.signOut().then(() => {
      refetch();
    });
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{ user: user || null, loading, isLoggedIn, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export { AuthProvider, AppProviders };
