import { GRAVATAR_EMAIL, SCORE_USER, USER_LOGIN } from './actionTypes';

export const playerAction = (value) => ({ type: USER_LOGIN, value });
export const gravatarAction = (value) => ({ type: GRAVATAR_EMAIL, value });
export const scoreAction = (value) => ({ type: SCORE_USER, value });
