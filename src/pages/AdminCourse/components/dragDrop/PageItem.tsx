import { Draggable } from "react-beautiful-dnd";
import React, { useEffect, useMemo, useState } from "react";

import styled, { css } from "styled-components";
import { PageType } from "../../../../context/context";
import { Box, Button, Grid, Popper, TextField } from "@mui/material";
import { red } from "@mui/material/colors";

interface ToggleProps {
    item : PageType
    provided: any 
    snapshot: any
    removeItem: (chapterId: string, pageId: string) => void
    chapterId: string
    pageId: string
    setSelectedPage: any
    selected: boolean
    changePageName: (chapterId: string, pageId: string, name: string) => void
}

let StyleDiv = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

 function PageItem(Props: ToggleProps) {
  const [color, setColor] = useState<string>("black")
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false)
  const [textInput, setTextInput] = useState("")
    // Check for click type 
    const handleClick = (e: any) => {
        switch (e.detail) {
          // on double click 
          case 2:
            console.log("double click");
            const page = Props.item
            Props.setSelectedPage(page)

            break;
        }
      };
    //Set color on selected page
    useEffect(() => {
      if(Props.selected){
        setColor("green")
     
      }else{
        setColor("black")
    
      }
    },[Props.selected]) 
  return (
    <StyleDiv
      ref={Props.provided.innerRef}
      snapshot={Props.snapshot}
      {...Props.provided.draggableProps}
      {...Props.provided.dragHandleProps}
      //style={styleItem}
      onClick={handleClick}
    >

      <Grid container spacing={2} >
        <Grid item xs={8} >
        <div style={{
          color: color
        }}>{Props.item.Name}   :   {Props.item.Type}</div>
        </Grid>
        <Grid item xs={4} >
        
        <button onClick={() => {
            Props.removeItem(Props.chapterId, Props.pageId)
         }}>Remove</button>
         <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
           // Props.changePageName(Props.chapterId, Props.pageId)
           setOpen(!open)
           setAnchorEl(event.currentTarget);
         }}>Change Name</button>
          <Popper id={"ChangeChapterName"} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper'}}>
            <TextField id="standard-basic" label="Page Name" variant="standard" onChange={(event) =>{
                setTextInput(event.target.value);
            }}/>
            <Button onClick={() => {
                setOpen(!open)
                Props.changePageName(Props.chapterId, Props.pageId, textInput)
            }}>Ok</Button>
            </Box>
        </Popper>
         
        </Grid>
      </Grid>
    </StyleDiv>
  );
};

export default PageItem;
