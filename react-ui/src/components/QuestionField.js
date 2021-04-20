import { useState } from "react";
import  React from "react"
import {useEffect} from "react"
import {Field} from "./Field"
import {AddQuestionCall} from "./admin/AddQuestionCall"


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
        fetch("https://etn-test.herokuapp.com/api/questions/form/latest",{options})
        .then(res => {
            res.json()
             .then(res => setQuestion(res))
             
         })
         
         .catch(error => console.error("There was an error",error)) 
       
     },[]);


    return <div>
        <div> 
                {question.map(q => <div className="container mt-3" key={q.questionId}>
                              <div>
                               <Field id = {q.questionId} questionLabel = {q.question}/>
                                </div>
                          </div>
                          )}
                <AddQuestionCall/>
        </div>
    </div>
}
