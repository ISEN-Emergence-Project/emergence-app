import React, { Component, useState } from "react";

export function AccountCard({username,email,password,userType,promo})
{
    const[clicked, handleClick] = useState(false) // pour l'instant le bouton supprimer ne marche pas trop

    const reset = () =>
    {
        handleClick(!clicked)
    }

    return <div className="container d-flex justify-content-center mt-5">
          
      
        {
        clicked? <div/> :
          <div className="card-header text-center col-3 bg-warning">  {/* selon le type de user on modifie la couleur du badge*/}
            <span class={userType === "admin"? "badge bg-primary mb-4":"" || userType === "godfather"? "badge bg-secondary mb-4":"" || userType === "laureate"? "badge bg-success mb-4":""}> {userType} </span>
            <h5>  {username} </h5>
        <div className="card-body">
            <p className="card-title text-center ">{email}</p>
            <p className="card-text text-center">{promo}</p>
        </div> 
        <button className="btn btn-danger btn-sm" onClick={reset}> <i className=" me-2 bi-trash-fill"></i> Supprimer </button>
    </div>
        }
        
       
        </div>

      
    
} 
