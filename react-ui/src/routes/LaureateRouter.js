/**
 * LAUREATE REACT ROUTER
 * Include Laureate Navigation
 * Route to targeted page's component
 */

import React, {useEffect, useState} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {ApplicantForm} from "../pages/laureate/ApplicantForm";
import MeetingsList from "../pages/laureate/MeetingsList";
import {Home} from "../pages/laureate/Home";
import Matches from "../pages/laureate/Matches";
import NotFound from "../pages/NotFound";

import {LaureateNav} from "../navigation/LaureateNav";

export default function LaureateRouter({ phase, account }) {

    return (
        <BrowserRouter>
            <LaureateNav phase={phase} />

            <Switch>
                <Route exact path='/'>
                    <Home phase={phase} account={account} />
                </Route>
                {phase.phaseId === 2 ? (
                    <Route path='/form'>
                        <ApplicantForm account={account} />
                    </Route>
                ) : null}
                {phase.phaseId === 5 ? (
                    <Route path='/meetings'>
                        <MeetingsList account={account} />
                    </Route>
                ) : null}
                {phase.phaseId === 7 ? (
                    <Route path='/match'>
                        <Matches account={account} />
                    </Route>
                ) : null}
                <Route exact path='/*'>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
