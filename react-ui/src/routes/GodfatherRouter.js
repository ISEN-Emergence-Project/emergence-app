import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {Rating} from "../pages/Rating";
import {Preselection} from "../pages/godfather/Preselection";
import MeetingList from "../pages/MeetingList";

import {GodfatherNav} from "../navigation/GodfatherNav";
import {Home} from "../pages/godfather/Home";

export default function Admin() {

    return (
        <BrowserRouter>
            <GodfatherNav />
            <Switch>
                <Route exact path='/godfather/'>
                    <Home/>
                </Route>
                <Route path='/godfather/Preselection' component={Preselection}/>
                <Route path='/godfather/MeetingList' component={MeetingList}/>
                <Route path='/godfather/Rating' component={Rating}/>
            </Switch>
        </BrowserRouter>
    )
}
