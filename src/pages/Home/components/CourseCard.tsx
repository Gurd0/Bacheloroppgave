import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { CourseType } from "../../../context/context";
import { Link } from "react-router-dom";
interface PropsType {
  course: CourseType;
  defaultImage: string;
}

const CourseCard = (props: PropsType) => {
  return (
    <>
      <CardActionArea
        component={Link}
        to={"/course/" + props.course.id}
        sx={{
          borderRadius: "16px",
        }}
      >
        {props.course.Completed ? (
          <Card
            key={props.course.id}
            sx={{
              backgroundColor: "#dfedd6",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(193, 185, 185, 0.52)",
            }}
          >
            <CardHeader title={props.course.Name} />
            {props.course.image ? (
              <CardMedia
                sx={{ padding: "0 2em 2em 0em", objectFit: "contain" }}
                component="img"
                height="100"
                image={props.course.image}
                alt="#"
              />
            ) : (
              <CardMedia
                sx={{ padding: "0 2em 2em 0em", objectFit: "contain" }}
                component="img"
                height="100"
                image={props.defaultImage}
                alt="#"
              />
            )}
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
            {props.course.image ? (
              <CardMedia
                sx={{ padding: "0 2em 2em 0em", objectFit: "contain" }}
                component="img"
                height="100"
                image={props.course.image}
                alt="#"
              />
            ) : (
              <CardMedia
                sx={{ padding: "0 2em 2em 0em", objectFit: "contain" }}
                component="img"
                height="100"
                image="https://www.svgrepo.com/show/29301/maths-teacher-class-teaching-on-whiteboard.svg"
                alt="#"
              />
            )}
          </Card>
        )}
        {/* {props.course.Completed && <DoneIcon />} */}
      </CardActionArea>
    </>
  );
};

export default CourseCard;
