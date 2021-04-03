import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import blogReducer from './blogReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  auth: authReducer,
  form: formReducer,
  blogs: blogReducer,
});

export default reducers;
