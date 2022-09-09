export const tokenKey = 'token';
export const saveToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

export const getToken = () => localStorage.getItem(tokenKey);
