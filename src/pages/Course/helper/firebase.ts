import { convertToRaw } from 'draft-js'
import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentReference, FieldValue, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import React from 'react'
import { CourseType, PageType } from '../../../context/context'
import { db } from '../../../firebase'
import { ChapterType } from '../../../context/context'

export const setCourseAsCompleted = async (userId : string, courseId: string) => {
    const docRef =  doc(db, "course_progress", userId, "completed_courses", "test")

    const document = await getDoc(docRef)
    const id = "test"         
    if(document.data()){
    await updateDoc(
      docRef, {
            courseIds: arrayUnion(courseId),
        }
    )
    }else{
        await setDoc(
            docRef ,{
                courseIds: [courseId]
            }
        ) 
       
    }
    
}
export const completePage = async (userId: string, pageId: string, courseId: string) => {
    const docRef =  doc(db, "course_progress", userId, "completed_pages", courseId)

    const document = await getDoc(docRef)      
    if(document.data()){
    await updateDoc(
      docRef, {
            pagesId: arrayUnion(pageId),
        }
    )
    }else{
        await setDoc(
            docRef ,{
                pagesId: [pageId]
            }
        ) 
    }
}
export const checkIfCourseIsCompleted = async (userId: string,  courseId: string, chapters: ChapterType[]) => {
    const docRef = doc(db, "course_progress", userId, "completed_pages", courseId)

    const document = await getDoc(docRef)
    if(document.data()){
        const completedPageList = document.data() as any
        const t = completedPageList.pagesId as string[]
        console.log(t.length)
        let numberOfPages: number = 0
        chapters.map((chapter) => {
            chapter.Pages.map(() => {
                numberOfPages++
            })
        })
        if(completedPageList && numberOfPages == t.length){
            setCourseAsCompleted(userId, courseId)
        }

    }
}
