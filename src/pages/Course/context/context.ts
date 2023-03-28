export type ChapterType = {
    Pages: any,
    ChapterName: string
    id: string
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
    Value: string;
    id: string;
  }