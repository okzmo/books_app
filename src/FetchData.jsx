import React, {useState, useEffect} from 'react';
import { useCallback } from 'react';
const AppContext = React.createContext();

const BooksContext = ({children}) => {
    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const res = await fetch(`http://openlibrary.org/search.json?q=${searchText}`);
            const data = await res.json();
            const {docs} = data;

            if(docs){
                const allBooks = docs.slice(0, 20).map((book) => {
                    const {key, author_name, cover_i, edition_count, first_publish_year, title} = book;

                    return {
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title
                    }
                });

                setBooks(allBooks);
                console.log(docs)

            } else {
                setBooks([]);
            }
            setLoading(false);
        } catch(error){
            console.log(error);
            setLoading(false);
        }
    }, [searchText]);

    useEffect(() => {
        fetchBooks();
    }, [searchText, fetchBooks]);
    
    return (
        <AppContext.Provider value = {{
            loading, books, setSearchText
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, BooksContext};