import React, {Component, useState} from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export function Navigation({ user }) {

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Emergence</Navbar.Brand>
            <Nav className="mr-auto">
                {user ? (
                    <React.Fragment>
                        <Nav.Link href="/ApplicantList">ApplicantList</Nav.Link>
                        <Nav.Link href="/Rating">Rating</Nav.Link>
                        <Nav.Link href="/Timeline">Timeline</Nav.Link>
                        <Nav.Link href="/PlanningV2">PlanningV2</Nav.Link>
                        <Nav.Link href="/APITest">API</Nav.Link>
                        <Nav.Link href="/Form"> Admin Form </Nav.Link>
                        <Nav.Link href="/ApplicantForm">ApplicantForm</Nav.Link>
                        <Nav.Link href="/ManageAccounts">ManageAccounts</Nav.Link>
                        <Nav.Link href="/PrettyPlanning">Joli Planning</Nav.Link>
                        <Nav.Link href="/Preselection">Preselection</Nav.Link>
                        <Nav.Link href="/Logout">Logout</Nav.Link>
                    </React.Fragment>
                ) : null }
            </Nav>
        </Navbar>
    );
};
