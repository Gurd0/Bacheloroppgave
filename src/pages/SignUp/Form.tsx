import { Box, Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import FeedBackError from "../../Components/feedBack/feedBackError";
import { auth, db } from "../../firebase";

interface props {
  handleClose: () => void;
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "4em",
  width: "100%",
  height: "30em",

  backgroundColor: "white",
};

const sxStyleTextField = {
  marginTop: 1,
  width: "80%",
};
const sxStyleButton = {
  margin: 2,
};

const Form = (props: props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [feedBack, setFeedBack] = useState("none")

  //TODO: Need to update profile with given firstname and lastname
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const name = firstName + " " + lastName;
        setDoc(doc(db, "Users", userCredentials.user.uid), {
          displayName: name,
          email: userCredentials.user.email,
        });
      }).catch((err) => {
        const error = err.toString().split(/[()]/)
        const userError = error[1].split("/")
        setFeedBack(userError[1])
      })
      .then((userCredentials) => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: firstName + " " + lastName,
          });
          props.handleClose();
          
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
   
  };

  return (
    //onSubmit={handleSubmit} TODO: On submit with button type="submit" results in error in regards to firebase.
    <>
    {(feedBack != "none" && feedBack != "Success") && 
          <FeedBackError feedBack={feedBack} open={true} setFeedBack={setFeedBack}/>
      }
    <Box component="form" sx={formStyle} noValidate >
      <TextField
        sx={sxStyleTextField}
        label="First Name"
        variant="filled"
        required
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        sx={sxStyleTextField}
        label="Last Name"
        variant="filled"
        required
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        sx={sxStyleTextField}
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={sxStyleTextField} 
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <Button
          variant="contained"
          onClick={props.handleClose}
          sx={sxStyleButton}
        >
          avbryt
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={sxStyleButton}
          onClick={handleSubmit}
        >
          fullfør
        </Button>
      </div>
    </Box>
    </>
  );
};

export default Form;
