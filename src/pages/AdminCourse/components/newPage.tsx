import React, { useRef, useState } from 'react'

import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { text } from 'stream/consumers';

interface ToggleProps {
    //TODO bytt tel enum
    setPageType: (type: string) => void
}

const NewPage = (Props: ToggleProps) => {
    const [textInput, setTextInput] = useState('');

    const buttonStyle = {
        display: "center",
        height: "50px",
        width: "100px"
    }
    const handleTextInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTextInput(event.target.value);
    };
    
    //TODO lægg tel if imput empty
  return (
    <>
    <Grid display={'flex'} flexDirection={'column'} textAlign={'center'} paddingTop={"20px"}>
        <Box paddingBottom={"20px"}>
            <TextField id="standard-basic" label="Page Name" variant="standard" onChange= {handleTextInputChange}/>
        </Box>
        <Box>
            <Button variant="outlined" style={buttonStyle} onClick={() =>{
                Props.setPageType("Text")
            }} > 
            Text 
            </Button>
        </Box>
        <Box>
        <Button variant="outlined" style={buttonStyle} onClick={() =>{
                Props.setPageType("Image")
            }} > 
            Image 
            </Button>
        </Box>
        <Box>
        <Button variant="outlined" style={buttonStyle} onClick={() =>{
               Props.setPageType("Video")
            }} > 
            Video 
            </Button>
        </Box>
        <Box>
        <Button variant="outlined" style={buttonStyle} onClick={() =>{
               Props.setPageType("Quiz")
            }} > 
            Quiz 
            </Button>
        </Box>
    </Grid>     
    </>
  )
}


export default NewPage