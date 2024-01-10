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
                            <div className="Author">
                                <img src={post.User.Image} />
                                <span>{post.User.Firstname} {post.User.Lastname}</span>
                            </div>
                            <div className="Tags">
                                {post.tags.map((t) =><span className="Tag">#{t.name}</span> )}
                            </div>
                        </div>
                        <span className="Title">{post.Title}</span>
                        <span className="Description">{post.Description}</span>
                        <div className="InfoWrapper">
                                <span className="Views">{post.Views.length} Views</span>
                                <span>{moment(post.DatePost).format('DD MMMM YYYY') }</span>
                        </div>
                    </div>
                    <img className="Image" src={post.LinkImage} />
                </div>
            )}
        </div>
    );
}
export default DisplayPosts;