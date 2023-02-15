import React, { useState, useEffect, Children } from 'react';
import {db} from "../../firebase"
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { useParams } from 'react-router';
import CourseTree from './components/CourseTree';

type ChapterType = {
  Pages: any[],
  ChapterName: string,
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
            console.log(slug)
            //get the data from the ref as courseTpe 
            const course = (await getDoc(docRef)).data() as CourseType
            console.log(course)
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
     console.log(chapterObj)
     chapterObj.map(chapter => {
        if(chapter){
          const p: RenderTree[] = []
         Object.keys(chapter.Pages).forEach(t => {
          p.push({name: t, id: t, page: true})
         })
          t.children?.push({name: chapter.ChapterName, id: chapter.ChapterName, children: p})
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
    {slug}
    <CourseTree {...tree()}/>
    </>
  )
}
export default Index


