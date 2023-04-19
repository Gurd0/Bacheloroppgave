import { User } from "firebase/auth";
import React, { ReactNode, useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

interface navigationProps {
  children?: ReactNode;
}

const ProtectedRoute = (props: navigationProps) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    console.log("no user");
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  } else {
    return <>{props.children}</>;
  }
};

export default ProtectedRoute;
