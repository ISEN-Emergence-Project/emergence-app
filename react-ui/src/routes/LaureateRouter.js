import React, {useEffect, useState} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {ApplicantForm} from "../pages/laureate/ApplicantForm";
import Meetings from "../pages/laureate/Meetings";
import {Home} from "../pages/laureate/Home";
import Match from "../pages/laureate/Match";
import NotFound from "../pages/NotFound";

import {LaureateNav} from "../navigation/LaureateNav";

export default function LaureateRouter({ phase }) {

    return (
        <BrowserRouter>
            <LaureateNav phase={phase} />
            <Switch>
                <Route exact path='/laureate/'>
                    <Home phase={phase} />
                </Route>
                {phase.phaseId === 2 ? (
                    <Route path='/laureate/form' component={ApplicantForm}/>
                ) : null}
                {phase.phaseId === 5 ? (
                    <Route path='/laureate/meetings' component={Meetings}/>
                ) : null}
                {phase.phaseId === 7 ? (
                    <Route path='/laureate/match' component={Match}/>
                ) : null}
                <Route exact path='/laureate/*'>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
