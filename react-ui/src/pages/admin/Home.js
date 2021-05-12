/**
 * ADMIN HOME PAGE
 * Show a dashboard for the admin with actions
 */

import React, {useEffect, useState} from "react";
import {Container} from 'react-bootstrap';

import AccountInfos from "../../components/commons/AccountInfos";

export function Home({ phase, updatePhase, account }) {

    return (
        <Container className='py-4'>
            <div className="jumbotron">
                <h1 className="display-4">Bienvenue {account.firstname} !</h1>
                {phase.phaseId !== undefined ? (
                    <>
                        <p className="lead"><span className='badge badge-primary'>Phase {phase.phaseId}</span> { phase.lead.replace('[]', 'parrain/filleul') }</p>
                        <hr className="my-4"/>
                        <div className='d-flex justify-content-between'>
                            <a className="btn btn-primary btn-lg" href={`${phase.buttonLink}`} role="button">{phase.buttonText.replace('[]', 'parrain/filleul')}</a>

                            {phase.phaseId === 7 ? (
                                <button className='btn btn-secondary' onClick={() => updatePhase(1)}>Réinitialiser &rsaquo; 1</button>
                            ) : (
                                <button className='btn btn-secondary' onClick={() => updatePhase(phase.phaseId + 1)}>Phase suivante &rsaquo; {phase.phaseId + 1}</button>
                            )}
                        </div>
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
