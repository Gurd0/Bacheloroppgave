import {db} from "../../firebase"
import { collection, getDoc, doc, getDocs, DocumentReference, DocumentData } from "firebase/firestore";
import { useQuery } from 'react-query';
import { resolve } from "path";
import { rejects } from "assert";
import { FullCourse, PageType, ChapterType, CourseType } from './context/context';

 const fetchCurrentPageFromFirebase = async (id: string, collection: string) => {
    if(id !== "" && collection !== ""){
        const docRef = doc(db, collection, id)
        return new Promise(async (resolve, reject) => {
            resolve((await getDoc(docRef)).data() as PageType)
        })
    }
    // TODO lægg tel home page på kurs når du åpne.
    else{
        const emptyPag: PageType = {
            Type: "null",
            Value: "null",
            id: ""
        }
        return emptyPag
    }
 }
 const fetchFullCourseFromFirestore = async (ref: any) => {
    let chapters: ChapterType[] = []
    let courseName: string
    return new Promise(async (resolve, reject) => {
        await getDoc(ref).then(course => 
            course.data() as CourseType
        ).then(async courseData => {
            courseName = courseData.Name
            chapters = await Promise.all(
            courseData.Chapters.map(async (ref: DocumentReference<unknown>) => {
                 return getDoc(ref).then(chapter => 
                    chapter.data() as ChapterType
                )
            }))   
        }).catch(err => {
            console.log("Error : " + err)
        })
        .finally(() => {
            const fullCourse: FullCourse = {
                Course: courseName,
                Chapters: chapters
            }
            resolve(fullCourse)
        })
    })
}


export const useFullCourse = (id: string, collection: string) => {
     const docRef = doc(db, collection, id)
     return useQuery([id, collection], async () => {
        return await Promise.resolve(fetchFullCourseFromFirestore(docRef))
      },{refetchOnWindowFocus: false})
}
export const useCurrentPage = (id: string, collection: string) => {
    return useQuery([id, collection], async () => {
        return await Promise.resolve(fetchCurrentPageFromFirebase(id, collection))
        },{refetchOnWindowFocus: false})
}

      