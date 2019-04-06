import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // rename due to possible confusion of reducer


export default combineReducers({
  form: formReducer
});
