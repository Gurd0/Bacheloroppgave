import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { Dispatch, useEffect, useState } from 'react'
import { PageType } from '../../../../context/context'
import QuizCompleted from './quizCompleted'


interface ToggleProps {
  currentPage: PageType
  completePage: (pageId: string) => void
  setFeedBack: Dispatch<React.SetStateAction<string>>
  feedBack: string
  completed?: boolean
  setPageToNext: any,
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
  const [completed, setCompleted] = useState(false)
  const [gifList, setGifList] = useState<string[]>([ 
    "https://media1.giphy.com/media/3oEjI5VtIhHvK37WYo/200w.webp?cid=ecf05e47ojivo0kfkld6lyf3b0cyo7cxbvn34ezal26h8vgd&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media4.giphy.com/media/l0MYJnJQ4EiYLxvQ4/200.webp?cid=ecf05e47whrsadi4r6qab5l6jpr7de72o5635dnjx6iaqifb&ep=v1_gifs_search&rid=200.webp&ct=g",
    "https://media3.giphy.com/media/kyiHXDANuOg8Jy6ByA/giphy.webp?cid=ecf05e47whrsadi4r6qab5l6jpr7de72o5635dnjx6iaqifb&ep=v1_gifs_search&rid=giphy.webp&ct=g",
    "https://media1.giphy.com/media/cEODGfeOYMRxK/200.webp?cid=ecf05e472ipl890t2x12jx01aceo1mm5nc9hznuj5qoy58to&ep=v1_gifs_search&rid=200.webp&ct=g",
    "https://media0.giphy.com/media/ely3apij36BJhoZ234/200w.webp?cid=ecf05e472ipl890t2x12jx01aceo1mm5nc9hznuj5qoy58to&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media3.giphy.com/media/Jir7AUookJHIVb5aYM/200w.webp?cid=ecf05e472ipl890t2x12jx01aceo1mm5nc9hznuj5qoy58to&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media2.giphy.com/media/mGK1g88HZRa2FlKGbz/200.webp?cid=ecf05e472ipl890t2x12jx01aceo1mm5nc9hznuj5qoy58to&ep=v1_gifs_search&rid=200.webp&ct=g",
    "https://media4.giphy.com/media/3o7abGQa0aRJUurpII/200w.webp?cid=ecf05e472ipl890t2x12jx01aceo1mm5nc9hznuj5qoy58to&ep=v1_gifs_search&rid=200w.webp&ct=g",
])
const [gif, setGif] = useState(gifList[Math.floor(Math.random() * gifList.length)])

  useEffect(() => {
    if(Props.currentPage.Completed){
      setCompleted(true)
    }else{
      setCompleted(false)
    }
  },[Props.currentPage.id])
  const onChangeRadio = (e: any) => {
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
  }
  const resetQuiz = () => {
    setCompleted(false)
    setCurrentQuestion(0)
    setCorrectAns([...[]])
    setGif(gifList[Math.floor(Math.random() * gifList.length)])
  }
  if(!completed){
    return (
      <div>
        <h5>{currentQuestion + 1}/{Props.currentPage.Value.length }</h5>
        <div>
          <h2>Spørsmål: {Props.currentPage.Value[currentQuestion].question}</h2>
        </div>
        <FormControl>
        <FormLabel id="radio-buttons-group-label">Velg et alternativ</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          name="radio-buttons-group"
        >
        {Props.currentPage.Value[currentQuestion].answer.map((a: string, index: number) => (
          <FormControlLabel value={a} control={<Radio />} label={a} onChange={onChangeRadio} key={index}/>
        ))}
        </RadioGroup>
      </FormControl>
      <div>
      <Button disabled={currentQuestion ==  0} onClick={()=>{
        setCurrentQuestion(currentQuestion-1)
      }}>
      Tilbake</Button>
  
      {currentQuestion+1 !==  Props.currentPage.Value.length ? 
      <Button onClick={()=>{
        setCurrentQuestion(currentQuestion+1)
      }}>
      Neste</Button>
      :
      <Button onClick={()=>{
        let count = 0
        correctAns.map((n) => {
          if(n == 1){
            count ++
          }
        })
        if((count/Props.currentPage.Value.length) * 100 >= 80){
          Props.completePage(Props.currentPage.id)
          Props.setFeedBack(feedBack => "Success")
          setCompleted(true)
        }else{
          setCurrentQuestion(0)
          setCorrectAns([])
          setCorrectTotal(0)
          Props.setFeedBack(feedBack => "Bedre lykke neste gang")
        }
      }}>
      Fullfør</Button>
    }  
      </div>
    </div>
    )
  } else{
      
      return (
      <QuizCompleted 
      resetQuiz={resetQuiz}
      Gif={gif}
      completed={Props.completed}
      setPageToNext={Props.setPageToNext}
      />
      )
  }
 
}


export default CourseQuiz