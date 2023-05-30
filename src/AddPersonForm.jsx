import React, {useState} from 'react';
import axios from 'axios';

import * as URL from './ApiCalls';
import * as help from './Helper';


function AddPersonForm() {

    const [person, setPerson] = useState('');
    const [email, setEmail] = useState('');

    function handlePersonName(evt) {
        //console.log(evt.target.value);
        setPerson(evt.target.value)
    }


    function handleEmail(evt) {
        //console.log(evt.target.value);
        setEmail(evt.target.value)
    }


    function HandleSubmit(evt) {
        console.log(evt);
        console.log("You entered " + person + " in Person field");
        console.log("You entered " + email + " in Email field");
        evt.preventDefault();

        const newPerson = {
            name: person ? person : null,
            e_mail: email ? email : null
        };
        axios.post(URL.GET_ALL_PERSONS, newPerson).then((response) => {
            console.log(response.status, response.data);
        });

        help.ReloadPage(); // Reloads page

    }

    return(
        <>
        
        <form onSubmit={HandleSubmit}>
            <h4>Add new person to system</h4>
            Person name: <input
                type="text"
                value={person}
                onChange={handlePersonName}
            />
            <br></br>
            Email: <input
                type="text"
                value={email}
                onChange={handleEmail}
            />
            <br></br>

            {/* TODO: Reset fields on submit */}

            <button type="submit">Submit</button>  
            {/* <button type="reset">RESET</button> */}
        </form>
        </>
    )
}

export default AddPersonForm;
