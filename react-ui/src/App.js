import './styles/App.css';
import React, {useCallback, useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom'

// Import components
import {Navigation} from "./navigation/Navigation"
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

export default function App()
{
    useEffect(() => {
        document.title = "Emergence"
      }, [])
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`status ${response.status}`);
              }
              return response.json();
          })
          .then(json => {
              setMessage(json.message);
              setIsFetching(false);
          }).catch(e => {
          setMessage(`API call failed: ${e}`);
          setIsFetching(false);
      })
  }, [url]);

  /*useEffect(() => {
      setIsFetching(true);
      fetchData();
  }, [fetchData]);*/


  return (
      
      <BrowserRouter>
          <title>Emergence</title>
          <div>
              <Navigation />
              <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route path="/Form" component={Form}/>
                  <Route path="/ApplicantList" component={ApplicantList}/>
                  <Route path="/ManageAccounts" component={ManageAccounts}/>
                  <Route path="/Rating" component={Rating}/>
                  <Route path="/ApplicantForm" component={ApplicantForm}/>
                  <Route path="/Timeline" component={Timeline}/>
                  <Route path="/PlanningV2" component={PlanningV2}/>
                  <Route path="/APITest" component={APITest}/>
                  <Route  path="/PrettyPlanning" component={PrettyPlanning}/>
              </Switch>
          </div>
      </BrowserRouter>
  );
}
