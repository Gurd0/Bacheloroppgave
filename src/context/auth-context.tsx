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
  isLoading: true || false,
});
//checker if loading
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user && isAuthenticated) {
      return;
    }
    const unSubscribeAuth = onAuthStateChanged(
      //Unsubscribe listener
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
     
          const user = authenticatedUser;
          setUser(user); // loading false
          setIsAuthenticated(true);
          setIsLoading(false);
          // authenticatedUser
          //   .getIdToken(true)
          //   .then((token) => console.log("Auth token: " + token));
        } else {
          setUser(undefined);
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );
    return unSubscribeAuth;
  }, [user, isAuthenticated]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
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
