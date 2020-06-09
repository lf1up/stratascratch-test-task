import { combineReducers } from 'redux';

import StrataScratchReducer from './StrataScratchReducer';

const appReducer = combineReducers({
  StrataScratchReducer
});

const rootReducer = (state: any, action: any) => {
  let initialState = state;

  return appReducer(initialState, action);
};

export default rootReducer;
