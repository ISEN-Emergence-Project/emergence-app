import React, { useState,useEffect } from 'react';
import { ApplicantHeader } from '../../components/ApplicantHeader';
import {ApplicantField} from "../../components/ApplicantField" // On appelle le composant "Field" qui contient un champ pour une question

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


    return (
        <>
            <ApplicantHeader/>

            <div className='container py-4'>
                {question.map(q => (
                    <div className="mt-4" key={q.questionId}>
                        <ApplicantField id = {q.questionId} questionLabel = {q.question} send={clicked}/>
                    </div>
                ))}

                <div className='my-4 py-4'>
                    <button className='btn btn-success' onClick={handleClick}>Envoyer vos réponses</button>
                </div>
            </div>
        </>

    )

}

