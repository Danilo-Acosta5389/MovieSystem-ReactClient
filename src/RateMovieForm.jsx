import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import * as URL from './ApiCalls';
import * as help from './Helper';

function RateMovieForm() {

    const [movie, setMovie] = useState([]);
    const rate = [1,2,3,4,5,6,7,8,9,10];
    
    let { person_id } = useParams();

    //Empty variables for storing results
    let movie_id;
    let _rate;
    let _link;

    //API call to get all movies in db, this will be used when listing and picking movie in dropdown bar
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_MOVIES );
            console.log(result);
            setMovie(result.data);
        };

        fetchData();
    }, []);



    //Event handlers for when input has occured

    function handleMovie(evt) {
        //console.log(evt.target.value);
        //setMovie(evt.target.value)
        movie_id = evt.target.value;
        //console.log(movie.id);
    }


    function handleRate(evt) {
        //console.log(evt.target.value);
        //setRate(evt.target.value)
        _rate = evt.target.value;
        //console.log(_rate);
    }

    function handleLink(evt) {
        //console.log(evt.target.value);
        //setLink(evt.target.value)
        _link = evt.target.value;
        console.log(_link);
    }

    //Event handler for when pressing Submit button
    function HandleSubmit(evt) {
        console.log(evt);

        evt.preventDefault();

        //Creating a JSON styled array and using it with API POST method
        const newMovieRating = {
            personId: person_id,
            movieId: movie_id,
            rating: _rate,
            link: _link
        };
        axios.post(URL.SET_PERSON_MOVIE, newMovieRating).then((response) => {
            console.log(response.status, response.data);
        });

        //This will reload the "page"
        help.ReloadPage(); // Reloads page
    }

    return(
        <>
        
        <form onSubmit={HandleSubmit}>
            <h4>Rate a movie in the system!</h4>
            Movie title: 
            <label>
            <select value={movie.id} onChange={handleMovie}>
                <option value>Select Movie</option>
                {/* <option disabled selected value></option> */}
                {movie.map(m => (<option value={m.id}>{m.title}</option>))}
            </select>
            </label>

            <br></br>
            My Rating:
            <label>
            <select onChange={handleRate}>
                <option value>Score</option>
                {/* <option disabled selected value></option> */}
                {rate.map(r => (<option>{r}</option>))}
            </select>
            </label>/10
            <br></br>
            Link to this movie: 
            <input
                type="url"
                value={_link}
                onChange={handleLink}
            />

            {/* TODO: Reset fields on submit */}
            
            <button type="submit">Submit</button>  
            {/* <button type="reset">RESET</button> */}
        </form>
        </>
    )
}

export default RateMovieForm;