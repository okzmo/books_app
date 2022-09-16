import React, { useEffect, useState, useRef, useContext } from "react";
import "./navbar.scss";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from '../../FetchData';

function Navbar() {
  const { setSearchText } = useContext(AppContext)
  const searchRef = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchRef.current.focus(), [])

  const handleSubmit = (e) => { 
    e.preventDefault();
    if(!(searchRef.current.value.trim().length === 0)) {
      setSearchText(searchRef.current.value.trim());
    }
    navigate('/books')
  }

  return (
    <div className="navbar">
      <Link className="link" to="/">
        <h1 className="logo">Books</h1>
      </Link>
      <div className="navbarRightSide__wrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="searchBar"
            placeholder="Search"
            id="searchBar"
            ref={searchRef}
          />
        </form>
        <div className="hamburger_menu">M</div>
      </div>
    </div>
  );
}

export default Navbar;
