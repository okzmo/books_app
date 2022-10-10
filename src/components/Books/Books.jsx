import React, { useContext, useState } from "react";
import "./books.scss";
import { AppContext } from "../../FetchData";
import { Book } from "../Book/Book";
import SearchBarPhone from "../SearchBarPhone/SearchBarPhone";
import { ThemeContext } from "../../App";
import LoadMore from "../LoadMore/LoadMore";

const Default = () => {
	return (
		<>
			<h1 className="titlePageCategory">BOOKS</h1>
			<p className="explication">
				Please, enter the name of the book or work you’re searching
			</p>
			<input
				type="search"
				name="searchBar"
				id="searchBarCategory"
				placeholder="Search"
			/>
		</>
	);
};

function Books() {
	const { books, loading, loadMore, fetchNewBooks } = useContext(AppContext);
	const { theme } = useContext(ThemeContext);
	let anyBooks = books.length > 0;
	const [isLast, setIsLast] = useState(false);

	const allBooks = books.map((book) => {
		return {
			...book,
			id: book.id.replace("/works/", ""),
			cover_img: `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`,
		};
	});

	if (loading) return "loading...";

	const handleBooks = (e) => {
		e.preventDefault();
		fetchNewBooks();
	};

	return (
		<div className="category__wrapper" id={theme}>
			{anyBooks && (
				<div className="booklist_grid">
					<div className="titleCategory">BOOKS</div>
					{allBooks.map((book, index) => {
						return <Book key={index} book={book} />;
					})}
				</div>
			)}
			<SearchBarPhone />
			{loadMore && <div>Load more</div>}
			{anyBooks && !loadMore && <LoadMore />}
		</div>
	);
}

export default Books;
