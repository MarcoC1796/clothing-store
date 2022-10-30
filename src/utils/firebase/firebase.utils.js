// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider(); // class connected to Google Auth

provider.setCustomParameters({
  prompt: "select_account",
});

// The authentication should be unique to the duartion of the connection (not like the provider)
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// get database instance
export const db = getFirestore();

// get auth data and store it in firestore if user doesn't exists
export const createUserDocumentfromAuth = async (userAuth) => {
  // creating document
  // firebase will specify the collection specified if it doesn't exit in the db
  const userDocRef = doc(db, "user", userAuth.uid); // (databse, collection, identifier)

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // Store user document if user id doesn't exist in db
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
};
