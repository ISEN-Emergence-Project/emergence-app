import React, { useCallback, useEffect, useState, Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import components
import Navigation from "./Navigation"
import ApplicantList from "./ApplicantList"
import Form from"./Form"
import ManageAccounts from"./ManageAccounts"
import Rating from"./Rating"
import ApplicantForm from"./ApplicantForm"
import Timeline from"./Timeline"
import PlanningV2 from"./PlanningV2"
import APITest from"./APITest"

function App()
{
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

  useEffect(() => {
      setIsFetching(true);
      fetchData();
  }, [fetchData]);


  render()
  {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route exact path="/" component={Form}/>
             <Route  path="/ApplicantList" component={ApplicantList}/>
             <Route  path="/ManageAccounts" component={ManageAccounts}/>
             <Route  path="/Rating" component={Rating}/>
             <Route  path="/ApplicantForm" component={ApplicantForm}/>
             <Route  path="/Timeline" component={Timeline}/>
             <Route  path="/PlanningV2" component={PlanningV2}/>
             <Route  path="/APITest" component={APITest}/>
           </Switch>
        </div> 
      </BrowserRouter>
    )
  }
}

export default App
