import React, { useState, useEffect } from 'react';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { ChapterType, CourseType } from '../../../context/context';
import { Menu, MenuItem } from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { removeCourse } from '../helper/firebase';

interface propsInterface {
  courseId: string
  removeCourseLocal: (courseId: string, topic: string) => void
  Topic: string
}

// https://mui.com/material-ui/react-menu/
const CardMenu = (Props: propsInterface) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
  return (
    <>
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      name="optionButton"
      
      sx={{
        placeSelf: "center end",
      }}
      onClick={(event) => {
        handleClick(event)
      }
    }
    >
      <MoreHorizIcon />
    </Button>
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={() => {
        handleClose()
        removeCourse(Props.courseId)
       console.log(Props.Topic)
        Props.removeCourseLocal(Props.courseId, Props.Topic)
        }
        }>Remove</MenuItem>
      <MenuItem onClick={() => {
        handleClose()
        window.location.href = "admin/edit/" + Props.courseId
        }}>Edit</MenuItem>
      
    </Menu>
  </>
  )
}

export default CardMenu