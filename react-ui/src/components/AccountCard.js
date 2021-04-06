import React, { Component, useState } from "react";

function AccountCard({username,email,password,userType})
{
    const[clicked, handleClick] = useState(false) // voir le pb de suppression = faire une classe ? faire du DnD pour les modifications ?

    const reset = () =>
    {
        handleClick(!clicked)
    }

    return (
        <div className="container d-flex justify-content-center mt-5">
            { clicked ? <div/> : (
                  <div className="card-header text-center col-3 bg-warning">
                    <span className="badge bg-primary mb-3"> {userType} </span>
                    <h5>  {username} </h5>
                <div className="card-body">
                    <p className="card-title text-center ">{email}</p>
                    <p className="card-text text-center">{password}</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={reset}> <i className=" me-2 bi-trash-fill"></i> Supprimer </button></div>
            )}
        </div>
    );
} 

export default AccountCard
