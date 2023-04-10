import { TextField } from "@mui/material";
import { StorageReference, listAll, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { PageType } from "../../../../context/context";
import { imagesRef, storage } from "../../../../firebase";

const ImageUploader = () => {
  const [file, setFile] = useState<File>();
  const [reference, setReference] = useState<StorageReference>();

  // 'file' comes from the Blob or File API
  const upload = () => {
    if (file && reference) {
      uploadBytes(reference, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    } else {
      console.log("Upload failed, no file selected!");
    }
  };

  React.useEffect(() => {
    if (file) setReference(ref(storage, imagesRef + "/" + file.name));
  }, [file]);

  //TODO: Remove any-type
  function handleEvent(e: any) {
    if (e.target) {
      setFile(e.target.files[0]);
      //   upload();
    } else {
      console.log("no file");
    }
  }

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h2>Upload image to database</h2>
      <input type="file" accept="image/*" onChange={handleEvent} />
      <button onClick={upload}> Upload to Firebase</button>
    </div>
  );
};

export default ImageUploader;
