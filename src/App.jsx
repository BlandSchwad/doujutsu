import React from "react";
import { Routes, Route } from "react-router-dom";
import Libraries from "./Libraries";
import Bar from "./Bar";
import { useState, useEffect } from "react";
import axios from "axios";
import Series from "./Series";
import Book from "./Book";
import Reader from "./Reader";
import Library from "./Library";
import Crud from "./CRUD";

function App() {
  const [Data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:45001/all").then((result) => {
      setData(result.data);
    });
  }, []);

  return (
    <div className="App">
      <Bar data={Data} />
      <Routes>
        <Route path="/" element={<Libraries data={Data} />} />
        <Route path="/series/:series_id" element={<Series />} />
        <Route path="/book/:book_id" element={<Book />} />
        <Route path="/read/:book_id" element={<Reader />} />
        <Route
          path="/library/:library_id"
          element={<Library series={Data.series} />}
        />
        <Route path="/crud" element={<Crud />} />
      </Routes>
    </div>
  );
}

export default App;
