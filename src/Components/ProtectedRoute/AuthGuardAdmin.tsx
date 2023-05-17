import { LinearProgress } from "@mui/material";
import { Fragment, ReactElement, ReactNode, useContext } from "react";
import { Navigate, NavigationType, Route } from "react-router-dom";
import { AuthContext, UserAuth } from "../../context/auth-context";

export const AuthGuardAdmin = ({ children }: { children: ReactNode }) => {
  const { user, isLoading, admin} = useContext(AuthContext);
  if (isLoading) {
    return <LinearProgress />;
  } else if (!user) {
    return <Navigate to="/login" />;
  } else if (!admin && user){
    return <Navigate to="/error" state={"Bruker har ikke admin tilgang"}/>
  }
  return <>{children}</>;
};
