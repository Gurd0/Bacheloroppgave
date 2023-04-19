import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import App from "../App";
import { auth, signOutUser } from "../firebase";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  user: {} as User | undefined,
  setUser: (_user: User) => {},
});
//checker if loading
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          console.log("Auth set: " + authenticatedUser.displayName);
          const user = authenticatedUser;
          setUser(user); // loading false
          // authenticatedUser
          //   .getIdToken(true)
          //   .then((token) => console.log("Auth token: " + token));
        } else {
          setUser(undefined);
          console.log("Auth set to none");
        }
      }
    );
    return unSubscribeAuth;
  }, []);

  const value = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
