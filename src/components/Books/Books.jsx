import React, { useContext } from 'react'
import './books.scss'
import { AppContext } from '../../FetchData'

function Default({}) {
  return (<><h1 className="titlePageCategory">BOOKS</h1>
    <p className="explication">Please, enter the name of the book or work you’re searching</p>
    <input type="search" name="searchBar" id="searchBarCategory" placeholder="Search" /></>);
}

function Books() {
  const { books, loading } = useContext(AppContext)
  let anyBooks = books.length > 0;
  const allBooks = books.map(book => {
    return {
      ...book,
      id: (book.id).replace('/works/', ""),
      cover_img: book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : 'noimg'
    }
  })

  if(loading) return 'loading...'

  return (
    <div className="category__wrapper">
        {anyBooks ? <div>books</div> : <Default />}
    </div>
  )
}

export default Books