import {
  CLEAR_SCORE,
  GRAVATAR_EMAIL,
  RIGHT_ANSWER,
  SCORE_USER,
  TOKEN_USER,
  URL_FETCH,
  USER_LOGIN,
} from './actionTypes';

export const playerAction = (value) => ({ type: USER_LOGIN, value });
export const gravatarAction = (value) => ({ type: GRAVATAR_EMAIL, value });
export const scoreAction = (value) => ({ type: SCORE_USER, value });
export const rightAnswer = () => ({ type: RIGHT_ANSWER });
export const clearScore = () => ({ type: CLEAR_SCORE });
export const urlAction = (value) => ({ type: URL_FETCH, value });
export const tokenAction = (value) => ({ type: TOKEN_USER, value });
