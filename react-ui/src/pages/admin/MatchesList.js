import React, { useState } from "react";
import axios from "axios"

function MatchesList() {

    const [matches,setMatches]=useState([])
    const [account,setAccounts]=useState([])
    

    axios.get("https://etn-test.herokuapp.com/api/matches")
            .then(res => {
            
            setMatches(res.data)

    })
    .catch(error => console.error("There was an error",error)) 


    axios.get("https://etn-test.herokuapp.com/api/accounts")
            .then(res => {
            
            setAccounts(res.data)

    })
    .catch(error => console.error("There was an error",error)) 

    return (
        
        <div className='container py-4 '>
            <h1 className="p-2 m-5">Binômes finaux : </h1>
            {matches.map(matches=> 
            <div className="d-flex flex-row border-bottom border-top p-2">
                <h5 className="col">
                    {account.map(acc=>acc.accountId==matches.fkGodfatherAccountId?
                    <div className="p-2">{acc.firstname + " "+ acc.lastname}</div>
                    :false)}
                </h5>
                <h5 className="col">
                    {account.map(acc=>acc.accountId==matches.fkLaureateAccountId?
                        <div className="p-2">{acc.firstname + " "+ acc.lastname}</div>
                        :false)}
                </h5>
            </div>)}
        </div>
    )
}

export default MatchesList
