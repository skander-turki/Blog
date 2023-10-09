/* eslint-disable default-param-last */
import { 
          ADD_VIDEO,
          DELETE_VIDEO,
          ADD_ARTICLE,
          DELETE_ARTICLE,
          UPLOAD_IMAGE,
          DELETE_IMAGE,
          UPLOAD_IMAGE_PODCAST,
          ADD_PODCAST,
          DELETE_PODCAST,
          UPLOAD_AUDIO,
          GET_ARTICLES,
          GET_VIDEOS,
          GET_PODCASTS
        } from '../actionTypes/posts';

// initialstate
const initialState = {
  post: {},
  image: {},
  audio: {},
  articles : [],
  videos : [],
  podcasts : [],
  errors: []
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_VIDEO:
      return {
        ...state,
        post: payload,
      };
      case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
      };
      case DELETE_VIDEO:
        return {
          ...state,
        };
    case ADD_ARTICLE:
      return {
        ...state,
        post: payload,
      };
      case GET_ARTICLES:
        return {
          ...state,
          articles: payload,
        };
      case DELETE_ARTICLE:
          return {
            ...state,
          };
    case UPLOAD_IMAGE: 
    return {
      ...state, 
      post:payload,
    };
    case DELETE_IMAGE:
    return {
      ...state,
      
    }
    case UPLOAD_IMAGE_PODCAST:
      return {
        ...state,
        image:payload,
      };
    case ADD_PODCAST: 
      return{
        ...state,
        post:payload
      };
    case DELETE_PODCAST:
      return {
        ...state,
          
      }
    case GET_PODCASTS:
        return {
          ...state,
          podcasts: payload,
        };
    case UPLOAD_AUDIO: 
    return { 
      ...state,
      audio:payload
    };
    case 'VIDE_ERRORS':
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default postReducer;
