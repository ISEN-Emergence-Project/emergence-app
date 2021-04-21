import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import pages
import {AdminForm} from "../pages/admin/AdminForm";
import {ApplicantList} from "../pages/admin/ApplicantList";
import {Rating} from "../pages/laureate/Rating";
import {ApplicantForm} from "../pages/laureate/ApplicantForm";
import {ManageAccounts} from "../pages/admin/ManageAccounts";
import {PrettyPlanning} from "../pages/admin/PrettyPlanning";
import Meetings from "../pages/laureate/Meetings";
import {Home} from "../pages/admin/Home";

import {AdminNav} from "../navigation/AdminNav";
import NotFound from "../pages/NotFound";

export default function AdminRouter({ phase, setPhase, account }) {

    return (
        <BrowserRouter>
            <AdminNav />
            <Switch>
                <Route exact path='/'>
                    <Home phase={phase} setPhase={setPhase} account={account} />
                </Route>

                <Route path='/accounts'>
                    <ManageAccounts/>
                </Route>
                <Route path='/form' component={AdminForm}/>
                <Route path='/ApplicantList' component={ApplicantList}/>
                <Route path='/Rating' component={Rating}/>
                <Route path='/ApplicantForm' component={ApplicantForm}/>
                <Route path='/PrettyPlanning' component={PrettyPlanning}/>
                <Route path='/Meetings' component={Meetings}/>

                <Route exact path='/*'>
                    <NotFound/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
