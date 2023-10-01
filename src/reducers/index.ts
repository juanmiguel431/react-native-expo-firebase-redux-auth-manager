import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { authReducer } from './authReducer';
import ReduxThunk from 'redux-thunk';
import employeeReducer from './employeeReducer';

export const reducers = combineReducers({
  auth: authReducer,
  employee: employeeReducer
});

export type RootState = ReturnType<typeof reducers>;


const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
