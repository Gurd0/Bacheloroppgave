import TextField from '@mui/material/TextField'
import React from 'react'
import { PageType } from '../../../../context/context'

interface ToggleProps {
  setPageValue: (value: any) => void
  pageValue: any
  selectedPage: PageType 
}


const VideoEdit = (props: ToggleProps) => {
  const [textField, setTextField] = React.useState<string>()
  const [wrongUrl, setWrongUrl] = React.useState<boolean>(false)

  const handleTextInputChange = (event: { target: { value: React.SetStateAction<string | undefined> } }) => {
    setTextField(event.target.value);
  };
  React.useEffect(() => {
    console.log(props.pageValue)
    if(typeof props.pageValue === "string"){
      setTextField(props.pageValue)
    }
  },[props.pageValue])
  React.useEffect(() => {
    const pattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/
    if(textField)
    if(pattern.test(textField)){
      setWrongUrl(true)
      props.setPageValue(textField)
    }else{
      setWrongUrl(false)
    }
  },[textField])
  return (
     <div style={{
      textAlign: 'center',
     }}>
        <h2>Video Url</h2>
        <TextField value={textField} onChange={handleTextInputChange} />
        <h2>{wrongUrl.toString()}</h2>
     </div>
  )
}


export default VideoEdit