import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from 'react';

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
       src: `${image.r.link}?w=${250 * cols}&h=${200 * rows}&fit=crop&auto=format`,
       srcSet: `${image.r.link}?w=${250 * cols}&h=${
         200 * rows
       }&fit=crop&auto=format&dpr=2 2x`,
     };
   }
function DisplayImages (props) {
    /*const [List , setList] = useState([]);
    const [Update, setUpdate] = useState(0);
    useEffect (() => {
        console.log(props.Posts.link)
        List.push(...props.Posts.link)
        setUpdate(Update+1);  
    }, [props.Posts.link])*/
    const deleteImage = (item) => { 
        props.DeleteImage(item);
        //const i = props.Posts.link.indexOf(item);
        // props.Posts.link =props.Posts.link.splice(i,i);
    }
    return(
        <ImageList
                    sx={{
                        width: 500,
                        height: 450,
                        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                        transform: 'translateZ(0)',
                    }}
                    rowHeight={200}
                    gap={1}
                    >
                    {props.Posts.links.map((item) => {
                        const cols = item.featured ? 2 : 1;
                        const rows = item.featured ? 2 : 1;
                        return (
                        <ImageListItem  cols={cols} rows={rows}>
                            <img
                            {...srcset(item, 250, 200, rows, cols)}
                            alt={item.id}
                            
                            />
                            <ImageListItemBar
                            sx={{
                                background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            //title={item.id}
                            position="top"
                            actionIcon={
                                <IconButton
                                sx={{ color: 'white' }}
                                aria-label={`star ${item.r.id}`}
                                onClick={() => deleteImage(item)}
                                >
                                    <DeleteForeverOutlinedIcon />
                                </IconButton>
                            }
                            actionPosition="right"
                            /> 
                        </ImageListItem>
                        );
                    })}
                    </ImageList>
    );
}
export default DisplayImages;