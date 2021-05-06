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
            <div className='row'>
                {accounts.map((acc) => (acc.role === "godfather") ? (
                    <div className="col-6 col-md-3">
                        <div className="card m-2">
                            <h3 className="card-header">{acc.firstname} {acc.lastname}</h3>
                            <div className="p-4 ">
                            {/* for each godfather, a bootstrap card is created with their name */}
                                {preselection.map(pres=> acc.accountId === pres.fkGodfatherAccountId?
                                    <div className="">
                                        <div className="">
                                            {/* select all line in the preselection table of database that belong to the godfather */}
                                            {accounts.map(acc=> acc.accountId === pres.fkLaureateAccountId?// need to travel the account table to catch the name
                                                <div className="p-1">{acc.firstname} {acc.lastname}</div>
                                                :false)}
                                                {/* Display the name of the laureates in the godfather boostrap card  */}
                                        </div>
                                    </div>
                                    :false)}
                            </div>
                        </div>
                    </div>
                ) : false)}
            </div>

        </div>
    )
        
}
