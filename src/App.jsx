import { createContext, useEffect, useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Books from "./components/Books/Books";
import LoadMore from "./components/LoadMore/LoadMore";
import Author from "./components/Author/Author";
import BookDetails from "./components/Book/BookDetails";
import { Routes, Route } from "react-router-dom";
import { BooksContext, AppContext } from "./FetchData";

export const ThemeContext = createContext("dark");

function App() {
	const [theme, setTheme] = useState("dark");
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		setDisabled(true);
		setTimeout(function () {
			setDisabled(false);
		}, 2000);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	};

	return (
		<BooksContext>
			<ThemeContext.Provider value={{ disabled, theme, toggleTheme }}>
				<Navbar />
				<Routes>
					<Route path="/" element={<Hero />} />
					<Route
						path="/books"
						element={
							<>
								<Books />
							</>
						}
					/>
					<Route path="/book/:id" element={<BookDetails />} />
					<Route path="/author/:id" element={<Author />} />
				</Routes>
			</ThemeContext.Provider>
		</BooksContext>
	);
}

export default App;
