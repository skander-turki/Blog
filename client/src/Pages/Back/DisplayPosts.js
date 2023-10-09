import * as React from 'react';
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DisplayPosts from '../../Components/Back/DisplayPosts';
import { GetAllPodcasts , DeletePodcast} from "../../Redux/actions/posts";
import { GetAllVideos , DeleteVideo} from "../../Redux/actions/posts";
import { GetAllArticles , DeleteArticle } from "../../Redux/actions/posts";



function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
function DisplayAllPosts() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //Article **************************************
  const deleteArticle  = (id , dispatch) => () => {
    dispatch(DeleteArticle(id))
  };
  const UpdateArticle= (id) => () => {
    
  };
  useEffect(  () => {
    dispatch(GetAllArticles());
}, [dispatch]);
const Articles = useSelector((state) =>state.postReducer.articles )
  // video ***************************************
  const deleteVideo  = (id , dispatch) => () => {
    dispatch(DeleteVideo(id))
  };
const UpdateVideo= (id) => () => {
    
  };
  useEffect(  () => {
    dispatch(GetAllVideos());
}, [dispatch]);
const Videos = useSelector((state) =>state.postReducer.videos )
  
  // Podcast ************************************
  const deletePodcast = (id ) => () => {
    dispatch(DeletePodcast(id))
  };
const UpdatePodcast= (id) => () => {
    
  };
    useEffect(  () => {
         dispatch(GetAllPodcasts());
    }, [dispatch]);
    const podcasts = useSelector((state) =>state.postReducer.podcasts )

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Article" {...a11yProps(0)} />
          <Tab label="video" {...a11yProps(1)} />
          <Tab label="Podcast" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DisplayPosts Delete={deleteArticle}  list={Articles}  Update={UpdateArticle} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DisplayPosts Delete={deleteVideo}  list={Videos} Update={UpdateVideo}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DisplayPosts Delete={deletePodcast}  list={podcasts} Update={UpdatePodcast}/>
      </TabPanel>
    </Box>
  );
}
export default DisplayAllPosts;