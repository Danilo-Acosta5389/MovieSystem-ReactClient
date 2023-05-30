import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";   

import CardList from './CardList';
import PersonalPage from './PersonalPage';
import AddGenreForm from './AddGenreForm';
import AddMovieForm from './AddMovieForm';
import AddPersonForm from './AddPersonForm';

//Creating and styling a container
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  /* background: red; */
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
`;  



//Using React Router to redirect "pages" depending on URL
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
      <AddGenreForm />
      <AddMovieForm />
      <AddPersonForm />
    </Route>
    </Switch>
    </MainContainer>
    </Router>
  )
}

export default App
