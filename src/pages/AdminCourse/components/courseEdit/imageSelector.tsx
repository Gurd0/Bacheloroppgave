import { TextField } from "@mui/material";
import {
  StorageReference,
  getBlob,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useState } from "react";
import { PageType } from "../../../../context/context";
import { imagesRef, storage } from "../../../../firebase";

interface ToggleProps {
  setPageValue: (value: any) => void;
}
const ImageUploader = (props: ToggleProps) => {
  const [file, setFile] = useState<File>();
  const [reference, setReference] = useState<StorageReference>();
  const [url, setURL] = useState<string>();
  // 'file' comes from the Blob or File API

  React.useEffect(() => {
    if (file) setReference(ref(storage, imagesRef + "/" + file.name));
  }, [file]);

  //TODO: Remove any-type
  function handleEvent(e: any) {
    if (e.target) {
      setFile(e.target.files[0]);
      console.log(file?.type);
    } else {
      console.log("no file");
    }
  }

  const getUrlFromDB = () => {
    if (file && reference) {
      getDownloadURL(ref(storage, imagesRef + "/" + file.name))
        .then((url) => {
          console.log(url);
          setURL(url);
          props.setPageValue(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("URL not found!");
    }
  };
  const upload = () => {
    if (file && reference) {
      uploadBytes(reference, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        console.log(snapshot.ref);
        getUrlFromDB();
      });
    } else {
      console.log("Upload failed, no file selected!");
    }
  };

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
