import React, { useEffect, useRef, useContext } from "react";
import "./hero.scss";
import lamp from '../../images/Lamp.png'
import illustration from '../../images/Illustration.png'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../FetchData';

function Hero() {

  const { setSearchText } = useContext(AppContext)
  const searchRef = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchRef.current.focus(), [])

  const handleSubmit = (e) => { 
    e.preventDefault();
    if(!(searchRef.current.value.trim().length === 0)) {
      setSearchText(searchRef.current.value.trim());
      navigate('/books')
    }
  }

  return (
    <div className="hero">
      <h1 className="greeting">
        <span className="firstWord">LET'S </span>
        <span className="secondWord">FIND </span>
        <span className="liaison">A </span> 
        <span className="fourthWord">BOOK</span>
      </h1>
      <img src={lamp} alt="" id="LampPos" />
      <img src={illustration} alt="" id="Illustration" />
      <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="searchBarHero"
            placeholder="Search"
            id="searchBarHero"
            ref={searchRef}
          />
        </form>
    </div>
  );
}

export default Hero;
