import React, {useState} from "react";

export function AppNav() {
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
                    <a className="btn btn-outline-light d-lg-inline-block my-2 ml-auto" href="/login/">Connexion</a>
                </div>
            </div>
        </header>

    );
};
