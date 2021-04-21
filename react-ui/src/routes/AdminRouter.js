import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import NotFound from "../pages/NotFound";
import {AdminForm} from "../pages/admin/AdminForm";
import {ManageAccounts} from "../pages/admin/ManageAccounts";
import MeetingsList from "../pages/laureate/MeetingsList";
import {Home} from "../pages/admin/Home";
import {PreselectionsList} from "../pages/admin/PreselectionsList";
import MeetingsPlanning from "../pages/admin/MeetingsPlanning";
import ChooseMatches from "../pages/admin/ChooseMatches";
import MatchesList from "../pages/admin/MatchesList";

import {AdminNav} from "../navigation/AdminNav";

export default function AdminRouter({ phase, setPhase, account }) {

    return (
        <BrowserRouter>
            <AdminNav phase={phase} />
            <Switch>
                <Route exact path='/'>
                    <Home phase={phase} setPhase={setPhase} account={account} />
                </Route>

                <Route path='/accounts'>
                    <ManageAccounts account={account} />
                </Route>
                <Route path='/form'>
                    <AdminForm account={account} />
                </Route>
                <Route path='/preselections'>
                    <PreselectionsList account={account} />
                </Route>
                <Route path='/meetings-panning'>
                    <MeetingsPlanning account={account} />
                </Route>
                <Route path='/meetings'>
                    <MeetingsList account={account} />
                </Route>
                <Route path='/choose-matches'>
                    <ChooseMatches account={account} />
                </Route>
                <Route path='/matches'>
                    <MatchesList account={account} />
                </Route>

                <Route exact path='/*'>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
