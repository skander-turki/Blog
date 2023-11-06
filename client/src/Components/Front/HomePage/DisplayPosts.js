import React , { useState } from "react";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { GetAllVideos , GetTrending} from "../../../Redux/actions/posts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './DisplayPosts.css'
import { useNavigate } from "react-router-dom";


function DisplayPost () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
     
    useEffect(() => {
      dispatch(GetTrending())
  }, [dispatch])
  //const posts = useSelector((state) =>state.postReducer.videos.data)
  const posts = useSelector((state) =>state.postReducer.trending.data)

  const handlePostClick = (id) => {
    navigate(`/post/${id}`)
  }
    return(
      <div className="DisplayContainer">
        <Box sx={{  bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            sx={{
              "& .MuiTabs-indicator": {
                zIndex: '1 !important',
            },
              "& .Mui-selected": {
                  backgroundColor: '#999',
                  color: '#f5f5f5 !important' , 
                  zIndex: '1 !important'
              }, 
          }}>
              <Tab label="Category One" />
              <Tab label="Category Two" />
              <Tab label="Category Three" />
              <Tab label="Category Four" />
              <Tab label="Category Five" />
              <Tab label="Category Six" />
          </Tabs>
        </Box>
        <div className="ListCards">
          <div className="content-section">
              {Array.isArray(posts) ? posts.map( (post) =>
              (<div className="card" onClick={() => handlePostClick(post._id)}>
                  <img src={post.Post === "Video" ? post.LinkImage : post.LinkImages[0]} />
                  <h2>{post.Titre}</h2>
                  <p>{post.Description}</p>
              </div>)): null}
              
          </div>
        </div>
      </div>
    );
}
export default DisplayPost;