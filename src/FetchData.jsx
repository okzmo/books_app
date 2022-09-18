import React, {useState, useEffect} from 'react';
import { useCallback } from 'react';
const AppContext = React.createContext();

const BooksContext = ({children}) => {
    const [searchText, setSearchText] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    let offset = 0;

    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const res = await fetch(`http://openlibrary.org/search.json?limit=15&offset=${offset}&q=${searchText}`);
            const data = await res.json();
            const {docs} = data;

            if(docs){
                const allBooks = docs.map((book) => {
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

                allBooks.forEach((book, index) => {
                    if(book.cover_id === undefined) {
                        allBooks.splice(index, 1)
                    }
                })
                
                console.log(docs)
                setBooks((oldAllBooks) => [...oldAllBooks, ...allBooks]);
            } else {
                setBooks([]);
            }
            offset += 15;
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
            loading, books, setSearchText, searchText, fetchBooks
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, BooksContext};