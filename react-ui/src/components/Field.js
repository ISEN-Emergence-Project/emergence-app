import { useState } from "react";
import  React from "react"
import {Button, Modal} from 'react-bootstrap';

import {Star} from "./Star"  // permet de répéter l'étoile pour signifier "champ obligatoire"
import axios from 'axios';

function EditQuestionCall({id})
{
 
  axios.put("https://etn-test.herokuapp.com/api/questions/" + id,{ question:editQuestion.value}) 
          .then(res => {
              console.log(res)  
           })
  return <div>{editQuestion.value}</div>  
}




export function Field({id,questionLabel})           // création des champs de texte
{
  const [show, setShow] = useState(false);
  const[exit,setExit] = useState(false)
  const [editQuestion, setEditQuestion] = useState("")

  const handleClose = () =>  setShow(false)  

  const handleShow = () => setShow(true);  
  const handleExit = () => setExit(true)


    return <div>
     
      <label htmlFor={id}> {exit? <EditQuestionCall id ={id}/>:questionLabel} <Star></Star> </label>
      <input type="text" required placeholder="Votre réponse" id={id} className="form-control mt-3"/>
      <button onClick={handleShow}>Modifier</button>




      <Modal size="lg" show={show} onHide={handleClose} onExit={handleExit}>
        <Modal.Header>  
            <Modal.Title>Modifier la question </Modal.Title>
        </Modal.Header>
      <Modal.Body>
            <label htmlFor="editQuestion"> Question </label>
                <input  className="form-control mt-3" defaultValue="Name" required onChange={(event) => setEditQuestion(event.target.value)}type="text" id="editQuestion"/>     
      </Modal.Body>

      <Modal.Footer>{/* Une fois qu'on a rentré les infos on les affiches avec un document.getElementbyId */}
        <Button variant="btn btn-success btn-sm"> Enregister</Button>
            
        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>    

    </Modal.Footer>

    </Modal>
      

    </div>
}
