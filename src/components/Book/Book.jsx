import React from 'react'
import './Book.scss'

function BookList(book) {
  return (
    <div className="singleBook__container">
      <div className="singleBook__img">
        <img id="bookCover" src={book.cover_img} alt="cover" />
      </div>
      <div className="singleBook__title">
        {book.title}
      </div>
      </div>
  )
}

export default BookList