import { Button, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import Form from "./Form";

interface props {
  open: boolean;
  handleClose: () => void;
}

function Signup() {
  const [open, setOpen] = useState<boolean>(false);

  const ModalDialog = (props: props) => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <h1> Welcome to Sign up page</h1>
        <Form handleClose={props.handleClose} />
      </Dialog>
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Registrer deg!
      </Button>
      <ModalDialog open={open} handleClose={handleClose} />
    </div>
  );
}

export default Signup;
