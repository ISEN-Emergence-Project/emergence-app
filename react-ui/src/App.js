import React, {useCallback, useEffect, useState } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

// Import components
import {Home} from './pages/admin/Home'
import {Login} from './pages/Login'
import {Logout} from "./pages/Logout";

// Import routers
import AdminRouter from './routes/AdminRouter';
import LaureateRouter from './routes/LaureateRouter';
import GodfatherRouter from './routes/GodfatherRouter';
import axios from "axios";

export default function App() {
    const savedToken = sessionStorage.getItem('accessToken');
    const [ token, setToken ] = useState(savedToken ? savedToken : "");
    const [ user, setUser ] = useState({firstname: '', lastname: ''});

    useEffect(() => {
        sessionStorage.setItem('accessToken', token)
    }, [token]);

    return (
        <BrowserRouter>
            <title>Emergence</title>
            <div>
                <Switch>
                    {token ? (
                        <React.Fragment>
                            <Route exact path='/'>
                                <div>Root home</div>
                            </Route>

                            <Route path='/admin'>
                                <AdminRouter />
                            </Route>
                            <Route path='/laureate'>
                                <LaureateRouter />
                            </Route>
                            <Route path='/godfather'>
                                <GodfatherRouter />
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
