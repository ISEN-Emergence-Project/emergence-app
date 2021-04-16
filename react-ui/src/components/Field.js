import { useState } from "react";
import  React from "react"
import {useEffect} from "react"
import {Button, Modal} from 'react-bootstrap';
import {Star} from "./Star"  // permet de répéter l'étoile pour signifier "champ obligatoire"
import axios from 'axios';

// function EditQuestionCall()
// {
//   axios.put("https://etn-test.herokuapp.com/api/questions/4",{ question:fillValue.value}) 
//           .then(res => {
//               console.log(res)  
//            })  
//   }




export function Field({id,questionLabel})           // création des champs de texte
{
  const [show, setShow] = useState(false);
  const[exit,setExit] = useState(false)
  const [fillValue, setFill] = useState("")

  const handleClose = () =>  setShow(false)  

  const handleShow = () => setShow(true);
  const handleExit = () => setExit(true)


    return <div>
     
      <label htmlFor={id}> {exit? fillValue:questionLabel} <Star></Star> </label>
      <input type="text" required placeholder="Votre réponse" id={id} className="form-control mt-3"/>
      <button onClick={handleShow}>Modifier</button>

     {/* requête update , */}



      
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>  
            <Modal.Title>Modifier la question </Modal.Title>
        </Modal.Header>
      <Modal.Body>
            <label htmlFor="titre"> Question </label>
                <input  className="form-control mt-3" defaultValue="Name" required onChange={(event) => setFill(event.target.value)}type="text" id="question"/>     
      </Modal.Body>

      <Modal.Footer>{/* Une fois qu'on a rentré les infos on les affiches avec un document.getElementbyId */}
        <Button variant="btn btn-success btn-sm" onClick={handleExit}> Enregister</Button>
            
        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>    

    </Modal.Footer>

    </Modal>

    </div>
}
