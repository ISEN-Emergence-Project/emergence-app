import React, { useState,useEffect } from 'react';
import { ApplicantHeader } from '../components/ApplicantHeader';
import {ApplicantField} from "../components/ApplicantField" // On appelle le composant "Field" qui contient un champ pour une question

export function ApplicantForm()
{
  const [question,setQuestion] = useState([])
  const [clicked,setClicked] = useState(false)

  const handleClick = () => setClicked(true)


  useEffect(() => {
    const options = {
        method: "GET",
        header:
        {
            'content-type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
        }
    }
    fetch("https://etn-test.herokuapp.com/api/questions/form/latest",{options})
    .then(res => {
        res.json()
         .then(res => setQuestion(res))
         
        
    })
    
    .catch(error => console.error("There was an error",error)) 
  
    },[]);


    return <div>
      <ApplicantHeader/>
          {question.map(q => <div className="container mt-3" key={q.questionId}>
                        <div>
                          <ApplicantField id = {q.questionId} questionLabel = {q.question} send={clicked}/>
                          </div>
                    </div>
                    )}
        <button onClick={handleClick}> Envoyer vos réponses </button>
      
    </div>

}

