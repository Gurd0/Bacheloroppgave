import { arrayRemove, arrayUnion, collection, doc, DocumentReference, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
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
      course.Chapters.map((chapter, index) => {
        chapter.Pages.map((page: PageType) => {
            addPageToFirebase(page)
        })
      })

      course.Chapters.map((chapter) => {
        
        const arrayMap = chapter.Pages.map((page: any) => {
            return { [page.Name + "&&" + page.Type]: doc(db, "Pages/" + page.id) }
           })
        const c= {
            ChapterName: chapter.ChapterName,
            id: chapter.id,
            Pages: arrayMap
              
        }
       addChapterToFirebase(c)
    })
    const courseT = {
        Name: course.Name,
        id: course.id,
        draft: course.draft,
        Topic: course.Topic,
        Prerequisite: course.Prerequisite,
        image: course.image,
        Chapters: 
        course.Chapters.map((chapter: any) => {
            return doc(db, "Chapter/" + chapter.id)
        }),
      
    }
    if(courseT.Prerequisite){
        await setDoc(doc(db, "Courses", courseT.id), {
            Name: courseT.Name,
            draft: courseT.draft,
            id: courseT.id,
            Chapters: courseT.Chapters,
            Topic: courseT.Topic,
            image: courseT.image,
            Prerequisite: courseT.Prerequisite
        })
    }else{
        await setDoc(doc(db, "Courses", courseT.id), {
            Name: courseT.Name,
            draft: courseT.draft,
            id: courseT.id,
            Chapters: courseT.Chapters,
            Topic: courseT.Topic,
            image: courseT.image,
        })
    }
    
    await addCourseTopicToTopic(courseT, doc(db, "Courses/" + courseT.id))
}
 const addChapterToFirebase = async (chapter: ChapterType) => {
    await setDoc(doc(db, "Chapter", chapter.id), {
        ChapterName: chapter.ChapterName,
        id: chapter.id,
        Pages: chapter.Pages
    })
}

 const addPageToFirebase = async (page: PageType) => {
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
        let ref
        if(course.Topic != null){
            ref = doc(db, "Topic", course.Topic)
            const document = await getDoc(ref)
            // if document add course ref 
            if(document.data()){
                    await updateDoc(doc(db, "Topic", document.id), {
                        "Courses": arrayUnion(courseRef),
                })
            // else make a new document
            }else{
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
            if(topic.id != course.Topic){ 
            await updateDoc(doc(db, "Topic", topic.id), {
                "Courses": arrayRemove(courseRef),
            })
            }
          })
        

    }
