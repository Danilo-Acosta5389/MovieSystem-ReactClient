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

//const GET_ALL_MOVIES_BY_PERSON_ID = `https://localhost:7147/api/PersonMovie/PersonId?personId=${personId}`;
//const GET_ALL_MOVIES_BY_ID = `https://localhost:7147/api/movie/${movieId}`;




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


    //Making a "LINQ"-alike algoritm, will maybe turn into function
    console.log("HERE");
    let results = [];
    for (let i = 0; i < data.length; i++) {
      let found = false;
      console.log(data[i].genreId + " "+ data[i].personId);

      for (let j = 0; j < genres.length; j++) {
        console.log(genres[j].id + " " + genres[j].name);
      }
    }


  
  return (
    <>
    <h1>Liked Genres</h1>
    { data.map(LiGen =>  <h4>{LiGen.genreId}</h4>) }
    {genres.map(genre => (<h4>{genre.name}</h4>))}
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
