import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import { ICategory } from "../../contexts/category.context";
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

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: ICategory[]
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((product) => {
    const docRef = doc(collectionRef, product.title.toLowerCase());
    batch.set(docRef, product);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc: any, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

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

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangeListerner = (
  callback: (value: any) => NextOrObserver<User> | void
) => onAuthStateChanged(auth, callback);

export default firebaseApp;
