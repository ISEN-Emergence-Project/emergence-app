import { useState } from "react";
import  React from "react"
import {useEffect} from "react"
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';


function EditHeader()
{
 
  axios.put("https://etn-test.herokuapp.com/api/forms/2",{ title:editTitle.value,description:editSubTitle.value}) 
          .then(res => {
              console.log(res)  
           })
}


export function HeaderHook()         
{
    
    const [editTitle,setEditTitle] = useState("")
    const[editSubTitle,setEditSubTitle] = useState("")

    const [header,setHeader] = useState([])
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
        fetch("https://etn-test.herokuapp.com/api/forms/latest",{options})
        .then(res => {
            res.json()
             .then(res => setHeader(res))
             
         })
         
         .catch(error => console.error("There was an error",error)) 
       
     },[]);


    return <div>

        <div> 
            <img src={header.bannerUrl} width="100%" height="200px"/>           {/* On récupère les données de l'api  ou le texte modifié*/}
                <div className="card text-center bg-light mt-5">
                    {exit? <h1>{editTitle}</h1>:<h1> {header.title} </h1>}

                    {exit? <p>{editSubTitle}</p>:<p>{header.description}</p>}
                    <p className="text-danger"> * Obligatoire</p>
                </div>
                
        </div>


        <div className="container">     {/* Pour modifier le header (à faire) */}
            <Button className="btn btn-success d-grid gap-3 col-2  btn-sm mx-auto mt-5" onClick={handleShow}> Modifier </Button>

        <Modal size="lg" show={show} onHide={handleClose} onExited={handleExit}>
        <Modal.Header>  
            <Modal.Title>Modifier l'en-tête</Modal.Title>
        </Modal.Header>
      <Modal.Body>
            <label htmlFor="editTitle"> Titre </label>
                <input  className="form-control mt-3" defaultValue={header.title} required onChange={(event) => setEditTitle(event.target.value)}type="text" id="editTitle"/>
                

            <label className="mt-3" htmlFor="editSubTitle"> Description </label>
                <textarea className="form-control mt-3"  defaultValue={header.description} required onChange={(event) => setEditSubTitle(event.target.value)}type="text" id="editSubTitle"/>
                
      </Modal.Body>

      <Modal.Footer>{/* Une fois qu'on a rentré les infos on les affiches avec un document.getElementbyId */}
        <Button variant="btn btn-success btn-sm" onClick={EditHeader}> Enregister</Button>
            
        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>    

    </Modal.Footer>

    </Modal>

   </div>

</div>
        
   

}