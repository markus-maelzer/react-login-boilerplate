import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
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
      .catch((e) => {
        console.log(e);
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
      .catch((res) => {
        console.log(res);
        dispatch(authError(res.response.data.error));
      })
  }
}

export const authError = error => {
  console.log(error);
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

export const fetchMessage = () => {
  return dispatch => {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then( res => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: res.data.message
        })
      })
      .catch( res => {
        dispatch(authError('UNAUTHORIZED'));
      })
  }
}
