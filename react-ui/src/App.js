/**
 * REACT APP ROOT COMPONENT
 * Authenticate user with token, get account infos and phase
 * Basic routing according to connected account.role
 */

import React, {useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import axios from "axios";

// Import components
import {Login} from './pages/Login'
import {Logout} from "./pages/Logout";

import DevTools from "./components/dev/DevTools";
import {AppNav} from "./navigation/AppNav";

// Import routers
import AdminRouter from './routes/AdminRouter';
import LaureateRouter from './routes/LaureateRouter';
import GodfatherRouter from './routes/GodfatherRouter';


export default function App() {
    const savedToken = sessionStorage.getItem('accessToken');
    const [ token, setToken ] = useState(savedToken ? savedToken : "");
    const [ account, setAccount ] = useState({});
    const [ phase, setPhase ] = useState({});

    useEffect(() => {
        if (token) {
            sessionStorage.setItem('accessToken', token);

            // get account infos
            axios.get(process.env.REACT_APP_API_HOST +'/api/accounts/'+ token)
                .then((res) => {
                    setAccount(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    // reset session related variables
                    sessionStorage.removeItem('accessToken');
                    setToken('');
                });

            // get latest form infos
            axios.get(process.env.REACT_APP_API_HOST +'/api/forms/latest')
                .then((res) => {
                    axios.get(process.env.REACT_APP_API_HOST +'/api/phases/'+ res.data.fkPhaseId)
                        .then((res) => {
                            setPhase(res.data);
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    }, [token]);

    // Include the correct router according to user role, and if connected
    return (
        <BrowserRouter>
            {!token ? (
                <AppNav />
            ) : (
                <DevTools phase={phase} setPhase={setPhase} />
            )}
            <Switch>
                {token ? (
                    <React.Fragment>
                        <Route path='/'>
                            {account.role === 'admin' ? (
                                <AdminRouter phase={phase} setPhase={setPhase} account={account} />
                            ) : null}

                            {account.role === 'laureate' ? (
                                <LaureateRouter phase={phase} account={account} />
                            ) : null}

                            {account.role === 'godfather' ? (
                                <GodfatherRouter phase={phase} account={account} />
                            ) : null}
                        </Route>

                        <Route path='/logout'>
                            <Logout setToken={setToken} />
                        </Route>
                    </React.Fragment>
                ) : (
                    <>
                        <Route exact path='/login'>
                            <Login setToken={ setToken } />
                        </Route>

                        <Route path='/'>
                            <Redirect to='/login' />
                        </Route>
                    </>
                )}
            </Switch>
        </BrowserRouter>
    );
}
