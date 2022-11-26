// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLyR1UcoFgQ1tRSXyMTaNjulmPp6rny1I",
  authDomain: "crwn-clothing-db-3b64b.firebaseapp.com",
  projectId: "crwn-clothing-db-3b64b",
  storageBucket: "crwn-clothing-db-3b64b.appspot.com",
  messagingSenderId: "667398647954",
  appId: "1:667398647954:web:6d181ce6491c055564b64b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// A provider is kind of intructions for an instance of a provider (you might have many providres)
// the provider is a class
const googleProvider = new GoogleAuthProvider(); // class connected to Google Auth

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// The authentication should be unique to the duartion of the connection (not like the provider)
// auth is an instance
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// get database instance
export const db = getFirestore();

// get auth data and store it in firestore if user doesn't exists
export const createUserDocumentfromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // creating document
  // firebase will specify the collection specified if it doesn't exit in the db
  const userDocRef = doc(db, "user", userAuth.uid); // (databse, collection, identifier)

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  // Store user document if user id doesn't exist in db
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, // overrites values if passed
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  // The callback is called whenever the auth changes
  // This is a permanent open listener (usisng the observer paterrn)
  // our callback is the next function f the observer pattern.
  onAuthStateChanged(auth, callback);
