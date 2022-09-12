import {
  USER_LOGIN,
  GRAVATAR_EMAIL,
  SCORE_USER,
  RIGHT_ANSWER,
  CLEAR_SCORE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  email: '',
};

const ReducerPlayer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.value.name,
      email: action.value.email,
    };
  case GRAVATAR_EMAIL:
    return {
      ...state,
      gravatarEmail: action.value,
    };
  case SCORE_USER:
    return {
      ...state,
      score: action.value,
    };
  case RIGHT_ANSWER:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case CLEAR_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default ReducerPlayer;
