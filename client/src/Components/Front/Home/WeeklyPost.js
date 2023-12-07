import React, { useEffect } from "react";
import './WeeklyPost.css';

function WeeklyPost (props) {

    return(
        <div className="weekly-post-container">
            <div className="Details">
                <span className="Title1">Post of the week</span>
                <span className="Title2">{props.data.Titre} </span>
                <span className="Description">{props.data.Description}</span>
            </div>
            <img className="Image" src={props.data.LinkImage}  />
        </div>
    );
}
export default WeeklyPost;