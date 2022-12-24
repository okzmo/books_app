import React, { useEffect, useRef, useContext } from "react";
import "./sbarphone.scss";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../FetchData";

function SearchBarPhone() {
	const { setSearchText } = useContext(AppContext);
	const searchRef = useRef("");
	const navigate = useNavigate();

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
		<form onSubmit={handleSubmit}>
			<input
				type="search"
				name="searchBarHero"
				placeholder="Search"
				id="searchBarPhone"
				ref={searchRef}
			/>
			<input type="hidden" autoFocus={true} />
		</form>
	);
}

export default SearchBarPhone;
