import React from "react";
import {Container} from 'react-bootstrap';

export function Home() {
    return (
        <Container className='title py-4'>
            <h1>Welcome to Emergence App</h1>
            <div className="text-center py-4">
                <a href="/Login" className="btn btn-primary">Login</a>
            </div>
        </Container>
    )
}
