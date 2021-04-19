import React, {Component, useState} from "react";

export function Navigation({ user }) {
    const [ navExpanded, setNavExpanded ] = useState(false);

    function toggleNav() {
        setNavExpanded(!navExpanded)
    }

    return (
        <header className='navbar navbar-expand-md fixed-top navbar-dark flex-lg-row bd-navbar bg-dark'>
            <a href="/" className='navbar-brand'>Emergence</a>
            <button className={`navbar-toggler ${navExpanded ? '' : 'collapsed'}`} type="button"
                    data-bs-toggle="collapse" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleNav}>
                <span className="navbar-toggler-icon"/>
            </button>
            <div id='bdNavbar' className={`navbar-collapse collapse ${navExpanded ? 'show' : ''}`}>
                <div className="container-fluid d-flex flex-nowrap flex-column flex-md-row">
                    {user ? (
                        <>
                            <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2 active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/ApplicantList">ApplicantList</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/Rating">Rating</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/PlanningV2">PlanningV2</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/APITest">APITest</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/Form">Form</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/ApplicantForm">ApplicantForm</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/ManageAccounts">ManageAccounts</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/PrettyPlanning">PrettyPlanning</a>
                                </li>
                                <li className="nav-item col-6 col-md-auto p-0">
                                    <a className="nav-link p-2" href="/Preselection">Preselection</a>
                                </li>
                            </ul>
                            <a className="btn btn-outline-light d-lg-inline-block my-2 ml-auto" href="/Logout/">Logout</a>
                        </>
                    ) : null }
                </div>
            </div>
        </header>
    );
};
