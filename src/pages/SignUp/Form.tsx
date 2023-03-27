import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";

interface props {
  handleClose: () => void;
}

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 2,
  width: "500px",
  height: "600px",
  margin: 2,
  backgroundColor: "white",
};

const sxStyleTextField = {
  // TODO: Find better styling options for MUI components
  margin: 1,
  width: "350px",
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

  //TODO: Need to update profile with given firstname and lastname
  const handleSubmit = async (e: any) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = auth.currentUser;
        console.log(user); //TODO: Send to profilepage, can be done with react-router-dom or window.location.href
        console.log("User created " + auth.currentUser?.displayName);
        console.log(firstName + " " + lastName + " " + email + " " + password);
      })
      .then((userCredentials) => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: firstName + " " + lastName,
          });
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        setError(error.message);
        //console.log(errorMessage + " " + errorCode);
      });
    props.handleClose();
  };

  return (
    //onSubmit={handleSubmit} TODO: On submit with button type="submit" results in error in regards to firebase.
    <form style={formStyle}>
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
        onChange={(e) => setEmail(e.target.value)} // TODO: Add popup if an invalid email is provided
      />
      <TextField
        sx={sxStyleTextField} //TODO: Add error handling if password is under 6 characters, this is already implemented in firebase libraries.
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
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={sxStyleButton}
          onClick={handleSubmit} // TODO: Add popup if an invalid, that implies empty textfields
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
