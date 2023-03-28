import { convertFromRaw, Editor, EditorState } from 'draft-js'
import React from 'react'
import { PageType } from '../../../../context/context'
import { stateToHTML } from 'draft-js-export-html';


interface PropsType {
  currentPage: PageType
}
const CourseText = (props: PropsType) => {
  const contentState = convertFromRaw(props.currentPage.Value);
  const editorState = EditorState.createWithContent(contentState);
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
  const html = stateToHTML(editorState.getCurrentContent(), options)
  let _html = html.replace("", '');
  return (
    <div dangerouslySetInnerHTML={{__html : _html}}>
    </div>
  
  )
}


export default CourseText