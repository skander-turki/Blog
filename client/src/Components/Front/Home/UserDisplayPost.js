import React, { useState } from "react";
import "./UserDisplayPost.css";
import { useDispatch, useSelector } from "react-redux";
import { GetMostViewed } from "../../../Redux/actions/posts";
import { useEffect } from "react";
import DisplayPosts from "./DisplayPosts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function UserDisplayPost () {
    const dispatch = useDispatch();
    const [tabvalue , settablevalue] = useState(0);
    const handletabchange = (e) =>  {
        settablevalue(parseInt(e.target.value, 10));
    }
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 90) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    /****************************** */
    useEffect(() => {
        dispatch(GetMostViewed());
    }, [dispatch]);
    const MostViewed = useSelector((state) => state.postReducer.most_viewed);

    return(
        <div className="UserDisplayPost">
            <div className={`tab-box ${scrolled ? 'scrolled' : ''}`}>
                <button onClick={handletabchange} className={tabvalue === 0 ? "tab-btn active" :"tab-btn"} value={0}>For you</button>
                <button onClick={handletabchange} className={tabvalue === 1 ? "tab-btn active" :"tab-btn"} value={1}>Economy</button>
                <button onClick={handletabchange} className={tabvalue === 2 ? "tab-btn active" :"tab-btn"} value={2}>Technology</button>
                <button onClick={handletabchange} className={tabvalue === 3 ? "tab-btn active" :"tab-btn"} value={3}>Entertainement</button>
                <button onClick={handletabchange} className={tabvalue === 4 ? "tab-btn active" :"tab-btn"} value={4}>Sports</button>
                <button onClick={handletabchange} className={tabvalue === 5 ? "tab-btn active" :"tab-btn"} value={5}>Science</button>
                <button onClick={handletabchange} className={tabvalue === 6 ? "tab-btn active" :"tab-btn"} value={6}>Health</button>
                <button onClick={handletabchange} className={tabvalue === 7 ? "tab-btn active" :"tab-btn"} value={7}>Politics</button>
            </div>
            <div className="content">
                {tabvalue === 0 ?
                    MostViewed.length !== 0 ?
                                <DisplayPosts data={MostViewed} />:
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>:
                null
                }
            </div>
            
        </div>
    );
}
export default UserDisplayPost;