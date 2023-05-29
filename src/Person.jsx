import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import * as URL from './ApiCalls';


function Person() {
  const [data, setData] = useState(false);
  //Object destructuring:
  let { person_id } = useParams();
  

  useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GetPersonById(person_id) );
            //console.log(result);

            setData(result.data);
        };

        fetchData();
    }, []);
  
   return data ? <h1>{data.name}</h1> : <h3>Loading ...</h3>;
}


export default Person;