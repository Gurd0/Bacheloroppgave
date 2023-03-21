import { Button, TextField } from "@mui/material";
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import { display } from "@mui/system";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(firstName + " " + lastName + " " + email + " " + password); // TODO: Add functionality for firebase authentication, and usercreation
    props.handleClose();
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
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
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={sxStyleButton}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Form;
