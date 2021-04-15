import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

export function Login(){


  return (
  <MDBContainer>
    <MDBRow center>
      <MDBCol md="5">
        <form method="POST" action="//etn-test.herokuapp.com/api/account">
          <p className="h1 text-center mb-4 mt-5">Bienvenue sur le programme Emergence</p>
          <label htmlFor="defaultFormLoginEmailEx" className="grey-text mt-3">
            Email
          </label>
          <input type="email" id="defaultFormLoginEmailEx" name="username" className="form-control" />
          <br />
          <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
            Mot de passe
          </label>
          <input type="password" id="defaultFormLoginPasswordEx" name="password" className="form-control" />
          <div className="text-center mt-4">
            <MDBBtn color="primary" type="submit" rounded>Connexion</MDBBtn>
          </div>
        </form>

      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
}

