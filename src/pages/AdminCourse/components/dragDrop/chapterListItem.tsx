import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useEffect, useMemo, useState } from "react";

import styled, { css } from "styled-components";
import { CourseType, PageType } from "../../../../context/context";
import ListItem from "./PageItem";
import { ChapterType } from "../../../../context/context";
import { Box, Button, Popper, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { DocumentReference, namedQuery } from "firebase/firestore";
interface ToggleProps {
    item : any
    provided: any 
    snapshot: any
    addPage: (chapterId: string) => void
    chapters: ChapterType[]
    chapter: ChapterType
    pages: PageType[]
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
  const [page, setPage] = useState<PageType[]>(Props.pages);
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [textInput, setTextInput] = useState("")

  const onDragEnd = (result: any) => {
    const newpage = Array.from(page);
    const [removed] = newpage.splice(result.source.index, 1);
    newpage.splice(result.destination.index, 0, removed);
    setPage(newpage);
  };
  useEffect(() => {
    let chaptersClone = Props.chapters
    chaptersClone.map((c, index) => {
        if(c.id === Props.chapter.id){
            chaptersClone[index].Pages = page
            Props.setChapters([...chaptersClone])
        }
    })
  },[page])

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
                   {page.map((pageMap: any, index: number) => {

                     //TODO: Elendig kode men får ikke tid tel å sjå på dæ hær.

                    for (const [key, value] of Object.entries(pageMap)) {
                        //make key type any to get objects
                       const keyAsAny = value as any;
                       const NameAndType= key.split("&&");  
                       if(!pageMap.id){
                           return(
                           <Draggable key={keyAsAny.id} draggableId={keyAsAny.id} index={index}>  
                           {(provided, snapshot) => (  
                               <ListItem 
                               key={keyAsAny.id}
                               NameAndType={NameAndType}
                               provided={provided}
                               snapshot={snapshot}
                               item={pageMap}
                               removeItem={Props.removePage}
                               chapterId={Props.chapter.id}
                               pageId={keyAsAny.id}
                               setSelectedPage={Props.setSelectedPage}
                               selected={Props.selectedPage == page}
                               changePageName={Props.changePageName}
                               setChapters={Props.setChapters}
                               chapters={Props.chapters}
                           />
                           )}
                       
                       </Draggable>   
                           )
                       }else{
                        return(
                            <Draggable key={pageMap.id} draggableId={pageMap.id} index={index}>  
                            {(provided, snapshot) => (  
                                <ListItem
                                key={pageMap.id}
                                NameAndType={NameAndType}
                                provided={provided}
                                snapshot={snapshot}
                                item={pageMap}
                                removeItem={Props.removePage}
                                chapterId={Props.chapter.id}
                                pageId={keyAsAny.id}
                                setSelectedPage={Props.setSelectedPage}
                                selected={Props.selectedPage == page}
                                changePageName={Props.changePageName}
                                setChapters={Props.setChapters}
                                chapters={Props.chapters}
                            />
                            )}
                        </Draggable>   
                       
                            )
                       }
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
