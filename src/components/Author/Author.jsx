import React, { useState, useEffect } from 'react'
import './author.scss'
import { useParams } from "react-router-dom"

function Authors() {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getAuthor() {
        try {
            const resAuthor = await fetch(`https://openlibrary.org/authors/${id}.json`)
            const dataAuthor = await resAuthor.json();
            console.log(dataAuthor)
            
            if(dataAuthor) {
                const { name, bio, birth_date } = dataAuthor;

                const newAuthor = {
                    name: name,
                    bio: bio ? bio.value : "No biography available.",
                    birth_date: birth_date,
                    photo: `https://covers.openlibrary.org/a/olid/${id}-L.jpg`
                }

                setAuthor(newAuthor)
            } else {
                setAuthor(null)
            }
            setLoading(false)
        }catch(error) {
            console.log(error)
            setLoading(false)
        }
    }
    getAuthor();
  }, [id])
  
  return (
    <div className="author__wrapper">
      <img id="authorsPic" src={author?.photo} alt="Author's picture" />
      <div className="AuthorsInformations">
        <h1 className="AuthorsName">{author?.name}</h1>
        <span className="BirthDeathAuthor">{author?.birth_date} - </span>
        <p className="AuthorBio">{author?.bio}</p>
      </div>
    </div>
  )
}

export default Authors