import { useState } from "react";
import  React from "react"
import {useEffect} from "react"
import {Button, Modal} from 'react-bootstrap';
import {Field} from "./Field"
import {AddQuestionCall} from "../components/AddQuestionCall"


export function QuestionField()         
{
    
   

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
        <div> 
                {question.map(q => <div className="container mt-3" key={q.questionId}> {/* utiliser requete poir sélectionner une question et la modifier */}
                              <div>
                               <Field id = {q.questionId} questionLabel = {q.question}/>
                                </div>
                          </div>
                          )}
                      

                      <AddQuestionCall/>
        </div>
</div>
        

}