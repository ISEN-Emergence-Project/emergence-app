/**
 * ADMIN REACT ROUTER
 * Include Admin Navigation
 * Route to targeted page's component
 */

import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Import pages
import NotFound from "../pages/NotFound";
import {AdminForm} from "../pages/admin/AdminForm";
import {ManageAccounts} from "../pages/admin/ManageAccounts";
import MeetingsList from "../pages/admin/MeetingsList";
import {Home} from "../pages/admin/Home";
import {PreselectionsList} from "../pages/admin/PreselectionsList";
import MeetingsPlanning from "../pages/admin/MeetingsPlanning";
import ChooseMatches from "../pages/admin/ChooseMatches";
import MatchesList from "../pages/admin/MatchesList";

import {AdminNav} from "../navigation/AdminNav";

export default function AdminRouter({ phase, updatePhase, account }) {

    return (
        <BrowserRouter>
            <AdminNav phase={phase} />

            <Switch>
                <Route exact path='/'>
                    <Home phase={phase} updatePhase={updatePhase} account={account} />
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
                <Route path='/meetings-planning'>
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
