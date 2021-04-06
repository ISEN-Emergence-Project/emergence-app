import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import Navigation from "./Components/Navigation"
import ApplicantList from "./Components/ApplicantList"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Component } from 'react';
import Form from"./Components/Form"
import ManageAccounts from"./Components/ManageAccounts"
import Rating from"./Components/Rating"
import ApplicantForm from"./Components/ApplicantForm"
import Timeline from"./Components/Timeline"
import PlanningV2 from"./Components/PlanningV2"
import APITest from"./Components/APITest"

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
