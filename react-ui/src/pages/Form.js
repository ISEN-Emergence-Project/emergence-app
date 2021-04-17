import React, { Component, useEffect,useState } from 'react';
import{HeaderHook} from "../components/HeaderHook"
import {QuestionField} from "../components/QuestionField"



export function Form() 
{

  const[form,setForm] = useState([])
  const [info, displayInfo] = useState([])
  

      useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/forms/latest/questions",{options})
        .then(res => {
           res.json()
            .then(res => setForm(res))
            
        })
        
        .catch(error => console.error("There was an error",error)) 
      
    },[]);


    const handleClick = () =>
    {
        useEffect(() => {
            const options = {
                method: "PUT",
                header:
                {
                    'content-type': 'application/json',
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
                }
            }
            fetch("https://etn-test.herokuapp.com/api/forms",{options})
            .then(res => {
               res.json()
                .then(res => setForm(res))
                
            })
            
            .catch(error => console.error("There was an error",error)) 
          
        },[]);
    }

    return <div>
        <HeaderHook info={info} displayInfo={displayInfo}/>
        {info}

      <div>
          <QuestionField/>
          
      </div>
     
        <button onClick={handleClick}> Save information</button>
      </div>

}
