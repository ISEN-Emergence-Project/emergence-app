import React, { useState } from "react"
import {Dropdown} from "react-bootstrap"        
import {LaureateItem} from "../components/LaureateItem"


export function LaureateDropDownButton ()
{
    const [name,setName] = useState("")

    const changeName = (e) => setName(e)
    
    return <div>

        <Dropdown onSelect={changeName}className="container"> 
            <Dropdown.Toggle className= "btn mt-5" variant="primary">{name === "" ? "laureate":name}</Dropdown.Toggle>

            <Dropdown.Menu>
                <LaureateItem  name = "Michel" choiceNumber= "3"/>
                <LaureateItem  name = "Jean" choiceNumber = "4" />
                <LaureateItem  name = "Pierre" choiceNumber = "6"/>
            </Dropdown.Menu>
        </Dropdown>
    </div>
}