import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import * as URL from './ApiCalls';
import AddLikedGenre from './AddLikedGenreForm';



function LikedGenre() {
  const [likedGenre, setLikedGenre] = useState([]);
  const [genres, setGenre] = useState([]);

  
  //Object destructuring:
  let { person_id } = useParams();
  
  //API call to get likedGenre by personId
  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GetLikedGenreByperson_id(person_id) );
            console.log(result);
            setLikedGenre(result.data);
        };

        fetchData();
    }, []);

//API call to get all genres in system, id, names, etc.
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_GENRES );
            console.log(result);
            setGenre(result.data);
        };

        fetchData();
    }, []);


    //Making a "LINQ"-like script
    let results = []; //Storing result in results array
    for (let i = 0; i < likedGenre.length; i++) {

      //Looping through all Liked Genres by personId

      for (let j = 0; j < genres.length; j++) {

        //Looping through all genres

        //If genreId in LikedGenre is same as id in Genre
        //Then push data into a new array like below
        //Later use that array instead
        if (likedGenre[i].genreId === genres[j].id) {

          results.push({
            genre_id: likedGenre[i].genreId,
            genre_name: genres[j].name,
            genre_descr: genres[j].description
          });
        }
      }
    }
    

  // Using the results array to display name of liked genres
  return (
    <>
    <h1>Liked Genres</h1>
    <AddLikedGenre />
    { results.map(LiGen =>  <h4>{LiGen.genre_name}</h4>) } 
    </>
  );
}

export default LikedGenre;