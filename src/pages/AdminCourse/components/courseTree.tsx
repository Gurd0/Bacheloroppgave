import React from 'react'

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {RenderTree} from '../../../context/context';

interface ToggleProps {
    tree: RenderTree
    ClickHandler: (node: RenderTree) => void
  }
  
  export default function CourseTree(Props: ToggleProps) {
    const renderTree = (nodes: RenderTree) => (
        <>
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick = {() =>{
        Props.ClickHandler(nodes)
      }}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
         </>
    );
    //console.log(course)
  
  
      return (
        <TreeView
          aria-label="rich object"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ height: 500, flexGrow: 1, maxWidth: "100%"}}
        >
          {renderTree(Props.tree)}
        </TreeView>
      );
  }