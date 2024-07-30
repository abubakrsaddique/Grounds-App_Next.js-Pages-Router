import { auth, firestore } from "../../../Firebase";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";

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

export const useAuthUser = () => {
  return useQuery<firebase.User | null, Error>(
    "authUser",
    () =>
      new Promise<firebase.User | null>((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(
          (user) => {
            resolve(user || null);
            unsubscribe();
          },
          (error) => {
            reject(error);
          }
        );
      }),
    {
      staleTime: 0,
      cacheTime: 0,
      retry: false,
    }
  );
};
