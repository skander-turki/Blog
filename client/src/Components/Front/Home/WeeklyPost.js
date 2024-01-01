import React, { useEffect } from "react";
import './WeeklyPost.css';
import moment from "moment";

function WeeklyPost (props) {

    return(
        <div className="TrendingContainer">
            
            {props.data.length !== 0  ? 
                <div className="ListTrending">
                    {props.data.map((post, index) =>
                        <div className={index ==1 ? "box middle" : "box"}>
                            {post.Post === "Article" ?
                                <img className="Image" src={post.LinkImages[0]} />:
                                <img className="Image" src={post.LinkImage} />
                                }
                            <span className="Type">{post.Post}</span>
                            <span className="Title">{post.Titre}</span>
                            <span className="Category">{post.Category}</span>
                            <div className="InfoWrapper">
                                <span className="Views"><ion-icon name="eye-outline"></ion-icon>{post.ViewNumber}</span>
                                <span className="Likes"><ion-icon name="heart-outline"></ion-icon>{post.LikesNumber}</span>
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