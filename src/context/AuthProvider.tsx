import React, { useEffect, useState, ReactNode } from "react";
import { auth } from "../../Firebase";
import { AuthContext } from "./AuthContext";
import { useAuthUser } from "@/libs/firebase/userAuth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: user, isLoading, refetch } = useAuthUser();
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
