import { User, onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import App from "../App";
import { auth, signOutUser } from "../firebase";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  user: {} as User | undefined,
  isAuthenticated: true || false,
});
//checker if loading
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    if (user && isAuthenticated) {
      return;
    }
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          console.log("Auth set: " + authenticatedUser.displayName);
          const user = authenticatedUser;
          setUser(user); // loading false
          setIsAuthenticated(true);
          // authenticatedUser
          //   .getIdToken(true)
          //   .then((token) => console.log("Auth token: " + token));
        } else {
          setUser(undefined);
          setIsAuthenticated(false);
          console.log("Auth set to none");
        }
      }
    );
    return unSubscribeAuth;
  }, [user]);

  const value = {
    user,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return "UserAuth must be used within its context provider";
  }
  return context;
};
