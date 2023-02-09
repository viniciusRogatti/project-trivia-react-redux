function timerGame(callback) {
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 30000);
}

export default timerGame;