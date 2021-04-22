import React, {useState} from "react";

export function AdminNav({ phase }) {
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
                    <ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2 active" aria-current="page" href="/">Accueil</a>
                        </li>

                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2" href="/accounts">Comptes</a>
                        </li>

                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2" href="/form">Formulaire</a>
                        </li>

                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2" href="/preselections">Préselections</a>
                        </li>

                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2" href="/meetings-planning">Planning des meetings</a>
                        </li>

                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2" href="/meetings">Speed meetings</a>
                        </li>

                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2" href="/choose-matches">Choose matches</a>
                        </li>

                        <li className="nav-item col-6 col-md-auto p-0">
                            <a className="nav-link p-2" href="/matches">Final matches</a>
                        </li>
                    </ul>
                    <a className="btn btn-outline-light d-lg-inline-block my-2 ml-auto" href="/logout/">Déconnexion</a>
                </div>
            </div>
        </header>
    
    );
};
