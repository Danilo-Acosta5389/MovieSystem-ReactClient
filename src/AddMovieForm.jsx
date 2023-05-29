import React, {useState, useEffect} from 'react';
import axios from 'axios';

import * as URL from './ApiCalls';

function AddMovieForm() {

    const [_title, setTitle] = useState('');
    const [_year, setYear] = useState(0);
    const [_genreId, setGenre] = useState([]);
    let genre_id;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_GENRES );
            console.log(result);
            setGenre(result.data);
        };

        fetchData();
    }, []);




    function handleTitle(evt) {
        console.log(evt.target.value);
        setTitle(evt.target.value)
    }


    function handleYear(evt) {
        //console.log(evt.target.value);
        setYear(evt.target.value)
    }

    function handleGenre(evt) {
        //console.log(evt.target.value);
        //setDescr(evt.target.value)
        genre_id = evt.target.value;
    }


    function HandleSubmit(evt) {
        console.log(evt);

        evt.preventDefault();

        const newMovie = {
            title: _title ? _title : null,
            year: _year,
            genreId: genre_id
        };
        axios.post(URL.GET_ALL_MOVIES, newMovie).then((response) => {
            console.log(response.status, response.data);
        });
    }

    return(
        <>
        
        <form onSubmit={HandleSubmit}>
            <h4>Add movie to system</h4>
            Movie title: <input
                type="text"
                value={_title}
                onChange={handleTitle}
            />
            <br></br>
            Year: <input
                type="number"
                value={_year}
                onChange={handleYear}
            />
            <br></br>
            Genre: 
            <label>
            <select value={_genreId.id} onChange={handleGenre}>
                <option value>Select Genre</option>
                {/* <option disabled selected value></option> */}
                {_genreId.map(g => (<option value={g.id}>{g.name}</option>))}
            </select>
            </label>

            {/* TODO: Reset fields on submit */}

            <button type="submit">SEND</button>  
            {/* <button type="reset">RESET</button> */}
        </form>
        </>
    )
}

export default AddMovieForm;