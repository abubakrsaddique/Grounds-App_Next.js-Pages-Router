import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useQuery } from "react-query";
import { auth } from "../../Firebase";
import firebase from "firebase/compat/app";

import { fetchUser } from "@/libs/firebase/userAuth";

interface AuthContextProps {
  user: firebase.User | null;
  loading: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>({
  user: null,
  loading: false,
  isLoggedIn: false,
  logout: () => {},
});

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

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, AppProviders };
