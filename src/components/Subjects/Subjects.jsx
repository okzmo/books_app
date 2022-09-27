import React from "react";
import "./subjects.scss";

function Subjects() {
  return (
    <div className="category__wrapper">
      <h1 className="titlePageCategory">SUBJECTS</h1>
      <p className="explication">
        Please, enter the subject you’re interested in
      </p>
      <input
        type="search"
        name="searchBar"
        id="searchBarCategory"
        placeholder="Search"
      />
    </div>
  );
}

export default Subjects;
