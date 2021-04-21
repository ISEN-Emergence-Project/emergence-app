import React, {useEffect, useState} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {Preselection} from "../pages/godfather/Preselection";
import {Home} from "../pages/godfather/Home";
import MeetingList from "../pages/godfather/MeetingList";
import Match from "../pages/laureate/Match";
import NotFound from "../pages/NotFound";

import {GodfatherNav} from "../navigation/GodfatherNav";

export default function AdminRouter({ phase, account }) {

    return (
        <BrowserRouter>
            <GodfatherNav phase={phase} />
            <Switch>
                <Route exact path='/'>
                    <Home phase={phase} account={account} />
                </Route>
                {phase.phaseId === 3 ? (
                    <Route path='/preselection' component={Preselection}/>
                ) : null}
                {phase.phaseId === 5 ? (
                    <Route path='/meetings'>
                        <MeetingList account={account} />
                    </Route>
                ) : null}
                {phase.phaseId === 7 ? (
                    <Route path='/match' component={Match}/>
                ) : null}
                <Route exact path='/*'>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
