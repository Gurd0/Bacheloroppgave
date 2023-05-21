import { Dialog, LinearProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import FeedBackError from "../../Components/feedBack/feedBackError";
import { AuthContext } from "../../context/auth-context";
import { auth, signInUser, signOutUser } from "../../firebase";
import Home from "../Home";
import Form from "./SignUp/Form";


export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = createTheme();
  const { user } = useContext(AuthContext);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [feedBack, setFeedBack] = useState<string>("none")
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  const userFeedBack = (err: string) => {
    const error = err.toString().split(/[()]/)
    const userError = error[1].split("/")
    setFeedBack(userError[1])
    setIsLoggingIn(false);
  }
  const tryLogin = (e: any) => {
    signInUser(e, email, password, userFeedBack);
    setIsLoggingIn(true);
  }
  return (
    <>
    {(feedBack != "none" && feedBack != "Success") && 
          <FeedBackError feedBack={feedBack} open={true} setFeedBack={setFeedBack}/>
      }
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
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "blue" }}
                onClick={tryLogin}
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
                <div>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                  Registrer deg!
                </Button>
                <Dialog open={open} onClose={handleClose}>
                <h1> Welcome to Sign up page</h1>
                <Form handleClose={handleClose} />
              </Dialog>
              </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
