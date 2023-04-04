import { convertToRaw } from 'draft-js'
import { arrayRemove, arrayUnion, collection, doc, DocumentReference, FieldValue, Firestore, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import React from 'react'
import { CourseType, PageType } from '../../../context/context'
import { db } from '../../../firebase'
import { ChapterType } from '../../../context/context'

export const changeDraft = async (courseId: string, draft: boolean) => {

    const courseRef = doc(db, "Courses", courseId);

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
            return { [page.Name + "&&" + page.Type]: doc(db, "Pages/" + page.id) }
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
        Topic: course.Topic,
        Chapters: 
        course.Chapters.map((chapter: any) => {
            return doc(db, "Chapter/" + chapter.id)
        }),
      
    }
    await setDoc(doc(db, "Courses", courseT.id), {
        Name: courseT.Name,
        draft: courseT.draft,
        id: courseT.id,
        Chapters: courseT.Chapters,
        Topic: courseT.Topic
    })
    await addCourseTopicToTopic(courseT, doc(db, "Courses/" + courseT.id))
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
    const addCourseTopicToTopic = async (course: CourseType, courseRef: DocumentReference)  => {
        console.log(course.Topic)
        let ref
        if(course.Topic != null){
            ref = doc(db, "Topic", course.Topic)
            const document = await getDoc(ref)
            // if document add course ref 
            if(document.data()){
                    console.log("HEI ")
                    await updateDoc(doc(db, "Topic", document.id), {
                        "Courses": arrayUnion(courseRef),
                })
            // else make a new document
            }else{
                console.log("HUH?")
                await setDoc(doc(db, "Topic", course.Topic),{
                    Name: course.Topic,
                    Courses:  [courseRef]
                })
            }
        }
        // Remove course ref from old topic if any.
        const q = query(collection(db, "Topic"), where("Courses", "array-contains-any", [courseRef]))
        const querrySnapshot = await getDocs(q)
        querrySnapshot.forEach(async (topic) => {
            console.log("bø!")
            if(topic.id != course.Topic){
            console.log("bø2")
            await updateDoc(doc(db, "Topic", topic.id), {
                "Courses": arrayRemove(courseRef),
            })
            }
          })
        

    }
