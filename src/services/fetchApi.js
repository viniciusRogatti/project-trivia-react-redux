const fetchApi = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const request = await fetch(URL);
  const data = await request.json();
  return data.token;
};

export default fetchApi;
