import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./books.scss";
import { AppContext } from "../../FetchData";
import { Book } from "../Book/Book";
import SearchBarPhone from "../SearchBarPhone/SearchBarPhone";
import { ThemeContext } from "../../App";
import LoadMore from "../LoadMore/LoadMore";
import { NotFoundBook } from "../NotFound/NotFoundBook";

function Books() {
	const { books, loading, loadMore, fetchBooks, setSearchText } =
		useContext(AppContext);
	const { theme } = useContext(ThemeContext);
	const { id } = useParams();
	const nameBook = id.replaceAll("-", " ");

	useEffect(() => {
		setSearchText(nameBook);
	}, [id]);

	useEffect(() => {
		fetchBooks();
		setTimeout(() => {
			console.log(books);
		}, 1000);
	}, [fetchBooks]);

	const allBooks = books.map((book) => {
		return {
			...book,
			id: book.id.replace("/works/", ""),
			cover_img: `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`,
		};
	});

	if (loading) return "loading...";

	return (
		<div className="bookPage" id={theme}>
			<div className="booklist__wrapper">
				{books && books.length > 0 ? (
					<>
						<div className="titleCategory">BOOKS</div>
						<div className="booklist">
							{allBooks.map((book, index) => {
								return <Book key={index} book={book} />;
							})}
						</div>
					</>
				) : (
					<NotFoundBook />
				)}
			</div>
			<SearchBarPhone />
			{books && !loadMore && <LoadMore />}
		</div>
	);
}

export default Books;
