import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';

import Card from './Card';
import {API_KEY} from './hush';


const CardListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const GET_ALL_PERSON = "https://localhost:7147/api/Person";






function CardList(props) {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios( GET_ALL_PERSON );

            console.log(result);
            setData(result.data);
        };

        fetchData();
    }, []);

    return(
        <CardListContainer>
            {data.map(person => (
            <Link to={`/person/${person.id}`} key={person.id}>
                <Card name={person.name}/>
            </Link> ))}
        </CardListContainer>
    );
}

export default CardList;



    //Test data
//     const person = [
//   {
//     "name": "Danilo",
//     "email": "daac@chas.com",
//     "age": 30
//   },
//   {
//     "name": "Pablo",
//     "email": "pwl@chas.com",
//     "age": 27
//   },
//   {
//     "name": "Mehmet",
//     "email": "memo@chas.com",
//     "age": 31
//   }
// ];


// [
//     {
//         "id": 1,
//         "name": "Danilo",
//         "e_Mail": "daaco92@chas.se"
//     },
//     {
//         "id": 2,
//         "name": "Pablo",
//         "e_Mail": "pablo.e@chas.se"
//     },
//     {
//         "id": 3,
//         "name": "Mehmet",
//         "e_Mail": "memo.b@chas.se"
//     },
//     {
//         "id": 4,
//         "name": "Dania",
//         "e_Mail": "danjaa@chas.se"
//     }
// ]