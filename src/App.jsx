import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Books from "./components/Books/Books";
import Author from "./components/Author/Author"
import BookDetails from "./components/Book/BookDetails";
import { Routes, Route } from "react-router-dom";
import { BooksContext } from "./FetchData";

function App() {
  return (
    <BooksContext>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/books" element={<Books />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/author/:id" element={<Author />} />
      </Routes>
    </BooksContext>
  );
}

export default App;
