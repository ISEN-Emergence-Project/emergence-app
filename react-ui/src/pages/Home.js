import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';

const axios = require('axios');

export function Home() {
    const [ user, setUser ] = useState({});

    useEffect(() => {
        const savedToken = sessionStorage.getItem('accessToken');
        console.log(savedToken)

        axios.get('//etn-test.herokuapp.com/api/accounts/'.concat(savedToken))
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => console.log(err));
    })

    return (
        <Container className='title py-4'>
            <div className="text-center py-4">
                <p>Vous êtes connecté, {user.firstname + " " + user.lastname} !</p>
            </div>
        </Container>
    )
}
