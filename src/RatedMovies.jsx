import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


import * as URL from './ApiCalls';
import RateMovieForm from './RateMovieForm';



function RatedMovies() {

  const [personMovie, setPersonMovie] = useState([]);
  const [movies, setMovies] = useState([]);

  let { person_id } = useParams();

  //API call to get PersonMovie data, movies rated by the current user
  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GetAllMoviesByperson_id(person_id) );
            console.log(result);
            setPersonMovie(result.data);
        };

        fetchData();
    }, []);

//API call to get all movie data
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_MOVIES );
            console.log(result);
            setMovies(result.data);
        };

        fetchData();
    }, []);

    //Array for storing result after linking together the correct data
    let results = [];
    for(let i = 0; i < personMovie.length; i++) {

      //Looping through personMovie by current user id.

      for(let j = 0; j < movies.length; j++) {

        //Looping through all movies in database
        //If movieId in personMovie is same as id in movie
        //Store data in result array and use it later on
        if(personMovie[i].movieId === movies[j].id) {

          results.push({
            movie_title: movies[j].title,
            year: movies[j].year,
            rating: personMovie[i].rating,
            link: personMovie[i].link
          });
        }

      }
    }
  
  return(
    <>
    <h1>Rated Movies</h1>
    <RateMovieForm />
    { results.map(movie => ( 
    <> 
    <h4>{movie.movie_title}</h4>
    <p>Year: {movie.year}</p>
    <p>My rating: {movie.rating}/10</p> 
    <a href={movie.link} target="_blank">Link to this movie here</a> 
    </>)) } 
    </>
  );
}

export default RatedMovies;