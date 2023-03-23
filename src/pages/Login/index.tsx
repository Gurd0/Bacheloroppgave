import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import Signup from "../SignUp";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const theme = createTheme();

  const handleSubmit = async (e: any) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(auth.currentUser?.email); //TODO: Send to profilepage, can be done with react-router-dom or window.location.href
          console.log("User logged in: " + user);
          console.log(email + " " + password);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const errorCode = error.code;
          //console.log(errorMessage + " " + errorCode);
        });
    } catch (error) {
      console.log(error);
    }
    e.preventDefault();
  };

  return (
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
