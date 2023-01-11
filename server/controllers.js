const unzipit = require("unzipit");
const axios = require("axios");
const {
  getLibViews,
  getLibView,
  getLibraries,
  getSeries,
  getBooks,
  getBookView,
  deleteLibrary,
  updateLibrary,
  deleteSeries,
  addLibrary,
  getPageView,
  getSeriesView,
  getSeriesInfo,
} = require("./models.js");
require("dotenv").config();
const { OCR_SERVER_URL, OCR_SERVER_PORT } = process.env;
var SHA1 = require("crypto-js/sha1");
var B64U = require("crypto-js/enc-base64url");
const { hashScanLibrary } = require("./scanner.js");
const FileReader = require("./FileReader");

module.exports.librariesController = async function (req, res) {
  try {
    let result = await getLibViews();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.libraryPostController = async function (req, res) {
  try {
    const id = B64U.stringify(SHA1(req.body.path));
    const name = req.body.name;
    const file_path = req.body.path;
    const created_date = Date.now();
    const last_modified_date = created_date;
    await addLibrary({ id, name, created_date, last_modified_date, file_path });
    res.status(201).send(id);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.libraryDeleteController = async function (req, res) {
  try {
    await deleteLibrary(req.params.library_id);
    res.status(200).send(`Deleted`);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.libraryPutController = async function (req, res) {
  try {
    let md = Date.now();

    await updateLibrary({
      library_id: req.params.library_id,
      name: req.body.name,
      path: req.body.path,
      modDate: md,
    });
    res.status(200).send(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.libraryController = async function (req, res) {
  try {
    let libraryView = await getLibView(req.params.library_id);

    res.status(200).send(libraryView);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.libraryScanController = async function (req, res) {
  try {
    let test = await hashScanLibrary(req.params.library_id);
    res.status(200).send(test);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports.fetchAllController = async function (req, res) {
  let data = {
    libraries: [],
  };
  const parseLibrary = async function (library) {
    let series = await getSeries(library.id);
    let seriesList = await Promise.all(series.map(parseSeries));

    data.books = seriesList.flat();
    return series;
  };
  const parseSeries = async function (series) {
    let bookList = await getBooks(series.id);
    return bookList;
  };

  data.libraries = await getLibraries();

  try {
    [data.series] = await Promise.all(data.libraries.map(parseLibrary));
    data.books = await Promise.all(data.series.map(parseSeries));
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//SERIES CONTROLLERS

module.exports.seriesController = async function (req, res) {
  try {
    let seriesView = await getSeriesView(req.params.series_id);
    // let bookList = await getBooks(req.params.series_id);

    // let seriesInfo = await getSeriesInfo(req.params.series_id);
    res.status(200).send(seriesView);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.deleteSeriesController = async function (req, res) {
  try {
    await deleteSeries(req.params.series_id);

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.scanSeriesController = async function (req, res) {
  try {
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
};

//BOOK
module.exports.bookViewController = async function (req, res) {
  try {
    let bookView = await getBookView(req.params.book_id);
    res.status(200).send(bookView);
  } catch (err) {
    res.status(500).send(err);
  }
};

//

//GET PAGE

//I- GET Request /book/:bookID/*read*?page=*number*
//O- Unzipped image file data akin to the doStuff function
//C- None
//E- Invalid numbers and book names
module.exports.pageViewController = (req, res) => {
  let q = {};
  q.id = req.params.book_id;
  q.number = req.query.page;
  getPageView(q)
    .then((result) => {
      const reader = new FileReader(`${result.book_path}/${result.file_name}`);
      unzipit
        .unzip(reader)
        .then(({ entries }) => {
          entries[result.name]
            .arrayBuffer()
            .then((aBuffer) => {
              let page = new Uint8Array(aBuffer);
              reader.close();
              res
                .writeHead(200, { "Content-Type": result.media_type })
                .end(page);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

//OCR

module.exports.ocrController = async (req, res) => {
  try {
    //Update url with env
    let kanji = await axios.post(
      `http://${OCR_SERVER_URL}:${OCR_SERVER_PORT}`,
      req.body
    );
    res.status(201).send(kanji.data);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

module.exports.allSeries = async (req, res) => {
  try {
    let result = await getSeriesInfo();
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
