import React, { useState } from "react"
import {Dropdown} from "react-bootstrap"

import DropdownItem from "react-bootstrap/DropdownItem";

export function LaureateDropdown ({ preselections }) {
    const [ selected, setSelected ] = useState();
    const [name,setName] = useState("");

    const changeName = (e) => {
        console.log(e)
    }
    
    return (
        <div className='col'>
            <Dropdown onSelect={(e) => setSelected(e)}>
                <Dropdown.Toggle className="btn container-fluid" variant="outline-success">{selected ? selected : 'Choisir'} </Dropdown.Toggle>

                <Dropdown.Menu>
                    <DropdownItem eventKey='Michel'> Michel <span className="badge bg-success ms-4">{4}</span> </DropdownItem>
                    <DropdownItem eventKey='Jean'> Jean <span className="badge bg-warning ms-4">{3}</span> </DropdownItem>
                    <DropdownItem eventKey='Pierre'> Pierre <span className="badge bg-warning ms-4">{4}</span> </DropdownItem>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
