import axios from '../axiosConfig';

import { 
  ADD_PODCAST,
  ADD_VIDEO,
  UPLOAD_IMAGE,
  ADD_ARTICLE,
  UPLOAD_IMAGE_PODCAST,
  UPLOAD_AUDIO,
  GET_ARTICLES,
  GET_VIDEOS,
  GET_PODCASTS,
  DELETE_ARTICLE,
  DELETE_PODCAST,
  DELETE_VIDEO,
  GET_MOST_VIEWED,
  UPLOAD_IMAGE_VIDEO,
  GET_POSTBYID
} from '../actionTypes/posts';
//*********** VIDEO */
export const addVideo = (post, navigate) =>  async (dispatch) => {
   try {
    const result = await axios.post('http://localhost:5000/videos/upload', post);
    dispatch({type: ADD_VIDEO, payload: result.data});
    navigate('/Dashboard');
   } catch (error) {
    dispatch({ type: ADD_VIDEO, payload: error.response.data.errors });
  }
}
export const GetAllVideos = () => (dispatch) => {
  axios.get("http://localhost:5000/videos/getAllVideos").then(
    (result) => {
     
      dispatch({type: GET_VIDEOS, payload: result.data});
    }
  ).catch( (error) => {
    dispatch({ type: GET_VIDEOS, payload: error.response.data.errors });
  })
}
export const DeleteVideo = (id) => (dispatch) => {
  
  axios.delete(`http://localhost:5000/videos/deleteVideo/${id}`).then(
    (result) => {dispatch({type: DELETE_VIDEO, payload: result});}
  ).catch (
    (error) => {dispatch({ type: DELETE_VIDEO, payload: error })}
  )
}
export const UploadImageVideo = (image) => async (dispatch) => {
  axios.post('http://localhost:5000/videos/uploadImage',image).then(
    result => {
      dispatch({type: UPLOAD_IMAGE_VIDEO, payload: result.data})
    }
  ).catch(
    error => {
      dispatch({ type: UPLOAD_IMAGE_VIDEO, payload: error.response.data.errors });
    }
  )
}

//*********** ARTICLE */
export const addArticle = (post, navigate) =>  async (dispatch) => {
  try {
   const result = await axios.post('http://localhost:5000/articles/addArticle', post);
   dispatch({type: ADD_ARTICLE, payload: result.data});
   navigate('/Dashboard');
  } catch (error) {
   dispatch({ type: ADD_ARTICLE, payload: error.response.data.errors });
 }
}
export const UploadImage = (image) =>  async (dispatch) => {
  try {
    const result = await axios.post('http://localhost:5000/articles/uploadImage', image);
    dispatch({type: UPLOAD_IMAGE, payload: result.data});
  }catch (error) {
    dispatch({ type: UPLOAD_IMAGE, payload: error.response.data.errors });
  }
}
export const DeleteImage = (name) => async () => {
  try {
    const result = await axios.delete(`http://localhost:5000/articles/DeleteImage/${name}`);
    return result;
  }catch(error)
  {
    return error
  }
}
export const GetAllArticles = () => (dispatch) => {
  axios.get("http://localhost:5000/articles/getAllArticles").then(
    (result) => {
     
      dispatch({type: GET_ARTICLES, payload: result.data.data});
    }
  ).catch( (error) => {
    dispatch({ type: GET_ARTICLES, payload: error.response.data.errors });
  })
}
export const DeleteArticle = (id) => (dispatch) => {
  axios.delete(`http://localhost:5000/articles/deleteArticle/${id}`).then(
    (result) => {dispatch({type: DELETE_ARTICLE, payload: result});}
  ).catch (
    (error) => {dispatch({ type: DELETE_ARTICLE, payload: error })}
  )
}
//*********** PODCAST **************************************************************************** */
export const UploadAudio = (Object) => async (dispatch) => {
  console.log('test')
  axios.post('http://localhost:5000/podcast/uploadAudio',Object).then(
    
    result => {
      console.log('test1')
      dispatch({type: UPLOAD_AUDIO, payload: result.data})
    }
  ).catch(
    error => {
      console.log(error)
      dispatch({ type: UPLOAD_AUDIO, payload: error.response.data.errors });
    }
  )
}
export const UploadImagePodcast = (image) => async (dispatch) => {
  axios.post('http://localhost:5000/podcast/uploadImages',image).then(
    result => {
      dispatch({type: UPLOAD_IMAGE_PODCAST, payload: result.data})
    }
  ).catch(
    error => {
      dispatch({ type: UPLOAD_IMAGE_PODCAST, payload: error.response.data.errors });
    }
  )
}
export const DeleteImagePodcast = (name) => async () => {
  try {
    const result = await axios.delete(`http://localhost:5000/podcast/deleteImage/${name}`);
    return result;
  }catch(error)
  {
    return error
  }
} 
export const addPodcast = (post, navigate) =>  async (dispatch) => {
  try {
   const result = await axios.post('http://localhost:5000/podcast/addPodcast', post);
   dispatch({type: ADD_PODCAST, payload: result.data});
   navigate('/Dashboard');
  } catch (error) {
   dispatch({ type: ADD_PODCAST, payload: error.response.data.errors });
 }
}
export const GetAllPodcasts = () => (dispatch) => {
  axios.get("http://localhost:5000/podcast/getAllPodcasts").then(
    (result) => {
     
      dispatch({type: GET_PODCASTS, payload: result.data.data});
    }
  ).catch( (error) => {
    dispatch({ type: GET_PODCASTS, payload: error.response.data.errors });
  })
}
export const DeletePodcast = (id) => (dispatch) => {
  axios.delete(`http://localhost:5000/podcast/deletePodcast/${id}`).then(
    (result) => {dispatch({type: DELETE_PODCAST, payload: result});}
  ).catch (
    (error) => {dispatch({ type: DELETE_PODCAST, payload: error })}
  )
}

/*********** Media**************************************** */
export const GetMostViewed = () => (dispatch) => {
  axios.get("http://localhost:5000/media/getMostViewed").then(
    (result) => { dispatch({  type: GET_MOST_VIEWED, payload: result.data});}
  ).catch(
    error => {dispatch({ type: GET_MOST_VIEWED, payload: error.response.data.errors });}
  )
}
export const GetPostById = (id) => (dispatch) => {
  axios.get(`http://localhost:5000/media/getPostById/${id}`).then(
    (result) => {dispatch({type: GET_POSTBYID, payload:result.data.post});}
  ).catch(
    error => {dispatch({type: GET_POSTBYID, payload: error}); console.log(error)}
  )
}