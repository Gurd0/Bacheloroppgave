import { LinearProgress } from "@mui/material";
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
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { auth, signInUser, signOutUser } from "../../firebase";
import Home from "../Home";
import Signup from "../SignUp";

export default function LogIn() {
  const [token, setToken] = useState<IdTokenResult>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = createTheme();
  const { user } = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const seeName = (e: any) => {
    console.log(user?.displayName);
  };
  useEffect(() => {
    if (!user) {
      return;
    } else {
      setIsLoggingIn(false);
    }
  }, [user]);

  if (user && !isLoggingIn) {
    return <Home />;
  }

  if (isLoggingIn) {
    return <LinearProgress />;
  }

  return (
    <>
      <Button onClick={seeName}>See Name</Button>
      {user && (
        <>
          {" "}
          <Button onClick={(e: any) => signOutUser(e, auth)}>SIGN OUT</Button>
        </>
      )}
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
                onClick={(e: any) => {
                  signInUser(e, email, password);
                  setIsLoggingIn(true);
                }}
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
