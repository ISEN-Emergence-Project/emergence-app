import {Button, Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import axios from 'axios';

function handleCall()
{
        
        axios.post(process.env.REACT_APP_API_HOST +"/api/accounts",{  firstname:firstname.value,
                                                                    lastname:lastname.value,
                                                                    username:username.value,
                                                                    email:email.value,
                                                                    password:password.value,
                                                                    role:document.querySelector('input[name="flexRadioDefault"]:checked').value,
                                                                    promo:laureatePromo.value,
                                                                    studies:studies.value,
                                                                    phone:phoneNumber.value})
        .then(res => {
            console.log(res)
             
         })
         .catch(error => console.error("There was an error",error))
}


export function AddAccount() {
    const [show, setShow] = useState(false);
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username,setUsername] = useState("")
    const [laureatePromo,setLaureatePromo] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [studies,setStudies] =useState("")


    const[exit,setExit] = useState(false)
    const [permission, setPermission] = useState("")

    const resetValues = () => 
    {
            setFirstname("")
            setLastname("")
            setEmail("")
            setUsername ("")
            setPassword ("")
            setLaureatePromo ("")
            setPhoneNumber("")
            setStudies("")
    }

    const handleExit = () => 
    {
        console.log(firstname)
        setExit(false)
        if(firstname === "" || lastname === "" || email === "" || username === "" || password === "" || laureatePromo == null || phoneNumber === ""|| studies === "")
        {
            alert("Tous les champs doivent être remplis")
            setExit(false)
        }
    
        else if (laureatePromo.match(/^[0-9]+$/) == null)        // comparer user et mail
        {
            alert("La promotion du laureat doit contenir le format suivant 2020")
            setExit(false)
        }

        else if (phoneNumber.match(/^[0-9]+$/) == null)        // comparer user et mail
        {
            alert("Le numéro de téléphone doit être un nombre")
        }

        else
        { 
            setExit(true)
            resetValues()
        }
       
    }

    const handleClose = () => {
        setShow(false)
        setExit(false)
    }

    const handleShow = () => setShow(true);

    
    return(

        <div className="align-items-center">
            <Button className="btn btn-success btn mx-auto" onClick={handleShow}> <i className="fs-3 bi-plus-circle-fill"></i> Ajouter un compte </Button>

            <Modal size="lg"show={show} onHide={handleClose} onExited={handleCall}>
                <Modal.Header>
                    <Modal.Title>Ajouter un compte </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="py-2">
                        <label className='m-0' htmlFor="firstname"> Prénom</label>
                        <input className="form-control mt-1" readOnly={false} required onChange={(event) => setFirstname(event.target.value)}type="text" id="firstname"/>
                    </div>

                    <div className="py-2">
                        <label className='m-0' htmlFor="lastname"> Nom </label>
                        <input className="form-control mt-1" required onChange={(event) => setLastname(event.target.value)}type="text" id="lastname"/>
                    </div>

                    <div className="py-2">
                        <label className="m-0" htmlFor="email"> Adresse e-mail</label>
                        <input className="form-control mt-1"  required onChange={(event) => setEmail(event.target.value)}type="text" id="email"/>
                    </div>

                    <div className="py-2">
                        <label className="m-0" htmlFor="username"> Nom d'utilisateur</label>
                        <input className="form-control mt-1"  required onChange={(event) => setUsername(event.target.value)}type="text" id="username"/>
                    </div>

                    <div className="py-2">
                        <label className="m-0" htmlFor="lauretePromo"> Année de promotion </label>
                        <input className="form-control mt-1"  required onChange={(event) => setLaureatePromo(event.target.value)}type="text" id="laureatePromo"/>
                    </div>

                    <div className="py-2">
                        <label className="m-0" htmlFor="passsword"> Mot de passe </label>
                        <input type ="password" className="form-control mt-1" required onChange={(event) => setPassword(event.target.value)} id = "password"/>
                    </div>

                    <div className="py-2">
                        <label className="m-0" htmlFor="phoneNumber"> Numéro de téléphone </label>
                        <input className="form-control mt-1"  required onChange={(event) => setPhoneNumber(event.target.value)}type="text" id="phoneNumber"/>
                    </div>

                    <div className="py-2">
                        <label className="m-0" htmlFor="studies"> Ecole </label>
                        <input className="form-control mt-1"  required onChange={(event) => setStudies(event.target.value)}type="text" id="studies"/>
                    </div>
                    <br/>

                    <div className="py-2">
                        <h5 className="m-0 mb-2" htmlFor="role"> Type de compte </h5>

                        <div className="form-check mt-1">
                            <input className="form-check-input" type="radio" defaultChecked value = "admin" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="admin"/>
                            <label className="form-check-label" htmlFor='admin'> Administrateur </label>
                        </div>

                        <div className="form-check mt-1">
                            <input className="form-check-input" type="radio" value="godfather" onClick={(permission) => setPermission(permission)} name="flexRadioDefault" id="godfather" />
                            <label className="form-check-label" htmlFor='godfather'> Parrain </label>
                        </div>

                        <div className="form-check mt-1">
                            <input className="form-check-input" type="radio" value = "laureate"  name="flexRadioDefault" id="laureate"/>
                            <label className="form-check-label" htmlFor='laureate'> Lauréat </label>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="btn btn-success btn-sm" onClick={handleExit}> Enregistrer</Button>
                    <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i className="me-2 bi-x-square-fill"/> Fermer</Button>

                    {exit? <div className="alert alert-success" > Modifications enregistrées </div>:""}
                </Modal.Footer>
            </Modal>
        </div>
    )
}
