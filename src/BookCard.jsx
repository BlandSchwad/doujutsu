import Card from 'react-bootstrap/Card';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

function BookCard ({Book}) {
    return(
        <div>
        <div  className='BookCard'>
            <Card>
            <Card.Header className='BookCardHeader'>
            <Card.Img variant='top' src={`http://localhost:45001/page/${Book.id}?page=0`}/>
            </Card.Header>
            <Card.Body>
            <LinkContainer to={`/book/${Book.id}`} >
                <Card.Link class='BookCardTitle'>
                    {Book.name}
                </Card.Link>
            </LinkContainer>
                <Card.Subtitle>
                    {Book.page_count} Pages
                </Card.Subtitle>
                </Card.Body>
            </Card>
        </div>
        </div>
    )

}

export default BookCard;