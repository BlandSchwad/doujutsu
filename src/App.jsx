import React from "react";
import { Routes, Route } from "react-router-dom";
import Libraries from "./Libraries";
import Series from "./Series";
import Book from "./Book";
import Reader from "./Reader";
import Library from "./Library";
import Crud from "./CRUD";

import Sandbox from "./Sandbox";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Libraries />} />
        <Route path="/series/:series_id" element={<Series />} />
        <Route path="/book/:book_id" element={<Book />} />
        <Route path="/read/:book_id" element={<Reader />} />
        <Route path="/library/:library_id" element={<Library />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/test" element={<Sandbox />} />
      </Routes>
    </div>
  );
}

export default App;
