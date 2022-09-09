const fetchTrivia = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const request = await fetch(URL);
  const data = await request.json();
  return data;
};

export default fetchTrivia;
