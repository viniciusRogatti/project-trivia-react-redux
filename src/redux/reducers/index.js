import { combineReducers } from 'redux';
import ReducerPlayer from './ReducerPlayer';
import ReducerFetch from './ReducerFetch';

const rootReducer = combineReducers({
  player: ReducerPlayer,
  fetch: ReducerFetch,
});

export default rootReducer;
