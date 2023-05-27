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
import PersonalPage from './PersonalPage';


const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  /* background: red; */
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
`;  




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
