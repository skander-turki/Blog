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
import DisplayImages from './DisplayImages';
import { addVideo, UploadImageVideo } from '../../Redux/actions/posts';
import {getTags} from '../../Redux/actions/tags';
import { useState } from 'react';



function srcset(image) {
    return {
       src: `${image}?w=${250 }&h=${200}`,
       srcSet: `${image}?w=${250 }&h=${
         200 
       }&fit=crop&auto=format&dpr=2 2x`,
     };
   }

function AddVideo ()
{
    const dispatch = useDispatch(); 
    const navigate  = useNavigate();
    const [Update, setUpdate] = useState(false);
    const [Image, setImage] = React.useState({
        name :"",
        url :""
    });
    React.useEffect(() => {
        dispatch(getTags())
      }, [dispatch]);
    const Tags = useSelector((state) => state.tagReducer.tag );
    const [post , setPost] = React.useState({
        Titre : "",
        Description : "",
        Category: "",
        link : "",
        ImageLink : "",
        tags : []
    })
    const [Vid, setVideo] = React.useState('');
    const [progress, setProgress] = useState(0);


    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('upload_preset', 'Blog_Internship'); 
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/turkiskander/video/upload', true);

        xhr.upload.onprogress = (event) => {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setVideo(data.url);
            } else {
            console.error('Error uploading video:', xhr.statusText);
            }
        };

        xhr.onerror = () => {
            console.error('Network error occurred while uploading');
        };

        xhr.send(formData);
      };
    React.useEffect(() => {
        if(Vid !== "")
        {
            setPost({ ...post, link:  Vid });
        }
    }, [Vid]);
    const handletagchange = (e , value) => {
        post.tags = [];
        post.tags.push(...value);
        console.log(post.tags);
    }
    const handleConfirm = (e) => {
        e.preventDefault();
        dispatch(addVideo(post, navigate));
      };

      const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend  = () => {       
            setImage({ name :e.target.files[0].name.substring(0, e.target.files[0].name.indexOf('.')) , url : reader.result})
        }    
      };
      //upload new image
    React.useEffect(() => {
        if(Image.name !== "" && Image.url !== "")
        {
            dispatch(UploadImageVideo(Image))
        }
    }, [Image]);
    const LinkImage = useSelector((state) =>state.postReducer.image );
    //get link of new image
    React.useEffect(() => {
        if(Object.keys(LinkImage).length !== 0){
            setPost({...post, ImageLink: LinkImage.r.link })
            setUpdate(Update+1);      
        }
    },[LinkImage])
    
    return (
        <Box component="form">
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item  xs={6}>
                Import your video here :  
                </Grid>
                <Grid item  xs={6}>
                Import your image here :
                </Grid>
                <Grid item  xs={6}>
                {/*<Input name='link' label="Video" type="file" onChange={handleFileChange} sx={{width : 500}} />*/}
                    <input type="file" accept="video/*" onChange={handleUpload} sx={{width : 500}} />
                    {progress > 0 && progress < 100  &&(
                        <div>
                        <h3>Progress:</h3>
                        <progress value={progress} max="100" />
                        <p>{progress}%</p>
                        </div>
                    )}
                    {Vid && (
                        <div>
                        <h3>Uploaded Video:</h3>
                        <video  width="320" height="240" controls>
                            <source src={Vid} type="video/mp4" />
                        </video >
                        </div>
                    )}
                </Grid>
                <Grid item  xs={6}>
                    <Input  label="Image" type="file" onChange={handleImageChange} sx={{width : 500}} />
                    <img src={post.ImageLink}  style={{maxWidth: 400}}/>
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