import { PageType } from "../../../../context/context";

interface PropsType {
  currentPage: PageType;
}
const CourseImage = (props: PropsType) => {
  return (
    // img or div background ?????
    <img
      src={props.currentPage.Value}
      alt={props.currentPage.Name}
      style={{
        display: "block",
        background: "#000",
        border: "none",
        height: "37em",
        width: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default CourseImage;
