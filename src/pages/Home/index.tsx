import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  LinearProgress,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { CourseType } from "../../context/context";
import {
  useGetCollection,
  useGetCompletedCourses,
  useGetDefaultImage,
} from "../../hooks/queries";

import CourseCard from "./components/CourseCard";
import DisabledCard from "./components/DisabledCard";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AuthContext } from "../../context/auth-context";

export default function Home() {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [courseTopicMap, setCoursesTopicMap] = useState<
    Map<string, CourseType[]>
  >(new Map());
  const { user } = useContext(AuthContext);

  const [completedCourseList, setCompletedCourseList] = useState<string[]>([]);
  const [defaultImage, setDefaultImage] = useState<string>("")

  const coursesHook = useGetCollection("Courses", false);
  const defaultImageHook = useGetDefaultImage()
  const completedCourses = useGetCompletedCourses(user?.uid || "");
  
  useEffect(() => {
    if(defaultImageHook.data && defaultImageHook.status == "success"){
      const img: any = defaultImageHook.data 
      
      setDefaultImage(img.image)
    }
  },[defaultImageHook])
  //Sets courses from coursesHook when status is success
  useEffect(() => {
    if (coursesHook.status == "success") {
      const coursesData = coursesHook.data as CourseType[];

      if (
        !coursesHook.isLoading &&
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
  }, [coursesHook.isLoading, completedCourses.status]);

  //Makes a map for topic and course to help sort.
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
      {coursesHook.isLoading && completedCourses.isLoading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          {[...courseTopicMap.keys()].map((k) => {
            return (
              <Box
                key={k}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Accordion defaultExpanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={"panel1a-content-" + k}
                    id={"panel1a-header-" + k}
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
                          <Grid key={course.id} item xs={12} sm={6} md={4}>
                            {course.Prerequisite &&
                            !completedCourseList.includes(
                              course.Prerequisite
                            ) ? (
                              <DisabledCard key={course.id} course={course} courses={courses} />
                            ) : (
                              <CourseCard key={course.id} course={course} defaultImage={defaultImage}/>
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
