import { CardActionArea, CardHeader, CardMedia, Card} from "@mui/material"
import React from "react"
import { CourseType } from "../../../context/context"

import DoneIcon from '@mui/icons-material/Done';
interface PropsType {
    course: CourseType
}

const CourseCard = (props: PropsType) => {
    return (
        <>
        <CardActionArea href={"/course/" + props.course.id}>
        <Card>
          <CardHeader title={props.course.Name} />
          <CardMedia component="img" height="200" image="#" alt="#" />
        </Card>
        {props.course.Completed && 
          <DoneIcon/>
        }
      </CardActionArea>
      </>
    )
  }
  
  
  export default CourseCard