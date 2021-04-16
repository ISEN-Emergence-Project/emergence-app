import './styles/App.css';
import React, {useCallback, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Import components
import {Navigation} from './navigation/Navigation'
import {Home} from './pages/Home'
import {APITest} from './pages/APITest'
import {ApplicantList} from './pages/ApplicantList'
import {ApplicantForm} from './pages/ApplicantForm'
import {Form} from './pages/Form'
import {Login} from './pages/Login'
import {ManageAccounts} from './pages/ManageAccounts'
import {PlanningV2} from './pages/PlanningV2'
import {Rating} from './pages/Rating'
import {Timeline} from './pages/Timeline'
import {PrettyPlanning} from './pages/PrettyPlanning'

import useToken from "./services/useToken";

export default function App() {
    const { token, setToken } = useToken();

    return (
        <BrowserRouter>
            <title>Emergence</title>
            <div>
                <Navigation user={ token } />
                <Switch>
                    {token ? (
                        <React.Fragment>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                            <Route path='/Form' component={Form}/>
                            <Route path='/ApplicantList' component={ApplicantList}/>
                            <Route path='/ManageAccounts' component={ManageAccounts}/>
                            <Route path='/Rating' component={Rating}/>
                            <Route path='/ApplicantForm' component={ApplicantForm}/>
                            <Route path='/Timeline' component={Timeline}/>
                            <Route path='/PlanningV2' component={PlanningV2}/>
                            <Route path='/APITest' component={APITest}/>
                            <Route path='/PrettyPlanning' component={PrettyPlanning}/>
                        </React.Fragment>
                    ) : (
                        <Route exact path='/'>
                            <Login token={ token } setToken={ setToken } />
                        </Route>
                    )}
                </Switch>
            </div>
        </BrowserRouter>
    );
}
