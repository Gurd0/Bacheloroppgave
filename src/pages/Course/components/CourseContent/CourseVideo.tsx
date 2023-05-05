import { PageType } from '../../../../context/context'

interface PropsType {
  currentPage: PageType
}
const CourseVideo = (props: PropsType) => {
  
  return (
    <iframe style={{
      //display: "block",
      background: "#000",
      border: "none",
      height: "36em",
      width: "100%",
    }}
    src={props.currentPage.Value}>
    </iframe>
  )
}


export default CourseVideo