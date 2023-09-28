import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

const reducers = combineReducers({
  auth: authReducer
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
