import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { IFirebaseConfig, IUserCredential } from "./firebase.interface";

const firebaseConfig: IFirebaseConfig = {
  apiKey: "AIzaSyAMXviTYSG3b8zIgqo5FZLbv-tItlg9aTo",
  authDomain: "clotify-db.firebaseapp.com",
  projectId: "clotify-db",
  storageBucket: "clotify-db.appspot.com",
  messagingSenderId: "151165718260",
  appId: "1:151165718260:web:d6157c73b84073562958a1",
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfo: Record<any, any> = {}
) => {
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
        ...additionalInfo,
      });
    } catch (e: any) {
      console.error(`error creating user: ${e.message}`);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async ({
  email,
  password,
}: IUserCredential) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async ({
  email,
  password,
}: IUserCredential) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password);
};

export default firebaseApp;
