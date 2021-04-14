import React, { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import {Field} from"./Field"


export function FormHook({user,displayUser})     // Même form avec avec des hooks au lieu de classes ( n'est pas rendu pour l'instant)
{
    const [show, setShow] = useState(false);
    const [{prenom,nom}, setFill] = useState("")

    const handleClose = () => 
    {
        setShow(false)  

    }

    const handleShow = () =>
    {
        setShow(true)
    }




    return <div>
        <div className="container">
        <button onClick={handleShow}> OK</button>
        <Modal size="sm" show={show} onHide={handleClose} onExited = {() => displayUser(<Field name = "ok" children={document.getElementById("question").value}/>)} >
        <Modal.Header>  
          <Modal.Title>Ajouter une question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="question"> Question </label>
          <input className="form-control mt-3" required onChange={(event) => setFill(event.target.value)} type="text" id="question"/>     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i className="me-2 bi-x-square-fill"></i> Fermer</Button>
          <Button variant="btn btn-success btn-sm" onClick={handleClose}> <i className="me-2 bi-check-circle"></i> Enregister</Button>
    </Modal.Footer>
      </Modal>

    </div>
        <div className="container mt-5">
        <Field name="prenom" value={prenom} onChange={(event) => setFill(event.target.value)}> Prénom </Field>
        </div>

        <div className="container mt-5">
        <Field name="nom" value={nom} onChange={(event) => setFill(event.target.value)}> Nom </Field>
        </div>

    


    </div>
}
