import './styles/App.css';
import React, {useCallback, useEffect, useState } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import components
import {Navigation} from './navigation/Navigation'
import {Home} from './pages/Home'
import {ManageAccounts} from './pages/ManageAccounts'
import {ApplicantList} from './pages/ApplicantList'
import {ApplicantForm} from './pages/ApplicantForm'
import {Form} from './pages/Form'
import {Login} from './pages/Login'
import {Rating} from './pages/Rating'
import {PrettyPlanning} from './pages/PrettyPlanning'
import {Logout} from "./pages/Logout";
import {Preselection} from "./pages/Preselection";


export default function App() {
    const savedToken = sessionStorage.getItem('accessToken');
    const [ token, setToken ] = useState(savedToken ? savedToken : "")

    useEffect(() => {
        sessionStorage.setItem('accessToken', token)
    }, [token]);

    return (
        <BrowserRouter>
            <title>Emergence</title>
            <div>
                <Navigation user={ token } />
                <Switch>
                    {token ? (
                        <React.Fragment>
                            <Route exact path='/'>
                                <Redirect to='/Home' />
                            </Route>
                            <Route path='/Logout'>
                                <Logout setToken={setToken} />
                            </Route>
                            <Route path='/Home' component={Home}/>
                            <Route path='/Form' component={Form}/>
                            <Route path='/ApplicantList' component={ApplicantList}/>
                            <Route path='/Rating' component={Rating}/>
                            <Route path='/ApplicantForm' component={ApplicantForm}/>
                            <Route path='/ManageAccounts' component={ManageAccounts}/>
                            <Route path='/PrettyPlanning' component={PrettyPlanning}/>
                            <Route path='/Preselection' component={Preselection}/>
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
