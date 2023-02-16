import React, { useState, useEffect, Children } from 'react';
import {db} from "../../firebase"
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { useParams } from 'react-router';
import CourseTree from './components/CourseTree';

import Grid from '@mui/material/Grid';

type ChapterType = {
  Pages: any,
  ChapterName: string
}

type CourseType = {
  Name: string; 
  Chapters: any[];
  id: string;
}

const Index = () => {
    const [courseObj, setCourseObj] = useState<CourseType>();
    const [chapterObj, setChapterObj] = useState<ChapterType[]>([]);
    //bør finn type 
    const { slug }: any = useParams();

    useEffect(()=>{
        const fetchPost = async () => {
            //get course ref from id (slug)
            const docRef = doc(db, "Courses", slug)
            //get the data from the ref as courseTpe 
            const course = (await getDoc(docRef)).data() as CourseType
            const chapters = await Promise.all(
              // get data for all chapters
              course.Chapters.map(async (chapterRef: any) => {
                const chapter = await getDoc(chapterRef);
                const chapterData = chapter.data();
                return chapterData as ChapterType
              }
              )
            )
            setChapterObj(chapters)
            setCourseObj(course)
        }
        fetchPost();
    }, [])
  interface RenderTree {
    id: string;
    name: string;
    children?: RenderTree[];
    page?: boolean;
  }
  function tree(): RenderTree {
    if(courseObj){
      let t: RenderTree = {
       id: "courseObj.id",
       name: courseObj.Name,
       children: [
        
      ]
     }
     chapterObj.map(chapter => {
        if(chapter){
          const childrenPages: RenderTree[] = []
          for (const [key, value] of Object.entries(chapter.Pages)) {
            const keyAsAny = value as any
            childrenPages.push({name: key, id: keyAsAny.id, page: true})
          }
          t.children?.push({name: chapter.ChapterName, id: chapter.ChapterName, children: childrenPages})
        }
     })
     return t
   }
   else{
    return {
      id: '2',
      name: '1',
      children: [
    ]
    }
   }
  } 
  
  return (
    <>
    <Grid container spacing={2}>
    <Grid item xs={8}>
      <div style={{
        border: '1px solid black',
      }}>
      Hei  
      </div>
    </Grid>
    <Grid item xs={4}>
      <CourseTree {...tree()}/>
    </Grid>
   
  </Grid>
    
   
    </>
  )
}
export default Index