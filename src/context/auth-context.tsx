import { User, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import App from "../App";
import { auth, db, signOutUser } from "../firebase";

interface Props {
  children?: ReactNode;
}

export const AuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  user: {} as User | undefined,
  isLoading: true || false,
  admin: true || false,
});
//checker if loading
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [admin, setAdmin] = useState<boolean>(false)
  useEffect(() => {
    const t = async (user: any): Promise<boolean> => {
      if(user){
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef); 
        const data: any = docSnap.data()
        setIsLoading(false);
        return data.admin as boolean
      }
      else{
        return false
      }
    }
    if (user) {
      return;
    }
    const unSubscribeAuth = onAuthStateChanged(
      //Unsubscribe listener
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
     
          const user = authenticatedUser;
          setUser(user); // loading false
          
          setAdmin(await t(user))
          
        } else {
          setUser(undefined);
          setIsLoading(false);
        }
      }
    );
    return unSubscribeAuth;
  }, [user]);

  const value = {
    user,
    isLoading,
    admin,
  };
  console.log(admin)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return "UserAuth must be used within its context provider";
  }
  return context;
};
