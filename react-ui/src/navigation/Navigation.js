import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


export class Navigation extends Component   // Permet de créer la barre de navigation et d'ajouter les onglets
{
    render()
    {
        return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Emergence</Navbar.Brand>
        <Nav className="mr-auto">
            
          <Nav.Link href="/Login">Login</Nav.Link>
          <Nav.Link href="/ApplicantList">ApplicantList</Nav.Link>
          <Nav.Link href="/Rating">Rating</Nav.Link>
          <Nav.Link href="/Timeline">Timeline</Nav.Link>
          <Nav.Link href="/PlanningV2">PlanningV2</Nav.Link>
          <Nav.Link href="/APITest">API</Nav.Link>
          <Nav.Link href="/ApplicantForm">Rating</Nav.Link>
          <Nav.Link href="/Rating">Rating</Nav.Link>
          <Nav.Link href="/ManageAccounts">ManageAccounts</Nav.Link>
         
        </Nav>

      </Navbar>





                        <li className="nav-item">
                        <Link className="nav-link"to="/Timeline"> <button className="btn btn-dark btn-sm align-self-center" > Timeline </button> </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link"to="/PlanningV2"> <button className="btn btn-dark btn-sm align-self-center" > Planning test </button> </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link"to="/APITest"> <button className="btn btn-dark btn-sm align-self-center" > API test </button> </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link"to="/PrettyPlanning"> <button className="btn btn-dark btn-sm align-self-center" > Jolie Planning </button> </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
         </div>


    }
}
