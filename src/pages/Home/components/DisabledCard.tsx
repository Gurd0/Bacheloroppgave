import LockIcon from "@mui/icons-material/Lock";
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
} from "@mui/material";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { CourseType } from "../../../context/context";
interface PropsType {
  course: CourseType;
}

const DisabledCard = (props: PropsType) => {
  return (
    <Box
      data-tooltip-id={props.course.id}
      data-tooltip-content={
        "You are missing the following course(s): " + props.course.Prerequisite
      }
    >
      <CardActionArea
        sx={{
          borderRadius: "16px",
        }}
        href={"/course/" + props.course.id}
        disabled={true}
      >
        <Card
          sx={{
            backgroundColor: "lightgray",
            opacity: "0.7",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(193, 185, 185, 0.52)",
          }}
        >
          <CardHeader title={props.course.Name} />
          <CardMedia component="img" height="200" image="#" alt="#" />
          <h3>
            <Tooltip id={props.course.id} />
          </h3>
        </Card>
      </CardActionArea>
    </Box>
  );
};

export default DisabledCard;
