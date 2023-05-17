import { Box, Button, Input, Typography } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { imagesRef, storage } from "../../../../firebase";

interface ToggleProps {
  setPageValue: (value: any) => void;
}
const ImageUploader = (props: ToggleProps) => {
  const [file, setFile] = useState<File>();
  const [reference, setReference] = useState<StorageReference>();
  const [imagePreview, setImagePreview] = useState<string>();
  const [progress, setProgress] = useState<number>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    // if (props.value === 100) return <p>No background activity</p>;
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

  // 'file' comes from the Blob or File API

  React.useEffect(() => {
    if (file) setReference(ref(storage, imagesRef + "/" + file.name));
  }, [file]);

  React.useEffect(() => {
    if (progress) console.log(progress);
  }, [progress]);

  React.useEffect(() => {
    if (imagePreview) {
      setSuccess(false);
      setProgress(0);
    }
  }, [imagePreview]);

  //TODO: Remove any-type
  function handleEvent(e: any) {
    //Create constraints for selecting of files, that is images only
    if (e.target) {
      setFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0])); //Setting image preview
    } else {
      console.log("no file");
    }
  }

  const upload = () => {
    if (file && reference) {
      //Code inspired from https://firebase.google.com/docs/storage/web/upload-files
      const uploadTask = uploadBytesResumable(reference, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          switch (snapshot.state) {
            case "paused":
              setUploading(false);
              break;
            case "running":
              setUploading(true);
              break;
          }
        },
        (error) => {
          console.log(error);
          setUploading(false);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          setSuccess(true);
          if (file) {
            getDownloadURL(ref(storage, imagesRef + "/" + file.name))
              .then((url) => {
                props.setPageValue(url);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      );
    } else {
      console.log("No file or reference provided");
    }
  };

  return (
    <Box
      sx={{
        marginTop: 1,
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Upload image to database</h2>{" "}
      {(() => {
        if (uploading && progress && !success) {
          return <CircularProgressWithLabel value={progress} />;
        } else if (success) {
          return <p>SUCCESS!</p>;
        } else {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress variant="determinate" value={100} />
            </Box>
          );
        }
      })()}
      <Input type="file" color="primary" onChange={handleEvent} />
      <Button onClick={upload}> Upload to Firebase</Button>
      {imagePreview ? (
        <img
          style={{
            width: "15em",
            height: "15em",
          }}
          src={imagePreview}
          alt=""
        />
      ) : null}
    </Box>
  );
};

export default ImageUploader;
