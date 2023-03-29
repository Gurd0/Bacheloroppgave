import React, { useState, useEffect } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { ChapterType } from '../../../context/context';

interface propsInterface {
  currentChapter: ChapterType,
  currentPageIndex: number,
  setCurrentPageByIndex: (index: number) => void
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
            disabled={activeStep === maxSteps - 1}
            onClick={() => {
              Props.setCurrentPageByIndex(activeStep +1)
            }}
          >
            Next
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
          disabled={activeStep === 0}
          onClick={() => {
            Props.setCurrentPageByIndex(activeStep -1)
          }}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  )
}

export default CourseMobileStep