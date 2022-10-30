import { useEffect } from "react";
import { getRedirectResult } from "@firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils.js";
import { createUserDocumentfromAuth } from "../../utils/firebase/firebase.utils.js";

const SignIn = () => {
  // used to run functionality after the authentication redirect
  useEffect(() => {
    const fetchUser = async () => {
      // auth it's a singleton
      // auth tracks all of our identification states like an identification back regardless of where the page goes
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentfromAuth(response.user);
      }
    };
    fetchUser();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentfromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
