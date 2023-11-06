import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

import { Input } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from 'react-router-dom';
import { addArticle , UploadImage, DeleteImage} from '../../Redux/actions/posts';
import {getTags} from '../../Redux/actions/tags';
import DisplayImages from './DisplayImages';


function AddArticle () {
    
    const dispatch = useDispatch(); 
    const navigate  = useNavigate();
    const [post , setPost] = React.useState({
        Titre : "",
        tags:[],
        Description : "",
        Category: "", 
        links : []
    })
    const [Image, setImage] = React.useState({
        name :"",
        url :""
    });
    const [Update, setUpdate] = React.useState(0);

    const LinkImage = useSelector((state) =>state.postReducer.post );
    
    React.useEffect(() => {
        if(Image.name !== "" && Image.url !== "")
        {
            dispatch(UploadImage(Image))
        }
    }, [Image]);

    React.useEffect(() => {
        if(Object.keys(LinkImage).length !== 0){
            post.links.push(LinkImage);
            setUpdate(Update+1);      
        }
    },[LinkImage])
    


    React.useEffect(() => {
        dispatch(getTags())
      }, [dispatch]);

    const Tags = useSelector((state) => state.tagReducer.tag );
    
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
        console.log(post)
    };

    const handleFileChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend  = () => {       
            setImage({ name :e.target.files[0].name.substring(0, e.target.files[0].name.indexOf('.')) , url : reader.result})
        }    
      };

    const handletagchange = (e , value) => {
        post.tags = [];
        post.tags.push(...value);
        console.log(post.tags);
    }

    const handleConfirm = (e) => {
        e.preventDefault();
        dispatch(addArticle(post, navigate))
    };

    const deleteImage = async (item) => {
        const i = post.links.indexOf(item);
        const result = await dispatch(DeleteImage(item.r.link.slice(item.r.link.indexOf("ArticleImages/") +14)));
        if(result.status === 200)
        {
            post.links =post.links.splice(i,i)
        }
        
    }
  
    return(
        <Box component="form">

            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item  xs={6}>
                Import your images here :  
                </Grid>
                <Grid item  xs={6}>
                   
                </Grid>
                <Grid item  xs={6}>
                    <Input name='link' label="Image" type="file" onChange={handleFileChange} sx={{width : 500}} />
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
                    </Button>
                </Grid>
                <Grid item  xs={6}   >
                    <DisplayImages Posts={post} DeleteImage={deleteImage}/>  
                </Grid>
                  
            </Grid>
            <br/>
           
          
        </Box>
     );
}
export default AddArticle ;