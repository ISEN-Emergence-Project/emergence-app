/**
 * APPLICANT HOME PAGE
 * Dashboard for the applicant
 */

import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';
import AccountInfos from "../../components/commons/AccountInfos";

export function Home({ phase, account }) {

    return (
        <Container className='py-4'>
            <div className="jumbotron">
                <h1 className="display-4">Bienvenue {account.firstname} !</h1>
                {phase.phaseId !== undefined ? (
                    <>
                        <p className="lead">{ phase.lead.replace('[]', 'parrain') }</p>
                        <hr className="my-4"/>
                        {[2, 5, 7].includes(phase.phaseId) ? (
                            <a className="btn btn-primary btn-lg" href={`${phase.buttonLink}`} role="button">{phase.buttonText.replace('[]', 'parrain')}</a>
                        ) : null}
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
