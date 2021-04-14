import React, {Component} from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export class Navigation extends Component   // Permet de créer la barre de navigation et d'ajouter les onglets
{
    render()
    {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Emergence</Navbar.Brand>
                <Nav className="mr-auto">

                  <Nav.Link href="/Login">Login</Nav.Link>
                  <Nav.Link href="/ApplicantList">ApplicantList</Nav.Link>
                  <Nav.Link href="/Rating">Rating</Nav.Link>
                  <Nav.Link href="/Timeline">Timeline</Nav.Link>
                  <Nav.Link href="/PlanningV2">PlanningV2</Nav.Link>
                  <Nav.Link href="/APITest">API</Nav.Link>
                  <Nav.Link href="/ApplicantForm">ApplicantForm</Nav.Link>
                  <Nav.Link href="/ManageAccounts">ManageAccounts</Nav.Link>
                  <Nav.Link href="/PrettyPlanning">Joli Planning</Nav.Link>

                </Nav>
            </Navbar>
        );
    }
}
