import { combineReducers } from 'redux';
import ReducerPlayer from './ReducerPlayer';
import Reducer2 from './Reducer2';

const rootReducer = combineReducers({
  player: ReducerPlayer,
  Reducer2,
});

export default rootReducer;
