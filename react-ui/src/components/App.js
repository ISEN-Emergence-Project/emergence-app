import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import Navigation from "./Navigation"
import ApplicantList from "./ApplicantListPage/ApplicantList"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Component } from 'react';
import Form from"./FormPage/Form"
import ManageAccounts from"./ManageAccounts"
import Rating from"./RatingPage/Rating"
import ApplicantForm from"./ApplicantForm"
import Timeline from"./PlanningPage/Timeline"
import PlanningV2 from"./TestDnD/PlanningV2"
import APITest from"./APITest"

// Import components
import Navigation from "./Navigation"
import ApplicantList from "./ApplicantList"
import Form from"./Form"
import ManageAccounts from"./ManageAccounts"
import Rating from"./Rating"
import ApplicantForm from"./ApplicantForm"
import Planning from"./Planning"

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
                  <Route  path="/Planning" component={Planning}/>
              </Switch>
          </div>
      </BrowserRouter>
  );
}

export default App
