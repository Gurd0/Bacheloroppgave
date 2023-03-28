import { Backdrop, Box, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import { StringMappingType } from "typescript";
import { PageType, ChapterType } from '../../../../context/context';
import ChapterListItem from "./chapterListItem";



  interface ToggleProps {
    chapters: ChapterType[]
    setChapters: any; 
    setSelectedPage: any;
    selectedPage: any
  }
  
const ChapterDragDrop = (Props: ToggleProps) => {
    const [open, setOpen] = useState(false);

    const onDragEnd = (result: any) => {
        const newpage = Array.from(Props.chapters);
        const [removed] = newpage.splice(result.source.index, 1);
        newpage.splice(result.destination.index, 0, removed);
        Props.setChapters(newpage);
      };
      useEffect(() => {
        Props.setChapters(Props.chapters)
      },[Props.chapters]) 

    const addPage = (chapterId: String) =>{
        const result = Math.random().toString(36).substring(2,7);

        const p: PageType =  {
            Name: "new",
            id: result,
            Type: "new",
        }
    
        let pList = Props.chapters
        Props.chapters.map((value, index) => {
            if(value.id == chapterId){
                pList[index].Pages.push(p)
                Props.setChapters([...pList])
            }
        })
    }
    const changeChapterName = (name: string, id: string) => {
        Props.chapters.map((chapter, index) =>{
            if(chapter.id == id){
                let chaptersClone: ChapterType[] = Props.chapters
                chaptersClone[index].ChapterName = name
                Props.setChapters([...chaptersClone])
            }
        })
    }
    
    const handleClose = () => {
        setOpen(false);
    };
    const removePage = (chapterId: string, pageId: string) => {
        let chapterIndex: number
        let chapterClone: ChapterType[] = Props.chapters
        console.log(chapterId + " : "+ pageId)
        Props.chapters.map((chapter, index) => {
            if(chapter.id == chapterId){
                chapterIndex = index
                chapter.Pages.map((page: PageType, index: number) => {
                    if(page.id == pageId){
                        chapterClone[chapterIndex].Pages.splice(index, 1)
                        Props.setChapters([...chapterClone])
                    }
                })
            }
        })
      }
  return ( 
    <Box>
        <DragDropContext onDragEnd={onDragEnd}>  
        <Droppable droppableId="droppableChapter" >  
            {(provided) => (  
                <div  
                    {...provided.droppableProps}  
                    ref={provided.innerRef}  
                >  
                    {Props.chapters.map((chapter: ChapterType, index: number) => (  
                        <Draggable key={chapter.id} draggableId={chapter.id} index={index} >  
                            {(provided, snapshot) => (  
                                <ChapterListItem
                                provided={provided}
                                snapshot={snapshot}
                                item={"item"}
                                addPage={addPage}
                                chapter={chapter}
                                pages={chapter.Pages}
                                changeChapterName={changeChapterName}
                                removePage={removePage}
                                setSelectedPage={Props.setSelectedPage}
                                selectedPage={Props.selectedPage}
                                />
                            )}  
                        </Draggable>  
                    ))}  
                    {provided.placeholder}
                </div>  
            )}  
        </Droppable>  
    </DragDropContext>
</Box>
  )
}


export default ChapterDragDrop