import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import {  PageType } from "../../../../context/context";
import ListItem from "./PageItem";
import { ChapterType } from "../../../../context/context";
import { Box, Button, Popper, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface ToggleProps {
    provided: any 
    snapshot: any
    addPage: (chapterId: string) => void
    chapters: ChapterType[]
    chapter: ChapterType
    changeChapterName: (name: string, id: string) => void
    removePage: (chapterId: string, pageId: string) => void
    setSelectedPage: any
    selectedPage: any
    changePageName: (chapterId: string, pageId: string, name: string) => void
    removeChapter: (chapterId: string) => void
    setChapters: any
}
const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

 function ChapterListItem(Props: ToggleProps) {
  const [pages, setPages] = useState<PageType[]>(Props.chapter.Pages);
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [textInput, setTextInput] = useState("")


  const onDragEnd = (result: any) => {
    const newpage = Array.from(pages);
    const [removed] = newpage.splice(result.source.index, 1);
    newpage.splice(result.destination.index, 0, removed);
    setPages(newpage);
  };
  useEffect(() => {
    let chaptersClone = Props.chapters
    chaptersClone.map((c, index) => {
        if(c.id === Props.chapter.id){
            chaptersClone[index].Pages = pages
            Props.setChapters([...chaptersClone])
        }
    })
  },[pages])

  return (
    <DragItem
      ref={Props.provided.innerRef}
      snapshot={Props.snapshot}
      {...Props.provided.draggableProps}
      {...Props.provided.dragHandleProps}
    >
        
       <h2>
        {Props.chapter.ChapterName} 
       <Button 
       title={"Change name"}
       startIcon={<BorderColorIcon />}
       onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(!open)
        setAnchorEl(event.currentTarget);
       }}>Change Name</Button>

       <div style={{
        display: 'flex',
        alignContent: "space-between",
       }}>
       <Button  title={"Add Chapter"} onClick={() => Props.addPage(Props.chapter.id) } startIcon={<AddIcon />}></Button>
       <Button  title={"Remove Chapter"} startIcon={<RemoveIcon />} onClick={() => {
            Props.removeChapter(Props.chapter.id)
       }}> </Button>
       
        </div>
       </h2>
      
       <Popper id={"ChangeChapterName"} open={open} anchorEl={anchorEl}>
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper'}}>
            <TextField id="standard-basic" label="Page Name" variant="standard" onChange={(event) =>{
                setTextInput(event.target.value);
            }}/>
            <Button onClick={() => {
                setOpen(!open)
                Props.changeChapterName(textInput, Props.chapter.id)
            }}>Ok</Button>
            </Box>
        </Popper>
       <DragDropContext onDragEnd={onDragEnd}>  
        <Droppable droppableId="droppablePage" >  
            {(provided) => (  
                <div  
                    {...provided.droppableProps}  
                    ref={provided.innerRef}  
                > 
                <>
                   {Props.chapter.Pages.map((page: any, index: number) => {

                        let selected = false
                        if( Props.selectedPage?.id && page?.id){
                          selected = Props.selectedPage.id === page.id
                        }
                        
                        if(page.id){
                        return(
                            <Draggable key={page.id} draggableId={page.id} index={index}>  
                            {(provided, snapshot) => (  
                                <ListItem
                                key={page.id}
                                provided={provided}
                                snapshot={snapshot}
                                item={page}
                                removeItem={Props.removePage}
                                chapterId={Props.chapter.id}
                                pageId={page.id}
                                setSelectedPage={Props.setSelectedPage}
                                selected={selected}
                                changePageName={Props.changePageName}
                                setChapters={Props.setChapters}
                                chapters={Props.chapters}
                            />
                            )}
                        </Draggable>   
                       
                            )
                    }
                
                    })}  
                    </>
                    {provided.placeholder} 
                </div>  
            )}  
        </Droppable> 
    </DragDropContext>
    </DragItem>
  );
};

export default ChapterListItem;
