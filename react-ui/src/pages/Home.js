import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';

const axios = require('axios');

export function Home() {

    return (
        <Container className='title py-4'>
            <div className="text-center py-4">
                <p>Vous êtes connecté, {user.firstname + " " + user.lastname} !</p>
            </div>
        </Container>
    )
}
