import { Button, MenuItem, TextField } from '@mui/material'
import  { useEffect, useState } from 'react'


interface questionI {
    id: string,
    question: string,
    answer: string[],
    correctAnswer: number,
  }
interface ToggleProps {
    currentQuestion: questionI,
    updateCurrentQuestion: (q: questionI) => void
    handleClose: any
}
const QuizQuestionEdit = (Props: ToggleProps) => {
  const [quizObj, setQuizObj] = useState()
  const [question, setQuestion] = useState<string>("")
  const [correctAnswer, setCorrectAnswer] = useState<number>(0)
  const [answer, setAnswer] = useState([
  {
    id: "outlined-svar1",
    label: "Svar 1",
    value: "",
  }
])
  useEffect(() => {
    if(Props.currentQuestion.answer){
        const answerClone = answer
        Props.currentQuestion.answer.map((a, index) => {
            if(index == 0){
                answerClone[index].value = a
               // setAnswer([...answerClone])
            }else{
                const t ={
                    id: "outlined-svar" + (index + 1),
                    label:"Svar " + (index + 1),
                    value: a
                }
                answerClone.push(t)
            }
            
        })
        setAnswer([...answerClone])
        setQuestion(Props.currentQuestion.question)
        setCorrectAnswer(Props.currentQuestion.correctAnswer)
    }
  },[Props.currentQuestion])
  useEffect(() => {
    answer.map((a, index) => {
      if(a.label != "Svar " + (index + 1)){
       const answerClone = answer
       answerClone[index].label = "Svar " + (index + 1)
       answerClone[index].id = "outlined-svar" + (index + 1)
       setAnswer([...answerClone])
      }
    })
  },[answer])
 
  const addNewAnswer = () => {
    const a = {
      id: "outlined-svar" + (answer.length + 1),
      label: "Svar " + (answer.length+1),
      value: "",
    }
    
    let answerClone = answer
    answerClone.push(a)
    setAnswer([...answerClone])
  }
  const removeAnswer = (value: string) => {
    answer.map((a, index) => {
      if(a.value === value){
        const answerClone = answer
        answerClone.splice(index, 1)
        setAnswer([...answerClone])
      }
    })
  }
  const onChangeAnswer = (e: any, id: string) => {
    answer.map((a, index) => {
        if(a.id === id){
            const answerClone = answer
            answerClone[index].value = e.target.value
            setAnswer([...answerClone])
        }
    })
  }
  const onChangeQuestion = (e: any) => {
    setQuestion(e.target.value)
  }
  return (
    <>
    <div style={{
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      gap: "20px",      
    }}>
      <TextField id="outlined-question" label="Spørsmål" onChange={onChangeQuestion} variant="outlined" value={question}/>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: "10px"
      }}>
      {answer.map((a, index) => (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            
          }}>
          {index == 0 ?
            <TextField id={a.id} label={a.label} value={a.value} onChange={(e: any) => {onChangeAnswer(e, a.id)}} variant="outlined" />
          :
          <>
          <TextField id={a.id} label={a.label} value={a.value} onChange={(e: any) => {onChangeAnswer(e, a.id)}} variant="outlined" />
          <Button onClick={() => {
            removeAnswer(a.value)
          }}> Fjern </Button>
          </>
         }
          </div>
      ))}
      </div>
      <Button onClick={addNewAnswer}>Legg til nytt svar alternativ</Button>
      <TextField
          id="outlined-select-correct"
          select
          onChange={(e: any) => {
            setCorrectAnswer(e.target.value)
          }}
          label="Velg"
          defaultValue={correctAnswer}
          value={correctAnswer}
          helperText="Rett svar"
        >
          {answer.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>
    <div style={{
        display: "flex",
        justifyContent: 'space-between',
    }}>
        <Button onClick={()=> {
            let c = 0
            let answerList: string[] = []
            answer.map((a, index)=> {
                answerList.push(a.value)
                if(a.value === correctAnswer.toString()){
                  c = index
                }
            })
            const q: questionI = {
                id: Props.currentQuestion.id,
                question: question,
                answer: answerList,
                correctAnswer: c,
            }
            Props.updateCurrentQuestion(q)
            Props.handleClose()
        }}>Ok</Button>
        <Button onClick={Props.handleClose}>Avbryt</Button>
    </div>
    </>
  )
}


export default QuizQuestionEdit