import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <Box
      id="main-container"
      sx={{
        width: "100% - 1px",
        height: "4em",
        display: "flex",
        justifyContent: "stretch",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          width: "80%",
          height: "90%",
          paddingLeft: "2%",
        }}
      >
        <Button
          href="/"
          sx={{
            width: "10em",
            height: "auto",
          }}
          startIcon={
            <Avatar
              src="https://ec-play.com/static/media/ECPlayLogo.4d6cf161.svg"
              variant="square"
              sx={{
                width: "100%",
                height: "100%",
              }}
            />
          }
        ></Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          width: "80%",
          paddingRight: "2%",
        }}
      >
        <Button
          onClick={() => navigate("/profile/:uid")}
          sx={{
            width: "3em",
            height: "100%",
            borderRadius: "50%",
          }}
        >
          <Avatar sx={{ width: "80%", bgcolor: "black" }} />
        </Button>
      </Box>
    </Box>
  );
}
