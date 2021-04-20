import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {ApplicantForm} from "../pages/laureate/ApplicantForm";
import MeetingList from "../pages/MeetingList";

import {LaureateNav} from "../navigation/LaureateNav";
import {Home} from "../pages/laureate/Home";

export default function Admin() {

    return (
        <BrowserRouter>
            <LaureateNav />
            <Switch>
                <Route exact path='/laureate/'>
                    <Home/>
                </Route>
                <Route path='/laureate/Form' component={ApplicantForm}/>
                <Route path='/laureate/MeetingList' component={MeetingList}/>
            </Switch>
        </BrowserRouter>
    )
}
