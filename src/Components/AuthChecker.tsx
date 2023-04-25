import { LinearProgress } from "@mui/material";

import { createTheme } from "@mui/material/styles";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { auth, signInUser, signOutUser } from "../firebase";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function AuthChecker() {
  const { user, isLoading } = useContext(AuthContext);

  return <>{isLoading ? <LinearProgress /> : user ? <Home /> : <Login />}</>;
  {
    /*Navigate */
  }
}
