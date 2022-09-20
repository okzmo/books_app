import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Book.scss'
import bookIllu from '../../images/bookIllu.png'

function BookDetails() {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState(null);
    const [readMore, setReadMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function getBook() {
            try {
                const res = await fetch(`https://openlibrary.org/works/${id}.json`)
                const data = await res.json();

                if(data) {
                    const {description, title, covers, subjects, subject_places, subject_times} = data;
                    
                    const newBook = {
                        description: description === undefined || description.value === undefined ? 'No description found.' : description ? description.value : 'No description found.' ,
                        title: title,
                        cover_img: `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`,
                        subjects: subjects ? subjects.join(', ') : 'No subjects found.',
                        subject_places: subject_places ? subject_places.join(', ') : 'No subject places found.',
                        subject_times: subject_times? subject_times.join(', ') : 'No subject times found.',
                    }

                    setBook(newBook)
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
                <img src={book?.cover_img} alt="cover" id="backCoverImg"/>
                <img src={book?.cover_img} alt="cover" id="frontCoverImg" />
            </div>
        </div>
        <div className="bookDetailsElements">
            <h2 className="bookTitle">{book?.title}</h2>
            <p className="bookDescription">{book?.description.length > 500 ? <span className="bookLongDescription">{readMore ? book?.description : book?.description.split(' ').slice(0,50).join(' ')} <button id="readMoreBtn" onClick={handleReadMore}>Read More...</button></span> : book?.description}</p>
            <div className="subjectBox">
                <p className="bookPlaces"><span className="importantInfo">Places</span> : {book?.subject_places}</p>
                <p className="bookTime"><span className="importantInfo">Time</span> : {book?.subject_times}</p>
            </div>
            <img id="readingPerson" src={bookIllu} alt="" />
        </div>
    </div>
  )
}

export default BookDetails
