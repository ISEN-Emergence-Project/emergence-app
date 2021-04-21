import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';

import AccountInfos from "../../components/AccountInfos";

export function Home({ phase, account }) {
    const [ btn, setBtn ] = useState();

    useEffect(() => {
        // Check if godfather should interact at this phase
        if ([3, 5, 7].includes(phase.phaseId)) {
            setBtn(<a className="btn btn-primary btn-lg" href={`${phase.buttonLink}`} role="button">{phase.buttonText.replace('[]', 'filleul')}</a>);
        }
    }, [phase])

    return (
        <Container className='py-4'>
            <div className="jumbotron">
                <h1 className="display-4">Bienvenue {account.firstname} !</h1>
                {phase.phaseId !== undefined ? (
                    <>
                        <p className="lead">{ phase.lead.replace('[]', 'filleul') }</p>
                        <hr className="my-4"/>
                        { btn }
                    </>
                ) : null}
            </div>

            <div className="py-4">
                <h2>Tableau de bord</h2>

                <AccountInfos account={account} />
            </div>
        </Container>
    )
}
