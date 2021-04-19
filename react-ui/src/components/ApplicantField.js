import { useState } from "react";
import  React from "react"

import {Star} from "./Star"  // permet de répéter l'étoile pour signifier "champ obligatoire"
import axios from 'axios';

function SubmitAnswer({id,answer})
{
       
    
        axios.post("https://etn-test.herokuapp.com/api/answers",{ fkAccountId:3,fkQuestionId:id,answer:answer})  // à voir fillValue et formk?
        .then(res => {
            console.log(res)
     
        })
        .catch(error => console.error("There was an error",error)) 
    return <div></div>
}


export function ApplicantField({id,questionLabel,send})           // création des champs de texte
{
    const[answer,setAnswer] = useState("")

    return <div>
     
      <label htmlFor={id}> {questionLabel} <Star></Star> </label>
      <input type="text"  placeholder="Votre réponse" id={id} onChange={(event) => setAnswer(event.target.value)} className="form-control mt-3"/>
      
    {send? <SubmitAnswer id={id} answer={answer}/>:""}
    </div>
}
