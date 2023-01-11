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
  ocrController,
  allSeries,
} = require("./controllers");
const path = require("path");
const { updateLibrary } = require("./models");

require("dotenv").config();

console.log(path.join(__dirname, "..", "dist"));
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "dist")));
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Doujutsu Server ready, listening on port ${process.env.SERVER_PORT}`
  );
});

app.get("/all", allSeries);

//Library Routes
app.get("/libraries", librariesController);
app.get("/library/scan/:library_id", libraryScanController);
app.get("/library/:library_id", libraryController);

app.delete("/library/:library_id", libraryDeleteController);
app.post("/library", libraryPostController);
app.put("/library/:library_id", libraryPutController);
app.patch("/library/:library_id", async (req, res) => {
  try {
    let modifiedDate = Date.now();
    console.log(req.body);
    await updateLibrary({
      library_id: req.params.library_id,
      name: req.body.name,
      path: req.body.path,
      modDate: modifiedDate,
    });
    res.status(200).send("Library Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
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
