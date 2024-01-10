import React from "react";
import { useEffect } from "react";
import { getTags } from "../../../Redux/actions/tags";
import { useDispatch, useSelector } from "react-redux";
import "./PopularTags.css"

function PopularTags() {
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getTags())
      }, [dispatch]);
    const Tags = useSelector((state) => state.tagReducer.tags);
    return(
        <div className="TagsContent">
            <span className="Title">PopularTags</span>
            <div className="PopularTags">
                {
                    Array.isArray(Tags) && Tags.slice(0, 7).map((tag) => 
                        <span className="tag">{tag.name}</span>
                    )
                }
            </div>
        </div>
    );
}
export default PopularTags;