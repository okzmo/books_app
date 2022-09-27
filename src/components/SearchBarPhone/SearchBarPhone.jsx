import React, { useEffect, useRef, useContext } from 'react';
import './sbarphone.scss';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../FetchData';

function SearchBarPhone() {
	const { setSearchText } = useContext(AppContext);
	const searchRef = useRef('');
	const navigate = useNavigate();

	useEffect(() => searchRef.current.focus(), []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!(searchRef.current.value.trim().length === 0)) {
			setSearchText(searchRef.current.value.trim());
			navigate('/books');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='search'
				name='searchBarHero'
				placeholder='Search'
				id='searchBarPhone'
				ref={searchRef}
			/>
			<input type='hidden' autoFocus={true} />
		</form>
	);
}

export default SearchBarPhone;
