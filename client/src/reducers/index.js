import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // rename due to possible confusion of reducer
import authReducer from './auth';

export default combineReducers({
  form: formReducer,
  auth: authReducer
});
