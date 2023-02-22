import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React from "react";

const styledIcon= {
    height: "2.5em",
    width: "auto",
    color: "black",
}

export default function Footer(){
    return (
        <Box className='Box-footer' sx={{
          width: '100%',
        }}>
          <hr style={{width:"100%"}}></hr>
          <Grid sx={{
                width: "100%",
                margin: "auto",
                display: "grid",
                padding: "40px",
                gridGap: "16px",
                alignItems: "center",
                gridTemplateColumns: "1fr 1fr 1fr",
          }}> 
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
            }}>
              <Grid 
              sx={{
                width: "95%",
                display: "flex",
                justifyContent: 'space-evenly',
              }}>
                <IconButton href="#"><FacebookIcon sx={styledIcon}/></IconButton>
                <IconButton href="#"><InstagramIcon sx={styledIcon}/></IconButton>
                <IconButton href="#"><LinkedInIcon sx={styledIcon}/></IconButton>
                <IconButton href="#"><YouTubeIcon sx={styledIcon}/></IconButton>
              </Grid>
            </Box>
            <Box>
                <p>© Espen&Gard 2023 </p>
            </Box>
            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
                <Button  variant="contained" style={{width:"50%", background:"black"}}>English</Button>
                <a href="#">Privacy</a>
            </Box>
          </Grid>
          </Box>
      );
}