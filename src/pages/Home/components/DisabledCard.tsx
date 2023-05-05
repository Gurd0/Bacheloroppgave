import {
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import { CourseType } from "../../../context/context";
interface PropsType {
  course: CourseType;
  courses: CourseType[];
}

const DisabledCard = (props: PropsType) => {
  const [prerequisiteName, setPrerequisiteName] = useState("")
  
  //Get name of course prerequisite
  useEffect(() => {
    if(props.course.Prerequisite){
      props.courses.map((c) => {
        if(c.id === props.course.Prerequisite){
          setPrerequisiteName(c.Name)
        }
      })
    }
  },[props.courses])
  return (
    <>
    <style dangerouslySetInnerHTML={{
        __html: [
          '.card-container:active {',
            "animation: shake 0.3s;",
          '}',
          //https://www.w3schools.com/howto/howto_css_shake_image.asp
          " @keyframes shake {",
           " 0% { transform: translate(1px, 1px) rotate(0deg); }",
           " 10% { transform: translate(-1px, -2px) rotate(-1deg); }",
            "20% { transform: translate(-3px, 0px) rotate(1deg); }",
           " 30% { transform: translate(3px, 2px) rotate(0deg); }",
           " 40% { transform: translate(1px, -1px) rotate(1deg); }",
           " 50% { transform: translate(-1px, 2px) rotate(-1deg); }",
           " 60% { transform: translate(-3px, 1px) rotate(0deg); }",
           " 70% { transform: translate(3px, 1px) rotate(-1deg); }",
            "80% { transform: translate(-1px, -1px) rotate(1deg); }",
            "90% { transform: translate(1px, 2px) rotate(0deg); }",
            "100% { transform: translate(1px, -2px) rotate(-1deg); }",
          "}",
          ].join('\n')
        }}>
      </style>
    <Tooltip title={"Må fulføre " + prerequisiteName} >
      <div className="card-container">
      <CardActionArea
        sx={{
          borderRadius: "16px",
        }}
        href={"/course/" + props.course.id}

        onClick={() => {

        }}
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
          <CardMedia sx={{padding: "0 2em 2em 0em", objectFit: "contain"}} component="img" height="100" image="https://www.svgrepo.com/show/513833/lock.svg" alt="#" />
          
          
          
        </Card>
        
      </CardActionArea>
      </div>
    
      
      
      </Tooltip>
      </>
  );
};

export default DisabledCard;
