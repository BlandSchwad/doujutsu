import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap'


function Book () {
    const { book_id } = useParams();
    const [bookData, setBookData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:45001/book/${book_id}`)
        .then(response => {
            setBookData(response.data)
        })
    }, [book_id])
    
    return(
        <div id='bookView'>
            <img id='bookThumb' src={`http://localhost:45001/page/${bookData.id}?page=0`} alt='The series thumbnail' />
            {bookData.file_path ? 
            <div id='bookInfo'>
                <p>{`${bookData.series_name} in ${bookData.library_name}`}</p>
                <p>{`${bookData.name}`}</p>
                <Button href={`/read/${book_id}`}>Read</Button>
                
                <p>{`${bookData.page_count} pages`}</p>
                <p>Size: {`${((bookData.file_size * 10e-7).toPrecision(4))} MB`}</p>
                <p>Category: {`${bookData.file_path.slice(-3)}`}</p>
                <p>File: {`${bookData.file_path}`}</p>
            </div>
            : 'LOADING'}
           
        </div>
    )
}

export default Book;