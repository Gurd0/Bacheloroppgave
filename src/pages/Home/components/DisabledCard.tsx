import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
} from "@mui/material";
import React from "react";
import { CourseType } from "../../../context/context";

import LockIcon from "@mui/icons-material/Lock";
interface PropsType {
  course: CourseType;
}

const DisabledCard = (props: PropsType) => {
  return (
    <>
      <Box
        sx={{
          backdropFilter: "blur(20px)",
        }}
      >
        <CardActionArea
          sx={{
            background: " rgba(193, 185, 185, 0.08)",
            borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(193, 185, 185, 0.52)",
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
          </Card>
        </CardActionArea>
      </Box>
    </>
  );
};

export default DisabledCard;
