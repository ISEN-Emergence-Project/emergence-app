import  React, {useState} from "react"
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

import { FormQuestionField } from "./FormQuestionField";

function handleAddQuestion()
{
        axios.post("https://etn-test.herokuapp.com/api/questions",{
            question: question.value,
            description: description.value,
            fkFormId:"2"
        })
        .then(res => {
            console.log(res)  
         })  
}

export function FormAddQuestion()
{
    const [show, setShow] = useState(false);
    const[exit,setExit] = useState(false)
    const [question, setQuestion] = useState("")
  

    const handleClose = () =>  setShow(false)  
    const handleShow = () => setShow(true);
    const handleExit = () => setExit(true)
    

    return (
        <>
            <button onClick={handleShow}>Ajouter</button>
            {exit ? (
                <div className="container"> <FormQuestionField questionLabel={question} /> </div>
            ) : null}

            <Modal size="lg" show={show} onHide={handleClose} onExited={handleExit} >
                <Modal.Header>
                    <Modal.Title>Ajouter une question </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <label htmlFor="question"> Question </label>
                    <input  className="form-control mt-3" defaultValue="Name" required onChange={(event) => setQuestion(event.target.value)}type="text" id="question"/>

                    <label htmlFor="description"> Description </label>
                    <input  className="form-control mt-3" defaultValue="Description" required onChange={(event) => setDescription(event.target.value)}type="text" id="description"/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="btn btn-success btn-sm" onClick={handleAddQuestion}> Enregister</Button>
                    <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
