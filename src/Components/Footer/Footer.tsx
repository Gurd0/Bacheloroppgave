import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

const styledIcon= {
    height: "2.5em",
    width: "auto",
    color: "black",
}

export default function Footer(){
    return (
        <Box className='Box-footer' sx={{
          maxWidth: '100%',
          borderTop: "1px solid black"
        }}>
          <Grid sx={{
                width: "100%",
                margin: "auto",
                display: "grid",
                
               
                alignItems: "center",
                gridTemplateColumns: "5fr 1fr",
          }}> 
            <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              <Grid 
              sx={{
                width: "95%",
                
              }}>
                <div style={{flexGrow: "5"}}>
                  <IconButton href="#"><FacebookIcon sx={styledIcon}/></IconButton>
                  <IconButton href="#"><InstagramIcon sx={styledIcon}/></IconButton>
                  <IconButton href="#"><LinkedInIcon sx={styledIcon}/></IconButton>
                  <IconButton href="#"><YouTubeIcon sx={styledIcon}/></IconButton>
                </div>
              </Grid>
            </Box>
            <Box style={{flexGrow: "1"}}>
                <p>© Espen&Gard 2023 </p>
            </Box>
       
          </Grid>
          </Box>
      );
}