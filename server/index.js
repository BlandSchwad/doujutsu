const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
const { waitFor } = require("wait-for-event");
const axios = require("axios");
const {
  seriesController,
  librariesController,
  fetchAllController,
  bookViewController,
  libraryDeleteController,
  libraryPostController,
  libraryPutController,
  libraryScanController,
  libraryController,
  deleteSeriesController,
  pageViewController,
  ocrController,
} = require("./controllers");
const path = require("path");

require("dotenv").config();
const ocr_spawner = require("./ocr_spawner");

console.log(path.join(__dirname, "..", "dist"));
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "dist")));
console.log(`Starting Doujutsu Server`);
app.listen(process.env.SERVER_PORT);

console.log(
  `Doujutsu Server ready, listening on port ${process.env.SERVER_PORT}`
);

app.get("/all", fetchAllController);

//Library Routes
app.get("/libraries", librariesController);
app.get("/library/scan/:library_id", libraryScanController);
app.get("/library/:library_id", libraryController);

app.delete("/library/:library_id", libraryDeleteController);
app.post("/library", libraryPostController);
app.put("/library/:library_id", libraryPutController);

//Series
app.get("/series/:series_id", seriesController);
app.delete("/series/:series_id", deleteSeriesController);
//app.get('/series/scan/:series_id', )

// Book
app.get("/book/:book_id", bookViewController);

//Page
app.get("/page/:book_id", pageViewController);

//OCR
app.post("/ocr", ocrController);
