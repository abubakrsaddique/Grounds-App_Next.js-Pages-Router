import { createContext, useContext } from "react";
import firebase from "firebase/compat/app";

interface AuthContextProps {
  user: firebase.User | null;
  loading: boolean;
  isLoggedIn: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>({
  user: null,
  loading: false,
  isLoggedIn: false,
  logout: () => {},
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
