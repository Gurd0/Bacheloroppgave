import { Box } from "@mui/material";
import { useEffect } from "react"
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import { PageType, ChapterType } from '../../../../context/context';
import ChapterListItem from "./chapterListItem";



  interface ToggleProps {
    chapters: ChapterType[]
    setChapters: any; 
    setSelectedPage: any;
    selectedPage: any
  }
  
const ChapterDragDrop = (Props: ToggleProps) => {
    
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
            Name: "Ny Side",
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
    
    const removePage = (chapterId: string, pageId: string) => {
        let chapterIndex: number
        let chapterClone: ChapterType[] = Props.chapters
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
      const removeChapter = (chapterId: string) => {
        let chapterIndex: number
        let chapterClone: ChapterType[] = Props.chapters
        Props.chapters.map((chapter, index) => {
            if(chapter.id == chapterId){
                chapterIndex = index
                chapterClone.splice(index, 1)
                Props.setChapters([...chapterClone])
            }
        })
      }
      const changePageName = (chapterId: string, pageId: string, name: string) => {
        let chapterIndex: number
        let chapterClone: ChapterType[] = Props.chapters
        Props.chapters.map((chapter, index) => {
            if(chapter.id == chapterId){
                chapterIndex = index
                chapter.Pages.map((page: PageType, index: number) => {
                    if(page.id == pageId){
                        chapterClone[chapterIndex].Pages[index].Name = name
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
                                chapters={Props.chapters}
                                setChapters={Props.setChapters}
                                provided={provided}
                                snapshot={snapshot}
                                addPage={addPage}
                                chapter={chapter}
                                changeChapterName={changeChapterName}
                                removePage={removePage}
                                setSelectedPage={Props.setSelectedPage}
                                selectedPage={Props.selectedPage}
                                changePageName={changePageName}
                                removeChapter={removeChapter}
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