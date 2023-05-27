import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import * as URL from './ApiCalls';


function LikedGenre() {
  const [data, setData] = useState([]);
  const [genres, setGenre] = useState([]);

  
  //Object destructuring:
  let { personId } = useParams();
  
  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GetLikedGenreByPersonId(personId) );
            console.log(result);
            setData(result.data);
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_GENRES );
            console.log(result);
            setGenre(result.data);
        };

        fetchData();
    }, []);


    //Making a "LINQ"-alike script
    //console.log("LINKING TABLES HERE");
    let results = []; //Storing result in results arr
    for (let i = 0; i < data.length; i++) {

      for (let j = 0; j < genres.length; j++) {

        //console.log(genres[j].id + " " + genres[j].name);

        if (data[i].genreId === genres[j].id) {

          //console.log(data[i].genreId +" is "+ genres[j].name + " on personId " + personId);
          results.push({
            genre_id: data[i].genreId,
            genre_name: genres[j].name,
            genre_descr: genres[j].description
          });
        }
      }
    }

    //results.forEach(e => console.log(e.genre_id, e.genre_name, e.genre_descr)); //print to console
    

  // Using the results arr to display name of liked genres
  return (
    <>
    <h1>Liked Genres</h1>
    { results.map(LiGen =>  <h4>{LiGen.genre_name}</h4>) } 
    </>
  );
}

export default LikedGenre;



// Maybe future function
// function Genre() {
//   const [genres, setData] = useState([]);

//   const GET_ALL_GENRES = "https://localhost:7147/api/Genre";

  
//   useEffect(() => {
//         const fetchData = async () => {
//             const result = await axios( GET_ALL_GENRES );
//             console.log(result);
//             setData(result.data);
//         };

//         fetchData();
//     }, []);
  
//   return (
//     <>
//     {genres.map(genre => (<h4>{genre.name}</h4>))}
//     </>
//   );
// }