import { GRAVATAR_EMAIL, USER_LOGIN } from './actionTypes';

export const playerAction = (value) => ({ type: USER_LOGIN, value });
export const gravatarAction = (value) => ({ type: GRAVATAR_EMAIL, value });
