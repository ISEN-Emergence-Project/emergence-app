import { Button, Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert'




export function ApplicantCard({Name,Firstname,Age,Studies,Role}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        
        <Alert variant="light" onClick={handleShow}>
          <Alert.Heading>{Name + " " + Firstname}</Alert.Heading>
          <p>
              {Role}
          </p>
          <p>
          {Age}
          </p>
          <p>
              {Studies}
          </p>
          <hr />
        </Alert>
  
        <Modal show={show} onHide={handleClose}>
        <Modal.Header>
                <Modal.Title> Informations du profil </Modal.Title>
            </Modal.Header>
            <Modal.Body className="container">
                <h5 classname="mb-3"> Hello everyone</h5>
                <input readOnly={true} className="form-control mt-3 mb-3" type="text" defaultValue="ok"/>

                <h5> Hello</h5>
                <p class="overflow-visible">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                <h5> Everyone</h5>
                <input readOnly={true} className="form-control mt-3 mb-3" type="text" defaultValue="ok"/>
                
                
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
 
