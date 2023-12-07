import React from "react";
import './DisplayPosts.css';
import moment from "moment";
function DisplayPosts (props) {


    return(
        <div className="ListPosts">
            {props.data.map((post) => 
                <div className="cardPost">
                    <div className="Details">
                        <div className="DetailHeader">
                            <span className="CategoryWrapper">{post.Category}</span>
                            <span>{moment(post.DatePost).format('DD MMMM YYYY') }</span>
                        </div>
                        <span className="Title">{post.Titre}</span>
                        <span className="Description">{post.Description}</span>
                    </div>
                    {post.Post === "Article" ?
                        <img className="Image" src={post.LinkImages[0]} />:
                        <img className="Image" src={post.LinkImage} />
                    }
                </div>
            )}
        </div>
    );
}
export default DisplayPosts;