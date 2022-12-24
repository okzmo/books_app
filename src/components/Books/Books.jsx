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
	let anyBooks = books.length > 0;

	useEffect(() => {
		setSearchText(nameBook);
	}, [id]);

	useEffect(() => {
		fetchBooks();
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
				{anyBooks ? (
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
			{loadMore && <div>Load more</div>}
			{anyBooks && !loadMore && <LoadMore />}
		</div>
	);
}

export default Books;
