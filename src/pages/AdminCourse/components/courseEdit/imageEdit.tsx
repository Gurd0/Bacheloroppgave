import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ModalBox } from "../../../../Components/modalBox";
import { PageType } from "../../../../context/context";
import {
  default as ImageUploader,
} from "./imageUploader";

interface ToggleProps {
  setPageValue: (value: any) => void;
  pageValue: any;
  selectedPage: PageType;
}

const ImageEdit = (props: ToggleProps) => {
  const [textField, setTextField] = React.useState<string>();
  const [open, setOpen] = useState<boolean>(false)

  const handleTextInputChange = (event: {
    target: { value: React.SetStateAction<string | undefined> };
  }) => {
    setTextField(event.target.value);
  };

  React.useEffect(() => {
    if (typeof props.pageValue === "string") {
      setTextField(props.pageValue);
    }
  }, [props.pageValue]);

  React.useEffect(() => {
    if (textField){
       props.setPageValue(textField);
      
      }
  }, [textField]);

  //TODO: Add the choice between add from source, and add from local storage->db
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h2>Bilde Url</h2>
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        
      }}>
      <TextField value={props.pageValue} onChange={handleTextInputChange} />
      <Button onClick={() => {
          setOpen(!open)
      }}>Last Opp Bile</Button>
      </div>
    <ModalBox open={open} setOpen={setOpen}>
      <ImageUploader setPageValue={props.setPageValue} setTextField={setTextField}/>
      </ModalBox>
    </div>
  );
};

export default ImageEdit;
