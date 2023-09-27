import { combineReducers } from 'redux';

const reducers = combineReducers({
  a: () => []
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
