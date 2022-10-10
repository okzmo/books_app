import "./Book.scss";
import { Link } from "react-router-dom";

export const Book = ({ book }) => {
	return (
		<Link className="bookCard" to={`/book/${book.id}`} {...book}>
			<div className="singleBook__container">
				<div className="singleBook__img">
					<img id="bookCover" src={book.cover_img} alt="Book cover" />
				</div>
				<div className="singleBook__title">
					{book.title.length > 50
						? book.title.split(" ").slice(0, 5).join(" ") + "..."
						: book.title}
				</div>
			</div>
		</Link>
	);
};
