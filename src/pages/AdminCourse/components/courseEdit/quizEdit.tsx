import { Box, Button, Card, Grid, MenuItem, Modal, Popover, Slider, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PageType } from '../../../../context/context'
import QuizQuestionEdit from './quizQuestionEditi';

interface ToggleProps {
  selectedPage: PageType
  setPageValue: any
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface question {
  id: string,
  question: string,
  answer: string[],
  correctAnswer: string,
}
const QuizEdit = (Props: ToggleProps) => {
  const [pageValue, setPageValue] = useState<question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<question>()

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    if(Props.selectedPage.Value){
      setPageValue(Props.selectedPage.Value)
    }
  },[Props.selectedPage.Value])

  const updateCurrentQuestion = (q: question) => {
    pageValue.map((p, index) => {
      if(p.id === q.id){
        let pageValueClone = pageValue
        pageValueClone[index] = q
        setPageValue(pageValueClone)
      }
    })
  }

  return (
    <>
    <h2> Spørsmål </h2>
    <div style={{
      display: 'flex',
      gap: "10px",
      flexDirection: 'column',
      padding: "10px"
    }}>
    {pageValue.map((p, index) => (
      <Grid container spacing={2}>
      <Grid item xs={10}>
      <Card 
       onClick={() => {
        setCurrentQuestion({...p})
        handleOpen()
      }}>
        {p.question === "" ?
        <h4>Empty</h4>
        :
        <h4>{p.question}</h4>
        }
      </Card>
      </Grid>
      <Grid item xs={2}>
      <Button onClick={() => {
        let pageValueClone = pageValue
        pageValueClone.splice(index, 1)
        setPageValue([...pageValueClone])
      }}>remove</Button>
      </Grid>
      </Grid>
    ))}
    </div>
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {currentQuestion &&
          <QuizQuestionEdit currentQuestion={currentQuestion} updateCurrentQuestion={updateCurrentQuestion} handleClose={handleClose}/>
          }
        </Box>
      </Modal>
    <Button onClick={() => {
      const q: question = {
        id: Math.random().toString(36).substring(2,7),
        question: "",
        answer: [],
        correctAnswer: "",
      }
      let pageValueClone = pageValue
      pageValueClone.push(q)
      setPageValue([...pageValueClone])
    }}>Legg til spørsmål</Button>

    <Button onClick= {() => {
      Props.setPageValue(pageValue)
      console.log(pageValue)
    }}> Lager </Button>
    </>
  )
}


export default QuizEdit