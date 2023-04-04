import { TextField } from '@mui/material'
import React from 'react'
import { PageType } from '../../../../context/context'

interface ToggleProps {
  setPageValue: (value: any) => void
  pageValue: any
  selectedPage: PageType 
}

const ImageEdit = (props: ToggleProps) => {
  const [textField, setTextField] = React.useState<string>()

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
    if(textField)
      props.setPageValue(textField)
  },[textField])
  return (
    <div style={{
      textAlign: 'center',
     }}>
        <h2>Image Url</h2>
        <TextField value={textField} onChange={handleTextInputChange} />
        
     </div>
  )
}


export default ImageEdit