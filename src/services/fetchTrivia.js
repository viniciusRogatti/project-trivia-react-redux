const fetchTrivia = async (url) => {
  const request = await fetch(url);
  const data = await request.json();
  return data;
};

export default fetchTrivia;
