const db = require("./db/index.js");

module.exports.addLibrary = async (library) => {
  try {
    let result = await db.query({
      text: `
        INSERT INTO library (id, created_date, last_modified_date, name, file_path)
        VALUES ($1, $2, $3, $4, $5)
        `,
      values: [
        library.id,
        library.created_date,
        library.last_modified_date,
        library.name,
        library.file_path,
      ],
    });
    return result[0];
  } catch (err) {
    return err;
  }
};

module.exports.getLibrary = async (library_id) => {
  try {
    let result = await db.query({
      text: `SELECT * from library
       WHERE id =$1`,
      values: [library_id],
    });
    return result[0];
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports.updateLibrary = async ({ library_id, name, path, modDate }) => {
  try {
    let result = await db.query({
      text: `
        UPDATE  library
                SET (name, file_path, last_modified_date) = ($1, $2, $3)
                where id = $4
    
        `,
      values: [name, path, modDate, library_id],
    });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports.deleteLibrary = async (library_id) => {
  try {
    let result = await db.query({
      text: ` DELETE FROM library WHERE id = $1`,
      values: [library_id],
    });
    return result[0];
  } catch (err) {
    return err;
  }
};

module.exports.getLibraries = async () => {
  try {
    let result = await db.query({ text: "SELECT * from library" });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports.getLibViews = async () => {
  try {
    let result = await db.query(
      `SELECT name, file_path, created_date, last_modified_date, id, (SELECT json_agg(series) from (SELECT * FROM seriesView) AS series ) children FROM library`
    );
    return result;
  } catch (err) {
    return err;
  }
};

module.exports.getLibView = async (id) => {
  try {
    let result = await db.query(
      `SELECT name, file_path, created_date, last_modified_date, id, (SELECT json_agg(series) from (SELECT * FROM seriesView WHERE seriesView.library_id = $1) AS series ) children FROM library WHERE id = $1`,
      [id]
    );
    return result[0];
  } catch (err) {
    return err;
  }
};
//Series

module.exports.addSeries = async (series) => {
  try {
    let result = await db.query({
      text: `INSERT INTO series (id, created_date, last_modified_date, name, file_path, library_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            returning name, id
    `,
      values: [
        series.id,
        series.created_date,
        series.last_modified_date,
        series.name,
        series.file_path,
        series.library_id,
      ],
    });

    return result[0];
  } catch (err) {
    return err;
  }
};

module.exports.getSeries = async (library_id) => {
  try {
    let result = await db.query({
      text: `
      SELECT * 
            FROM series
            WHERE library_id = $1
      `,
      values: [library_id],
    });

    return result;
  } catch (err) {
    return err;
  }
};

module.exports.deleteSeries = async (series_id) => {
  try {
    let result = await db.query({
      text: `
    DELETE FROM series 
    WHERE id = $1
    `,
      values: [series_id],
    });

    return result;
  } catch (err) {
    return err;
  }
};

module.exports.getSeriesInfo = async (series_id) => {
  let query = { text: "SELECT * FROM seriesView" };
  if (series_id != undefined) {
    query.text += ` WHERE id = $1`;
    query.values = [series_id];
  }
  try {
    let result = await db.query(query);
    if (result.length === 1) {
      return result[0];
    }
    return result;
  } catch (err) {
    return err;
  }
};

module.exports.updateSeriesId = async (old_id, new_id) => {
  try {
    let result = await db.query({
      text: `
      UPDATE series SET id = $1 WHERE id = $2
      `,
      values: [new_id, old_id],
    });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports.getSeriesView = async (id) => {
  try {
    let result = await db.query(
      `
      SELECT *
          FROM seriesView
          WHERE id = $1   
     `,
      [id]
    );
    console.log(result);
    return result;
  } catch (err) {
    return err;
  }
};

//Books

module.exports.addBook = async (book) => {
  try {
    let result = await db.query({
      text: `
      INSERT INTO book (id, created_date, last_modified_date, name, file_path, series_id, file_size, library_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING name, id
            `,
      values: [
        book.id,
        book.created_date,
        book.last_modified_date,
        book.name,
        book.file_path,
        book.series_id,
        book.file_size,
        book.library_id,
      ],
    });

    return result[0];
  } catch (err) {
    return err;
  }
};

module.exports.getBooks = async (series_id) => {
  try {
    let result = await db.query({
      text: `
            SELECT * from book
            WHERE series_id = $1
            `,
      values: [series_id],
    });

    return result;
  } catch (err) {
    return err;
  }
};

module.exports.getBookView = async (book_id) => {
  try {
    let result = await db.query({
      text: `
        SELECT * FROM bookView WHERE id = $1
        `,
      values: [book_id],
    });

    return result[0];
  } catch (err) {
    return err;
  }
};

module.exports.addBookThumbnail = () => {
  return pool.connect().then((client) => {
    return db.query(
      `
            INSERT into thumbnail_book
            VALUES ($1, $2, $3, $4)
            `
    );
  });
};

module.exports.deleteBook = async (book_id) => {
  try {
    let result = await db.query({
      text: `DELETE FROM book WHERE id = $1`,
      values: [book_id],
    });

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// pages
module.exports.addPage = async (page) => {
  try {
    let result = await db.query({
      text: `INSERT INTO page (name, media_type, number, book_id, file_size)
        VALUES ($1, $2, $3, $4, $5)

        `,
      values: [
        page.name,
        page.media_type,
        page.number,
        page.book_id,
        page.file_size,
      ],
    });

    return result;
  } catch (err) {
    return err;
  }
};

module.exports.getPageView = async (q) => {
  try {
    let result = await db.query({
      text: `
    SELECT * FROM pageView where number = $1 AND book_id = $2`,
      values: [q.number, q.id],
    });

    return result[0];
  } catch (err) {
    console.log(err);
  }
};

//Make subquery
module.exports.updateBookCount = async (series_id) => {
  try {
    let result = await db.query({
      text: `
      UPDATE series
      SET book_count = (SELECT count(*) FROM book where series_id = $1)
      WHERE id = $1
      `,
      values: [series_id],
    });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports.updatePageCount = async (book_id) => {
  try {
    let result = await db.query({
      text: `
        UPDATE book
        SET page_count = (SELECT COUNT(*) FROM page WHERE book_id = $1)
        WHERE id = $1;
        `,
      values: [book_id],
    });
    return result[0];
  } catch (err) {
    return err;
  }
};

module.exports.addConversion = async (data) => {
  try {
    let result = await db.query({
      text: `INSERT INTO conversions (x, y, width, height, book_id, string)
      WHERE values ($1, $2, $3, $4, $5, $6)`,
      values: [
        data.x,
        data.y,
        data.width,
        data.height,
        data.book_id,
        data.string,
      ],
    });
    return result[0];
  } catch (err) {
    return err;
  }
};
