import React, { useContext } from 'react'
import './books.scss'
import { AppContext } from '../../FetchData'
import Book from '../Book/Book'
import covernotfound from '../../images/cover_not_found.jpg'

function Default({}) {
  return (<><h1 className="titlePageCategory">BOOKS</h1>
    <p className="explication">Please, enter the name of the book or work you’re searching</p>
    <input type="search" name="searchBar" id="searchBarCategory" placeholder="Search" /></>);
}

function Books() {
  const { books, loading, searchText, fetchBooks} = useContext(AppContext)
  let anyBooks = books.length > 0;

  const handleClick = (e) => {
    e.preventDefault();
    fetchBooks();

  }

  const allBooks = books.map(book => {
    return {
      ...book,
      id: (book.id).replace('/works/', ""),
      cover_img: `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`,
    }
  })

  if(loading && !anyBooks) return 'loading...'

  return (
    <div className="category__wrapper">
        {anyBooks ? <div className="booklist_grid">
          <div className="titleCategory">BOOK</div>
          {allBooks.map((book,index) => {
            return(
              <>
                <Book key={index} {...book} />
              </>
            )
          })}
        </div>: <Default />}
        {(loading && anyBooks) && <div>LOADING MORE BOOKS</div>}
        <button className="loadMore" onClick={handleClick}>LoadMore</button>
    </div>
  )
}

export default Books