import React , { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPostById } from "../../Redux/actions/posts";
import DetailPost from "../../Components/Front/Post/DetailPost"

function DisplayPost () {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(GetPostById(id, dispatch))
    }, [dispatch]);
    const post = useSelector((state) => state.postReducer.post);
    return(
        <DetailPost post={post}/>
    )
}
export default DisplayPost