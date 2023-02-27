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
import { CourseType, FullCourse } from "../Course/context/context";
import { useFullCourse, useGetCollection } from "../Course/queries";
export default function Home() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const fullCourse = useGetCollection("Courses");

  useEffect(() => {
    if (!fullCourse.isLoading) {
      setCourses(fullCourse.data as CourseType[]);
      console.log(courses);
    }
  }, [fullCourse]);

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
                <CardActionArea href={"/course/" + courses.id}>
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
