import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


import * as URL from './ApiCalls';



function RatedMovies() {

  const [personMovie, setPersonMovie] = useState([]);
  const [movies, setAllMovie] = useState([]);

  let { personId } = useParams();

  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GetAllMoviesByPersonId(personId) );
            console.log(result);
            setPersonMovie(result.data);
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_MOVIES );
            console.log(result);
            setAllMovie(result.data);
        };

        fetchData();
    }, []);

    let results = [];
    for(let i = 0; i < personMovie.length; i++) {

      //console.log(personMovie[i]);

      for(let j = 0; j < movies.length; j++) {
        //console.log(movies[j].id + " is " + movies[j].name);
        if(personMovie[i].movieId === movies[j].id) {
          console.log(personMovie[i].movieId + " is " + movies[j].title)

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
    { results.map(movie => ( 
    <> 
    <h4>{movie.movie_title}</h4>
    <p>Year: {movie.year}</p>
    <p>My rating: {movie.rating}/10</p> 
    <a href={movie.link}>Link to this movie here</a> 
    </>)) } 
    </>
  );
}

export default RatedMovies;