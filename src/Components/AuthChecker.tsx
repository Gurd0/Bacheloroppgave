import { LinearProgress } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import Home from "../pages/Home";
import Login from "../pages/Login";

export default function AuthChecker() {
  const { user, isLoading } = useContext(AuthContext);

  return <>{isLoading ? <LinearProgress /> : user ? <Home /> : <Login />}</>;
  {
    /*Navigate */
  }
}
