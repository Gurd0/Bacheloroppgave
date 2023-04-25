import { LinearProgress } from "@mui/material";
import { Fragment, ReactElement, ReactNode, useContext } from "react";
import { Navigate, NavigationType, Route } from "react-router-dom";
import { AuthContext, UserAuth } from "../../context/auth-context";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LinearProgress />;
  } else if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
