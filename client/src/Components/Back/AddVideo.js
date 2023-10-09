import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import SendIcon from '@mui/icons-material/Send';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';

import { addVideo } from '../../Redux/actions/posts';
import {getTags} from '../../Redux/actions/tags';


function AddVideo ()
{
    const dispatch = useDispatch(); 
    const navigate  = useNavigate();
    React.useEffect(() => {
        dispatch(getTags())
      }, [dispatch]);
    const Tags = useSelector((state) => state.tagReducer.tag );
    const [post , setPost] = React.useState({
        Titre : "",
        Description : "",
        link : "",
        tags : []
    })
    const [Video, setVideo] = React.useState('');
    //const inputFileRef = React.createRef();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
        console.log(post)
      };
    const handleFileChange = (e) => {
        //setPost({ ...post, link : URL.createObjectURL(e.target.files[0]) });
        setVideo( e.target.files[0] )
        
      };
    const handletagchange = (e , value) => {
        post.tags = [];
        post.tags.push(...value);
        console.log(post.tags);
    }
    const handleConfirm = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.readAsDataURL(Video);
        reader.onloadend = () => {
            setPost({ ...post, link:  reader.result });
            console.log(post);
            dispatch(addVideo(post, navigate));
        };
        reader.onerror = () => {
            console.error('Error reading file');
          };
      };
    return (
        <Box component="form">
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item  xs={6}>
                Import your video here :  
                </Grid>
                <Grid item  xs={6}>
                    
                </Grid>
                <Grid item  xs={6}>
                    <Input name='link' label="Video" type="file" onChange={handleFileChange} sx={{width : 500}} />
                </Grid>
                <Grid item  xs={6}   >
                    <TextField name='Titre' label="Title" type="text" onChange={handleChange} sx={{width : 500}}  />
                </Grid>
                <Grid item  xs={6}>
                    {Array.isArray(Tags) ? <Autocomplete
                        multiple
                        id="tags-filled"
                        options={ Tags.map((option) => option.name)}
                        freeSolo
                        onChange={handletagchange}
                        renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                        }
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="Tags"
                            placeholder="Tags"
                           
                        />
                        )}
                        sx={{width : 500}}
                    /> : null}
                </Grid>
                <Grid item  xs={6}>
                    <TextField name='Description' rows={5} label="Description" type="text" onChange={handleChange}  multiline sx={{width : 500 }} />
                </Grid>
                <Grid item  xs={6}>
                </Grid> 
                <Grid item  xs={6}>
                    <Button variant="contained" onClick={handleConfirm} endIcon={<SendIcon />}>
                        Add
                    </Button>
                </Grid> 
            </Grid>
            <br/>
           
          
        </Box>
      );
}
export default AddVideo ;