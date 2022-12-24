import React, { useEffect, useRef, useContext } from "react";
import "./navbar.scss";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../../FetchData";
import { ThemeContext } from "../../App";

const Moon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			className="moon">
			<path
				fill="#7f8f9e"
				d="M16.10999,31.5c7.60004,0,14.06-5.42999,15.37-12.91003c0.10004-0.58997-0.14996-1.17999-0.64996-1.51001C30.33002,16.75,29.69,16.75,29.19,17.07001c-1.66998,1.07996-3.60999,1.64996-5.59998,1.64996c-5.68005,0-10.31-4.63-10.31-10.31c0-1.98999,0.56995-3.92999,1.64996-5.59998C15.25,2.31,15.25,1.66998,14.91998,1.16998c-0.32996-0.5-0.92999-0.75-1.51001-0.65002C5.92999,1.82996,0.5,8.28998,0.5,15.89001C0.5,24.5,7.5,31.5,16.10999,31.5z"
			/>
		</svg>
	);
};

const Sun = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
			<circle cx="15" cy="15" r="6" fill="#cbdcea" />
			<path
				fill="#cbdcea"
				d="M15 6a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm0 22a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zM5 16H3a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm22 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zM6.51 24.49a1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.41l1.41-1.42a1 1 0 0 1 1.42 1.42l-1.42 1.41a1 1 0 0 1-.71.3zM22.07 8.93a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l1.42-1.41a1 1 0 0 1 1.41 1.41l-1.41 1.42a1 1 0 0 1-.71.29zm1.42 15.56a1 1 0 0 1-.71-.3l-1.42-1.41a1 1 0 0 1 1.42-1.42l1.41 1.42a1 1 0 0 1 0 1.41 1 1 0 0 1-.7.3zM7.93 8.93a1 1 0 0 1-.71-.29L5.81 7.22a1 1 0 0 1 1.41-1.41l1.42 1.41a1 1 0 0 1 0 1.42 1 1 0 0 1-.71.29z"
			/>
		</svg>
	);
};

function Navbar() {
	const { setSearchText } = useContext(AppContext);
	const { theme, toggleTheme, disabled } = useContext(ThemeContext);
	const searchRef = useRef("");
	const navigate = useNavigate();

	useEffect(() => searchRef.current.focus(), []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!(searchRef.current.value.trim().length === 0)) {
			navigate(
				`/books/${searchRef.current.value
					.trim()
					.toLowerCase()
					.replaceAll(" ", "-")}`
			);
		}
	};

	return (
		<div className="navbar" id={theme}>
			<Link className="linkLogo" to="/">
				<h1 className="logo">BK</h1>
			</Link>
			<div className="navbarRightSide__wrapper">
				<form onSubmit={handleSubmit}>
					<input
						type="search"
						name="searchBar"
						placeholder="The lord of the rings..."
						id="searchBar"
						ref={searchRef}
					/>
				</form>
				<button
					className="toggleTheme"
					disabled={disabled}
					onClick={toggleTheme}>
					{theme === "dark" ? <Moon /> : <Sun />}
				</button>
			</div>
		</div>
	);
}

export default Navbar;
