import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';
import axios from 'axios';

export function Home() {
    const [ user, setUser ] = useState({});

    useEffect(() => {
        const savedToken = sessionStorage.getItem('accessToken');

        axios.get('//etn-test.herokuapp.com/api/accounts/'.concat(savedToken))
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <Container className='title py-4'>
            <div className="text-center py-4">
                <h1>Bienvenue {user.firstname + " " + user.lastname} !</h1>
            </div>
        </Container>
    )
}
