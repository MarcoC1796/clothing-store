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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // creating a collection istance that can be written to the database
  const collectionRef = collection(db, collectionKey);

  // instances a new batch to begin a future transtacion in the database
  // a transaction is a serires of writes that need to be completed
  // if one of those writes fails, everything is reversed
  const batch = writeBatch(db);

  // creating posible writes fot this batch
  objectsToAdd.forEach((object) => {
    // creating document instance that can be referenced to write in the database
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // giving the document reference and actual value to be stored
    batch.set(docRef, object);
  });

  // executing writes
  // will return an error if one of those writes fails
  // will undo writes if one of those writes fails
  await batch.commit();
  console.log("done");
};

// quering and constructing an object of item categories
// we isolate this functionality is one function to only change this functionality
// in case the implementation changes
// this applies to all other encapsulation function
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

// get auth data and store it in firestore if user doesn't exists
export const createUserDocumentfromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // creating document
  // firebase will specify the collection specified if it doesn't exit in the db
  const userDocRef = doc(db, "user", userAuth.uid); // (databse, collection, identifier)

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
