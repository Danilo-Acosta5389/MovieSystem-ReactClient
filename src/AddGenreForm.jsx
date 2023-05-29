import React, {useState, useEffect} from 'react';
import axios from 'axios';

import * as URL from './ApiCalls';


function AddGenreForm() {

    const [genre, setGenre] = useState('');
    const [descr, setDescr] = useState('');

    function handleGenreName(evt) {
        //console.log(evt.target.value);
        setGenre(evt.target.value)
    }


    function handleDescription(evt) {
        //console.log(evt.target.value);
        setDescr(evt.target.value)
    }


    function HandleSubmit(evt) {
        console.log(evt);
        console.log("You entered " + genre + " in genre field");
        console.log("You entered " + descr + " in description field");
        evt.preventDefault();

        const newGenre = {
            name: genre ? genre : null,
            description: descr
        };
        axios.post(URL.GET_ALL_GENRES, newGenre).then((response) => {
            console.log(response.status, response.data);
        });
    }

    return(
        <>
        
        <form onSubmit={HandleSubmit}>
            <h4>Add genre to system</h4>
            Genre name: <input
                type="text"
                value={genre}
                onChange={handleGenreName}
            />
            <br></br>
            Description: <input
                type="text"
                value={descr}
                onChange={handleDescription}
            />
            <br></br>

            {/* TODO: Reset fields on submit */}

            <button type="submit">SEND</button>  
            {/* <button type="reset">RESET</button> */}
        </form>
        </>
    )
}

export default AddGenreForm;
