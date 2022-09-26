import React, { useState, useEffect } from "react";
import "./author.scss";
import { useParams, Link } from "react-router-dom";

function Authors() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getAuthor() {
      try {
        const resAuthor = await fetch(
          `https://openlibrary.org/authors/${id}.json`
        );
        const dataAuthor = await resAuthor.json();
        console.log(dataAuthor);

        if (dataAuthor) {
          const { name, bio, birth_date, death_date, wikipedia } = dataAuthor;

          const newAuthor = {
            name: name,
            bio: !bio
              ? "No bio available"
              : typeof bio === "string"
              ? bio
              : bio.value,
            birth_date: birth_date,
            death_date: death_date ? death_date : "",
            photo: `https://covers.openlibrary.org/a/olid/${id}-L.jpg`,
            wikipedia: wikipedia,
          };

          setAuthor(newAuthor);
        } else {
          setAuthor(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getAuthor();
  }, [id]);

  return (
    <div className="author__wrapper">
      {author?.wikipedia ? (
        <a href={author?.wikipedia} target="_blank">
          <img id="authorsPic" src={author?.photo} alt="Author's picture" />
        </a>
      ) : (
        <img id="authorsPic" src={author?.photo} alt="Author's picture" />
      )}
      <div className="AuthorsInformations">
        <h1 className="AuthorsName">{author?.name}</h1>
        <span className="BirthDeathAuthor">
          {author?.birth_date} - {author?.death_date}{" "}
        </span>
        <p className="AuthorBio">{author?.bio}</p>
      </div>
    </div>
  );
}

export default Authors;
