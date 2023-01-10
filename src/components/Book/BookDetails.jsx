import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Book.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { NotFoundBook } from "../NotFound/NotFoundBook";

function BookDetails() {
	const { id } = useParams();
	const { theme } = useContext(ThemeContext);
	const [loading, setLoading] = useState(false);
	const [book, setBook] = useState(null);
	const [readMore, setReadMore] = useState(false);
	const [author, setAuthor] = useState(null);

	useEffect(() => {
		setLoading(true);
		async function getBook() {
			try {
				const resBook = await fetch(`https://openlibrary.org/works/${id}.json`);
				const dataBook = await resBook.json();
				console.log(dataBook);

				if (dataBook) {
					const {
						description,
						title,
						covers,
						subjects,
						subject_places,
						subject_times,
					} = dataBook;

					const newBook = {
						description: !description
							? "No description Found"
							: typeof description === "string"
							? description
							: description.value,
						title: title,
						cover_img: `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`,
						subjects: subjects ? subjects.join(", ") : "No subjects found.",
						subject_places: subject_places
							? subject_places.join(", ")
							: "No subject places found.",
						subject_times: subject_times
							? subject_times.join(", ")
							: "No subject times found.",
					};

					setBook(newBook);
				} else {
					setBook(null);
				}

				if (dataBook.authors[0] !== undefined) {
					const resAuthor = await fetch(
						`https://openlibrary.org/authors/${dataBook.authors[0].author.key.slice(
							9
						)}.json`
					);
					const dataAuthor = await resAuthor.json();
					console.log(dataAuthor);

					if (dataAuthor) {
						const { name } = dataAuthor;

						const newAuthor = {
							name: name,
							id: dataBook.authors[0].author.key.slice(9),
							photo: `https://covers.openlibrary.org/a/olid/${dataBook.authors[0].author.key.slice(
								9
							)}-M.jpg`,
						};

						setAuthor(newAuthor);
					} else {
						setAuthor(null);
					}
				}

				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
		getBook();
	}, [id]);

	if (loading) return "loading...";

	const handleReadMore = (e) => {
		if (readMore) {
			setReadMore(false);
			e.target.innerText = "Read More...";
		} else {
			setReadMore(true);
			e.target.innerText = "Collapse";
		}
	};

	return (
		<>
			{book !== null ? (
				<div className="bookDetails__container" id={theme}>
					<div className="bookDetailsVisuals">
						<div className="backCover">
							<img src={book?.cover_img} id="backCoverImg" />
							<img src={book?.cover_img} alt="Book cover" id="frontCoverImg" />
						</div>
					</div>
					<div className="bookDetailsElements">
						<h2 className="bookTitle">{book?.title}</h2>
						<p className="bookDescription">
							{book?.description.length > 500 ? (
								<span className="bookLongDescription">
									{readMore
										? book?.description
										: book?.description.split(" ").slice(0, 50).join(" ")}{" "}
									<button id="readMoreBtn" onClick={handleReadMore}>
										Read More...
									</button>
								</span>
							) : (
								book?.description
							)}
						</p>
						<div className="subjectBox">
							<p className="bookPlaces">
								<span className="importantInfo">Places</span> :{" "}
								{book?.subject_places}
							</p>
							<p className="bookTime">
								<span className="importantInfo">Time</span> :{" "}
								{book?.subject_times}
							</p>
							<p className="bookAuthor">
								<span className="importantInfo">Author</span> :{" "}
								<Link className="link" to={`/author/${author?.id}`} {...author}>
									{author?.name}
								</Link>
							</p>
						</div>
					</div>
				</div>
			) : (
				<NotFoundBook />
			)}
		</>
	);
}

export default BookDetails;
