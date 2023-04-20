import { User } from "firebase/auth";
import React, { ReactNode, useContext, useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext, UserAuth } from "../../context/auth-context";

interface navigationProps {
  children?: ReactNode;
}

const ProtectedRoute = (props: navigationProps) => {
  const user = UserAuth();

  if (!user) {
    console.log("no user");
    return <></>;
  }
  // } else {
  //   return <>{props.children}</>;
  // }
  return <>{props.children}</>;
};

export default ProtectedRoute;
