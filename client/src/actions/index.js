import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  DASHBOARD_GET_DATA,
  AUTH_ERROR } from './types';
/*
  ActionCreators -> create/return Actions ({}) -> dispatched -> middlewares -> reducers
*/

export const signUp = data => {
  /*
    Step 1) Use the data and to make HTTP request to our backend and send it along
    Step 2) Take the backends response (jwtToken is here now!)
    Step 3) Dispatch user just signed up (with jwtToken)
    Step 4) Save the jwtToken into our localStorage
    Step 5)
  */
  return async dispatch => {
    try {
      console.log('[ActionCreator] signUp called!');
      const res = await axios.post('http://localhost:5000/users/signup', data);

      console.log('[ActionCreate] signUp dispatched an action');

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email is already in use!'
      });
    }
  }
}

export const signIn = data => {
  /*
    Step 1) Use the data and to make HTTP request to our backend and send it along
    Step 2) Take the backends response (jwtToken is here now!)
    Step 3) Dispatch user just signed up (with jwtToken)
    Step 4) Save the jwtToken into our localStorage
    Step 5)
  */
  return async dispatch => {
    try {
      console.log('[ActionCreator] signIn called!');
      const res = await axios.post('http://localhost:5000/users/signin', data);

      console.log('[ActionCreate] signIn dispatched an action');

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email & password combination invalid'
      });
    }
  }
}

export const getSecret = () => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] Trying to get secret from the backend');

      const res = await axios.get('http://localhost:5000/users/secret');
      console.log('res: ', res);

      dispatch({
        type: DASHBOARD_GET_DATA,
        payload: res.data.secret
      });
    } catch(err) {
      console.log('err: ', err);
    }
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    });
  }
}
