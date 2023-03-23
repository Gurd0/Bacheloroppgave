import { Alert } from "@mui/lab";
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
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import Signup from "../SignUp";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = createTheme();

  const handleSubmit = async (e: any) => {
    if (!auth.currentUser) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            console.log(user?.email); //TODO: Send to profilepage, can be done with react-router-dom or window.location.href
            console.log("User logged in: " + user);
          })
          .finally(() => {
            window.location.href = "/";
          })
          .catch((error) => {
            return <Alert>{error.code}</Alert>;
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Hello, " + auth.currentUser.email);
    }
    e.preventDefault();
  };

  const signOutButton = async (e: any) => {
    if (auth.currentUser) {
      await signOut(auth)
        .then(() => {
          console.log("Logged out");
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      console.log("No user logged in");
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("Authstate changed: " + user?.email);
    });
  }, [auth.currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <Button onClick={signOutButton}>Sign out</Button>
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
              onClick={handleSubmit}
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
  );
}
