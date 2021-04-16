import { useState } from "react";
import  React from "react"
import {useEffect} from "react"
import {Button, Modal} from 'react-bootstrap';
import {Star} from "./Star"  // permet de répéter l'étoile pour signifier "champ obligatoire"


export function Field({id,questionLabel})           // création des champs de texte
{
  const [show, setShow] = useState(false);
  const[exit,setExit] = useState(false)
  const [fillValue, setFill] = useState("")

  const handleClose = () =>  setShow(false)  

  const handleShow = () => setShow(true);
  const handleExit = () => setExit(true)
  const[data,setData] = useState([])


 


//  useEffect(() => {
//   // PUT request using fetch inside useEffect React hook
//   const putoptions = {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({question:fillValue})
//   };
//   fetch("https://etn-test.herokuapp.com/api/questions/" + id,putoptions)
//       .then(res => {
//         res.json()
//         .then(data => setData(data.id));
//       })

// }, []);


 








    return <div>
     
      <label htmlFor={id}> {exit? fillValue:questionLabel} <Star></Star> </label>
      <input type="text" required placeholder="Votre réponse" id={id} className="form-control mt-3"/>
      <button onClick={handleShow}>Modifier</button>

     {/* requête update , */}



      
      <Modal size="lg" show={show} onHide={handleClose} onExited={handleExit}>
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
