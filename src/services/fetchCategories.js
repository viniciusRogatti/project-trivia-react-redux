const fetchCategories = async () => {
  const URL = 'https://opentdb.com/api_category.php';
  const response = await fetch(URL);
  const data = await response.json();
  return data.trivia_categories;
};

export default fetchCategories;
