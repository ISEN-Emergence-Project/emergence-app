import { useState } from "react";
import  React from "react"

import {Star} from "./Star" 
import axios from 'axios';

function SubmitAnswer({id,answer})
{
    axios.post("https://etn-test.herokuapp.com/api/answers",{ fkAccountId:3,fkQuestionId:id,answer:answer})  // à voir accoutnID
    .then(res => {
        console.log(res)

    })
    .catch(error => console.error("There was an error",error))

    return <div></div>
}

export function ApplicantField({ id, questionLabel, send }) {
    const[answer,setAnswer] = useState("")

    return (
        <div className='py-2'>
            <label className='m-0' htmlFor={id}> {questionLabel} <Star/> </label>
            <input type="text"  placeholder="Votre réponse" id={id} onChange={(event) => setAnswer(event.target.value)} className="form-control"/>
            {send? <SubmitAnswer id={id} answer={answer}/>:""}
        </div>
    )
}
