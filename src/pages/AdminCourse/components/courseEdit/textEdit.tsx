import React, { Component, useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { PageType } from '../../../../context/context';
//import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp

interface ToggleProps {
  setPageValue: (value: any) => void
  pageValue: any
  selectedPage: PageType
}

function TextEdit (props: ToggleProps) {
  const [editorState, setEditorState] = React.useState(
    () => {
      if(props.pageValue){
        return EditorState.createWithContent(props.pageValue)
      }else{
       return  EditorState.createEmpty()
      }
    }
  );
  useEffect(() => {
    if(props.pageValue){
      setEditorState(EditorState.createWithContent(props.pageValue))
    }  
  },[props.selectedPage])

      const onEditorStateChange: (any: any) => void = (editorState: EditorState) => {
        props.setPageValue(editorState.getCurrentContent())
        setEditorState(editorState)
      }; 
    
  return(
        <>

        <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        />
        
        </>
      )
  
}

export default TextEdit