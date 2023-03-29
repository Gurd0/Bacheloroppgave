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
  const [draftCourses, setDraftCourses] = useState<CourseType[]>([]);
  const fullCourse = useGetCollection("Courses", false);
  const draftCoursesHook = useGetCollection("Courses", true)

  useEffect(() => {
    if (!fullCourse.isLoading) {
      setCourses(fullCourse.data as CourseType[]);
    }
  }, [fullCourse]);

  useEffect(() => {
    if (!draftCoursesHook.isLoading) {
      setDraftCourses(draftCoursesHook.data as CourseType[]);
    }
  }, [draftCoursesHook]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div>
          <h1 style={{ textAlign: "center" }}>Gitar</h1>
        </div>
        {fullCourse.isLoading ? (
          <CircularProgress />
        ) : (
          <Grid
            sx={{
              padding: "1em",
            }}
            container
            spacing={3}
          >
            {courses.map((courses) => (
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
    </Box>
  );
}