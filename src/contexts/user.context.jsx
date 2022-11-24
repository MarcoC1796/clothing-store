import { createContext, useState } from "react";

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
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
