import {Button, Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import {useEffect} from "react"
import { ApplicantCard } from './ApplicantCards';
import axios from 'axios';


function handleCall()
{
                                        // remettre la modif avec handleexit

        
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
    

      

    const handleExit = () => {
            setExit(true)
        }
    const handleClose = () => 
    {
        setShow(false)  

    }
    const handleShow = () => setShow(true);

    const [permission, setPermission] = useState("")

    


    const toggleVisibility = () =>
    {
        let input = document.getElementById("passwordInput");
        if (input.type === "password") 
        {
            input.type = "text";
        } 
        else 
        {
            input.type = "password";
        }
    }

    const checkEmail = (email) =>
    {
        let input = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return input.test(email)
    }
    

    return(
        


        <div className="container">
            <Button className="btn btn-success d-grid gap-3 col-2  btn-sm mx-auto mt-5" onClick={handleShow}> <i class="fs-3 bi-plus-circle-fill"></i> Ajouter un compte </Button>

            {exit? <ApplicantCard Name={lastname} Firstname={firstname} Age={email} Studies={password} Role ={
                                            document.querySelector('input[name="flexRadioDefault"]:checked')===null? alert("Veuillez choisir un type de compte"):
                                            document.querySelector('input[name="flexRadioDefault"]:checked').value
                                        }/>
                                        :""}

        <Modal size="lg" show={show} onHide={handleClose} onExit={handleExit}>
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

            <label className="mt-3" htmlFor="lauretePromo"> Promo </label>
                <input className="form-control mt-3"  required onChange={(event) => setLaureatePromo(event.target.value)}type="text" id="laureatePromo"/>

            <label className="mt-3" htmlFor="passsword"> Mot de passe </label>
                <input type ="password" className="form-control mt-3" required onChange={(event) => setPassword(event.target.value)} id = "password"/>
                <br></br>
                <p><input className="form-check-input"type="checkbox" onClick={toggleVisibility}/> Montrer le mot de passe </p> 

            <label className="mt-5" htmlFor="role"> Type de compte </label>

            <div>
            <div class="form-check mt-3">
                <input class="form-check-input" type="radio" value = "Admin" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="admin"/>
                <label class="form-check-label"> Administrateur </label>
            </div>

            <div class="form-check mt-3">
                <input class="form-check-input" type="radio" value="Parrain" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="godfather" />
                
                <label class="form-check-label"> Parrain </label>
            </div>

            <div class="form-check mt-3">
                <input class="form-check-input" type="radio" value = "Filleul"  name="flexRadioDefault" id="laureate"/>
                <label class="form-check-label"> Filleul </label>
            </div>
        </div>
                
      </Modal.Body>

      <Modal.Footer>{/* Une fois qu'on a rentré les infos on les affiches avec un document.getElementbyId */}
        <Button variant="btn btn-success btn-sm" onClick={handleCall}> Enregistrer</Button>

        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>    


    </Modal.Footer>

    </Modal>

  </div>

    )
}
