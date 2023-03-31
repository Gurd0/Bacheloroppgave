import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';

import { Box } from '@mui/system';
import { useQuery } from 'react-query';

import { CourseType, FullCourse, RenderTree } from '../../context/context';
import NewPage from './components/newPage';
import ChapterDragDrop from './components/dragDrop/chapterDragDrop';
import { ChapterType } from '../../context/context';
import { Button, Popper, TextField } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { PageType } from '../../context/context';
import TextEdit from './components/courseEdit/textEdit';
import ImageEdit from './components/courseEdit/imageEdit';
import VideoEdit from './components/courseEdit/videoEdit';
import QuizEdit from './components/courseEdit/quizEdit';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import {db} from "../../firebase"
import { convertToRaw } from 'draft-js';
import { addCourseToFirebase, changeDraft } from './helper/firestoreType';



function Index(){
  const { slug }: any = useParams();
  const [chapters, setChapters] = useState<ChapterType[]>([])

  const [selectedPage, setSelectedPage] = useState<PageType>()
  const [selectedChapter, setSelectedChapter] = useState<ChapterType>()

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [textInput, setTextInput] = useState("")
  

  const [course, setCourse] = useState<CourseType>( {
        Name: "Course",
        draft: true,
        Chapters: chapters,
        id: Math.random().toString(36).substring(2,7)
  })
 
   
  useEffect(() => {
    const test = async () => {
        let chapters: ChapterType[] = [];
        let courseD: CourseType;
        return new Promise(async (resolve, reject) => {
          await getDoc(doc(db, "Courses", slug))
            .then((course) => course.data() as CourseType)
            .then(async (courseData) => {
              courseD = courseData;
              chapters = await Promise.all(
                courseData.Chapters.map(async (ref:DocumentReference) => {
                  return getDoc(ref).then((chapter) => chapter.data() as ChapterType);
                })
              );
            })
            .catch((err) => {
              console.log("Error : " + err);
            })
            .then(() => {
              
              chapters.map((chapter, index) => {
                console.log(chapter)
                chapter.Pages.map(async (pageRef: Map<string, DocumentReference>, pageIndex: number) => {
                
              //   console.log(pageRef)
              
                 // console.log(first)
                  
                 chapters[index].Pages[pageIndex] =  (await getDoc(Object.values(pageRef)[0])).data() as PageType
                })
              })
            }).catch((err) => {
              console.log("error : " + err)
            }).finally(() => {
              const course: CourseType = {
                Name: courseD.Name,
                draft: courseD.draft,
                id: slug,
                Chapters: chapters,
              };
              console.log(course)
              console.log(chapters)
              setCourse({...course})
              setChapters([...chapters])
             
            })
        });
       // console.log(chapters)
    } 
    test()
  },[slug])

  const saveToDraft = async () => {
    const c: CourseType = {
      Name: course.Name,
      id: course.id,
      draft: course.draft,
      Chapters: chapters
    }
    addCourseToFirebase(c)
  }
  const addChapter = () =>{
    const t: ChapterType =  {
      Pages:  [],
      ChapterName: "New Chapter",
      id: Math.random().toString(36).substring(2,7)
    }
    let chapterClone: ChapterType[] = chapters
    chapterClone.push(t)
    //console.log(chapterClone)
    setChapters([...chapterClone])
  }
  const setPageType = (type: string) => {
    if(selectedPage){
      let chapterClone = chapters
      let selectedPageClone = selectedPage
      chapters.map((chapter, index) => {
         chapter.Pages.map((page: PageType, indexPage: number) => {
            if(page == selectedPage){
              chapterClone[index].Pages[indexPage].type = type
              setChapters([...chapterClone])
              selectedPageClone.Type = type
              setSelectedPage(selectedPageClone)
            }
         })
      })
    }
  }
  const setPageValue = (value: any) => {
    if(selectedPage){
    //  console.log("setPageValue : " + value)
   // console.log(value)
      let chapterClone = chapters
      let selectedPageClone = selectedPage
      chapters.map((chapter, index) => {
         chapter.Pages.map((page: PageType, indexPage: number) => {
            if(page == selectedPage){
              chapterClone[index].Pages[indexPage].Value = value
              setChapters([...chapterClone])
             // selectedPageClone.Value = value
            //  setSelectedPage(selectedPageClone)
            }
         })
      })
      //console.log(chapters)
    }
  }
  
  return(
    <>
    <Grid container spacing={2}>
    <Grid item xs={8} >
      <div style={{
        border: '1px solid black',
        height: '100%'
      }}>
      <Box>
       {selectedPage?.Type === "new" &&
          <NewPage setPageType={setPageType}/>
      }
      {selectedPage?.Type === "Text" &&
          <TextEdit setPageValue={setPageValue} pageValue={selectedPage.Value} selectedPage={selectedPage}/>
      }
      {selectedPage?.Type === "Video" &&
          <VideoEdit setPageValue={setPageValue} pageValue={selectedPage.Value} selectedPage={selectedPage}/>
      }
      {selectedPage?.Type === "Image" &&
          <ImageEdit setPageValue={setPageValue} pageValue={selectedPage.Value} selectedPage={selectedPage}/>
      }
      {selectedPage?.Type === "Quiz" &&
          <QuizEdit />
      }
       </Box>
    </div>
    </Grid>
    <Grid item xs={4}>
    <h2>{course.Name } + {course.id}
    <button onClick={(event: React.MouseEvent<HTMLButtonElement>) =>{
      setOpen(!open)
      setAnchorEl(event.currentTarget);
    }}>
      Change Name
    </button>
     <button onClick = {() =>{
          addChapter()
        }} >Add Chapter</button></h2>

    <Popper id={"ChangeChapterName"} open={open} anchorEl={anchorEl}>
      <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper'}}>
      <TextField id="standard-basic" label="Page Name" variant="standard" onChange={(event) =>{
        setTextInput(event.target.value);
      }}/>
      <Button onClick={() => {
        const corseClone: CourseType = course
        corseClone.Name = textInput
        setCourse(corseClone)
        setOpen(!open)
      }}>Ok</Button>
      </Box>
    </Popper>

    {chapters ?
      <ChapterDragDrop chapters={chapters} setChapters={setChapters} setSelectedPage={setSelectedPage} selectedPage={selectedPage}/>
    : <h1>hmm</h1>
    }
    </Grid>
  </Grid>
  <button onClick={() =>{
    saveToDraft()
  }}>Save</button>
  <button onClick={() =>{
    changeDraft(course.id, !course.draft)
    console.log(course.draft)
    const courseClone = course
    courseClone.draft = !course.draft
    setCourse({...courseClone})
  }}>draft {course.draft.toString()}</button>
    </>
  )
}

export default Index;
