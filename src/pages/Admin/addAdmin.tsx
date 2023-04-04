import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {
  IdTokenResult,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

export default function MakeAdmin() {
  const [email, setEmail] = useState("");
  const theme = createTheme();
  function makeAdmin() {}

  return (
    <>
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
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "blue" }}
                onClick={makeAdmin}
              >
                MAKE ADMIN
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
