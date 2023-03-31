import React, { useState, useEffect } from 'react';
import {db} from "../../firebase"
import { collection, getDoc, doc, getDocs, DocumentReference, DocumentData } from "firebase/firestore";
import { useParams } from 'react-router';
import CourseTree from './components/CourseTree';
import { useFullCourse, useCurrentPage } from '../../hooks/queries';

import Grid from '@mui/material/Grid';
import CourseMobileStep from './components/CourseMobileStep';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { ChapterType, FullCourse, PageType } from '../../context/context';
import CourseText from './components/CourseContent/CourseText';
import CourseVideo from './components/CourseContent/CourseVideo';
import CourseImage from './components/CourseContent/CourseImage';

const Index = () => {
    const { slug }: any = useParams();
    
    const [currentPageId, setCurrentPageId] = useState("")
    const [currentPage, setCurrentPage] = useState<PageType>()
    const [currentChapter, setCurrentChapter] = useState<ChapterType>()
    const [currentPageIndex, setCurrentPageIndex] = useState<number>()
    const [course, setCourse] = useState<FullCourse>()
    
    //queries hooks
    const fullCourse = (useFullCourse(slug, "Courses"))
    const page = (useCurrentPage(currentPageId, "Pages"))
    
    //TODO lægg tel animasjon når lastes
    const [tree, setTree] = useState<RenderTree>({
      id: "error",
      name: "error",
      children: [
       
     ]
    })
    useEffect(() => {
      if(!page.isLoading){
        setCurrentPage(page.data as PageType)
        console.log(currentPage)
      }
    },[page])
    useEffect(()=> {
      if(fullCourse.isError) console.log("error")
      if(fullCourse.isLoading) console.log("l")
    
      //console.log(c)
      if(!fullCourse.isLoading){
        setCourse(fullCourse.data as FullCourse)
      }
      
    },[fullCourse])

    useEffect(() => {
      if(course != undefined){
        let tree: RenderTree = {
          id: course.Course.id,
          name: course.Course.Name,
          children: [
           
         ]
        }
        course.Chapters.map(chapter => {
             const childrenPages: RenderTree[] = []
             chapter.Pages.map((pageMap: Array<Map<string, DocumentReference>>) => {
              for (const [key, value] of Object.entries(pageMap)) {
                //make key type any to get objects
                const keyAsAny: PageType = value as any
                childrenPages.push({name: key, id: keyAsAny.id, page: true})
              }
             })
             tree.children?.push({name: chapter.ChapterName, id: chapter.id, children: childrenPages})
        })
        //console.log(t)
        setTree(tree)
    }
    },[course])
    
    const onPageClick = async (id: string) => {
      setCurrentPageId(id)
      console.log(page)
      if(course){
        course.Chapters.map((chapter, chapterIndex) => {
          chapter.Pages.map((pageMap: Array<Map<string, DocumentReference>>, indexPages: number) => {
            for (const [key, value] of Object.entries(pageMap)) {
              //make key type any to get objects
              const valueAsAny: PageType = value as any
              if(id === valueAsAny.id){
                  console.log(indexPages)
                  setCurrentChapter(course.Chapters[chapterIndex])
                  setCurrentPageIndex(indexPages)
                }
            }
           })
          console.log("current page index : " + currentPageIndex)
          console.log("current chapter : " + currentChapter?.id)
        })
    }
  }
  const setCurrentPageByIndex = (index: number) =>{
    if(currentChapter){
      for (const [key, value] of Object.entries(currentChapter.Pages[index])) {
        const valueAsAny: PageType = value as any
        setCurrentPageId(valueAsAny.id)
        console.log(valueAsAny)
      }
     
      setCurrentPageIndex(index)
    }
  }

  interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
    page?: boolean;
  }
  
  return (
    <>
    <Grid container spacing={2}>
    <Grid item xs={8}>
      <div style={{
        border: '1px solid black',
        width: "100%",
        maxHeight: "40em",
        minHeight: "40em",
        overflow: "auto"
      }}>
      <Box style={{}}>
      
      {currentPage?.Type === "Text" &&
        <CourseText currentPage={currentPage}/>
      }
      {currentPage?.Type === "Image" &&
        <CourseImage currentPage={currentPage} />
      }
      {currentPage?.Type === "Video" &&
        <CourseVideo currentPage={currentPage} />
      }
      {currentPage?.Type === "Quiz" &&
        <h2>
          Quiz
        </h2>
      }
      
      </Box>  
      
      </div>
      <div style={{
       // position: "absolute",
        bottom: 0,
      }}>
      {(currentPageIndex != null  && currentChapter != null ) &&
       <CourseMobileStep currentChapter={currentChapter} currentPageIndex={currentPageIndex} setCurrentPageByIndex={setCurrentPageByIndex}/>  
      }
      </div>
    </Grid>
    <Grid item xs={4}>
      <div style={{
        overflow: "auto",
        display: "flex",
        flexDirection: 'column',
        alignContent: "flex-start",
        
      }}>
      <h2 style={{paddingTop: "0px",
        margin: "0px",}}>{tree.name}</h2>
      {tree.children?.map((chap) => (
        <CourseTree tree={chap} ClickHandler={onPageClick} selectedNode={[currentPageId]}/>
      ))}
      </div>
    </Grid>
  </Grid>
 
    </>
  )
}
export default Index
/* 
 
*/