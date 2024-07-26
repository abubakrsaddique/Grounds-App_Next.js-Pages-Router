import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { auth } from "../Firebase";
import firebase from "firebase/compat/app";

interface AuthContextProps {
  user: firebase.User | null;
  loading: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const fetchUser = async (): Promise<firebase.User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        resolve(user);
      } else {
        localStorage.removeItem("user");
        resolve(null);
      }
      unsubscribe();
    });
  });
};

export const useAuth = () => {
  return useQuery("authUser", fetchUser, {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false,
  });
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: user, isLoading, refetch } = useAuth();
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

const queryClient = new QueryClient();

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, AppProviders };
