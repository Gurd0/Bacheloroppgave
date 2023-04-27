import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import styled, { css } from "styled-components";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router";
import { CourseType, FullCourse } from "../../context/context";
import { useFullCourse, useGetCollection, useGetDefaultImage } from "../../hooks/queries";
import CardMenu from "./components/cardMenu";

import SettingsIcon from '@mui/icons-material/Settings';
import { ModalBox } from "../../Components/modalBox";
import { setDefaulfImage } from "./helper/firebase";


const StyleDiv = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  gap: 20px;
  flex-direction: row;
`;

export default function Home() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [draftCourses, setDraftCourses] = useState<CourseType[]>([]);

  const [courseTopicMap, setCoursesTopicMap] = useState<Map<string, CourseType[]>>(new Map())

  const fullCourse = useGetCollection("Courses", false);
  const draftCoursesHook = useGetCollection("Courses", true)

  const [openSetting, setOpenSetting] = useState(false)
  const [image, setImage] = useState<string>("")
  const [defaultImage, setDefaultImage] = useState<string>("")
  const defaultImageHook = useGetDefaultImage()
 
  
  useEffect(() => {
    if(defaultImageHook.data && defaultImageHook.status == "success"){
      const img: any = defaultImageHook.data 
      setDefaultImage(img.image)
    }
  },[defaultImageHook])

  useEffect(() => {
    if (!fullCourse.isLoading) {
      setCourses(fullCourse.data as CourseType[]);
    }
  }, [fullCourse]);

  useEffect(() => {
    let myMap = new Map<string, CourseType[]>();
      courses.map((c) =>{
        if(c.Topic && myMap.has(c.Topic)){
          let temp: CourseType[] = myMap.get(c.Topic) as CourseType[]
          temp.push(c)
          myMap.set(c.Topic, temp)
          setCoursesTopicMap(courseTopicMap.set(c.Topic, temp))
        }else if(c.Topic){
          myMap.set(c.Topic, [c])
          setCoursesTopicMap(courseTopicMap.set(c.Topic, [c]))
        }
      })
      setCoursesTopicMap(myMap)
  },[courses])

  useEffect(() => {
    if (!draftCoursesHook.isLoading) {
      setDraftCourses(draftCoursesHook.data as CourseType[]);
    }
  }, [draftCoursesHook]);

  const handleClick = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>, courseId?: string) => {
    const target = e.target as HTMLButtonElement
    if(target.name === 'optionButton') {
        e.preventDefault();
        e.stopPropagation();
    }else {
        if(courseId && target.id == "cardClickable"){
          window.location.href = "admin/edit/" + courseId
        }
    }
}
const removeCourseLocal = (courseId: string, topic: string) => {
  courses.map((c, index) => {
    if(c.id === courseId){
      let coursesClone = courses
      coursesClone.splice(index, 1)
      setCourses([...coursesClone])
    }
  })
  
}
const onDragEnd = (result: any, topic: string) => {
  let courseTopicMapClone = courseTopicMap
  const courseListFromMap: CourseType[] | undefined= courseTopicMap.get(topic)
  if(courseListFromMap){
    const [removed] = courseListFromMap.splice(result.source.index, 1)
    courseListFromMap.splice(result.destination.index, 0, removed)
    courseTopicMapClone.set(topic, courseListFromMap)
    setCoursesTopicMap(courseTopicMapClone)
  }
  
};
  
  return (
    <Box>
        {fullCourse.isLoading ? (
          <CircularProgress />
        ) : (
          <>
          <Button onClick={() => {
            window.location.replace('/admin/new');
          }}>Ny</Button>

          <Button onClick={() => {
            setOpenSetting(!openSetting)
          }}><SettingsIcon />Settings</Button>

          <ModalBox open={openSetting} setOpen={setOpenSetting}>
            <TextField id="outlined-basic" label="Svg icon" variant="outlined" onChange={(e: any)=> {
              setImage(e.target.value)
            }}/>
           <Button onClick={() => {
            setDefaulfImage(image)
           }}>Sett standar bilde</Button>
            <img src={image} width="120" height="120" />
          </ModalBox>
          
          {[...courseTopicMap.keys()].map((key) => {
            return(
              <Box
                key={key}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
             
            <div>
              <h1 style={{ textAlign: "center" }}>{key}</h1>
            </div>
           
            
            <DragDropContext onDragEnd={(result: any ) => {
              onDragEnd(result, key)
            }}>  
            <Droppable droppableId="droppableCourse"  >
              {(provided) => (  
              
              <Grid
              {...provided.droppableProps}  
              ref={provided.innerRef}  
              sx={{
                padding: "1em",
              }}
              container
              spacing={3}
              
            >
            {courseTopicMap.get(key)?.map((course, index) => {
              return (
                <Draggable key={course.id} draggableId={course.id} index={index} >
                  {(provided) => (  
                  <Grid item xs={12} sm={6} md={4} key={course.id}>
                    <StyleDiv 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                      <Card style={{backgroundColor: "black"}}></Card>
                      <CardActionArea 
                      onClick={(event) => {
                        handleClick(event, course.id)
                      }} >
                        <Card>
                          <CardHeader id="cardClickable" title={
                          <span style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}>
                            {course.Name} 
                            <CardMenu key={course.id} courseId={course.id} removeCourseLocal={removeCourseLocal} Topic={key as string}/>
                          </span>}
                          />
                          {course.image ? (
                            <CardMedia
                              sx={{ padding: "0 2em 2em 0em", objectFit: "contain" }}
                              component="img"
                              height="100"
                              image={course.image}
                              alt="#"
                            />
                          ) : (
                            <CardMedia
                              sx={{ padding: "0 2em 2em 0em", objectFit: "contain" }}
                              component="img"
                              height="100"
                              image={defaultImage}
                              alt="#"
                            />
                          )}
                        </Card>
                      </CardActionArea>
                      </StyleDiv>
                 
                
                  </Grid> 
                  )}
                  </Draggable>
                  
              )
            })}
            {provided.placeholder}
            </Grid>
            
            
            )}
           
            </Droppable>  
            </DragDropContext>
            
            </Box>
            )
           })} 
          </>
        )}
         <div>
          <h1 style={{ textAlign: "center" }}>Draft</h1>
        </div>
        {draftCoursesHook.isLoading ? (
          <CircularProgress />
        ) : (
          <Grid
            sx={{
              padding: "1em",
            }}
            container
            spacing={3}
          >
            {draftCourses.map((courses) => (
              <Grid item xs={12} sm={6} md={4}>
                {/* key={courses.id} */}
                <CardActionArea href={"/admin/edit/" + courses.id}>
                  <Card>
                    <CardHeader title={courses.Name} />
                    <CardMedia component="img" height="200" image="#" alt="#" />
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
  );
}
/*
<Grid item xs={12} sm={6} md={4}>
                    <CardActionArea 
                    onClick={(event) => {
                      handleClick(event, course.id)
                    }} >
                      <Card>
                        <CardHeader id="cardClickable" title={
                        <span style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}>
                          {course.Name} 
                          <CardMenu courseId={course.id} removeCourseLocal={removeCourseLocal} Topic={key as string}/>
                        </span>}
                        />
                        <CardMedia id="cardClickable" component="img" height="200" image="#" alt="#" />
                      </Card>
                    </CardActionArea>
                </Grid> 
*/