import React from 'react'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import RenderTree from '../context/RenderrTree';
import { Card, Paper, styled, SvgIcon, SvgIconTypeMap } from '@mui/material';
import { Style } from 'util';
import { SxProps } from '@mui/material/styles';
import { width } from '@mui/system';

//icons
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { OverridableComponent } from '@mui/material/OverridableComponent';

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
   //padding: "10px"
}

export default function CourseTree(Props: ToggleProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>(Props.selectedNode);

 

  React.useEffect(() => {
    const t = selected.join("")
    if(selected){
      Props.ClickHandler(t)
    } 
    console.log(t)
  },[selected])
  React.useEffect(() => {
    const expandedClone = expanded
    expandedClone.push(Props.tree.id)
    setExpanded(expandedClone)
  },[Props.tree])

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected([...nodeIds]);
  };

  const renderTree = (nodes: RenderTree, style?: SxProps) => (
    
    <TreeItem 
    sx={ style }
    key={nodes.id} 
    nodeId={nodes.id} 
    label={nodes.name}
    >
      
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTreeChild(node, StyledTreeItem))
        : null}
      
    </TreeItem>
    
  );
  const renderTreeChild = (nodes: RenderTree, style?: SxProps) => {
    let logo;
    if(nodes.type == "Text"){
      logo = TextSnippetOutlinedIcon
    }
    if(nodes.type == "Image"){
      logo = ImageOutlinedIcon
    }
    if(nodes.type == "Video"){
      logo = OndemandVideoOutlinedIcon
    }
    else{
      logo = TextSnippetOutlinedIcon
    }
    console.log("Type ! : " + nodes.type)
    return(
    <TreeItem 
    sx={ style }
    key={nodes.id} 
    nodeId={nodes.id} 
    label={<div>
      <p style={{display: 'flex', justifyContent: 'space-between'}}>
      {nodes.name}
      
      {nodes.type == "Text" &&
        <TextSnippetOutlinedIcon/>
      }
      {nodes.type == "Image" &&
        <ImageOutlinedIcon/>
      }
      {nodes.type == "Video" &&
        <OndemandVideoOutlinedIcon/>
      }
      
      </p>
    </div>}
    >
    </TreeItem>
    
  )}
  //console.log(course)
  

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
          maxWidth: "90%",
        }}
      >
        {renderTree(Props.tree, StyledTreeView)}
      </TreeView>
    );
}