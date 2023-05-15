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




function Person() {
  const [data, setData] = useState(false);
  //Object destructuring:
  let { personId } = useParams();

  const GET_PERSON_BY_ID = `https://localhost:7147/api/Person/${personId}`;
  

  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( GET_PERSON_BY_ID );
            console.log(result);
            setData(result.data);
        };

        fetchData();
    }, []);
  
  return data ? <h1>{data.name}</h1> : <h3>Loading ...</h3>;
}


function Persons () {

  let match = useRouteMatch();
  //console.log(match);

  return (
    <>
    <Link to="/">Home</Link>
    <h1>Personal page</h1>
    <Switch>
      <Route path={`${match.path}/:personId`}>
        <Person />
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
      <Persons />
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
