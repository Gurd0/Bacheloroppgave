import { convertFromRaw, EditorState } from 'draft-js'
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
  
  let _html 
  if(editorState){
    const html = stateToHTML(editorState.getCurrentContent())
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