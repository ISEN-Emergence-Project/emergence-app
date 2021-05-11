/**
 * NOT FOUND PAGE
 * Show a not found error (404)
 */

import React from "react";

function NotFound() {

    return (
        <div className='container py-4'>
            <h1>Page introuvable - 404</h1>
            <a className='btn btn-primary' href="/">Retour à l'accueil</a>
        </div>
    )
}

export default NotFound
