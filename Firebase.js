import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIkckZI_cZM_ywqwcDxPSsPwaE5nU-TUo",
  authDomain: "groundsapp-nextjs.firebaseapp.com",
  projectId: "groundsapp-nextjs",
  storageBucket: "groundsapp-nextjs.appspot.com",
  messagingSenderId: "1081583382272",
  appId: "1:1081583382272:web:ed12b2b04f5f96366acde5",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage().ref();

export { firebase, auth, firestore, storage };
