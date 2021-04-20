import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import AccountInfos from "../../components/AccountInfos";

export function Home() {
    const [ user, setUser ] = useState({});
    const [ phase, setPhase ] = useState({});
    const [ btn, setBtn ] = useState();

    useEffect(() => {
        const savedToken = sessionStorage.getItem('accessToken');

        axios.get('//etn-test.herokuapp.com/api/accounts/'.concat(savedToken))
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));

        axios.get('//etn-test.herokuapp.com/api/forms/latest')
            .then((res) => {
                axios.get('//etn-test.herokuapp.com/api/phases/'+ res.data.fkPhaseId)
                    .then((res) => {
                        setPhase(res.data);

                        // Check if godfather should interact at this phase
                        if ([3, 5, 7].includes(res.data.phaseId)) {
                            setBtn(<a className="btn btn-primary btn-lg" href={`/godfather${res.data.buttonLink}`} role="button">{res.data.buttonText}</a>);
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <Container className='py-4'>
            <div className="jumbotron">
                <h1 className="display-4">Bienvenue {user.firstname} !</h1>
                {phase.phaseId !== undefined ? (
                    <>
                        <p className="lead">{ phase.lead }</p>
                        <hr className="my-4"/>
                        { btn }
                    </>
                ) : null}
            </div>

            <div className="py-4">
                <h2>Tableau de bord</h2>

                <AccountInfos user={user} />
            </div>
        </Container>
    )
}
