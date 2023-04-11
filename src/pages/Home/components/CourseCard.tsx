import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import React from "react";
import { CourseType } from "../../../context/context";

import DoneIcon from "@mui/icons-material/Done";
interface PropsType {
  course: CourseType;
}

const CourseCard = (props: PropsType) => {
  return (
    <>
      <CardActionArea
        sx={{
          borderRadius: "16px",
        }}
        href={"/course/" + props.course.id}
      >
        {props.course.Completed ? (
          <Card
            sx={{
              backgroundColor: "#dfedd6",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(193, 185, 185, 0.52)",
            }}
          >
            <CardHeader title={props.course.Name} />
            <CardMedia component="img" height="200" image="#" alt="#" />
          </Card>
        ) : (
          <Card
            sx={{
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(193, 185, 185, 0.52)",
            }}
          >
            <CardHeader title={props.course.Name} />
            <CardMedia component="img" height="200" image="#" alt="#" />
          </Card>
        )}
        {/* {props.course.Completed && <DoneIcon />} */}
      </CardActionArea>
    </>
  );
};

export default CourseCard;
