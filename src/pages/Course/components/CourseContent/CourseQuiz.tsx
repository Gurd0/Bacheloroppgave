import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { PageType } from '../../../../context/context'


interface ToggleProps {
  currentPage: PageType
  completePage: (pageId: string) => void
  setFeedBack: Dispatch<React.SetStateAction<string>>
  feedBack: string
}
interface questionI {
  id: string,
  question: string,
  answer: string[],
  correctAnswer: string,
}

const CourseQuiz = (Props: ToggleProps) => {
  const [correctAns, setCorrectAns] = useState<number[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctTotal, setCorrectTotal] = useState(0)

  const onChangeRadio = (e: any) => {
    console.log(e.target.value)
    let correctString
    Props.currentPage.Value[currentQuestion].answer.map((a: string, index: number) => {
      if(index === Props.currentPage.Value[currentQuestion].correctAnswer)
      correctString = Props.currentPage.Value[currentQuestion].answer[index]
    })
    if(e.target.value === correctString){
      let correctAnsClone = correctAns
      correctAnsClone[currentQuestion] = 1
      setCorrectAns(correctAnsClone)
    }else{
      let correctAnsClone = correctAns
      correctAnsClone[currentQuestion] = 0 
      setCorrectAns([...correctAnsClone])
    }
    console.log(correctAns)
  }

  return (
    <div>
      <h5>{currentQuestion + 1}/{Props.currentPage.Value.length }</h5>
      <div>
        <h2>{Props.currentPage.Value[currentQuestion].question}</h2>
      </div>
      <FormControl>
      <FormLabel id="radio-buttons-group-label">Velg et alternativ</FormLabel>
      <RadioGroup
        aria-labelledby="radio-buttons-group-label"
        name="radio-buttons-group"
      >
      {Props.currentPage.Value[currentQuestion].answer.map((a: string) => (
        <FormControlLabel value={a} control={<Radio />} label={a} onChange={onChangeRadio}/>
      ))}
      </RadioGroup>
    </FormControl>
    <div>
    <Button disabled={currentQuestion ==  0} onClick={()=>{
      setCurrentQuestion(currentQuestion-1)
    }}>
    tilbake</Button>

    {currentQuestion+1 !==  Props.currentPage.Value.length ? 
    <Button onClick={()=>{
      setCurrentQuestion(currentQuestion+1)
    }}>
    next</Button>
    :
    <Button onClick={()=>{
      let count = 0
      correctAns.map((n) => {
        if(n == 1){
          count ++
        }
      })
      console.log((count/Props.currentPage.Value.length) * 100)
      if((count/Props.currentPage.Value.length) * 100 >= 80){
        console.log("over 100 %")
        Props.completePage(Props.currentPage.id)
        Props.setFeedBack(feedBack => "Success")
      }else{
        console.log("Under 80 %")
        setCurrentQuestion(0)
        setCorrectAns([])
        setCorrectTotal(0)
        Props.setFeedBack(feedBack => "Bedre lykke neste gang")
      }
    }}>
    fulfør</Button>
  }  
    </div>
  </div>
  )
}


export default CourseQuiz