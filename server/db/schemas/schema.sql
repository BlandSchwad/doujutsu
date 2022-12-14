DROP DATABASE IF EXISTS manga;
CREATE DATABASE manga;

\c manga;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS library CASCADE;
DROP TABLE IF EXISTS series CASCADE;
DROP TABLE IF EXISTS book CASCADE;
DROP TABLE IF EXISTS page CASCADE;

CREATE TABLE users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(200),
  password VARCHAR(200),
  avatar VARCHAR(500)
);

CREATE TABLE library (
  id VARCHAR(250) PRIMARY KEY,
  CREATED_DATE BIGINT,
  LAST_MODIFIED_DATE BIGINT,
  NAME VARCHAR(500) NOT NULL,
  FILE_PATH VARCHAR(500)
);

CREATE TABLE series (
  id VARCHAR(50) PRIMARY KEY,
  CREATED_DATE BIGINT,
  LAST_MODIFIED_DATE BIGINT,
  name VARCHAR(500) NOT NULL,
  FILE_PATH VARCHAR(500),
  LIBRARY_ID VARCHAR(50) REFERENCES library (id) ON UPDATE CASCADE ON DELETE CASCADE,
  BOOK_COUNT INT
);

CREATE TABLE book (
  id VARCHAR(50) PRIMARY KEY,
  CREATED_DATE BIGINT,
  LAST_MODIFIED_DATE BIGINT,
  NAME VARCHAR(500) NOT NULL,
  FILE_PATH VARCHAR(500),
  SERIES_ID VARCHAR(50) REFERENCES series (id)  ON UPDATE CASCADE ON DELETE CASCADE,
  FILE_SIZE INT,
  PAGE_COUNT INT,
  LIBRARY_ID VARCHAR(250) REFERENCES library (id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE page (
  NAME VARCHAR(250),
  MEDIA_TYPE VARCHAR(250),
  NUMBER INT, 
  BOOK_ID VARCHAR(250) REFERENCES book (id)  ON UPDATE CASCADE ON DELETE CASCADE,
  FILE_SIZE INT,
  CONSTRAINT page_pkey PRIMARY KEY(BOOK_ID, NUMBER)
);

CREATE TABLE thumbnail_book (
  id VARCHAR(50),
  CREATED_DATE BIGINT,
  LAST_MODIFIED_DATE BIGINT,
  THUMBNAIL INTEGER[], 
  BOOK_ID VARCHAR(50) REFERENCES book (id)  ON UPDATE CASCADE ON DELETE CASCADE,
  TYPE VARCHAR (20),
  CONSTRAINT thumbnail_book_pkey PRIMARY KEY (id)
);

CREATE TABLE conversions (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  x INT,
  y INT,
  width FLOAT,
  height FLOAT,
  book_id VARCHAR(50),
  string VARCHAR(100)
);

CREATE view bookView AS SELECT book.id,  book.name, series.name series_name, library.name library_name, book.page_count,  book.file_size, book.file_path FROM book JOIN library ON book.library_id = library.id JOIN series ON  book.series_id = series.id;
CREATE view seriesView AS SELECT series.id, series.name, series.file_path, series.library_id, library.name library_name, (SELECT COUNT(*) FROM book WHERE book.series_id = series.id) book_count, (SELECT json_agg(books) from  (SELECT name, id, page_count from book where book.series_id = series.id ) as books) books from series JOIN library on series.library_id = library.id; 

CREATE VIEW pageView AS SELECT page.name, page.book_id, page.number, page.media_type, book.file_path book_path, book.name file_name from page join book on page.book_id = book.id;