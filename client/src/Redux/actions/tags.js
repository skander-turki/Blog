import axios from "axios";

import {ADD_TAG, GET_TAGS ,GET_TAG , DELETE_TAG} from '../actionTypes/tags';

export const addTag = (tag) => async (dispatch) => {
    try {
        const result = await axios.post('http://localhost:5000/tags/addtag', tag);
        dispatch({ type : ADD_TAG , payload: result.data }); 
    } catch (error) {
        dispatch({ type: ADD_TAG, payload: error.response.data.errors });
    }
}
export const getTags = () => async (dispatch) => {
    try {
        
        const result = await axios.get('http://localhost:5000/tags/getAllTags');
       
        dispatch({type : GET_TAGS, payload: result.data.allTags});
        
    } catch(error) {
        dispatch({ type: GET_TAGS, payload: error.response.data.errors });
    }
}
export const getTag = (name) => async (dispatch) => {
    try {
        const result = await axios.get(`http://localhost:5000/tags/gettag/${name}`);
        dispatch({type : GET_TAG, payload: result.data});
    } catch(error) {
        dispatch({ type: GET_TAG, payload: error.response.data.errors });
    }
}
export const deleteTag = (name) => async (dispatch) => {
    try {
        const result = await axios.delete(`http://localhost:5000/tags/delete/${name}`);
        dispatch({type : DELETE_TAG , payload: result.data});
    } catch(error) {
        dispatch({ type: DELETE_TAG, payload: error.response.data.errors });
    }
}
