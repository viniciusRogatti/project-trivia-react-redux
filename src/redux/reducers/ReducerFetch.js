import { TOKEN_USER, URL_FETCH } from '../actions/actionTypes';

const INITIAL_STATE = {
  url: '',
  token: '',
  filter: false,
};

const ReducerFetch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case URL_FETCH:
    return {
      ...state,
      url: action.value,
      filter: true,
    };
  case TOKEN_USER:
    return {
      ...state,
      token: action.value,
      url: `https://opentdb.com/api.php?amount=5&token=${action.value}`,
    };
  default:
    return state;
  }
};

export default ReducerFetch;
