/* eslint-disable default-param-last */
import { 
          CURRENT_USER,
          FAIL_USER, 
          LOAD_USER, 
          LOGIN_USER, 
          LOGOUT_USER, 
          REGISTER_USER,
          GET_IMAGES,
          GET_IMAGE,
          UPLOAD_IMAGE,
          GET_USERS,
          DELETE_USER,
          ADD_USER,
          VALIDATE_USER
           } from '../actionTypes/user';

// initialstate
const initialState = {
  validateUser:{},
  result:{},
  users:[],
  user: {},
  userLogin: {},
  imagelink: {},
  errors: [],
  isAuth: false,
  load: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_IMAGES:
      return {
        ...state,
        images: payload,
      };
    case GET_IMAGE:
      return {
        ...state,
        image: payload,
      };
    case UPLOAD_IMAGE: 
      return {
        ...state, 
        imagelink:payload,
      };
    case LOGIN_USER:
      localStorage.setItem('token', payload.token);
      return { ...state , userLogin : payload };
    case REGISTER_USER:
      localStorage.setItem('token', payload.token);
      return { ...state , user : payload };
    case ADD_USER:
      return { ...state , result : payload };
    case VALIDATE_USER:
      return { ...state , validateUser : payload };
    case CURRENT_USER:
      return { ...state, user: payload.user, isAuth: payload.isAuth };
    case LOGOUT_USER:
      localStorage.removeItem('token');
      return { ...state, user: {}, isAuth: false };
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case DELETE_USER:
      return {
        ...state, result: payload 
      }
    case 'VIDE_ERRORS':
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default userReducer;
