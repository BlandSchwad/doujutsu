import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { getDropdownMenuPlacement } from 'react-bootstrap/esm/DropdownMenu';
import { propTypes } from 'react-bootstrap/esm/Image';
import SeriesCard from './SeriesCard';
import Bar from './Bar'

function Libraries(props) {
    

    return (
        <>

        <main>
            <h5>
                Series Listing:
            </h5>
            
            {props.data.series ?  <CardGroup> {props.data.series.map(series => { return <SeriesCard key={series.id} series={series}/>})} </CardGroup> : 'Loading Series'}             

        </main>
        </>
    )
}

export default Libraries;