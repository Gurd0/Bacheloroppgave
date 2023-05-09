import { DocumentReference } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  useCurrentPage,
  useFullCourse,
  useGetCompletedPages,
} from "../../hooks/queries";
import CourseTree from "./components/CourseTree";

import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import CourseMobileStep from "./components/CourseMobileStep";

import { Button, Drawer, Paper } from "@mui/material";
import {
  ChapterType,
  FullCourse,
  PageType,
  RenderTree,
} from "../../context/context";
import CourseImage from "./components/CourseContent/CourseImage";
import CourseText from "./components/CourseContent/CourseText";
import CourseVideo from "./components/CourseContent/CourseVideo";
import {
  checkIfCourseIsCompleted,
  completePage,
} from "./helper/firebase";

import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import { AuthContext } from "../../context/auth-context";
import CourseQuiz from "./components/CourseContent/CourseQuiz";
import FeedBackError from "../../Components/feedBack/feedBackError";
import FeedBackSuccess from "../../Components/feedBack/feedBackSuccess";

const Index = () => {
  const { slug }: any = useParams();
  const { user } = useContext(AuthContext);
  const [currentPageId, setCurrentPageId] = useState("l");
  const [currentPage, setCurrentPage] = useState<PageType>();
  const [currentChapter, setCurrentChapter] = useState<ChapterType>();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>();
  const [course, setCourse] = useState<FullCourse>();

  const [feedBack, setFeedBack] = useState<string>("none");

  //queries hooks
  const courseHook = useFullCourse(slug, "Courses");
  const pageHook = useCurrentPage(currentPageId, "Pages");
  const completedPagesHook = useGetCompletedPages(slug, user?.uid || "");

  //open for drawer
  const [xsSize, setXsSize] = useState<number>(12);
  const [open, setOpen] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const [nextChapter, setNextChapter] = useState<boolean>(true)
  const [preChapter, setPreChapter] = useState<boolean>(false)

  const prevPageRef = useRef<PageType>();

  const matches = useMediaQuery('(max-width:740px)');

  useEffect(() => {
    const asyncArrow = async () => {
      if (prevPageRef.current && prevPageRef.current?.Type !== "Quiz") {
        await setPageCompleted(prevPageRef.current.id);
      }
    };

    asyncArrow();
  }, [prevPageRef.current]);

  //TODO lægg tel animasjon når lastes
  const [tree, setTree] = useState<RenderTree>({
    id: "error",
    name: "error",
    type: "error",
    children: [],
  });
  useEffect(() => {
    if(matches){
      setXsSize(xsSize => 11);
      setOpen(true)
    }
    else{
      setXsSize(7.5)
    }
  },[matches])

  useEffect(() => {
    if (
      (open && !matches) &&
      containerRef != null &&
      containerRef.current != null &&
      containerRef.current.clientHeight != null
    ) {
      setXsSize(7.5);
    } else {
      setXsSize(11);
    }
  }, [open]);
  // Sets current page from pageHook
  useEffect(() => {
    if (!pageHook.isLoading && pageHook.status == "success" && pageHook.data) {
      if (
        prevPageRef.current?.id != currentPage?.id &&
        (pageHook.data as PageType).id != currentPage?.id
      ) {
        prevPageRef.current = currentPage;
      }
      setCurrentPage(pageHook.data as PageType);
    }
  }, [pageHook]);

  //kan lag meir effektiv løkke
  useEffect(() => {
    if (!completedPagesHook.isLoading) {
      const list = completedPagesHook.data as string[];
      let courseClone = course;
      //kjøre 16 gång, bør nok fix
      list.map((page: string) => {
        course?.Chapters.map((chapter, indexChapter) => {
          chapter.Pages.map((p: PageType, indexPage: number) => {
            for (const [key, value] of Object.entries(p)) {
              if (value.id == page && courseClone) {
                courseClone.Chapters[indexChapter].Pages[indexPage].Completed =
                  true;
              }
            }
          });
        });
      });
      setCourse(courseClone);
    }
  }, [completedPagesHook]);
  useEffect(() => {
    if (!courseHook.isLoading && courseHook.status === "success") {
      setCourse(courseHook.data as FullCourse);
    }
  }, [courseHook]);

  useEffect(() => {
    if (course !== undefined) {
      let tree: RenderTree = {
        id: course.Course.id,
        name: course.Course.Name,
        type: "course",
        children: [],
      };
      course.Chapters.map((chapter) => {
        const childrenPages: RenderTree[] = [];
        chapter.Pages.map((pageMap: Array<Map<string, DocumentReference>>) => {
          const pageMapClone: any = pageMap;
          for (const [key, value] of Object.entries(pageMap)) {
            //make key type any to get objects
            const keyAsAny: PageType = value as any;
            const NameAndType = key.split("&&");
            if (NameAndType[1] && keyAsAny.id) {
              childrenPages.push({
                name: NameAndType[0],
                id: keyAsAny.id,
                type: NameAndType[1],
                completed: pageMapClone.Completed,
              });
            }
          }
        });
        tree.children?.push({
          name: chapter.ChapterName,
          id: chapter.id,
          type: "chapter",
          children: childrenPages,
        });
      });
      setTree({ ...tree });
    }
  }, [course]);

  const onPageClick = async (id: string) => {
    setCurrentPageId(id);

    if (course) {
      course.Chapters.map((chapter, chapterIndex) => {
        chapter.Pages.map(
          (
            pageMap: Array<Map<string, DocumentReference>>,
            indexPages: number
          ) => {
            for (const [key, value] of Object.entries(pageMap)) {
              //make key type any to get objects
              const valueAsAny: PageType = value as any;

              if (id === valueAsAny.id) {
                setCurrentChapter({ ...course.Chapters[chapterIndex] });
                setCurrentPageIndex(indexPages);
                setNextChapter(course.Chapters[chapterIndex + 1] != null)
                setPreChapter(course.Chapters[chapterIndex - 1] != null)
                
              }
            }
          }
        );
      });
    }
  };
  const setCurrentPageByIndex = (index: number) => {
    if (currentChapter) {
      for (const [key, value] of Object.entries(currentChapter.Pages[index])) {
        const valueAsAny: PageType = value as any;
        if (valueAsAny.id) {
          setCurrentPageId(valueAsAny.id);
        }
      }

      setCurrentPageIndex(index);
    }
  };
  const setPageCompleted = async (pageId: string) => {
    if (prevPageRef.current && user && course) {
      await completePage(user.uid, pageId, slug).then(() => {
        if (pageId) {
          course.Chapters.map((c, index) => {
            c.Pages.map((p: any, pIndex: number) => {
              for (const [key, value] of Object.entries(p)) {
                //make key type any to get objects
                const valueAsAny: PageType = value as any;
                if (pageId && valueAsAny.id == pageId) {
                  const courseClone = course;
                  courseClone.Chapters[index].Pages[pIndex].Completed = true;
                  setCourse({ ...courseClone });
                }
              }
            });
          });
        }

        let comp = 0;
        let pageAmount = 0;
        course.Chapters.map((c) => {
          c.Pages.map((p: PageType) => {
            pageAmount++;
            if (p.Completed) {
              comp++;
            }
          });
        });
        if (comp == pageAmount) {
          let courseClone = course
          courseClone.Course.Completed = true
          setCourse({...courseClone})
          checkIfCourseIsCompleted(user.uid, slug, course.Chapters);
        }
      });
    }
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          paddingTop: "1em",
          position: "static",
          backgroundColor: "#e8e8e8",
          paddingLeft: "1em",
          display: "flex",
          paddingBottom: "1em"
        }}
      >
        <Grid item xs={xsSize}>
          <div
            style={{
              border: "1px solid black",
              width: "100%",
              maxHeight: "40em",
              minHeight: "37em",
              overflow: "auto",
              backgroundColor: "whitesmoke",
              display: "flex",
              flexDirection: 'column',
              ...( matches || !open  ? {borderBottom: 0} : {borderBottom: "1px solid black"} ),
            }}
          >
            <Box>
           
              {currentPage?.Type === "Text" && (
                <div style={{
                  paddingLeft: "1em"
                }}>
                <CourseText currentPage={currentPage} />
                </div>
              )}
              {currentPage?.Type === "Image" && (
                <CourseImage currentPage={currentPage} />
              )}
              {currentPage?.Type === "Video" && (
                <CourseVideo currentPage={currentPage} />
              )}
              {currentPage?.Type === "Quiz" && (
                <>
                 {(feedBack != "none" && feedBack != "Success") && 
                 <FeedBackError feedBack={feedBack} open={true} setFeedBack={setFeedBack}/>
                 }
                 {feedBack == "Success" &&
                 <FeedBackSuccess feedBack={feedBack} open={true} setFeedBack={setFeedBack}/>
                 }
                 <div style={{
                  textAlign: 'center',
                  paddingTop: "3em"
                 }}>
                <CourseQuiz
                  currentPage={currentPage}
                  completePage={setPageCompleted}
                  setFeedBack={setFeedBack}
                  feedBack={feedBack}
                />
                </div>
                </>
              )}
            </Box>
            
              {course && currentPageIndex != null && currentChapter != null && (!open || matches) &&  (
                <div
                style={{
                  width: "100%",
                  marginTop: "auto",
                }}
              >
                <CourseMobileStep
                  currentChapter={currentChapter}
                  currentPageIndex={currentPageIndex}
                  setCurrentPageByIndex={setCurrentPageByIndex}
                  nexChapter={nextChapter}
                  preChapter={preChapter}
                  course={course}
                  onPageClick={onPageClick}
                />
                </div>
              )}
            </div>
          
        </Grid>
        <Grid item xs={0.7} style={{
          paddingLeft: 0,
        }}>
             <Button
                style={
                { 
                    display: "flex",
                    alignContent: "center",
                    ...( matches ? {display:"none"} : {} ),
                   
                  
                    }
                }
                onClick={() => {
                  setOpen(!open);
                }}
              >
                
                  <ExpandCircleDownIcon
                    style={{ color: "black", fontSize: "3em",
                    ...( open ? {transform: "rotate(225deg)",} : {transform: "rotate(45deg)",} ),
                   }}
                  />
               
              </Button>
          </Grid>
        <Grid item xs={matches ? 12 : 3.5} style={{
          
          ...( matches ? {paddingRight: "2em",} : {paddingLeft: 0,} ),
          
        }}>
          
          <div
            ref={containerRef}
            style={{
              display: 'flex',
              flexDirection: 'row',
              
            }}
          >
            <Drawer
              open={(open)}
              anchor={"right"}
              sx={{
                overflowY: "hidden",
                ...( matches ? {width: "97%",} : {width: "100%",} ),
                backgroundColor: "transparent",
                "& .MuiBackdrop-root": {
                  display: "none",
                },
                "& .MuiDrawer-paper": { 
                  ...( matches ? {paddingBottom: "1em",  height: '100%'  } : {paddingBottom: 0,maxHeight: "37em"} ),
                  ...( open ? {position: "relative",} : {position: "none", } ),
                  
                 
                  transition: "none !important",
                  backgroundColor: "transparent",
                },
              }}
              
              variant="persistent"
              onClose={() => setOpen(false)}
              PaperProps={{ style: { border: "none" } }}
            >
              <div >
                <Paper
                  variant="outlined"
                  elevation={10}
                  sx={{
                   
                    width: "auto",
                    borderRadius: "1px",
                    borderColor: "black",
                    
                    ...( matches ? { borderBottom: "1px solid black",} : {borderBottom: 0,} ),
                  }}
                >
                  <CourseTree
                    tree={tree}
                    ClickHandler={onPageClick}
                    selectedNode={[currentPageId]}
                  />
                  <div
                style={{

                  marginTop: "auto",
                  position: 'sticky',
                  bottom: 0,
                }}
              >
                {course && currentPageIndex != null && currentChapter != null && open  && !matches &&  (
                <div
                style={{
                  width: "100%",
                  marginTop: "auto",
                  
                }}
              >
                <CourseMobileStep
                  currentChapter={currentChapter}
                  currentPageIndex={currentPageIndex}
                  setCurrentPageByIndex={setCurrentPageByIndex}
                  nexChapter={nextChapter}
                  preChapter={preChapter}
                  course={course}
                  onPageClick={onPageClick}
                />
                </div>
              )}
                </div>
                </Paper>
              </div>
            </Drawer>
            </div>
        </Grid>
      </Grid>
    </>
  );
};
export default Index;
