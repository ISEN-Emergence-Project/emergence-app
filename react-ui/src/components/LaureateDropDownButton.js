import React, { useState } from "react"
import {Dropdown} from "react-bootstrap"        
import {LaureateItem} from "../components/LaureateItem" // voir méthode onSelect


export function LaureateDropDownButton ()
{
    const [name,setName] = useState("")
    const [laureate, displayLaureate] = useState([])


    const changeName = (e) =>
    {
        
        setName(e)
    }
    return <div>

        <Dropdown onSelect={changeName}className="container"> 
            <Dropdown.Toggle  className= "btn mt-5" variant="primary">{name}</Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="Michel" > <LaureateItem  name = "Michel" choiceNumber= "3"/> </Dropdown.Item>
                <Dropdown.Item > <LaureateItem  name = "Jean" choiceNumber = "4" /> </Dropdown.Item>
                <Dropdown.Item > <LaureateItem  name = "Pierre" choiceNumber = "6"/> </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
}