// time util
module.exports = {
  getTodayISO8601,
};

function getTodayISO8601() {
  return new Date().toISOString().slice(0, 10);
}
