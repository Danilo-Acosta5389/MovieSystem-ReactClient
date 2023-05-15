import React from 'react';
import styled from 'styled-components';

import Card from './Card';
import hush, {API_KEY} from './hush';


const CardListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

    //Test data
    const person = [
  {
    "name": "Danilo",
    "email": "daac@chas.com",
    "age": 30
  },
  {
    "name": "Pablo",
    "email": "pwl@chas.com",
    "age": 27
  },
  {
    "name": "Mehmet",
    "email": "memo@chas.com",
    "age": 31
  }
];



function CardList() {

    return(
        <CardListContainer>
            {person.map(person => (
                <Card name={person.name} age={person.age} email={person.email}/>
            ))}
        </CardListContainer>
    );
}

export default CardList;
