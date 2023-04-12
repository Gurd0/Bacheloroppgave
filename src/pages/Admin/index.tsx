import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router";
import { CourseType, FullCourse } from "../../context/context";
import { useFullCourse, useGetCollection } from "../../hooks/queries";
import CardMenu from "./components/cardMenu";
export default function Home() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [draftCourses, setDraftCourses] = useState<CourseType[]>([]);

  const [courseTopicMap, setCoursesTopicMap] = useState<Map<string, CourseType[]>>(new Map())

  const fullCourse = useGetCollection("Courses", false);
  const draftCoursesHook = useGetCollection("Courses", true)

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
      console.log(target.id)
        if(courseId && target.id == "cardClickable"){
          window.location.href = "admin/edit/" + courseId
        }
    }
}
const removeCourseLocal = (courseId: string, topic: string) => {
  console.log(courses)
  courses.map((c, index) => {
    if(c.id === courseId){
      let coursesClone = courses
      coursesClone.splice(index, 1)
      setCourses([...coursesClone])
    }
  })
  
}
  return (
    <Box>
        {fullCourse.isLoading ? (
          <CircularProgress />
        ) : (
          <>
          {[...courseTopicMap.keys()].map((key) => {
            return(
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
             
            <div>
              <h1 style={{ textAlign: "center" }}>{key}</h1>
            </div>

            <Grid
              sx={{
                padding: "1em",
              }}
              container
              spacing={3}
            >
            {courseTopicMap.get(key)?.map((course) => {
              return (
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
              )
            })}
            </Grid>
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