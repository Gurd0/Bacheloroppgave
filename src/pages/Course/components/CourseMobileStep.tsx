import React, {  useEffect } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { ChapterType, CourseType, FullCourse } from '../../../context/context';
import { nextTick } from 'process';
import { Link } from 'react-router-dom';

interface propsInterface {
  currentChapter: ChapterType,
  currentPageIndex: number,
  setCurrentPageByIndex: (index: number) => void
  nexChapter: boolean,
  preChapter: boolean,
  course: FullCourse,
  onPageClick: (id: string) => void,
}

const CourseMobileStep = (Props: propsInterface) => {
    const [activeStep, setActiveStep] = React.useState(Props.currentPageIndex);

    let maxSteps = Props.currentChapter.Pages.length
    const theme = useTheme();


    useEffect(() => {
      setActiveStep(Props.currentPageIndex)
    },[Props.currentPageIndex])
  return (
    <div>
         <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            disabled={(activeStep === maxSteps - 1 && !Props.nexChapter && !Props.course.Course.Completed)}
            onClick={() => {
              if(activeStep !== maxSteps - 1){
                Props.setCurrentPageByIndex(activeStep +1)
              }
              console.log(Props.course.Course.Completed)
              if (activeStep === maxSteps - 1 && Props.nexChapter){
                Props.course.Chapters.map((chapter, index) => {
                  if (chapter.id === Props.currentChapter.id){
                    for (const [key, value] of Object.entries(Props.course.Chapters[index+1].Pages[0])) {
                      const v = value as any 
                      if (v.id) {
                        Props.onPageClick(v.id)
                      }
                    }
                  }
                })
              }
            }}
          >
            {(activeStep === maxSteps - 1 && !Props.nexChapter && Props.course.Course.Completed) ?
            <a href="/">færdig</a>
            :  
            <>neste</>
            }
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button 
          size="small" 
          disabled={activeStep === 0 && !Props.preChapter}
          onClick={() => {
            if(activeStep !== 0){
              Props.setCurrentPageByIndex(activeStep -1)
            }
            if (activeStep === 0 && Props.preChapter){
              Props.course.Chapters.map((chapter, index) => {
                if (chapter.id === Props.currentChapter.id){
                  for (const [key, value] of Object.entries(Props.course.Chapters[index-1].Pages[(Props.course.Chapters[index-1].Pages.length -1)])) {
                    const v = value as any 
                    if (v.id) {
                      Props.onPageClick(v.id)
                    }
                  }
                }
              })
            }

          }}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            forrige
          </Button>
        }
      />
    </div>
  )
}

export default CourseMobileStep