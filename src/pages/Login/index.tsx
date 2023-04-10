import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  IdTokenResult,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import Signup from "../SignUp";

type userProp = {
  user?: User;
};

export default function LogIn(user: userProp) {
  const [token, setToken] = useState<IdTokenResult>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = createTheme();

  const signInUser = async (e: any) => {
    if (!user.user) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user);
          })
          .finally(() => {
            window.location.href = "/";
            console.log("NAVIGATING");
          })
          .catch((error) => {
            console.log(error.code);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Hello, " + user.user?.displayName);
    }
    e.preventDefault();
  };

  const signOutUser = async (e: any) => {
    try {
      if (user.user) {
        await signOut(auth)
          .then(() => {
            console.log("Logged out");
          })
          .then(() => {
            setToken(undefined);
          })
          .catch((error) => {
            setError(error.message);
          });
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
  };

  const seeName = (e: any) => {
    console.log(user.user?.displayName);
  };

  return (
    <>
      <Button onClick={seeName}>See Name</Button>
      <Button onClick={signOutUser}>SIGN OUT</Button>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}></Avatar>
            <Typography component="h1" variant="h5">
              Logg inn
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-post Adresse"
                name="email" /* Form entry*/
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password" /* Form entry*/
                label="Passord"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "blue" }}
                onClick={signInUser}
              >
                Logg inn
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/signup" variant="body2">
                    {"Glemt passordet ditt?"}
                  </Link>
                </Grid>
                <Grid item>
                  <Signup />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
