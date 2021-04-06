import { Button, Modal } from 'react-bootstrap';
import React, {useState} from 'react';


function Card({Name,Firstname,Age,Studies})
{
    const [show, setShow] = useState(false);
    const handleClose = () => 
    {
        setShow(false);

    }
    const handleShow = () => setShow(true);

    return (
        <div>
             <div className="card">
                    <div className="card-header text-center">
                        <h5>  {Name + " " + Firstname} </h5>
                    </div>

                    <p className="card-title text-center">{Age}</p>
                    <p className="card-text text-center">{Studies}</p>

                    <div className="d-flex justify-content-end" >
                        <Button onClick={handleShow} className="btn btn-primary mb-3"> <i className="me-2 bi-info-circle-fill"></i> En savoir plus </Button>
                    </div>
            </div>

            <div className="container">
                <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title> Informations du profil </Modal.Title>
                </Modal.Header>
                <Modal.Body className="container">
                    <h5 classname="mb-3"> Hello everyone</h5>
                    <input readOnly={true} className="form-control mt-3 mb-3" type="text" defaultValue="ok"/>

                    <h5> Hello</h5>
                    <input readOnly={true} className="form-control mt-3 mb-3" type="text" defaultValue="ok"/>


                    <h5> Everyone</h5>
                    <input readOnly={true} className="form-control mt-3 mb-3" type="text" defaultValue="ok"/>


                </Modal.Body>

                <Modal.Footer>
                <Button variant="btn btn-danger btn-sm" onClick={handleClose}> <i className="me-2 bi-x-square-fill"></i> Fermer</Button>

                </Modal.Footer>

                </Modal>
            </div>
        </div>
    );
}

export default Card
