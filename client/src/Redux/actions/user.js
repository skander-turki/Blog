import axios from 'axios';

import { 
          CURRENT_USER, 
          FAIL_USER, 
          LOAD_USER, 
          LOGIN_USER, 
          LOGOUT_USER, 
          REGISTER_USER, 
          GET_IMAGE, 
          GET_IMAGES,
          UPLOAD_IMAGE,
          GET_USERS,
          DELETE_USER,
          ADD_USER
        } from '../actionTypes/user';

export const currentUser = () => async (dispatch) => {
  dispatch({
    type: LOAD_USER,
  });
  try {
    const options = {
      headers: { authorization: localStorage.getItem('token') },
    };
    const result = await axios.get('http://localhost:5000/users/current', options);
    dispatch({ type: CURRENT_USER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const login = (user) => async (dispatch) => {
  axios.post('http://localhost:5000/users/login', user).then((result) => {
    dispatch({ type: LOGIN_USER, payload: result.data }); // msg /token , user    
  }).catch((error)=> {
    dispatch({ type: LOGIN_USER, payload: error.response.data.errors });
  })

};
export const register = (user , navigate) => async (dispatch) => {
    axios.post('http://localhost:5000/users/register', user).then((result) => { 
      dispatch({ type: REGISTER_USER, payload: result.data }); 
    }).catch((error) => { 
    dispatch({ type: REGISTER_USER, payload: error.response.data.errors });
    })
};
export const AddUser = (user ) => async (dispatch) => {
  axios.post('http://localhost:5000/users/AddUser', user).then((result) => { 
    dispatch({ type: ADD_USER, payload: result.data }); 
  }).catch((error) => { 
  dispatch({ type: ADD_USER, payload: error.response.data.errors });
  })
}

export const logout = () => ({
  type: LOGOUT_USER,
});

export const loadImages = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/users/images');

    dispatch({ type: GET_IMAGES, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_IMAGES, payload: error.response.data.errors });
  }
};
export const uploadImage = (image) => async (dispatch) => {
 
    axios.post('http://localhost:5000/users/upload', image).then((result) => {
      dispatch({type: UPLOAD_IMAGE, payload: result.data.r});
    }).catch((result) => {
      return(result.error)
    })
    
  
    
};
/// //get image et images
export const getImage = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/users/image');
    dispatch({ type: GET_IMAGE, payload: res.data.toString() });
  } catch (err) {
    console.error(err);
  }
};
export const GetAllUsers = () => (dispatch) => {
  axios.get("http://localhost:5000/users/getUsers").then(
    (result) => {
      dispatch({type: GET_USERS, payload: result.data.Users});
    }
  ).catch( (error) => {
    dispatch({ type: GET_USERS, payload: error.response.data.errors });
  })
}
export const DeleteUser = (id) =>(dispatch) => {
  axios.delete(`http://localhost:5000/users/deleteUser/${id}`).then(
    (result) => 
      {
        dispatch({type: DELETE_USER, payload: result.data.status});
      }
    ).catch((result) => 
      {
        return(result.error)
      })
}