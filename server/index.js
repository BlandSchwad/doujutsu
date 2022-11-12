const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
} = require("./controllers");
const { ocrPostController } = require("./ocrController");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.listen(process.env.SERVER_PORT);
console.log(`Server ready, listening on port ${process.env.SERVER_PORT}`);

app.get("/all", fetchAllController);

//Library Routes
app.get("/libraries", librariesController);
app.delete("/library/:library_id", libraryDeleteController);
app.post("/library", libraryPostController);
app.put("/library/:library_id", libraryPutController);
app.get("/library/scan/:library_id", libraryScanController);
app.get("/library/:library_id", libraryController);

//Series
app.get("/series/:series_id", seriesController);
app.delete("/series/:series_id", deleteSeriesController);
//app.get('/series/scan/:series_id', )

// Book
app.get("/book/:book_id", bookViewController);

//Page
app.get("/page/:book_id", pageViewController);

//OCR
app.post("/ocr", ocrPostController);
