import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

interface ToggleProps {
    feedBack: string,
    open: boolean,
    setFeedBack: any,
}

const FeedBackError = (Props: ToggleProps) => {
  const [open, setOpen] = useState(Props.open);

  return (
    <Box sx={{ width: '100%' }}>
    <Collapse in={open}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              Props.setFeedBack("none")
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {Props.feedBack}
      </Alert>
    </Collapse>
  </Box>
  )
}


export default FeedBackError