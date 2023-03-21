import { EditorState } from "react-draft-wysiwyg";
import { EnumDeclaration } from "typescript";

export type ChapterType = {
    id: string,
    Pages: any,
    ChapterName: string
  }
  
 export type CourseType = {
    Name: string; 
    Chapters: any[];
    id: string;
  }
export  type FullCourse = {
    Course: string;
    Chapters: ChapterType[];
  }
export type PageType = {
    Type: string; 
    Value?: EditorState;
    id: string;
  }
  export type  RenderTree = {
    id: string;
    name: string;
    children: RenderTree[];
    
    page?: boolean;
    //TODO add enum så bære ein e mulig på samme tid
    newChapter?: boolean;
    newPage?: boolean;
    course?: boolean;
  }
  