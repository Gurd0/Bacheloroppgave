import React from 'react'
import { PageType } from '../../../../context/context'

interface PropsType {
  currentPage: PageType
}
const CourseImage = (props: PropsType) => {
  return (
    <img src={props.currentPage.Value} alt="Logo" style={{
      display: "block",
      background: "#000",
      border: "none",
      height: "calc(100vh - 30px)",
      width: "100%",
    }} />
  )
}


export default CourseImage