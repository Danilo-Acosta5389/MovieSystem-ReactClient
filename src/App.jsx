import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import CardList from './CardList';



const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  /* background: red; */
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
`;  

function LikedGenre() {
  const [data, setData] = useState([]);
  const [genres, setGenre] = useState([]);

  
  //Object destructuring:
  let { personId } = useParams();

  const GET_LIKED_GENRES_BY_PERSON_ID = `https://localhost:7147/api/LikedGenre/personId?personId=${personId}`;
  const GET_ALL_GENRES = "https://localhost:7147/api/Genre";
  
  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( GET_LIKED_GENRES_BY_PERSON_ID );
            console.log(result);
            setData(result.data);
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( GET_ALL_GENRES );
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



function RatedMovies() {

  const [personMovie, setPersonMovie] = useState([]);
  const [movies, setAllMovie] = useState([]);

  let { personId } = useParams();

  const GET_ALL_MOVIES_BY_PERSON_ID = `https://localhost:7147/api/PersonMovie/PersonId?personId=${personId}`;
  const GET_ALL_MOVIES = "https://localhost:7147/api/movie/";

  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( GET_ALL_MOVIES_BY_PERSON_ID );
            console.log(result);
            setPersonMovie(result.data);
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( GET_ALL_MOVIES );
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



function Person() {
  const [data, setData] = useState(false);
  //Object destructuring:
  let { personId } = useParams();

  const GET_PERSON_BY_ID = `https://localhost:7147/api/Person/${personId}`;
  

  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( GET_PERSON_BY_ID );
            //console.log(result);

            //console.log(result);
            setData(result.data);
        };

        fetchData();
    }, []);
  
   return data ? <h1>{data.name}</h1> : <h3>Loading ...</h3>;
}


function PersonalPage () {

  let match = useRouteMatch();
  //console.log(match);

  return (
    <>
    <Link to="/">Home</Link>
    <h1>Personal page</h1>
    <Switch>
      <Route path={`${match.path}/:personId`}>
        <Person />
        <LikedGenre />
        <RatedMovies />
        {/* <Genre /> */}
      </Route>
      <Route path={`${match.path}`}>
        <h3>Go back and click a person card please.</h3>
      </Route>
    </Switch>
    </>
  );
}



function App() {

  return (
    <Router>
    <MainContainer>
      <h1>MovieSystem-API React Client</h1>
      <Switch>
    <Route path="/person">
      <PersonalPage />
    </Route>
    <Route path="/">
      <CardList />
    </Route>
    </Switch>
    </MainContainer>
    </Router>
  )
}

export default App
