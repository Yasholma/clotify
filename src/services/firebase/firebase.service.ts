import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { IFirebaseConfig } from "./firebase.interface";

const firebaseConfig: IFirebaseConfig = {
  apiKey: "AIzaSyAMXviTYSG3b8zIgqo5FZLbv-tItlg9aTo",
  authDomain: "clotify-db.firebaseapp.com",
  projectId: "clotify-db",
  storageBucket: "clotify-db.appspot.com",
  messagingSenderId: "151165718260",
  appId: "1:151165718260:web:d6157c73b84073562958a1",
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: User) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e: any) {
      console.error(`error creating user: ${e.message}`);
    }
  }

  return userDocRef;
};

export default firebaseApp;
