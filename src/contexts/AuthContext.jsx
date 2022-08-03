import { useState, useEffect } from "react";
import { createContext } from "react";
import { userObserver } from "../helpers/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setShow, show }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
