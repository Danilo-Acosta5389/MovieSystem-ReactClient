import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import * as URL from './ApiCalls';
import * as help from './Helper';

function AddLikedGenre() {

    const [genre, setGenre] = useState([]);
    let { person_id } = useParams();
    console.log(person_id);
    let genre_Id;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_GENRES );
            console.log(result);
            setGenre(result.data);
        };

        fetchData();
    }, []);


    function handleGenreChange(evt) {
        //console.log(evt.target.value);
        genre_Id = evt.target.value;
        //setGenre(evt.target.value)
    }
    


    function HandleSubmit(evt) {
        //console.log(genre_Id);

        evt.preventDefault();

        const newLikedGenre = {
            genreId: genre_Id,
            personId: person_id
        };
        axios.post(URL.SET_LIKED_GENRE, newLikedGenre).then((response) => {
            console.log(response.status, response.data);
        });

        help.ReloadPage(); // Reloads page

    }

    return(
        <>
        <form onSubmit={HandleSubmit}>
            <b>Add a new liked genre</b>
            <br></br>
            <label>
            <select value={genre.id} onChange={handleGenreChange}>
                <option value>Select Genre</option>
                {/* <option disabled selected value></option> */}
                {genre.map(g => (<option value={g.id}>{g.name}</option>))}
            </select>
            
            </label>
            <button type="submit">Submit</button>
        </form>
        </>
    )

}

export default AddLikedGenre;