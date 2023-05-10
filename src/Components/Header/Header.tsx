import { Avatar, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box
      id="main-container"
      sx={{
        
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        height: "4em",
        
        display: "flex",
        justifyContent: "stretch",
        borderBottom: "1px solid black",
        zIndex: 10,
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
          
          onClick={() => navigate('')}
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
          onClick={() => navigate("/profile/" + user?.uid)}
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
