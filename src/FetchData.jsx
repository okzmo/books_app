import React, { useState, useEffect } from "react";
import { useCallback } from "react";
const AppContext = React.createContext();
let offset = 0;

const BooksContext = ({ children }) => {
	const [searchText, setSearchText] = useState("");
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadMore, setLoadMore] = useState(false);

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`http://openlibrary.org/search.json?limit=15&offset=0&title=${searchText}`
			);
			const data = await res.json();
			const { docs } = data;

			if (docs) {
				let allBooks = docs.map((book) => {
					const {
						key,
						author_name,
						author_key,
						cover_i,
						edition_count,
						first_publish_year,
						title,
					} = book;

					return {
						id: key,
						author: author_name,
						author_id: author_key,
						cover_id: cover_i,
						edition_count: edition_count,
						first_publish_year: first_publish_year,
						title: title,
					};
				});

				allBooks = allBooks.filter((book) => {
					return book.cover_id !== undefined;
				});

				setBooks(allBooks);
			} else {
				setBooks([]);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [searchText]);

	const fetchNewBooks = async () => {
		offset += 15;
		setLoadMore(true);
		try {
			const res = await fetch(
				`http://openlibrary.org/search.json?limit=15&offset=${offset}&title=${searchText}`
			);
			const data = await res.json();
			const { docs } = data;

			if (docs) {
				let allBooks = docs.map((book) => {
					const {
						key,
						author_name,
						cover_i,
						edition_count,
						first_publish_year,
						title,
					} = book;

					return {
						id: key,
						author: author_name,
						cover_id: cover_i,
						edition_count: edition_count,
						first_publish_year: first_publish_year,
						title: title,
					};
				});

				if (allBooks.length === 0) {
					return;
				}

				allBooks = allBooks.filter((book) => {
					return book.cover_id !== undefined;
				});

				setBooks((oldAllBooks) => [...oldAllBooks, ...allBooks]);
			} else {
				setBooks([]);
			}
			setLoadMore(false);
		} catch (error) {
			console.log(error);
			setLoadMore(false);
		}
	};

	return (
		<AppContext.Provider
			value={{
				loadMore,
				loading,
				books,
				setSearchText,
				fetchBooks,
				fetchNewBooks,
			}}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, BooksContext };
