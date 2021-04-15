import { useState } from "react";
import  React from "react"
import {useEffect} from "react"
import {Button, Modal} from 'react-bootstrap';
import {Field} from "./Field"


export function QuestionField({quest,displayQuest})         
{
    
    const [{password}, setFill] = useState("")

    const [question,setQuestion] = useState([])
    const [show, setShow] = useState(false);
    const[exit,setExit] = useState(false)

    const handleClose = () =>  setShow(false)  

    const handleShow = () => setShow(true);
    const handleExit = () => setExit(true)


    useEffect(() => {
        const options = {
            method: "GET",
            header:
            {
                'content-type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTgxNDMxNzIsImV4cCI6MTYxODIyOTU3Mn0.5patB5mX43WUUsCHVPnoAbmz-rEnLwyqRLyAJCl_Ss0'
            }
        }
        fetch("https://etn-test.herokuapp.com/api/forms/latest/questions",{options})
        .then(res => {
            res.json()
             .then(res => setQuestion(res))
             
         })
         
         .catch(error => console.error("There was an error",error)) 
       
     },[]);


    return <div>
        <div> 
                {question.map(q => <div className="container mt-3" key={q.questionId}> {/* utiliser requete poir sélectionner une question et la modifier */}
                              <div>
                               <Field name = {q.question} children = {q.question}/>
                                </div>
                          </div>
                          )}
                      

                
        </div>
        <div className="container">     {/* Pour modifier la question (à faire) */}
            

        <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>  
            <Modal.Title>Modifier la question </Modal.Title>
        </Modal.Header>
      <Modal.Body>
            <label htmlFor="titre"> Question </label>
                <input  className="form-control mt-3" defaultValue="o" required onChange={(event) => setFill(event.target.value)}type="text" id="question"/>     
      </Modal.Body>

      <Modal.Footer>{/* Une fois qu'on a rentré les infos on les affiches avec un document.getElementbyId */}
        <Button variant="btn btn-success btn-sm" onClick={handleExit}> Enregister</Button>
            
        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>    

    </Modal.Footer>

    </Modal>

   </div>

</div>
        
   

}