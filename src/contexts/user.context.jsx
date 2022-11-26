import { createContext, useState, useEffect } from "react";
import {
  createUserDocumentfromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

// values you want to access (kind of a global state)
// we set some initial values.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Component that will provide access to values
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentfromAuth(user);
      }
      setCurrentUser(user);
    });
    // useEffect runs whatever it returns
    // we need to unsubscribe from the observer of the auth whenever this component unmounts
    // to avoid memory leaks.
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
