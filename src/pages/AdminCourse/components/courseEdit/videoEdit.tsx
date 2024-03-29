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
    if(typeof props.pageValue === "string"){
      setTextField(props.pageValue)
    }
  },[props.pageValue])
  React.useEffect(() => {
    //https://stackoverflow.com/a/19377429
    const pattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/
    if(textField)
    if(pattern.test(textField)){
      //https://stackoverflow.com/a/54200105
      const url = textField.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      const id =  (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
      setWrongUrl(true)
      props.setPageValue("https://www.youtube.com/embed/" + id)
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