import React from"react"
import {Dropdown} from "react-bootstrap"        
import {LaureateItem} from "../components/LaureateItem"


export function LaureateDropDownButton ({name})
{
    return <div>

        <Dropdown className="container"> 
            <Dropdown.Toggle className= " btn mt-5" variant="primary">{name} </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item > <LaureateItem  name = "Michel" choiceNumber= "3"/> </Dropdown.Item>
                <Dropdown.Item > <LaureateItem  name = "Michel" choiceNumber = "4" /> </Dropdown.Item>
                <Dropdown.Item > <LaureateItem  name = "Michel" choiceNumber = "6"/> </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
}