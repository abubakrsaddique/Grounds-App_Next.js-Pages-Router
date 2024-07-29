import { useQuery } from "react-query";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { auth } from "../../Firebase";

const fetchAuthUser = (): Promise<firebase.User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe();
    });
  });
};

export const useAuth = () => {
  return useQuery<firebase.User | null, Error>("authUser", fetchAuthUser, {
    staleTime: 0,
    cacheTime: 0,
    retry: false,
  });
};
