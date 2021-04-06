import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Navigation extends Component
{
    render()
    {
        return <div>
               <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse">
                    <ul class="navbar-nav">

                        <li class="nav-item">
                        <Link class="nav-link active" to="/" > <button className="btn btn-dark btn-sm align-self-center" > Edit Form  </button> </Link>
                        </li>

                        <li class="nav-item d-flex flex-row">
                        <Link class="nav-link align-self-center"to="/ApplicantList"> <button className="btn btn-dark btn-sm align-self-center" > ApplicantList </button> </Link>
                        </li>

                        <li class="nav-item">
                        <Link class="nav-link"to="/ManageAccounts"> <button className="btn btn-dark btn-sm align-self-center" > Manage Accounts </button> </Link>
                        </li>

                        <li class="nav-item">
                        <Link class="nav-link"to="/Rating"> <button className="btn btn-dark btn-sm align-self-center" > Ratings </button> </Link>
                        </li>

                        <li class="nav-item">
                        <Link class="nav-link"to="/ApplicantForm"> <button className="btn btn-dark btn-sm align-self-center" > ApplicantForm </button> </Link>
                        </li>

                        <li class="nav-item">
                        <Link class="nav-link"to="/Planning"> <button className="btn btn-dark btn-sm align-self-center" > Planning </button> </Link>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
         </div>

    }
}

export default Navigation
