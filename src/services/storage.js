export const tokenKey = 'token';
export const saveToken = (token) => {
  localStorage.setItem(tokenKey, token);
};
