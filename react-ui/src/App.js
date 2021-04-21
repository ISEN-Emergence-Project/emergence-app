import React, {useCallback, useEffect, useState } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import axios from "axios";

// Import components
import {Login} from './pages/Login'
import {Logout} from "./pages/Logout";

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
        axios.get('//etn-test.herokuapp.com/api/forms/latest')
            .then((res) => {
                axios.get('//etn-test.herokuapp.com/api/phases/'+ res.data.fkPhaseId)
                    .then((res) => {
                        setPhase(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        sessionStorage.setItem('accessToken', token);

        axios.get('//etn-test.herokuapp.com/api/accounts/'+ token)
            .then((res) => {
                setAccount(res.data);
            })
            .catch((err) => console.log(err));
    }, [token]);

    return (
        <BrowserRouter>
            <title>Emergence</title>
            <div>
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
            </div>
        </BrowserRouter>
    );
}
