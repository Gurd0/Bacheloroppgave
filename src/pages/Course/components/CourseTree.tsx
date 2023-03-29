import React from 'react'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import RenderTree from '../context/RenderrTree';
import { styled } from '@mui/material';
import { Style } from 'util';
import { SxProps } from '@mui/material/styles';

//add state for selected row clicked. 

interface ToggleProps {
  ClickHandler: (id: string) => void
  tree: RenderTree
}
const StyledTreeView ={
//  marginLeft: 0,
}


const StyledTreeItem = {
 // display: "none",
}

export default function CourseTree(Props: ToggleProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    const t = selected.join("")
    if(selected){
      Props.ClickHandler(t)
    } 
    console.log(t)
  },[selected])

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
        ? nodes.children.map((node) => renderTree(node, StyledTreeItem))
        : null}
        
    </TreeItem>
  );
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
        //expanded={expanded}
        sx={{ 
          height: 500,
          flexGrow: 1,
          maxWidth: "100%",}}
      >
        {renderTree(Props.tree, StyledTreeView)}
      </TreeView>
    );
}