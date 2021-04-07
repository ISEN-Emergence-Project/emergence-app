import {Button, Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import AccountCard from "./AccountCard"

function Popup({user,displayUser})   //Créé la pop-up pour ajouter des comptes
{
    const [show, setShow] = useState(false);
    const [{password}, setFill] = useState("")

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

        <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>  
            <Modal.Title>Ajouter un compte </Modal.Title>
        </Modal.Header>
      <Modal.Body>
            <label htmlFor="id"> Identifiant</label>
                <input className="form-control mt-3" required onChange={(event) => setFill(event.target.value)}type="text" id="id"/>
                

            <label className="mt-3" htmlFor="email"> Adresse e-mail</label>
                <input className="form-control mt-3"  required onChange={(event) => setFill(event.target.value)}type="text" id="email"/>

            <label className="mt-3" htmlFor="passsword"> Mot de passe </label>
                <input type ="password" className="form-control mt-3" required onChange={(event) => setFill(event.target.value)} id = "passwordInput"/>
                <br></br>
                <p><input className="form-check-input"type="checkbox" onClick={toggleVisibility}/> Montrer le mot de passe </p> 

            <label className="mt-5" htmlFor="account_type"> Type de compte </label>

            <div id ="ok">
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
        <Button variant="btn btn-success btn-sm" onClick={() => displayUser(<AccountCard username= {document.getElementById("id").value} email= {checkEmail(document.getElementById("email").value)?document.getElementById("email").value:alert("Email invalide")} password={document.getElementById("passwordInput").value} userType={document.querySelector('input[name="flexRadioDefault"]:checked')===null? alert("Veuillez choisir un type de compte"):document.querySelector('input[name="flexRadioDefault"]:checked').value}/>)}> <i class="me-2 bi-check-circle"></i> Enregister</Button>
        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i class="me-2 bi-x-square-fill"></i> Fermer</Button>    


    </Modal.Footer>

    </Modal>

  </div>

    );
}

export default Popup
