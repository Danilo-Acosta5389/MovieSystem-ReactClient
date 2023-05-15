import React from 'react';
import styled from 'styled-components';


const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    max-height: fit-content;
    width: fit-content;
    background: red;
    margin-bottom: 1em;
    border: 2px solid black;
    padding: 5px;
    margin: 10px;
`;


// Take prop as argument 
function Card(props) {

    //console.log(props);

    return(
        <CardContainer>
            <h1>{props.name}</h1>
            {/* <p>{props.e_mail}</p> */}
        </CardContainer>
    );
}

export default Card;
