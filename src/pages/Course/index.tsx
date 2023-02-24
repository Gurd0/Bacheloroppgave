import React, { useState, useEffect } from 'react';
import {db} from "../../firebase"
import { collection, getDoc, doc, getDocs, DocumentReference, DocumentData } from "firebase/firestore";
import { useParams } from 'react-router';
import CourseTree from './components/CourseTree';
import { useFullCourse, useCurrentPage } from './queries';

import Grid from '@mui/material/Grid';
import CourseMobileStep from './components/CourseMobileStep';
import { Box } from '@mui/system';
import { useQuery } from 'react-query';
import { FullCourse, PageType } from './context/context';

const Index = () => {
    const { slug }: any = useParams();
    
    const [currentPageId, setCurrentPageId] = useState("")
    const [currentPage, setCurrentPage] = useState<PageType>()
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
          id: "courseObj.id",
          name: course.Course,
          children: [
           
         ]
        }
        course.Chapters.map(chapter => {
             const childrenPages: RenderTree[] = []
             for (const [key, value] of Object.entries(chapter.Pages)) {
               //make key type any to get objects
               const keyAsAny = value as any
               childrenPages.push({name: key, id: keyAsAny.id, page: true})
             }
             tree.children?.push({name: chapter.ChapterName, id: chapter.ChapterName, children: childrenPages})
        })
        //console.log(t)
        setTree(tree)
    }
    },[course])
    
    const onPageClick = async (id: string) => {
      setCurrentPageId(id)
      console.log(page)
      
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
      }}>
      <Box>
      {currentPage?.Type === "text" &&
        <h2>
          Text
        </h2>
      }
      {currentPage?.Type === "image" &&
        <h2>
          Image
        </h2>
      }
      {currentPage?.Type === "video" &&
        <h2>
          Video
        </h2>
      }
      {currentPage?.Type === "quiz" &&
        <h2>
          Quiz
        </h2>
      }
      </Box>  
      <CourseMobileStep />  
      </div>
    </Grid>
    <Grid item xs={4}>
      <CourseTree tree={tree} ClickHandler={onPageClick}/>
    </Grid>
  </Grid>
 
    </>
  )
}
export default Index
/* 
 
*/