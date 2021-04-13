import React, { useState } from "react"

export function LaureateItem ({name,choiceNumber}) //tester select html + classname
{

    return <div className="container">

            <button className="btn btn-primary"> {name} <span className= {choiceNumber < 4 ? "badge bg-warning ms-4":"" || choiceNumber == 4 ? "badge bg-success ms-4":"" || choiceNumber > 4 ? "badge bg-danger ms-4":""}> {choiceNumber} </span> </button>
    
        </div>
}