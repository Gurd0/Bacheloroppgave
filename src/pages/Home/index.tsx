import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  LinearProgress,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/system";
import { IdTokenResult, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useParams } from "react-router";
import { CourseType, FullCourse } from "../../context/context";
import {
  useFullCourse,
  useGetCollection,
  useGetCompletedCourses,
} from "../../hooks/queries";

import DoneIcon from "@mui/icons-material/Done";
import LockIcon from "@mui/icons-material/Lock";
import CourseCard from "./components/CourseCard";
import DisabledCard from "./components/DisabledCard";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type userProp = {
  user: User;
  token?: IdTokenResult;
};
export default function Home(props: userProp) {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [courseTopicMap, setCoursesTopicMap] = useState<Map<string, CourseType[]>>(new Map());
  
  const [completedCourseList, setCompletedCourseList] = useState<string[]>([]);

  const fullCourse = useGetCollection("Courses", false);
  const completedCourses = useGetCompletedCourses(props.user.uid);
  //Spør om dæ e bra å ha to i ein eller om e bør ha to useEffects
  useEffect(() => {
    if (fullCourse.status == "success") {
      const coursesData = fullCourse.data as CourseType[];

      if (
        !fullCourse.isLoading &&
        completedCourses.status == "success" &&
        (completedCourses.data as string[]).length != 0
      ) {
        setCompletedCourseList([...(completedCourses.data as string[])]);
        const courseCompletedList = completedCourses.data as string[];

        coursesData.map((c, index) => {
          if (courseCompletedList.some((e) => e === c.id)) {
            coursesData[index].Completed = true;
          }
        });
      }
      setCourses([...coursesData]);
    }
  }, [fullCourse.isLoading, completedCourses.status]);

  useEffect(() => {
    let myMap = new Map<string, CourseType[]>();
    courses.map((c) => {
      if (c.Topic && myMap.has(c.Topic)) {
        let temp: CourseType[] = myMap.get(c.Topic) as CourseType[];
        temp.push(c);
        myMap.set(c.Topic, temp);
        setCoursesTopicMap(courseTopicMap.set(c.Topic, temp));
      } else if (c.Topic) {
        myMap.set(c.Topic, [c]);
        setCoursesTopicMap(courseTopicMap.set(c.Topic, [c]));
      }
    });
    setCoursesTopicMap(myMap);
  }, [courses]);

  return (
    <Box>
      {fullCourse.isLoading && completedCourses.isLoading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          {[...courseTopicMap.keys()].map((k) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={"panel1a-content-"+ k}
                  id={"panel1a-header-"+k}
                >
                <div>
                  <h1 style={{ textAlign: "center" }}>{k}</h1>
                </div>
                </AccordionSummary>
                <AccordionDetails>

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
                        {course.Prerequisite &&
                        !completedCourseList.includes(course.Prerequisite) ? (
                          <DisabledCard course={course} courses={courses}/>
                        ) : (
                          <CourseCard course={course} />
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
                </AccordionDetails>
              </Accordion>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
}
