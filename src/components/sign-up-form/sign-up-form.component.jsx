import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentfromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentfromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // update the state of the correct input based on the name atrribute
    // equivalent to:
    /*
    const temp = { ...formFields };
    temp[name] = value;
    setFormFields(temp);
    */
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          name="displayName"
          value={displayName}
          type="label"
          required
          onChange={handleChange}
        />

        <label>Email</label>
        <input name="email" value={email} required onChange={handleChange} />

        <label>Password</label>
        <input
          name="password"
          value={password}
          type="password"
          required
          onChange={handleChange}
        />

        <label>confirm Password</label>
        <input
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          required
          onChange={handleChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;