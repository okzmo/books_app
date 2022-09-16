import React from 'react'
import './authors.scss'

function Authors() {
  return (
    <div className="category__wrapper">
        <h1 className="titlePageCategory">AUTHORS</h1>
        <p className="explication">Please, enter the name of the author you’re searching for</p>
        <input type="search" name="searchBar" id="searchBarCategory" placeholder="Search" />
    </div>
  )
}

export default Authors