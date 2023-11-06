import React , { useEffect, useState } from "react";
import './DetailPost.css';
import  {getTagById} from "../../../Redux/actions/tags"
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function DetailPost (props) {
const dispatch = useDispatch();
const post = props.post;
const [tags, settags] = useState([])
useEffect(() => {
    settags([]);
    if (Object.keys(post).length !== 0)
    {
        post.tags.map((tag) => {
        dispatch(getTagById(tag))
    })}
}, [post])
const tag = useSelector((state) => state.tagReducer.tag);
useEffect(() => {
    if (tag !== undefined)
    {
       if ( !tags.includes(tag.name)) settags(prevTags => [...prevTags, tag.name]);
    }
},[tag])
    return(
        <div className="PostContainer">
           <h2 className="TitleWrapper">{post.Titre}</h2>
           <span className="DescriptionWrapper">{post.Description}</span>
           <div className="DetailsWrapper">
                <div className="infoWrapper">
                    <span className="CategoryWrapper">{post.Category}</span>
                    <span>|</span>
                    {
                       tags.map((t, index) =>
                       ( <span className="tagsWrapper" key={index}>{t}</span>)
                        ) 
                    }
                </div>
                
                <span>{moment(post.DatePost).format('DD MMMM YYYY') }</span>
           </div>
           <img className="ImageWrapper" src={post.Post === "Video" ? post.LinkImage : post.LinkImages}/>
           
        </div>
    );
}

export default DetailPost;