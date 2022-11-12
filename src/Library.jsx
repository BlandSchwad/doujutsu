import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { CardGroup } from 'react-bootstrap'
import SeriesCard from './SeriesCard';


function Library({series}) {
   const {library_id} = useParams();
   const seriesFilter = function  (s) {
        return s.library_id === library_id
   
    }

    let renderSeries = series ? series.filter(seriesFilter) : undefined;
    let seriesCards = renderSeries ? renderSeries.map((series) => {
        return <SeriesCard key={series.id} series={series} />    }) : []
   
    return(
        
        <div id='LibraryView'>  
            <h5>
                Series:
            </h5>

            {seriesCards ? <CardGroup> {seriesCards} </CardGroup> : `Loading`}
        </div>

    )
    
}

export default Library