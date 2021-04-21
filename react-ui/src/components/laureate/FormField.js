import  React from "react"

import {Star} from "../Star"

export function FormField({ question, addAnswer }) {
    return (
        <div className='py-2'>
            <label className='m-0' htmlFor={question.questionId}>
                {question.question} <Star/>
            </label>
            <input type="text" placeholder="Votre réponse" id={question.questionId} onChange={(e) => addAnswer(question.questionId, e.target.value)} className="form-control"/>
        </div>
    )
}
