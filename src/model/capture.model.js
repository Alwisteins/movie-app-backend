const pool = require("../config/database");

const createNewCapture = (movieId, userName, photo, location) => {
  return pool.query(
    "INSERT INTO capture (movieId, userName, photo, location) VALUES (?, ?, ?, ?)",
    [movieId, userName, photo, location]
  );
};

const getAllCaptures = () => pool.query("SELECT * FROM capture");

const getCapturesByMovieId = (movieId) => {
  return pool.query("SELECT * FROM capture WHERE movieId = ?", [movieId]);
};

const deleteCaptureByUserName = (userName) => {
  return pool.query("DELETE FROM capture WHERE userName = ?", [userName]);
};

const describeTable = () => {
  return pool.query("DESCRIBE capture");
};

const captureModel = {
  createNewCapture,
  getAllCaptures,
  getCapturesByMovieId,
  deleteCaptureByUserName,
  describeTable
};

module.exports = captureModel;
