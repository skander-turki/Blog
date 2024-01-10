import React from "react";
import { useEffect, useState } from "react";
import {GetAllPost , GetPostById} from "../../Redux/actions/posts"
import { useDispatch, useSelector } from "react-redux";
import WeeklyyPost from "../../Components/Front/Home/WeeklyPost";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './HomeContent.css';
import DisplayPosts from "../../Components/Front/Home/DisplayPosts";
import UserDisplayPost from "../../Components/Front/Home/UserDisplayPost";
import PopularTags from "../../Components/Front/Home/PopularTags";
import BestAuthor from "../../Components/Front/Home/BestAuthor";
import SignUpFlow from "../../Components/Front/Auth/SignUpFlow";

function HomeContent (props) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 650) {
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
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetAllPost());
    }, [dispatch]);
    const MostViewed = useSelector((state) => state.postReducer.AllPost);
    return(
        <div className="Home-content">
            {!props.isAuth ?
            MostViewed.length !== 0  ?
                <WeeklyyPost data={MostViewed.slice(0,3)}/>:
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>: null}
            {!props.isAuth ?
            <div className="Content">
                <div className="DisplayPosts">
                    {MostViewed.length !== 0 ?
                        <DisplayPosts data={MostViewed.slice(0,6)} />:
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    }
                </div>
                <div className={`secondPart ${scrolled ? 'scrolled' : ''}`}>
                    <PopularTags />
                    <BestAuthor />
                </div>
            </div>:
            <>
                 {!props.user.IsValid ?
                <SignUpFlow user={props.user}/>  
                : null}
                <div className="Content">
                    <div className="DisplayPosts">
                        <UserDisplayPost />    
                    </div>
                </div>
            </> 
            
            }
        </div>
    );
}
export default HomeContent ;