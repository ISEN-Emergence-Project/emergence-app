import React, {useEffect, useState} from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {Preselection} from "../pages/godfather/Preselection";
import {Home} from "../pages/godfather/Home";
import Meetings from "../pages/laureate/Meetings";
import Match from "../pages/laureate/Match";
import NotFound from "../pages/NotFound";

import {GodfatherNav} from "../navigation/GodfatherNav";

export default function AdminRouter({ phase }) {

    return (
        <BrowserRouter>
            <GodfatherNav phase={phase} />
            <Switch>
                <Route exact path='/godfather/'>
                    <Home/>
                </Route>
                {phase.phaseId === 3 ? (
                    <Route path='/godfather/preselection' component={Preselection}/>
                ) : null}
                {phase.phaseId === 5 ? (
                    <Route path='/godfather/meetings' component={Meetings}/>
                ) : null}
                {phase.phaseId === 7 ? (
                    <Route path='/godfather/match' component={Match}/>
                ) : null}
                <Route exact path='/godfather/*'>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
