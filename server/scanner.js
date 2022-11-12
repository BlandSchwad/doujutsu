const fsPromises = require("fs").promises;

const {
  addSeries,
  getSeries,
  addBook,
  getBooks,
  addPage,
  updatePageCount,
  getLibrary,
  bookAdd,
  updateBookCount,
  addBookThumbnail,
  deleteSeries,
  deleteBook,
  getSeriesInfo,
  getBookView,
} = require("./models.js");
const unzipit = require("unzipit");
const { hashElement } = require("folder-hash");

class FileReader {
  constructor(filename) {
    this.fhp = fsPromises.open(filename);
  }
  async close() {
    const fh = await this.fhp;
    await fh.close();
  }
  async getLength() {
    if (this.length === undefined) {
      const fh = await this.fhp;
      const stat = await fh.stat();
      this.length = stat.size;
    }
    return this.length;
  }
  async read(offset, length) {
    const fh = await this.fhp;
    const data = new Uint8Array(length);
    await fh.read(data, 0, length, offset);
    return data;
  }
}

module.exports.scanBook = async (book) => {
  try {
    const bookFile = new FileReader(`${book.file_path}/${book.name}`);
    let contents = await unzipit.unzip(bookFile);
    let pageIndex = 0;
    await Promise.all(
      Object.entries(contents.entries).map(([name, entry]) => {
        if (
          name.endsWith(".jpg") ||
          name.endsWith(".jpeg") ||
          name.endsWith(".png") ||
          name.endsWith(".JPG")
        ) {
          let suffix = name.endsWith(".png") ? "png" : "jpeg";
          let page = {};
          page.name = name;
          page.media_type = "image/" + suffix;
          page.number = pageIndex;
          page.book_id = book.id;
          page.file_size = entry.size;

          addPage(page);
          pageIndex++;
        }
      })
    );
    bookFile.close();

    return await updatePageCount(book.id);
  } catch (err) {
    console.log("Error Scanning Book", err);
    return err;
  }
};

module.exports.hashScanLibrary = async (library_id) => {
  let libraryInfo = await getLibrary(library_id);
  let dbSeriesList = await getSeries(library_id);
  let hashedLibrary = await hashElement(libraryInfo.file_path, {
    files: { include: ["*.zip", "*.rar", "*.cbz", "*.cbr"] },
  });
  let libraryHashMap = new Map();
  hashedLibrary.children.forEach((child) => {
    libraryHashMap.set(child.name, child.hash);
  });
  if (dbSeriesList.length === 0) {
    hashedLibrary.children.forEach(async (child) => {
      console.log(`Adding new series: ${child.name} and ${child.hash}`);
      await addSeries({
        id: child.hash,
        name: child.name,
        created_date: 123456789,
        last_modified_date: 987654321,
        file_path: libraryInfo.file_path,
        library_id: library_id,
      });
      await this.hashScanSeries(child.hash);
    });
  } else {
    console.log(`List of existing series: \n`);
    dbSeriesList.forEach((existingDbSeries) => {
      if (libraryHashMap.has(existingDbSeries.name)) {
        let foundHash = libraryHashMap.get(existingDbSeries.name);
        console.log(
          `Series ${existingDbSeries.name} found, comparing hashes: \n DB: ${existingDbSeries.id} Local: ${foundHash}`
        );
        if (existingDbSeries.id === foundHash) {
          console.log(`Skipping matched hash: ${foundHash}`);
          libraryHashMap.delete(existingDbSeries.name);
        } else {
          console.log(
            `Change Detected in ${existingDbSeries.name}, Scanning Series`
          );
          this.hashScanSeries(existingDbSeries.id);
        }
      } else {
        console.log(`Series folder not found/accessible. Removing from DB`);
        deleteSeries(existingDbSeries.id)
          .then((result) => {
            console.log(`Series removed`);
          })
          .catch((err) => {
            console.log(err);
            return err;
          });
      }
    });
    libraryHashMap.forEach(async (value, key) => {
      console.log(`Adding ${key} with hash ${value}`);
      await addSeries({
        id: value,
        name: key,
        created_date: 123456789,
        last_modified_date: 987654321,
        file_path: libraryInfo.file_path,
        library_id: library_id,
      });
      libraryHashMap.delete(key);
      console.log(
        `Finished adding series, remaining folders: ${libraryHashMap.size}`
      );
    });
  }
};

module.exports.hashScanSeries = async (seriesId) => {
  let seriesInfo = await getSeriesInfo(seriesId);
  let dbBookList = await getBooks(seriesId);
  let hashedSeries = await hashElement(
    `${seriesInfo.file_path}/${seriesInfo.name}`,
    {
      files: { include: ["*.zip", "*.rar", "*.cbz", "*.cbr"] },
    }
  );
  let seriesHashMap = new Map();
  hashedSeries.children.forEach(async (child) => {
    seriesHashMap.set(child.name, child.hash);
  });
  // console.log(`${hashedSeries}`);

  if (dbBookList.length === 0) {
    hashedSeries.children.forEach(async (child) => {
      let addBookResult = await addBook({
        id: child.hash,
        created_date: 123456789,
        last_modified_date: 987654321,
        name: child.name,
        series_id: seriesId,
        file_path: `${seriesInfo.file_path}/${seriesInfo.name}`,
        library_id: seriesInfo.library_id,
      });
      console.log(`Successfully added ${addBookResult}`);
      this.hashScanBook(addBookResult.id);
    });
  } else {
    dbBookList.forEach(async (existingDbBook) => {
      if (seriesHashMap.has(existingDbBook.name)) {
        seriesHashMap.delete(existingDbBook.name);
        if (existingDbBook.id === seriesHashMap.get(existingDbBook.name)) {
          console.log(`No changes detected in ${existingDbBook.name}`);
        } else {
          console.log(
            `Change detected in ${existingDbBook.name}. Scanning book`
          );
        }
      } else {
        console.log("Book not found. Removing from Series");
        await deleteBook(existingDbBook.id);
        return;
      }
    });
    seriesHashMap.forEach(async (value, key) => {
      console.log(`Adding ${key}, hash: ${value}`);
      await addBook({
        id: value,
        created_date: 123456789,
        last_modified_date: 987654321,
        name: key,
        series_id: seriesInfo.series_id,
        file_path: `${seriesInfo.file_path}/${seriesInfo.name}`,
        library_id: seriesInfo.library_id,
      });
      seriesHashMap.delete(key);
      return;
    });
  }
  console.log(`Series Scan Complete`);
};

module.exports.hashScanBook = async (book_id) => {
  let bookInfo = await getBookView(book_id);
  await this.scanBook(bookInfo);
  //let bookHash = await hashElement(`${bookInfo.file_path}/${bookInfo.name}`);
  //console.log(bookHash);
};
