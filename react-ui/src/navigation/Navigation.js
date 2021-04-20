import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export function Navigation({ user }) {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Emergence</Navbar.Brand>
            <Nav className="mr-auto">
                {user ? (
                    <React.Fragment>
                        <Nav.Link href="/ApplicantList">Liste des lauréats</Nav.Link>
                        <Nav.Link href="/Rating">Notes</Nav.Link>
                        <Nav.Link href="/ManageAccounts">Gestion des comptes</Nav.Link>
                        <Nav.Link href="/Form">Formulaire administrateur</Nav.Link>
                        <Nav.Link href="/ApplicantForm">Formulaire lauréats</Nav.Link>
                        <Nav.Link href="/PrettyPlanning">Planning</Nav.Link>
                        <Nav.Link href="/Preselection">Presélection</Nav.Link>
                        <Nav.Link href="/Logout">Déconnexion</Nav.Link>
                    </React.Fragment>
                ) : null }
            </Nav>
        </Navbar>
    );
};
