import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


import LikedGenre from './LikedGenre';
import RatedMovies from './RatedMovies';
import Person from './Person';


//The PersonalPage component contains users private info
function PersonalPage() {

  let match = useRouteMatch();
  //console.log(match);

  return (
    <>
    <Link to="/">Home</Link>
    <h1>Personal page</h1>
    <Switch>
      <Route path={`${match.path}/:person_id`}>
        <Person />
        <LikedGenre />
        <RatedMovies />
      </Route>
      <Route path={`${match.path}`}>
        <h3>Go back and click a person card please.</h3>
      </Route>
    </Switch>
    </>
  );
}


export default PersonalPage;