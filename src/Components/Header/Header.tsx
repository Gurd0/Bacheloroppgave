import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import ecPlayLogo from "../../Assets/Images/ecPlayLogo.svg";

export default function Header() {

    return (
        <Box id='main-container'
        sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent: 'stretch',
            border: "1px solid rgba(0, 0, 0, 0.12)",
        }}>
            <Box
            sx={{
                    marginTop: "1%",
                    marginBottom: "1%",
                    display: "flex",
                    justifyContent: "left",
                    width: '80%',
                    paddingLeft: "2%",

            }}
            >
                <Button href="/" sx={{
                    width:"10em"
                }} startIcon={<Avatar variant='square' sx={{
                    width: "100%",
                    height: "100%",
                }} src={ecPlayLogo}/>}>
                    
                </Button>
            </Box>            
            <Box
            sx={{
                marginTop: "1%",
                marginBottom: "1%",
                display: "flex",
                justifyContent: "right",
                width: '80%',
                paddingRight: "2%",

            }}
            >
               <Button href="/#" /*Profilepage*/><Avatar sx={{bgcolor: 'black'}} /></Button>

            </Box>
        </Box>
    );
}   
   