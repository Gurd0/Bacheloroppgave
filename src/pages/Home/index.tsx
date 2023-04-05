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
export default function Home() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [courseTopicMap, setCoursesTopicMap] = useState<Map<string, CourseType[]>>(new Map())
  const fullCourse = useGetCollection("Courses", false);

  useEffect(() => {
    if (!fullCourse.isLoading) {
      setCourses(fullCourse.data as CourseType[]);

      console.log("hei")
    }
  }, [fullCourse.isLoading]);

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
  
                  <CardActionArea href={"/course/" + course.id}>
                    <Card>
                      <CardHeader title={course.Name} />
                      <CardMedia component="img" height="200" image="#" alt="#" />
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
      </Box>
  );
}