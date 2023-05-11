import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { Dispatch, memo, useEffect, useState } from 'react'
import { PageType } from '../../../../context/context'


interface ToggleProps {
  resetQuiz: any
  Gif: string
  completed?: boolean
  setPageToNext: any,
}

const QuizCompleted = (Props: ToggleProps) => {
    return (
      <div>
        <h2>Gratulerer, Quiz Fullført!</h2>
        <img style={{
          width: "15em",
          height: "15em"
        }}src={Props.Gif}/>
        <div>
          <Button onClick={Props.resetQuiz}> TA QUIZ PÅ NYTT</Button>
          <Button onClick={() => {
            if(!Props.completed){
                Props.setPageToNext()
            }
            
          }}> {!Props.completed ? <>GÅ TIL NESTE SIDE</> : <a href='/'>FULLFØR KURS</a>} </Button>
        </div>
      </div>
      )
}


export default memo(QuizCompleted)
