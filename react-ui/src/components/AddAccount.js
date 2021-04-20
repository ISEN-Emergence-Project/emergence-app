import {Button, Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import axios from 'axios';

function handleCall()
{

    if(firstname.value == "" || lastname.value == "" || email.value == "" || username.value == "" || password.value == "" || laureatePromo.value == null)
    {
        alert("Tous les champs doivent être remplis")
         
    }

    else if (laureatePromo.value.match(/^[0-9]+$/) == null)        // comparer user et mail + gérer les alerts si elle quitte la popup par error
    {
        console.log(typeof laureatePromo.value)
        alert("La promotion du laureat doit contenir le format suivant 2020")
    }

   
    else
    {
     
    console.log(firstname.value)
        
        axios.post("https://etn-test.herokuapp.com/api/accounts",{  firstname:firstname.value,
                                                                    lastname:lastname.value,
                                                                    username:username.value,
                                                                    email:email.value,
                                                                    password:password.value,
                                                                    role:document.querySelector('input[name="flexRadioDefault"]:checked').value,
                                                                    laureatePromo:laureatePromo.value})
        .then(res => {
            console.log(res)
             
         })
         .catch(error => console.error("There was an error",error))
        }
}

export function AddAccount()   //Créé la pop-up pour ajouter des comptes
{
    const [show, setShow] = useState(false);
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username,setUsername] = useState("")
    const [laureatePromo,setLaureatePromo] = useState("")
    const[exit,setExit] = useState(false)
    const [error,setError] = useState(false)
    const [permission, setPermission] = useState("")

      

    const handleExit = () => setExit(true)
    
    const handleClose = () => setShow(false)  

    const handleShow = () => setShow(true);

    
    return(

        <div className="container">
            <Button className="btn btn-success d-grid gap-3 col-2  btn-sm mx-auto mt-5" onClick={handleShow}> <i class="fs-3 bi-plus-circle-fill"></i> Ajouter un compte </Button>

        {exit? <div className="alert alert-success" role="alert">
           Vos modifications ont été enregistrées, pour les voir veuillez recharger la page</div>:"" }

        <Modal size="lg" show={show} onHide={handleClose} onExited={handleExit}>
        <Modal.Header>  
            <Modal.Title>Ajouter un compte </Modal.Title>
        </Modal.Header>
      <Modal.Body>
            <label htmlFor="firstname"> Prénom</label>
                <input className="form-control mt-3" required onChange={(event) => setFirstname(event.target.value)}type="text" id="firstname"/>
                
            <label htmlFor="lastname"> Nom </label>
                <input className="form-control mt-3" required onChange={(event) => setLastname(event.target.value)}type="text" id="lastname"/>

            <label className="mt-3" htmlFor="email"> Adresse e-mail</label>
                <input className="form-control mt-3"  required onChange={(event) => setEmail(event.target.value)}type="text" id="email"/>

            <label className="mt-3" htmlFor="username"> Nom d'utilisateur</label>
                <input className="form-control mt-3"  required onChange={(event) => setUsername(event.target.value)}type="text" id="username"/>

            <label className="mt-3" htmlFor="lauretePromo"> Année de promotion </label>
                <input className="form-control mt-3"  required onChange={(event) => setLaureatePromo(event.target.value)}type="text" id="laureatePromo"/>

            <label className="mt-3" htmlFor="passsword"> Mot de passe </label>
                <input type ="password" className="form-control mt-3" required onChange={(event) => setPassword(event.target.value)} id = "password"/>
                <br></br> 

            <label className="mt-5" htmlFor="role"> Type de compte </label>

            <div>
            <div class="form-check mt-3">
                <input class="form-check-input" type="radio" defaultChecked value = "admin" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="admin"/>
                <label class="form-check-label"> Administrateur </label>
            </div>

            <div class="form-check mt-3">
                <input class="form-check-input" type="radio" value="godfather" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="godfather" />
                <label class="form-check-label"> Parrain </label>
            </div>

            <div class="form-check mt-3">
                <input class="form-check-input" type="radio" value = "laureate"  name="flexRadioDefault" id="laureate"/>
                <label class="form-check-label"> Filleul </label>
            </div>
        </div>
      </Modal.Body>

      <Modal.Footer>{/* Une fois qu'on a rentré les infos on les affiches avec un document.getElementbyId */}
      
        <Button variant="btn btn-success btn-sm" onClick={handleCall}> Enregistrer</Button>
        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>    

      </Modal.Footer>

    </Modal>

  </div>)
}
