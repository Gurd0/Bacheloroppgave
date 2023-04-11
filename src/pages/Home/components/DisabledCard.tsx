import { CardActionArea, CardHeader, CardMedia, Card} from "@mui/material"
import React from "react"
import { CourseType } from "../../../context/context"

import LockIcon from '@mui/icons-material/Lock';
interface PropsType {
    course: CourseType
}

const DisabledCard = (props: PropsType) => {
    return (
        <>
        <CardActionArea href={"/course/" + props.course.id} disabled={true}>
            <Card>
                <CardHeader title={props.course.Name } />
                <CardMedia component="img" height="200" image="#" alt="#" />
            </Card>
        <LockIcon />       
        </CardActionArea>
      </>
    )
  }
  
  
  export default DisabledCard