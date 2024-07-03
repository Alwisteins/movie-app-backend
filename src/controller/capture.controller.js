const dotenv = require("dotenv");
const captureModel = require("../model/capture.model");
const uploadImageToCloudinary = require("../utils/cloudinary");
const opencage = require("opencage-api-client");

dotenv.config();
const GEO_API_KEY = process.env.GEO_API_KEY;

const createNewCapture = async (req, res) => {
  const { movieId, userName, photo, location } = req.body;

  try {
    if (!movieId || !userName || !photo) {
      return res.status(401).json({
        status: false,
        message: "Parameter tidak lengkap",
      });
    }

    let city;
    let country;

    // get location based on coordinate
    if (location) {
      const data = await opencage.geocode({
        q: `${Number(location.lat)}, ${Number(location.long)}`,
        key: GEO_API_KEY,
      });
      if (data.status.code === 200 && data.results.length > 0) {
        city = data.results[0].components.city;
        country = data.results[0].components.country;
      }
    }

    const result = await uploadImageToCloudinary(photo);

    if (!result) {
      return res.status(500).json({
        status: false,
        message: "Gagal mengupload foto",
      });
    }

    const [rows] = await captureModel.createNewCapture(
      movieId,
      userName,
      result.secure_url,
      city && country ? `${city}, ${country}` : undefined
    );

    return res.status(200).json({
      status: true,
      message: "berhasil menyimpan capture",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "gagal menyimpan capture",
      error: error.message,
    });
  }
};

const getAllCaptures = async () => {
  try {
    const [rows] = await captureModel.getAllCaptures();

    return res.status(200).json({
      status: true,
      message: "berhasil mengambil semua capture",
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "gagal mengambil semua capture",
      error: error.message,
    });
  }
};

const getCapturesByMovieId = async (req, res) => {
  const { movieId } = req.params;
  try {
    const [rows] = await captureModel.getCapturesByMovieId(movieId);

    return res.status(200).json({
      status: true,
      message: "berhasil mengambil semua capture berdasarkan movieId",
      data: rows,
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "gagal mengambil semua capture berdasarkan movieId",
      error: error.message,
    });
  }
};

const deleteCaptureByUserName = async (req, res) => {
  const { userName } = req.body;
  try {
    const [rows] = await captureModel.deleteCaptureByUserName(userName);

    return res.status(200).json({
      status: true,
      message: "berhasil menghapus capture berdasarkan userName",
    });
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "gagal menghapus capture berdasarkan userName",
      error: error.message,
    });
  }
};

const describeCaptureTable = async (req, res) => {
  try {
    const [rows] = await captureModel.describeTable();

    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan struktur tabel capture",
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Gagal mendapatkan struktur tabel capture",
      error: error.message,
    });
  }
};

const captureController = {
  createNewCapture,
  getAllCaptures,
  getCapturesByMovieId,
  deleteCaptureByUserName,
  describeCaptureTable,
};

module.exports = captureController;
