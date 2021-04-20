import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {Form} from "../pages/Form";
import {ApplicantList} from "../pages/ApplicantList";
import {Rating} from "../pages/Rating";
import {ApplicantForm} from "../pages/ApplicantForm";
import {ManageAccounts} from "../pages/ManageAccounts";
import {PrettyPlanning} from "../pages/PrettyPlanning";
import MeetingList from "../pages/MeetingList";

import {AdminNav} from "../navigation/AdminNav";
import {Home} from "../pages/admin/Home";

export default function AdminRouter() {

    return (
        <BrowserRouter>
            <AdminNav />
            <Switch>
                <Route exact path='/admin'>
                    <Home/>
                </Route>
                <Route path='/admin/Form' component={Form}/>
                <Route path='/admin/ApplicantList' component={ApplicantList}/>
                <Route path='/admin/Rating' component={Rating}/>
                <Route path='/admin/ApplicantForm' component={ApplicantForm}/>
                <Route path='/admin/ManageAccounts' component={ManageAccounts}/>
                <Route path='/admin/PrettyPlanning' component={PrettyPlanning}/>
                <Route path='/admin/MeetingList' component={MeetingList}/>
            </Switch>
        </BrowserRouter>
    )
}
