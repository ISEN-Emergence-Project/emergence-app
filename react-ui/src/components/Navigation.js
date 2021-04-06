import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Navigation extends Component
{
    render()
    {
        return <div>
               <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">

                        <li className="nav-item">
                        <Link className="nav-link active" to="/" > <button className="btn btn-dark btn-sm align-self-center" > Edit Form  </button> </Link>
                        </li>

                        <li className="nav-item d-flex flex-row">
                        <Link className="nav-link align-self-center"to="/ApplicantList"> <button className="btn btn-dark btn-sm align-self-center" > ApplicantList </button> </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link"to="/ManageAccounts"> <button className="btn btn-dark btn-sm align-self-center" > Manage Accounts </button> </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link"to="/Rating"> <button className="btn btn-dark btn-sm align-self-center" > Ratings </button> </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link"to="/ApplicantForm"> <button className="btn btn-dark btn-sm align-self-center" > ApplicantForm </button> </Link>
                        </li>

                        <li className="nav-item">
                        <Link className="nav-link"to="/Planning"> <button className="btn btn-dark btn-sm align-self-center" > Planning </button> </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
         </div>

    }
}

export default Navigation
