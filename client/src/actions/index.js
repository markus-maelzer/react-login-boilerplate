import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from './types';

const ROOT_URL = 'http://localhost:3001';

export const signinUser = ({ email, password }, callback) => {
  return dispatch => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then( res => {
        // if request is good..
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER })
        // - Save the JWT token
        localStorage.setItem('token', res.data.token)
        // - redirect to the route '/feature'
        callback('/feature');
      })
      .catch( () => {
        // if request is bad...
        // - Show an error to the user≈
        dispatch(authError('Bad Login Info'));
      });
  }
}

export const signupUser = ({ email, password }, callback) => {
  return dispatch => {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then( res => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', res.data.token)
        callback('/feature');
      })
      .catch((e) => {
        dispatch(authError(e.message));
      })
  }
}


export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}


export const signoutUser = () => {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}
