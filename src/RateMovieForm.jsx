import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import * as URL from './ApiCalls';

function RateMovieForm() {

    const [movie, setMovie] = useState([]);
    const [rate, setRate] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [_link, setLink] = useState("");
    let { person_id } = useParams();

    let movie_id;
    let _rate;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_MOVIES );
            console.log(result);
            setMovie(result.data);
        };

        fetchData();
    }, []);




    function handleMovie(evt) {
        //console.log(evt.target.value);
        //setMovie(evt.target.value)
        movie_id = evt.target.value;
        console.log(movie_id);
    }


    function handleRate(evt) {
        //console.log(evt.target.value);
        //setRate(evt.target.value)
        _rate = evt.target.value;
        console.log(_rate);
    }

    function handleLink(evt) {
        //console.log(evt.target.value);
        setLink(evt.target.value)
        console.log(_link);
    }


    function HandleSubmit(evt) {
        console.log(evt);

        evt.preventDefault();

        const newMovieRating = {
            personId: person_id,
            movieId: movie_id,
            rating: _rate,
            link: _link.toString
        };
        axios.post(URL.SET_PERSON_MOVIE2, newMovieRating).then((response) => {
            console.log(response.status, response.data);
        });
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
            Link: 
            <input
                type="text"
                value={_link}
                onChange={handleLink}
            />

            {/* TODO: Reset fields on submit */}
            
            <button type="submit">SEND</button>  
            {/* <button type="reset">RESET</button> */}
        </form>
        </>
    )
}

export default RateMovieForm;