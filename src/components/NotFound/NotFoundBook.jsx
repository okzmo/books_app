import { useContext } from "react";
import darkPic from "../../images/notfounddark.png";
import lightPic from "../../images/notfoundlight.png";
import "./NotFound.scss";
import { ThemeContext } from "../../App";

export const NotFoundBook = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="container" id={theme}>
			<div className="notFoundMessage">
				<h1 className="notFoundBig">BOOK NOT FOUND</h1>
				<p className="notFoundSmall">Try searching for another book.</p>
			</div>
			{theme === "dark" ? (
				<img src={darkPic} id="notFoundDecoration" />
			) : (
				<img src={lightPic} id="notFoundDecoration" />
			)}
		</div>
	);
};
