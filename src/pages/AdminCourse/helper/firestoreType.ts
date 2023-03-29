import { convertToRaw } from 'draft-js'
import { collection, doc, DocumentReference, setDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { CourseType, PageType } from '../../../context/context'
import { db } from '../../../firebase'
import { ChapterType } from '../../../context/context'

export const changeDraft = async (courseId: string, draft: boolean) => {
    console.log(courseId)
    const courseRef = doc(db, "Courses", courseId);
    console.log(courseId + " : " + draft)
    try{
        await updateDoc(courseRef, {
            
            draft: draft,
        })
    }catch(err){
        console.log(err)
    }
    
}


export const addCourseToFirebase = async (course: CourseType) => {
    //  console.log(course)
      course.Chapters.map((chapter, index) => {
        chapter.Pages.map((page: PageType) => {
            addPageToFirebase(page)
        })
      })

      course.Chapters.map((chapter) => {
        
        const arrayMap = chapter.Pages.map((page: any) => {
            return { [page.Name]: doc(db, "Pages/" + page.id) }
           })
       // const budgets = pageMap.map((obj: any)=> {return Object.assign({}, obj)});
        const c= {
            ChapterName: chapter.ChapterName,
            id: chapter.id,
            Pages: arrayMap
              
        }
        console.log(c.Pages)
       //console.log(JSON.parse(JSON.stringify(c)))
       addChapterToFirebase(c)
    })
    const courseT = {
        Name: course.Name,
        id: course.id,
        draft: course.draft,
        Chapters: 
        course.Chapters.map((chapter: any) => {
            return doc(db, "Chapter/" + chapter.id)
        }),
      
    }
    await setDoc(doc(db, "Courses", courseT.id), {
        Name: courseT.Name,
        draft: courseT.draft,
        id: courseT.id,
        Chapters: courseT.Chapters

    })
    
}
 const addChapterToFirebase = async (chapter: ChapterType) => {
   // console.log(chapter)
    await setDoc(doc(db, "Chapter", chapter.id), {
        ChapterName: chapter.ChapterName,
        id: chapter.id,
        Pages: chapter.Pages
    })
}

 const addPageToFirebase = async (page: PageType) => {
   // console.log(page.Value)
    if(page.Value){
        await setDoc(doc(db, "Pages", page.id), {
            Type: page.Type,
            Name: page.Name,
            Value: page.Value,
            id: page.id
        })
    }else{
        await setDoc(doc(db, "Pages", page.id), {
            Type: page.Type,
            Name: page.Name,
            id: page.id
        })
    }
    
}

