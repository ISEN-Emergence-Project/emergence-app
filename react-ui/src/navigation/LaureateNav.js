import React, {useState} from "react";

export function LaureateNav({ phase }) {
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
                            <a className="nav-link p-2 active" aria-current="page" href="/laureate/">Accueil</a>
                        </li>
                        {phase.phaseId === 2 ? (
                            <li className="nav-item col-6 col-md-auto p-0">
                                <a className="nav-link p-2" href="/laureate/form">Formulaire</a>
                            </li>
                        ) : null}
                        {phase.phaseId === 5 ? (
                            <li className="nav-item col-6 col-md-auto p-0">
                                <a className="nav-link p-2" href="/laureate/meetings">Speed Meetings</a>
                            </li>
                        ) : null}
                        {phase.phaseId === 7 ? (
                            <li className="nav-item col-6 col-md-auto p-0">
                                <a className="nav-link p-2" href="/laureate/match">Mon parrain</a>
                            </li>
                        ) : null}
                    </ul>
                    <a className="btn btn-outline-light d-lg-inline-block my-2 ml-auto" href="/logout/">Déconnexion</a>
                </div>
            </div>
        </header>
    );
};
