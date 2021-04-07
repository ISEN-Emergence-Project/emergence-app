import {Button, Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import AccountCard from "./AccountCard"

function Popup({user,displayUser})
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
    

    return(
        
        <div className="container">
            <Button className="btn btn-success d-grid gap-3 col-2  btn-sm mx-auto mt-5" onClick={handleShow}> <i className="fs-3 bi-plus-circle-fill"></i> Ajouter un compte </Button>

        <Modal size="lg" show={show} onHide={handleClose} onExited={() => displayUser(<AccountCard username= {document.getElementById("id").value} email= {document.getElementById("email").value} password={document.getElementById("passwordInput").value} userType={document.querySelector('input[name="flexRadioDefault"]:checked').value}/>)}>
        <Modal.Header>  
            <Modal.Title>Ajouter un compte </Modal.Title>
        </Modal.Header>
      <Modal.Body>
            <label htmlFor="id"> Identifiant</label>
                <input className="form-control mt-3" required onChange={(event) => setFill(event.target.value)}type="text" id="id"/>
                <div> {password}</div>

            <label className="mt-3" htmlFor="email"> Adresse e-mail</label>
                <input className="form-control mt-3"  required onChange={(event) => setFill(event.target.value)}type="text" id="email"/>

            <label className="mt-3" htmlFor="passsword"> Mot de passe </label>
                <input type ="password" className="form-control mt-3" required onChange={(event) => setFill(event.target.value)} id = "passwordInput"/>
                <br></br>
                <p><input className="form-check-input"type="checkbox" onClick={toggleVisibility}/> Montrer le mot de passe </p> 

            <label className="mt-5" htmlFor="account_type"> Type de compte </label>

            <div id ="ok">
            <div className="form-check mt-3">
                <input className="form-check-input" type="radio" value = "Admin" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="admin"/>
                <label className="form-check-label"> Administrateur </label>
            </div>

            <div className="form-check mt-3">
                <input className="form-check-input" type="radio" value="Parrain" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="godfather" />
                
                <label className="form-check-label"> Parrain </label>
            </div>

            <div className="form-check mt-3">
                <input className="form-check-input" type="radio" value = "Filleul"  name="flexRadioDefault" id="laureate"/>
                <label className="form-check-label"> Filleul </label>
            </div>
        </div>
                
      </Modal.Body>

      <Modal.Footer>
        <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i className="me-2 bi-x-square-fill"></i> Fermer</Button>
        <Button variant="btn btn-success btn-sm" onClick={handleClose}> <i className="me-2 bi-check-circle"></i> Enregister</Button>

    </Modal.Footer>

    </Modal>

  </div>

    );
}

export default Popup
