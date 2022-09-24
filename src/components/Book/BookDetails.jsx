import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Book.scss'
import bookIllu from '../../images/bookIllu.png'
import { Link } from 'react-router-dom'

function BookDetails() {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(null);
    const [readMore, setReadMore] = useState(false);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        setLoading(true);
        async function getBook() {
            try {
                const resBook = await fetch(`https://openlibrary.org/works/${id}.json`)
                const dataBook = await resBook.json();
                console.log(dataBook)
                const resAuthor = await fetch(`https://openlibrary.org/authors/${dataBook.authors[0].author.key.slice(9)}.json`)
                const dataAuthor = await resAuthor.json();
                console.log(dataAuthor)
                
                if(dataBook && dataAuthor) {
                    const {description, title, covers, subjects, subject_places, subject_times} = dataBook;
                    const { name } = dataAuthor;

                    const newBook = {
                        description: !description ? 'No description Found' : typeof description === 'string' ? description : description.value,
                        title: title,
                        cover_img: `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`,
                        subjects: subjects ? subjects.join(', ') : 'No subjects found.',
                        subject_places: subject_places ? subject_places.join(', ') : 'No subject places found.',
                        subject_times: subject_times? subject_times.join(', ') : 'No subject times found.',
                    }

                    const newAuthor = {
                        name: name,
                        id: dataBook.authors[0].author.key.slice(9),
                        photo: `https://covers.openlibrary.org/a/olid/${dataBook.authors[0].author.key.slice(9)}-M.jpg`
                    }

                    setBook(newBook)
                    setAuthor(newAuthor)
                } else {
                    setBook(null)
                }
                setLoading(false)
            }catch(error) {
                console.log(error)
                setLoading(false)
            }
        }
        getBook();
    }, [id])

    if(loading) return 'loading...'

    const handleReadMore = (e) => {
        if(readMore) {
            setReadMore(false)
            e.target.innerText = 'Read More...'
        } else {
            setReadMore(true)
            e.target.innerText = 'Collapse'
        }
    }
    
  return (
    <div className="bookDetails__container">
        <div className="bookDetailsVisuals">
            <div className="backCover">
                <img src={book?.cover_img} id="backCoverImg"/>
                <img src={book?.cover_img} alt="Book cover" id="frontCoverImg"/>
            </div>
        </div>
        <div className="bookDetailsElements">
            <h2 className="bookTitle">{book?.title}</h2>
            <p className="bookDescription">{book?.description.length > 500 ? <span className="bookLongDescription">{readMore ? book?.description : book?.description.split(' ').slice(0,50).join(' ')} <button id="readMoreBtn" onClick={handleReadMore}>Read More...</button></span> : book?.description}</p>
            <div className="subjectBox">
                <p className="bookPlaces"><span className="importantInfo">Places</span> : {book?.subject_places}</p>
                <p className="bookTime"><span className="importantInfo">Time</span> : {book?.subject_times}</p>
            </div>
            <div className="authors">
                <Link to={`/author/${author?.id}`} {...author}>
                    <div className="authorContainer">
                        <img id="authorPic" src={author?.photo} alt="Author's picture" />
                    </div>
                </Link>
                <h2 className="authorName">{author?.name}</h2>
            </div>
        </div>
    </div>
  )
}

export default BookDetails