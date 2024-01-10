import React, { useEffect } from "react";
import './WeeklyPost.css';
import moment from "moment";
import { useDispatch } from "react-redux";
import { getTagById } from "../../../Redux/actions/tags";

function WeeklyPost (props) {
    const dispatch = useDispatch();
    const displayTag = (tagId) => {
        dispatch(getTagById(tagId))
    }
    return(
        <div className="TrendingContainer">
            
            {props.data.length !== 0  ? 
                <div className="ListTrending">
                    {props.data.map((post, index) =>
                        <div className={index ==1 ? "box middle" : "box"}>
                            <img className="Image" src={post.LinkImage} />
                            <span className="Type">{post.Post}</span>
                            <span className="Title">{post.Title}</span>
                            <div className="Tags">
                                {post.tags.map((t) =><span className="Tag">#{t.name}</span> )}
                            </div>
                            <div className="InfoWrapper">
                                <span className="Views">{post.Views.length} Views </span>
                                <span className="Date"><ion-icon name="calendar-outline"></ion-icon>{moment(post.DatePost).format('DD MMMM YYYY') }</span>
                            </div>
                        </div>
                    )}
                </div>
                : 
                <div>
                    
                </div>

            }
        </div>
    );
}
export default WeeklyPost;