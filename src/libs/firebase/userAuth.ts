import { auth, firestore } from "../../../Firebase";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";

export const fetchUser = async (): Promise<firebase.User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

export const userAuth = () => {
  return useQuery<firebase.User | null, Error>("authUser", fetchUser, {
    staleTime: 0,
    cacheTime: 0,
    retry: false,
  });
};

export const fetchProfileData = async () => {
  const uid = auth.currentUser?.uid;

  if (!uid) return {};

  const userDocRef = doc(firestore, `users/${uid}`);
  const docSnap = await getDoc(userDocRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  throw new Error("Profile data not found");
};
