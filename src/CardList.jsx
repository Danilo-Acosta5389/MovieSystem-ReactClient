import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Card from './Card';
import * as URL from './ApiCalls';



const CardListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;


//Function will make API call to get all users names displayed
//The names will be stored in a clickable card
//The persons id will be added to URL, this will later enable us to use person_id as parameter in other functions
function CardList() {

    const [person, setPerson] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( URL.GET_ALL_PERSONS );

            console.log(result);
            setPerson(result.data);
        };

        fetchData();
    }, []);

    return(
        <CardListContainer>
            {person.map(p => (
            <Link to={`/person/${p.id}`} key={p.id}>
                <Card name={p.name}/>
            </Link> ))}
        </CardListContainer>
    );
}

export default CardList;