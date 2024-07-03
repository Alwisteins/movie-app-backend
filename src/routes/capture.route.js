const Router = require("express").Router;
const captureController = require("../controller/capture.controller");

const captureRoutes = Router();

captureRoutes.get("/describe", captureController.describeCaptureTable);
captureRoutes.get("/", captureController.getAllCaptures);
captureRoutes.get("/:movieId", captureController.getCapturesByMovieId);
captureRoutes.post("/", captureController.createNewCapture);
captureRoutes.delete("/", captureController.deleteCaptureByUserName);

module.exports = captureRoutes;
