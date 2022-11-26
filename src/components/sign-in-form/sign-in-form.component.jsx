import { useState, useEffect } from "react";

import { getRedirectResult } from "@firebase/auth";

import FormInput from "../form-input/form-input.component";
import Button from "../button.component.jsx/button.component";

import {
  auth,
  createUserDocumentfromAuth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // used to run functionality after the authentication redirect
  useEffect(() => {
    const fetchUser = async () => {
      // auth it's a singleton
      // auth tracks all of our identification states like an identification back regardless of where the page goes
      // const response = await getRedirectResult(auth);
      // The following code is no longer necesary
      // The userContext handles the document creation after the auth changes
      // We keep the code for learning purposes.
      // if (response) {
      //   await createUserDocumentfromAuth(response);
      // }
    };
    fetchUser();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          value={email}
          type="label"
          required
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          name="password"
          value={password}
          type="password"
          required
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            comment={"type button will prevent that the forms submits"}
            type={"button"}
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
        <br />
        <Button
          type="button"
          buttonType={"google"}
          onClick={signInWithGoogleRedirect}
        >
          Redir Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
