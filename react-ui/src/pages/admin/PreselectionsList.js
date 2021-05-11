/**
 * PRESELECTIONS LIST ADMIN PAGE
 * Show the godfathers and their preselections
 */

import React, {useEffect, useState} from "react";
import axios from "axios"

export function PreselectionsList({ account }) {

    const [preselection,setPreselection]=useState([])
    const [accounts,setAccounts]=useState([])
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_HOST +"/api/preselections")
            .then(res => {
                setPreselection(res.data)
            })
            .catch(error => console.error("There was an error",error))

        axios.get(process.env.REACT_APP_API_HOST +"/api/accounts")
            .then(res => {
                setAccounts(res.data)
            })
            .catch(error => console.error("There was an error",error))
    }, [])

    return (
        <div className="container">

            <div className="py-5">
                <h1>Liste des choix des parrains</h1>
                <hr/>
            </div>
            <div className='py-2'>
                {/* for each godfather, a bootstrap card is created with their name */}
                {accounts.map((acc) => (acc.role === "godfather") ? (
                    <div className="card my-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-2 py-2 px-3 bg-light">
                                    {acc.firstname} {acc.lastname}
                                </div>
                                <div className="col-10 px-3 py-2">
                                    <div className="row">
                                        {preselection.map(pres => acc.accountId === pres.fkGodfatherAccountId?
                                            <div className="col-3 my-1 p-0" key={`${pres.fkGodfatherAccountId}-${pres.fkLaureateAccountId}`}>
                                                <div className="">
                                                    {accounts.map(acc=> acc.accountId === pres.fkLaureateAccountId?
                                                        <div className='card mx-2 shadow-sm'>
                                                            <div className="card-body py-2 px-3">
                                                                {acc.firstname} {acc.lastname}
                                                            </div>
                                                        </div>
                                                        :false)}
                                                </div>
                                            </div>
                                            :false)}
                                            {/* select all line in the preselection table of database that belong to the godfather */}
                                                {/* Display the name of the laureates in the godfather boostrap card  */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : false)}
            </div>

        </div>
    )
        
}
