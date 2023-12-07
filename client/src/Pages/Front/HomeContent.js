import React from "react";
import { useEffect } from "react";
import {GetMostViewed , GetPostById} from "../../Redux/actions/posts"
import { useDispatch, useSelector } from "react-redux";
import WeeklyyPost from "../../Components/Front/Home/WeeklyPost";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './HomeContent.css';
import DisplayPosts from "../../Components/Front/Home/DisplayPosts";
import UserDisplayPost from "../../Components/Front/Home/UserDisplayPost";
import PopularTags from "../../Components/Front/Home/PopularTags";
import BestAuthor from "../../Components/Front/Home/BestAuthor";

function HomeContent (props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetMostViewed());
        dispatch(GetPostById("653fb63e5624db942b617522"))
    }, [dispatch]);
    const MostViewed = useSelector((state) => state.postReducer.most_viewed);
    const WeeklyPost = useSelector((state) => state.postReducer.post );
    console.log(MostViewed)
    return(
        <div className="Home-content">
            {!props.isAuth ?
            WeeklyPost.Titre !== undefined ?
                <WeeklyyPost data={WeeklyPost}/>:
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
                <div className="secondPart">
                    <PopularTags />
                    <BestAuthor />
                </div>
            </div>:
            <div className="Content">
                <div className="DisplayPosts">
                    <UserDisplayPost />    
                </div>
            </div>
            }
        </div>
    );
}
export default HomeContent ;