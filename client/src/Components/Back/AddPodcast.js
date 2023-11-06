import * as React from 'react';
import {useState, useEffect}  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { Input } from '@mui/material';

import { useDispatch , useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';
import {getTags} from '../../Redux/actions/tags';
import DisplayImages from './DisplayImages';
import { addPodcast , UploadImagePodcast, DeleteImagePodcast , UploadAudio} from '../../Redux/actions/posts';





function AddPodcast () {
    const dispatch = useDispatch(); 
    const navigate  = useNavigate();
    const [post , setPost] = useState({
        Titre : "",
        LinkAudio : "",
        tags : [],
        Description : "",
        Category: "",
        links : []
    });
    const [Image, setImage] = useState({
        name :"",
        url :""
    });
    const [Update, setUpdate] = useState(false);
    const [UpdateAudio, setUpdateAudio] = useState(false);
    const [UpdateImages, setUpdateImages] = useState(false);
    //get tags 
    useEffect(() => {
        dispatch(getTags())
      }, [dispatch]);
    const Tags = useSelector((state) => state.tagReducer.tag );
    const LinkImage = useSelector((state) =>state.postReducer.image );

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
        console.log(post)
    };
    //upload new image
    useEffect(() => {
        if(Image.name !== "" && Image.url !== "")
        {
            dispatch(UploadImagePodcast(Image))
        }
    }, [Image]);

    //get link of new image
    useEffect(() => {
        if(Object.keys(LinkImage).length !== 0){
            post.links.push(LinkImage);
            setUpdate(Update+1);      
        }
    },[LinkImage])
    const handletagchange = (e , value) => {
        post.tags = [];
        post.tags.push(...value);
        
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend  = () => {       
            setImage({ name :e.target.files[0].name.substring(0, e.target.files[0].name.indexOf('.')) , url : reader.result})
        }    
      };


    const deleteImage = async (item) => {
        const i = post.links.indexOf(item);
        const result = await dispatch(DeleteImagePodcast(item.r.link.slice(item.r.link.indexOf("ArticleImages/") +14)));
        if(result.status === 200)
        {
            post.links =post.links.splice(i,i)
        } 
    }
    const handleConfirm = (e) => {
        e.preventDefault();
        dispatch(addPodcast(post, navigate))
    };
    //********************** AUDIO File ************************************************************************* */
    const [Audio, setAudio] = useState({
        name :"",
        LinkAudio :""
    });
    const UploadedAudio = useSelector((state) =>state.postReducer.audio );

    useEffect(() => {
        if(Audio.name !== "" && Audio.url !== "")
        {
            dispatch(UploadAudio(Audio))
        }
    }, [Audio]);
    useEffect(() => {
        if(Object.keys(UploadedAudio).length !== 0){
            console.log(UploadedAudio);
            setPost({ ...post, LinkAudio : UploadedAudio})
            setUpdate(true);
            setUpdateAudio(true);
        }
    },[UploadedAudio])
    
    const handleAudioChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend  = () => {       
            setAudio({ name :e.target.files[0].name.substring(0, e.target.files[0].name.indexOf('.')) , LinkAudio : reader.result})
        }
    }
    //************************************************************************************************************ */
    return (
        <Box component="form">

        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item  xs={6}>
               Import your images here :  
            </Grid>
            <Grid item  xs={6}>
                Import your audio here :
            </Grid>
            <Grid item  xs={6}>
                <Input  label="Image" type="file" onChange={handleImageChange} sx={{width : 500}} />
            </Grid>
            <Grid item  xs={6}>
                <Input  label="Audio" type="file" onChange={handleAudioChange} sx={{width : 500}} />
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
                /> : null}
            </Grid>
            <Grid item  xs={6} >
                    <select 
                        name='Category' 
                        type="text" 
                        onChange={handleChange}
                        style={{
                                width: "80%",
                                height: "100%",
                                border: "1px solid #808080",
                                borderRadius: "10px"
                        }}>
                        <option value="">Select category</option>
                        <option value="Economy">Economy</option>
                        <option value="Technology">Technology</option>
                        <option value="Entertainement">Entertainement</option>
                        <option value="Sports">Sports</option>
                        <option value="Science">Science</option>
                        <option value="Health">Health</option>
                        <option value="Politics">Politics</option>
                    </select>
                </Grid>
            <Grid item  xs={6}>
                <TextField name='Description' rows={5} label="Description" type="text" onChange={handleChange}  multiline sx={{width : 500 }} />
            </Grid>  
            <Grid item  xs={6}>
                <Button variant="contained" onClick={handleConfirm} endIcon={<SendIcon />}>
                    Add
                </Button></Grid>  
            <Grid item  xs={6}   >
                <DisplayImages Posts={post} DeleteImage={deleteImage}/>  
            </Grid>  
        </Grid>
        <br/>     
    </Box>
    )
}
export default AddPodcast;