import { Avatar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import ecPlayLogo from "../../Assets/Images/ecPlayLogo.svg";

export default function Header() {

    return (
        <Box id='main-container'
        sx={{
            width: '100%',
            height: '3em',
            display: 'flex',
            justifyContent: 'stretch',
            border: "1px solid rgba(0, 0, 0, 0.12)",
            paddingTop: "8px",
            paddingBottom: "8px",
        }}>
            <Box
            sx={{
                    display: "flex",
                    justifyContent: "left",
                    width: '80%',
                    height: '90%',
                    paddingLeft: "2%",

            }}
            >
                <Button href="/" sx={{
                    width:"10em",
                    height: "auto",
                }} startIcon={<Avatar variant='square' sx={{
                    width: "100%",
                    height: "100%",
                }} src={ecPlayLogo}/>}>
                    
                </Button>
            </Box>            
            <Box
            sx={{
                display: "flex",
                justifyContent: "right",
                width: '80%',
                paddingRight: "2%",

            }}
            >
               <Button href="/#" sx={{
                width: "3em",
                height: "100%",
                borderRadius: "50%",
               }} /*Profilepage*/><Avatar sx={{height: "100%", width: "80%", bgcolor: 'black'}} /></Button>

            </Box>
        </Box>
    );
}   
   