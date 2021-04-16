import './styles/App.css';
import React, {useCallback, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'

// Import components
import {Navigation} from "./navigation/Navigation"
import {Home} from "./pages/Home"
import {APITest} from "./pages/APITest"
import {ApplicantList} from "./pages/ApplicantList"
import {ApplicantForm} from "./pages/ApplicantForm"
import {Form} from "./pages/Form"
import {Login} from './pages/Login'
import {ManageAccounts} from "./pages/ManageAccounts"
import {PlanningV2} from "./pages/PlanningV2"
import {Rating} from "./pages/Rating"
import {Timeline} from "./pages/Timeline"
import {PrettyPlanning} from "./pages/PrettyPlanning"
import axios from "axios";

export default function App() {
    const [user, setUser] = useState();

    useEffect(() => {
        document.title = "Emergence";

        // Get test user infos
        axios.get("//etn-test.herokuapp.com/api/accounts/8")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <BrowserRouter>
            <title>Emergence</title>
            <div>
                <Navigation user={ user } />
                <Switch>
                    {user ? (
                        <Route exact path="/" render={() => (<Home user={ user } setUser={ setUser } />)}/>
                    ) : (
                        <Route exact path="/" render={() => (<Login user={ user } setUser={ setUser } />)}/>
                    )}
                    {user ? (
                        <React.Fragment>
                            <Route path="/Form" component={Form}/>
                            <Route path="/ApplicantList" component={ApplicantList}/>
                            <Route path="/ManageAccounts" component={ManageAccounts}/>
                            <Route path="/Rating" component={Rating}/>
                            <Route path="/ApplicantForm" component={ApplicantForm}/>
                            <Route path="/Timeline" component={Timeline}/>
                            <Route path="/PlanningV2" component={PlanningV2}/>
                            <Route path="/APITest" component={APITest}/>
                            <Route path="/PrettyPlanning" component={PrettyPlanning}/>
                        </React.Fragment>
                    ) : null}
                </Switch>
            </div>
        </BrowserRouter>
    );
}
