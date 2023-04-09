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
import { IdTokenResult, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router";
import { CourseType, FullCourse } from "../../context/context";
import { useFullCourse, useGetCollection, useGetCompletedCourses } from "../../hooks/queries";

import DoneIcon from '@mui/icons-material/Done';
import LockIcon from '@mui/icons-material/Lock';

type userProp = {
  user: User;
  token?: IdTokenResult;
};

export default function Home(props: userProp) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [courseTopicMap, setCoursesTopicMap] = useState<Map<string, CourseType[]>>(new Map())
  const [completedCourseList, setCompletedCourseList] = useState<string[]>([])

  const fullCourse = useGetCollection("Courses", false);
  const completedCourses = useGetCompletedCourses(props.user.uid)
  //Spør om dæ e bra å ha to i ein eller om e bør ha to useEffects
  useEffect(() => {
    if (!fullCourse.isLoading && !completedCourses.isLoading) {
      const coursesData = fullCourse.data as CourseType[]
      //setCourses(coursesData)
      setCompletedCourseList(completedCourses.data as string[])
      
      console.log(completedCourseList)
      coursesData.map((c, index) => {
        if(completedCourseList.some(e => e === c.id)){
          coursesData[index].Completed = true
        }
        setCourses(coursesData)
      })
    }
  }, [fullCourse.isLoading, completedCourses.isLoading]);

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
  return (
    <Box>
      
        
        {fullCourse.isLoading ? (
          <CircularProgress />
        ) : (
          
            <>
            {[...courseTopicMap.keys()].map((k) => {
              return(
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
               
              <div>
                <h1 style={{ textAlign: "center" }}>{k}</h1>
              </div>

              <Grid
                sx={{
                  padding: "1em",
                }}
                container
                spacing={3}
              >
              {courseTopicMap.get(k)?.map((course) => {
                
                return (
                  
                  <Grid item xs={12} sm={6} md={4}>
                  
                  {(course.Prerequisite && !completedCourseList.includes(course.Prerequisite)) ? 
                     <CardActionArea href={"/course/" + course.id} disabled={true}>
                     <Card>
                       <CardHeader title={course.Name } />
                       <CardMedia component="img" height="200" image="#" alt="#" />
                     </Card>
                    
                      <LockIcon />   
                              
                   </CardActionArea>
                    :
                    <CardActionArea href={"/course/" + course.id}>
                    <Card>
                      <CardHeader title={course.Name} />
                      <CardMedia component="img" height="200" image="#" alt="#" />
                    </Card>
                    {course.Completed && 
                      <DoneIcon/>
                    }
                  </CardActionArea>
                    }
                </Grid> 
                )
              })}
              </Grid>
              </Box>
              )
             })} 
            </> 
        )}
      </Box>
  );
}