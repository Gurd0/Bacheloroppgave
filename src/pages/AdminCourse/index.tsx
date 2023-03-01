import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { useParams } from 'react-router';
import Grid from '@mui/material/Grid';

import { Box } from '@mui/system';
import { useQuery } from 'react-query';

import CourseTree from './components/courseTree';
import { RenderTree } from '../../context/context';

function Index(){
  const { slug }: any = useParams();

  const [tree, setTree] = useState<RenderTree>(
    {
        id: "daff",
        name: "New Course",
        course: true,
        children: [
            {
            id: "1dsada",
            name: "Add Chapter",
            newChapter: true,
            children: [

            ]
            }
        ]
      }
  )
  
  const onClick = (node: RenderTree) => {
    if(node.newChapter){
        console.log("chapter")
        const t: RenderTree = tree
        t.children?.push({id: "r" + t.children.length, name: "New Chapter", children: [{id: "newpage" + t.children.length, name: "Add Page", newPage: true, children: []}]})
        setTree({...t})
    }
    if(node.course){
        console.log("course")
    }
    if(node.newPage){
        console.log("page")
        const t: RenderTree = tree
        t.children?.forEach((i, chapterIndex) => {
            if(i.children){
                i.children.forEach((page, pageIndex) =>{
                    if(page === node){
                        if(t.children && t.children[chapterIndex]){
                            t.children[chapterIndex].children.push({id: "dsa"+pageIndex, name: "New Page", children:[]})
                        }
                    }
                    //i.children?.push({id: "plizz", name: "New Page"})
                })
            }
        
        })
        setTree({...t})
        
     //   console.log(tree)
    }
  }
  return(
    <>
    <Grid container spacing={2}>
    <Grid item xs={8}>
      <div style={{
        border: '1px solid black',
      }}>
     
    </div>
    </Grid>
    <Grid item xs={4}>
      <CourseTree tree={tree} ClickHandler={onClick}/>
    </Grid>
  </Grid>
    </>
  )
}

export default Index;
