import React, {useState, useEffect, ChangeEventHandler} from 'react';
import ReactDOM from 'react-dom/client';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';

import { Box } from '@mui/system';
import { useQuery } from 'react-query';

import { CourseType, FullCourse, RenderTree } from '../../context/context';
import NewPage from './components/newPage';
import ChapterDragDrop from './components/dragDrop/chapterDragDrop';
import { ChapterType } from '../../context/context';
import { Alert, Autocomplete, Button, FormControl, Input, InputLabel, MenuItem, Modal, Popper, Select, SelectChangeEvent, TextField } from '@mui/material';
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
import { useGetCollection, useGetTopicName } from '../../hooks/queries';

import CourseQuiz from '../Course/components/CourseContent/CourseQuiz';
import QuizQuestionEdit from './components/courseEdit/quizQuestionEditi';
import { option } from 'yargs';
import FeedBackError from '../../Components/feedBack/feedBackError';
import FeedBackSuccess from '../../Components/feedBack/feedBackSuccess';

import SettingsIcon from '@mui/icons-material/Settings';
import { styleModalBox } from '../../Assets/css';
import { ModalBox } from '../../Components/modalBox';

interface autoFill {
  label: string,
  id: string,
}

function Index(){
  const { slug }: any = useParams();
  const [chapters, setChapters] = useState<ChapterType[]>([])
  const [topic, setTopic] = useState<string>("")
  const [menuItemTopic, setMenuItemTopic] = useState<string[]>(["test1", "test2"])

  const [selectedPage, setSelectedPage] = useState<PageType>()
  const [selectedChapter, setSelectedChapter] = useState<ChapterType>()

  const [open, setOpen] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [textInput, setTextInput] = useState("")

  const [feedBack, setFeedBack] = useState<string>("none")
  

  const [course, setCourse] = useState<CourseType>( {
        Name: "Course",
        draft: true,
        Chapters: chapters,
        image: "",
        id: Math.random().toString(36).substring(2,7)
  })
  const topicName = useGetTopicName();
  const fullCourse = useGetCollection("Courses", false);
  const [coursNameAndId, setCourseNameAndId] = useState<autoFill[]>([])
  const [prerequisiteIndex, setPrerequisiteIndex ] = useState<number>(0)

  useEffect(() => {
    if (!topicName.isLoading && topicName.status == "success") {
      setMenuItemTopic([...topicName.data as unknown as string[]]);
      console.log(topicName.data);
    }
  }, [topicName.data]);
 
  useEffect(() => {
    if(!fullCourse.isLoading && fullCourse.status == "success"){
      let list: autoFill[] = []
      const coursesData = fullCourse.data as CourseType[]
      coursesData.map((c) => {
      const t: autoFill = {
        label: c.Name,
        id: c.id,
      }
       list.push(t)
      })
      setCourseNameAndId(list)
    }
  },[fullCourse.data])
   
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
                
                chapter.Pages.map(async (pageRef: Map<string, DocumentReference>, pageIndex: number) => {    
                 chapters[index].Pages[pageIndex] =  (await getDoc(Object.values(pageRef)[0])).data() as PageType
                })
              })
            }).catch((err) => {
              console.log("error : " + err)
            }).finally(() => {
              const course: CourseType = {
                Name: courseD.Name,
                draft: courseD.draft,
                Topic: courseD.Topic,
                Prerequisite: courseD.Prerequisite,
                id: slug,
                Chapters: chapters,
                image: courseD.image,
              };
              setCourse({...course})
              setChapters([...chapters])
              if(course.Topic)
              setTopic(course.Topic)
              if(course.Prerequisite){
                coursNameAndId.map((c, index) => {
                  if(c.id == course.Prerequisite){
                    setPrerequisiteIndex(index)
                  }
                })
              }
            })
        });
    } 
    test()
  },[slug])

  const saveToDraft = async () => {
    const c: CourseType = {
      Name: course.Name,
      id: course.id,
      draft: course.draft,
      Chapters: chapters,
      Topic: topic,
      Prerequisite: course.Prerequisite,
      image: course.image
    }

    if(!c.Topic){
      setFeedBack(feedBack => "Missing Topic")
    }else if(c.Chapters.length == 0){
      setFeedBack(feedBack => "Missing Chapter")
    }
    else{
      setFeedBack(feedBack => "success")
      addCourseToFirebase(c)
    }
  }
  const addChapter = () =>{
    const t: ChapterType =  {
      Pages:  [],
      ChapterName: "New Chapter",
      id: Math.random().toString(36).substring(2,7)
    }
    let chapterClone: ChapterType[] = chapters
    chapterClone.push(t)
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
      let chapterClone = chapters
      let selectedPageClone = selectedPage
      console.log(chapters)
      chapters.map((chapter, index) => {
         chapter.Pages.map((page: PageType, indexPage: number) => {
         
          
            if(page.id == selectedPage.id){
              chapterClone[index].Pages[indexPage].Value = value
              setChapters([...chapterClone])
             // selectedPageClone.Value = value
            //  setSelectedPage(selectedPageClone)
            }
         })
      })
    }
  }
 
  const handleChangeTopicSelect = (event: SelectChangeEvent) => {
    setTopic(event.target.value as string);
  };
  const getMenuItem = () => {
    return (
      <>
      
    <FormControl sx={{ m: 1 }} variant="standard">
      <InputLabel  htmlFor="customized-textbox">Topic</InputLabel>
      <Input value={topic} onChange={(event) =>{
        setTopic(event.target.value);
      }}></Input>
    </FormControl>
    <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="customized-select-label">Topic</InputLabel>
        <Select
          labelId="customized-select-label"
          id="customized-select"
          value={topic}
          onChange={handleChangeTopicSelect}
        >
         <MenuItem value="">
            <em>New</em>
          </MenuItem>
          {menuItemTopic.map((topic) => {
            return ( <MenuItem value={topic}>{topic}</MenuItem>)
          })}
        </Select>
      </FormControl>
      </>)
    
  }
  return(
    <>
    <Grid container spacing={2}>
    
    {(feedBack != "none" && feedBack != "success") && 
    <FeedBackError feedBack={feedBack} open={true} setFeedBack={setFeedBack}/>
    }
    {feedBack == "success" &&
    <FeedBackSuccess feedBack={feedBack} open={true} setFeedBack={setFeedBack}/>
    }
    <ModalBox open={openSetting} setOpen={setOpenSetting}>
          <TextField id="outlined-basic" value={course.image} label="Svg icon" variant="outlined" onChange={(e: any)=> {
            let courseClone = course
            courseClone.image = e.target.value
            setCourse({...courseClone})
          }}/>
          {course.image && 
            <img src={course.image}  width="120" height="120" />
          }
          <Autocomplete
            onChange={(event, newValue) => {
              if(event?.type == "change"){
                const courseClone = course
                if(newValue){
                  courseClone.Prerequisite = newValue.id
                  setCourse(courseClone)
                }
              }
            }}
            options={coursNameAndId}
            defaultValue={coursNameAndId.find((e) => course.Prerequisite === e.id)}
            getOptionLabel={option => option.label}
            disablePortal
            id="combo-box"
            
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Prerequisite" />}
          />
    
          {getMenuItem()}
          <Button onClick={()=> {
            setOpenSetting(!openSetting)
          }}>Exit</Button>
          
    </ModalBox>
    <Grid item xs={8} >
      <div style={{
        border: '1px solid black',
        height: "40em"
      }}>
      <Box >
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
          <QuizEdit selectedPage={selectedPage} setPageValue={setPageValue}/>
         // <QuizQuestionEdit/>

      }
       </Box>
    </div>
    </Grid>
    <Grid item xs={4}>
    <Button onClick={() => {
      setOpenSetting(!openSetting)
    }}><SettingsIcon />Settings</Button>
    <div style={{
      overflow: 'auto',
      maxHeight: "40em"
    }}>
   
    
    <h2>{course.Name } + {course.id}
    <button onClick={(event: React.MouseEvent<HTMLButtonElement>) =>{
      setOpen(!open)
      setAnchorEl(event.currentTarget);
    }}>
      Change Name
    </button>
     <button onClick = {() =>{
          addChapter()
        }} >Add Chapter</button>
     </h2>

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
    </div>
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
