import React from "react"
import DropdownItem from "react-bootstrap/esm/DropdownItem"

export function LaureateItem ({name,choiceNumber}) //tester select html + classname
{
    return <div className="container">
            <DropdownItem eventKey={name}> {name} <span className= {choiceNumber < 4 ? "badge bg-warning ms-4":"" || choiceNumber == 4 ? "badge bg-success ms-4":"" || choiceNumber > 4 ? "badge bg-danger ms-4":""}> {choiceNumber} </span> </DropdownItem>
        </div>
}