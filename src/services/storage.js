// storage token
export const tokenKey = 'token';
export const saveToken = (token) => {
  localStorage.setItem(tokenKey, token);
};
export const getToken = () => localStorage.getItem(tokenKey);

// storage ranking
const STORAGE_KEY = 'ranking';

const readRankingList = () => {
  if (!JSON.parse(localStorage.getItem(STORAGE_KEY))) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  const rankingList = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const lastScore = -1;
  return rankingList.sort((a, b) => (a.score < b.score ? 1 : lastScore));
};

const saveRanking = (rank) => localStorage.setItem(STORAGE_KEY, JSON.stringify(rank));

export const getRankingList = () => readRankingList();

export const addRanking = (ranking) => {
  const rankingList = readRankingList();
  saveRanking([...rankingList, ranking]);
};

export const removeRanking = (name) => {
  const rankingList = readRankingList();
  saveRanking(rankingList
    .filter((ranking) => ranking.name !== name));
};
