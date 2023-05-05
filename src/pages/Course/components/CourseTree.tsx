import React from 'react'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { RenderTree } from '../../../context/context';
import { SxProps } from '@mui/material/styles';


//icons
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import QuizIcon from '@mui/icons-material/Quiz';


import DoneIcon from '@mui/icons-material/Done';

//add state for selected row clicked. 

interface ToggleProps {
  ClickHandler: (id: string) => void
  tree: RenderTree
  selectedNode: string[]
}
const StyledTreeView ={
//  marginLeft: 0,
}


const StyledTreeItem = {
  //display: "none",
   //height: "4em",
}

export default function CourseTree(Props: ToggleProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>(Props.selectedNode);

 

  React.useEffect(() => {
    const t = selected.join("")
    if(selected ){
      Props.ClickHandler(t)
    } 

  },[selected])
  React.useEffect(() => {
      try{
        if(Props.tree.children && Props.tree.children[0].children && Props.selectedNode.join("") == "l"){
          Props.ClickHandler(Props.tree.children[0].children[0].id)
        } 
      }catch (err){
        console.log(err)
      } 
   
  },[Props.selectedNode])

  React.useEffect(() => {
    const expandedClone = expanded
    if(Props.tree.children){
    Props.tree.children.map((t) => {
      expandedClone.push(t.id)
    })
   }
    setExpanded(expandedClone)
  },[Props.tree])

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected([...nodeIds]);
  };

  const renderTree = (nodes: RenderTree, style?: SxProps) => {

  return(
    <TreeItem 
    sx={ style }
    key={nodes.id} 
    nodeId={nodes.id} 
    label={<h4>{nodes.name}</h4>}
    >
      
      {Array.isArray(nodes.children)
        ? nodes.children.map((node: RenderTree) => renderTreeChild(node, StyledTreeItem))
        : null}
      
    </TreeItem>
    
  )};
  const renderTreeChild = (nodes: RenderTree, style?: SxProps) => {

    return(
      
    <TreeItem 
    sx={ style }
    key={nodes.id} 
    className="wrapper"
    nodeId={nodes.id} 
    style={Props.selectedNode.join("") == nodes.id ?{
      backgroundColor: "rgba(0,0,0,0.04)",
      
      overflowX: "hidden",
    }:{
      backgroundColor: 'white',
      width: "100%"
    }}
    label={
    <div style={{display:'flex', flexDirection: 'row',  margin: "0",
    padding: "5px", gap: "10px", paddingLeft: 0, }}>
      <div style={{gap: 0, }}>
      {nodes.type == "Text" &&
        <TextSnippetOutlinedIcon/>
      }
      {nodes.type == "Image" &&
        <ImageOutlinedIcon/>
      }
      {nodes.type == "Video" &&
        <OndemandVideoOutlinedIcon/>
      }
      {nodes.type == "Quiz" &&
        <QuizIcon/>
      }
      {nodes.completed && 
        <DoneIcon/>
      }
      </div>
      
      <div>
      {nodes.name}
      </div>
    </div>}
    >
    </TreeItem>
  )}

  

    return (
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpanded={['root']}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        sx={{ 
          flexGrow: 1,
          maxWidth: "95%",
        }}
      >
        <>
        {Props.tree.children &&
        <>
        {Props.tree.children.map((chap) => {
            return renderTree(chap, StyledTreeView)
        }
           
         )}
         </>
        }
        </>
      </TreeView>
    );
}