import { convertFromRaw, Editor, EditorState } from 'draft-js'
import React from 'react'
import { PageType } from '../../../../context/context'
import { stateToHTML } from 'draft-js-export-html';


interface PropsType {
  currentPage: PageType
}
const CourseText = (props: PropsType) => {
  let contentState 
  let editorState 
  try{
     contentState = convertFromRaw(props.currentPage.Value);
     editorState = EditorState.createWithContent(contentState);
  }catch(error){
    console.log(error)
  }
  

  let options = {
    inlineStyles: {
      // Override default element (`strong`).
      BOLD: {element: 'b'},
      ITALIC: {
        // Add custom attributes. You can also use React-style `className`.
        attributes: {class: 'foo'},
        // Use camel-case. Units (`px`) will be added where necessary.
        style: {fontSize: 12}
      },
      // Use a custom inline style. Default element is `span`.
      RED: {style: {color: '#900'}},
    },
  };
  let _html 
  if(editorState){
    const html = stateToHTML(editorState.getCurrentContent(), options)
    _html = html.replace("", '');
  }

  return (
    <>
    {_html && 
      <div dangerouslySetInnerHTML={{__html : _html}}>
      </div>
    }
    </>
  )
}


export default CourseText