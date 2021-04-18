import React, { useState,useEffect } from 'react';
import {Field} from "../components/Field" // On appelle le composant "Field" qui contient un champ pour une question
import { HeaderHook } from "../components/HeaderHook";


export function ApplicantForm()
{
  const[answer,setAnswer] = useState("")
  const [question,setQuestion] = useState([])

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
         .then(res => setQuestion(res))
         
        
    })
    
    .catch(error => console.error("There was an error",error)) 
  
    },[]);


    return <div>
      <HeaderHook/>
      <div> 
          {question.map(q => <div className="container mt-3" key={q.questionId}>
                        <div>
                          <Field id = {q.questionId} questionLabel = {q.question}/>
                          </div>
                    </div>
                    )}
      </div>

      <button> Envoyer vos réponses </button>
      
    </div>

}

