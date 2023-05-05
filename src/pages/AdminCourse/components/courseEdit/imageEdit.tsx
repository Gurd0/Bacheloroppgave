import { TextField } from "@mui/material";
import React from "react";
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
    if (textField) props.setPageValue(textField);
  }, [textField]);

  //TODO: Add the choice between add from source, and add from local storage->db
  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h2>Image Url</h2>
      <TextField value={props.pageValue} onChange={handleTextInputChange} />
      <ImageUploader setPageValue={props.setPageValue} />
    </div>
  );
};

export default ImageEdit;
