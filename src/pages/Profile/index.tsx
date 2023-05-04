import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { auth, signInUser, signOutUser } from "../../firebase";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { uid }: any = useParams();

  return (
    <div >
      {user && (
        <>
          <h1>Hello, {user.displayName}</h1>
          <Button onClick={(e: any) => signOutUser(e, auth)}>SIGN OUT</Button>
        </>
      )}
    </div>
  );
}
